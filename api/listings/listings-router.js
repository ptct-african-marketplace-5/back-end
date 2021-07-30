const router = require('express').Router()
const Listings = require('./listings-model')
// const { restrict } = require('../users/users-middleware.js');
const authenticate = require('../auth/auth-middleware.js');

router.get('/', authenticate, (req, res, next) => {
    Listings.find()
        .then(listing => {
            res.json(listing)
        })
        .catch(next)
})


router.get('/:id', authenticate, (req, res, next) => {
    const { id } = req.params;

    Listings.findById(id)
        .then((listing) => {
            if (listing) {
                res.status(200).json(listing);
            } else {
                res.status(404).json({ message: `Could not find listing with id ${id}.` });
            }
        })
        .catch(next);
})

router.post('/', authenticate, (req, res, next) => {
    const listing = req.body
    Listings.add(listing)
        .then(listing => {
            res.status(200).json(listing)
        })
        .catch(next)
})

router.put('/:id', authenticate, (req, res, next) => {
    const changes = req.body
    const { id } = req.params;

    Listings.update(id, changes)
        .then(listing => {
            if (listing) {
                Listings.findById(req.params.id)
                    .then(updatedListing => {
                        res.status(200).json(
                            {
                                updatedListing,
                                message: "listing successfully updated",
                            }
                        );
                    })
                    .catch(next)
            } else {
                res.status(404).json({ message: 'Could not find listing with given id' })
            }
        })
        .catch(next)
})



router.delete('/:id', authenticate, (req, res, next) => {
    const { id } = req.params;
    Listings.remove(id)
        .then(deletedListing => {
            if (deletedListing) {
                res.json({
                    message: `removed: ${deletedListing} successfully`
                })
            } else {
                res.status(404).json({
                    error: 'listing could not be deleted. given id not found in db'
                })
            }
        })
        .catch(next)
})


module.exports = router