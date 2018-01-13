//  可做单元测试
const assert = require('assert')
const obj = {
  fn1: () => {
    console.log('222');
  }
}
assert(obj.fn1, '没有fn3这个函数');
// assert(obj.fn3, '没有fn3这个函数');



const obj1 = {
  a: {
    b: 1
  }
};
const obj2 = {
  a: {
    b: 2
  }
};
const obj3 = {
  a: {
    b: 1
  }
};
const obj4 = Object.create(obj1, {
  name: 11
});
console.dir(obj4);
assert.deepEqual(obj1, obj1);
// 测试通过，对象与自身相等。

// assert.deepEqual(obj1, obj2);
// 抛出 AssertionError: { a: { b: 1 } } deepEqual { a: { b: 2 } }
// 因为 b 属性的值不同。

assert.deepEqual(obj1, obj3);
// 测试通过，两个对象相等。
// console.log(obj1 === obj3);
assert.deepEqual(obj1, obj4, 'ddd');