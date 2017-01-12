const moment = require('moment');
const _ = require('lodash');
const jsonFile = require('jsonfile');

const util = require('./lib/util');

const data = require('/Users/vladimir/Downloads/rethinkdb_dump_2016-12-28T12:46:54/stf/deviceHistory');
console.log(data.length);

util.verify(data)
  .then(res => {
    console.log(res);
    util.fix(data)
      .then(res => {
        console.log('___________________');
        util.verify(data)
          .then(res => {
            jsonFile.writeFile('deviceHistory.json', data, (err) => {
              if (err) {
                throw err;
              }
              console.log(res);
              console.log('saved!!!', data.length);
            })
          })
      })
      .catch(err => console.error)
  })
  .catch(err => console.error);

// let d = _.filter(listOfData, i => i.serial === '323378DB255F00EC');
// console.log(_.map(d, d => {
//   return {
//     startDate: moment(new Date(d.startDate.epoch_time * 1000)).format('h:mm:ss a')
//     , endDate: moment(new Date(d.endDate.epoch_time * 1000)).format('h:mm:ss a')
//     , serial: d.serial
//   }
// }))
