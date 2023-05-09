const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel');


// @desc   Register a new user
// @route  /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {


   const {name, email, password } =req.body;
   if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
   }
    // find if user already exists
    const userExists = await User.findOne({email: email})
    
    // if this user is in the database, send error message
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user with User.create
    const user = await User.create({
        // these properties from from the userModel.js file
        name: name, 
        email: email,
        password: hashedPassword
    })

    // if the user was created then we want to respond with a status message and json.
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
        // if a user wasn't created, then we want to send back status and error message
    } else {
        res.status(400);
        throw new error('Invalid user data')
    }
})

// @desc   login a new user
// @route  /api/users/login
// @access Public
const loginUser= asyncHandler(async(req, res) => {
    res.send('Login Route')
})

module.exports = {
    registerUser, 
    loginUser
}