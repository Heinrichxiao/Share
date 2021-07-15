const save = require('./save');

module.exports = (database = {users: {}, videos: {}}) => {
    save(database);
};