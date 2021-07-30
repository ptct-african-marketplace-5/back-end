const request = require('supertest')
const server = require('../api/server')

describe('Items Test', () => {
    it('adds items successfully', async () => {
        const res = await request(server).post('/api/items')
            .send({
                name: 'fruit',
                description: 'yellow fruit',
                location: 'the field',
                quantity: '12',
                price: '22',
                user_id: 1
            })
        expect(res.status).toBe(200)
    })
    it("should return json", async () => {
        const res = await request(server)
            .post("/api/items")
            .send({ name: "apples", description: "big apples", quantity: "77", price: "3", user_id: 1 });
        expect(res.type).toBe("application/json");
    });
})