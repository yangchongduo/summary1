#### 指定sql服务的
----------------------------------
```
mysql -h localhost(192.212.212.2||http.xxxx.net) -u root(用户名一般不需要改) -p enter
password :明码不是明文的了
\s 是查看具体的情况
show variables; 配置文件中所有的变量 
show variables like "time_zone"; 单个配置
show variables like "port";
show databases;  多少个表
create database xsjs;
create database  if not exists xhjs;  不存在在建立
drop database  if  exists xhjs;  不存在在建立
  
 create table xhjsdb.users(id int, name char(30),  age int, sex char(3)); 创建一个表 需要有字段  或者数据类型  （中间有，号分开）；
 使用 use   数据库(xsjs)  这样就可以不用每次加上数据库的名字了；
 \s  查看默认的数库 就会默成为数据库
 Current database:       xhjsdb
 show tables; 查看都有什么样的表；
 desc users（表名）; 查看表的结构； desc
 insert into user values(1,"xxx",4)
 //一般都是这么插入 数据库 根据字段去插入
 insert into user(id,name,age) values(10,"wangwu",88);
 查看 select * from user（表名）;
 更新字段；  重点有set and 条件；
 update user set name="xxxxx",age=00 where id=10;
 删除某个记录
 delete from user where id=10;
 
  ? contents 帮助文档
  创建无符号的表； unsigned 无符号的；
  CREATE TABLE tab2(id tinyint UNSIGNED);
  DROP TABLE name; 
```
#### 列的数据类型
----------------------
```
数值型  整形(整数  1:非常小整形2:较小)   
一个字节  8位01 范围是 -128-127  0-255（无符号的时候 就是不需要负数的时候）
          16位 01 2个字节 依次往后推送
          浮点形（小数） 不能等号比较 不稳定，最好1from tab7;
  字符串
          char 是固定长度 速度比varchar快  但是浪费空间 场景: 比如说性别这是 固定的；
          varchar 长度是变的； 比如说标题的长度； 但是查询速度比较慢；  varchar 不变的改进； 所以varchar还在不断的跟进；
          text 较大数据    文本数据  文章日志等等  2的16次方-1
           MEDIUMTEXT 
           LONGTEXT
          blob 二进制类型  照片电影 压缩包等等   一般都是保存服务器放文件名就可以了  读取文件为二进制，然后再  通过代码是非常方便的
          MEDIUMBLOB;
          LONGBLOB ;几个G吧；

          ENUM  枚举  很少的  一个字节或者两个字节    标号    肯定占一个字节
          SET   集合   1234 或者8个字节  存多个值的     64个成员
           create table tab9(one enum("a","b","c"), two set("a","b","c")); 
            insert into tab9 values("a","a"); 
            insert into tab9 values("w","w"); 报错 只能插入枚举和集合中有的值  
            枚举是不能多个使用的 一次只能使用一个值   
            insert into tab9(one) values("a,b");报错   星期天 星期几  男女  都可以使用menu 因为就这几种
            set 集合是可以使用多个的                
            insert into tab9(two) values("a,b"); ok 不报错；   一个字段连续多个话 使用set 就可以了；
    时间类型 项目中一般都是int 类型； 
    date YYYY-
    time
    datetime
    timestamp 时间戳 
    year
  用整数保存事件  是比较好的  比较容易计算  time比较好
     
```
####  属性保持表的一致性
--------------
```
数据的字段属性：
    1：unsigned 设置无符号的  可以让空间增加一倍   场景:这个字段不需要负数 设置这个属性 -128-127   增加一倍就是
                 只能用在数值型字段 整型和浮点型； 有符号和无符号的； 字符串和时间不分有符号  无符号
       create table t2(id int(5)) // 这样就可以
    2:zerofill  0填充    只能用在数值型字段  前
      create table t3(id int(5) zerofill)自动补齐 前面的0
       create table t2(name int(5) unsigned, age float(5,2) unsigned,  data varchar(10));
       int 超过五位就会保存，无法存入 ，  就是来限制长度的  
       float 也是可以控制长度的；  往后自动补0  小数后面不到  现在设置的是小数后面是2位，23.3  数据库会变成23.30；
       varchar（10）； 都是可以进行限制的
    3: auto_increment    整形  数据没增加一条就会自动加1；
    null  0  或者留空  会自动加1 
     create table t3(id int auto_increment primary key, name varchar(10));增加一个主键 才可以；
     insert into t3  values(null,"xxx");   
     连续执行四次 
     +----+------+
     | id | name |
     +----+------+
     |  1 | xxx  |
     |  2 | xxx  |
     |  3 | xxx  |
     |  4 | xxx  |
     +----+------+
     经过测试   在最大的id 上面+1  delete form t3 where id >1 and id <5; 就可以删除 现在数据库会自动排序
     每个表 最好都设置一个 id 字段 auto_increment
    4： null  和 not null；
    创建表的时候 都不要插入 null  有可能在程序转化的时候 不能转化为我们想要值
    那就设置not null 就可以了
    create table t4(id int not null, name varchar(10) not null); 
    insert into t4(name) values('xxx'); 一般多个字段，插入一个，其他会默认为null 但是现在设置为not null 所以就会报错；
    5:default 一般的默认值是null 现在是not null  所以要有 default 这个属性；
     create table t1(
    -> id int unsigned auto_increment not null primary key,// 必须有主键
    -> name varchar(10) default not null "", 
       age int not null default ,// 这样就可以了
  -> );

  
  
  
```
#### 索引
-----------------------------
``` 
1：主键索引  最好为每张数据表 定位一个主键索引 一个表只能有一个时主键的； 主键的值不能为空； primary key 
2: 唯一索引  和主键索引 都可以创建重复的值  unique  不是为了提高访问速度，而是为了能够避免数据重复
  create table t3(  // unsigned 是不能放在 not null 后面
   -> id int unsigned not null  auto_increment,
    -> name varchar(20) not null default '' unique,
    -> age int,
    -> primary key(id));
  +-------+------------------+------+-----+---------+----------------+
  | Field | Type             | Null | Key | Default | Extra          |
  +-------+------------------+------+-----+---------+----------------+
  | id    | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
  | name  | varchar(20)      | NO   | UNI |         |                | UNI  唯一的；
  | age   | int(11)          | YES  |     | NULL    |                |
  +-------+------------------+------+-----+---------+----------------+
  **************************************************常规索引和全局索引没有做****************************************
 3：常规索引   是程序员 最重要的技术  提高数据库的性能  ************************
    1111，
    22222
    。。。。
    1万条记录
    假如查询数据  查询的数据 假如是第一条的话，会很快查到，假如是倒数第二条就需要读取之前很多的 效率很低
    1 可以提高查找的速度
    2 会减慢 数据列上的删除 插入 修改的速度
    分表 一个要创建索引的放在一个表 没有索引的放在一个表里 通过一个字段两者关联起来；
  4:全局索引
  
```
#### mysql的表的类型 可以选择不同存续表的类型
-------------------------------
```
create table t3(id int) engine = MyISAM;
show engines; 9种的类型
create table () type myisam  // type 好像不对
create table () engine innodb
 MyISAM   optimize table 
           强调快速读取操作
           也有一些功能不支持
 InnoDB   更新换代的产品 支持外键
          支持myisam的功能
          速度比myisam的读写速度慢
          功能                   MyISAM        InnoDB
          事务处理                  no             yes
          数据行锁定               no               yes
          外键                      no               yes
          空间                    yes 相对较小         no 相对较大  最大2倍      
          全文索引                  支持             不支持
        
```
#### 默认字符集
------------------------------
```

```
#### mysql
----------------------
```
创建 数据库
mysqladmin -u root -p create RUNOOB
删除数据库
mysqladmin -u root -p drop RUNOOB
创建完数据库之后 创建table
CREATE TABLE runoob_tbl{}// 这样就可以来了
删除表
DROP TABLE table_name 
插入
INSERT INTO 
更新
UPDATE table_name SET field1=new-value1, field2=new-value2
删除
DELETE FROM table_name [WHERE Clause]
查找
select from
SELECT column_name,column_name FROM table_name
```
####  数据库索引 场景1: 给数据库增加索引会增加查询的速度
--------------------------------------------
```
SELECT * FROM mytable WHERE category_id=1;
CREATE INDEX mytable_categoryid_userid_adddate ON mytable (category_id,user_id,adddate);
```
### orm[数据库连接池](https://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959821&idx=1&sn=4ede084b05ce81a9a5ddb87ec62434bb&chksm=bd2d07d18a5a8ec7726619dbb9f1e99df8239ebd07d5f01d748e01c08dd543f0a434945301c6&mpshare=1&scene=23&srcid=0715dcBedm9Hicsw70brEqkg#rd)  
结论也很简单，服务启动的时候，先建立好若干连接Array[DBClientConnection]，  
当有请求过来的时候，从Array中取出一个，执行下游操作，执行完再放回，从而避免反复的建立和销毁连接，以提升性能。    
### [事务:](https://itbilu.com/nodejs/npm/EJO6CcCM-.html)    
概念: 事务主要用于处理操作量大，复杂度高的数据。比如说，在人员管理系统中，你删除一个人员，你即需要删除人员的基本资料，也要删除和该人员相关的信息，如信箱，文章等等，这样，这些数据库操作语句就构成一个事务！    

### mysql  [(sequelize)](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001471955049232be7492e76f514d45a2180e2c224eb7a6000)
步骤 
>0 docker exec -it id  mysql -u root -p    
>1 docker run -p 3306:3306  -e MYSQL_ROOT_PASSWORD=123456 -d mysql /bin/bash    
>2 docker exec -it it bash     
>3 mysql -u root -p      
>4 密码:123456  
>5 show databases; （必须有分号）;    
