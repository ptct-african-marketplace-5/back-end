const router = require('express').Router()
const Users = require("./users-model");
const restrict = require('../auth/auth-middleware'); // this needs to be a named function that checks for isAdmin


router.get("/", restrict, async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id', restrict, (req, res, next) => {
  const { id } = req.params;

  Users.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: `Could not find User with id ${id}.` });
      }
    })
    .catch(next);
})



module.exports = router;