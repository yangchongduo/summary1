#### module.exports和exports的区别
---------------------------------
```
(function (exports,require,module,__dirname,__filename) {
    //模块化 返回对象 暴露接口
    //__dirname __filename 是通过外界传进来的，所以可以在文件中访问
    exports = module.exports = {};
    //exports  = Person;//改变了exports指向但是，module没有变化
    function Person (){}
    //方法1：给exports增加属性会影响到module.exports值
    //方法2：直接改变module.exports
    //exports.person = Person =》
    exports = module.exports = {person:Person};
    //引用地址
    return module.exports;
    //如果导出的是引用数据类型 用module.exports =Function
    //错误方式epxorts = Function
})();
2:module.export    export 有什么区别
export=module.export={}
// 要是改变export的指向 增加属性是没有用的
return module.export 

```
#### 做什么事之前你要知道 你在做什么为什么这么多 ，这么做的好处是什么？
----------------------------------------------
       http://blog.csdn.net/leftfist/article/details/41891407
       切换上下文 就是 切换进程或者线程 任务，   
       IO的一种:
       因为IO设备（输入输出设备）很慢（比如Ajax操作从网络读取数据） 
       执行栈  堆一般是用来存储的数据的
       从上次gulp 来看 是node 的环境 服务器之间是不存在跨域的   前段和后台是存在跨域的
       有没有发现，这种proxy方式是没有同域机制的限制 了，前端面试常问的跨域方案都不是事儿；
       一百万用户一天请求一次也是一百万PV，一百万UV
        一个用户一天请求一百万次也是一百万PV，一UV
        ab只能是pv的压力 uv是没有办法测试的  其实一般一个 pv就是一个uv
        node是从事件队列里面一个一个的处理task，像php和java 就是那种 多个线程共同抢占 一个资源 同时上下文的切换，这都是需要消耗资源的；
#### 内存泄漏
---------------------------
```
内存快照常用与解决内存泄漏的问题. 快照工具推荐使用 heapdump 用来保存内存快照, 使用 devtool 来查看内存快照. 
使用 heapdump 保存内存快照时, 只会有 Node.js 环境中的对象, 不会受到干扰（如果使用 node-inspector 的话, 快照中会有前端的变量干扰）.
```
#### 错误模块
-----------------------
```
node-verror 处理的错误模块
```
