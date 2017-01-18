const async = require('async');
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = (data) => {
  let groupDataByUser = _.groupBy(data, i => i.userEmail);
  return new Promise((resolve, reject) => {
    async.mapValues(groupDataByUser, (deviceHistory, email, cb) => {
      async.map(deviceHistory, (i, cb) => {
        setImmediate(() => cb(null, [new Date(i.startDate.epoch_time * 1000), new Date(i.endDate.epoch_time * 1000)]));
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
