const navigator = {
  language: 'zh-CN',
  appVersion: '5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/603.1.30 (KHTML, like Gecko) Safari/603.1.30',
  userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/603.1.30 (KHTML, like Gecko) Safari/603.1.30',
  onLine: true,
};

if (wx.onNetworkStatusChange) {
  wx.onNetworkStatusChange(function (event) {
    navigator.onLine = event.isConnected;
  });
}
export default navigator;
