(function (window) {
  // 如果不存在 performance.timing 就直接返回
  if (!window.performance || !window.performance.timing) {
    return;
  }

  // 50/100 的概率可以进行统计
  if (Math.random() * 100 > 50) {
    return;
  }

  if (window.addEventListener) {

    window.addEventListener('load', function () {

      setTimeout(function () {

        analyseTiming();

      }, 0);

    }, false);

  } else if (window.attachEvent) {

    window.attachEvent('onload', function () {

      setTimeout(function () {

        analyseTiming();

      }, 0);

    });

  }

  function analyseTiming() {

    var timinhObj = performance.timing;

    //向服务器要发送的数据
    var data = {

      //domain
      domain: function () {
        return window.location.hostname;
      },

      //current url
      urlname: function () {
        return window.location.pathname;
      },

      /**
       * Total Page Load time
       * 页面加载耗时
       * loadEventEnd:文档load结束的时间。如果load事件没有触发，那么该接口就返回0 ,文档包含所有的内容  图片 
       * navigationStart:当前浏览器窗口的前一个网页关闭，发生unload事件时的Unix毫秒时间戳。如果没有前一个网页，则等于fetchStart属性
       * fetchStart:如果一个新的资源获取被发起，则fetchStart必须返回用户代理开始检查其相关缓存的那个时间，其他情况则返回开始获取该资源的时间
       */
      pageloadtime: function () {
        // 
        return (timinhObj.loadEventEnd - timinhObj.navigationStart);
      },

      /**
       * app Cache time
       * DNS 缓存时间
       * domainLookupStart:返回用户代理对当前文档所属域进行DNS查询开始的时间。如果此请求没有DNS查询过程，如长连接，资源cache,甚至是本地资源等。 那么就返回 fetchStart的值
       * fetchStart:如果一个新的资源获取被发起，则fetchStart必须返回用户代理开始检查其相关缓存的那个时间，其他情况则返回开始获取该资源的时间
       */
      appCache: function () {
        return (timinhObj.domainLookupStart - timinhObj.fetchStart);
      },

      /**
       * DNS time
       * DNS 查询时间
       * domainLookupEnd:DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
       * domainLookupStart:DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
       */
      dnstime: function () {
        return (timinhObj.domainLookupEnd - timinhObj.domainLookupStart);
      },

      /**
       * TCP time
       * TCP 建立连接完成握手的时间
       * connectEnd:HTTP（TCP）完成建立连接的时间（完成握手），如果是持久连接，则与fetchStart值相等
       * connectStart:HTTP（TCP）开始建立连接的时间，如果是持久连接，则与fetchStart值相等
       */
      tcptime: function () {
        return (timinhObj.connectEnd - timinhObj.connectStart);
      },

      /**
       * request time  后端代码处理的时间
       * 请求开始到结束的时间
       * responseStart:开始接收响应的时间（获取到第一个字节），包括从本地读取缓存
       * requestStart: HTTP 请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存
       */
      requestime: function () {
        return (timinhObj.responseStart - timinhObj.requestStart);
      },

      /**
       * response time  
       * 响应时间
       * responseEnd:HTTP 响应全部接收完成的时间（获取到最后一个字节），包括从本地读取缓存
       * responseStart:开始接收响应的时间（获取到第一个字节），包括从本地读取缓存
       */
      responsetime: function () {
        return (timinhObj.responseEnd - timinhObj.responseStart);
      },

      /**
       * DOM time
       * 解析DOM树的时间
       * domComplete: DOM树解析完成，且资源也准备就绪的时间
       * domLoading:开始解析渲染DOM树的时间，此时Document.readyState变为loading，并将抛出readystatechange相关事件
       */
      domtime: function () {
        return (timinhObj.domComplete - timinhObj.domLoading);
      },
      /**
       * onLoad time
       * 执行 onload 回调函数的时间
       * loadEventEnd:load 事件的回调函数执行完毕的时间
       * loadEventStart:load 事件发送给文档，也即 load 回调函数开始执行的时间,注意如果没有绑定 load 事件，值为 0
       */
      loadtime: function () {
        return (timinhObj.loadEventEnd - timinhObj.loadEventStart);
      },

      /**
       * firstscreen time
       * 首屏的时间
       * firstscreenImgTime:首屏中，所有图片加载完成的时间
       * domLoading:开始解析渲染DOM树的时间，此时Document.readyState变为loading，并将抛出readystatechange相关事件
       */
      firstscreentime: function () {
        if (!window.performance.getEntries) {
          return -1;
        }
        var entries = window.performance.getEntries();
        var len = entries.length;
        var firstscreenImgTime = timinhObj.domLoading;
        for (var j = 0; j < len; j++) {
          var timeend = window.performance.timing.navigationStart + entries[j].responseEnd;
          timeend = parseInt(timeend);
          //?firstscreen
          if (entries[j].name.indexOf('firstscreen') > -1 && timeend > firstscreenImgTime) {
            firstscreenImgTime = timeend;
          }
        }
        var firstscreenTime = firstscreenImgTime - timinhObj.domLoading;
        return (firstscreenTime);
      },
      /**
       * firstpaint time
       * 白屏的时间
       * domLoading:开始解析渲染DOM树的时间，此时Document.readyState变为loading，并将抛出readystatechange相关事件
       * navigationStart:当前浏览器窗口的前一个网页关闭，发生unload事件时的Unix毫秒时间戳。如果没有前一个网页，则等于fetchStart属性
       */
      firstpainttime: function () {
        return (timinhObj.domLoading - timinhObj.navigationStart);
      }
    }

    if (data['pageloadtime']() > 9000) { return; }

    var config = {
      pid: 2,
      type: 2,
      mod: 'fe_performance',
      val: '', // 统计值
      t: Date.now()
    }

    for (var item in data) {
      config.val += item + ':' + data[item]() + ',';
    }

    //发送请求
    sendRequest(config);

  }


  function sendRequest(data) {
    var distUrl = 'url'

    for (var item in data) {
      distUrl += item + '=' + encodeURIComponent(data[item]) + '&'
    }

    new Image().src = distUrl;

  }

})(window)

