import html from "html-literal";
import mugShotImage from "/assets/img/mugshot-placeholder.webp";
import mapPlaceholder from "/assets/img/mapPlaceholder.png";

export default state => html`
<main>
<div class="dossier-all">
<div class="dossier-top">
${getInmate(state.individualInmate)}
        <div class="tabbed-information">
          <div class="bio-properties">
            <div class="booking-data-holder">
              <p>Booking Number:</p>
              <p>Booking Date:</p>
              <p>Release Date:</p>
              <p>Sentence Length:</p>
              <p>Holding Facility:</p>
              <p>Bond Amount:</p>
              <p>Bail Amount:</p>
              <p>Holding Agency:</p>
            </div>
            <div class="booking-data-holder">
              <p>Value</p>
              <p>Value</p>
              <p>Value</p>
              <p>Value</p>
              <p>Value</p>
              <p>Value</p>
              <p>Value</p>
              <p>Value</p>
            </div>
            <table class="bonds-table">
              <tr id="tr-header">
                <th>Bond Amount</th>
                <th>Bond Number</th>
                <th>Bond Type</th>
              </tr>
                <td>Bond Amount Value</td>
                <td>Bond Number Value</td>
                <td>Bond Type Value</td>
              <tr></tr>
            </table>
          </div>
          <table class="charges-table">
              <tr id="tr-header">
                <th>Charge Description</th>
                <th>Offense Date</th>
                <th>Docket Number</th>
                <th>Sentence Date</th>
                <th>Disposition</th>
                <th>Length</th>
                <th>Crime Class</th>
                <th>Court Date</th>
                <th>Arresting Agency</th>
              </tr>
                <td>Charge Description Value</td>
                <td>Offense Date Value</td>
                <td>Docket Number Value</td>
                <td>Sentence Date Value</td>
                <td>Disposition Value</td>
                <td>Length Value</td>
                <td>Crime Class Value</td>
                <td>Court Date Value</td>
                <td>Arresting Agency Value</td>
              <tr></tr>
            </table>
        </div>
        <div class="tabbed-information">
          <div class="bio-properties">
            <div class="bio-property-values">
              <p>Address:</p>
            </div>
            <div id="map"></div>
          </div>
        </div>
        <div class="tabbed-information">
          <div class="bio-properties">
            <div class="bio-property-values">
              <p>NOTES AND ACTIVITY PLACE HOLDER</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</div>
</main>`;

function getInmate(results) {
  if (results) {
    console.log("Results", results);
    console.log(results[0].fullname);
    let imageValue = results[0].fullname.replace(/ /g, "_");
    let heighInches = results[0].heightcentimeters * 0.393701;
    let heightrounded = Math.round(heighInches * 10) / 10;
    console.log(imageValue);
    return results
      .map(
        inmateResult =>
          `<div class="dossier-photo-container">
          <img id="dossier-mugshot" src="https://raw.githubusercontent.com/jkruse8848/imageStore/main/lfw/${imageValue}/${imageValue}_0001.jpg">
        </div>
        <div class="dossier-basic-bio-container">
          <div class="top-properties-container">
            <p>Name:</p>
            <p>Date of Birth:</p>
            <p>Last Provided Address:</p>
            <p>Last Provided Phone Number:</p>
            <p>Social Security Number:</p>
            <p>Inmate ID Number:</p>
          </div>
          <div class="top-property-values-container">
            <p>${inmateResult.fullname}</p>
            <p>${inmateResult.dob}</p>
            <p>${inmateResult.address}</p>
            <p>${inmateResult.phone}</p>
            <p>${inmateResult.ssn}</p>
            <p>${inmateResult.inmateid}</p>
          </div>
        </div>
      </div>
        <!-- Tab content -->
            <div class="tabbed-container">
              <div class="dossier-tabs">
                <h3 class="dos-tab-header active">Biographic Data</h3>
                <h3 class="dos-tab-header">Booking History</h3>
                <h3 class="dos-tab-header">Known Addresses</h3>
                <h3 class="dos-tab-header">Notes & Activity</h3>
              </div>
              <div class="tabbed-information active">
                <div class="bio-properties">
                  <div class="bio-property-values">
                    <p>Gender:</p>
                    <p>Age:</p>
                    <p>Reported Email:</p>
                    <p>Mother's Maiden:</p>
                    <p>Occupation:</p>
                  </div>
                  <div class="bio-property-values">
                    <p>${inmateResult.gender}</p>
                    <p>${inmateResult.age}</p>
                    <p>${inmateResult.email}</p>
                    <p>${inmateResult.mothersmaiden}</p>
                    <p>${inmateResult.occupation}</p>
                  </div>
                  <div class="bio-property-values">
                    <p>Employment:</p>
                    <p>Blood Type:</p>
                    <p>Weight:</p>
                    <p>Height:</p>
                  </div>
                  <div class="bio-property-values">
                    <p>${inmateResult.employmentcompany}</p>
                    <p>${inmateResult.bloodtype}</p>
                    <p>${inmateResult.weightpounds}</p>
                    <p>${heightrounded}</p>
                  </div>
                </div>
              </div>`
      )
      .join("");
  }
}
