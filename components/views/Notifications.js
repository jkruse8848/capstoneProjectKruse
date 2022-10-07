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
          <div class="upload-container">
            <div class="fas fa-inbox fa-lg" id="uploads-icon"></div>
            <div class="case-jus-holder">
              <div class="case-number-upload">
                <p>2022-05-0004</p>
              </div>
              <div class="justification-upload">
                <p>Robbery Occurred and Suspect was caught on camera</p>
              </div>
            </div>
            <div class="date-holder">
              <p>10/24/2022</p>
            </div>
          </div>
          <div class="upload-container">
            <div class="fas fa-inbox fa-lg" id="uploads-icon"></div>
            <div class="case-jus-holder">
              <div class="case-number-upload">
                <p>2022-05-0004</p>
              </div>
              <div class="justification-upload">
                <p>Robbery Occurred and Suspect was caught on camera</p>
              </div>
            </div>
            <div class="date-holder">
              <p>10/24/2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
`;
