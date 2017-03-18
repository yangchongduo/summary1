#### var和let的区别
----------------
         ```
            1：变量i是var声明的，在全局范围内都有效。所以每一次循环，新的i值都会覆盖旧值，导致最后输出的是最后一轮的i的值。
               如果使用let，声明的变量仅在块级作用域内有效，
            2：var命令会发生”变量提升“现象 let不会
            ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。
            凡是在声明之前就使用这些变量，就会报错。
                      var tmp = 123;

                      if (true) {
                        tmp = 'abc'; // ReferenceError
                        let tmp;
                      }
             重点 let块级作用域的目的:块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。
           ```
##### const 常量 不想再次被赋值 但是内部属性是可以再次赋值的   不变的内存的地址
-----------------------------------

           const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），  
           值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，  
           保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。  
           因此，将一个对象声明为常量必须非常小心  

##### setTimeOut模拟异步 只是 setTimeOUT不好用
-------------------------------
                var func = function (params) {
                    return new Promise((resolve) => {
                      setTimeout(function (params) {
                        resolve('xxxxx')
                      }, 5000);
                    })
                  }
                  for (let i = 0; i < 10; i++) {
                    console.log('i', i);
                    (async function (params) {
                     var res= await func().then((res)=>{
                       console.log('res',res);
                       return res
                     })
                      console.log('outerRes',res);
                      console.log('--------------');
                      console.log('0000000000000');
                    })()
                  }
#### test
--------------------------
```
console.log(xxx)
consolel.
```
