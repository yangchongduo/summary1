#### redis场景
>1 不经常变得数据，放在redis里面，比如首页不变，我们可以放在redis里面，个人中心也设置redis缓存，这样就不用查询数据库了，查询完之后还得需要处理，这样不用查询，不用组装    
>2 token更好  

#### redis
------------------------------
```
http://www.aboutyun.com/thread-9223-1-1.html
```
>1 启动redis  redis-server  
>2 连接本地的redis redis-cli    ping出现PONG 就对了  
>3 查看所有的  keys *    
>4 删除一个key  del key  
>5 代码值和赋值之后，问题：数据的位置 从配置文件中可以查出来  
>6 mongo 安装 很多项目是基于mongo 和 redis的  
>7 需要具体看到浏览器中有cookie  
>8 redis-cli  flushall 清除缓存
