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
        type: String,
        required: true,
    },
    "booked": {
        type: Boolean,
        required: true,
    },
    "bookerName": {
        type: String,
        required: false,
        default: null,
    },
    "bookerID": {
        type: Number,
        required: false,
        default: null,
    }
})

const SlotModel = mongoose.model('slots', SlotScehma);
module.exports = SlotModel;