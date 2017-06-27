#### docker 国内image源
>1 一句话没听见，浪费了一天，因为docker的image 是国外的，必须通过国内image快，   
>2 163 https://c.163.com/hub#/m/home/ 不建议使用      
>3 https://dashboard.daocloud.io/packages   
> curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://ef017c13.m.daocloud.io  
> 改变docker的镜像源 超级无敌快  
>4 mac 下如何改变镜像源呢？    
软件上header上有个daemon=》Registry mirrors=》https://zuborsjg.mirror.aliyuncs.com(阿里自己的镜像元)    
[阿里docker镜像源](https://cr.console.aliyun.com/#/imageList)    
#### 在下载npm的时候服务器尽让卡，有可能是源的问题，默认是淘宝源，
#### 可做一个自己开发用的node redis sql mongo的镜像，换电脑的话，如果开发的话，任何项目都基于这个环境扩展 
#### docker 每次输入sudo的处理方案:
```
1.创建docker组：sudo groupadd docker
2.将当前用户加入docker组：sudo gpasswd -a ${USER} docker
3.重启服务：sudo service docker restart
4.刷新Docker成员：newgrp - docker
```
#### 如何停止image
```
sudo service docker restart  这个命令会查到docker的pid（进程的id） kill 即可
```     
docker stop $(docker ps -a) 停止所有容器    
docker rm $(docker ps -aq) 删除所有容器 
docker rmi 镜像id           删除你想删的镜像   
docker rmi -f    强制删除image    
#### docker命令   
>1 运行image 命令  
```
docker run -d -p 8080:80 alexwhen/docker-2048  
```  
>2 在这个image 运行sh 这样就能够进入到命令 image 没有运行   
```
sudo docker run -ti -p 8080:80 alexwhen/docker-2048 /bin/sh   
```  
>3 不可能从0开始，下载别人镜像，然后不知道为什么？   
```
docker run -t -i ubuntu:15.10 /bin/bash  NO   
docker run -t -i ubuntu:15.10 /bin/sh  NO  
sudo docker attach b2e73e77f1e7   NO   
```  
>4 自己编译image，一般会改人家的配置文件
```
sudo docker build -t 镜像名字 .
```  
#### [docker 容器之间通信？](http://blog.csdn.net/kongxx/article/details/38676917)    
#### [数据卷  ？](https://blog.fundebug.com/2017/06/07/what-is-docker-volume/)
VOLUME nginx的image，错误日志需要导出来，node服务的日志导出来，    
应用的代码有没有必要导出来呢？  

#### docker命令 
docker run -ti -p 8080:80 alexwhen/docker-2048 /bin/sh 
#### docker使用场景1  
>1 node版本升级，需要到机器上一个一个的升级。  
>2 假如使用docker的话修改镜像重新部署。              
>3 新机器需要部署的node的话，在没有docker的情况下，需要手动安装node，使用docker之后，不需要因为docker中的image已经有了项目所需要的版本  
>4 还有就是调试也方便，不用在自己电脑配置那么多，直接用docker就能启动别人的项目，省时省力     
>5 就比如你说的升级node，只需要在registry上传你要的node，所有有需要的容器来pull这个node即可    


[Docker Volume](https://blog.fundebug.com/2017/06/07/what-is-docker-volume/)


#### [docker与虚拟机的比较](https://blog.fundebug.com/2017/05/31/docker-and-vm/);
>1 什么是云计算？阿里云，百度云，腾讯云。一般的公司买了自己的服务器，安装软件，运行，维护(op的成本很高)  
>2 云计算的实现。 通过虚拟机。但是虚拟机内存占用高  
>3  docker的诞生，每个image内部没有系统  重点隔离每个应用，应用是如何通信的？  

pm2启动的node VS docker的node(后续补充)？  
通过image，可以快速的将一个应用部署到多个服务器上，快速部署，相对谁而言？    
应用是如何通信的？

##### 多角度去分析docker
--------------------------------
```
https://gold.xitu.io/entry/58d7b1411b69e6006bb7d065
1:从进程的角度理解Docker
2:从文件的角度理解Docker
3：从应用架构角度理解Docker
4:从应用部署角度理解Docker
5：从集群管理角度理解Docker
```
#### [docker初试](http://blog.acs1899.com/linux/mac/2016/02/15/hellow-docker.html)
>1 Docker官方提供了一个类似github的Image管理仓库，你可以像使用github一样下载一份别人的Image。  

关于Docker-“快速部署”、“隔离”、“镜像”、“容器”这些关键词想必你一定听过。Docker可以将你的基础配置和应用服务隔离开来，打包你的环境配置并实现快速部署。通过“镜像”，我们可以快速的将一个应用部署到多个服务器上，而“容器”则是用来承载这些应用的。    

使用Docker能给我们带来哪些好处：    
根据镜像快速部署    
可以通过DockerHub或搭建私有镜像库来查找、上传镜像   
Docker对资源占少，应用之间能做到很好的隔离同时也能保证相互间的通信   
本篇文章主要介绍如何使用docker，创建自己的镜像，运行容器等。具体使用准则参考官方文档。   

#### Docker
>1  docker 是干净的，假如docker有日志的话，需要通过（VOLUME。。。后续补充）映射文件到docker 外部，这样docker的内容就不会一直增加，  
>2 commit 不要使用  
>3 占用内存少，虚拟机的内存占用太高，docker比较少。  


```
FROM dockerfile/ubuntu

# Install Nginx.
RUN \
  add-apt-repository -y ppa:nginx/stable && \
  apt-get update && \
  apt-get install -y nginx && \
  rm -rf /var/lib/apt/lists/* && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  chown -R www-data:www-data /var/lib/nginx

# Define mountable directories. 将一些文件放在外部 镜像本身是干净的
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/html"]

# Define working directory.
WORKDIR /etc/nginx

# Define default command.
CMD ["nginx"]

# Expose ports.
EXPOSE 80
EXPOSE 443

```


