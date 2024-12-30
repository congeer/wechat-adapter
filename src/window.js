import performance from './performance';
import Image from './image';
import { canvas, Canvas } from './canvas';
import { noop } from './util';
import document from './document';
import location from './location';
import WebSocket from './WebSocket';
import navigator from './navigator';
import TouchEvent from './TouchEvent';
import XMLDocument from './XMLDocument';
import localStorage from './localStorage';
import XMLHttpRequest from './XMLHttpRequest';
import { Element, HTMLCanvasElement, HTMLImageElement, HTMLVideoElement } from './element';
import Audio from './audio';
import fetchFunc from './fetch';

const { screenWidth, screenHeight, pixelRatio } = wx.getSystemInfoSync();

const createCanvas = () => {
  let c = new Canvas();
  c.addEventListener = document.addEventListener;
  c.removeEventListener = document.removeEventListener;
  return c;
};

canvas.addEventListener = document.addEventListener;
canvas.removeEventListener = document.removeEventListener;

const fetch = fetchFunc();
const screen = {
  width: screenWidth,
  height: screenHeight,
};
const Intl = GameGlobal.Intl || {};
const WebGLRenderingContext = GameGlobal.WebGLRenderingContext || {};
const _performance = GameGlobal.performance || performance;
const addEventListener = document.addEventListener;
const removeEventListener = document.removeEventListener;
const ontouchstart = noop;

export {
  Intl,
  WebGLRenderingContext,
  _performance as performance,
  fetch,
  Image,
  canvas,
  createCanvas as Canvas,
  addEventListener,
  removeEventListener,
  ontouchstart,
  document,
  location,
  WebSocket,
  navigator,
  TouchEvent,
  localStorage,
  XMLDocument,
  XMLHttpRequest,
  Element,
  Element as HTMLElement,
  HTMLVideoElement,
  HTMLCanvasElement,
  HTMLImageElement,
  Audio as HTMLAudioElement,
  Audio,
  Audio as OfflineAudioContext,
  screenWidth as innerWidth,
  screenHeight as innerHeight,
  pixelRatio as devicePixelRatio,
  screen,
};
