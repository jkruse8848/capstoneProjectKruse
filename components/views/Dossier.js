import html from "html-literal";
import mugShotImage from "/assets/img/mugshot-placeholder.webp";
import mapPlaceholder from "/assets/img/mapPlaceholder.png";

export default state => html`
<main>
<div class="dossier-all">
<div class="dossier-top">
  <div class="dossier-photo-container">
    <img id="dossier-mugshot" src="${mugShotImage}">
  </div>
  <div class="dossier-basic-bio-container">
    <div class="top-properties-container">
      <p>Name:</p>
      <p>Known Aliases:</p>
      <p>Date of Birth:</p>
      <p>Last Provided Address:</p>
      <p>Last Provided Phone Number:</p>
      <p>Social Security Number:</p>
      <p>Inmate ID Number:</p>
    </div>
    <div class="top-property-values-container">
      <p>name</p>
      <p>alias</p>
      <p>dob</p>
      <p>lastAddress</p>
      <p>lastPhone</p>
      <p>SSN</p>
      <p>inmateID</p>
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
              <p>Gender:Value</p>
              <p>Age:Value</p>
              <p>Reported Email:Value</p>
              <p>Mother's Maiden:Value</p>
              <p>Occupation:Value</p>
            </div>
            <div class="bio-property-values">
              <p>Employment:</p>
              <p>Blood Type:</p>
              <p>Weight:</p>
              <p>Height:</p>
            </div>
            <div class="bio-property-values">
              <p>Employment:Value</p>
              <p>Blood Type:Value</p>
              <p>Weight:Value</p>
              <p>Height:Value</p>
            </div>
          </div>
        </div>
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
          </div>
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
