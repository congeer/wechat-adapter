import { Canvas } from './canvas';
import Image from './image';
import { Element } from './element';
import Audio from './audio';
import Video from './video';

const stack = {};

export default {
  body: new Element('body'),

  baseURI: '',
  baseURL: '',

  addEventListener(type, handle) {
    stack[type] = stack[type] || [];
    stack[type].push(handle);
  },

  removeEventListener(type, handle) {
    if (stack[type] && stack[type].length) {
      const i = stack[type].indexOf(handle);
      i !== -1 && stack[type].splice(i);
    }
  },

  dispatch(ev) {
    const queue = stack[ev.type];
    queue && queue.forEach((handle) => handle(ev));
  },

  createElement(tag) {
    switch (tag) {
      case 'canvas': {
        const canvas = new Canvas();
        canvas.addEventListener = this.addEventListener;
        canvas.removeEventListener = this.removeEventListener;
        return canvas;
      }

      case 'img': {
        return new Image();
      }

      case 'audio': {
        return new Audio();
      }

      case 'video': {
        return new Video();
      }

      default: {
        return new Element(tag);
      }
    }
  },
};
