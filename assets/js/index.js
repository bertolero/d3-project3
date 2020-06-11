import db from "./data/firebase-utils";

const modal = document.querySelector(".modal");
M.Modal.init(modal);

const form = document.querySelector("form");
const name = document.querySelector("#name");
const parent = document.querySelector("#parent");
const department = document.querySelector("#department");

form.addEventListener("submit", (ev) => {
  console.log(ev);

  ev.preventDefault();

  db.collection("employees")
    .add({
      name: name.value,
      parent: parent.value,
      department: department.value,
    })
    .then(() => {
      let instance = M.Modal.getInstance(modal);
      instance.close();
      form.reset();
    })
    .catch((onerror) => {
      console.error(onerror);
    });
});
