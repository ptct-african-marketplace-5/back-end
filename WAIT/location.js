
exports.seed = function (knex) {
    return knex('location').insert([
        {
            locationName: "Location1"
        },
        {
            locationName: "AnotherLocation"
        },


    ])

};
