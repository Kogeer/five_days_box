import request from "supertest";
import {app} from "../app";

const signin = async (newEmail: string = null) => {
    const email = newEmail || 'test@test.com';
    const password = 'password';
    const name = 'Test user';

    const response = await request(app)
        .post('/api/auth/signup')
        .send({name, email,password})
        .expect(201);

    return response.get('Set-Cookie');
};

export default signin;
