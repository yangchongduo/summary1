/**
 *尾递归优化
 */

// function factorial(n) {
//   if (n === 1) return 1;
//   return n * factorial(n - 1);
// }

// console.log(factorial(5))

// function factorial1(n, total) {
//   if (n === 1) return total;
//   return factorial1(n - 1, n * total);
// }

// console.log(factorial1(5, 1))

function Fibonacci(n) {
  if (n <= 1) { return 1 };

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

// var data = Fibonacci(10) // 89
// var data = Fibonacci(100) // 堆栈溢出
// Fibonacci(500)
// console.log(data);

function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

// var data = Fibonacci2(100) // 573147844013817200000
// var data = Fibonacci2(1000) // 7.0330367711422765e+208
var data =Fibonacci2(10000)
console.log(data);