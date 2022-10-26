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

document
  .getElementById("upload-container")
  .addEventListener("click", async () => {
    const getActive = document.querySelectorAll(
      ".notification-content.active"
    )[0];
    console.log(getActive);
    const getImage =
      getActive.children[1].children[0].children[0].children[0].src;
    console.log(getImage);
    const getImageHTML =
      getActive.children[1].children[0].children[0].children[0];
    console.log(getImageHTML);
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
          const image = await faceapi.bufferToImage(myFile);
          console.log(image);
          document.body.append(image);
          const detections = await faceapi
            .detectAllFaces(image)
            .withFaceLandmarks()
            .withFaceDescriptors();
          console.log(detections.length);
        });
    }
  });

function loadLabeledImages() {
  const labels = [
    "Adam_Sandler",
    "Al_Pacino",
    "Alec_Baldwin",
    "Alicia_Keys",
    "Angelina_Jolie",
    "Arnold_Schwarzenegger",
    "Ashley_Olsen",
    "Ashton_Kutcher",
    "Barack_Obama",
    "Ben_Affleck",
    "Ben_Stiller",
    "Bernie_Sanders",
    "Betty_White",
    "Beyonce_Knowles",
    "Bill_Clinton",
    "Bill_Cosby",
    "Bill_Gates",
    "Bill_Murray",
    "Billy_Joel",
    "Brad_Pitt",
    "Britney_Spears",
    "Bruce_Willis",
    "Celine_Dion",
    "Cher",
    "Chris_Rock",
    "Christina_Aguilera",
    "Chuck_Norris",
    "Clint_Eastwood",
    "Conan_OBrien",
    "Danny_DeVito",
    "David_Letterman",
    "Denzel_Washington",
    "Dolly_Parton",
    "Donald_Trump",
    "Donald_Trump_Jr",
    "Drew_Barrymore",
    "Dwayne_Johnson",
    "Eddy_Murphy",
    "Ellen_Degeneres",
    "Elon_Musk",
    "Elton_John",
    "Eminem",
    "George_Clooney",
    "George_W_Bush",
    "Halle_Berry",
    "Harrison_Ford",
    "Hillary_Clinton",
    "Hulk_Hogan",
    "Ice_Cube",
    "Ivanka_Trump",
    "Jack_Nicholson",
    "Jackie_Chan",
    "Jamie_Foxx",
    "Jamie_Lee_Curtis",
    "Janet_Jackson",
    "Jay_Z",
    "Jennifer_Aniston",
    "Jennifer_Lopez",
    "Jerry_Seinfeld",
    "Jerry_Springer",
    "Jim_Carrey",
    "Jimmy_Carter",
    "Jimmy_Fallon",
    "Jodie_Foster",
    "Joe_Biden",
    "John_Travolta",
    "Johnny_Depp",
    "Jon_Bon_Jovi",
    "Julia_Roberts",
    "Justin_Bieber",
    "Justin_Timberlake",
    "Kamala_Harris",
    "Katy_Perry",
    "Kayne_West",
    "Keanu_Reeves",
    "Kelly_Clarkson",
    "Kevin_Bacon",
    "Khloe_Kardashian",
    "Kid_Rock",
    "Kim_Kardashian",
    "Kobe_Bryant",
    "Kourtney_Kardashian",
    "Kurt_Russell",
    "Kylie_Jenner",
    "Lady_Gaga",
    "Larry_King",
    "LeBron_James",
    "Leonardo_DiCaprio",
    "Lindsay_Lohan",
    "Madonna",
    "Mariah_Carey",
    "Mark_Wahlberg",
    "Mark_Zuckerberg",
    "Martha_Stewart",
    "Mary-Kate_Olsen",
    "Matt_Damon",
    "Matthew_McConaughey",
    "Mel_Gibson",
    "Melania_Trump",
    "Michael_J_Fox",
    "Michael_Jordan",
    "Michael_Keaton",
    "Michelle_Obama",
    "Mick_Jagger",
    "Mike_Pence",
    "Mike_Tyson",
    "Mitt_Romney",
    "Miley_Cyrus",
    "Mitt_Romney",
    "Morgan_Freeman",
    "Nancy_Pelosi",
    "Nicolas_Cage",
    "Nicole_Kidman",
    "Olivia_Newton-John",
    "Oprah_Winfrey",
    "Owen_Wilson",
    "Ozzy_Osbourne",
    "Paris_Hilton",
    "Paul_McCartney",
    "Reese_Witherspoon",
    "Rhianna",
    "Robert_Downey_Jr",
    "Rosie_ODonnell",
    "Russell_Crowe",
    "Samuel_L_Jackson",
    "Sandra_Bullock",
    "Scarlett_Johansson",
    "Selena_Gomez",
    "Serena_Williams",
    "Sylvester_Stallone",
    "Shaquille_ONeal",
    "Snoop_Dogg",
    "Stephen_King",
    "Steven_Spielberg",
    "Stevie_Wonder",
    "Sylvester_Stallone",
    "Taylor_Swift",
    "Tiger_Woods",
    "Tim_Allen",
    "Tom_Cruise",
    "Tom_Hardy",
    "Tom_Selleck",
    "Uma_Thurman",
    "Vin_Diesel",
    "Whoopi_Goldberg",
    "Will_Ferrell",
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
