const form = document.querySelector("#form");
const input = document.querySelector("#input");
const list = document.querySelector("#list");

class Item {
  constructor(content) {
    const firstWord = content.split(" ")[0];
    const firstWordToUpperCase =
      firstWord[0].toUpperCase() + firstWord.slice(1);

    this.content =
      `${firstWordToUpperCase} ` + content.split(" ").slice(1).join(" ");
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

    const newItem = new Item(input.value);

    const item = document.createElement("li");
    item.classList.add("item");

    const itemContent = `
       ${newItem.content}
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
  }

  static removeItem(e) {
    e.preventDefault();

    if (
      e.target.classList.contains("btn-del") ||
      e.target.classList.contains("fa-trash")
    ) {
      e.target.closest("li").remove();
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
}

form.addEventListener("submit", UI.addItem);
list.addEventListener("click", UI.removeItem);
list.addEventListener("click", UI.checkDone);
