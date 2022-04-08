const form = document.querySelector("#form");
const input = document.querySelector("#input");
const list = document.querySelector("#list");

let id = 0;

class Item {
  constructor(content, id) {
    this.content = content;
    this.id = id;
  }
}

class UI {
  static addItem() {
    if (input.value === "") return;
    const newItem = new Item(input.value, id++);

    const item = document.createElement("li");
    item.classList.add("item");

    item.insertAdjacentHTML(
      "afterbegin",
      `${newItem.content}
    <button class='btn-del'>del</button>`
    );

    list.appendChild(item);
  }

  static removeItem(e) {
    e.preventDefault();

    if (!e.target.classList.contains("btn-del")) return;

    e.target.closest(".item").remove();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  UI.addItem();
});

list.addEventListener("click", UI.removeItem);
