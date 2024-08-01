const express = require('express');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
const config = require('config');
const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const client = new MongoClient(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        if (!username || !password) {
            return res.status(400).json({ status: 400, message: 'fill all fields' });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username: username,
            password: hashedPassword
        };

        await client.connect();
        const userInsert = await client.db('db').collection('user').insertOne(user);
        return res.status(201).json({ status: 201, message: 'user created' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'internal server error' });
    } finally {
        await client.close();
    }
});

module.exports = router;