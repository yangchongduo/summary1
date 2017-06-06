#### 
------------------
```
ssh 登陆
ssh yangchongduo@服务器地址 (0.0.0.0) 密码
现在是进入 /boot 权限
sudo su apple 这个用户
cd       来到~
剩下的操作
ps -ef 查看正在活动的进程
ps -ef |grep abc 查看含有"abc"的活动进程
ps -ef |grep -v abc 查看不含abc的活动进程
awk print 需要学习
tail -f 是什么功能 查看日志文件***********
我们如何必须需要日志 也就是页面中的log
我们讲log 放在一个文件下  可进行分割
然后我们在请求的时候可以查看这个 tail -f 来查看这个文件的追加的内容
tail -f fe.server.log| grep 'getinfo'
tail -f fe.server.log| grep 'duration'
lsof -i 端口号 查看端口是否占用   
502 bad getway 找到nginx错误文件 监听这个文件。。。   
```
