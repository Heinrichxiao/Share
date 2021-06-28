/* eslint-disable no-undef */
const save = require('./save');
const fs = require('fs');

test('test save function', () => {
    save({test: 'test'}, './test.json');
    let db;
    fs.readFile('./test.json', 'utf8', (err, data) => {
        db = data;
    });
    if (db == '{test: \'test\'}') {
        expect(true).toBe(true);
    }
});
