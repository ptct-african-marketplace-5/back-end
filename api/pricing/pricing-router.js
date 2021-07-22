const router = require('express').Router();
const restricted = require('../auth/auth-middleware');

const Pricing = require('./pricing-model.js')

/* Get Prices */
router.get('/', restricted, (req, res, next) => {
    Pricing.get()
        .then((price) => {
            res.status(200).json(price);
        })
        .catch(next);
});


/* Get Prices By Id */
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Pricing.getById(id)
        .then(price => {
            if (price) {
                res.status(200).json(price);
            } else {
                res.status(404).json({ message: 'Could not find the product with the given id.' })
            }
        })
        .catch(err => {
            console.log("Get Prices By Id", err)
            res.status(500).json({ message: 'Failed to get prices' });
        });
})

module.exports = router;