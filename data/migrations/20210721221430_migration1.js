exports.up = function (knex) {
    return knex.schema
        .createTable('roles', roles => {
            roles.increments('role_id')
            roles.string('role_name', 32).notNullable().unique()
        })
        .createTable('users', users => {

            users.increments();
            users
                .string('username', 156)
                .notNullable()
                .unique();
            users
                .string('password', 156)
                .notNullable()
            users
                .string('first_name', 156);
            users
                .string('last_name', 156)
            users
                .string('email', 156)
                .unique()
                .notNullable()
            users.integer('role_id')
                .unsigned()
                .notNullable()
                .references('role_id')
                .inTable('roles')
                .onUpdate('RESTRICT')
                .onDelete('RESTRICT')
        })

        .createTable('products', products => {
            products.increments()
            products
                .string('productName', 156)
                .notNullable()
            products
                .binary('image', 255)
            products
                .string('description', 255)
            products
                .integer('price')
                .notNullable()

            //user_id (foreign key)
            products
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })

        .createTable('category', category => {
            category.increments()
            category
                .string('categoryName', 156)
                .notNullable()
        })

        .createTable('subCategory', sub => {
            sub
                .increments()
            sub
                .string('subCategoryName', 156)

            //category_id (foreign key)
            sub
                .integer('category_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('category')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })


        .createTable('pricing', pricing => {
            pricing
                .increments()
            pricing
                .string('productName', 156)
                .notNullable()
            pricing
                .binary('image', 255)
            pricing
                .integer('price')
                .notNullable()

            //category_id (foreign key)
            pricing
                .integer('category_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('category')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            //sub_id (foreign key)
            pricing
                .integer('sub_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('subCategory')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            //location_id (foreign key)
            pricing
                .integer('location_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('location')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

        })

        .createTable('location', location => {
            location.increments();
            location
                .string('locationName')
                .notNullable();

        })


};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('location')
        .dropTableIfExists('pricing')
        .dropTableIfExists('subCategory')
        .dropTableIfExists('category')
        .dropTableIfExists('products')
        .dropTableIfExists('users')
        .dropTableIfExists('roles')
};
