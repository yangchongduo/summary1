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
>1  docker 是干净的，假如docker有日志的话，需要通过（vl。。。后续补充）映射文件到docker 外部，这样docker的内容就不会一直增加，
>2 commit 不要使用
>3 占用内存少，虚拟机的内存占用太高，docker比较少。




