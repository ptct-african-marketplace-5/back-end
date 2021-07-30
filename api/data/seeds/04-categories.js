exports.seed = function (knex) {

    return knex('categories').insert([
        {
            category_name: "Fruits",
            category_description: "test description - this is optional"
        },
        {
            category_name: "Vegetables"
        },
        {
            category_name: "Legumes, Beans and such"
        },
        {
            category_name: "Art"
        },
        {
            category_name: "Dairy"
        },
        {
            category_name: "Eggs"
        },
        {
            category_name: "Meat"
        },
        {
            category_name: "Nuts and Seeds"
        },
        {
            category_name: "Technology"
        },
        {
            category_name: "Software"
        },
        {
            category_name: "Other"
        },
        {
            category_name: "Other Animal Products Like Honey"
        },



    ])

};