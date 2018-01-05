// (function(e, t) {
// 	var e = document,
// 		t = window,
// 		a;
// 	var n = {
// 		KEY_CACHE: "_ibc",
// 		KEY_VERSION: "_v",
// 		KEY_CONTENT: "_c",
// 		comparable: undefined,
// 		sources: [],
// 		init: function(e) {
//       {
//         sources: [{
//           type: "css",
//           name: "baitiao.css",
//           version: "f2b3738b0a665"
//         }, {
//           type: "js",
//           name: "baitiao.js",
//           version: "74dad6879019a"
//         }, ]
//       }
// 			this.comparable = e.comparable;
// 			this.sources = e.sources;
// 			this.sources.forEach(function(e) {
// 				this.load(e)
// 			}.bind(this))
// 		},
// 		load: function(n) {
// 			var s, i, c, o = e.getElementsByTagName("body")[0];
// 			if (n.type === "js") {
// 				c = e.createElement("script");
// 				c.type = "application/javascript"
// 			} else if (n.type === "css") {
// 				c = e.createElement("style")
// 			}
// 			try {
// 				a = a || JSON.parse(t.localStorage.getItem(this.KEY_CACHE));
// 				i = a && a[n.name] && a[n.name][this.KEY_VERSION] || "";
// 				if (i && n.version === i) {
// 					s = a[n.name][this.KEY_CONTENT];
// 					c.innerHTML = s;
// 					o.appendChild(c)
// 				} else {
// 					this.fetch(c, n, n)
// 				}
// 			} catch (r) {
// 				this.fetch(c, n, n)
// 			}
// 		},
// 		fetch: function(a, n, s) {
// 			var i = e.getElementsByTagName("body")[0];
// 			var c = new XMLHttpRequest;
// 			c.open("GET", "{{constant.cdn}}/laifenqi/static/" + s.type + "/" + n.name + "?v=" + n.version);
// 			c.onreadystatechange = function() {
// 				if (c.readyState === 4 && (c.status >= 200 && c.status < 300 || c.status === 304)) {
// 					try {
// 						var e = c.responseText;
// 						if (n.type === "js") {
// 							e += "\n//# sourceURL=" + n.name + "\n"
// 						}
// 						a.innerHTML = e;
// 						i.appendChild(a);
// 						if (s.name) {
// 							var o = JSON.parse(t.localStorage.getItem(this.KEY_CACHE)) || {};
// 							var r = o[s.name] = {};
// 							r[this.KEY_VERSION] = s.version;
// 							r[this.KEY_CONTENT] = e;
// 							t.localStorage.setItem(this.KEY_CACHE, JSON.stringify(o))
// 						}
// 					} catch (E) {}
// 				}
// 			}.bind(this);
// 			c.send()
// 		}
// 	};
// 	t.Istanbul = n
// })(document, window);
// Istanbul.init({
// 	sources: [{
// 		type: "css",
// 		name: "baitiao.css",
// 		version: "f2b3738b0a665"
// 	}, {
// 		type: "js",
// 		name: "baitiao.js",
// 		version: "74dad6879019a"
// 	}, ]
// })

