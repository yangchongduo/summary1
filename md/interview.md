#### interview
- 1、JavaScript相关：闭包、跨域、继承、原型链、设计模式、正则
- 2、CSS相关：选择器权重
- 3、HTML相关：盒模型、viewport、块级元素、行内元素
- 4、构建工具相关：gulp、webpack了解一个
- 5、Node.js相关：HTTP模块、File模块、创建服务器的原理
- 6、网络相关：HTTP、TCP、UDP、DNS、WebSocket
- 7、框架相关：jQuery、MVVM框架了解一个
- 8、数据库相关：关系型数据库必备一个、MongoDB、redis等非关系型数据库选择了解
- 9、工具相关：Chrome开发者工具、fiddler
- 10、设计知识：基本的设计原则、基本的设计规范
- 11、Web安全：XSS、CSRF、SQL注入
- 12、性能优化：CDN加速、负载均衡等
- 12、其他需要了解的：Linux、计算机组成原理、操作系统、一种或多种后端语言（推荐必备Node.js，再加C#、PHP、Python、Java、go中的一门）


### bind实现

```
Function.prototype.bind = function (context, ...outarg) {
  if ('bind' in Function.prototype) {
    return this.bind.apply(this, arguments)
  }
  return (...innnerarg) => (this.apply(context, [...outarg, ...innnerarg]))
}

Function.prototype.myBind = function myBind(context, ...outerArg) {
  if ("bind" in Function.prototype) {
    return this.bind.apply(this, arguments);
  }
  //->IE6~8
  var _this = this;
  return function (...innerArg) {
    _this.apply(context, [...outerArg, ...innerArg]);
  }
};
var obj = {
  fn() {
    console.log(this);
  }
}
var obj2 = {
  name: 'xx'
}
var data = obj.fn.myBind(obj2)


Function.prototype.myBind = function myBind(context) {
    if ("bind" in Function.prototype) {
        return this.bind.apply(this, arguments);
    }
    //->IE6~8
    var _this = this;
    var outerArg = [].slice.call(arguments, 1);
    return function () {
        var innerArg = [].slice.call(arguments, 0);
        _this.apply(context, outerArg.concat(innerArg));
    }
};
var curry = function (fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    var newArgs = args.concat([].slice.call(arguments, 1));
    return fn.apply(this, newArgs);
  };
};
this 指向不好
var curry = (fn, ...args) => (...arguments) => fn.apply(this, [...args, ...arguments])
```

#### 浏览器对象

    window history location navigator screen

#### [事件代理](https://www.cnblogs.com/liugang-vip/p/5616484.html)

#### 顺序 二分;

#### 实现如下语法的功能：var a = (2).multiply(3).plus(4); （原型方法）
```
  Number.prototype.multiply = function (num) {
    return this * num
  }
  Number.prototype.plus = function (num) {
    return this + num
  }
  var a = (2).multiply(3).plus(4);

  console.log(a);
```
#### 利用数组方法，将数组[0,1,2,3]转化为字符串“35410”？（数组方法）

#### 利用正则表达式验证字符串是否是电话号码，区号是3位或4位，电话是7位或8位，允许没有区号，如果有的话它们之间用小短线连接。（先了解会不会正则）


####有一个块，点击切换列表的显示，选中列表的某一项，在块中显示列表项的内容，并同时出现一个清空按钮，点击清空按钮会清除块中的显示。（可以延伸到清空按钮如果在块内部，主要考stopPropagation）