import request from 'supertest';
import {app} from "../../../app";

it('Clears the cookie after signing out', async () => {
    await request(app)
        .post('/api/auth/signup')
        .send({
            name: 'Test user',
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/auth/signout')
        .send({})
        .expect(200);

    expect(response.get('Set-Cookie')[0]).toEqual(
        'sessId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    );
});