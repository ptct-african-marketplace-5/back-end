const request = require('supertest')
const server = require('../server.js')
const db = require('../data/db-config')
const bcrypt = require('bcryptjs')
const jwtDecode = require('jwt-decode')

// beforeAll(async () => {
//     await db.migrate.rollback()
//     await db.migrate.latest()
// })
// beforeEach(async () => {
//     await db.seed.run()
// })
// afterAll(async () => {
//     await db.destroy()
// })

it('sanity check', () => {
    expect(true).not.toBe(false)
})

describe('[POST] /api/auth/login', () => {
    it('[1] responds with the correct message on valid credentials', async () => {
        const res = await request(server).post('/api/auth/login').send({ username: 'gabrielhenton', password: 'password' })
        expect(res.body.message).toMatch(/gabrielhenton is back/i)
    })
})
