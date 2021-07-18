const fs = require('fs');

module.exports = () => {
    fs.rename('db.sample.json', 'db.json', (err) => {
        if (err) return;
    });
};