const express = require('express');
const record = express.Router();
const db = require('../db.json');
const save = require('../save');

record.get('/record', (req, res) => {
    if (!req.session.userid) {
        res.redirect('/login');
        return;
    }
    res.render('record');
});

record.post('/record', (req, res) => {
    const data = req.body;
    if (db.videos[data.name]) {
        if (db.videos[data.name].finished) {
            res.json({
                error: 1
            });
            return;
        }
    } else {
        db.videos[data.name] = [];
    }
    if (data.finished) db.videos[data.name].finished = true;
    db.videos[data.name].push(data.frame);
    save(db);
    res.json({
        error: null
    });
});

module.exports = record;