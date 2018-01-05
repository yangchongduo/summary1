

function getCookie(name) {
  const arr = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`));
  return arr === null ? arr : unescape(arr[2]);
}

function setCookie(name, value, originOpt) {
  const opt = originOpt || {};

  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  const standard = { second, minute, hour, day, month, year };

  let time = 0;
  for (const key in standard) {
    time += standard[key] * (opt[key] || 0);
    delete opt[key];
  }

  const exp = new Date();

  // 设置cookie的过期时间，默认30天
  exp.setTime(exp.getTime() + (time || month));

  const cookieObj = Object.assign({
    expires: exp.toGMTString(),
    path: '/'
  }, opt);

  // 将cookie进行赋值操作
  let cookie = `${name}=${escape(value)}`;

  for (const key in cookieObj) {
    cookie += `;${key}=${cookieObj[key]}`;
  }
  document.cookie = cookie;
};



// 拆分数据，避免首屏加载数据过多
function initData(data, end) {
  const countData = {};
  const keysArr = Object.keys(data);

  for (let i = 0; i < end; i++) {
    let key = keysArr[i];
    countData[key] = data[key];
  }

  return countData;
}
// 补全柱状图
function completeArr(arr) {
  if (!arr) {
    return 0;
  }
  let len = arr.length;
  let num = 30 - arr.length;
  if (num) {
    for (let i = 0; i < num; i++) {
      let obj = {
        "archive_date": moment(arr[len - 1].archive_date).subtract((i + 1), 'days').format(),
        "finance_payable_amount": ""
      }
      arr.push(obj);
    }
    return arr;
  }
  return arr;
}
function completeArrU(arr) {
  if (!arr) {
    return
  }
  let len = arr.length;
  let num = 30 - len;
  if (num) {
    for (let i = 0; i < num; i++) {
      let obj = {
        'archive_date': moment(arr[len - 1].archive_date).subtract((i + 1), 'days').format(),
        'register_uv': "",
        'apply_credit_user-division-register_uv': '',
        'adopt_credit_user-division-apply_credit_user': '',
        'pay_uv-division-adopt_credit_user': ''
      }
      arr.push(obj);
    }
    return arr;
  }
  return arr;
}
// 计算差值
function raiseAndFall(newVal, oldVal) {
  let diff = parseFloat(newVal) - parseFloat(oldVal);

  if (isNaN(diff) || !isFinite(diff)) {
    return '';
  }
  if (diff) {
    if (/\%/.test(newVal)) {
      if (diff < 0) {
        return '<br><span class="text-red">' + toFixed(diff, 2) + '%' + '</span>';
      }
      return '<br><span class="text-green">' + '+' + toFixed(diff, 2) + '%' + '</span>';
    }
    else {
      if (diff < 0) {
        return '<br><span class="text-red">' + toFixed(diff, 2) + '</span>';
      }
      return '<br><span class="text-green">' + '+' + toFixed(diff, 2) + '</span>';
    }
  }
  return '<br><span>' + toFixed(diff, 2) + '</span>';
}
// 检测数组元素是否存在
function inArr(key, arr) {
  if (isArr(arr)) {
    for (let l = arr.length - 1; l >= 0; l--) {
      if (arr[l] === key) {
        return true
      }
    }
  }
  return false
}

// 检测数组
function isArr(arr) {
  if (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]' ? true : false;
  }
  return false
}

function orderArr(arr, prop) {
  if (isArr(arr)) {
    arr.sort((a, b) => {
      a = isUndefined(prop) ? a : parseFloat(a[prop]) ? parseFloat(a[prop]) : a[prop];
      b = isUndefined(prop) ? b : parseFloat(b[prop]) ? parseFloat(b[prop]) : b[prop];
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });
  }
}

// 转化为单位"万*"
function tenThousand(num) {
  let _num = parseFloat(num);
  if (/\%/.test(num)) {
    return num;
  }
  return isNaN(_num) ? num : parseFloat(num) / 10000;
}
thoundFormat
// 千分位分隔
function thoundFormat(num) {
  return num && num.toString().replace(/^\d+/, function (inter) {
    return inter.replace(/(?=(?!^)(\d{3})+$)/g, ',')
  });
}

// 保留小数位
function toFixed(num, de) {
  if (/\%/.test(num)) {
    return num;
  }
  if (!parseFloat(num) && num != 0) {
    return num;
  }
  if (Math.abs(num) >= 1) {
    return num && Number(num).toFixed(isUndefined(de) ? 1 : de)
  } else {
    return num && Number(num).toFixed(isUndefined(de) ? 2 : de)
  }
}

// 判断变量是否为undefuned
function isUndefined(attr) {
  return typeof attr === 'undefined'
}

// 判断变量是否为空对象
function isEmptyObject(obj) {
  let i;
  for (i in obj) {
    return false;
  }
  return true
}
function isMinus(num) {
  let _num = parseFloat(num);
  if (_num < 0 || isNaN(_num) || !isFinite(_num)) {
    return 0;
  } else {
    return num;
  }
}
// 千分位分隔&&保留小数
function numFormat(val, de) {
  let num = parseFloat(val);
  de = isUndefined(de) ? undefined : de;
  if (isNaN(num)) {
    return val
  } else {
    return (Math.abs(num) < 1 && Math.abs(num) > 0) ? thoundFormat(toFixed(num, isUndefined(de) ? 2 : de)) : thoundFormat(toFixed(num, isUndefined(de) ? 1 : de))
  }
}

// 小数转化百分数
function toPercent(num) {
  let _num = parseFloat(num) * 100;
  if (!isNaN(_num)) {
    if (!isFinite(_num)) {
      return 0;
    }
    return _num.toFixed(2);
  }
  return num
}

// 小数转化百分数&添加百分号‘％’
function toPercent1(num) {
  let _num = parseFloat(num) * 100;
  if (!isNaN(_num)) {
    if (!isFinite(_num)) {
      return 0
    }
    return _num.toFixed(2) + '%';
  }
  return num
}
// 环比
function toFixedRate(num, de) {
  if (/\%/.test(num)) {
    return changeSymbol(num);
  }
  if (!parseFloat(num)) {
    return num;
  }
  if (num >= 1) {
    return changeSymbol(num && Number(num).toFixed(isUndefined(de) ? 1 : de));
  } else {
    return changeSymbol(Number(num).toFixed(isUndefined(de) ? 2 : de));
  }
}

// 添加上下箭头
function toArrowFormat(num) {
  let _num = parseFloat(num);
  if (isNaN(_num)) {
    if (/\%/.test(num)) {
      return ''
    }
    return num
  } else {
    return '<span class="' + (_num < 0 ? 'text-red' : _num == 0 ? '' : 'text-green') + '">' + changeSymbol(num) + '</span>';
  }
}

//给环比添加颜色
function toChangeColor(num) {
  let _num = parseFloat(num);
  if (isNaN(_num) || _num == 0) {
    return '<span class="' + (num[0] == '↓' ? 'text-red' : num[0] == 0 ? '' : 'text-green') + '">' + num + '</span>';
  }
}

// 上升/下降
function changeSymbol(num) {
  let numArr = [];
  let _num = parseFloat(num);

  if (_num < 0) {
    numArr = num.split('-');
    return '↓' + numArr[1];
  } else if (_num == 0) {
    return num.replace('-', '');
  } else {
    return '↑' + num;
  }
}

// 显示图的日期
function readyDate(tablename, dataDateArr) {
  let length = tablename.length;
  let temp = 0;
  let redateArr = [];
  let time = new Date(Date.UTC(dataDateArr[0], dataDateArr[1] - 1, dataDateArr[2]));
  for (let i in tablename) {
    temp = time - i * 86400000;
    let date = new Date(temp),
      M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1) + '-',
      D = date.getDate() + ' ';
    if (!isNaN(length - 1 - i)) {
      redateArr[length - 1 - i] = M + D;
    }
  }
  return redateArr;
}

// 单位为万
function chartData(tablename) {
  let length = tablename.length;
  let yAxisData = [];
  for (let i in tablename) {
    if (!isNaN(i)) {
      yAxisData[i] = toFixed(tenThousand(tablename[i]), 1);
    }
  }
  return yAxisData;
}

// 不需要转化单位
function chartData1(tablename) {
  let length = tablename.length;
  let yAxisData = [];
  for (let i in tablename) {
    if (!isNaN(i)) {
      yAxisData[i] = toFixed(tablename[i], 2);
    }
  }
  return yAxisData;
}

// 计算环比
function toRate(newVal, oldVal) {
  let _new = parseFloat(newVal),
    _old = parseFloat(oldVal);
  if (_new != 0 && _old == 0) return 1;
  let rate = (_new - _old) / _old;
  if (newVal == '--' || newVal == 'N/A') {
    return newVal
  }
  if (newVal === '' || oldVal === '' || isUndefined(newVal) || isUndefined(oldVal)) {
    return ''
  }
  if (!isFinite(rate) || isNaN(rate)) {
    return 0
  }
  return rate
}

// 计算转化率
function toTransfer(partVal, totalVal) {
  let _new = parseFloat(partVal),
    _old = parseFloat(totalVal);

  let rate = _new / _old;
  if (partVal == '--' || partVal == 'N/A') {
    return partVal
  }
  if (totalVal == '--' || totalVal == 'N/A') {
    return totalVal
  }
  if (partVal === '' || totalVal === '' || isUndefined(partVal) || isUndefined(totalVal)) {
    return ''
  }
  if (!isFinite(rate) || isNaN(rate)) {
    return 0
  }
  return rate
}

// 添加单位
function addUnit(num, unit) {
  let _num = parseFloat(num);
  if (!isNaN(_num)) {
    return num + (unit || '')
  }
  return num
}

// 时间格式化 num 单位：秒
function duration(num) {
  let _num = parseFloat(num),
    hours = 0,
    minutes = 0,
    seconds = 0;

  if (isNaN(_num)) {
    return num
  }
  _num = moment.duration(_num, 'seconds');
  hours = _num.hours() < 10 ? '0' + _num.hours() : _num.hours();
  minutes = _num.minutes() < 10 ? '0' + _num.minutes() : _num.minutes();
  seconds = _num.seconds() < 10 ? '0' + _num.seconds() : _num.seconds();
  return hours + ':' + minutes + ':' + seconds
}


/**
 * 动态显示数值
 * @param option.starNum Number 起始数值
 * @param option.endNum Number 结束数值
 * @param option.duration Number 动画时间
 * @param option.decimals Number 保留小数位数
 * @param option.callback Fn 每帧动画回调
 * @param option.finalback Fn 结束动画回调
 * @returns Number
 */
function transitionNum(option) {
  let startNum = option.startNum || 0,
    endNum = option.endNum || 0,
    duration = option.duration || 1000,
    decimals = option.decimals || 0,
    dec = Math.pow(10, decimals),
    callback = option.callback || function () { },
    finalback = option.finalback || function () { },
    startTime = 0,
    lastTime = 0;
  if (isNaN(startNum) || !isFinite(startNum) || isNaN(endNum) || !isFinite(endNum)) {
    return
  } else if (startNum == endNum) {
    callback(endNum);
    finalback(endNum);
    return
  } else {
    requestAnimation(count);
  }

  function requestAnimation(fn) {
    let currTime = new Date().getTime();
    let timeToCall = Math.max(0, 16 - (currTime - lastTime));

    let id = setTimeout(function () {
      fn(currTime + timeToCall)
    }, timeToCall);

    lastTime = currTime + timeToCall;
    return id
  }

  function count(timestamp) {
    let _endNum = 0;
    if (!startTime) {
      startTime = timestamp;
    }

    let progress = timestamp - startTime;
    if (startNum < endNum) {
      _endNum = easeOutExpo(progress, startNum, endNum - startNum, duration);
      _endNum = _endNum > endNum ? endNum : _endNum;
    } else {
      _endNum = easeOutExpo(progress, 0, startNum - endNum, duration);
      _endNum = _endNum < endNum ? endNum : _endNum;
    }

    if (progress < duration) {
      callback(Math.round(_endNum * dec) / dec);
      requestAnimation(count);
    } else {
      finalback(endNum);
    }
  }
}

/**
 * easeOutExpo
 * @param  {[number]} t [current time]
 * @param  {[number]} b [begin value]
 * @param  {[number]} c [change value]
 * @param  {[number]} d [duration]
 * @return {[number]}
 */
function easeOutExpo(t, b, c, d) {
  return c * (-Math.pow(2, -10 * t / d) + 1) + b;
}

/**
 * 日期格式化，如：new Date().format('yyyy-MM-dd HH:mm:ss')
 * @param mask
 * @returns {*}
 */
Date.prototype.format = function (mask) {
  let d = this;
  let zeroize = function (value, length) {
    if (!length) length = 2;
    value = String(value);
    let i = 0, zeros = '';
    for (; i < (length - value.length); i++) {
      zeros += '0';
    }
    return zeros + value;
  };

  return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
    switch ($0) {
      case 'd': return d.getDate();
      case 'dd': return zeroize(d.getDate());
      case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
      case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
      case 'M': return d.getMonth() + 1;
      case 'MM': return zeroize(d.getMonth() + 1);
      case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
      case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
      case 'yy': return String(d.getFullYear()).substr(2);
      case 'yyyy': return d.getFullYear();
      case 'h': return d.getHours() % 12 || 12;
      case 'hh': return zeroize(d.getHours() % 12 || 12);
      case 'H': return d.getHours();
      case 'HH': return zeroize(d.getHours());
      case 'm': return d.getMinutes();
      case 'mm': return zeroize(d.getMinutes());
      case 's': return d.getSeconds();
      case 'ss': return zeroize(d.getSeconds());
      case 'l': return zeroize(d.getMilliseconds(), 3);
      case 'L': let m = d.getMilliseconds();
        if (m > 99) m = Math.round(m / 10);
        return zeroize(m);
      case 'tt': return d.getHours() < 12 ? 'am' : 'pm';
      case 'TT': return d.getHours() < 12 ? 'AM' : 'PM';
      case 'Z': return d.toUTCString().match(/[A-Z]+$/);
      // Return quoted strings with the surrounding quotes removed
      default: return $0.substr(1, $0.length - 2);
    }
  });

};
