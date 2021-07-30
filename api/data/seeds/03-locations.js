exports.seed = function (knex) {

    return knex('locations').insert([
        {
            location_name: "Available Everywhere in Africa"
        },
        {
            location_name: "Jacaranda",
            address: "Test Address... 97006"
        },
        {
            location_name: "Greenfield"
        },
        {
            location_name: "Savannah"
        },
        {
            location_name: "Sunrise"
        },
        {
            location_name: "Tena"
        },
        {
            location_name: "Continental"
        },
        {
            location_name: "Umoja"
        },
        {
            location_name: "Embakasi"
        },
        {
            location_name: "Buru"
        },
        {
            location_name: "Mukuru"
        },
        {
            location_name: "Fedha"
        },
        {
            location_name: "Avenue Park"
        },
        {
            location_name: "Makadara"
        },
        {
            location_name: "New Mathare"
        },


    ])

};