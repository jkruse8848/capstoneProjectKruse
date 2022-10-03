import html from "html-literal";

export default state => html`
  <main>
    <div id="map"></div>
    <hr />
    <table id="cases">
      <tr id="tr-header">
        <th>Case Number</th>
        <th>Incident Location</th>
        <th>Incident Occurred</th>
        <th>Case Status</th>
        <th>Offense Description</th>
      </tr>
      ${state.cases
        .map(cases => {
          return `<tr><td>${cases.incident_number}</td><td>${cases.incident_location}</td><td>${cases.incident_occurred}</td><td>${cases.incident_status_description}</td><td>${cases.offense_description}</td></tr>`;
        })
        .join("")}
    </table>
  </main>
`;
