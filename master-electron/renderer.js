// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// const { webFrame } = require("electron");

// ---------------------------------------------------------- Manage a new Window ----------------------------------------------------------------

// let win;

// const newWindow = () => {
//   win = window.open(
//     "https://google.com",
//     "_blank",
//     "width=500, height=450,alwaysOnTop=true"
//   );
// };

// const closeWindow = () => {
//   win.close();
// };

// const newFont = () => {
//   win.eval("document.getElementsByTagName('h1')[0].style.color = 'red'");
// };

// ---------------------------------------------------------- Manage a new Window ----------------------------------------------------------------

// const { webFrame } = require("electron");

// const zoomIn = () => {
//   //   webFrame.setZoomFactor(webFrame.getZoomFactor() + 1);
//   //   OR
//   webFrame.setZoomLevel(webFrame.getZoomLevel() + 1);
// };
// const zoomOut = () => {
//   webFrame.setZoomFactor(webFrame.getZoomFactor() - 1);
// };
// const zoomReset = () => {
//   webFrame.setZoomFactor(1);
// };

// ---------------------------------------------------------- Sources ----------------------------------------------------------------
// const { desktopCapturer } = require("electron");

// const screenButton = document.getElementById("screenButton");
// const screenShot = document.getElementById("screenShot");
// console.log(screenShot);

// screenButton.addEventListener("click", () => {
//   desktopCapturer
//     // .getSources({
//     //   types: ["screen"],
//     //   thumbnailSize: { width: 1200, height: 800 },
//     // })
//     // .then(async sources => {
//     //   console.log(sources);
//     //   screenShot.src = sources[0].thumbnail.toDataURL();
//     // });
//     .getSources({
//       types: ["window"],
//       thumbnailSize: { width: 1200, height: 800 },
//     })
//     .then(async sources => {
//       console.log(sources);
//       screenShot.src = sources[0].thumbnail.toDataURL();
//     });
// });

// ----------------------------------------------------------IPC MESSAGING ----------------------------------------------------------------

// const { ipcRenderer } = require("electron");

// const talk = document.getElementById("talk");

// talk.addEventListener("click", e => {
//   ipcRenderer.send("channel1", "Hello channel1");
// });

// ipcRenderer.on("channel1-response", (e, args) => {
//   console.log(args);
// });

// ipcRenderer.on("mailbox", (e, args) => {
//   console.log(args);
// });

// ----------------------------------------------------------IPC REMOTE ----------------------------------------------------------------

// const { remote } = require("electron");
// const { dialog, BrowserWindow } = remote;

// setTimeout(() => {
//   //   dialog
//   //     .showMessageBox({
//       //       message: "Dialog from renderer",
//       //       buttons: ["One", "Two"],
//   //     })
//   //     .then(res => {
//   //       console.log(res);
//   //     })
//   //     .catch(err => console.error(err));

//   let win = new BrowserWindow({
//     x: 50,
//     y: 50,
//     width: 300,
//     height: 300,
//   });

//   let mainWindow = remote.getCurrentWindow();

//   setTimeout(() => {
//     mainWindow.maximize(), 2000;
//   });

//   win.loadFile("index.html");

//   setTimeout(remote.app.quit, 2000);
// }, 2000);

// ---------------------------------------------------------- INVOKE & HANDLE ----------------------------------------------------------------

// const { ipcRenderer } = require("electron");

// document.querySelector("#ask").addEventListener("click", async e => {
//   const fruit = await ipcRenderer.invoke("ask-fruit");
//   console.log(fruit);
// });

// ---------------------------------------------------------- SHELL ----------------------------------------------------------------

// const { shell } = require("electron");

// const showSite = e => {
//   shell.openExternal("https://electronjs.org");
// };

const imgPath = `${__dirname}/images/splash.png`;

// const showImg = e => {
//   shell.openPath(imgPath);
// };

// const showFile = e => {
//   shell.showItemInFolder(imgPath);
//   console.log("hiiya");
// };

// const deleteFile = e => {
//   shell.moveItemToTrash(imgPath);
// };

// ---------------------------------------------------------- NativeElements ----------------------------------------------------------------

// const { nativeImage, ipcRenderer } = require("electron");
// const fs = require("fs");

// const splash = nativeImage.createFromPath(imgPath);

// const saveToDesktop = async (data, ext) => {
//   let desktopPath = await ipcRenderer.invoke("app-path");
//   fs.writeFile(`${desktopPath}/splash.${ext}`, data, () => {
//     console.log(desktopPath);
//   });
// };

// const toPNG = () => {
//   let imgPNG = splash.toPNG();
//   saveToDesktop(imgPNG, "png");
// };

// const toJPEG = () => {
//   let imgJPG = splash.toJPEG(100);
//   saveToDesktop(imgJPG, "jpg");
// };

// const toTAG = () => {
//   let size = splash.getSize();
//   let imgURL = splash
//     .resize({
//       width: Math.round(size.width / 4),
//       height: Math.round(size.height / 4),
//     })
//     .toDataURL();
//   document.getElementById("preview").src = imgURL;
// };

// ---------------------------------------------------------- CLIPBOARD ----------------------------------------------------------------

const { clipboard } = require("electron");

const txt = clipboard.readText();

const makeUpper = () => {
  clipboard.writeText(txt.toUpperCase());
};

const showImage = () => {
  let img = clipboard.readImage();
  console.log(img);
  document.querySelector("#cbImg").src = img.toDataURL();
};
