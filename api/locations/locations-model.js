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
  return db('locations')
}


function findBy(filter) {
  return db('locations').where(filter);
}

function findById(id) {
  return db("locations").where({ id }).first();
}


async function add(location) {
  const [id] = await db('locations').insert(location);
  return id;
}

async function update(id, changes) {
  await db("locations").where({ id }).update(changes);
  return findById(id);
}

function remove(id) {
  return db('locations')
    .where('id', id)
    .del();
}