#### mac下安装坑  
需要 用户创建文件夹的权限，否则是过不去的  
sudo chown -R yangchongduo /data/db  
bin 下面启动 👇  
./mongod   
#### 基本语法
db.createUser({user: "accountUser",pwd: "password",roles: [ "readWrite", "dbAdmin" ]}) //创建用户  
db.dropUser('accountUser'); //删除用户  
show users //查看所有用户  
show dbs  //查看数据库  
use xxx // 用哪个数据库  
show collections //查看集合
db.getCollectionNames() //查看所有集合的名字例如 [ "sessions", "users" ]    
db.sessions.find() //查找集合所有的内容例如
coll.find({name:'molin'}); //查看name=‘molin’的数据  
coll.insert({name:'Admin',age:'23'}) //添加数据  
coll.remove({age:'23'}); //删除数据  
coll.update({name:'Admin'},{$set:{age:'age2'}},  {upsert:false,multi:true}); //把name=‘Admin’ 的age改为age2，两个参数：upsert是true时，如果没有找到就会新增一条数据，multi如果为true就会更改多条匹配的数据（否则只改第一条）。   
coll.save({name:'Admin',name:'4',age:'4'}); //把name=‘Admin’的name改为4，age改为4  
