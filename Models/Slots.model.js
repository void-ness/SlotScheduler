const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlotScehma = new Schema({
    "date": {
        type: Date,
        required: true,
    },
    "duration": {
        type: Number,
        required: true,
    },
    "orgPerson": {
        type: {
            "name": String,
            "univId": Number,
        },
        required: true,
    },
    "booked": {
        type: Boolean,
        required: true,
    },
    "booker": {
        type: {
            "name": String,
            "univId": Number,
        },
        required: false,
        default: null,
    },
})

const SlotModel = mongoose.model('slots', SlotScehma);
module.exports = SlotModel;