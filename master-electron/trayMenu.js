const { Menu } = require("electron");

let trayMenu = Menu.buildFromTemplate([
  {
    label: "Electron",
    submenu: [{ label: "Quit", role: "quit" }],
  },
]);

module.exports = trayMenu;
