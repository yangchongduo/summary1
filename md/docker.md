#### docker使用

- 开发环境只承载环境，log和代码隐射到外面
- 测试环境和线上环境需要承载代码镜像
- 通过image version版本控制;


#### 首先，Kitematic 是一个 Docker GUI，配置非常方便。 

#### docker优势
```
节省资源。
           现状：公司服务运行在阿里云的ECS上，如果引入docker，会变成docker on vm上，无自有机房很难实现
      
     2. 快速部署，弹性扩容。
            需求背景:   
                   应对双十一需增加20台机器。
         部署方式:
                  1.op copy镜像，脚本部署。
                   2.docker分发。时间会缩小很多。

     3. 环境隔离:现状node服务，8核8个进程。接入dcoker之后，一个docker container内部跑8个进程，性能基本无差。

      开发环境和测试环境是极力推广的。如线上通过docker部署，就不会出现‘环境’这样问题。
      前端开发环境本身依赖node即可，现阶段不予以接入。
 ```

### 构建image
### docker build -t mynodeapp . 
### docker images
### docker run -d -p 8888:8888 id
### docker ps
### docker logs imageID 查看日志 能不能把日志弄到image外面来，这样别人使用的时候，image是干净的，数据卷
### docker exec -i -t imageID /bin/bash //进入image
### curl -i localhost:8888 
### 如何通过数据卷映射到镜像外面   ? 
### docker内部的文件到底是做什么的?  
#### [docker搭建node服务](http://www.jb51.net/article/91772.htm)

>1 创建Dockerfile文件 vi Dockerfile
```
FROM node   // 基础镜像
 
# Create app directory
RUN mkdir -p /home/Service 
WORKDIR /home/Service
 
# Bundle app source
COPY . /home/Service  // 在镜像里面创建一个文件将本地所有的代码拷贝到image
RUN npm install // 安装依赖包
 
EXPOSE 8888 // 暴露端口
CMD [ "npm", "start" ]  执行命令
```
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
```
# 问题 ：
启动容器镜像  
###   进程管理工具 
>1 supervisor  


### Dockerfile
>1 ENTRYPOINT 入口   docker运行的时候执行的命令  
>add  可以拷贝地址，自动解压，tar包    
>copy 
>onbuild 对第一次build的时候不生效，在下一次弄新image生效，对测试和发布产品时特别好，感觉没用，因为应用的代码是放在宿主机下面的。。。
>


### 数据卷  
docker run -itd --volume /Users/yangchongduo/Documents/test_koa:/home/Service -p 8000:3000  --name volume test  bash


attach 不好用，退回的时候contaniner会挂掉，不好  
exec  -it 交互式的 /bin/bash    


###  进入容器内部
docker exec -it test /bin/bash
### 数据卷 -v  
it 交互式  
d 是背景  
v 是数据卷  
test：容器的名字或者id   
bash shell    
docker run -itd -v /tmp/data1:/tmp/data2 test bash  
docker run -d -p 8888:3000 -name xxx imageID
### docker的好处
它让你可以将环境和配置放入到代码中加以部署。同样的Docker配置还可以用在各种环境中。这将基础设施需求与应用程序环境分离开来
# 问题 ：
启动容器镜像  
###   进程管理工具 
>1 supervisor  


### Dockerfile
>1 ENTRYPOINT 入口   docker运行的时候执行的命令  
>add  可以拷贝地址，自动解压，tar包    
>copy 
>onbuild 对第一次build的时候不生效，在下一次弄新image生效，对测试和发布产品时特别好，感觉没用，因为应用的代码是放在宿主机下面的。。。
>


### 数据卷  
docker run -itd --volume /Users/yangchongduo/Documents/test_koa:/home/Service -p 8000:3000  --name volume test  bash


attach 不好用，退回的时候contaniner会挂掉，不好  
exec  -it 交互式的 /bin/bash    


###  进入容器内部
docker exec -it test /bin/bash
### 数据卷 -v  
it 交互式  
d 是背景  
v 是数据卷  
test：容器的名字或者id   
bash shell    
docker run -itd -v /tmp/data1:/tmp/data2 test bash  
docker run -d -p 8888:3000 -name xxx imageID
### docker的好处
它让你可以将环境和配置放入到代码中加以部署。同样的Docker配置还可以用在各种环境中。这将基础设施需求与应用程序环境分离开来

### 构建docker集群的id是一样的，删除key.json这个文件就可以了
docker restart  
两台的id就不一样了
docker-compose 一键部署
通过jenkins是持续性集群


docker依赖两个linux两个东西，1:namespaces空间，2:控制组
特性:命名空间就是为了能够更好的虚拟化，在同一个命名空间的进程，可以感知彼此的变化，对其他命名空间的进程无感知，这样就可以独立的系统环境中，
docker五种命名空间，进程的隔离，网络的管理，这些隔离的资源是怎么管理起来的呢？
是通过控制组管理起来的，
资源限制，control Groups资源限制，启动一个进程或者线程就会占用一定的内存，代码的复杂程度，决定每个进程和线程占用的内存是不一样的，例如，内存为300m，启动一个线程占用30m，启动10个以后就无法再启动线程了，
子任务可以为进程组，设置内存使用的上限，如果进程组申请的内容达到了上限，在申请的话，就会发出报警，优先级设置，可以决定哪个进程组，优先占用资源，计算进程组占用哪个，资源控制，可以将资源



FE前端 机器是8核的，现在启动8个进程，  
如果接入到docker，一般能启动几个image，  
80个请求，10台机器，每台机器有8个进程，  
如果用docker的话，需要多少，  
如果启动20个container，那我为什么不能启动20个进程呢？  
20个容器，和20个进程有什么区别







ctrl+p+q 
日志命令
 docker logs -t -f --tail 10 imageid
container中的进程
如何在运行中的进程启动新的进程，需要在docker中运行多个进程
管理，维护，在已经运行的container中启动新的进程
通过docker exec 在容器中启动一个进程，用于监控进程
docker inspect 查看容器的ip地址，通过容器的ip，进行访问
遇到问题
>1 无法下载nginx apt-get update && sudo apt-get install vim
>apt-get update && sudo apt-get install nginx 
  



现在8个进程，假如能够处理1万并发，有没有必要换成docker？  
有30多台机器，如果换成docker，在相同的并发的情况下，机器数量能不能减少？
增加20，认为部署devops? vm镜像  
下半年在公司推广是什么意思？这个推广是什么意思？哪方面？    
docker使用场景主要是?  
 


```





