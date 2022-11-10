const { Menu } = require("electron");

let contextMenu = Menu.buildFromTemplate([
  {
    label: "Electron",
    submenu: [
      { label: "DevTools", role: "toggleDevTools" },
      { label: "menu2" },
      { label: "FullScreen", role: "togglefullscreen" },
    ],
  },
  {
    label: "Edit",
    role: "editMenu",
  },
]);

module.exports = contextMenu;
