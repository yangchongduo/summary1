function Events() {
  this._events = {}
}
Events.prototype.on = function (eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName].push(callback)
  } else {
    this._events[eventName] = [callback]
  }

}
Events.prototype.emit = function (eventName) {
  // 这点好像没什么用发送其他参数的时候有用
  var args = Array.prototype.slice.call(arguments, 1)
  var that = this
  var cur = this._events[eventName]
  if (cur) {
    cur.forEach((item) => {
      // console.log(args)
      item.apply(that, args)
    })
  }
}
Events.prototype.remove = function (eventName, callback) {
  this._events[eventName] = this._events[eventName].filter((item) => {
    return item != callback
  })
}
function onceWrapper(...args) {
  if (!this.fired) {
    this.target.remove(this.type, this.wrapFn);
    this.fired = true;
    Reflect.apply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target, type, listener };
  var wrapped = onceWrapper.bind(state);
  // wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

Events.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    const errors = lazyErrors();
    throw new errors.TypeError('ERR_INVALID_ARG_TYPE', 'listener', 'Function');
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

function cry() {
  console.log('cry')
}
function money() {
  console.log('moeny')
}
var girl = new Events()
girl.on('girl', cry)
girl.once('girl', money)
//订阅完成之后就发布
girl.emit('girl')
// girl.remove('girl', money)
girl.emit('girl')





