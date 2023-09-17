const createError = require('http-errors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../Models/User.model');

const authorizeUser = async (req, res, next) => {
    try {
        const searchResult = await User.findOne({ uID: req.body.id, hashPassword: req.body.password });

        if (!searchResult) {
            throw createError(404, "invalid userid or password");
        }

        else {
            const user = {
                id: req.body.id,
                password: req.body.password
            };

            const secretKey = process.env.secretKey;

            const token = jwt.sign(user, secretKey, { expiresIn: '15m' });
            res.send(token);
        }
    } catch (error) {
        next(error)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const result = await User.find({}, { __v: 0, hashPassword: 0 });
        res.send(result);
    } catch (error) {
        next(createError(400, error.message));
    }
}

const getUserbyId = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await User.findById(id);

        if (!result) {
            throw createError(404, "user not found");
        }

        res.send(result);
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            next(createError(400, "invalid user id"));
            return;
        }
        next(error);
    }
}

const addUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.send(result);
    } catch (error) {
        if (error.name === 'ValidationError') {
            next(createError(422, error.message));
            return;
        }
        next(error);
    }
}

const updateUserbyId = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(id, data, options);

        if (!result) {
            throw createError(404, "user not found");
        }

        res.send(result);
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            next(createError(400, "invalid user id"));
            return;
        }
        next(error);
    }
}

const deleteUserbyId = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await User.findByIdAndDelete(id);

        if (!result) {
            throw createError(404, "user not found");
        }

        res.send(result);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, "invalid user id"));
            return;
        }
        next(error);
    }
}

module.exports = {
    getAllUsers,
    getUserbyId,
    addUser,
    updateUserbyId,
    deleteUserbyId,
    authorizeUser
}