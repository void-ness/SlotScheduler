const mongoose = require('mongoose');
const createError = require('http-errors');

const Slot = require('../Models/Slots.model');

const getAvailableSlots = async (req, res, next) => {
    try {
        const result = await Slot.find({ booked: false, date: { $gt: new Date() } }, {
            __v: 0,
            booked: 0,
            booker: 0,
        });

        res.send(result);
    } catch (error) {
        next(error);
    }
}

const bookaSlot = async (req, res, next) => {
    try {
        const id = req.body.slotID;
        const options = { new: true };
        const update = {
            booker: { "name": req.body.name, "univId": req.user.id },
            booked: true
        }

        const result = await Slot.findByIdAndUpdate(id, update, options);

        if (!result) {
            throw createError(404, "slot not found");
        }

        res.send(result);
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            next(createError(400, "invalid id format"));
            return;
        }

        next(error);
    }
}

const getPendingSlots = async (req, res, next) => {
    try {
        const result = await Slot.find({
            booked: true,
            "orgPerson.univId": req.user.id,
            date: { $gt: Date() }
        }, { __v: 0 })

        res.send(result);
    } catch (error) {
        next(error);
    }
}

const updateSlotbyId = async (req, res, next) => {
    try {
        const id = req.params.id;
        const options = { new: true };
        const update = {
            "date": `${req.body.date} ${req.body.time}`
        }

        const result = await Slot.findByIdAndUpdate(id, update, options);

        if (!result) {
            throw createError(404, "slot details not found");
        }

        res.send(result);
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            next(createError(400, "invalid id format"));
            return;
        }

        next(error);
    }
}

// for testing purposes

const getAllSlots = async (req, res, next) => {
    try {
        const result = await Slot.find({}, { __v: 0 });

        res.send(result);
    } catch (error) {
        next(error);
    }
}

const addSlot = async (req, res, next) => {
    try {
        const slot = new Slot({
            date: new Date(`${req.body.date} ${req.body.time}`),
            duration: req.body.duration,
            orgPerson: { "name": req.body.name, "univId": req.user.id },
            booked: false,
        });

        const result = await slot.save();
        res.send(result);
    } catch (error) {
        if (error.name === "ValidationError") {
            next(createError(400, error.message));
            return;
        }
        next(error);
    }
}

module.exports = {
    getAvailableSlots,
    addSlot,
    getPendingSlots,
    updateSlotbyId,
    getAllSlots,
    bookaSlot
}