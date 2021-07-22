const db = require('../../data/db-config');

module.exports = {
    get,
    getById
}

function get() {
    return db('pricing as p')
        .select("p.productName", "p.price", "p.image", "s.subCategoryName as subCategory", "l.locationName as location")
        .join("subCategory as s", "p.sub_id", "s.id")
        .join("location as l", "p.location_id", "l.id")

};

function getById(id) {
    return db('pricing')
        .where(({ id }))
        .first()
}
