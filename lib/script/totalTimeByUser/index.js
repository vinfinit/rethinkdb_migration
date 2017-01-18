const async = require('async');
const Promise = require('bluebird');
const _ = require('lodash');

const sessionLimit = 3700;

module.exports = (data) => {
  let groupDataByUser = _.groupBy(data, i => i.userEmail);
  return new Promise((resolve, reject) => {
    async.mapValues(groupDataByUser, (deviceHistory, email, cb) => {
      async.reduce(deviceHistory, 0, (memo, i, cb) => {
        process.nextTick(function() {
          cb(null, memo + (i.endDate.epoch_time - i.startDate.epoch_time))
        });
      }, (err, cum) => {
        if (err) {
          cb(err);
        }
        cb(null, cum / (60 * 60));
      })
    }, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    })
  })
}
