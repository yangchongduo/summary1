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
