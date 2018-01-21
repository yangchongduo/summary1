### [如何利用shouldComponentUpdate(nextProps, nextState)如何优化](https://www.cnblogs.com/penghuwan/p/6707254.html)
- 自身的state  nextState 不相同就是 返回true，相同return false
- 从父级过来的props
- props是一个时候最好通过object.assign赋值一个对象或这使用immutable.js
- 纯组件 无状态组件

#### redux [https://github.com/react-cd/redux]
   
    1：订阅 通知通知数据更新
    2：中间件的实现最为出色 
      2.1 第一层为最初的 initalSate dispatch（最初的）第一层传入的最初的dispatch（中间件执行完之后会将其重写）
      2.2 中间件执行通过 [fn,fn2,fn3].reduce 形成一个函数；
      2.3 将最初的disptch传入函数 reduce产生的函数执行， 上一个中间件的返回结果为下一个中间next传入
      2.4 然后在正向执行 （完美）
  
### redux 知识点

- 创建store的时候将 reducer和各种中间件放在store里面
- 先过中间件 然后再是所有的reducer 
- 最开始就subscribe订阅了很多视图更新的方法
```
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
```
#### react-redux
将subscribe 组件更新的能力包装了

```
import {Provider,connect} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#app')
);

let App = connect(mapStateToProps,mapDispatchToProps)(Counter);
```

    mapStateToProps： 前者负责输入逻辑，即将state映射到 UI 组件的参数（props），
    mapDispatchToProps：后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。


### [redux-actions && redux-promise && redux-thunk](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)

    处理`异步`的 可以发送一个函数和promise 源码可以复习一下；

### subscribe

    Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。
    显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染

### reducer

    Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出

### react生命周期

- componentWillMount
- componentDidMount dom已经挂在了 页面已经渲染


### 1.【react】

    shouldComponentUpdate 优化性能展示。内置两个参数。nextProps, nextState。nextProps是父级组件更新子级更新属性。nextState自身组件更新优化。属性和状态不相同返回true，相同就返回false。
    重点：如果是nextProps，nextState是引用数据类型，需使用object.assgin赋值属性或者immutable
    
### 2.【mobx 状态管理】

    设计思想： @observable 和 @observer ，它们分别对应的是被观察者和观察者。实现方式ES7 中的 装饰器。

    
#### 3. 

        如果当state是对象的时候上面的代码是错误的: 
        redux里面规定state是不能修改的。
        在javascript中对象是引用数据类型，当你修改了state的时候，变化前后的两个state将会指向同一个地址的，react-redux就会以为这两个相同的state，因为不会执行渲染
        解决办法，我们用Object.assign去处理，如有不清楚Object.assign    