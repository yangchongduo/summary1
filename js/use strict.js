// "use strict";

(function() {
  var varTest = 'test var OK.';
  let letTest = 'test let OK.';

  var varTest = 'varTest changed.';
  let letTest = 'letTest changed.'; //直接报错：SyntaxError: Identifier 'letTest' has already been declared

  console.log(varTest); //输出varTest changed.(注意要注释掉上面letTest变量的重复声明才能运行)
  console.log(letTest);
}());