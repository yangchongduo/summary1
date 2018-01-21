#### emit and dispatch 区别
```
emit 只能绑定在 父组件上，events 无法监听到
dispatch events可以监听到；
```
#### vue中操作数组  
[].push()  
#### vue1 events
---------------------
```
events:{
    'alert-sure':function (uuid) {
  },
```
#### 取值
----------------
```
一个指令  一个不是指令
 <a href="{{ order.url }}">
data-log-param='ad={{order.clickType}}'
:title="other.name" 
```
#### class
---------------
```
:class="['notUsed-discount',{'used-back':usedShow=='used'},{'expired':expiredShow==='expired'}]" 
```
#### $route 不是$router 参数的问题
---------------------------
```
this.$route.query
this.$route.params
```
#### methods
----------------------
```
  methods:{
            handleClick(){
                this.number+=1
            }
        }
```
#### computed
---------------
```
  computed: {//必须有return 
            count(){
                return this.price * this.number
            }
        }
```
#### vue-router  router是不能改变的 重点
---------------------
```
router是不能改变的
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {path: '/', component: firstComponent},
        {path: '/about', component: About}
    ]
});
```
##### vue源码总结
-----------------------------
```
图中的模型（Model）就是 data 方法返回的{times:1}，视图（View）是最终在浏览器中显示的DOM。
模型通过Observer、Dep、Watcher、Directive等一系列对象的关联，最终和视图建立起关系。归纳起来，
Vue.js在这里主要做了三件事：
通过 Observer 对 data 做监听，并且提供了订阅某个数据项变化的能力。
把 template 编译成一段 document fragment，然后解析其中的 Directive，得到每一个 Directive 所依赖的数据项和update方法。
通过Watcher把上述两部分结合起来，即把Directive中的数据依赖通过Watcher订阅在对应数据的 Observer 的 Dep 上。
当数据变化时，就会触发 Observer 的 Dep 上的 notify 方法通知对应的 Watcher 的 update，进而触发 Directive 的 update 方法来更新 DOM 视图，
最后达到模型和视图关联起来。
http://www.imooc.com/article/14466
```
##### vue的ssr
------------------------------
```
https://github.com/ccforward/vue-ssr
```

####  


#### vue中的complier

- html.indexOf('<');
- 会经过各种 `注释性的代码`
- parseStartTag 通过正则 `<div` 字符串 
- 转成ast 然后成为虚拟dom。
- `虚拟dom更新`：
 - 组件div相同。 属性的更新：  `el.removeAttribute()` 和 `el.setAttribute()`
 - 文本的更新   node.textContent = text;
-  属性放在data里面 包含 id class style  等等一共 6个等等
- removeAttribute
- createElement
- appendChild
- insertBefore

```
function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
        if (!vnode) {
          if (oldVnode) {
            invokeDestroyHook(oldVnode);
          }
          return
        }

        var elm, parent;
        var isInitialPatch = false;
        var insertedVnodeQueue = [];

        if (!oldVnode) {
          // empty mount (likely as component), create new root element
          isInitialPatch = true;
          createElm(vnode, insertedVnodeQueue, parentElm, refElm);
        } else {
          var isRealElement = isDef(oldVnode.nodeType);
          if (!isRealElement && sameVnode(oldVnode, vnode)) {
            // patch existing root node
            patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
          } else {
            if (isRealElement) {
              // mounting to a real element
              // check if this is server-rendered content and if we can perform
              // a successful hydration.
              if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
                oldVnode.removeAttribute('server-rendered');
                hydrating = true;
              }
              if (hydrating) {
                if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                  invokeInsertHook(vnode, insertedVnodeQueue, true);
                  return oldVnode
                } else {
                  warn(
                    'The client-side rendered virtual DOM tree is not matching ' +
                    'server-rendered content. This is likely caused by incorrect ' +
                    'HTML markup, for example nesting block-level elements inside ' +
                    '<p>, or missing <tbody>. Bailing hydration and performing ' +
                    'full client-side render.'
                  );
                }
              }
              // either not server-rendered, or hydration failed.
              // create an empty node and replace it
              oldVnode = emptyNodeAt(oldVnode);
            }
            // replacing existing element
            elm = oldVnode.elm;
            parent = nodeOps.parentNode(elm);
            createElm(vnode, insertedVnodeQueue, parent, nodeOps.nextSibling(elm));

            if (vnode.parent) {
              // component root element replaced.
              // update parent placeholder node element, recursively
              var ancestor = vnode.parent;
              while (ancestor) {
                ancestor.elm = vnode.elm;
                ancestor = ancestor.parent;
              }
              if (isPatchable(vnode)) {
                for (var i = 0; i < cbs.create.length; ++i) {
                  cbs.create[i](emptyNode, vnode.parent);
                }
              }
            }

            if (parent !== null) {
              removeVnodes(parent, [oldVnode], 0, 0);
            } else if (isDef(oldVnode.tag)) {
              invokeDestroyHook(oldVnode);
            }
          }
        }

        invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
        return vnode.elm
      }
```



### Vue源码的主体思路

    Vue的源码结构分为两个部分：

    全局设计：包括全局接口、默认选项等
    vm 实例设计：包括接口设计 (vm 原型)、实例初始化过程设计 (vm 构造函数)
    Vue建立的MVVM模型主要是做了三点：

    通过observer对data进行数据监听
    把template解析成document fragment,解析其中directive，得到每一个 directive所依赖的数据项及其更新方法
    通过watcher把上述两部分结合起来，把 directive中的数据依赖订阅在对应数据的 observer上，当数据变化的时候，就会触发 observer，进而触发相关依赖对应的视图更新方法，最后达到模板原本的关联效果。
    所以Vue建立的VM模型的核心就是observer, directive (parser), watcher

    Vue构造函数

    Vue构造函数的实现在src/core/instance/index.js目录下：

    最开始先执行_init方法构造出空原型
    然后通过init.js,state.js,render.js events.js以及lifecycle.js引入五个mixin方法在Vue原型的prototype上挂载方法和属性（包括生命周期）
    之后再引入initGlobalAPI和isServerRendering在prototype上挂载静态属性和方法以及SSR环境判断
    接下来覆盖Vue.config的属性，将其设置为平台特有的一些方法
    设置Vue.options.directives和Vue.options.components安装平台特有的指令和组件
    在Vue.prototype上定义__patch__和$mount

    MVVM模型

    我们都知道Vue的双向数据绑定采用的是发布者-订阅者模式，其中发布者对应的是observer.js，订阅者对应的是compile.js

    observer.js

    observer.js所做的事情就是在生命周期beforeCreate和created之间对data所有属性进行遍历，并为其添加setter和getter方法，根据__ob__属性来标记是否被观察，然后为每个属性添加订阅器Dep，Dep的作用就是ovserver观察到数据变动通知到Dep，Dep负责去通知Watcher来执行数据变化相应操作

    compile.js

    compile.js会编译挂载的根元素el，然后初始化视图，触发data的属性getter生成Watcher，并将Watcher添加到属性的订阅者数组中。在遍历节点的时候会将节点上的指令和事件解析出来，然后进入到Watcher的实例化流程，Watcher中的this会赋值给Dep.target，其中Dep静态属性Dep.target会对应订阅者数组中的目标

###【Vue.nextTick使用场景】

    在做推荐位商品的时候有一个曝光埋点的需求，在组件初始化的时候要默认发送一次visible事件，但在created方法内无法通过refs获取到dom，在查阅文档和资料后发现在Vue生命周期的created()钩子函数进行的DOM操作要放在Vue.nextTick()的回调函数中，原因是在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。



