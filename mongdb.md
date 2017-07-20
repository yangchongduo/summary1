### 查询数据库异步处理  
```
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost:27017/test",{
	useMongoClient: true,
});
db.on('error', console.error.bind(console, 'connection error:'));
const userSchema = new mongoose.Schema({
	name:String, //姓名
	sex:Number,
	age:Number,//年龄
});
//这就是集合了Student
// /Student 集合是复数  请查看 show collections 会出现一个集合 students这个集合
var UserModel = mongoose.model("Session", userSchema);
// UserModel.create([
// 	{ name:"xxx1", age:1 },
// 	{ name:"xxx2", age:2 },
// 	{ name:"xxx3", age:3 },
// 	{ name:"xxx4", age:4 },
// 	{ name:"xxx5", age:5 },
// 	{ name:"xxx6", age:6},
// 	{ name:"xxx7", age:7 },
// 	{ name:"xxx8", age:8 },
// 	{ name:"xxx9", age:9},
// 	{ name:"xxx10",age:10 }
// ], function(error,doc){
// 	if(error) {
// 		console.log(error);
// 	} else {
// 		// console.log(doc);
// 	}
// });

// 方案1: 推荐  和 promise一样的 pendding 一样
(async () => {
	const data=  await UserModel.find();
	console.log('data',data)
})();
// 方案2:
UserModel.find({},(error, docs)=>{
	if(error){
		console.log(error)
	}else {
		console.log(docs)
	}
});
// 方案3;
(async ()=>{
	 const data  = await (new UserModel());// 创建模型的实例 然后通过模型的实
	 const res = await data.model('Session').find();
	 console.log('res',res)
})()
```  
### mongo基本的命令 
|命令|备注|
|---|---|
|use runoob|创建数据库 runoob|
|db|查看到底是哪个数据库|
|show collections|sessions 集合|
|db.sessions.find()|查看session集合的数据|
| db.FirstCollection.insert({name:"jack",age:22})|集合中插入数据|
|||
|||
**注意**:mongo的环境总是连接不上，我通过docker的image映射出来就ok 了
###  请注意下面的大坑
```
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/runoob",{
	useMongoClient: true,
});

const userSchema = new mongoose.Schema({
	name:String, //姓名
	sex:Number,
	age:Number,//年龄
});
//这就是集合了Student
// /Student 集合是复数  请查看 show collections 会出现一个集合 students这个集合
var UserModel = mongoose.model("Student", userSchema);
UserModel.create({ name:"xxx", age:7}, function(error,doc){
	if(error) {
		console.log(error);
	} else {
		console.log(doc);
	}
});
UserModel.find({},(error, docs)=>{
	if(error){
		console.log(error)
	}else {
		console.log(docs)
	}
})

```
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
