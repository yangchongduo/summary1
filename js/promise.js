/**
 * 题目1
 */

// const promise = new Promise((resolve, reject) => {
//   console.log(1)
//   resolve()
//   console.log(2)
// })
// promise.then(() => {
//   console.log(3)
// })
// console.log(4)
/**
 * 1 2 4 3
 */

/**
 * 题目二  then:  success1 一个promise 只有一种状态
 */
// const promise = new Promise((resolve, reject) => {
//   resolve('success1')
//   reject('error')
//   resolve('success2')
// })

// promise
//   .then((res) => {
//     console.log('then: ', res)
//   })
//   .catch((err) => {
//     console.log('catch: ', err)
//   })

/**
 * 题目三 执行函数  10  解释：.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。
 */

// Promise.resolve(10)
//   .then(2)
//   .then(Promise.resolve(3))
//   .then(console.log)

/**
 * 捕获异常
*/


Promise.resolve()
  .then(function success(res) {
    throw new Error('error')
  }, function fail1(e) {
    console.error('fail1: ', e)
  })
  .catch(function fail2(e) {
    console.error('fail2: ', e)
  })


/**
 * 题目6
 */
process.nextTick(() => {
  console.log('nextTick')
})
Promise.resolve()
  .then(() => {
    console.log('then')
  })
setImmediate(() => {
  console.log('setImmediate')
})
console.log('end')


/**
 * 题目7
 */
new Promise(resolve => {
  resolve(new Promise(reject => {
    setTimeout(() => {
      reject(Promise.resolve(1))
    }, 3000)
  }))
})
  .then(console.log)
  .catch(console.log)