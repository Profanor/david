const express = require('express');
const sendEmail  = require('../contact/contact');

const router = express.Router();

router.post('/contact', sendEmail);

module.exports = router;