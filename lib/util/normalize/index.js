const async = require('async');
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = (data) => {
  return new Promise((resolve, reject) => {

    async.sortBy(data, (i, callback) => {
      callback(null, i.startDate.epoch_time);
    }, (err, result) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}
