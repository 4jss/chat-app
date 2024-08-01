const express = require('express');
const ejs = require('ejs');
const minifyHTML = require('express-minify-html');
const config = require('config');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));

app.use('/', require('./router/main'));

app.get('/', (req, res) => {
    try {
        return res.status(404).render('index', { appName: config.appName });
    } catch (error) {
        return (
            console.error(error),
            res.status(500).json({ status: 500, message: 'internal server error' })
        );
    };
});

app.all('/*', (req, res) => {
    try {
        return res.status(404).render('404', { appName: config.appName });
    } catch (error) {
        return (
            console.error(error),
            res.status(500).json({ status: 500, message: 'internal server error' })
        );
    };
});

app.listen(config.port, config.hostname, () => {
    console.log(`listening on ${config.hostname}:${config.port}`);
});