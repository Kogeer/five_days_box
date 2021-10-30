import {FileModel} from "../../../models/file";
import signin from "../../../test/auth-helper";
import {User} from "../../../models/user";
import request from "supertest";
import {app} from "../../../app";
import {Token} from "../../../models/token";
import {randomBytes} from "crypto";

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

it('Cannot generate token if user is not file owner', async () => {
    await signin();
    const newUser = await signin('admin@example.com');
    const {fakeFileModel} = await setup();

    const response = await request(app)
        .get(`/api/files/token/${fakeFileModel.id}`)
        .set('Cookie', newUser)
        .expect(400);

    expect(response.body.errors[0].message).toEqual('You can\'t share this file!');
});

it('Get token for file', async () => {
    const cookie = await signin();
    const {fakeFileModel} = await setup();

    const response = await request(app)
        .get(`/api/files/token/${fakeFileModel.id}`)
        .set('Cookie', cookie)
        .expect(200);

    expect(response.body.token).toBeDefined();
});

it('Get exists token for file', async () => {
    const cookie = await signin();
    const {fakeFileModel} = await setup();

    const token = Token.build({
        fileId: fakeFileModel.id,
        token: randomBytes(8).toString('hex')
    });
    await token.save();

    const response = await request(app)
        .get(`/api/files/token/${fakeFileModel.id}`)
        .set('Cookie', cookie)
        .expect(200);

    expect(response.body.token).toEqual(token.token);
});
