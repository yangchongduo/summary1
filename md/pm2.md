#### 启动文件
```
{
  "apps": [{
    "script": "bin/server.js",
    "args":"--env=production",
    "instances" : "max", // 会根据服务器的核数决定启动几个进程 不用启动很多进程 没用
    "exec_mode" : "cluster",
    "error_file": "../log/server.error.log",
    "out_file": "../log/server.access.log",
    "merge_logs": true,
    "log_date_format": "YYYY-MM-DD HH:mm:ss Z",
    "kill_timeout" : 5000
  }]
}
```

#### 线上服务最大的bug
- 平滑重启  pm2 gracefulReload
- 灰度方案  监听不同的port 正常3000 灰度11101 通过name 来管理进程

#### 日志nginx 的日志系统分割 


#### 进程启动之后如何将请求发送到不同的进程上【深入浅出p77】

    Libuv实现方式: linux下，epoll方式 (nginx也有这种方式)，轮训无事件即休眠，不占用cpu片段，事件发生，执行回调（利用事件）
    window下，IOPC方式，调用异步IO，等待IO完成之后通知，执行回调，无需轮训