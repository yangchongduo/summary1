const process = require('process')
//  抛出错误 只能是同步
// try {
//   throw Error("unexpected operation happen...")
// }
// catch (e) {
//   console.log(e.message)
// }

// 异步 通过捕获 uncaughtException
// try {
//   setTimeout(() => {
//     throw Error("unexpected operation happen...")
//   }, 100);
// }
// catch (e) {
//   console.log(e.message)
// }
// process.on('uncaughtException', function (err) {
//   console.log('err', err);
// });


