const db = require('../../data/db-config');

module.exports = {
    get,
    getUserProducts,
    getByUserId,
    getById,
    add,
    update,
    remove
}

function get() {

    return db('products')
        .select(
            'products.id',
            'productName',
            'image',
            'description',
            'price',
            'users.id AS user_id',
        )
        .join('users', 'users.id', 'products.user_id')

};

function getUserProducts(user_id) {
    return db('products')
        .select(
            'products.id',
            'productName',
            'image',
            'description',
            'price',
            'users.id AS user_id'
        )
        .join('users', 'users.id', 'products.user_id')
        .where('products.user_id', user_id)
}

function getById(id) {
    return db('products')
        .where({ id })
        .first();
}

function getByUserId(id) {
    return get()
        .where({ "users.id": id });
};

function add(product) {
    return db('products')
        .insert(product)
        .then(ids => {
            return getById(ids[0])
        })
};

function update(changes, id) {
    return db('products')
        .where({ id })
        .update(changes);

}

function remove(id) {
    return db('products')
        .where('id', id)
        .del()
}

