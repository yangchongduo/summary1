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
