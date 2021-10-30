import request from "supertest";
import {app} from "../../../app";

it('Can list all files', async () => {
    const response = await request(app)
        .get('/api/files')
        .expect(200);

    expect(response.body).toEqual([]);
});