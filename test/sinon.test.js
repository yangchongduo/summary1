/**
 * spy是最基础的，
 * 在实践中，你可能不会经常用到spy。你往往更多的用到stub。但当你需要验证某个函数是否被调用过时，spy还是很方便的：
 */
var expect = require('chai').expect;
const sinon = require('sinon')
var fetch = require('node-fetch');
const request = require('request')

var user = {
  setName: function (name) {
    this.name = name;
    return '2222'
  }
}

// 主要是记录函数的调用信息
describe('sinon.spy ', function () {
  it('sinon.spy 主要用来包装函数 记录函数的信息', function () {
    // 现在开始，每次调用这个方法时，相关信息都会被记录下来
    var setNameSpy = sinon.spy(user, 'setName');
    var value = user.setName('Darth Vader');
    user.setName('Darth Vader');

    // console.log(setNameSpy.callCount); //output: 1
    // console.log(output); 
    // sinon.assert.calledOnce(callback);

    expect(value).to.be.a('string');
    // 通过spy对象可以查看这些记录的信息
    expect(setNameSpy.callCount).to.equal(2);
    expect(setNameSpy.firstCall.args[0]).to.equal('Darth Vader');
    // 一定要销毁，
    setNameSpy.restore();
  })
})

function saveUser(user, callback) {
  // 此处假如还有大量逻辑处理
  request
    .get('https://api.github.com', {
      'auth': {
        'user': user.firstname,
        'pass': user.lastname,
        'sendImmediately': false
      }
    }, callback)
}

describe('sinon.stub', function (params) {
  // 只是用来测试 saveUser 不测试 callback
  it('stub 主要是用来测试需要强制依赖其他函数的', function (params) {
    
    var post = sinon.stub(request, 'get');
    post.yields();

    // 针对回调函数使用一个spy
    var callback = sinon.spy();

    saveUser({ firstname: 'Han', lastname: 'Solo' }, callback);

    post.restore();

    sinon.assert.calledOnce(callback);
  })
})





