import request from 'supertest';
import app from '../../../app';

describe('Test userController', () => {
    beforeAll(async () => { // kjører før testing
        console.log("User controller test starting...");
    });

    afterAll(async () => { // kjører når all testing er gått gjennom
        console.log("...Test ending");
    });

    it('Request /api/user should return request of 200!', async () => {
        const result = await request(app)
        .get('/api/user')
        .send()

        expect(result.status).toBe(200);
    });

    it('Request /api/user/1 should return data with name "zorg"!', async () => {
        const result = await request(app).get('/api/user').send();

        expect(result.status).toBe(200);
        expect(result.body.data[0]?.username).toBe('zorg');
    });
});