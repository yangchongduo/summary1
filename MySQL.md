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
