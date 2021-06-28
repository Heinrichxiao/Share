/* eslint-disable no-undef */
const save = require('./save');

test('test save function', () => {
    save({test: 'test'});
    const db = require('./test.json');
    expect(db).toEqual({test: 'test'});
});
