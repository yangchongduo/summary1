#### koa最主要的东西是  dispatch(i + 1)
```
function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0) // 一直在这个 dispatch 原来就是这个东西
    function dispatch (i) {
      console.log('i',i)
      console.log('index',index)
      debugger
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      console.log('-----')
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        // 每个中间件第一个参数都是会 context
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
  ```
