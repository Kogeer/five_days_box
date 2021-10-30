import request from "supertest";
import {app} from "../../../app";
import signin from "../../../test/auth-helper";
import * as fs from "fs";
import path from "path";

it('Cannot upload without signin', async() => {
    const buffer = Buffer.from('some data');

    await request(app)
        .post('/api/files')
        .attach('file', buffer, 'test_file.txt')
        .expect(401);
});

it('Can upload file', async() => {
    const buffer = Buffer.from('some data');
    const cookie = await signin();

    const response = await request(app)
        .post('/api/files')
        .set('Cookie',cookie)
        .attach('file', buffer, 'test_file.txt')
        .expect(200);

    expect(response.body.name).toEqual('test_file.txt');

    fs.unlinkSync(path.resolve(response.body.path));
});
