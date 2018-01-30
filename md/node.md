##  [纯浏览器渲染 vs 服务端渲染](http://www.jb51.net/article/117597.htm)
##  [react服务端渲染](https://www.v2ex.com/t/203001)
####  node中间层放在window里面 返回的页面

```
<body>
  <div id="app"></div>
</body>

```

        1. 数据请求：由服务端请求数据而不是客户端请求数据，这是“快”的一个主要原因。服务端在内网进行请求，数据响应速度快。客户端在不同网络环境进行数据请求，且外网http请求开销大，导致时间差（主要原因）。

        2. 步骤：服务端是先请求数据然后渲染“可视”部分，而客户端是等待js代码下载、加载完成再请求数据、渲染。即：服务端渲染不用等待js代码下载完成再请求数据，并会返回一个已经有内容的页面。

        3. 渲染性能：服务端性能比客户端高，渲染速度快( 猜测，该项数据不详 )。

        4. 渲染内容：服务端渲染会把”可视“部分先渲染，然后交给客户端再作部分渲染。而客户端渲染，则是从无到有，需要经历完整的渲染步骤。

### nvm 
-  nvm install stable 【升级为最稳定版本】
-  nvm alias default v6.10.3  【默认版本号】



### debug
```
process.env.DEBUG = 'app:*'

var debug = require('debug')('app:a')
debug('sssss')
```
### 再次更新一下关于模块的概念【以后在详细补充】  

```
//a.js
 const data= ()=>{
 	console.log('xx')
 }
 module.exports=data
// b.js
const data = require('./a');
data()
```
```
//a.js 
exports.data= ()=>{
	console.log('xx')
}
//b.js 两种不同的写法
const duo = require('./a');
duo['data']()
const {data} = require('./a')
data()
```  
### [node的cluster模块的实现原理](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651226726&idx=1&sn=6a78db1800c02212a1940d66e23ed5e8&chksm=bd495be28a3ed2f4a38d37c3699f6e7c00f0c3996c2e955fe087e8a572a068306f598be94424&mpshare=1&scene=24&srcid=07222z7V5T81MduY9qaRNvCJ&key=31a3a388ed6fa873984b6517b639a8b0140a330bc1dafb30dac709faa5170e50a50822ddea698106e39acd148f493e7c67e9b7bc7b772ee67430c25da62ed5857c7c7906c9edc7dea00c0558964c1610&ascene=0&uin=MjAzMDA2ODI2MA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.12.3+build(16D30)&version=12020110&nettype=WIFI&fontScale=100&pass_ticket=q46Nf5q5QVZhd6cjRyV6valXuYOKlN5ktNkVn1a3tlutiqkD92yFzSELUpp1Q2eM)  
### [Node.js内部代码架构](http://www.zcfy.cc/article/architecture-of-node-js-internal-codebase-508.html)
- 所以某些功能（比如CPU密集操作）用C/C++写是明智的  
- node.js只是针对I/O密集型操作提供了异步功能  
- 事件发生，观察者的回调函数会被加入消息队列 。只要消息队列有数据，循环函数 会不停取出它们压入执行堆栈 。注意，只有先前的消息处理完成循环函数 才会把下一个压入执行堆栈 
- 执行堆栈中，如果发生I/O操作，会把它移交到libuv处理。libuv默认包含一个有四个工作线程的线程池，线程的数量可以设置。工作线程通过和Node.js的底层类库交互来执行比如数据传输、文件访问等操作。libuv处理完后再把事件加入消息队列，Node.js主线程继续处理。libuv以异步方式处理，Node.js主线程不会等待处理结果而是继续执行。libuv处理完成，加入消息队列，循环函数再次把事件压入执行堆栈，这就是Node.js一个消息处理的生命周期。  
### 队列的概念在node中很重要，高并发的时候，请求数大于处理数的能力，就放在队列里面，慢慢的处理，node的异步队列的概念，js的异步队列的概念。  
### 父子进程通信 所有东西请查看深入浅出node第九章  
父进程在实际创建子进程之前，会创建ipc通过并监听它，然后才正真的创建出子进程，   
并通过环境变量(NODE_CHANNEL_FD)告诉子进程这个ipc通道的文件描述符。  
子进程在启动的过程中，根据环境描述符去连接这个已存在的IPC通道，从而完成父子进程之间的连接。    
###  如何试下负载均衡
>1 node原生的cluster模块是基于child_prcocess中的fork模式，net tcp服务
```
因为是fork出来的。进程之间是通过 IPC 来通信的, 以通过 IPC 在主进程和子进程之间相互传递服务器句柄.
```
>> ipc是如何建立的
```
在通过 child_process 建立子进程的时候, 是可以指定子进程的 env (环境变量) 的. 所以 Node.js 在启动子进程的时候, 主进程先建立 IPC 频道, 然后将 IPC 频道的 fd (文件描述符) 通过环境变量 (NODE_CHANNEL_FD) 的方式传递给子进程, 然后子进程通过 fd 连上 IPC 与父进程建立连接
```
>1 首先来说 pm2的fork模式是通过什么实现不知道？但是可以确定的一点是，他无法实现端口复用  
>2 node原生模块cluster模块是基于child_process中的fork模式做的，cluster确实可以实现负载均衡，实现端口复用，也就是child_process是fork是可以实现负载均衡的，端口复用的  
>3   
```
所有请求先同一经过内部TCP服务器。
在内部TCP服务器的请求处理逻辑中，有负载均衡地挑选出一个worker进程，将其发送一个newconn内部消息，随消息发送客户端句柄。
Worker进程接收到此内部消息，根据客户端句柄创建net.Socket实例，执行具体业务逻辑，返回。
```
  
