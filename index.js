import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import dotenv from "dotenv";
import axios from "axios";
import item from "/assets/img/case.png";

dotenv.config();

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

  // // //Modal Container
  // let modal = document.getElementById("upload-modal");
  // let mediaBox = document.getElementById("media-upload");
  // let modalClose = document.getElementsByClassName("fa-window-close")[0];
  // mediaBox.onclick = function() {
  //   modal.style.display = "block";
  // };
  // modalClose.onclick = function() {
  //   modal.style.display = "none";
  // };
  // window.onclick = function(event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // };

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

  //Map Box Installation
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
      map.addImage("case", image);

      // Add a data source containing one point feature.
      map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [caseObj]
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

  //Place holder for selected nav

  // //Modal for Home
}

// Retrieve data from API
router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Dispatch";

    //         switch (view) {
    //           case "Dispatch":
    //             axios
    //             .get(`https://data.nashville.gov/resource/2u6v-ujjs.json`)
    //             .then(response => {
    //               store.Dispatch.cases = response.data;
    //               done();
    //         })

    //         .catch(error => {
    //           console.log("It didn't work", error);
    //           break;
    //           done();
    //         }
    //     }
    //   }
    // });
    // Add a switch case statement to handle multiple routes
    switch (view) {
      case "Dispatch":
        axios
          .get(`https://data.nashville.gov/resource/2u6v-ujjs.json`)
          .then(response => {
            console.log(response.data);
            response.data.forEach(cases => {
              let caseName = cases.incident_number;
              let offenseDescription = cases.offense_description;
              let location = cases.incident_location;
              let investigationStatus = cases.investigation_status;
              let lon = cases.longitude;
              let lat = cases.latitude;
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
              console.log(caseObj);
            }),
              done();
          })
          .catch(err => console.log(err));
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
