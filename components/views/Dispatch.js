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
  </main>
`;
