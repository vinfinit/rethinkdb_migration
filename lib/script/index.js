const fullStatistic = require('./fullStatistic');

const totalTimePerUser = require('./totalTimePerUser');
const sessionPerUser = require('./sessionPerUser');

let script = {
  fullStatistic, totalTimePerUser, sessionPerUser
};

module.exports = script;
