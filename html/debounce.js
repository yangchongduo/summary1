var count = 1;
var container = document.getElementById('container');

/**
 * setTimeout的定时器值推荐最小使用16.7ms
 * 人类的最大识别是 60帧 如果再大就无法 无法识别 1000/60 =  16.7;
 */
function getUserAction() {
  // 触发的次数太多了   设置一个时间 在这个时间内不会在触发，在这个时间内的话
  container.innerHTML = count++;
};

// container.onmousemove = getUserAction;
// 放抖动 坏处就是 最后一次触发和函数执行需要等待一段时间
const debounce = (fn, timeout) => {
  var time;
  return () => {
    clearTimeout(time)
    time = setTimeout(() => {
      fn()
    }, timeout);
  }
}

// container.onmousemove = debounce(getUserAction, 1000);


// 还是节流比较友好；
const throttle = (fn, timeout) => {
  var pre = 0, timer;
  return () => {
    const now = +Date.now();
    const wait = timeout - (now - pre)
    if (wait <= 0) {
      if (timeout) {
        clearTimeout(timer);
        timer = null;
      }
      fn();
      pre = now
    } else if (!timer) {
      timer = setTimeout(() => {
        fn()
        pre = +new Date();
      }, wait);
    }
  }
}
// function throttle(func, wait) {
//   var timeout, context, args, result;
//   var previous = 0;

//   var later = function () {
//     previous = +new Date();
//     timeout = null;
//     func.apply(context, args)
//   };

//   var throttled = function () {
//     var now = +new Date();
//     //下次触发 func 剩余的时间
//     var remaining = wait - (now - previous);
//     context = this;
//     args = arguments;
//     // 如果没有剩余的时间了或者你改了系统时间
//     if (remaining <= 0 || remaining > wait) {
//       if (timeout) {
//         clearTimeout(timeout);
//         timeout = null;
//       }
//       previous = now;
//       func.apply(context, args);
//     } else if (!timeout) {
//       timeout = setTimeout(later, remaining);
//     }
//   };
//   return throttled;
// }
// 能够实现正常过度
container.onmousemove = throttle(getUserAction, 1000);
















// const throttle = function (fn, timeout) {
//   var pre = 0;
//   return function (params) {
//     var now = +Date.now();
//     // 前后两个时间差距
//     if (now - pre > timeout) {
//       fn();
//       pre = now;
//     }
//   }
// }
// container.onmousemove = throttle(getUserAction, 1000);












// const throttle = function (fn, timeout) {
//   let pre = 0;
//   return function (params) {
//     var now = + Date.now();
//     if (now - pre > timeout) {
//       fn();
//       pre = now;
//     }
//   }
// }



