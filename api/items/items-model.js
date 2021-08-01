const db = require('../data/db-config');

function getUsers() {
  return db('users');
}

function getItems() { // INCLUDING item NAME
  return db('items as i')
    .leftJoin('users as u', 'u.item_id', 'i.item_id')
    .select('i.item_id', 'i.item_name', 'i.item_description', 'i.price')
}

function findById(id) {
    return db("items").where({ id }).first();
}

async function createItem(item) {
  const [item_id] = await db('items').insert(item);
  return getItems().where({ item_id }).first();
}

function deleteItem(item_id) {
  return db('items').where({ item_id }).del();
}

async function editItem(item_id, changes) {
    await db("items").where({ item_id }).update(changes);
    return getItems();
}


module.exports = {
  getUsers,
  getItems,
  findById,
  createItem,
  editItem,
  deleteItem,
};
