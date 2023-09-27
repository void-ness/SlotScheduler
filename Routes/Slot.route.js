const express = require('express');
const router = express.Router();

const SlotController = require('../Controllers/Slot.controller');
const authenticateUser = require('../Utility/authenticate');

router.get('/all', authenticateUser, SlotController.getAllSlots);

router.get('/available', authenticateUser, SlotController.getAvailableSlots);

router.get('/pending', authenticateUser, SlotController.getPendingSlots);

router.post('/', authenticateUser, SlotController.addSlot);

router.patch('/:id', authenticateUser, SlotController.updateSlotbyId);

router.post('/book', authenticateUser, SlotController.bookaSlot);

module.exports = router;