const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth/main'));
router.use('/user', require('./user/main'));

module.exports = router