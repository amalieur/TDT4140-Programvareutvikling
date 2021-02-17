import request from 'supertest';
import app from '../../../app';

describe('Test postController', () => {
    beforeAll(async () => { // kjører før testing
        console.log("Post controller test starting...");
    });

    afterAll(async () => { // kjører når all testing er gått gjennom
        console.log("...Test ending");
    });

    it('Request /api/post should return request of 200!', async () => {
        const result = await request(app)
        .get('/api/post')
        .send()

        expect(result.status).toBe(200);
    });

    it('Request /api/post/1 should return data with name "test"!', async () => {
        const result = await request(app).get('/api/post/1').send();

        expect(result.status).toBe(200);
        expect(result.body.data[0]?.title).toBe('test');
    });

});