// promise then  总结一点 就是  异步必须使用 promise 包裹起来 只有这样才可以
-----------------------------------------------
                   // ### then的方式去处理异步  
                   
            ```        var fs = require('fs');
                          var read = new Promise((resolve, reject) => {
                              fs.readFile('./note.txt', 'utf-8', function (err, data) {
                                  // console.log(data)
                                  resolve(data)
                              })
                          });
                          var fn = function () {
                              return new Promise((resolve) => {
                                  setTimeout(() => {
                                      resolve('xxxxx')
                                  }, 5000)
                              })
                          };
                // 请注意 read 和write的写法 有不同   
                var write = (res) => {
                    return new Promise((resolve) => {
                        fs.writeFile('./ycd.txt', res, (err) => {
                            console.log(err)
                        })
                        resolve('写成功了')
                    })
                }
                
                    var promise = new Promise((resolve, reject) => {

                });
                fn().then((res) => {
                    return read
                }).then((res) => {
                    return write(res)
                }).then((res) => {
                    console.log(res)
                })
```
               //  ####结合async  和await 去操作    
```                           var fn=function () {
                      return new  Promise((resolve,reject)=>{
                          // 这边处理异步的
                          console.log('000')
                          setTimeout(resolve,5000)
                      })
                  };
                  var fnnn=async function () {
                      await fn()
                      console.log('xxxx')
                  };
                  //fnnn();
                  //这个数组  同时里面有异步 是最好的
                  var　fs=require('fs')
                  var promise1=()=>{
                      return new Promise((resolve)=>{
                          fs.readFile('./1.txt','utf-8',(err,data)=>{
                             // console.log(data)
                              resolve(data)
                          })
                      })
                  };
                  // 这个就可以改写了 不用执行  直接是 promise 最好   
                  var promise2=()=>{
                      return new Promise((resolve)=>{
                          fs.readFile('./note.txt','utf-8',(err,data)=>{
                              //console.log(data)
                              resolve(data)
                          })
                      })
                  }
                  var ary=[]
                  promise2().then((res)=>{
                      //console.log(res)
                  })
                  ary.push(promise1())
                  ary.push(promise2())


                  Promise.all(ary).then((array)=>{
                      console.log(array[0])
                  });
                  
```                  //--------------------------------------------------------------------
                //  ### 请注意 read 和write的写法的不同   
 ``                 var fs=require('fs')
                  var fn=new Promise((resolve,resject)=>{
                     resolve()
                  });
                  var read=function () {
                      return new Promise((resolve,reject)=>{
                          fs.readFile('./note.txt','utf-8',function (err,data) {
                              if(err){
                                  reject(err)
                              }else {
                                  resolve(data)
                              }

                          })
                      })
                  }
                  var fn1= async function () {
                     var data= await read()
                      return data
                  };
                  var write=(res)=>{
                      return new Promise((resolve,reject)=>{
                          fs.writeFile('./1.txt',res,(err)=>{
                              console.log(err)
                          })
                          resolve('成功了')
                      })
                  }
                  var fn2=async function (res) {
                     var data= await write(res)
                      return data
                  }
                  // 下面处理  第一个是异步  下面的那个异步  需要上面的依赖的话返回
                  fn.then((res)=>{
                      return fn1() //
                  }).then((res)=>{
                      return fn2(res)
                  }).then((res)=>{
                      console.log(res)
                  });

```
####  0=>1=>2=>3=>4=>5
-----------------------------
```
for (var i = 0; i < 5; i++) {
    ((j) => {
        setTimeout(function () {
            console.log(Date.now(), j)
        }, j * 1000);
    })(i)
}
setTimeout(function () {
    console.log(Date.now(), i)
}, 1000 * i);
// let 块级作用域
for(let i=0;i<5;i++){
console.log(i)
}

//使用借助 promise
var tasks = []
const out = (i) => new Promise((resolve, reject) => {
    setTimeout(function () {
        console.log(Date.now(), i);
        resolve()
    }, i * 1000);
})
for (var i = 0; i < 5; i++) {
    tasks.push(out(i))
}
Promise.all(tasks).then(() => {
    setTimeout(function () {
        console.log(Date.now(), i);
    }, 1000);
})
//---------------async await---------
// 模拟其他语言中的 sleep，实际上可以是任何异步操作
const sleep = (timeountMS) => new Promise((resolve, reject) => {
    setTimeout(resolve, timeountMS);
});
(async ()=>{
    for (var i = 0; i < 5; i++) {
        await sleep(1000)
        console.log(Date.now(), i)
    }
    await sleep(1000);
    console.log(Date.now(), i)
})()
```
##### promsie的写法
--------------------
```
const load=()=>{
    return new Promise((resolve)=>{
        resolve('xxx')
    })
}
var a=new Promise((resolve)=>{
    load().then(resolve)
});
a.then((data)=>{
    console.log(data)
})

```

###  验证 promise data什么时候成为一个resolve的状态呢

```
console.time('1')
const ff1 =  ()=>{
  return new Promise((resolve,reject)=>{
    setTimeout(resolve, 1000);
  })
}
const ff3 = ()=>{
  return new Promise((resolve,reject)=>{
    setTimeout(resolve, 3000);
  })
}
const data = ff1().then(()=>{
  console.log('eeee');
  return ff3()
})
console.log(data);
data.then(()=>{
  console.timeEnd('1')
  console.log('rrrr');
})
```
