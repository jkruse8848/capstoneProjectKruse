// Event Listener for Hamburger Icon Menu
// document.querySelector(".fa-bars").addEventListener("click", () => {
//     document.querySelector("nav > ul").classList.toggle("hidden--mobile");
//   });

//Event Listener for collapsible side panel
function closeNav() {
  document
    .querySelector(".fa-angle-double-left")
    .addEventListener("click", () => {
      document.querySelector("nav > ul").classList.toggle(".mini-nav");
    });
}

//Side Panel Navigation
function homePage(el) {
  window.location.href = "./index.html";
}

function aboutPage(link) {
  location.href = "/about.html";
}

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
