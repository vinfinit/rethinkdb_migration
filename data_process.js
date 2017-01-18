const moment = require('moment');
const _ = require('lodash');
const jsonFile = require('jsonfile');

const util = require('./lib/util');
const script = require('./lib/script');

const output = './data/output.json';
const input = require('./data/deviceHistory.json');

console.log(output.length);

// util.normalize(input)
//   .then(res => {
//     jsonFile.writeFile(output, input, (err) => {
//       if (err) {
//         throw err;
//       }
//       util.verify(output)
//         .then(res => {
//           console.log(res);
//         });
//     })
//   })

// util.verify(output)
//   .then(res => {
//     console.log(res);
//   });


util.fix(input)
  .then(data => {
    script.totalTimeByUser(data)
      .then(res => {
        let cum = 0;
        _.forIn(res, (val, key) => {
          cum += val
        })
        console.log(cum)
        jsonFile.writeFile(output, res, (err) => {
          if (err) {
            throw err;
          }
          console.log(res);
          console.log('saved!!!', input.length);
        })
      })
    .catch(err => {
      throw new Error(err)
    })
  })
  .catch(err => console.error)

// let d = _.filter(listOfData, i => i.serial === '323378DB255F00EC');
// console.log(_.map(d, d => {
//   return {
//     startDate: moment(new Date(d.startDate.epoch_time * 1000)).format('h:mm:ss a')
//     , endDate: moment(new Date(d.endDate.epoch_time * 1000)).format('h:mm:ss a')
//     , serial: d.serial
//   }
// }))
