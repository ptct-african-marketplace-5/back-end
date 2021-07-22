
exports.seed = function (knex) {
    return knex('pricing').insert([
        {
            productName: "Yam",
            image: "",
            price: 4,
            category_id: "3",
            sub_id: "11",
            location_id: 15
        },

    ])

};
