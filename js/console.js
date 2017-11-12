const fn = () => {
  console.count('执行的次数')
}
fn()
fn()
fn()
// 你可以用%s来输出字符串，%i来输出数字，%c来自定义格式。如果你使用单页面框架，对于视图(view)的console消息使用一种格式，模型(model)、集合，控制器各自使用不同的格式。甚至，你可能想要更短的名字，类似于wlog, clog和mlog。
// 个性化console.log信息
// 特殊的console.log
todoLog = function (msg) {
  console.log(`%c %s %s %s`, `color: yellow; background-color: black`, `–`, msg, `–`);
}

iLog = function (msg) {
  console.log('%c %s %s %s', 'color: brown; font-weight: bold; text-decoration: underline; ', '–', msg, '–');
}

todoLog("This is something that' s need to be fixed");
iLog("This is an important message");