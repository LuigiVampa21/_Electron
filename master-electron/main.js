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
  ipcMain,
} = electron;

const mainMenu = require("./mainMenu");
const contextMenu = require("./contextMenu");
const trayMenu = require("./trayMenu");
const windowStateKeeper = require("electron-window-state");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const askFruit = async () => {
  let fruits = ["Apple", "Orange", "Grape"];

  let choice = await dialog.showMessageBox({
    message: "Pick a fruit:",
    buttons: fruits,
  });

  return fruits[choice.response];
};

ipcMain.on("ask-fruit", async e => {
  try {
    const fruit = await askFruit();
    await e.reply("answer-fruit", fruit);
  } catch (err) {
    console.error(err);
  }
});

// let tray;
// let secondaryWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
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
    // x: primaryDisplay.bounds.x,
    // y: primaryDisplay.bounds.y,
    // frame: true,
    // titleBarStyle: "hidden",
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: false,
    },
  });

  Menu.setApplicationMenu(mainMenu);

  // mainWindow.webContents.on("did-finish-load", async () => {
  //   try {
  //     const fruit = await askFruit();
  //     console.log(fruit);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });

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

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // mainWindow.loadURL("https://github.com");
  // secondaryWindow.loadFile("index.secondary.html");

  // ----------------------------------------------------------- OPEN W/ DEVTOOLS -----------------------------------------------------------

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

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

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

// ----------------------------------------------------------- LOGIN -------------------------------------------------------------

// wc.on("login", (e, request, authInfo, cb) => {
//   console.log("login");
//   cb("user", "passwd");
// });

// wc.on("context-menu", (e, params) => {
//   let selectedText = params.selectionText;
//   wc.executeJavaScript(`alert("${selectedText}")`);
// });

// ---------------------------------------------- Tray -------------------------------------------------------------------

// function createTray() {
//   tray = new Tray("images/dollar.icon.jpg");
//   tray.setToolTip("Tray details");

//   tray.on("click", e => {
//     if (e.shiftKey) {
//       app.quit();
//     } else {
//       mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
//     }
//   });

//   tray.setContextMenu(trayMenu);
// }

// mainWindow.webContents.on("did-finish-load", () => {
//   createTray();
// });

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

// ----------------------------------------------------------- COOKIES -------------------------------------------------------------

// let cookie = {
//   url: "https://myappdomain.com",
//   name: "cookie1",
//   value: "electron",
//   expirationDate: 1700000000,
// };

// const getCookies = async () => {
//   try {
//     const cookies = await ses.cookies.get({});
//     console.log(cookies);
//   } catch (err) {
//     console.error(err);
//   }
// };

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

// ----------------------------------------------------------- SCREEN DISPLAY -------------------------------------------------------------
// let displays = screen.getAllDisplays();
// console.log(`${displays[0].size.width} x ${displays[0].size.height}`);

// let primaryDisplay = screen.getPrimaryDisplay();

// screen.on("display-metrics-changed", (e, display, metricsChanged) => {
//   console.log(metricsChanged);
// });

// console.log(screen.getCursorScreenPoint());

// ----------------------------------------------------------- IPC Messaging -------------------------------------------------------------

// ipcMain.on("channel1", (e, args) => {
//   console.log(args);
//   e.sender.send(
//     "channel1-response",
//     'Message received on "channel1". Thank You'
//   );
// });

// mainWindow.webContents.on("did-finish-load", e => {
//   mainWindow.webContents.send("mailbox", "you have mail");
// });
