const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authenticate = require('./auth/auth-middleware.js');
const authRouter = require('./auth/auth-router.js');
const productRouter = require('./products/products-router.js');
const pricingRouter = require('./pricing/pricing-router.js');
const usersRouter = require('./users/users-router.js');


const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


server.use('/api', authRouter);
server.use('/api/products', authenticate, productRouter);
server.use('/api/pricing', authenticate, pricingRouter);
server.use('/api/users', authenticate, usersRouter);


server.get('/api', (req, res) => {
    res.send(`<h1>The African Marketplace API is up!</h1>`);
});

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});



module.exports = server;
