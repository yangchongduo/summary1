#### [方案 处理缓存](https://foio.github.io/service-worker-cache/)
- 前端每次上线都更新缓存的版本号。cache-v1 =>  cache-v2
- 对于fetch缓存，只缓存css js，对ajax不缓存。

```
//资源白名单，一般通过构建工具(webpack)生成
var allAssets = [
  '//your.cdn.com/app.css',
  '//your.cdn.com/common.js',
  '//your.cdn.com/index.js'
];

//白名单匹配策略
function matchAssets(requestUrl) {
    var urlObj = new URL(requestUrl);
    var noProtocolUrl = urlObj.href.substr(urlObj.protocol.length);
    if (allAssets.indexOf(noProtocolUrl) !== -1) {
        return true;
    }
    return false;
}

//监听fetch事件，并只代理白名单中的GET网络请求
self.addEventListener('fetch', function (event) {
    try{
        var requestUrl = event.request.url;
        var isGET = event.request.method === 'GET';
        var assetMatches = matchAssets(requestUrl);
        if (!assetMatches || !isGET) {
            return;
        }
        var resource = cacheFirstResponse(event);
        event.respondWith(resource);
    }catch(ex){
        console.error('[SW]: handle fetch event error, fallback');
        return;
    }
});
```

#### [基础dem【无缓存】](https://github.com/selfRepositoryAll/pwa)