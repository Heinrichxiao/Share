const express = require('express');
const signup = express.Router();
const hash = require('../hash');
const db = require('../db.json');
const save = require('../save');

signup.get('/signup', (req, res) => {
    if (req.session.userid) {
        res.redirect('/');
        return;
    }
    res.render('signup');
    return;
});

signup.post('/signup', (req, res) => {
    if (req.session.userid) {
        res.redirect('/');
        return;
    }

    if (req.body.usr == '') {
        res.redirect('/signup');
        return;
    }
    if (req.body.psw == '') {
        res.redirect('/signup');
        return;
    }
    if (Object.keys(db.users).includes(req.body.usr)) {
        res.redirect('/login');
        return;
    }
    db.users[req.body.usr] = {
        usr: req.body.usr,
        psw: hash(req.body.psw)
    };

    save(db);

    res.redirect('/login');
});

module.exports = signup;
