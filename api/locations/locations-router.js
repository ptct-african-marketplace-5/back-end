const router = require('express').Router()
const Locations = require('./locations-model')
const authenticate = require('../auth/auth-middleware.js');

router.get('/', authenticate, (req, res, next) => {
  Locations.find()
    .then(location => {
      res.json(location)
    })
    .catch(next)
})


router.get('/:id', authenticate, (req, res, next) => {
  const { id } = req.params;

  Locations.findById(id)
    .then((location) => {
      if (location) {
        res.status(200).json(location);
      } else {
        res.status(404).json({ message: `Could not find location with id ${id}.` });
      }
    })
    .catch(next);
})

router.post('/', authenticate, (req, res, next) => {
  const location = req.body
  Locations.add(location)
    .then(location => {
      res.status(200).json(location)
    })
    .catch(next)
})

router.put('/:id', authenticate, (req, res, next) => {
  const changes = req.body
  const { id } = req.params;

  Locations.update(id, changes)
    .then(location => {
      if (location) {
        Locations.findById(req.params.id)
          .then(updatedLocation => {
            res.status(200).json(
              {
                updatedLocation,
                message: "location successfully updated",
              }
            );
          })
          .catch(next)
      } else {
        res.status(404).json({ message: 'Could not find location with given id' })
      }
    })
    .catch(next)
})



router.delete('/:id', authenticate, (req, res, next) => {
  const { id } = req.params;
  Locations.remove(id)
    .then(deletedLocation => {
      if (deletedLocation) {
        res.json({
          message: `removed: ${deletedLocation} successfully`
        })
      } else {
        res.status(404).json({
          error: 'location could not be deleted. given id not found in db'
        })
      }
    })
    .catch(next)
})


module.exports = router