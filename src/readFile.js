export const readFile = (path, encoding) => {
  return new Promise((resolve, reject) => {
    const fs = wx.getFileSystemManager();
    fs.readFile({
      encoding,
      filePath: path,
      success: (info) => resolve(info.data),
      fail: reject,
    });
  });
};
