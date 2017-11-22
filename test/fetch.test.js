var fetch = require('node-fetch');
const assert = require('assert')
var expect = require('chai').expect;
const request = require('request')
const rp = require('request-promise');
const sinon = require('sinon')
// global.chai = chai;
// describe('test', function (params) {
//   it('should chec', function () {
//     expect('1').to.be.a('string');
//     expect(1).to.be.a('number');
//     expect({}).to.be.a('object');
//   })
//   it('number', function () {
//     var answer = 43;
//     expect(answer).to.equal(42)
//   })
// })

function once(fn) {
  var returnValue, called = false;
  return function () {
    if (!called) {
      called = true;
      returnValue = fn.apply(this, arguments);
    }
    return returnValue;
  };
}
describe('sinon.spy', function (params) {
  // 监控函数被调用几次 每次闯入参数是是什么以及每次返回的结果是什么
  
  it('calls the original function', function () {
    var callback = sinon.spy();
    var proxy = once(callback);
    proxy();
    proxy();
    assert(callback.calledOnce);
  });

  it('calls the original function', function () {
    var callback = sinon.spy();
    var proxy = once(callback);
    var obj = {};
    proxy.call(obj, 1, 2, 3);
    assert(callback.calledOn(obj));
    assert(callback.calledWith(1, 2, 3));
  });
})

// describe('promise.test.js - 异步测试', function () {

  //   it('异步请求应该返回一个对象', function () {
  //     return fetch('https://api.github.com')
  //       .then(function (res) {
  //         return res.json();
  //       }).then(function (json) {
  //         expect(json).to.be.an('object');
  //       });
  //   });
  // });

  // describe('Array', function () {
  //   it('异步请求应该返回一个对象', function (done) {
  //     request
  //       .get('https://api.github.com')
  //       .on('response', (res) => {
  //         expect(res).to.be.an('object');
  //         done();
  //       })
  //   })
  // });


  // describe('async.test.js - 异步测试', function () {
  //   it('异步请求应该返回一个对象', function (done) {
  //     request
  //       .get('https://api.github.com')
  //       .end(function (err, res) {
  //         expect(res).to.be.an('string');
  //         done();
  //       });
  //   });
  // });

  // describe('rp', function () {
  //   it('异步请求应该返回一个对象', function () {
  //     return rp
  //       .get('https://api.github.com')
  //       .then(function (err, res) {
  //         expect(res).to.be.an('object');
  //         // done();
  //       });
  //   });
  // });
  // describe('test', function () {
  //   it('should complete this test', function () {
  //     return new Promise(function (resolve) {
  //       assert.ok(true);
  //       resolve();
  //     })
  //       // .then(done);
  //   });
// })
