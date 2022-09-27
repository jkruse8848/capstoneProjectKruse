import html from "html-literal";
import mugShotImage from "/assets/img/mugshot-placeholder.webp";

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
          <h3 class="active">Biographic Data</h3>
          <h3>Known Addresses</h3>
          <h3>Booking History</h3>
          <h3>Notes & Activity</h3>
        </div>
        <div class="tab-content">
          <div class="active">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              explicabo cum dolores hic possimus aut corrupti quisquam aperiam
              quia veniam inventore officiis nam error sunt libero, commodi
              architecto reiciendis qui fuga, itaque delectus quidem sequi.
              Impedit natus culpa nihil aperiam adipisci aliquam error, suscipit
              odio? Error sed esse perspiciatis quasi velit, ratione odit
              architecto? Explicabo pariatur.
            </p>
          </div>

          <div>
            <h4>Second Title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti,
              fugiat ab? Accusamus sed a iusto? Placeat incidunt repudiandae vero
              magnam nihil tempore quasi earum illum totam aut delectus aliquam
              pariatur, iste, qui provident quo voluptatem neque facere id
              laudantium aliquid numquam nisi accusantium. Inventore reiciendis
              nulla, iste perferendis.
            </p>
          </div>

          <div>
            <div class="dossier-tab-wrapper">
              <div class="booking-history-container">
                <div class="bond-booking-properties">
                  <div class="booking-properties">
                    <p>Booking Number:</p>
                    <p>Booking Date:</p>
                    <p>Release Date:</p>
                    <p>Prisoner Type:</p>
                    <p>Housing Facility:</p>
                    <p>Total Bond Amount:</p>
                    <p>Total Bail Amount:</p>
                    <p>Booking Origin:</p>
                  </div>
                  <div class="booking-property-values">
                    <p>inmate.bookingNumber</p>
                    <p>inmate.bookingDate</p>
                    <p>inmate.releaseDate</p>
                    <p>inmate.prisonerType</p>
                    <p>inmate.facility</p>
                    <p>inmate.boundAmount</p>
                    <p>inmate.bailAmount</p>
                    <p>inmate.agency</p>
                  </div>
                  <table class="bond-table">
                    <tr id="tr-header">
                      <th>Bond Number</th>
                      <th>Bond Type</th>
                      <th>Bond Amount</th>
                    </tr>
                    <tr>
                      <td>inmate.bondNumber</td>
                      <td>inmate.bondType</td>
                      <td>inmate.bondAmount</td>
                    </tr>
                  </table>
                </div>
                  <div class="charge-table-container">
                    <table class="charge-table">
                      <tr id="tr-header">
                        <th>Charge Description</th>
                        <th>Offense Date</th>
                        <th>Docket Number</th>
                        <th>Sentence Date</th>
                        <th>Disposition</th>
                        <th>Sentence Length</th>
                        <th>Crime Class</th>
                        <th>Court Date</th>
                        <th>Arresting Agency</th>
                      </tr>
                      <tr>
                        <td>inmate.chargeDescription</td>
                        <td>inmate.offenseDate</td>
                        <td>inmate.docketNumber</td>
                        <td>inmate.sentenceDate</td>
                        <td>inmate.disposition</td>
                        <td>inmate.sentenceLength</td>
                        <td>inmate.crimeClass</td>
                        <td>inmate.courtDate</td>
                        <td>inmate.arrestingAgency</td>
                      </tr>
                    </table>
                  </div>
                  <hr id="table-separator">
              </div>
            </div>
          </div>

          <div>
            <h4>Fourth Title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
              autem accusantium voluptate debitis ipsa animi aliquid dolore?
              Suscipit consequatur architecto ullam perferendis praesentium sed
              aliquid voluptatem quibusdam laborum, doloremque aut atque debitis
              et laudantium qui veniam eligendi accusamus ipsam optio, assumenda
              aliquam ipsum dolorem similique?
            </p>
          </div>
        </div>
      </div>
</div>
</div>
</main>`;
