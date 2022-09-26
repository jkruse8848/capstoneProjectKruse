import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(state)}
    ${Nav(store.Links)}
    ${Main(state)}
    ${Footer()}
  `;

  afterRender(state);

  router.updatePageLinks();
}

function afterRender(state) {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}

// routing
router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(store[view]);
    }
  })
  .resolve();

// MODAL
// MODAL
// MODAL
// MODAL
// Get the modal
let modal = document.getElementById("upload-modal");

// Get the button that opens the modal
let mediaBox = document.getElementById("media-upload");

// Get the <span> element that closes the modal
let modalClose = document.getElementsByClassName("fa-window-close")[0];

// When the user clicks on the button, open the modal
mediaBox.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
modalClose.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let tabs = document.querySelectorAll(".dossier-tabs h3");
let tabContents = document.querySelectorAll(".tab-content div");
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabContents.forEach(content => {
      content.classList.remove("active");
    });
    tabs.forEach(tab => {
      tab.classList.remove("active");
    });
    tabContents[index].classList.add("active");
    tabs[index].classList.add("active");
  });
});
