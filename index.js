module.exports = () => {
    require('dotenv').config();

    const express = require('express');
    const app = express();
    const port = process.env.PORT || 8080;
    const path = require('path');
    const login = express.Router();
    const signup = express.Router();
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const hash = require('./hash');
    const db = require('./db.json');
    const save = require('./save');

    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, './views'));
    app.use(bodyParser());
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET
    }));

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
        console.log(db);
        /* TODO: Authenticate */
        if (req.body.usr == '') {
            res.redirect('/login');
        }
        if (req.body.psw == '') {
            res.redirect('/login');
        }
        if (req.body.usr in db.users && (!Object.keys(db.users).includes(req.body.usr))) {
            res.redirect('/login');
        }
        if (Object.keys(db.users).includes(req.body.usr)) {
            if (hash(req.body.psw, db.users[req.body.usr].psw.salt).hashed == db.users[req.body.usr].psw.hashed) {
                req.session.userid = req.body.usr;
                res.redirect('/');
                return;
            }
            console.log(hash(req.body.psw, db.users[req.body.usr].psw.salt));
            console.log(db.users[req.body.usr].psw);
        }
        res.redirect('/login');
    });

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
        }
        if (req.body.psw == '') {
            res.redirect('/signup');
        }
        if (Object.keys(db.users).includes(req.body.usr)) {
            res.redirect('/login');
        }
        db.users[req.body.usr] = {
            usr: req.body.usr,
            psw: hash(req.body.psw)
        };

        save(db);

        res.redirect('/login');
    });

    app.use(signup);
    app.use(login);

    app.get('/*', (req, res) => {
        res.render('404');
    });

    app.listen(port, () => {
        console.log(`Starting server at: https://localhost:${port}`);
    });
};