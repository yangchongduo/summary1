
### zabbix
- docker run --name some-zabbix-web-nginx-mysql -e DB_SERVER_HOST="some-mysql-server" -e MYSQL_USER="some-user" -e MYSQL_PASSWORD="some-password" -e ZBX_SERVER_HOST="some-zabbix-server" -e PHP_TZ="some-timezone" -d zabbix/zabbix-web-nginx-mysql

```

 docker run --volumes-from zabbix-web-nginx-mysql -t \
  -e DB_SERVER_HOST="mysql-server" \
  -e MYSQL_DATABASE="zabbix" \
   -e MYSQL_USER="zabbix" \
  -e MYSQL_PASSWORD="zabbix_pwd" \
  -e MYSQL_ROOT_PASSWORD="root_pwd" \
  --link mysql-server:mysql \
   --link zabbix-server-mysql:zabbix-server \
   -p 80:80 \
   -d zabbix/zabbix-web-nginx-mysql:latest

```
```
docker run --volumes-from zabbix-web-nginx-mysql -it \
 -e DB_SERVER_HOST="mysql-server"  \
 -e MYSQL_DATABASE="zabbix"  \
 -e MYSQL_USER="zabbix"  \
 -e MYSQL_PASSWORD="zabbix_pwd"  \
 -e MYSQL_ROOT_PASSWORD="root_pwd" \  
 --link mysql-server:mysql  \
 --link zabbix-server-mysql:zabbix-server  \
 -d zabbix/zabbix-web-nginx-mysql:latest
```

```
- docker run  --link some-mysql-server:mysql 
-e DB_SERVER_HOST="mysql-server" 
-e MYSQL_USER="some-user" 
-e MYSQL_PASSWORD="some-password" 
-e ZBX_SERVER_HOST="some-zabbix-server"
-e PHP_TZ="some-timezone" 
-d zabbix/zabbix-web-nginx-mysql:tag
```

```
docker run --name some-zabbix-web-nginx-mysql 
-e DB_SERVER_HOST="mysql-server" 
-e MYSQL_USER="some-user" 
-e MYSQL_PASSWORD="some-password" 
-e ZBX_SERVER_HOST="some-zabbix-server" 
-e PHP_TZ="some-timezone"
-d zabbix/zabbix-web-nginx-mysql

```


```
docker run --volumes-from zabbix-web-nginx-mysql -it -e DB_SERVER_HOST="some-mysql-server"  -e MYSQL_DATABASE="zabbix" -e MYSQL_USER="zabbix" -e MYSQL_PASSWORD="zabbix_pwd" -e MYSQL_ROOT_PASSWORD="root_pwd" --link mysql-server:mysql --link zabbix-server-mysql:zabbix-server -d zabbix/zabbix-web-nginx-mysql
```
