在JS的非严格模式下
1、自执行函数中的THIS永远是window
  ->自执行函数:定义完成一个函数就立马执行了
    (function(){})();
    +function(){}();
    !function(){}();
    ~function(){}();

2、给元素的某一个行为绑定一个方法,当行为触发的时候,执行对应的方法,此时方法中的THIS是“当前元素本身”
  ->curEle.onclick=function(){this->curEle};

3、当方法执行的时候,方法中的THIS是谁,就看方法名前面是否有".",有的话,"."前面是谁THIS就是谁,没有的话THIS就是window

4、在构造函数模式中,方法体中的this.xx=xx中的this是当前类的一个实例

5、使用call/apply/bind来强制改变一个方法中的THIS指向
   fn.call(); //this->window
   fn.call(null); //this->window
   fn.call(undefined); //this->window


在JS严格模式下 "use strict"
->自执行函数中的THIS是undefined
->使用call或者apply改变THIS和非严格模式有一些区别
  fn.call(); //this->undefined
  fn.call(null); //this->null
  fn.call(undefined); //this->undefined

  "use strict";
  function fn() {
      console.log(this);
  }
  fn();//this->undefined
  window.fn();//this->window

->两者模式下的区别:非严格模式下所有没有具体写上执行主体的,都默许THIS是window,但是严格模式下,没有写的话,this就是undefined