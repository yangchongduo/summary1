#### Filebeat

    filebeat.yml
    /usr/share/filebeat/filebeat.yml.
    <!-- 所有的配置文件可以为一个 增加name  -->
    docker run -v ~/filebeat.yml:/usr/share/filebeat/filebeat.yml docker.elastic.co/beats/filebeat:6.1.2



#### logstash
 
    X-Pack is pre-installed in the default image. With X-Pack installed, Logstash expects to connect to an Elasticsearch cluster that is also running X-Pack, in order to publish data for the Monitoring component.   
    docker pull docker.elastic.co/logstash/logstash:6.1.2

logstash filter

    插件系统 events对象；
