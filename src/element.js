import { canvas } from './canvas';
import EventTarget from './EventTarget';

export class Element extends EventTarget {
  style = { cursor: null };

  constructor(tag) {
    super();
  }

  appendChild() {}

  removeChild() {}
}

export const HTMLCanvasElement = canvas.constructor;

export class HTMLImageElement extends wx.createImage().constructor {}

export class HTMLVideoElement extends Element {}
