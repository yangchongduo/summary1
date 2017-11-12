### [阿里面试](https://github.com/jawil/blog/issues/22)
### 阿里影业：
>1. css3 用过哪些 
>2. h5的新特性用过哪些？websoket 和webworkers 有什么不同的
>3. cookie 和localstorage sessionStorageq区别
>4. angular 三种服务的区别
>5. angular 的原理 脏检查的
>5. angualr2的原理
>6. emit broadcast 
>7. react setState是同步的还是异步的
>8. react 的diff算法  key的用途
>9. vue1中的emit 和dispatch 
>10. vue2的原理


阿里UED部门   任何技术要服务于业务
>1. 使用过三个框架，及其原理看几篇有深度的博客就知道
>2. 重点是业务：是能做一个项目还是页面级别的。


|阿里巴巴||
|---|----|
|koa2的洋葱机制是如何实现的 |反向实现的 函数的闭包 放在数组依次执行。函数的嵌套。|
|为什么使用redux 如何实现的||
|如何通过action 中的 type 找到对应的reducer|1：串行 在返回的action 里面继续 diapatch 其他action即可。2：并行 只要type一样即可|
|平级组件是如何通讯的|1：有一个公共的父组件，将通用的属性，抽离成父组件的state，然后通过props，传递到子组件中 2：redux 就是用来做这个事的，建立一个全局的store，从store里面获取|
|最难点 diff算法 如何diff||
|左侧固定 右侧适应集中方法||

#### react reducer
- 每次dispatch 都会遍历所有的reducer，根据action中的type 执行，如果type相同就都会执行。
- action中可以继续action，promise-thunk，promise-middle
- redux-saga可代替 promise-thunk 。 实现yeild作用

- logout是一个action，是一个函数action，第一个参数是dispatch， 是由promise-thunk的原因
- vuex直接支持 dispatch
```
export const logout = () => (dispatch) => {
  local.clear('userInfo', 'accessToken', 'refreshToken');
  dispatch({ type: LOGOUT });
  dispatch(push('/login'));
};
```

#### [平级组件是如何通讯的](https://segmentfault.com/q/1010000006631206/a-1020000006632360)
- 将两个组件共有的部分，抽离成父组件的state，然后通过props传递到子组件中。
- redux中，统一的store管理。
