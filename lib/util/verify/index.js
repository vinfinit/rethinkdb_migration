const async = require('async');
const Promise = require('bluebird');
const moment = require('moment');
const _ = require('lodash');

const sessionLimit = 3700;

module.exports = (data) => {
  let groupedData = _.groupBy(data, i => i.serial);
  let res = [];

  return new Promise((resolve, reject) => {
    async.forEachOf(groupedData, (history, serial, cb) => {
      let max = 0,
        curMax = 0,
        endDateList = [];

      let listOfData = [];

      async.each(history, (session, cb) => {
        let resEndDateList = [];
        curMax++;

        if (session.endDate.epoch_time - session.startDate.epoch_time > sessionLimit) {
          console.log('!!!!!!!!!!!!!!');
          console.log({
              startDate: `${moment(new Date(session.startDate.epoch_time * 1000)).format('DD/MM h:mm:ss a')} ${session.startDate.epoch_time}`
              , endDate: `${moment(new Date(session.endDate.epoch_time * 1000)).format('DD/MM h:mm:ss a')} ${session.endDate.epoch_time}`
              , serial: session.serial
              , id: session.id
            });
        }

        async.each(endDateList, (endDate, cb) => {
          if (session.startDate.epoch_time >= endDate.endDate.epoch_time) {
            curMax--;
          } else {
            resEndDateList.push(endDate);
          }
          cb();
        }, err => {
          if (err) {
            return cb(err);
          }
          endDateList = resEndDateList;

          endDateList.push(session);
          if (curMax > max) {
            max = curMax;
            listOfData = resEndDateList;
          }
          cb();
        });
      }, err => {
        if (err) {
          return cb(err);
        }
        let tmp = {};
        tmp[serial] = max;
        res.push(tmp)

        // let d = _.filter(listOfData, i => i.serial === '343b43e228b040e43fd8de05d8dc4b358d1260cc');
        // console.log(_.map(d, d => {
        //   return {
        //     startDate: `${moment(new Date(d.startDate.epoch_time * 1000)).format('DD/MM h:mm:ss a')} ${d.startDate.epoch_time}`
        //     , endDate: `${moment(new Date(d.endDate.epoch_time * 1000)).format('DD/MM h:mm:ss a')} ${d.endDate.epoch_time}`
        //     , serial: d.serial
        //   }
        // }))

        cb();
      });
    }, err => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    })
  })
}
