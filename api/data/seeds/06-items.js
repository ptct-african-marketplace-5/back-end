
exports.seed = function (knex) {
    return knex('items').insert([

        {
            item_name: "Milk",
            image: "https://i.imgur.com/4iRINNJ.jpg",
            description: "Delicious milk from cows that roam free",
            category_id: 5,
            location_id: 1,
            user_id: 2
        },

        {
            item_name: "Honey",
            image: "https://i.imgur.com/L65zYph.jpg",
            description: "Raw Honey",
            category_id: 12,
            location_id: 1,
            user_id: 2
        },
        {

            "item_name": "Banana",
            "description": "a very ripe banana",
            "category_id": 1,
            "user_id": 4,
            "location_id": 1
        },


    ])

};
