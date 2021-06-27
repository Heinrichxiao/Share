const sha256 = require('./sha256');

function hash(password, salt=getRandomString(10)) {
    const befHashed = password + salt;
    const hashed = sha256(befHashed);

    return {
        hashed,
        salt
    };
}

function getRandomString(length) {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

module.exports = hash;