import * as _window from './window';

if (!GameGlobal.__isAdapterInjected) {
  const { platform } = wx.getSystemInfoSync();
  GameGlobal.__isAdapterInjected = true;
  if (platform === 'devtools') {
    for (const key in _window) {
      const descriptor = Object.getOwnPropertyDescriptor(window, key);

      if (!descriptor || descriptor.configurable === true) {
        Object.defineProperty(window, key, {
          value: _window[key],
        });
      }
    }

    for (const key in _window.document) {
      const desc = Object.getOwnPropertyDescriptor(window.document, key);
      if (!desc || desc.configurable) {
        Object.defineProperty(window.document, key, { value: _window.document[key] });
      }
    }

    window.parent = window;
  } else {
    for (const key in _window) {
      GameGlobal[key] = _window[key];
    }
    GameGlobal.self = GameGlobal.window = GameGlobal.top = GameGlobal.parent = GameGlobal;
  }
}
