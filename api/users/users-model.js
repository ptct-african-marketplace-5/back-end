const db = require('../data/db-config.js')


async function add(user) {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
}

function find() {
    return db("users")
}

function findBy(filter) {
    return db("users")
        .select("id", "username", "password")
        .where(filter)
}


function findById(id) {
    return db("users")
        .select("id", "username")
        .where({ id })
        .first()
}


module.exports = {
    add,
    find,
    findBy,
    findById,
}