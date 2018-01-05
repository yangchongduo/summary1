### [阿里面试](https://github.com/jawil/blog/issues/22)
### 阿里影业：
>1. css3 用过哪些 
>2. h5的新特性用过哪些？websoket 和webworkers 有什么不同的
>3. cookie 和localstorage sessionStorageq区别
>4. angular 三种服务的区别
>5. angular 的原理 脏检查的
>5. angualr2的原理
>6. emit broadcast 
>7. react setState是同步的还是异步的
>8. react 的diff算法  key的用途
>9. vue1中的emit 和dispatch 
>10. vue2的原理


阿里UED部门   任何技术要服务于业务
>1. 使用过三个框架，及其原理看几篇有深度的博客就知道
>2. 重点是业务：是能做一个项目还是页面级别的。

|阿里云|||
|---|----|----|
|如何统计性能|||
|一个页面2s的概念 如何统计|||
|如何优化|||
| websocket |多台服务度如何通信||
|eslint|||
|组件|有几个人维护|单元测试|

#### websocket 服务端如何通信
- 使用MQ介入吧,每个server收到来自自己维护的websocket客户端发来的内容的时候,广播一个TOPIC类型的消息出去,这样每个server都能收到这个消息,然后在消息接收里面实现业务逻辑


|阿里巴巴||
|---|----|
|koa2的洋葱机制是如何实现的 |反向实现的 函数的闭包 放在数组依次执行。函数的嵌套。|
|为什么使用redux 如何实现的||
|如何通过action 中的 type 找到对应的reducer|1：串行 在返回的action 里面继续 diapatch 其他action即可。2：并行 只要type一样即可|
|平级组件是如何通讯的|1：有一个公共的父组件，将通用的属性，抽离成父组件的state，然后通过props，传递到子组件中 2：redux 就是用来做这个事的，建立一个全局的store，从store里面获取|
|最难点 diff算法 如何diff||
|左侧固定 右侧适应集中方法||

#### react reducer
- 每次dispatch 都会遍历所有的reducer，根据action中的type 执行，如果type相同就都会执行。
- action中可以继续action，promise-thunk，promise-middle
- redux-saga可代替 promise-thunk 。 实现yeild作用

- logout是一个action，是一个函数action，第一个参数是dispatch， 是由promise-thunk的原因
- vuex直接支持 dispatch
```
export const logout = () => (dispatch) => {
  local.clear('userInfo', 'accessToken', 'refreshToken');
  dispatch({ type: LOGOUT });
  dispatch(push('/login'));
};
```

#### [平级组件是如何通讯的](https://segmentfault.com/q/1010000006631206/a-1020000006632360)
- 将两个组件共有的部分，抽离成父组件的state，然后通过props传递到子组件中。
- redux中，统一的store管理。

#### 阿里

|问题|结果|反思|
|---|---|---|
|标准模式是那个版本产生的|5||
|拖拽的几种实现方式|||
|amd 模块 打包的区别|||
|浏览器的渲染机制 不是 解析机制|||
|http 协议是如何实现的|||
|nginx 和redis 的作用|||
|页面优化性能|cdn 图片 webp 静态文件【没有http请求】||
|document.write 和 innerHtml 有什么区别|||
||||
|position 几个值|||
|dom 二级事件的浏览器的机制|||
|css3 transfome|||
|水平 垂直居中|三种实现方式||
|继承|||
|webpack 打包 需要注意的东西|||
|webpack 开发环境和线上环境不同|开发环境有的 或者没有的||
|devtools #suorce-map的作用|Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。||
|addEventlister|第三个参数的意义| true的使用场景|
|为什么actchEvent 没有第三是参数|||
|es6 的 箭头函数 ... 使用场景|||
|es6 extend是如何继承的|其实这个需要知道||
|typescript|好处 性能是否比现在的js好||
|无限加载 如何优化|节流||
|页面抖动如何处理|节流 时间撮||
|react 如何理解生命周期的概念|||
|react shouldupdate 如何优化|||
|willmount didmount |那个阶段获取真实dom||
|为什么react  虚拟diff 对比 为什么要比 jquery 的那种直接获取dom 要好|||
|redux 和react 是如何结合在一起的|||
|react是否可以创建多个store|||
|let 和var的区别|||
|严格模式|ECMAscript 5 增加了严格模式|变量提升 这些功能都没有了|


#### let and var 的区别

- 没有变量提升
- 重复声明一个变量 let 和const 不能变量不能重复声明
- 变量作用域的范围不一样
```
"use strict";
(function (params) {

  {
    let name = '';
    var data= '';

  }
  console.log('name',data);
  console.log('name',name);
})()
```
#### => vs 普通函数
- 因为箭头函数是和父级上下文绑定在一起的， this是上下文
- 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
- 实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。


### 岗位描述：
- 如果你来到我们团队，你将负责：
- 钉钉核心业务开发（企业移动办公业务应用、电话办公应用、钉盘、钉邮、IM、OA管理后台、互动营销等业务开发）
- WebApp应用的性能和稳定性持续改进
- 大前端团队工程化体系建设、容器建设和Node应用框架体系建设

### 岗位要求：

    1. 熟练掌握移动端开发，了解手机适配以及容器特性；

    2. 熟练运用JavaScript语言与HTML5、CSS3等技术; 熟悉移动端Web绘图相关高级特性, 如canvas, webGL, CSS3动画效果等； 

    3. 熟悉模块化、前端编译和构建工具，熟练运用主流的移动端JS库和开发框架，并深入理解其设计原理，例如：React，Vue等；
    
    4. 能提供完善的 WebApp 和混合 App（JS方向）技术方案，了解服务端（node/java或其他语言）或native移动应用开发；
    
    5. 对技术有强烈的进取心，具有良好的沟通能力和团队合作精神、优秀的分析问题和解决问题的能力。