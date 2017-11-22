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