exports.up = async (knex) => {
  await knex.schema

    // USERS TABLE
    .createTable('users', table => {
      table.increments('id') //auto
      table.string('username', 200).notNullable().unique()
      table.string('password', 200).notNullable()
      table.string('first_name', 128)
      table.string('last_name', 128)
      table.string('email', 200).notNullable()
      table.boolean('isOwner')
      table.boolean('isAdmin')
      table.timestamps(false, true)
    })

    // LOCATIONS TABLE
    .createTable('locations', table => {
      table.increments('id')
      table.string('location_name', 200).notNullable().unique()
      table.string('address', 200).unique()
    })


    // CATEGORIES TABLE
    .createTable('categories', table => {
      table.increments('id')
      table.string('category_name', 200).notNullable().unique()
      table.string('category_description', 200).unique()
    })

    // SUGGESTED PRICING TABLE
    .createTable('suggested_pricing', table => {
      table.increments('id')
      table.decimal('suggested_price', 14, 2)
      table.string('pricing_unit')
      table.string('item_name', 200)
      table
        .integer('location_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('locations')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })


    // ITEMS TABLE
    .createTable('items', table => {
      table.increments('id')
      table.string('item_name', 128).notNullable()
      table.binary('image', 255)
      table.string('description', 255)
      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('location_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('locations')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })

    // ITEM LISTING APPOINTMENT TABLE
    .createTable('item_listings', table => {
      table.increments('id')
      table.string('item_listing_description', 1024)
      table.decimal('price', 14, 2)
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('items')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .string('locations_where_sold', 128).notNullable
    })

}


exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('item_listings')
    .dropTableIfExists('items')
    .dropTableIfExists('suggested_pricing')
    .dropTableIfExists('categories')
    .dropTableIfExists('locations')
    .dropTableIfExists('users')
}
