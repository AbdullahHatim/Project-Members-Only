const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages.controller');

/* GET home page. */
router.get('/', messagesController.getAllMessages);

module.exports = router;
