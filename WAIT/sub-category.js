
exports.seed = function (knex) {
    return knex('subCategory').insert([
        {
            subCategoryName: "Animal Products",
            category_id: 1
        },

    ])

};
