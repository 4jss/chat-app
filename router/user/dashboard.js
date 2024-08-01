const express = require('express');
const config = require('config');
const router = express.Router();

router.post('/', async(req, res) => {
    try {
        return res.status(200).render('user/dashboard', { appName: config.appName });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'internal server error' });
    }
});

module.exports = router;