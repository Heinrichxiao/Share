const express = require('express');
const play = express.Router();
const db = require('../db.json');

play.get('/play/', (req, res) => {
    res.render('play');
});

play.get('/play/api/:videoid', (req, res) => {
    const video = db.videos[req.params.videoid];
    res.json(video);
});

module.exports = play;