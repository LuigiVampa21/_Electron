const { ipcRenderer } = require("electron");
const items = require("./items.js");

// DOM Nodes
const showModal = document.getElementById("show-modal"),
  closeModal = document.getElementById("close-modal"),
  modal = document.getElementById("modal"),
  addItem = document.getElementById("add-item"),
  itemUrl = document.getElementById("url");

// Show modal
showModal.addEventListener("click", e => {
  modal.style.display = "flex";
  itemUrl.focus();
});

// Hide modal
closeModal.addEventListener("click", e => {
  modal.style.display = "none";
});

// toggle Disable/Enable button
const toggleModalButtons = () => {
  if (addItem.disabled) {
    addItem.disabled = false;
    addItem.style.opacity = 1;
    addItem.innerText = "Add Item";
    closeModal.style.display = "inline";
  } else {
    addItem.disabled = true;
    addItem.style.opacity = 0.5;
    addItem.innerText = "Adding..";
    closeModal.style.display = "none";
  }
};

// Handle new item
addItem.addEventListener("click", e => {
  // Check a url exists
  if (itemUrl.value) {
    // Send new item url to main process
    ipcRenderer.send("new-item", itemUrl.value);

    // Disable buttons
    toggleModalButtons();
  }
});

// Listen for new-item-success
ipcRenderer.on("new-item-success", (e, value) => {
  items.addItems(value);
  toggleModalButtons();

  // Hide modal and clear value
  modal.style.display = "none";
  itemUrl.value = "";
});

itemUrl.addEventListener("keyup", e => {
  if (e.key === "Enter") addItem.click();
});
