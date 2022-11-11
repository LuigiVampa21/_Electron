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
const { desktopCapturer } = require("electron");

const screenButton = document.getElementById("screenButton");
const screenShot = document.getElementById("screenShot");
console.log(screenShot);

screenButton.addEventListener("click", () => {
  desktopCapturer
    // .getSources({
    //   types: ["screen"],
    //   thumbnailSize: { width: 1200, height: 800 },
    // })
    // .then(async sources => {
    //   console.log(sources);
    //   screenShot.src = sources[0].thumbnail.toDataURL();
    // });
    .getSources({
      types: ["window"],
      thumbnailSize: { width: 1200, height: 800 },
    })
    .then(async sources => {
      console.log(sources);
      screenShot.src = sources[0].thumbnail.toDataURL();
    });
});
