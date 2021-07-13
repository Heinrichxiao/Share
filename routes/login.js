const express = require('express');
const login = express.Router();
const hash = require('../hash');
const db = require('../db.json');

login.get('/login', (req, res) => {
    if (req.session.userid) {
        res.redirect('/');
        return;
    }
    res.render('login');
    return;
});

login.post('/login', (req, res) => {
    if (req.session.userid) {
        res.redirect('/');
        return;
    }
    if (req.body.usr == '') {
        res.redirect('/login');
        return;
    }
    if (req.body.psw == '') {
        res.redirect('/login');
        return;
    }
    if (
        req.body.usr in db.users &&
    !Object.keys(db.users).includes(req.body.usr)
    ) {
        res.redirect('/login');
    }
    if (Object.keys(db.users).includes(req.body.usr)) {
        if (
            hash(req.body.psw, db.users[req.body.usr].psw.salt).hashed ==
      db.users[req.body.usr].psw.hashed
        ) {
            req.session.userid = req.body.usr;
            res.redirect('/');
            return;
        }
        console.log(hash(req.body.psw, db.users[req.body.usr].psw.salt));
        console.log(db.users[req.body.usr].psw);
    }
    res.redirect('/login');
});

module.exports = login;