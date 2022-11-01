import html from "html-literal";

export default state => html`
  <main>
    <div class="mapbox-flex">
      <div id="map"></div>
    </div>
    <div class="case-data">
      <div class="filter-holder">
        <div class="fas fa-filter" id="media-icon"></div>
        <p>Filter Cases:</p>
        <input
          class="table-filter"
          type="text"
          id="case-table-filter"
          placeholder="Search by Offense Description or Case Number..."
        />
      </div>
      <table id="cases">
        <tr id="tr-header">
          <th>Case Number</th>
          <th>Incident Location</th>
          <th>Incident Occurred</th>
          <th>Case Status</th>
          <th>Offense Description</th>
          <th>Submit</th>
        </tr>
        <tbody id="case-body">
          ${state.caseData
            .map(cases => {
              return `<tr><td id="case-test">${cases.incident_number}</td><td>${cases.incident_location}</td><td>${cases.incident_occurred}</td><td>${cases.incident_status_description}</td><td>${cases.offense_description}</td><td><button class="case-submit" id="process-case">Process Case</button></td></tr>`;
            })
            .join("")}
        </tbody>
      </table>
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
