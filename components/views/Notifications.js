import html from "html-literal";
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
            return `<div class="upload-container" id="upload-container">
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
            <img id="uploaded-photo" src="http://localhost:4040/upload_files/${upload.imagePath}" crossorigin='anonymous'/>
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
          <div class="returned-photos" id="returned-photo">
            <div class="loader" id="loader"></div>
            <p id="waiting-text">Results may take up to 30 seconds</p>
            <img id="returned-photos"/>
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
          <div class="match-results-container">
            <div class="loader" id="loader"></div>
            <p id="waiting-text">Results may take up to 30 seconds</p>
          </div>
        </div>
      </div>
      <script defer src="./facerec/face-api.min.js"></script>
      <script defer src="./facerec/index.js"></script>
    </div>`;
    })}
  </main>
`;
