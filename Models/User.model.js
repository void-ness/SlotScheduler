const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    "uID": {
        type: Number,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "role": {
        type: String,
        required: true
    },
    "hashPassword": {
        type: String,
        required: true
    }
});

const User = mongoose.model('users', UserSchema);
module.exports = User;