const express = require('express');
const ejs = require('ejs');
const config = require('./config.json');
const app = express();
app.set('view engine', 'ejs');
app.all('/*', (req, res) => {
    try {
        return res.status(404).render('404', { appName: config.appName });
    } catch (error) {
        return (
            console.error(error),
            res.status(500).json({ status: 500, message: 'internal server error' })
        );
    }
});

app.listen(config.port, config.hostname, () => {
    console.log(`listening on ${config.hostname}:${config.port}`);
});