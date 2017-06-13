### http1
http1自身的问题:
 1. 每一个请求都会重新建立一个 TCP 连接，每次连接都要进行tcp三次握手，tcp慢启动，当有很多请求时网络延迟会非常严重。[http/1.1的持久连接](http://blog.csdn.net/u011446963/article/details/46391281)(在事务处理结束之后仍然保持在打开状态的TCP连接称之为持久连接)很好的解决了这个问题 (就一次tcp三次握手,闲置了一段时间后就关闭它) ;
   - 在HTTP1.0中，默认的是短连接，没有正式规定 Connection:Keep-alive 操作；
 ```
 这个例子说明了服务器最多还会为另外5个事务保持连接的打开状态，或者将打开状态保持到连接空闲了2分钟以后。
  Connection:Keep-Alive
  Keep-Alive:max=5,timeout=120
 ```
   - 在HTTP1.1中所有连接都是Keep-alive的，也就是默认都是持续连接的(Persistent Connection)



 2.在一个 TCP 连接中，同一时间只能够发送一个请求，并且需要等响应完成才能够发送第二个请求。http/1.1的管道可以让浏览器的多个请求(并发)可以同时发到服务。但响应只能够一个接着一个的返回  



###  http2 的优势
-  H2是一个二进制协议而H1是超文本协议.传输的内容都不是一样的  
-  H2遵循多路复用即,代替同一host下的内容,只建立一次连接. H1不是
-  H2可以使用HPACK进行头部的压缩,H1则不论什么请求都会发送  
-   H2允许服务器,预先将网页所需要的资源PUSH到浏览器的内存当中.     



### 二进制  
 那就需要在应用层(HTTP2.0)和传输层(TCP or UDP)之间增加一个二进制分帧层。    
在二进制分帧层上， HTTP 2.0 会将所有传输的信息分割为更小的消息和帧,并对它们采用二进制格式的编码 ，其中HTTP1.x的首部信息会被封装到Headers帧，而我们的request body则封装到Data帧里面。


 
 
###  多路复用  
- http1：瀑布流式,这样的加载方式,只能让资源按照顺序一个一个的加载
 前面一个资源内容超级多,并且都是一次性加载完,即使后面有更重要的资源,也需要进行等待.
- http2：H2中就没有这样的限制了. 他直接会将不同的资源,分拆为细小的二进制帧来进行传输.
 创建一个tcp连接，这就是多路复用，也不用担心他们通过二进制传输是怎样保证资源的有序性。为了保证order和priority的feature, 所以,HTTP2在每次发送时,需要额外附带上一些信息:( a unique stream ID    different priority ).
  


###  请求头
- http1: 在每次请求时,都需要将一大堆头部带上,甚至带上cookie这灰常大的内容
- http2:因为头部的更替不是很频繁,那我就在Server端做个缓存呗,在你这次连接有效的时间里面, client就用重复的发送请求头了. 这就是HTTP2的HPACK压缩方式.HPACK压缩会经过两步:


- 传输的value,会经过[Huffman coding](http://baike.baidu.com/link?url=vFroMkFHh3TFgE-B9iIFXboG_4zrwJoW5hoB_HnNC47-XO9XamQrM7WWFdznXx-iELkgxalf3HKPNHkan8CGG7HlAALIhasED8F3K2BC5RaSU_eejIo7onSyKSBtqa2ccgQ4C6WGd0_lGPFXN24EgL5EBGQyK7AGpfrNwX5MPU_cPyK8JtlFogOi6Shds0JP)[哈夫曼编码] 一遍来节省资源.  
- 为了server和client同步, 两边都需要保留一份Header list, 并且,每次发送请求时,都会检查更新
ok, 那这样就有一个问题, 第一次的请求,肯定是最慢的.因为他所有的list都需要进行一份初始化操作. 但这是真没办法。。。
每一个list里面还分为static list 和 dynamic list. 两者的区别具体就是:  
  - static: 主要用来存储common header. 比如 method,path等  
  - dynamic: 主要用来存储自定义的协议头. 比如: custom-name,custom-method等  
可以看到,req/res的Header都会存在同一份表里面,这样做可能有点伤内存,不过,速度上还是非常棒的.



### [服务器推送](https://47.94.95.52:8081/)

- 假如某个client想要请求 index.html的资源,那么server会一并返回index.js和index.css的资源回去. 减少client发送更多的请求.
 


### [HSPS](https://47.94.95.52:9991/option)
- 服务器开启 HSTS 的方法是，当客户端通过HTTPS发出请求时，在服务器返回的 HTTP 响应头中包含 Strict-Transport-Security 字段。非加密传输时(http://xxxx)设置的HSTS字段无效
 ```
 Strict-Transport-Security: max-age=31536000; includeSubDomains(可选参数，如果指定这个参数，表明这个网站所有子域名也必须通过 HTTPS 协议来访问。)
 ```
 nginx 
 ```
 server {
listen 443 ssl http2;
add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";
...
}
 ```
 在接下来的一年（即31536000秒）中，浏览器只要向xxx或其子域名发送HTTP请求时，必须采用HTTPS来发起连接。比如，用户点击超链接或在地址栏输入 http://xxx/ ，浏览器应当自动将 http 转写成 https，然后直接向 https://xxx/ 发送请求。
在接下来的一年中，如果 xxx 服务器发送的TLS证书无效，用户不能忽略浏览器警告继续访问网站



### ab -c 100 -n 10000
![屏幕快照 2017-06-03 下午4.20.11.png](/file/download?file=%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-06-03%20%E4%B8%8B%E5%8D%884.20.11.png)



###  [运用](http://www.tuicool.com/articles/aqyMve)
#####  删除之前的nginx
 ```
 which nginx 
 sudo apt-get purge nginx-*
 sudo apt-get autoremove
 dpkg --get-selections|grep nginx
罗列出与nginx相关的软件， nginx-common deinstall 然后
sudo apt-get --purge remove nginx-common
这样就可以完全卸载掉nginx包括配置文件
 ```


 
 ### 需要自己编译nginx
>1 OpenSSL ， pcre ， Zlib 跟 Nginx源码  
>2 nginx  1.9.15 OpenSSL 1.0.2  
 ```
  ./configure --prefix=/usr/local/nginx --with-openssl=../openssl-1.0.2e --with-pcre --with-zlib=../zlib-1.2.11 --with-stream --with-stream_ssl_module --with-http_ssl_module --with-http_v2_module --with-threads
sudo  make && make intall 
 ```
 
 
 建立软连接
 ```
 ln -s /usr/local/nginx/sbin/nginx /usr/sbin/nginx
 ```
 
 
 [到需要放置证书的目录(选在nginx的conf目录下就可以)，建立服务器的私钥(此过程需输入密码短语)](http://www.2cto.com/article/201602/489445.html)
```
openssl genrsa -des3 -out server.key 1024
```


 创建证书签名请求csr
```
openssl req -new -key server.key -out server.csr
```


 对于使用上面私钥启动具有ssl功能的nginx，有必要移除输出的密码
```
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
```


  使用上面的私钥和CSR对证书进行签名
```
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```


配置nginx
```
    server {
        listen       443 ssl http2;
        server_name  localhost;

        ssl_certificate     server.crt;
        ssl_certificate_key  server.key;
    }
```



 ### 重启
 ```
 [root@admin nginx-1.2.6]# /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf 
#方法2 
[root@admin nginx-1.2.6]# cd /usr/local/nginx/sbin 
[root@admin sbin]# ./nginx 
 ```
