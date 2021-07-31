const request = require('supertest')//lets us do server calls
const db = require('../data/db-config')
const server = require('../server')// supertest needs access to our server
const Item = require('./')

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

it('sanity check', () => {
    expect(true).not.toBe(false)
})


const item1 = {
    item_name: "Milk",
    image: "https://i.imgur.com/4iRINNJ.jpg",
    description: "Delicious milk from cows that roam free",
    category_id: 5,
    location_id: 1,
    user_id: 2
}

const item2 = {
    item_name: "Honey",
    image: "https://i.imgur.com/L65zYph.jpg",
    description: "Raw Honey",
    category_id: 12,
    location_id: 1,
    user_id: 2
}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db("items").truncate()
})

afterAll(async () => {
    await db.destroy()
})

it("correct env var", () => {
    expect(process.env.DB_ENV).toBe("testing")
})

describe("items model functions", () => {
    describe("create item", () => {
        it("adds item to the db", async () => {
            let items
            await Item.add(item1)
            items = await db("items")
            expect(items).toHaveLength(1)

            await Item.add(item2)
            items = await db("items")
            expect(items).toHaveLength(2)
        })
        it("inserted a item and a description", async () => {
            const item = await Item.add(item1)//before each "it" it destroys the db so
            expect(item).toMatchObject({item_id: 1,...item})
        })
    })
    describe("[DELETE] / - delete item", () => {
        it("removes item from db", async () => {
            const [item_id] = await db("items").insert(item1)
            let item = await db("items").where({item_id}).first()//same as ({"item_id", item_id})
            expect(item).toBeTruthy()
            await request(server).delete("/items/"+ item_id)// supertest library
            item = await db("items").where({item_id}).first()
            expect(item).toBeFalsy()
        })
        it("respond with the deleted item", async () => {
            await db("items").insert(item1)
            let item = await request(server).delete("/items/1")
            expect(item.body).toMatchObject(item1)
        })
    })
})
