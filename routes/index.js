const express = require('express');
const index = express.Router();
// eslint-disable-next-line no-unused-vars
const db = require('../db.json');

index.get('/', (req, res) => {
    if (!req.session.userid) {
        res.redirect('/login');
        return;
    }
    /* TODO: Render a template */
    res.send('logged in');
});

module.exports = index;