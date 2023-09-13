const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Create a new message
router.post('/create', messageController.createMessage);

// Retrieve messages for a user
router.get('/user/:userId', messageController.getMessagesForUser);

module.exports = router;
