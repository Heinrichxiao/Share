const save = require('./save');

module.exports = (database = {users: {}}) => {
    save(database);
};