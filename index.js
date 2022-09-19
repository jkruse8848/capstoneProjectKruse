// Event Listener for Hamburger Icon Menu
// document.querySelector(".fa-bars").addEventListener("click", () => {
//     document.querySelector("nav > ul").classList.toggle("hidden--mobile");
//   });

//Event Listener for collapsible side panel  
function closeNav(){
    document.querySelector(".fa-angle-double-left").addEventListener("click", () => {
        document.querySelector("nav > ul").classList.toggle(".mini-nav")
    })
}

//Side Panel Navigation
function homePage(el){
    window.location.href='./index.html';
  }

  function aboutPage(link){
    location.href='/about.html'
  }