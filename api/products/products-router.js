const router = require('express').Router();
const { restricted, validateUserId } = require('../auth/auth-middleware.js');

const Products = require('./products-model.js');



/* Get Products */
router.get('/', restricted, (req, res) => {
    Products.get()
        .then(item => {
            res.status(200).json(item)
        })
        .catch(err => {
            console.log('GET Products', err)
            res.status(500).json({ message: 'Failed to get products' })
        });
});


/* Get Products By userID */
router.get('/:id', restricted, validateUserId, (req, res) => {
    const userId = req.params.id
    Products.getUserProducts(userId)
        .then(item => {
            res.status(200).json(item)
        })
        .catch(err => {
            console.log('GET Products', err)
            res.status(500).json({ message: 'The users product information with the specified ID could not be retrieved.' })
        });
});


/* Add Product */
router.post('/add', (req, res) => {
    console.log(req.body)
    Products.add(req.body)
        .then(item => {
            res.status(201).json(item);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to add product' })
        });
});


/* Update Product */
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Products.getById(id)
        .then(item => {
            if (item) {
                return Products.update(changes, id)
                    .then(changeItem => {
                        res.status(202).json({ updated: changeItem });
                    })
            } else {
                res.status(404).json({ message: 'Could not find the product with the given id' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update product' })
        });
});


/* Delete Product */
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    // console.log({ id })
    Products.getById(id)
        .then(item => {
            if (item) {
                return Products.remove(id)
                    .then(deleted => {
                        res.status(200).json({ removed: deleted })
                    })
            } else {
                res.status(404).json({ message: 'The product with the given id cannot be found' })
            }
        })
        .catch(err => {
            // console.log('DELETE Products', err)
            res.status(500).json({ message: 'Failed to delete product' })
        });
});



module.exports = router;