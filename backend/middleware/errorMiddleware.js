
// Create middle ware
const errorHandler = (err, req, res, next) => {
    // set the status code. Use res.statusCode if it is provided. If not, give a status code of 500
    const statusCode = res.statusCode ? res.statusCode : 500
    // respond with status code set to statusCode
    res.status(statusCode)
    // send back json object with message set to err.message, stack (only if in development) to err.stack. If not, set to null in production
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
module.exports = {errorHandler}