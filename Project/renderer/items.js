const fs = require("fs");

let items = document.querySelector("#items");
let readerJS;
fs.readFile(`${__dirname}/reader.js`, (err, data) => {
  readerJS = data.toString();
});

exports.storage = JSON.parse(localStorage.getItem("readit-items")) || [];

exports.save = () => {
  localStorage.setItem("readit-items", JSON.stringify(this.storage));
};

exports.select = e => {
  // Remove currently selected item class
  document
    .getElementsByClassName("read-item selected")[0]
    .classList.remove("selected");

  // Add to clicked item
  e.currentTarget.classList.add("selected");
};

// Move to newly selected item
exports.changeSelection = direction => {
  // Get selected item
  let currentItem = document.getElementsByClassName("read-item selected")[0];

  // Handle up/down
  if (direction === "ArrowUp" && currentItem.previousElementSibling) {
    currentItem.classList.remove("selected");
    currentItem.previousElementSibling.classList.add("selected");
  } else if (direction === "ArrowDown" && currentItem.nextElementSibling) {
    currentItem.classList.remove("selected");
    currentItem.nextElementSibling.classList.add("selected");
  }
};

// Open selected item
exports.open = () => {
  // Only if we have items (in case of menu open)
  if (!this.storage.length) return;

  // Get selected item
  let selectedItem = document.getElementsByClassName("read-item selected")[0];

  // Get item's url
  let contentURL = selectedItem.dataset.url;

  //   Open in proxy Browser Window
  let readerWindow = window.open(
    contentURL,
    "",
    `
  maxWidth=2000,
  maxHeight=2000,
  width=1200,
  height=800,
  backgroundColor=#DEDEDE,
  nodeIntegration=0,
  contextIsolation=1
  `
  );

  readerWindow.eval(readerJS);
};

exports.addItems = (value, isNew = false) => {
  const itemNode = document.createElement("div");
  itemNode.setAttribute("class", "read-item");

  // Set item url as data attribute
  itemNode.setAttribute("data-url", value.url);

  itemNode.innerHTML = `
      <img src="${value.screenshot}"/>
      <h2>${value.title}</h2>
    `;

  items.appendChild(itemNode);

  // Attach click handler to select
  itemNode.addEventListener("click", this.select);

  // Attach doubleclick handler to open
  itemNode.addEventListener("dblclick", this.open);

  // If this is the first item, select it
  if (document.getElementsByClassName("read-item").length === 1) {
    itemNode.classList.add("selected");
  }

  //   save into storage if(new)
  if (isNew) {
    this.storage.push(value);
    this.save();
  }
};

// Add items when app loads/reloads
this.storage.forEach(s => {
  this.addItems(s);
});
