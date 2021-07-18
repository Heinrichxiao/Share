module.exports = () => {
    require('dotenv').config();
  
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 8080;
    const path = require('path');
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const login = require('./routes/login');
    const signup = require('./routes/signup');
    const record = require('./routes/record');
    const logout = require('./routes/logout');
    const play = require('./routes/play');
    const index = require('./routes/index');
    
    // Set views
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, './views'));

    // Use libraries or features
    app.use(bodyParser());
    app.use(
        session({
            resave: false,
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET
        })
    );
    app.use(express.static('public'));
    
    // Use routers
    app.use(signup);
    app.use(login);
    app.use(index);
    app.use(logout);
    app.use(record);
    app.use(play);
  
    app.get('/*', (req, res) => {
        res.render('404');
    });
  
    app.listen(port, () => {
        console.log(`Starting server at: https://localhost:${port}`);
    });
};
