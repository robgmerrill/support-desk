const mongoose = require('mongoose')

// create the schema for our user
const userSchema = mongoose.Schema({
    // for each property we can set the type, whether it is required, unique, etc...
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    }, 
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }

}, 
{
    // add timestamps to all the properties - eg. created on.
    timestamps: true,
}
)

// exort this Schema that we created as the User. 
module.exports = mongoose.model('User', userSchema)