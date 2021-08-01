const request = require('supertest')
const server = require('../server.js')
const db = require('../data/db-config.js')
const bcrypt = require('bcryptjs')
const jwtDecode = require('jwt-decode')


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db.seed.run()
})
afterAll(async () => {
    await db.destroy()
})

describe('server.js', () => {
    describe('[POST] /api/auth/login', () => {
        it('[1] login responds with the correct message on valid credentials', async () => {
            const res = await request(server).post('/api/auth/login').send({ username: 'monkey', password: 'banana' })
            expect(res.body.message).toMatch(/monkey is back/i)
        })
        it('[2] responds with the correct status and message on invalid credentials', async () => {
            let res = await request(server).post('/api/auth/login').send({ username: 'monkey', password: '1234' })
            expect(res.body.message).toMatch(/you shall not pass/i)
            expect(res.status).toBe(401)

        }, 500)
        it('[3] responds with a token with correct { username }', async () => {
            let res = await request(server).post('/api/auth/login').send({ username: 'monkey', password: 'banana' })
            let decoded = jwtDecode(res.body.token)
            expect(decoded).toHaveProperty('iat')
            expect(decoded).toHaveProperty('exp')
            expect(decoded).toMatchObject({

                username: 'monkey'
            })
            res = await request(server).post('/api/auth/login').send({ username: 'usertest', password: 'password' })
            decoded = jwtDecode(res.body.token)
            expect(decoded).toHaveProperty('iat')
            expect(decoded).toHaveProperty('exp')
            expect(decoded).toMatchObject({

                username: 'usertest'
            })
        }, 500)
    })
    describe('[POST] /api/auth/register', () => {
        it('[4] creates a new user in the database', async () => {
            await request(server).post('/api/auth/register').send({ username: 'johnny', password: '1234', email: 'j@j.com' })
            const res = await db('users').where('username', 'johnny').first()
            expect(res).toMatchObject({ username: 'johnny' })
        }, 500)
        it('[5] saves the user with a bcrypted password instead of plain text', async () => {
            await request(server).post('/api/auth/register').send({ username: 'suzy', password: '1234', email: 's@s.com' })
            const suzy = await db('users').where('username', 'suzy').first()
            expect(bcrypt.compareSync('1234', suzy.password)).toBeTruthy()
        }, 500)
        it('[6] responds with proper status on success', async () => {
            const res = await request(server).post('/api/auth/register').send({ username: 'babylon', password: 'confusion', email: 'babylon@confusion.com' })
            expect(res.status).toBe(201)
        }, 500)
    })

})

describe('Items Test', () => {

    it('requests with a valid token obtain a list of items', async () => {
        let signedInUser = await request(server).post('/api/auth/login').send({ username: 'monkey', password: 'banana' })
        signedInUser = await request(server).get('/api/items').set('Authorization', signedInUser.body.token)
        expect(signedInUser.body).toMatchObject([{
            "id": 1,
            "item_name": "Milk",
            "image": {
                "type": "Buffer",
                "data": [
                    104,
                    116,
                    116,
                    112,
                    115,
                    58,
                    47,
                    47,
                    105,
                    46,
                    105,
                    109,
                    103,
                    117,
                    114,
                    46,
                    99,
                    111,
                    109,
                    47,
                    52,
                    105,
                    82,
                    73,
                    78,
                    78,
                    74,
                    46,
                    106,
                    112,
                    103
                ]
            },
            "description": "Delicious milk from cows that roam free",
            "category_id": 5,
            "user_id": 2,
            "location_id": 1
        },
        {
            "id": 2,
            "item_name": "Honey",
            "image": {
                "type": "Buffer",
                "data": [
                    104,
                    116,
                    116,
                    112,
                    115,
                    58,
                    47,
                    47,
                    105,
                    46,
                    105,
                    109,
                    103,
                    117,
                    114,
                    46,
                    99,
                    111,
                    109,
                    47,
                    76,
                    54,
                    53,
                    122,
                    89,
                    112,
                    104,
                    46,
                    106,
                    112,
                    103
                ]
            },
            "description": "Raw Honey",
            "category_id": 12,
            "user_id": 2,
            "location_id": 1
        },
        {
            "id": 3,
            "item_name": "Banana",
            "image": null,
            "description": "a very ripe banana",
            "category_id": 1,
            "user_id": 4,
            "location_id": 1
        }])
    })
    it('adds item successfully', async () => {
        let signedInUser = await request(server).post('/api/auth/login').send({ username: 'monkey', password: 'banana' })
        signedInUser = await request(server).post('/api/items').set('Authorization', signedInUser.body.token).send(
            {
                item_name: 'newest fruit',
                description: 'the most deliciousness in fruit',
                category_id: 1,
                location_id: 1,
                user_id: 4
            }
        )




        expect(signedInUser.status).toBe(201)



    })

    it('updates item successfully', async () => {
        let signedInUser = await request(server).post('/api/auth/login').send({ username: 'monkey', password: 'banana' })
        signedInUser = await request(server).put('/api/items/3').set('Authorization', signedInUser.body.token).send(
            {
                item_name: 'Ripe Banana',
                "description": "a very ripe banana",
                "category_id": 1,
                "user_id": 4,
                "location_id": 1
            }
        )




        expect(signedInUser.body.message).toMatch(/item successfully updated/i)
    })
})