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
