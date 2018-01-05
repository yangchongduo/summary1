
### nginx 
术语：

 - 虚拟机
  - root： 
  - 不同的  



    nginx -s reload  ：修改配置后重新加载生效
    nginx -s reopen  ：重新打开日志文件
    nginx -t -c /path/to/nginx.conf 测试nginx配置文件是否正确

    关闭nginx：
    nginx -s stop  :快速停止nginx
            quit  ：完整有序的停止nginx

    其他的停止nginx 方式：

    ps -ef | grep nginx

    kill -QUIT 主进程号     ：从容停止Nginx
    kill -TERM 主进程号     ：快速停止Nginx
    pkill -9 nginx         ：强制停止Nginx



    启动nginx:
    nginx -c /path/to/nginx.conf

    平滑重启nginx：
    kill -HUP 主进程号

  ### 重启
 ```
 [root@admin nginx-1.2.6]# /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf 
#方法2 
[root@admin nginx-1.2.6]# cd /usr/local/nginx/sbin 
[root@admin sbin]# ./nginx 
 ```   