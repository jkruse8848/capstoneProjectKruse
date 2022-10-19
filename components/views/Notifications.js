import html from "html-literal";
import toddWike from "/assets/img/Todd_Wike_0001.jpg";
import tomCruise2 from "/assets/img/tomCruise2.jpeg";

export default state => html`
  <main>
    <div class="notifications-no-scroll">
      <div class="uploads-panel">
        <div class="uploads-filter-holder">
          <p>Filter Uploads:</p>
          <input
            class="uploads-filter"
            type="text"
            id="uploads-filter-notifications"
            placeholder="Case Number..."
          />
        </div>
        <div class="upload-notifications-holder">
          ${state.uploads.map(upload => {
            return `<div class="upload-container">
            <div class="fas fa-inbox fa-lg" id="uploads-icon"></div>
            <div class="case-jus-holder" id="case-jus-holder-id">
              <div class="case-number-upload" id="case-number-for-uploads">
                <p>${upload.casenumber}</p>
              </div>
              <div class="justification-upload">
                <p>${upload.justification}</p>
              </div>
            </div>
            <div class="date-holder">
              <p>${upload.date}</p>
            </div>
          </div>`;
          })}
        </div>
      </div>
    </div>
    ${state.uploads.map(upload => {
      return `<div class="notification-content">
      <p>Case Number: ${upload.casenumber}</p>
      <div class="upload-photo-container">
        <div class="photo-box">
          <div class="upload-photos">
            <img id="uploaded-photo" src="https://raw.githubusercontent.com/jkruse8848/imageStore/main/lfw/Tom_Brady/Tom_Brady_0001.jpg" />
          </div>
          <div class="photo-text">
            <p>Uploaded Photo</p>
          </div>
        </div>
        <div
          class="fas fa-arrow-alt-circle-right fa-4x"
          id="transform-circle"
        ></div>
        <div class="photo-box">
          <div class="upload-photos">
            <img id="uploaded-photo" src="https://raw.githubusercontent.com/jkruse8848/imageStore/main/lfw/Tom_Brady/Tom_Brady_0001.jpg" ${start()}/>
          </div>
          <div class="photo-text">
            <p>Processed Photo</p>
          </div>
        </div>
      </div>
      <div class="match-results-header">
        <p>Match Results</p>
      </div>
      <div class="nots-results-cont">
        <div class="case-match">
          <p>Linked Case</p>
          <div class="case-results-cont">
            <div class="case-match-props">
              <p>Incident Number</p>
              <p>Report Description</p>
              <p>Incident Status</p>
              <p>Investigation Status</p>
              <p>Zip Code</p>
              <p>Location Description</p>
              <p>NIBRS Number</p>
              <p>Offense Description</p>
              <p>Weapon Description</p>
            </div>
            <div class="case-match-props">
              <p>Value</p>
              <p>Value</p>
              <p>Value</p>
              <p>Value</p>
              <p>Value</p>
              <p>Value</p>
              <p>Value</p>
              <p>Value</p>
              <p>Value</p>
            </div>
          </div>
        </div>
        <div class="case-match">
          <p>Recognition Matches</p>
          <div class="match-results-container">TEST2</div>
        </div>
      </div>
    </div>`;
    })}
  </main>
`;
import * as faceapi from "face-api.js";

const imageUpload = document.getElementById("upload-photos");

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models")
]).then(start);

async function start() {
  const container = document.createElement("div");
  container.style.position = "relative";
  document.body.append(container);
  const labeledFaceDescriptors = await loadLabeledImages();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
  let image;
  let canvas;
  document.body.append("Loaded");
  imageUpload.addEventListener("change", async () => {
    if (image) image.remove();
    if (canvas) canvas.remove();
    image = await faceapi.bufferToImage(imageUpload.files[0]);
    container.append(image);
    canvas = faceapi.createCanvasFromMedia(image);
    container.append(canvas);
    const displaySize = { width: image.width, height: image.height };
    faceapi.matchDimensions(canvas, displaySize);
    const detections = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const results = resizedDetections.map(d =>
      faceMatcher.findBestMatch(d.descriptor)
    );
    console.log(results);
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result.toString()
      });
      drawBox.draw(canvas);
    });
  });
}

function loadLabeledImages() {
  const labels = ["Stefano_Gabbana", "Donald_Trump", "Tom_Cruise"];
  return Promise.all(
    labels.map(async label => {
      const descriptions = [];
      for (let i = 1; i <= 1; i++) {
        const img = await faceapi.fetchImage(
          `https://raw.githubusercontent.com/jkruse8848/imageStore/main/lfw/${label}/${label}_000${i}.jpg`
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
