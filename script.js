const form = document.querySelector("#form");
const input = document.querySelector("#input");
const list = document.querySelector("#list");

class Item {
  constructor(content, id) {
    const firstWord = content.split(" ")[0];
    const firstWordToUpperCase =
      firstWord[0].toUpperCase() + firstWord.slice(1);

    this.content =
      `${firstWordToUpperCase} ` + content.split(" ").slice(1).join(" ");

    this.id = id;
  }
}

class UI {
  static addItem(e) {
    e.preventDefault();

    if (input.value.trim() === "") {
      alert("Invalid input: empty!");
      return;
    }

    if (input.value.trim().length > 35) {
      alert("Invalid input: Must be shorter than 35 charachters!");
      return;
    }

    const id = Math.trunc(Math.random() * 100000) + 1;

    const newItem = new Item(input.value, id);

    const item = document.createElement("li");
    item.classList.add("item");

    const itemContent = `
       <span id=${newItem.id} >${newItem.content}</span>
       <button class='btn-done'>
          <i class="fa-solid fa-check"></i>
       </button>    
       <button class='btn-del'>
          <i class="fa-solid fa-trash"></i>
       </button>    
    `;

    item.insertAdjacentHTML("afterbegin", itemContent);

    list.appendChild(item);

    input.value = "";

    localStorage.setItem(`item${newItem.id}`, itemContent.toString());
  }

  static removeItem(e) {
    e.preventDefault();

    if (
      e.target.classList.contains("btn-del") ||
      e.target.classList.contains("fa-trash")
    ) {
      const toRemove = e.target.closest("li").querySelector("span").id;

      e.target.closest("li").remove();

      localStorage.removeItem(`item${toRemove}`);
    }
  }

  static checkDone(e) {
    e.preventDefault();

    if (
      e.target.classList.contains("btn-done") ||
      e.target.classList.contains("fa-check")
    ) {
      e.target.closest("li").classList.toggle("item-done");
    }
  }

  static loadStorage(e) {
    e.preventDefault();

    const items = localStorage;

    for (const x in items) {
      if (x.slice(0, 4) === "item") {
        const item = document.createElement("li");
        item.classList.add("item");

        item.insertAdjacentHTML("afterbegin", items[x]);

        list.appendChild(item);
      }
    }
  }
}

form.addEventListener("submit", UI.addItem);
list.addEventListener("click", UI.removeItem);
list.addEventListener("click", UI.checkDone);
window.addEventListener("DOMContentLoaded", UI.loadStorage);
