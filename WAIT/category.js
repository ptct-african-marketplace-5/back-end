
exports.seed = function (knex) {
    return knex('category').insert([
        {
            categoryName: "Animal Products"
        },
        {
            categoryName: "Beauty Products"
        },
        {
            categoryName: "Cereals"
        },
        {
            categoryName: "Fruits"
        },
        {
            categoryName: "Oils"
        },
        {
            categoryName: "Other"
        },
        {
            categoryName: "Legumes"
        },
        {
            categoryName: "Roots & Tubers"
        },
        {
            categoryName: "Seeds & Nuts"
        },
        {
            categoryName: "Sweets"
        },
        {
            categoryName: "Vegetables"
        }
    ])

};

