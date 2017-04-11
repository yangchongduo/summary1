#### angular 总结
 ```
 控制器如何交互
   1:emit 不说了
   2:所有的东西放在服务里面，然后每个控制器 注入这个服务就可以了
 页面的组成呢
  ui-viwe 即可内容还是服务  封装个服务即可
 ```
 #### 原理  ng-click会触发一次digest 脏检查开始 ，源码如何实现的呢(两个while的循环)；触发每个watcher 这个是非常消耗性能(大家都这么说)；for循环肯定比 vue 的观者着消耗性能，这是必须的------- 计算和上一次的值是否相等，这个肯定不行 太过一依赖这个事情了
 --------------------------
```
//第一个文章不错 说明了angualr的拿出效果说事
http://blog.csdn.net/dm_vincent/article/details/38705099 
http://www.cnblogs.com/leo_wl/p/3446075.html
 这段代码和上一段代码唯一的区别就是有了一个input来接收用户的输入。在用浏览器去访问这个html文件的时候，input上的ng-model指令会给input绑上keydown事件，并且会给name变量建议一个$watch来接收变量值改变的通知。在交互阶段主要会发生以下一系列事件：
　　1.  当用户按下键盘上的某一个键的时候（比如说A），触发input上的keydown事件；
　　2.  input上的指令察觉到input里值的变化，调用$apply(“name=‘A’”)更新处于AngularJS的context中的model；
　　3.  AngularJS将’A’赋值给name；
   $while循环是非常消耗性能的 不管有没有变化 react 是两个对象的比较 
　　4.  $digest循环开始，$watch列表检测到name值的变化，然后通知{{name}}表达式，更新DOM；
　　5.  退出AngularJS的context，然后退出Javascript的context中的keydown事件；
　　6.  浏览器重新渲染视图。

假设你在一个ng-click指令对应的handler函数中更改了scope中的一条数据，此时AngularJS会自动地通过调用$digest()来触发一轮$digest循环。
 当$digest循环开始后，【它会触发每个watcher】。这些watchers会检查scope中的当前model值是否和上一次计算得到的model值不同。如果不同，那么对应的回调函数会被执行。调用该函数的结果，就是view中的表达式内容(译注：诸如{{ aModel }})会被更新。除了ng-click指令，还有一些其它的built-in指令以及服务来让你更改models(比如ng-model，$timeout等)和自动触发一次$digest循环。
```
#### test
```
[这是一个连接](http://www.cnblogs.com/leo_wl/p/3446075.html)
```
      [这是一个连接](http://www.cnblogs.com/leo_wl/p/3446075.html)
