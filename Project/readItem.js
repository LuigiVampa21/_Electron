const { BrowserWindow } = require("electron");

let offscreenWindow;

module.exports = (url, cb) => {
  // Create offscreenWindow
  offscreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true,
    },
  });

  // Load Item URL
  offscreenWindow.loadURL(url);

  offscreenWindow.webContents.on("did-finish-load", () => {
    const title = offscreenWindow.getTitle();

    // Get screenShot
    offscreenWindow.webContents.capturePage().then(img => {
      const screenshot = img.toDataURL();

      // Execute callback
      cb({ title, screenshot, url });

      //   clean Window
      offscreenWindow.close();
      offscreenWindow = null;
    });
  });
};
