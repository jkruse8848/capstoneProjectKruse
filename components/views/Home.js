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
          <a href="/Guide" class="help-item">
            <div class="fas fa-file-alt fa-2x" id="media-icon"></div>
            <p>User Guide</p>
          </a>
        </div>
      </h3>
    </div>
    <div class="search-container">
      <p>Upload Photo to Perform Facial Recognition:</p>
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
        <div class="results-display">
          ${state.uploads.map(upload => {
            return `
          <div class="upload-container" id="upload-container">
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
      <div class="results-sub-container">
        <div class="fas fa-search fa-2x" id="results-banner">
          <p>Recently Viewed</p>
        </div>
        <div class="results-display"></div>
      </div>
    </div>
    <!-- Upload Modal -->
    <form
      id="upload-modal"
      class="upload-modal"
      method="POST"
      enctype="multipart/form-data"
      action="/images"
    >
      <!-- Upload Modal content -->
      <div class="upload-modal-content">
        <span class="fas fa-window-close fa-2x" id="modal-close"></span>
        <label id="contact-form-input"
          >Case Number:
          <input type="text" name="casenumber" id="media-modal-casenumber" />
        </label>
        <label id="contact-form-input"
          >Justification:
          <input
            type="text"
            name="justification"
            id="media-modal-justification"
          />
        </label>
        <label id="contact-form-input"
          >Submission Date:
          <input type="text" name="dateofupload" id="media-modal-date" />
        </label>
        <label id="contact-form-input"
          >Upload file:
          <input type="file" name="recfile" id="media-modal-upload-file" />
        </label>
        <button type="submit" name="submit" id="media-modal-submit">
          Submit
        </button>
      </div>
    </form>
  </main>
`;
