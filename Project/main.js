const { app, BrowserWindow } = require("electron");
// window State package
const windowStateKeeper = require("electron-window-state");

let mainWindow;

function createWindow() {
  // Window State Config
  let state = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 650,
  });

  mainWindow = new BrowserWindow({
    // Set Persisted State
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 350,
    maxWidth: 650,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Manage mainWindow
  state.manage(mainWindow);

  mainWindow.loadFile("renderer/main.html");

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
