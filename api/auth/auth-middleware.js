const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if (err) {
                //token expired or is invalid
                console.log('Token has expired or is invalid', err)
                res.status(401).json({ message: 'Token has expired or is invalid' });
            } else {
                req.user = { username: decodedToken.username }
                next();
            }
        })
    } else {
        res.status(400).json({ message: "Not Authorized" })
    }
}
