const async = require('async');
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = (data) => {
  let groupDataByUser = _.groupBy(data, i => i.userEmail);
  return new Promise((resolve, reject) => {
    async.mapValues(groupDataByUser, (deviceHistory, email, cb) => {
      async.map(deviceHistory, (i, cb) => {
        setImmediate(() => cb(null, format(i.startDate, i.endDate)));
      }, (err, sessions) => {
        if (err) {
          return cb(err);
        }
        cb(null, sessions);
      })
    }, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    })
  })
}

function format(startDate, endDate) {
  return {
    startDate: new Date(startDate.epoch_time * 1000)
    , endDate: new Date(endDate.epoch_time * 1000)
  }
}
