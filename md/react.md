### [如何利用shouldComponentUpdate(nextProps, nextState)如何优化](https://www.cnblogs.com/penghuwan/p/6707254.html)
- 自身的state  nextState 不相同就是 返回true，相同return false
- 从父级过来的props
- props是一个时候最好通过object.assign赋值一个对象或这使用immutable.js

### react生命周期
- componentWillMount
- componentDidMount dom已经挂在了 页面已经渲染


    