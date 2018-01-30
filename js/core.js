//  on off emit once  实现 可查看
class EE {
  constructor() {
    this.events = {};
  }
  on(type, fn) {
    if (this.events[type]) {
      this.events[type].push(fn);
    } else {
      this.events[type] = [fn]
    }
  }
  onceWrap() {
    // 一旦被执行多次就不会再次回
    if (!this.fired) {
      this.target.off(this.type, this.wrap);
      this.fired = true;
      this.listener.apply(this.target)
    }
  }
  _onceWrap(target, type, listener) {
    var status = { type, fired: false, wrap: undefined, listener, target };
    const wrap = this.onceWrap.bind(status);
    status.wrap = wrap;
    return wrap;
  }
  once(type, fn) {
    this.on(type, this._onceWrap(this, type, fn))
  }
  off(type, fn) {
    this.events[type] = this.events[type].filter((item, index) => {
      return item != fn;
    })
  }
  emit(type, ...arg) {
    this.events[type].map((item) => {
      item.apply(this, arg)
    })
  }
}
class A extends EE {

}
const girl = () => {
  console.log('gril');
}
const money = () => {
  console.log('money');
}
const once = () => {
  console.log('once');
}
var a = new A();
a.on('son', girl)
a.on('son', money)
a.once('son', once)
a.emit('son')
a.off('son', girl)
a.emit('son')
a.emit('son')


// koa2的实现
// redux中间件的实现

// 顺序执行
var middleware = [async function (ctx, next) {
  console.log('1');
  await next();
  console.log('11');
}, async function (ctx, next) {
  console.log('2');
  await next();
  console.log('22');
}, async function (ctx, next) {
  console.log('3');
  await next()
  console.log('33');
}]

// 自己实现
const compose = (ctx, next) => {
  return dispatch(0)
  function dispatch(i) {
    var fn = middleware[i]
    if (i == middleware.length) {
      fn = next;
    }
    if (!fn) {
      return Promise.resolve()
    }
    return Promise.resolve(fn(ctx, function next() {
      return dispatch(i + 1)
    }))
  }
}
// 源码实现
// const compose = function (context, next) {
//   // last called middleware #
//   let index = -1
//   return dispatch(0) // 一直在这个 dispatch 原来就是这个东西
//   function dispatch(i) {
//     console.log('i', i)
//     console.log('index', index)
//     debugger
//     if (i <= index) return Promise.reject(new Error('next() called multiple times'))
//     console.log('-----')
//     index = i
//     let fn = middleware[i]
//     if (i === middleware.length) fn = next
//     if (!fn) return Promise.resolve()
//     try {
//       // 每个中间件第一个参数都是会 context
//       return Promise.resolve(fn(context, function next() {
//         // return 1、await 后面是普通函数也ok，也会马上变成promise.resolve ,但是里面的异步不会同步执行
//         // 这个return的作用就是为了能够让异步函数同步执行
//         return dispatch(i + 1)
//       }))
//     } catch (err) {
//       return Promise.reject(err)
//     }
//   }
// }
var obj = { name: 1 }
compose(obj)




// redux中间件的实现；
const fn1 = (pre) => {
  // console.log('1');
  return `${pre}1`
}
const fn2 = (pre) => {
  // console.log('2');
  return `${pre}2`
}
const fn3 = (pre) => {
  // console.log('3');
  return `${pre}3`
}

var data = [fn1, fn2, fn3].reduce((a, b) => {
  return b(a)
}, 'pre');
console.log(data);







Function.prototype.bind = function (context, ...out) {
  if ('bind' in Function.prototype) {
    return this.bind.apply(this, arguments)
  }
  return (...inner) => (this.apply(context, [...out, ...inner]))
}

const on = (ele, type, fn) => {
  if (ele.addEventListener) {
    ele.addEventListener(type, fn, false)
  } else {
    if (!ele[`event${type}`]) {
      ele[`event${type}`] = [];
      ele.attachEvent(`on${type}`, function () {
        run.call(ele)
      })
    }
    var a = ele[`event${type}`];
    a.map((item, index) => {
      if (item == fn) {
        return
      }
    })
    a.push(fn)
  }
}
const off = (ele, type, fn) => {
  if (ele.removeEventListener) {
    ele.removeEventListener(type, fn, false)
  } else {
    var a = ele[`event${type}`]
    if (a) {
      a.map((item, index) => {
        if (item == fn) {
          a[index] = null;
        }
      })
    }
  }
}
const run = () => {
  const e = window.event;
  const type = e.type;
  const array = this[`event${type}`];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (typeof element == 'function') {
      element.call(this, e)
    } else {
      array.splice(index, 1);
      index--;
    }
  }
}
// 继承 call 原型继承



