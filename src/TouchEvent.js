import document from './document';
import { noop } from './util';
import { canvas } from './canvas';

class TouchEvent {
  preventDefault = noop;
  stopPropagation = noop;
  target = canvas;
  currentTarget = canvas;

  constructor(type) {
    this.type = type;
  }
}

function factory(type) {
  return (ev) => {
    const touchEvent = new TouchEvent(type);
    touchEvent.touches = touchEvent.targetTouches = ev.touches;
    touchEvent.changedTouches = ev.changedTouches;
    touchEvent.timeStamp = ev.timeStamp;
    document.dispatch(touchEvent);
  };
}

function factoryWheel(type) {
  return (ev) => {
    const touchEvent = new TouchEvent(type);
    touchEvent.deltaX = ev.deltaX;
    touchEvent.deltaY = ev.deltaY;
    touchEvent.deltaZ = ev.deltaZ;
    touchEvent.timeStamp = ev.timeStamp;
    touchEvent.x = ev.x;
    touchEvent.y = ev.y;
    document.dispatch(touchEvent);
  };
}

wx.onTouchStart(factory('touchstart'));
wx.onTouchMove(factory('touchmove'));
wx.onTouchEnd(factory('touchend'));
wx.onTouchCancel(factory('touchcancel'));
wx.onWheel(factoryWheel('mousewheel'));

export default TouchEvent;
