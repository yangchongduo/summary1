var i = 0;
function timedCount() {
  for (var j = 0, sum = 0; j < 100; j++) {
    for (var i = 0; i < 100000000; i++) {
      sum += i;
    };
  };
  //将得到的sum发送回主线程
  postMessage(sum);
};
//将执行timedCount前的时间，通过postMessage发送回主线程
postMessage('Before computing, ' + new Date());
timedCount();
//结束timedCount后，将结束时间发送回主线程
postMessage('After computing, ' + new Date());