// 所有的时间
var data = {
  page_domain: function () {
    return window.location.hostname;
  },
  page_url: function () {
    return window.location.pathname;
  },
  hostname: function () {
    return window.CONSTANT.hostname || '';
  },
  // ======================== net time ========================
  time_net_redirect: function () {
    return (_t.redirectEnd - _t.redirectStart);
  },
  // dns解析的时间
  time_net_dns: function () {
    return (_t.domainLookupEnd - _t.domainLookupStart);
  },
  time_net_tcp: function () {
    // 建立tcp 连接的时间
    return (_t.connectEnd - _t.connectStart);
  },
  time_net_request: function () {
    // 后端处理的时间 纯后端处理的时间
    return (_t.responseStart - _t.requestStart);
  },
  time_net_response: function () {
    // 真个文档内容下载时候
    return (_t.responseEnd - _t.responseStart);
  },
  time_net_processing: function () {
    return (_t.loadEventStart - _t.responseEnd);
  },
  // ======================== app time ========================
  time_app_unload: function () {
    return (_t.unloadEventEnd - _t.unloadEventStart);
  },
  time_app_cache: function () {
    return (_t.domainLookupStart - _t.fetchStart);
  },
  time_app_ttfb: function () {
    // 建立dns 解析时间 tcp 
    return (_t.responseStart - _t.fetchStart);
  },
  time_app_onload: function () {
    // load 执行的时间
    return (_t.loadEventEnd - _t.loadEventStart);
  },
  // ======================== dom time ========================
  time_dom_loading: function () {
    return (_t.domLoading - _t.fetchStart);
  },
  time_dom_ready: function () {
    return (_t.domInteractive - _t.domLoading);
  },
  time_dom_contentLoading: function () {
    return (_t.domContentLoadedEventStart - _t.domInteractive);
  },
  time_dom_complied: function () {
    return (_t.domContentLoadedEventEnd - _t.domContentLoadedEventStart);
  },
  time_dom_loaded: function () {
    return (_t.domComplete - _t.domContentLoadedEventEnd);
  },
  time_dom_complete: function () {
    return (_t.domComplete - _t.domLoading);
  },
  // ======================== page time ========================

  time_page_loaded: function () {
    // load时间里面所有的东西全部ok
    return (_t.loadEventEnd - _t.fetchStart);
  },
  time_page_paint: function () {
    return (_t.domInteractive - _t.fetchStart);
  }
}


  (() => {
    var data = {
      '页面完全加载平均耗时(ms)': 'time_page_loaded ',
      "DOM渲染平均耗时(ms)": "time_dom_contentLoading + time_dom_complied",
      // 整个文档的下载时间
      "首字节获取平均耗时(ms)": "time_net_response",
      "Request处理平均耗时(ms)": "time_net_request",
      "白屏的时间": "",
      "页面停留的时间":'',
      // 上个页面的fetchStart; 种植cookie  这个页面的 unloadEventEnd 相见即可。
    }
  })()
