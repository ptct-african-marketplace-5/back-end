const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

const Users = require('../users/users-model');

//let's use additional middlewares to validate the payload, whether username is taken or not before registering
// and check if the user exissts in the DB before login.
const checkPayload = (req,res,next)=>{
  if(!req.body.username || !req.body.password){
      res.status(401).json("username and password required")
  }else{
      next()
  }
}

const checkUserNameInDB = async (req,res,next)=>{
  try{
      const rows = await Users.findBy({username:req.body.username})
      if(!rows.length){
          next()
      }else{
          res.status(401).json("username taken")
      }
  }catch(e){
      res.status(500).json(`Server error: ${e.message}`)
  }
}

const checkUserExists = async (req,res,next)=>{
  try{
      const rows = await Users.findBy({username:req.body.username})
      if(rows.length){
          req.userData = rows[0]
          next()
      }else{
          res.status(401).json("invalid credentials")
      }
  }catch(e){
      res.status(500).json(`Server error: ${e.message}`)
  }
}



router.post('/register',checkPayload, checkUserNameInDB, (req, res) => {

    let user = req.body;
    const rounds = process.env.HASH_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            console.log(error.message);
            res.status(500).json({ errorMessage: error.message });
        });
});

router.post('/login', checkPayload, checkUserExists, (req, res) => {

    let { username, password } = req.body;


    Users.findBy({ username })
        .then(([user]) => {


            if (user && bcrypt.compareSync(password, user.password)) {

                const token = makeToken(user);


                res.status(200).json({ message: `${user.username} is back!`, token, id: user.id, first_name: user.first_name, last_name: user.last_name });
            } else {
                res.status(401).json({ message: "You shall not pass!" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: error.message });
        });
});

function makeToken(user) {

    const payload = {
        userId: user.id,
        username: user.username,
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: "1d",
    };

    return jwt.sign(payload, secret, options);
}

module.exports = router





