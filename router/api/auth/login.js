const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const config = require('config');
const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const client = new MongoClient(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        if (!username || !password) {
            return res.status(400).json({ status: 400, message: 'missing fields' });
        };

        await client.connect();
        const user = await client.db('db').collection('user').findOne({ username: username });

        if (user == null) {
            return res.status(404).json({ status: 404, message: 'no account matching these records' });
        };

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch == false) {
            return res.status(404).json({ status: 404, message: 'no account matching these records' });
        };
        
        if (res.body.stayloggedin == true) {
            const token = jwt.sign(user, config.secret);
            return res.status(200).json({ status: 200, message: 'login successful' }).cookie('token', token, { expires: 86400000 });
        };

        const token = jwt.sign(user, config.secret, { expiresIn: '24h' });
        return res.status(200).json({ status: 200, message: 'login successful' }).cookie('token', );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'internal server error' });
    } finally {
        await client.close();
    };
});

module.exports = router;