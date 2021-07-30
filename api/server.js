const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('./auth/auth-router.js');
const itemsRouter = require('./items/items-router.js');
const listingsRouter = require('./listings/listings-router.js');
const locationsRouter = require('./locations/locations-router.js');
const usersRouter = require('./users/users-router.js');

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())


server.use('/api/auth', authRouter)
server.use('/api/items', itemsRouter)
server.use('/api/items-for-sale', listingsRouter)
server.use('/api/locations', locationsRouter)
server.use('/api/users', usersRouter)

// // remove this
// server.get('/api/users', async (req, res) => {
//   res.json(await getAllUsers())
// })
// // remove this
// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await insertUser(req.body))
// })

server.get('/', (req, res) => {
  res.status(200).send("<h1>Welcome to the Sauti African Marketplace API</h1>")
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server