var  str = '<!DOCTYPE html><html lang=zh-cmn-Hans><head><meta charset=UTF-8><link rel=dns-prefetch href=//img002.qufenqi.com><link rel=dns-prefetch href=//img003.qufenqi.com><link rel=dns-prefetch href=//bistat.qufenqi.com><link rel=dns-prefetch href=//fecdn.qfq.me><meta content=yes name=apple-mobile-web-app-capable><meta content=yes name=apple-touch-fullscreen><meta content="telephone=no" name=format-detection><meta content=black name=apple-mobile-web-app-status-bar-style><meta name=viewport content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1"><link rel=icon href={{constant.cdn}}/laifenqi/static/image/favicon.ico type=image/x-icon><title>{{ pageData.title }}</title><script>window.CONSTANT = {{ JSON.stringify(pageData)|striptags }};\n        window.CONFIG = {{ JSON.stringify(constant) }};\n        window.TRACEID = {{ JSON.stringify(traceId) }};</script><script>{% include "../../static/js/lib/tingyun-rum.js" raw ignore missing %}\n        {% include "../../static/js/lib/h5env_check.js" raw ignore missing %}\n        {% include "../../static/js/lib/lfq_channel.js" raw ignore missing %}</script>{% if pageData.checkLogin && global.config.site.env !== \'development\' %}<script>{% include "../../static/js/lib/checkLogin.js" raw ignore missing %}</script>{% endif %}<link href="{{constant.cdn}}/laifenqi/static/css/baitiao.css?v=f2b3738b0a665" rel=stylesheet></head><body>{% if pageData.isRem %}<script>{% include "../../static/js/lib/rem.js" raw ignore missing %}</script>{% endif %}<div id=app></div><script type=text/javascript src="{{constant.cdn}}/laifenqi/static/js/baitiao.js?v=74dad6879019a"></script></body><script>{% include "../../static/js/lib/antbridge.min.js" raw ignore missing %}</script>{% if pageData.__auth %}<script src=https://publicexprod.alipay.com/deliveraddress/selectAddress.js></script>{% endif %} {% if pageData.__upload %}<script src=//gosspublic.alicdn.com/aliyun-oss-sdk-4.10.1.min.js></script>{% endif %}<script>window.onload = function(){\n    {% include "../../static/js/lib/tongji_baidu.js" raw ignore missing %} \n    {% include "../../static/js/lib/baiqishi2.js" raw ignore missing %}\n    {% include "../../static/js/lib/tongdun.js" raw ignore missing %}\n    {% if pageData.shumei %}\n    {% include "../../static/js/lib/shumei.js" raw ignore missing %}\n    {% endif %}\n    {% include "../../static/js/common/zepto.min.js" raw ignore missing %}\n    {% include "../../static/js/lib/lfq_sensors.js" raw ignore missing %}\n    {% include "../../static/js/lib/new_commonSensor.js" raw ignore missing %}\n    {% include "../../static/js/lib/new_initLog.js" raw ignore missing %}\n    {% if pageData.__fastClick %}\n    {% include "../../static/js/lib/fastclick.min.js" raw ignore missing %}\n    ;Origami.fastclick(document.body);\n    {% endif %}\n    {% include "../../static/js/lib/checkImgError.js" raw ignore missing %}\n    {% if pageData.sendFingerprint %}\n    ;(function() {\n        function send (data) {\n            $.get(\n                \'/v2/aj/home/fingerprint\',\n                {\n                    device_id: \'welcome2qudian\',\n                    forever_id: data\n                }\n            );\n        }\n        setTimeout(function() {\n            var lfd = (localStorage && localStorage.getItem(\'lfd\')) || \'\';\n            if (lfd) {\n                send(lfd);\n            } else {\n                var ts = Math.random().toString();\n                var t = Date.now().toString();\n                lfd = [t, ts].join(\'.\');\n                try {\n                    localStorage.setItem(\'lfd\', lfd);\n                } catch (err) {}\n                send(lfd);\n            }\n        }, 600);\n    })();\n    {% endif %}\n    if (window.AlipayJSBridge) {\n        AlipayJSBridge.call("setTitleColor", {\n          color: 16775138,\n          reset: true //(可选,默认为false)  是否重置title颜色为默认颜色。\n        });\n    }\n    try {\n        if (window.localStorage) {\n            window.localStorage.removeItem(\'ACTSTORAGE\');\n            window.localStorage.removeItem(\'QDSTORAGE\');\n        }\n    } catch (e) {}\n}</script></html>';


'use strict';

function HtmlLocalStoragePlugin(options) {
  // {
  //   outputName: ['home.html', 'nav.html', 'baitiao.html']
  // }
  this.outputName = options.outputName || [];
}

