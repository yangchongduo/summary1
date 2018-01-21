let a = 10;
a = 11;

console.log(a);
{
  let name = 10;
}
{
  let age = 10;
}
// console.log(age);
let age;
console.log(age);
// var 代码块的概念,比如for i是全局的， 如果使用let的 代码块都有自己的 let 彼此之间不会干扰 没有提升 不多多次声明

console.log(ycd);
var ycd;
// const 声明是必须赋值 要不报错 如果一个对象是ok的
const dd = 100;


{
  var lai = 10;
}
{ var lai = 11; }
setTimeout(() => {
  console.log(lai);
}, 0);