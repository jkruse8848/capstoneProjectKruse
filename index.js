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

  //Tabbed Containers for Dossier Page
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

  //Modal for Home Page
  let modal = document.getElementById("upload-modal");
  let mediaBox = document.getElementById("media-upload");
  let modalClose = document.getElementsByClassName("fa-window-close")[0];
  mediaBox.onclick = function() {
    modal.style.display = "block";
  };
  modalClose.onclick = function() {
    modal.style.display = "none";
  };
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
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
