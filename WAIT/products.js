
exports.seed = function (knex) {
    return knex('products').insert([
        {
            productName: "Eggs",
            image: "https://i.imgur.com/skrBl9o.jpg",
            description: "free-range, fresh brown eggs.",
            price: 3,
            user_id: 1
        },


    ])

};
