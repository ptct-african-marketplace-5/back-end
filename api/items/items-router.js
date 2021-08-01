const express = require('express');
const Items = require('./item-model');
const authenticate = require('../auth/auth-middleware');

const router = express.Router();

router.get('/users', (req, res, next) => {
  Items.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next); // our custom err handling middleware in server.js will trap this
});

router.get('/items', (req, res, next) => {
  Items.getItems() 
    .then(items => {
      res.status(200).json(items);
    })
    .catch(next);
});

router.post('/items', authenticate, (req, res, next) => { 
  Items.createItem(req.body)
    .then(item => {
      res.status(201).json(item);
    })
    .catch(next);
});

router.put('/:item_id', authenticate, (req, res, next) => {
    const changes = req.body
    const { id } = req.params;

    Items.editItem(id, changes)
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


router.delete('/items/:item_id', authenticate, (req, res, next) => {  
  Items.deleteItem(req.params.item_id)
    .then(count => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    })
    .catch(next);
});

module.exports = router;
