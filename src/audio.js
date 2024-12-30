import { Element } from './element';

const _innerAudioContext = new WeakMap();

export default class Audio extends Element {
  readyState = Audio.HAVE_NOTHING;

  constructor(url) {
    super();

    this.readyState = Audio.HAVE_NOTHING;

    const innerAudioContext = wx.createInnerAudioContext();
    _innerAudioContext[this] = innerAudioContext;

    this._canplayEvents = ['load', 'loadend', 'canplay', 'canplaythrough', 'loadedmetadata'];

    innerAudioContext.onCanplay(() => {
      this._loaded = true;
      this._canplayEvents.forEach((type) => {
        this.dispatchEvent({ type: type });
      });
      this.readyState = Audio.HAVE_CURRENT_DATA;
    });
    innerAudioContext.onPlay(() => {
      this._paused = _innerAudioContext[this].paused;
      this.dispatchEvent({ type: 'play' });
    });
    innerAudioContext.onPause(() => {
      this._paused = _innerAudioContext[this].paused;
      this.dispatchEvent({ type: 'pause' });
    });
    innerAudioContext.onEnded(() => {
      this._paused = _innerAudioContext[this].paused;
      if (_innerAudioContext[this].loop === false) {
        this.dispatchEvent({ type: 'ended' });
      }
      this.readyState = Audio.HAVE_ENOUGH_DATA;
    });
    innerAudioContext.onError(() => {
      this._paused = _innerAudioContext[this].paused;
      this.dispatchEvent({ type: 'error' });
    });

    if (url) {
      this.src = url;
    } else {
      this._src = '';
    }

    this._loop = innerAudioContext.loop;
    this._autoplay = innerAudioContext.autoplay;
    this._paused = innerAudioContext.paused;
    this._volume = innerAudioContext.volume;
    this._muted = false;
  }

  addEventListener(type, listener, options = {}) {
    type = String(type).toLowerCase();

    super.addEventListener(type, listener, options);

    if (this._loaded && this._canplayEvents.indexOf(type) !== -1) {
      this.dispatchEvent({ type: type });
    }
  }

  load() {
    // console.warn('HTMLAudioElement.load() is not implemented.')
    // weixin doesn't need call load() manually
  }

  play() {
    _innerAudioContext[this].play();
  }

  resume() {
    _innerAudioContext[this].resume();
  }

  pause() {
    _innerAudioContext[this].pause();
  }

  destroy() {
    _innerAudioContext[this].destroy();
  }

  canPlayType(mediaType = '') {
    if (typeof mediaType !== 'string') {
      return '';
    }

    if (mediaType.indexOf('audio/mpeg') > -1 || mediaType.indexOf('audio/mp4')) {
      return 'probably';
    }
    return '';
  }

  get currentTime() {
    return _innerAudioContext[this].currentTime;
  }

  set currentTime(value) {
    _innerAudioContext[this].seek(value);
  }

  get duration() {
    return _innerAudioContext[this].duration;
  }

  get src() {
    return this._src;
  }

  set src(value) {
    this._src = value;
    this._loaded = false;
    this.readyState = Audio.HAVE_NOTHING;

    const innerAudioContext = _innerAudioContext[this];

    innerAudioContext.src = value;
  }

  get loop() {
    return this._loop;
  }

  set loop(value) {
    this._loop = value;
    _innerAudioContext[this].loop = value;
  }

  get autoplay() {
    return this._autoplay;
  }

  set autoplay(value) {
    this._autoplay = value;
    _innerAudioContext[this].autoplay = value;
  }

  get paused() {
    return this._paused;
  }

  get volume() {
    return this._volume;
  }

  set volume(value) {
    this._volume = value;
    if (!this._muted) {
      _innerAudioContext[this].volume = value;
    }
  }

  get muted() {
    return this._muted;
  }

  set muted(value) {
    this._muted = value;
    if (value) {
      _innerAudioContext[this].volume = 0;
    } else {
      _innerAudioContext[this].volume = this._volume;
    }
  }

  cloneNode() {
    const newAudio = new Audio();
    newAudio.loop = this.loop;
    newAudio.autoplay = this.autoplay;
    newAudio.src = this.src;
    return newAudio;
  }
}

Audio.HAVE_NOTHING = 0;
Audio.HAVE_METADATA = 1;
Audio.HAVE_CURRENT_DATA = 2;
Audio.HAVE_FUTURE_DATA = 3;
Audio.HAVE_ENOUGH_DATA = 4;
