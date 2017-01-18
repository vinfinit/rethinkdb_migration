const moment = require('moment');
const _ = require('lodash');
const jsonFile = require('jsonfile');

const util = require('./lib/util');
const script = require('./lib/script');

const output = './data/output.json';
const input = require('./data/deviceHistory.json');

util.fix(input)
  .then(data => {
    console.log('fixed')
    script.totalTimeByUser(data)
      .then(res => {
        let cum = 0;
        _.forIn(res, (val, key) => {
          cum += val
        })
        console.log(cum)
        jsonFile.writeFile(output, res, (err) => {
          if (err) {
            throw new Error(err)
          }
          console.log(res);
          console.log('saved!!!', input.length);
        })
      })
    .catch(err => {
      throw new Error(err)
    })
  })
  .catch(console.error)

// let d = _.filter(listOfData, i => i.serial === '323378DB255F00EC');
// console.log(_.map(d, d => {
//   return {
//     startDate: moment(new Date(d.startDate.epoch_time * 1000)).format('h:mm:ss a')
//     , endDate: moment(new Date(d.endDate.epoch_time * 1000)).format('h:mm:ss a')
//     , serial: d.serial
//   }
// }))
