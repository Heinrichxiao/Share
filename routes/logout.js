const express = require('express');
const logout = express.Router();

logout.get('/logout', (req, res) => {
    req.session.userid = undefined;
    res.redirect('/');
});

module.exports = logout;