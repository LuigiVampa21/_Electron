const { Menu } = require("electron");

let mainMenu = Menu.buildFromTemplate([
  {
    label: "Electron",
    submenu: [
      { label: "DevTools", role: "toggleDevTools" },
      { label: "menu2" },
      { label: "FullScreen", role: "togglefullscreen" },
    ],
  },
  {
    label: "Ionic",
    submenu: [
      { label: "menu1" },
      { label: "menu2", enabled: false },
      {
        label: "menu3",
        submenu: [
          {
            label: "Subitem1",
            click: () => {
              console.log("Ionic/menu3/subitem1");
            },
            accelerator: "Alt+G",
          },
        ],
      },
    ],
  },
]);

module.exports = mainMenu;
