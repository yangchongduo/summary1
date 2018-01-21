#### webpack

-  模块化，像node那样使用。
-  编译的整体流程是基于Tapable事件流。内部基于很多事件流。
-  如何拆分模块 ？ build 之后的代码可以研究
-  [如何写一个插件](https://doc.webpack-china.org/api/plugins/#tapable-tapable-instances)？
  - 插件都是顺序执行的。官方提供很多api，书写插件和书写react的中间件有些相似，因为都是各自规范。插件内部肯定有`事件`
- 如何写一个loader
  - 其实就是一个模块。
  ```
  var _ = require('lodash');

module.exports = function(source){
    // console.log(source);
    var template = _.template(source + 'loader has worked!');
    return 'module.exports = ' + template;
};
  ```

## 1.【webpack 插件学习打包优化】

    方案1：在”emit"事件获取所有编译资源。在”html-webpack-plugin-after-html-processing”事件中进行替换掉资源（css js）直接打包在html中。
    将打包的文件的hash版本打包在页面中，对比之前缓存的版本号是否相同，不相同在拉去
    方案2：放在localstorage中通过ajax获取反写到html。

#### webpack和gulp的区别是什么

    模块化思想

#### 生产环境 压缩最为慢 如何优化的 都是通过压缩进程来启动

    - webpack-uglify-parallel
    - uglifyjs-webpack-plugin,

#### webpack打包机制 

- 通过ajax之后放在localstorage中如何实现
- 也可以通过设置缓存来完成这个功能
- 主要是为了放在localstorage中，下次不在请求；
- 通过defer 和async 也可以转化为异步请求； 为什么必须是用ajax方案    