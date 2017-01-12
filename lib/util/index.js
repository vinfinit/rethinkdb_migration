const verify = require('./verify');
const fix = require('./fix');

let util = {};
util.verify = verify;
util.fix = fix;

module.exports = util;