HtmlLocalStoragePlugin.prototype.apply = function (compiler) {
  var self = this
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-html-processing', function (htmlPluginData, callback) {
      self.outputName.some(outputName => {
        if (htmlPluginData.outputName.indexOf(outputName) > -1) {
          self.replace(htmlPluginData)
          return false
        }
      })
      callback(null, htmlPluginData)
    })
  })
}


HtmlLocalStoragePlugin.prototype.replace = function (htmlPluginData) {
  // console.log(htmlPluginData);
  var html = str;
  // console.log(htmlPluginData)
  // 为什么能够找到这个js 和css 是因为 v
  var regJS = /<script type=text\/javascript src=".*\/js\/(.+\.js)\?v=([0-9a-z]+)"><\/script>/i
  var regCSS = /<link href=".*\/css\/(.+\.css)\?v=([0-9a-z]+)" rel=stylesheet>/i
  var matchJS = html.match(regJS)
  var matchCSS = html.match(regCSS)
  var sources = []
  if (matchCSS) {
    sources.push({
      type: 'css',
      name: matchCSS[1],
      version: matchCSS[2]
    })
  }
  if (matchJS) {
    sources.push({
      type: 'js',
      name: matchJS[1],
      version: matchJS[2]
    })
  }
  // console.log(name + ' ' + version)
  console.log(sources);
  var content = this.getScript(sources)
  console.log(content);
  // htmlPluginData.html = htmlPluginData.html.replace(regCSS, '').replace(regJS, content)
  // console.log(htmlPluginData.html);
}

HtmlLocalStoragePlugin.prototype.getScript = function (sources) {
  var params = ''
  sources.forEach(function (source) {
    params += '{type:"' + source.type + '",name:"' + source.name + '",version: "' + source.version + '"},'
  })
  var script = '<script>(function(e,t){var e=document,t=window,a;var n={KEY_CACHE:"_ibc",KEY_VERSION:"_v",KEY_CONTENT:"_c",comparable:undefined,sources:[],init:function(e){this.comparable=e.comparable;this.sources=e.sources;this.sources.forEach(function(e){this.load(e)}.bind(this))},load:function(n){var s,i,c,o=e.getElementsByTagName("body")[0];if(n.type==="js"){c=e.createElement("script");c.type="application/javascript"}else if(n.type==="css"){c=e.createElement("style")}try{a=a||JSON.parse(t.localStorage.getItem(this.KEY_CACHE));i=a&&a[n.name]&&a[n.name][this.KEY_VERSION]||"";if(i&&n.version===i){s=a[n.name][this.KEY_CONTENT];c.innerHTML=s;o.appendChild(c)}else{this.fetch(c,n,n)}}catch(r){this.fetch(c,n,n)}},fetch:function(a,n,s){var i=e.getElementsByTagName("body")[0];var c=new XMLHttpRequest;c.open("GET","{{constant.cdn}}/laifenqi/static/"+s.type+"/"+n.name+"?v="+n.version);c.onreadystatechange=function(){if(c.readyState===4&&(c.status>=200&&c.status<300||c.status===304)){try{var e=c.responseText;if(n.type==="js"){e+="\\n//# sourceURL="+n.name+"\\n"}a.innerHTML=e;i.appendChild(a);if(s.name){var o=JSON.parse(t.localStorage.getItem(this.KEY_CACHE))||{};var r=o[s.name]={};r[this.KEY_VERSION]=s.version;r[this.KEY_CONTENT]=e;t.localStorage.setItem(this.KEY_CACHE,JSON.stringify(o))}}catch(E){}}}.bind(this);c.send()}};t.Istanbul=n})(document,window);'
  script += 'Istanbul.init({sources:[' + params + ']})</script>'
  return script
}

// module.exports = HtmlLocalStoragePlugin
var date = new HtmlLocalStoragePlugin({outputName:'2'}).replace();
console.log(date);
