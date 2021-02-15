import request from 'supertest';
import app from '../../../app';

describe('Test categoryController', () => {
    beforeAll(async () => {
        console.log("Test starting...");
    });

    afterAll(async () => {
        console.log("...Test ending");
    });

    it('Request /api/category should return request of 200!', async () => {
        const result = await request(app).get('/api/category').send();

        expect(result.status).toBe(200);
    });

    it('Request /api/category/1 should return data with name "Antikviteter og Kunst"!', async () => {
        const result = await request(app).get('/api/category/1').send();

        expect(result.status).toBe(200);
        expect(result.body.data[0]?.navn).toBe('Antikviteter og Kunst');
    });
});