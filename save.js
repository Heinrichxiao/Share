const fs = require('fs');

module.exports = (db, dbName = './db.json') => {
    fs.writeFile(dbName, JSON.stringify(db), (err) => {
        if (err) console.log(err);
    });
};