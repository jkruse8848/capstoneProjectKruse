import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import item from "/assets/img/case.png";
import * as $ from "jquery";
import * as faceapi from "face-api.js";

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

async function afterRender(state) {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });

  //Header Search
  document.getElementById("site-search").addEventListener("keypress", event => {
    if (event.key === "Enter") {
      let inputValue = event.target.value;
      axios
        .get("http://localhost:4040/inmates")
        .then(response => {
          store.Search.returnedInmates = response.data;
          console.log(response.data);
          store.Search.searchResults = [];
          let passBetween = localStorage.setItem(
            "myItem",
            store.Search.searchResults
          );
          const searching = store.Search.returnedInmates.filter(
            inmate => inmate.fullname == inputValue
          );
          store.Search.searchResults.push(searching);
          console.log(store.Search.searchResults);
          console.log(passBetween);
        })
        .then(window.location.replace("Search", "test", "/Search"));
    }
  });

  // Selected Navigation
  if (state.view === "Home") {
    document.getElementById("nav-icon1").id = "nav-icon-selected";
  }
  if (state.view === "Search") {
    document.getElementById("nav-icon2").id = "nav-icon-selected";
  }
  if (state.view === "Dossier") {
    document.getElementById("nav-icon3").id = "nav-icon-selected";
  }
  if (state.view === "Notifications") {
    document.getElementById("nav-icon4").id = "nav-icon-selected";
  }
  if (state.view === "Dispatch") {
    document.getElementById("nav-icon5").id = "nav-icon-selected";
  }
  if (state.view === "About") {
    document.getElementById("nav-icon6").id = "nav-icon-selected";
  }
  if (state.view === "Contact") {
    document.getElementById("nav-icon7").id = "nav-icon-selected";
  }
  if (state.view === "Guide") {
    document.getElementById("nav-icon8").id = "nav-icon-selected";
  }
  if (state.view === "User") {
    document.getElementById("nav-icon9").id = "nav-icon-selected";
  }

  // //Modal Container
  if (state.view === "Home") {
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
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    let today = `${month}/${day}/${year} ${hour}:${min}:${sec}`;
    document.getElementById("media-modal-date").value = today;

    //Sending data from modal
    document
      .getElementById("upload-modal")
      .addEventListener("submit", event => {
        event.preventDefault();

        const inputs = event.target.elements;
        console.log("Input Element List", inputs);

        const requestData = {
          casenumber: inputs.casenumber.value,
          justification: inputs.justification.value,
          date: inputs.dateofupload.value
        };
        console.log("request body", requestData);

        axios
          .post(`http://localhost:4040/uploads`, requestData)
          .then(response => {
            store.Notifications.uploads.push(response.data);
            router.navigate("/Notifications");
            window.location.replace("/Notifications");
          })
          .catch(error => {
            console.log("Not Working", error);
          });
      });
  }
  //Tabbed Containers for Dossier Page
  if (state.view === "Dossier") {
    let tabs = document.querySelectorAll(".dos-tab-header");
    let tabContents = document.querySelectorAll(".tabbed-information");
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
  }

  //Map Box Installation

  if (state.view === "Dispatch") {
    let mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

    mapboxgl.accessToken = `${process.env.MAPBOX_TOKEN}`;
    const map = new mapboxgl.Map({
      container: `map`,
      style: `mapbox://styles/mapbox/streets-v11`,
      center: [-86.78266047511858, 36.16525000567188],
      zoom: 10,
      projection: "globe"
    });
    map.on("load", () => {
      // Load an image from an external URL.
      map.loadImage(`${item}`, (error, image) => {
        if (error) throw error;

        // Add the image to the map style.
        //map.addImage("case", image);

        // Add a data source containing one point feature.
        map.addSource("places", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: state.cases
          }
        });

        map.addLayer({
          id: "places",
          type: "circle",
          source: "places",
          paint: {
            "circle-color": "#4264fb",
            "circle-radius": 6,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff"
          }
        });
      });
      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      map.on("mouseenter", "places", e => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = "pointer";

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });

      map.on("mouseleave", "places", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });
    });
    $(document).ready(function() {
      $("#case-table-filter").on("keyup", function() {
        var value = $(this)
          .val()
          .toLowerCase();
        $("#case-body tr").filter(function() {
          $(this).toggle(
            $(this)
              .text()
              .toLowerCase()
              .indexOf(value) > -1
          );
        });
      });
    });

    const rowCount = document.getElementById("cases").rows.length;
    const rows = document.getElementsByTagName("button");
    for (let i = 0; i < rowCount; i++) {
      rows[i].setAttribute("id", i);
    }

    const tableButtons = document.querySelectorAll(".case-submit");
    tableButtons.forEach(el =>
      el.addEventListener("click", event => console.log(event.target.id - 1))
    );
  }
  if (state.view === "Notifications") {
    let tabs = document.querySelectorAll(".upload-container");
    let tabContents = document.querySelectorAll(".notification-content");
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
  }
  if (state.view === "Search") {
    let results = JSON.parse(localStorage.getItem("myItem"));
    console.log(results);
  }
}

// Retrieve data from API
router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Dispatch";
    switch (view) {
      case "Dispatch":
        axios
          .get(`https://data.nashville.gov/resource/2u6v-ujjs.json`)
          .then(response => {
            console.log(response.data);
            store.Dispatch.caseData = response.data;
            store.Dispatch.cases = [];
            response.data.forEach(incident => {
              let caseName = incident.incident_number;
              let offenseDescription = incident.offense_description;
              let location = incident.incident_location;
              let investigationStatus = incident.investigation_status;
              let lon = incident.longitude;
              let lat = incident.latitude;
              const caseObj = {
                type: "Feature",
                properties: {
                  description: `${offenseDescription} occurred near ${location} and was assigned case number: ${caseName}. The current status of the case is ${investigationStatus}`
                },
                geometry: {
                  type: "Point",
                  coordinates: [`${lon}`, `${lat}`]
                }
              };
              store.Dispatch.cases.push(caseObj);
              console.log(caseObj);
            }),
              done();
          })
          .catch(err => console.log(err));
        break;
      case "Notifications":
        axios
          .get(`http://localhost:4040/uploads`)
          .then(response => {
            store.Notifications.uploads = response.data;
            console.log(response.data);
            done();
          })
          .catch(error => {
            console.log("Uploads not working", error);
            done();
          });
        break;
      case "Dossier":
        axios
          .get(`http://localhost:4040/inmates/63476ebe803e5d4215e1e575`)
          .then(response => {
            store.Dossier.inmate = response.data;
            console.log(response.data);
            done();
          });
        break;
      default:
        done();
    }
  }
});

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
