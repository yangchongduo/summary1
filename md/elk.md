#### ELK也是一个典型的集中式日志分析方案
   
   - [为什么elk会崛起](https://yq.aliyun.com/articles/72991?spm=5176.10695662.1996646101.searchclickresult.378c2361pDNxTf)

全部放在elk下面这个文件加下

    scp  ./blog.tar.gz  icd_manager@47.94.95.52:/home/icd_manager/
    scp  ./elasticsearch-6.1.2.tar.gz  icd_manager@47.94.95.52:/home/icd_manager
    tar -xvf a.tar -C ./test/ 
     
#### elk 搭建过程
    scp   文件名  icd_manager@47.94.95.52:/home/icd_manager/.....
    scp  ./blog.tar.gz  icd_manager@47.94.95.52:/home/icd_manager/db

    tar xvf  xxxx.tar.gz 源文件  解压
    tar -xvf a.tar -C ./test/ 绝对可以的 解压到指定的文件
    ps -aux | nginx
    /usr/local/nginx/conf/nginx.conf
    http://www.du0o.com:82/

#### nginx    

    /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf 
    <!--日志路径ok资源ok -->
    /usr/local/nginx/logs

[java 展示不升级为java8 （随后升级）](http://blog.csdn.net/coding_my_future/article/details/49927749)

    sudo apt-get install java 
    sudo uname --m 查看系统位数


#### Filebeat 这个需要分是 系统 mac 和 linux 是不一样的

    - filebeat.yml
    - Define the path (or paths) to your log files.
    - 先跑起来在学习
    - ./filebeat -e -c filebeat.yml -d '*'

filebeat.yml
```
###################### Filebeat Configuration Example #########################

# This file is an example configuration file highlighting only the most common
# options. The filebeat.reference.yml file from the same directory contains all the
# supported options with more comments. You can use it as a reference.
#
# You can find the full configuration reference here:
# https://www.elastic.co/guide/en/beats/filebeat/index.html

# For more available modules and options, please see the filebeat.reference.yml sample
# configuration file.

#=========================== Filebeat prospectors =============================

filebeat.prospectors:

# Each - is a prospector. Most options can be set at the prospector level, so
# you can use different prospectors for various configurations.
# Below are the prospector specific configurations.

- type: log

  # Change to true to enable this prospector configuration.
  enabled: true

  # Paths that should be crawled and fetched. Glob based paths.
  paths:
    #- /var/log/*.log 必须日志在
     - /Users/yangchongduo/fe/log/*.log
    #- c:\programdata\elasticsearch\logs\*

  # Exclude lines. A list of regular expressions to match. It drops the lines that are
  # matching any regular expression from the list.
  #exclude_lines: ['^DBG']

  # Include lines. A list of regular expressions to match. It exports the lines that are
  # matching any regular expression from the list.
  #include_lines: ['^ERR', '^WARN']

  # Exclude files. A list of regular expressions to match. Filebeat drops the files that
  # are matching any regular expression from the list. By default, no files are dropped.
  #exclude_files: ['.gz$']

  # Optional additional fields. These fields can be freely picked
  # to add additional information to the crawled log files for filtering
  #fields:
  #  level: debug
  #  review: 1

  ### Multiline options

  # Mutiline can be used for log messages spanning multiple lines. This is common
  # for Java Stack Traces or C-Line Continuation

  # The regexp Pattern that has to be matched. The example pattern matches all lines starting with [
  #multiline.pattern: ^\[

  # Defines if the pattern set under pattern should be negated or not. Default is false.
  #multiline.negate: false

  # Match can be set to "after" or "before". It is used to define if lines should be append to a pattern
  # that was (not) matched before or after or as long as a pattern is not matched based on negate.
  # Note: After is the equivalent to previous and before is the equivalent to to next in Logstash
  #multiline.match: after


#============================= Filebeat modules ===============================

# filebeat.config.modules:
  # Glob pattern for configuration loading
#  path: ${path.config}/modules.d/*.yml

  # Set to true to enable config reloading
#  reload.enabled: false

  # Period on which files under path should be checked for changes
  #reload.period: 10s

#==================== Elasticsearch template setting ==========================

setup.template.settings:
  index.number_of_shards: 3
  #index.codec: best_compression
  #_source.enabled: false

#================================ General =====================================

# The name of the shipper that publishes the network data. It can be used to group
# all the transactions sent by a single shipper in the web interface.
#name:

# The tags of the shipper are included in their own field with each
# transaction published.
#tags: ["service-X", "web-tier"]

# Optional fields that you can specify to add additional information to the
# output.
#fields:
#  env: staging


#============================== Dashboards =====================================
# These settings control loading the sample dashboards to the Kibana index. Loading
# the dashboards is disabled by default and can be enabled either by setting the
# options here, or by using the `-setup` CLI flag or the `setup` command.
#setup.dashboards.enabled: false

# The URL from where to download the dashboards archive. By default this URL
# has a value which is computed based on the Beat name and version. For released
# versions, this URL points to the dashboard archive on the artifacts.elastic.co
# website.
#setup.dashboards.url:

#============================== Kibana =====================================

# Starting with Beats version 6.0.0, the dashboards are loaded via the Kibana API.
# This requires a Kibana endpoint configuration.
# setup.kibana:

  # Kibana Host
  # Scheme and port can be left out and will be set to the default (http and 5601)
  # In case you specify and additional path, the scheme is required: http://localhost:5601/path
  # IPv6 addresses should always be defined as: https://[2001:db8::1]:5601
  #host: "localhost:5601"

#============================= Elastic Cloud ==================================

# These settings simplify using filebeat with the Elastic Cloud (https://cloud.elastic.co/).

# The cloud.id setting overwrites the `output.elasticsearch.hosts` and
# `setup.kibana.host` options.
# You can find the `cloud.id` in the Elastic Cloud web UI.
#cloud.id:

# The cloud.auth setting overwrites the `output.elasticsearch.username` and
# `output.elasticsearch.password` settings. The format is `<user>:<pass>`.
#cloud.auth:

#================================ Outputs =====================================

# Configure what output to use when sending the data collected by the beat.

#-------------------------- Elasticsearch output ------------------------------
# output.elasticsearch:
  # Array of hosts to connect to.
 # hosts: ["localhost:9200"]

  # Optional protocol and basic auth credentials.
  #protocol: "https"
  #username: "elastic"
  #password: "changeme"

#----------------------------- Logstash output --------------------------------
output.logstash:
  # The Logstash hosts 这个位置非常重要 Logstash port 是9600端口 但是不行
  hosts: ["127.0.0.1:5044"]

  # Optional SSL. By default is off.
  # List of root certificates for HTTPS server verifications
  #ssl.certificate_authorities: ["/etc/pki/root/ca.pem"]

  # Certificate for SSL client authentication
  #ssl.certificate: "/etc/pki/client/cert.pem"

  # Client Certificate Key
  #ssl.key: "/etc/pki/client/cert.key"

#================================ Logging =====================================

# Sets log level. The default log level is info.
# Available log levels are: critical, error, warning, info, debug
#logging.level: debug

# At debug level, you can selectively enable logging only for some components.
# To enable all selectors use ["*"]. Examples of other selectors are "beat",
# "publish", "service".
#logging.selectors: ["*"]
    
```
#### kafka 队列暂时不加 可用redis 更换

#### [x-pack 后续加入](https://www.elastic.co/products/x-pack)
    
      将`安全性`，`警报`，`监控`，`报告`，`机器学习`和`图形`功能捆绑到一个易于安装的软件包中
      报警 安全 自动学习报警 等等
      是独立的可在其他三个服务都都可以安装
      安装路径 https://www.elastic.co/downloads/x-pack

      X-Pack监控使您能够轻松监控Elasticsearch集群的运行状况。监控指标从每个节点收集并存储在Elasticsearch索引中。然后，您可以查看Kibana中的数据，在这些数据中可以轻松地发现问题，或者深入研究系统行为，以便诊断运营问题。除了内置的状态警告外，您还可以根据监控指标中的数据设置自定义警报。
      2、xpack.monitoring.collection.indices：logstash- *，index1，test2（设置索引）

#### [监视弹性堆栈 翻译](https://www.elastic.co/guide/en/x-pack/current/how-monitoring-works.html)
        
        1、X-Pack监视让您深入了解Elasticsearch，Logstash和Kibana的操作。所有监控指标都存储在Elasticsearch中，这使您可以方便地查看Kibana的数据。从Kibana监控界面，您可以一目了然地发现问题，深入了解系统行为，以便诊断操作问题。除了内置状态警告之外，您还可以根据监控指标中的数据设置自定义警报
        2、es监视集群和生产集群 让kiaban只连接监视集群，多个生产集群可以连接到一个监视集群
        

#### elasticsearch x-pack

      bin/elasticsearch-plugin install x-pack     
      bin/elasticsearch-plugin install lmenezes/elasticsearch-kopf
      启用elasticsearch来启动机器学习分析引擎
      bin/elasticsearch 启动
      bin/x-pack/setup-passwords auto 自动这是用户
      bin/x-pack/setup-passwords interactive 交互

      ```
      bin/x-pack/setup-passwords interactive
      Initiating the setup of passwords for reserved users elastic,kibana,logstash_system.
      You will be prompted to enter passwords as the process progresses.
      Please confirm that you would like to continue [y/N]y
      Enter password for [elastic]:
      Reenter password for [elastic]:
      Enter password for [kibana]:
      Reenter password for [kibana]:
      Enter password for [logstash_system]:
      Reenter password for [logstash_system]:
      Changed password for user [kibana]
      Changed password for user [logstash_system]
      Changed password for user [elastic]
      ```     
####  logstash x-pack

    bin/logstash-plugin  install x-pack
    在kibn上就可以产看到 每个接点的情况
    logstash.yml 文件`添加`（本身是没有，需要自己加）：
    ```

    xpack.monitoring.elasticsearch.url: "http://127.0.0.1:9200"

    xpack.monitoring.elasticsearch.username: "elastic"

    xpack.monitoring.elasticsearch.password: "******"

    ```


#### [Logstash](http://blog.csdn.net/weixin_35494719/article/details/54693727)

    Logstash 是开源的服务器端数据处理管道，能够同时 从多个来源采集数据、转换数据，然后将数据发送到您最喜欢的 “存储库” 中。（我们的存储库当然是 Elasticsearch。
    -f 指定配置文件 自己写个配置文件
    bin/logstash -f logstash-simple.conf  启动非常消耗内存 是非常消耗
    logstash（可选）将数据插入到elasticsearch中。


```
[2018-01-26T14:19:57,100][INFO ][logstash.runner          ] Starting Logstash {"logstash.version"=>"6.1.2"}
[2018-01-26T14:19:57,655][INFO ][logstash.agent           ] Successfully started Logstash API endpoint {:port=>`9600`}
[2018-01-26T14:20:01,640][INFO ][logstash.pipeline        ] Starting pipeline {:pipeline_id=>"main", "pipeline.workers"=>4, "pipeline.batch.size"=>125, "pipeline.batch.delay"=>5, "pipeline.max_inflight"=>500, :thread=>"#<Thread:0x3c3133d1 run>"}
[2018-01-26T14:20:06,784][INFO ][logstash.pipeline        ] Pipeline started {"pipeline.id"=>"main"}
The stdin plugin is now waiting for input:
[2018-01-26T14:20:06,989][INFO ][logstash.agent           ] Pipelines running {:count=>1, :pipelines=>["main"]}
```
### logstash-simple.conf  端口号9600 

```
input {  
      beats {
        type => "cheniu_api_server"
        port => "5044"
        codec => "json"
    } 
}
# input { stdin { } }
output {
      elasticsearch {
            hosts => "localhost"
            index => 'cheniu-api-test-%{+YYYY.MM.dd}'
            <!-- 根据创建索引来 在kibana 搜索 -->
      }
      stdout { codec=> rubydebug }
      # stdout { codec=> rubydebug }
 }

```

基本术语

    host – 标记事件发生在哪里。

    type – 标记事件的唯一类型。

    tags – 标记事件的某方面属性，这是一个数组，一个事件可以有多个标签。

    小贴士：每个logstash过滤插件，都会有四个方法叫add_tag, remove_tag, add_field和remove_field。它们在插件过滤匹配成功时生效。

    Logstash传递的每条数据都带有元数据，如@version，@timestamp，host等等，有些可以修改，有些不允许修改。host记录的是当前的主机信息。Logstash可能不会去获取主机的信息或者获取的不准，这里建议替换成自己定义的主机标识，以保证最终的日志输出可以有完美的格式。


####  ElasticSearch  port 9200

    搜索引擎
    Elasticsearch for storage and indexing the data
    弹性搜索存储和索引数据
    bin/elasticsearch
    除了设置x-pack之外 暂时无法的值
    index template （索引模板）
    索引模板用于定义设置和映射，确定如何分析字段。

#### api

     根据调用接口的method 来确认
     PUT /customer?pretty&pretty  创建一个customer index（索引）
     GET /_cat/indices?v&pretty   查看所有索引 


#### [查询方式](https://www.cnblogs.com/ginb/p/7000427.html) 
   
1 、GET /bank/_search?q=*&sort=account_number:asc&pretty

     ```
     took -  Elasticsearch  执行查询的时间（以毫秒为单位）
    timed_out - 告诉我们查询是否超时
    _shards - 告诉我们查询了多少个分片，以及查询成功/失败的分片数量
    hits - 查询结果
    hits.total - 符合我们查询条件的文档总数
    hits.hits - 实际查询结果数组（默认为前10个文档）
    hits.sort - 对结果进行排序的键（如果没提供，则默认使用_score进行排序）
    hits._score和max_score-现在先忽略这些字段
     ```
2、json文件 有很多方式

```
GET /bank/_search
{
  "query": { "match_all": {} },
  "sort": [
    { "account_number": "asc" }
  ]
}
```     
#### 日志级别的配置 需要设置  

1 、config/log4j2.properties 


#### 将es转入到生产

1、 只要你配置了一个网络设置network.host，Elasticsearch就会假定你正在转向生产，并将上述警告升级为异常。这些异常将阻止您的Elasticsearch节点启动。这是一个重要的安全措施，以确保您不会因为配置错误的服务器而丢失数据。

2、 设置jvm的大小
    
     -Xms1g
     -Xmx1g

3、 [禁用     ](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-configuration-memory.html)...

4、

5、

6、



在Logstash设置

    另外我这里添加了`elasticsearch`的用户名和密码，因为后面我使用了x-pack插件，默认用户名是elastic，密码是changeme。

```
$ cat /usr/local/elk/elasticsearch-5.4.1/config/elasticsearch.yml    
# ---------------------------------- Cluster -----------------------------------
cluster.name: my-application
 
# ------------------------------------ Node ------------------------------------
node.name: node-1
#node.attr.rack: r1
 
# ----------------------------------- Paths ------------------------------------
path.data: /data/elasticsearch/
path.logs: /var/log/elasticsearch/
 
# ----------------------------------- Memory -----------------------------------
bootstrap.memory_lock: false
 
# ---------------------------------- Network -----------------------------------
network.host: 0.0.0.0
http.port: 9200
 
# --------------------------------- Discovery ----------------------------------
#discovery.zen.ping.unicast.hosts: ["host1", "host2"]
#discovery.zen.minimum_master_nodes: 3
 
# ---------------------------------- Gateway -----------------------------------
#gateway.recover_after_nodes: 3
<span class="pl-ent">indices.memory.index_buffer_size</span>: <span class="pl-s">15%</span>
```    
    指定文档和日志的存储路径以及监听的地址和端口。注意，应当保证有足够的磁盘空间来存储文档，否则ES将拒绝写入新数据
#### kibana 数据展示 http://localhost:5601/

    config/kibana.yml 
    elasticsearch.url: "http://localhost:9200"

