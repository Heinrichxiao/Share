/* eslint-disable no-undef */
const hash = require('./hash');

test('test on testing password', () => {
    expect(JSON.stringify(hash('atestingpassword', 'atestingsalt'))).toBe(JSON.stringify({
        hashed: 'a0b224142dc3f675eb9f59c94a87bb3b603a35729807353b30078cd91402e127',
        salt: 'atestingsalt'
    }));
    expect(JSON.stringify(hash('testingahashfunction', 'dontknowwhatthesaltshouldbe'))).toBe(JSON.stringify({
        hashed: '9aa975bc5f93d2cb3d5cb204fab6408cd525a5513e56384411d5ae6b75b5bad5',
        salt: 'dontknowwhatthesaltshouldbe'
    }));
    expect(JSON.stringify(hash('abcdefghijklmnopandsoOn', 'icanwritetheabcdefg'))).toBe(JSON.stringify({
        hashed: '36444f7f1969cc46775574d0b3ce2065b248a9eb37c9d601e9e6647f3ddeea9e',
        salt: 'icanwritetheabcdefg'
    }));
});