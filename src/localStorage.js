const localStorage = {
  get length() {
    const { keys } = wx.getStorageInfoSync();
    return keys.length;
  },

  key(n) {
    const { keys } = wx.getStorageInfoSync();
    return keys[n];
  },

  getItem(key) {
    const value = wx.getStorageSync(key);
    return value === '' ? null : value;
  },

  setItem(key, value) {
    if (GameGlobal.asyncStorage) {
      return wx.setStorage({
        key: key,
        data: value,
      });
    }
    return wx.setStorageSync(key, value);
  },

  removeItem(key) {
    if (GameGlobal.asyncStorage) {
      return wx.removeStorage({
        key: key,
      });
    }
    return wx.removeStorageSync(key);
  },

  clear() {
    if (GameGlobal.asyncStorage) {
      return wx.clearStorage();
    }
    return wx.clearStorageSync();
  },
};

export default localStorage;