### 父子进程  
>1 彼此监听message 时间类型，彼此通过send发送数据，message会获取信息，这也就是说的基于事件  
>2  主进程先建立ipc通道，然后通过环境变量经通道描述传递给子进程，子进程然后根据通过通道描述连接这个ipc通道，这样父子进程就可以通过ipc通道连接，（现在还是监听不同的端口号）  
>3 主进程监听80，其他子进程监听的不同的port，但是这样消耗的文件描述符太多  
>4 如何处理文件描述符呢？句柄，send第二参数句柄，不在使用proxy  
>5 通过各种事件机制 message exit 主进程就知道子进程退出这样就重启一个进程，  
>6 那主进程是先启动进程还是子进程先退出呢？  
>7 子进程退出之前，首先要做是process.send({act: 'suicide'});自杀信号，这样主进程是先生成一个进程，子进程在kill，这样能够达到平滑重启的目的； 
>8 node原声cluster模块基于net tcp服务，和child_process的fork，然后发送句柄，实现了端口号监听，至于pm2中的重启次数，都可以进行限制  

####  crypto
hash算法实现方式有很多种，位数不同，对什么加密，以什么样的方式输出
```
const crypto = require('crypto')
const data =crypto.createHash('md5').update('cd').digest('hex');
console.log(data)
const sha1 = crypto.createHash('sha1').update('cd').digest('hex')
console.log(sha1)
const sha256 = crypto.createHash('sha256').update('cd').digest('hex')
console.log(sha256)
```
#### 加密
```
//先加载crypto模块，创建md5哈希算法，指定要加密的字符串，再进行摘要按16进制输出 sha1  crypto
        return  require('crypto').createHash('md5').update(str).digest('hex')
```
#### node网络层方面的东西
----------
```
net（TCP服务） http https
```
#### 对于大型文件 使用stream因为他不收V8内存的限制
#### node内存的问题   深入浅出node142页
--------------------
```
内存分为两种 1： 是通过v8分配的内容 堆内内存 比如变量对象的复制  
           2: 堆外内存，node不能单独的处理字符串就可以了，需要处理网络流和io流 buffer出来了 ，他不收node内容的限制 
           垃圾回收限制只是对 堆内内存处理的          
           慎用内存当缓存 处理方案:redis
          
```
#### 缓存的问题  深入浅出node 130页
--------------
```
最好的处理方法方法就是进程外的缓存，进程本身没有缓存，就可以让常驻内存的回收，
现在node 的处理最好的产品就是 redis
当让每个node 的框架也有对应的 redis koa有koa-redis
https://github.com/NodeRedis/node_redis
```
#### node内存泄漏的位置  node深入浅出  148页 不好，请移到饿了吗node面试题
-------------
```

```
#### 为什么要异步调用的并发限制  深入浅出node105页 
```
for(var i=0;i<100;i+++){
async() //会发起100个异步 假如 都是操作数据库操作查询数据库的操作
}
我们的下层服务器将会吃不消，如果对文件系统大量并发调用，操作系统的文件描述数量将会瞬间用光，
同步io 会等待上一次io返回，但是异步io不会等待，
总之我们压榨底层的系统的性能，但还是需要给予一定的过载保护，
```
#### cpu密集和IO密集
--------------
```
cpu密集是计算能力逻辑能力
io密集是读取数据库的内容

```
node的内存
-------------------
```
node是有限制的，为什么有内容限制呢？
原因:一次v8的小的垃圾回收需要50毫秒，做一次非增量式的垃圾回收甚至需要1秒，垃圾回收会引起javascript断掉，这是不行的，应用的性能和相应能力会直接下降，处理方法就是直接限制内存的大小是处理的最好方法，这样就可以讲内存回收的时间控制住了
```
#### pm2日志如何更好的锁定错误的地方
```
```
#### udp+tcp 什么是TCP粘包?
--------------------------
```
https://zhidao.baidu.com/question/479883658.html
UDP丢包是因为数据包在传送过程中丢失了 而TCP是基于流式的发送 并且存在丢包重发机制 TCP是可靠连接而UDP是不可靠的这个我就不多说了
关于TCP的粘包 正是由于TCP是流式传送的 也就是连接建立后可以一直不停的发送 并没有明确的边界定义 而你用UDP发送的时候 是可以按照一个一个数据包去发送的 一个数据包就是一个明确的边界
而TCP并没有数据包的概念 是完全流式的 他会开辟一个缓冲区 发送端往其中写入数据 每过一段时间就发送出去 然后接收端接收到这些数据 但是并不是说我发送了一次数据就肯定发送出去了 数据会在缓冲区中 有可能后续发送的数据和之前发送的数据同时存在缓冲区中随后一起发送 这就是粘包的一种形式 接收端也有产生粘包的情况 如果应用程序没有及时处理缓冲区中的数据 那么后续到达的数据会继续存放到缓冲区中 也就是2次接收的数据同时存在缓冲区中 下次取缓冲区的时候就会取出2次粘包后的数据 这是粘包的另外一种形式 还有其他许多形式 比如填充缓冲区到一半缓冲区满了直接发送了 但是其实那个包还没填充完全 这个就是不完整的粘包了 剩余数据会在下次发送的时候补上
关于解决方法 如果你是连续的整个数据流 比如发送文件 那么完全不考虑粘包也无所谓 因为可以建立连接后发送 发送完毕后断开连接 整个数据流就是整个一个文件 无论数据从那里切开都无所谓 整个拼接后依旧是整个一个文件的数据
如果你发送的数据是多次通信 比如把一个目录下所有的文件名都发送过去 那么就不能当作一个整体发送了 必须对他们划分边界 有一个很简单的处理方法 就是采用"数据长度+实际数据"的格式来发送数据 这个"数据长度"的格式是固定宽度的 比如4字节 可以表示0~4GB的宽度了 足够用了 这个宽度说明了后续实际数据的宽度 这样你就可以把粘包后的数据按照正确的宽度取出来了
每次都是取出4字节 随后按照正确的宽度取出后续部分的就OK了
如果你的所有数据都是固定宽度的 比如不停的发送温度数据 每个都是1字节 那么宽度已知了 每次你都取出一个1字节就OK了 所以就不用发送宽度数据了
当然你也可以按照建立连接断开连接来划分边界 每次发送数据都打开关闭一次连接 不过对于频繁的小数据量是不可取的做法 因为开销太大 建立连接和关闭连接也是需要耗费网络流量的
总而言之 粘包的情况是无法绝对避免的 因为网络环境是很复杂的 依赖发送和接收缓冲区的控制是不能保证100%的 只要在发送的数据中说明数据的宽度随后在接收部分按照这个宽度拆开就OK了 宽度全都是统一的已知宽度的情况下拆开更加容易 连在发送端填入宽度数据都可以省去了
```
#### 轻松排查线上Node内存泄漏问题
------------------------------
```
https://cnodejs.org/topic/58eb5d378cda07442731569f
```

#### pm2 cluter 模块启动多个进程？ 监听同一个端口号为什么能做到？
-----------------
```
Node.js cluster module ：
Luckily enough, Node.js offers the cluster module, which basically will spawn some workers which can all share any TCP connection.
nodejs 当 spawn 多个进程的时候，各子进程可以共享 tcp 连接 各个进程通过 IPC channels 
https://keymetrics.io/2015/03/26/pm2-clustering-made-easy/
https://github.com/jawil/blog/issues/7
pm2 的cluster 模式是基于node的原生cluster 做的吗？ 而 node原生模模块是基于子进程中的spawn模式吗
？ 他们之间共享通过ipc通道 共享 tcp链接吗？
```

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
