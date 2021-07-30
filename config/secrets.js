module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'Keep it Secret, Keep it Safe!!',
    environment: process.env.NODE_ENV || 'development',

}