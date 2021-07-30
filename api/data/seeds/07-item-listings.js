exports.seed = function (knex) {

    return knex('item_listings').insert([
        { item_id: 1, user_id: 1, locations_where_sold: 'online and at every physical market location', item_listing_description: 'description', price: 22.22 },
        { item_id: 2, user_id: 2, locations_where_sold: 'only in Zambia', item_listing_description: 'awesome!', price: 33.12 }


    ]);

};

