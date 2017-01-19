const async = require('async');
const Promise = require('bluebird');
const _ = require('lodash');

const sessionPerUser = require('../sessionPerUser');

module.exports = (data) => {
  return new Promise((resolve, reject) => {
    sessionPerUser(data)
      .then(groupedPerUser => {
        async.mapValues(groupedPerUser, (usingHistory, email, cb) => {
          cb(null, {
            sessionCount: usingHistory.length
            , totalTime: round(total(usingHistory))
            , expectation: round(expectation(usingHistory))
            , median: round(median(usingHistory))
          })
        }, (err, res) => {
          if (err) {
            return reject(err)
          }
          res = _.keys(res).map(email => {
            return {
              email: email
              , data: res[email]
            }
          })
          resolve(res)
        })
      })
  })
}

function expectation(usingHistory) {
  let count = usingHistory.length;
  return _.reduce(usingHistory, (cum, i) => {
    return cum + convert(i.endDate.getTime() - i.startDate.getTime()) / count
  }, 0)
}

function median(usingHistory) {
  let count = usingHistory.length;
  let transformHistory = usingHistory.map(i => convert(i.endDate.getTime() - i.startDate.getTime()));
  transformHistory.sort((a, b) => a - b);

  return (count % 2 === 0)
    ? (transformHistory[count / 2 - 1] + transformHistory[count / 2]) / 2
    : transformHistory[parseInt(count / 2, 10)]
}

function total(usingHistory) {
  return _.reduce(usingHistory, (cum, i) => {
    return cum + convert(i.endDate.getTime() - i.startDate.getTime())
  }, 0)
}

// Convert ms to m
function convert(ms) {
  return ms / 1000 / 60
}

function round(time) {
  return +(time).toFixed(2)
}
