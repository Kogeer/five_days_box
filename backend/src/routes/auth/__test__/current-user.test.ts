import request from 'supertest';
import signin from "../../../test/auth-helper";
import {app} from "../../../app";

it('Response with details about the current user', async () => {
    const cookie = await signin();

    const response = await request(app)
        .get('/api/auth/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.email).toEqual('test@test.com');
});

it('Responds with error if not authenticated', async () => {
    const response = await request(app)
        .get('/api/auth/currentuser')
        .send()
        .expect(401);

    expect(response.body.errors).toBeDefined();
});
