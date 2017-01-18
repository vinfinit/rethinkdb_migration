const totalTimePerUser = require('./totalTimePerUser');
const sessionPerUser = require('./sessionPerUser');

let script = {};
script.totalTimePerUser = totalTimePerUser;
script.sessionPerUser = sessionPerUser;

module.exports = script;
