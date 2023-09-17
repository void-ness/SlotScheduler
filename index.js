const express = require('express')
const mongoose = require('mongoose')
const createError = require('http-errors')
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());

// initialise database
mongoose.connect(process.env.mongodb_URI).then(() => {
    console.log('mongoDB connected....');
}).catch(err => console.log(err.message));

const UserRoute = require('./Routes/User.route.js');
app.use('/users', UserRoute)

const SlotRoute = require('./Routes/Slot.route.js');
app.use('/slots', SlotRoute)

app.use((req, res, next) => {
    next(createError(404, "Unexpected Error"));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    });
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server started on port: ", process.env.PORT);
})
