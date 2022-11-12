const { ipcRenderer } = require("electron");
const fs = require("fs");

const getData = async () => {
  const desktopPath = await ipcRenderer.invoke("app-path");
  return desktopPath;
};

window.writeToFile = async text => {
  const desktopPath = await getData();
  fs.writeFile(desktopPath + "/app.txt", text, console.log);
};

window.versions = {
  node: process.versions.node,
  electron: process.versions.electron,
};
