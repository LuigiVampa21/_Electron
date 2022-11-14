const { Menu } = require("electron");

module.exports = () => {
  let template = [];

  let menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
};
