const async = require('async');
const Promise = require('bluebird');
const _ = require('lodash');

const sessionLimit = 5400;

module.exports = (data) => {
  let groupDataBySerial = _.groupBy(data, i => i.serial);
  return new Promise((resolve, reject) => {
    async.forEachOf(groupDataBySerial, (deviceHistory, serial, cb) => {
      let groupDataByEndDate = _.groupBy(deviceHistory, i => i.endDate.epoch_time);
      async.forEachOf(groupDataByEndDate, (interval, endDate, cb) => {
        if (interval.length > 1) {
          for (let i = 0; i < interval.length - 1; i++) {
            interval[i].endDate.epoch_time = interval[i + 1].startDate.epoch_time;
          }
        }
        interval.forEach(session => {
          if (session.endDate.epoch_time - session.startDate.epoch_time > sessionLimit) {
            session.endDate.epoch_time = session.startDate.epoch_time + sessionLimit;
          }
        })
        cb();
      }, err => {
        if (err) {
          return cb(err);
        }
        cb();
      })
    }, err => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    })
  })
}
