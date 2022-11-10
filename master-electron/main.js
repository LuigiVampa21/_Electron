// Modules
const electron = require("electron");
const {
  app,
  BrowserWindow,
  session,
  dialog,
  globalShortcut,
  Menu,
  Tray,
  screen,
} = electron;

const mainMenu = require("./mainMenu");
const contextMenu = require("./contextMenu");
const trayMenu = require("./trayMenu");
const windowStateKeeper = require("electron-window-state");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, tray;
// let secondaryWindow;

function createTray() {
  tray = new Tray("images/dollar.icon.jpg");
  tray.setToolTip("Tray details");

  tray.on("click", e => {
    if (e.shiftKey) {
      app.quit();
    } else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });

  tray.setContextMenu(trayMenu);
}

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  let displays = screen.getAllDisplays();
  console.log(`${displays[0].size.width} x ${displays[0].size.height}`);

  let primaryDisplay = screen.getPrimaryDisplay();

  screen.on("display-metrics-changed", (e, display, metricsChanged) => {
    console.log(metricsChanged);
  });

  setInterval(() => {
    console.log(screen.getCursorScreenPoint());
  }, 1000);

  // Window State manager
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800,
  });

  mainWindow = new BrowserWindow({
    backgroundColor: "#2B2E3B",
    width: mainWindowState.defaultWidth,
    height: mainWindowState.defaultHeight,
    minWidth: 600,
    minHeight: 300,
    // x: mainWindowState.x,
    // y: mainWindowState.y,
    x: primaryDisplay.bounds.x,
    y: primaryDisplay.bounds.y,
    // frame: true,
    // titleBarStyle: "hidden",
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  Menu.setApplicationMenu(mainMenu);

  mainWindow.webContents.on("context-menu", e => {
    contextMenu.popup();
  });

  let ses = session.defaultSession;

  electron.powerMonitor.on("resume", e => {
    if (!mainWindow) {
      createWindow();
    }
  });

  electron.powerMonitor.on("suspend", e => {
    console.log("Save data");
  });

  // ----------------------------------------------------------- COOKIES -------------------------------------------------------------

  // const getCookies = async () => {
  //   try {
  //     const cookies = await ses.cookies.get({});
  //     console.log(cookies);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // ----------------------------------------------------------- USE URL -------------------------------------------------------------

  // let wc = mainWindow.webContents;
  // wc.on("did-finish-load", () => {
  //   console.log("content fully loaded!");
  // });
  // wc.on("new-window", (e, url) => {
  //   console.log(`Creating new window for: ${url}`);
  // });

  // ----------------------------------------------------------- USE 2 WINDOWS -------------------------------------------------------------

  // secondaryWindow = new BrowserWindow({
  //   backgroundColor: "#2B2E3B",
  //   width: 600,
  //   height: 300,
  //   webPreferences: {
  //     // --- !! IMPORTANT !! ---
  //     // Disable 'contextIsolation' to allow 'nodeIntegration'
  //     // 'contextIsolation' defaults to "true" as from Electron v12
  //     contextIsolation: false,
  //     nodeIntegration: true,
  //   },
  //   parent: mainWindow,
  //   modal: true,
  // });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // mainWindow.loadURL("https://github.com");
  // secondaryWindow.loadFile("index.secondary.html");

  // ----------------------------------------------------------- DOWNLOAD FILE -------------------------------------------------------------

  // ses.on("will-download", (e, item, webContents) => {
  //   console.log(item.getFilename(), item.getTotalBytes());
  //   item.setSavePath(app.getPath("desktop") + "/" + item.getFilename());

  //   item.on("updated", (e, state) => {
  //     let received = item.getReceivedBytes();
  //     if (state === "progressing" && received) {
  //       let progress = Math.round((received / item.getTotalBytes()) * 100);
  //       webContents.executeJavaScript(`window.progress.value = ${progress}`);
  //     }
  //   });
  // });

  mainWindow.webContents.on("did-finish-load", () => {
    createTray();
  });

  // ----------------------------------------------------------- DROP FILE -------------------------------------------------------------

  // mainWindow.webContents.on("did-finish-load", async () => {
  // try {
  //   const result = await dialog.showOpenDialog(mainWindow, {
  //     buttonLabel: "Select a photo",
  //     defaultPath: app.getPath("home"),
  //     properties: [
  //       "multiSelections",
  //       "createDirectory",
  //       "openFile",
  //       "openDirectory",
  //     ],
  //   });
  //   console.log(result);
  // } catch (err) {
  //   console.log(err);
  // }
  // try {
  //   const result = await dialog.showSaveDialog({});
  // } catch (err) {
  //   console.error(err);
  // }
  //   const answers = ["Yes", "No", "Maybe"];
  //   try {
  //     const result = await dialog.showMessageBox({
  //       title: "Message Box",
  //       message: "Please select an option",
  //       detail: "messages details",
  //       buttons: answers,
  //     });
  //     console.log(result);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });
  // globalShortcut.register("G", () => {
  //   console.log("G");
  //   globalShortcut.unregister("G");
  // });

  // Open DevTools - Remove for PRODUCTION!

  // ----------------------------------------------------------- OPEN W/ DEVTOOLS -----------------------------------------------------------

  // mainWindow.webContents.openDevTools();

  // let cookie = {
  //   url: "https://myappdomain.com",
  //   name: "cookie1",
  //   value: "electron",
  //   expirationDate: 1700000000,
  // };

  // ----------------------------------------------------------- COOKIES -------------------------------------------------------------

  // mainWindow.webContents.on("did-finish-load", () => {
  //   ses.cookies
  //     .set(cookie)
  //     .then(() => {
  //       // ses.cookies.remove();
  //       session.defaultSession.clearStorageData();
  //       getCookies();
  //     })
  //     .catch(err => console.error(err));
  // });

  // mainWindowState.manage(mainWindow);

  // ----------------------------------------------------------- LOGIN -------------------------------------------------------------

  // wc.on("login", (e, request, authInfo, cb) => {
  //   console.log("login");
  //   cb("user", "passwd");
  // });

  // wc.on("context-menu", (e, params) => {
  //   let selectedText = params.selectionText;
  //   wc.executeJavaScript(`alert("${selectedText}")`);
  // });

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // secondaryWindow.on("closed", () => {
  //   secondaryWindow = null;
  // });
}

// Electron `app` is ready
app.on("ready", createWindow);

// Electron `app` is on focus
// app.on("browser-window-focus", () => {
//   console.log("App focused");
// });

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
