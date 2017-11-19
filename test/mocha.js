var assert = require('assert');
const request = require('request')
describe('Array', function () {
  it('异步请求应该返回一个对象', function (done) {
    request
      .get('https://api.github.com')
      .end(function (err, res) {
        expect(res).to.be.an('object');
        done();
      });
  })
});