/* eslint-disable no-undef */
const save = require('./save');

test('test save function', () => {
    save({test: 'test'}, './test.json');
    const db = require('./test.json');
    expect(db).toEqual({test: 'test'});
});
