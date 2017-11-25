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



#### vue中的complier

- html.indexOf('<');
- 会经过各种 `注释性的代码`
- parseStartTag 通过正则 `<div` 字符串 
- 转成ast 然后成为虚拟dom。
- `虚拟dom更新`：
 - 组件div相同。 属性的更新：  `el.removeAttribute()` 和 `el.setAttribute()`
 - 文本的更新   node.textContent = text;
-  属性放在data里面 包含 id class style  等等一共 6个等等

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


