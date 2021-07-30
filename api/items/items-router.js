const router = require('express').Router()
const Items = require('./items-model')
// const { restrict } = require('../users/users-middleware.js');
const authenticate = require('../auth/auth-middleware.js');

router.get('/', authenticate, (req, res, next) => {
    Items.find()
        .then(item => {
            res.json(item)
        })
        .catch(next)
})


router.get('/:id', authenticate, (req, res, next) => {
    const { id } = req.params;

    Items.findById(id)
        .then((item) => {
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ message: `Could not find Item with id ${id}.` });
            }
        })
        .catch(next);
})

router.post('/', authenticate, (req, res, next) => {
    let item = req.body
    Items.add(item)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(next)


})

router.put('/:id', authenticate, (req, res, next) => {
    const changes = req.body
    const { id } = req.params;

    Items.update(id, changes)
        .then(item => {
            if (item) {
                Items.findById(req.params.id)
                    .then(updatedItem => {
                        res.status(200).json(
                            {
                                updatedItem,
                                message: "item successfully updated",
                            }
                        );
                    })
                    .catch(next)
            } else {
                res.status(404).json({ message: 'Could not find item with given id' })
            }
        })
        .catch(next)
})



router.delete('/:id', authenticate, (req, res, next) => {
    const { id } = req.params;
    Items.remove(id)
        .then(deletedItem => {
            if (deletedItem) {
                res.json({
                    message: `removed: ${deletedItem} successfully`
                })
            } else {
                res.status(404).json({
                    error: 'item could not be deleted. given id not found in db'
                })
            }
        })
        .catch(next)
})


module.exports = router