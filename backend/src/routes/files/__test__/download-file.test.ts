import signin from "../../../test/auth-helper";
import request from "supertest";
import {app} from "../../../app";
import {User} from "../../../models/user";
import {FileModel} from "../../../models/file";
import path from "path";
import {randomBytes} from "crypto";
import {Token} from "../../../models/token";

const setup = async () => {
    const defaultUser = await User.findOne({email: 'test@test.com'});
    const fakeFileModel = FileModel.build({
        name: 'name',
        path: path.resolve('src/test/test_file.txt'),
        userId: defaultUser.id,
        uploadDate: new Date()
    });
    await fakeFileModel.save();

    return {fakeFileModel};
}

it('Cannot download another user file', async () => {
    await signin();
    const newUser = await signin('admin@example.com');
    const {fakeFileModel} = await setup();

    const response = await request(app)
        .get(`/api/files/download/${fakeFileModel.id}`)
        .set('Cookie', newUser)
        .expect(400);

    expect(response.body.errors[0].message).toEqual('You can\'t download this file');
});

it('Can download own file', async () => {
    const cookie = await signin();
    const {fakeFileModel} = await setup();

    const response = await request(app)
        .get(`/api/files/download/${fakeFileModel.id}`)
        .set('Cookie', cookie)
        .expect(200);

    expect(response.headers['content-disposition']).toEqual('attachment; filename="name"');
});

it('Cannot download without valid token', async () => {
    const token = randomBytes(8).toString('hex');

    const response = await request(app)
        .get(`/api/files/share?token=${token}`)
        .expect(400);

    expect(response.body.errors[0].message).toEqual('Token is invalid');
});

it('Can download shared file', async () => {
    await signin();
    const {fakeFileModel} = await setup();
    const generatedToken = randomBytes(8).toString('hex');
    const token = Token.build({
        token: generatedToken,
        fileId: fakeFileModel.id
    });
    await token.save();

    const response = await request(app)
        .get(`/api/files/share?token=${generatedToken}`)
        .expect(200);

    expect(response.headers['content-disposition']).toEqual('attachment; filename="name"');
});
