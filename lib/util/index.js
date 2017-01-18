const verify = require('./verify');
const fix = require('./fix');
const normalize = require('./normalize');

let util = {};
util.verify = verify;
util.normalize = normalize;
util.fix = fix;

module.exports = util;
