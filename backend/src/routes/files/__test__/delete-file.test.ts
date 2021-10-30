import request from "supertest";
import {app} from "../../../app";
import {FileModel} from "../../../models/file";
import signin from "../../../test/auth-helper";
import mongoose from "mongoose";
import {User} from "../../../models/user";
import * as fs from "fs";

jest.mock('fs', () => {
    return {
        unlinkSync: jest.fn(),
        mkdirSync: jest.fn(),
    }
});

const setup = async () => {
    const defaultUser = await User.findOne({email: 'test@test.com'});
    const fakeFileModel = FileModel.build({
        name: 'name',
        path: 'some/path',
        userId: defaultUser.id,
        uploadDate: new Date()
    });
    await fakeFileModel.save();

    return {fakeFileModel};
}

it('Cannot delete without signin', async () => {
    const fakeFileModel = FileModel.build({
        name: 'name',
        path: 'some/path',
        userId: 'fake id',
        uploadDate: new Date()
    });
    await fakeFileModel.save();

    await request(app)
        .delete(`/api/files/${fakeFileModel.id}`)
        .expect(401);
});

it('Cannot delete if file not exists', async () => {
    const cookie = await signin();
    const fakeFileId = mongoose.Types.ObjectId().toHexString();

    const response = await request(app)
        .delete(`/api/files/${fakeFileId}`)
        .set('Cookie', cookie)
        .expect(400);

    expect(response.body.errors[0].message).toEqual('File not exists');
});

it('Cannot delete another user file', async () => {
    await signin();
    const newUser = await signin('admin@example.com');
    const {fakeFileModel} = await setup();

    const response = await request(app)
        .delete(`/api/files/${fakeFileModel.id}`)
        .set('Cookie', newUser)
        .expect(400);

    expect(response.body.errors[0].message).toEqual('You can\'t delete file');
});

it('Can delete own file', async () => {
    const cookie = await signin();
    const {fakeFileModel} = await setup();

    await request(app)
        .delete(`/api/files/${fakeFileModel.id}`)
        .set('Cookie', cookie)
        .expect(200);
});
