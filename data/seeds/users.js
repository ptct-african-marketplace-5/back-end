const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
    await knex('users').truncate()
    await knex('roles').truncate()
    await knex('roles').insert([
        { role_name: 'admin' },
        { role_name: 'user' },
        { role_name: 'owner' },
    ])
    await knex('users').insert([
        {
            username: 'admin', // admin is an admin
            password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', // password "1234"
            first_name: 'bob',
            last_name: 'bob',
            email: 'bob@africanmarketplace.com',
            role_id: 1,
        },
        {
            username: 'sue', // sue is an owner
            password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', // password "1234"
            first_name: 'sue',
            last_name: 'sue',
            email: 'sue@africanmarketplace.com',
            role_id: 3,
        },
        {
            username: 'testuser', // testuser is a user
            password: bcrypt.hashSync("password"),
            first_name: 'test',
            last_name: 'user',
            email: 'test@africanmarketplace.com',
            role_id: 2,
        },
    ])
}
