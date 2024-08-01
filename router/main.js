const express = require('express');
const router = express.Router();

router.use('/user', require('./api/main'));
router.use('/auth', require('./auth/main'));
router.use('/api', require('./api/main'));

module.exports = router;