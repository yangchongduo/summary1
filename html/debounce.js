var count = 1;
var container = document.getElementById('container');

/**
 * setTimeout的定时器值推荐最小使用16.7ms
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
  var pre = 0;
  return () => {
    const now = +Date.now();
    if (now - pre > timeout) {
      fn();
      pre = now
    }
  }
}
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



