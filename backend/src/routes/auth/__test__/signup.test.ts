import request from 'supertest';
import {app} from "../../../app";

it('Returns a 201 on succesful signup', async () => {
    return request(app)
        .post('/api/auth/signup')
        .send({
            name: 'test user',
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('Returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/auth/signup')
        .send({
            name: 'test user',
            email: 'asdfasd',
            password: 'password'
        })
        .expect(400);
});

it('Returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/auth/signup')
        .send({
            name: 'test user',
            email: 'test@test.com',
            password: 'as'
        })
        .expect(400);
});

it('Returns a 400 with missing name, email and password', async () => {
    await request(app)
        .post('/api/auth/signup')
        .send({
            name: 'test user'
        })
        .expect(400);

    await request(app)
        .post('/api/auth/signup')
        .send({
            email: 'test@test.com'
        })
        .expect(400);

    await request(app)
        .post('/api/auth/signup')
        .send({
            password: 'holaaa'
        })
        .expect(400);
});

it('Disallows duplicate emails', async () => {
    await request(app)
        .post('/api/auth/signup')
        .send({
            name: 'Test user',
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/auth/signup')
        .send({
            name: 'Test user',
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('Sets a cookie after successful signup request', async () => {
    const response = await request(app)
        .post('/api/auth/signup')
        .send({
            name: 'Valid test user',
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});
