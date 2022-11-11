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

// ----------------------------------------------------------IPC REMOTE ----------------------------------------------------------------

const { ipcRenderer } = require("electron");

document.querySelector("#ask").addEventListener("click", e => {
  ipcRenderer.send("ask-fruit");
});

ipcRenderer.on("answer-fruit", (e, args) => {
  console.log(args);
});
