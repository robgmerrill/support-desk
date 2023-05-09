// commonjs module syntax
// reactjs will use import
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

// Connect to database
connectDB();
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to the support desk api'});
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))

// On all our routes use the errorHandler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})