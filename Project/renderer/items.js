let items = document.querySelector("#items");

exports.addItems = value => {
  const itemNode = document.createElement("div");
  itemNode.setAttribute("class", "read-item");

  itemNode.innerHTML = `
      <img src="${value.screenshot}"/>
      <h2>${value.title}</h2>
    `;

  items.appendChild(itemNode);
};
