import html from "html-literal";

export default state => html`
  <main>
    <div class="top-buffer"></div>
    <div class="welcome-box">
      <h3>
        Hi Joseph, Welcome to Cayenne for Law Enforcement
        <div class="help-box">
          <div class="help-item">
            <div class="fas fa-comment-alt fa-2x" id="media-icon"></div>
            <p>Contact</p>
          </div>
          <div class="help-item">
            <div class="fas fa-chalkboard-teacher fa-2x" id="media-icon"></div>
            <p>Training</p>
          </div>
          <a href="/Guide.html" class="help-item">
            <div class="fas fa-file-alt fa-2x" id="media-icon"></div>
            <p>User Guide</p>
          </a>
        </div>
      </h3>
    </div>
    <div class="search-container">
      <p>Upload Photos or Video to Perform Facial Recognition:</p>
    </div>
    <div class="home-separator"></div>
    <div class="media-holder">
      <div class="media-upload" id="media-upload">
        <div class="fas fa-file-upload fa-2x" id="media-icon"></div>
        <p>Upload Media</p>
      </div>
    </div>
    <div class="home-separator"></div>
    <div class="results-container">
      <div class="results-sub-container">
        <div class="fas fa-bell fa-2x" id="results-banner">
          <p>Notifications</p>
        </div>
        <div class="results-display"></div>
      </div>
      <div class="results-sub-container">
        <div class="fas fa-search fa-2x" id="results-banner">
          <p>Recently Viewed</p>
        </div>
        <div class="results-display"></div>
      </div>
    </div>
    <!-- Upload Modal -->
    <div id="upload-modal" class="upload-modal">
      <!-- Upload Modal content -->
      <div class="upload-modal-content">
        <span class="fas fa-window-close fa-2x" id="modal-close"></span>
        <label id="contact-form-input"
          >Case Number:
          <input type="text" name="subject" id="media-modal-casenumber" />
        </label>
        <label id="contact-form-input"
          >Justification:
          <input type="text" name="subject" id="media-modal-justification" />
        </label>
        <label id="contact-form-input"
          >Upload file:
          <input type="file" name="upload" id="media-modal-upload-file" />
        </label>
        <button type="submit" id="media-modal-submit">Submit</button>
      </div>
    </div>
  </main>
`;
