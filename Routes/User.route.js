const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/User.controller');
const authenticateUser = require('../Utility/authenticate');

router.post('/login', UserController.authorizeUser);

router.get('/:id', authenticateUser, UserController.getUserbyId);

router.patch('/:id', authenticateUser, UserController.updateUserbyId);

router.delete('/:id', authenticateUser, UserController.deleteUserbyId);

// for testing purposes
router.post('/', authenticateUser, UserController.addUser);

router.get('/', authenticateUser, UserController.getAllUsers);

module.exports = router;