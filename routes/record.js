const express = require('express');
const record = express.Router();
const db = require('../db.json');
const save = require('../save');

record.get('/record', (req, res) => {
    if (!req.session.userid) {
        res.redirect('/login');
        return;
    }
    res.send('todo');
});

module.exports = record;