const db = require('../data/db-config')

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('item_listings')
}


function findBy(filter) {
    return db('item_listings').where(filter);
}

function findById(id) {
    return db("item_listings").where({ id }).first();
}


async function add(listing) {
    const [id] = await db('item_listings').insert(listing, 'id');
    return findById(id);
}


async function update(id, changes) {
    await db("item_listings").where({ id }).update(changes);
    return findById(id);
}

function remove(id) {
    return db('item_listings')
        .where('id', id)
        .del();
}