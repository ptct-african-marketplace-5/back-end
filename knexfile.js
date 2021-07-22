const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
  // this enables foreign keys in SQLite
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done)
    },
  },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: './data/sauti.db3' },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds'
    }
  },
  testing: {
    ...sharedConfig,
    connection: { filename: './data/testing.db3' },
  },
}


// module.exports = {

//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: './database/users.db3'
//     },
//     useNullAsDefault: true,
//     migrations: {
//       directory: './database/migrations',
//     },
//     seeds: {
//       directory: './database/seeds'
//     }
//   },

//   production: {
//     client: 'pg',
//     connection: process.env.DATABASE_URL,
//     migrations: {
//       directory: './database/migrations',
//     },
//     seeds: {
//       directory: './database/seeds'
//     }
//   },

//   testing: {
//     client: 'sqlite3',
//     connection: {
//       filename: ':memory:'
//     },
//     useNullAsDefault: true,
//     migrations: {
//       directory: './database/migrations',
//     },
//     seeds: {
//       directory: './database/seeds',
//     },
//   },

// };
