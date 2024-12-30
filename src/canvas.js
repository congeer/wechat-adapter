function Canvas() {
  const canvas = wx.createCanvas();
  canvas.style = { cursor: null };
  try {
    canvas.__proto__.parentElement = true;
    canvas.__proto__.isConnected = true;
  } catch (err) {}

  canvas.getBoundingClientRect = () => {
    const systemInfo = wx.getSystemInfoSync();
    return {
      top: 0,
      left: 0,
      width: systemInfo.screenWidth,
      height: systemInfo.screenHeight,
    };
  };
  return canvas;
}

const canvas = new Canvas();

export { canvas, Canvas };
