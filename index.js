import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import item from "/assets/img/case.png";
import * as $ from "jquery";
import * as faceapi from "./facerec/face-api.min.js";

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
      axios.get("http://localhost:4040/inmates").then(response => {
        store.Search.returnedInmates = response.data;
        console.log(response.data);
        store.Search.searchResults = [];
        const searching = store.Search.returnedInmates.filter(
          inmate => inmate.fullname == inputValue
        );
        store.Search.searchResults.push(searching);
        console.log("This is Store SearchResults", store.Search.searchResults);
        router.navigate("/Search");
      });
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

    // Sending data from modal
    document
      .getElementById("upload-modal")
      .addEventListener("submit", event => {
        event.preventDefault();
        const caseNumber = document.getElementById("media-modal-casenumber");
        const justification = document.getElementById(
          "media-modal-justification"
        );
        const subDate = document.getElementById("media-modal-date");
        const file = document.getElementById("media-modal-upload-file");
        const formData = new FormData();
        formData.append("casenumber", caseNumber.value);
        formData.append("justification", justification.value);
        formData.append("date", subDate.value);
        formData.append("file", file.files[0]);
        console.log("FormData", formData);
        fetch("http://localhost:4040/upload_files", {
          method: "POST",
          body: formData,
          headers: {}
        })
          .then(res => res.json())
          .then(data => {
            console.log(data.imagePath);
            store.Notifications.uploadData = data;
            console.log("all data", store.Notifications.uploadData);

            const imagePathOne = store.Notifications.uploadData.imagePath;
            const caseNumberOne = store.Notifications.uploadData.casenumber;
            const justificationOne =
              store.Notifications.uploadData.justification;
            const dateOne = store.Notifications.uploadData.date;
            const requestData = {
              imagePath: imagePathOne,
              casenumber: caseNumberOne,
              justification: justificationOne,
              date: dateOne
            };
            console.log("request body", requestData);

            axios
              .post(`http://localhost:4040/uploads`, requestData)
              .catch(error => {
                console.log("Not Working", error);
              });
            setTimeout(() => {
              router.navigate("/Notifications");
            }, 1500);
          })
          .catch(err => ("Error occurred", err));
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
    //Mapbox Features
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
      el.addEventListener("click", event => {
        let rowCount = event.target.id - 1;
        console.log(rowCount);
        let modal = document.getElementById("upload-modal");
        console.log(modal);
        modal.style.display = "block";

        //Add date to form
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

        //Add Case Number to form
        let caseNumber = document.getElementById("case-body").children[rowCount]
          .children[0].innerHTML;
        document.getElementById("media-modal-casenumber").value = caseNumber;

        //Add Justification to form
        let subJus = document.getElementById("case-body").children[rowCount]
          .children[4].innerHTML;
        console.log(subJus);
        document.getElementById("media-modal-justification").value = subJus;
      })
    );

    document
      .getElementById("upload-modal")
      .addEventListener("submit", event => {
        event.preventDefault();
        const caseNumber = document.getElementById("media-modal-casenumber");
        const justification = document.getElementById(
          "media-modal-justification"
        );
        const subDate = document.getElementById("media-modal-date");
        const file = document.getElementById("media-modal-upload-file");
        const formData = new FormData();
        formData.append("casenumber", caseNumber.value);
        formData.append("justification", justification.value);
        formData.append("date", subDate.value);
        formData.append("file", file.files[0]);
        console.log("FormData", formData);
        fetch("http://localhost:4040/upload_files", {
          method: "POST",
          body: formData,
          headers: {}
        })
          .then(res => res.json())
          .then(data => {
            console.log(data.imagePath);
            store.Notifications.uploadData = data;
            console.log("all data", store.Notifications.uploadData);

            const imagePathOne = store.Notifications.uploadData.imagePath;
            const caseNumberOne = store.Notifications.uploadData.casenumber;
            const justificationOne =
              store.Notifications.uploadData.justification;
            const dateOne = store.Notifications.uploadData.date;
            const requestData = {
              imagePath: imagePathOne,
              casenumber: caseNumberOne,
              justification: justificationOne,
              date: dateOne
            };
            console.log("request body", requestData);

            axios
              .post(`http://localhost:4040/uploads`, requestData)
              .catch(error => {
                console.log("Not Working", error);
              });
            setTimeout(() => {
              router.navigate("/Notifications");
            }, 1500);
          })
          .catch(err => ("Error occurred", err));
      });

    let modalClose = document.getElementsByClassName("fa-window-close")[0];
    modalClose.addEventListener("click", () => {
      let modal = document.getElementById("upload-modal");
      modal.style.display = "none";
    });
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

    let containers = document.getElementsByClassName("upload-container");
    console.log(containers);
    for (let i = 0; i < containers.length; i++) {
      containers[i].addEventListener("click", async () => {
        const getActive = document.querySelectorAll(
          ".notification-content.active"
        )[0];
        const getImage =
          getActive.children[1].children[0].children[0].children[0].src;
        const getImageHTML =
          getActive.children[1].children[0].children[0].children[0];
        const getCaseNumber = getActive.children[0].innerHTML
          .replace("Case Number: ", "")
          .replace(/\s/g, "");
        axios
          .get(
            `https://data.nashville.gov/resource/2u6v-ujjs.json?incident_number=${getCaseNumber}`
          )
          .then(response => {
            store.Notifications.matchedCase = response.data;
            let incidentNumber = response.data[0].incident_number;
            let reportDescription = response.data[0].report_type_description;
            let incidentStatus = response.data[0].incident_status_description;
            let investigationStatus = response.data[0].investigation_status;
            let zipCode = response.data[0].zip_code;
            let locDesc = response.data[0].location_description;
            let nibrs = response.data[0].offense_nibrs;
            let offDesc = response.data[0].offense_description;
            let wepDesc = response.data[0].weapon_description;
            let pushBox =
              getActive.children[3].children[0].children[1].children[1];
            pushBox.children[0].innerHTML = incidentNumber;
            pushBox.children[1].innerHTML = reportDescription;
            pushBox.children[2].innerHTML = incidentStatus;
            pushBox.children[3].innerHTML = investigationStatus;
            pushBox.children[4].innerHTML = zipCode;
            pushBox.children[5].innerHTML = locDesc;
            pushBox.children[6].innerHTML = nibrs;
            pushBox.children[7].innerHTML = offDesc;
            pushBox.children[8].innerHTML = wepDesc;
            console.log("push-box:", pushBox);
          });
        Promise.all([
          faceapi.nets.faceRecognitionNet.loadFromUri(
            "https://raw.githubusercontent.com/jkruse8848/models/main/models/"
          ),
          faceapi.nets.faceLandmark68Net.loadFromUri(
            "https://raw.githubusercontent.com/jkruse8848/models/main/models/"
          ),
          faceapi.nets.ssdMobilenetv1.loadFromUri(
            "https://raw.githubusercontent.com/jkruse8848/models/main/models/"
          )
        ]).then(start);
        async function start() {
          console.log("Loaded");
          fetch(`${getImage}`)
            .then(res => res.blob())
            .then(async blob => {
              const myFile = new File([blob], "dot.jpeg", {
                type: "image/jpeg"
              });
              console.log("file", myFile);
              const canvasContainer = document.createElement("div");
              canvasContainer.style.position = "relative";
              let returnedPhoto =
                getImageHTML.parentElement.parentElement.parentElement
                  .children[2].children[0];
              const LabeledFaceDescriptors = await loadLabeledImages();
              const faceMatcher = new faceapi.FaceMatcher(
                LabeledFaceDescriptors,
                0.6
              );
              returnedPhoto.appendChild(canvasContainer);
              const image = await faceapi.bufferToImage(myFile);
              console.log(image);
              returnedPhoto.appendChild(image);
              const canvas = faceapi.createCanvasFromMedia(image);
              canvasContainer.append(canvas);
              const displaySize = { width: image.width, height: image.height };
              faceapi.matchDimensions(canvas, displaySize);
              const detections = await faceapi
                .detectAllFaces(image)
                .withFaceLandmarks()
                .withFaceDescriptors();
              console.log(detections.length);
              const resizedDetections = faceapi.resizeResults(
                detections,
                displaySize
              );
              const results = resizedDetections.map(d =>
                faceMatcher.findBestMatch(d.descriptor)
              );
              results.forEach((result, i) => {
                const box = resizedDetections[i].detection.box;
                const drawBox = new faceapi.draw.DrawBox(box, {
                  label: result.toString()
                });
                returnedPhoto.children[0].style.display = "none";
                returnedPhoto.children[1].style.display = "none";
                drawBox.draw(canvas);
                console.log(result.toString());
              });
            });
          function loadLabeledImages() {
            const labels = [
              "Adam_Sandler",
              // "Al_Pacino",
              // "Alec_Baldwin",
              // "Alicia_Keys",
              // "Angelina_Jolie",
              // "Arnold_Schwarzenegger",
              // "Ashley_Olsen",
              // "Ashton_Kutcher",
              // "Barack_Obama",
              // "Ben_Affleck",
              // "Ben_Stiller",
              // "Bernie_Sanders",
              // "Betty_White",
              // "Beyonce_Knowles",
              // "Bill_Clinton",
              // "Bill_Cosby",
              // "Bill_Gates",
              // "Bill_Murray",
              // "Billy_Joel",
              // "Brad_Pitt",
              // "Britney_Spears",
              // "Bruce_Willis",
              // "Celine_Dion",
              // "Cher",
              // "Chris_Rock",
              // "Christina_Aguilera",
              // "Chuck_Norris",
              // "Clint_Eastwood",
              // "Conan_OBrien",
              // "Danny_DeVito",
              // "David_Letterman",
              // "Denzel_Washington",
              // "Dolly_Parton",
              // "Donald_Trump",
              // "Donald_Trump_Jr",
              // "Drew_Barrymore",
              // "Dwayne_Johnson",
              // "Eddy_Murphy",
              // "Ellen_Degeneres",
              // "Elon_Musk",
              // "Elton_John",
              // "Eminem",
              // "George_Clooney",
              // "George_W_Bush",
              // "Halle_Berry",
              // "Harrison_Ford",
              // "Hillary_Clinton",
              // "Hulk_Hogan",
              // "Ice_Cube",
              // "Ivanka_Trump",
              // "Jack_Nicholson",
              // "Jackie_Chan",
              // "Jamie_Foxx",
              // "Jamie_Lee_Curtis",
              // "Janet_Jackson",
              // "Jay_Z",
              // "Jennifer_Aniston",
              // "Jennifer_Lopez",
              // "Jerry_Seinfeld",
              // "Jerry_Springer",
              // "Jim_Carrey",
              // "Jimmy_Carter",
              // "Jimmy_Fallon",
              // "Jodie_Foster",
              // "Joe_Biden",
              // "John_Travolta",
              // "Johnny_Depp",
              // "Jon_Bon_Jovi",
              // "Julia_Roberts",
              // "Justin_Bieber",
              // "Justin_Timberlake",
              // "Kamala_Harris",
              // "Katy_Perry",
              // "Kayne_West",
              // "Keanu_Reeves",
              // "Kelly_Clarkson",
              // "Kevin_Bacon",
              // "Khloe_Kardashian",
              // "Kid_Rock",
              // "Kim_Kardashian",
              // "Kobe_Bryant",
              // "Kourtney_Kardashian",
              // "Kurt_Russell",
              // "Kylie_Jenner",
              // "Lady_Gaga",
              // "Larry_King",
              // "LeBron_James",
              // "Leonardo_DiCaprio",
              // "Lindsay_Lohan",
              // "Madonna",
              // "Mariah_Carey",
              // "Mark_Wahlberg",
              // "Mark_Zuckerberg",
              // "Martha_Stewart",
              // "Mary-Kate_Olsen",
              // "Matt_Damon",
              // "Matthew_McConaughey",
              // "Mel_Gibson",
              // "Melania_Trump",
              // "Michael_J_Fox",
              // "Michael_Jordan",
              // "Michael_Keaton",
              // "Michelle_Obama",
              // "Mick_Jagger",
              // "Mike_Pence",
              // "Mike_Tyson",
              // "Mitt_Romney",
              // "Miley_Cyrus",
              // "Mitt_Romney",
              // "Morgan_Freeman",
              // "Nancy_Pelosi",
              // "Nicolas_Cage",
              // "Nicole_Kidman",
              // "Olivia_Newton-John",
              // "Oprah_Winfrey",
              // "Owen_Wilson",
              // "Ozzy_Osbourne",
              // "Paris_Hilton",
              // "Paul_McCartney",
              // "Reese_Witherspoon",
              // "Rhianna",
              // "Robert_Downey_Jr",
              // "Rosie_ODonnell",
              // "Russell_Crowe",
              // "Samuel_L_Jackson",
              // "Sandra_Bullock",
              // "Scarlett_Johansson",
              // "Selena_Gomez",
              // "Serena_Williams",
              // "Sylvester_Stallone",
              // "Shaquille_ONeal",
              // "Snoop_Dogg",
              // "Stephen_King",
              // "Steven_Spielberg",
              // "Stevie_Wonder",
              // "Sylvester_Stallone",
              // "Taylor_Swift",
              // "Tiger_Woods",
              // "Tim_Allen",
              // "Tom_Cruise",
              // "Tom_Hardy",
              // "Tom_Selleck",
              // "Uma_Thurman",
              // "Vin_Diesel",
              // "Whoopi_Goldberg",
              // "Will_Ferrell",
              "Will_Smith",
              "Willie_Nelson",
              "Woody_Allen"
            ];
            return Promise.all(
              labels.map(async label => {
                const descriptions = [];
                for (let i = 1; i <= 3; i++) {
                  const img = await faceapi.fetchImage(
                    `http://localhost:4040/static/labeled_images/${label}/${label}_000${i}.jpg`
                  );
                  const detections = await faceapi
                    .detectSingleFace(img)
                    .withFaceLandmarks()
                    .withFaceDescriptor();
                  descriptions.push(detections.descriptor);
                }

                return new faceapi.LabeledFaceDescriptors(label, descriptions);
              })
            );
          }
        }
      });
    }
  }
  if (state.view === "Search") {
    //Redirecting to Dossier
    document.querySelector("#search-tr").addEventListener("click", () => {
      let searchInmateID = document.querySelectorAll("#search-tr")[0]
        .children[5].innerHTML;
      console.log(searchInmateID);
      axios
        .get(`http://localhost:4040/inmates/filterInmateId/${searchInmateID}`)
        .then(response => {
          store.Dossier.individualInmate = response.data;
          console.log(store.Dossier.individualInmate);
          router.navigate("/Dossier");
        });
    });
  }
}

// Retrieve data from API
router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
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
            store.Notifications.uploads = response.data.reverse();
            console.log(response.data);
            done();
          })
          .catch(error => {
            console.log("Uploads not working", error);
            done();
          });
        break;
      case "Home":
        axios
          .get(`http://localhost:4040/uploads`)
          .then(response => {
            store.Home.uploads = response.data.reverse();
            console.log(response.data);
            done();
          })
          .catch(error => {
            console.log("Uploads not working", error);
            done();
          });
        break;
      default:
        done();
    }
  },
  already: params => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    render(store[view]);
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
