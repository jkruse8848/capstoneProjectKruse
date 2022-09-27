import html from "html-literal";
import cayenne from "/assets/img/CayenneC2.png";

export default links => html`
<nav>
<i class="fas fa-bars fa-lg">
    <div>
        <div class="fas fa-home fa-lg" id="mobile-icon">
            <p id="nav-bar-text">HOME</p>
        </div>
        <p id="mobile-menu"><div class="fas fa-search" id="mobile-icon"></div>SEARCH</p>
        <p id="mobile-menu"><div class="fas fa-table" id="mobile-icon"></div>DOSSIER</p>
        <p id="mobile-menu"><div class="fas fa-bell" id="mobile-icon"></div>NOTIFICATIONS</p>
        <p id="mobile-menu"><div class="fas fa-info-circle" id="mobile-icon"></div>ABOUT</p>
        <p id="mobile-menu"><div class="fas fa-comment-alt" id="mobile-icon"></div>CONTACT</p>
        <p id="mobile-menu"><div class="fas fa-user-shield" id="mobile-icon"></div>USER PROFILE</p>
    </div>
</i>
<ul class="hidden--mobile">
<div id="logo">
    <img src="${cayenne}" id="logo-image">
      <p id="logo-text">CAYENNE</p>
    <div class="fas fa-angle-double-left fa-lg"></div>
</div>
<hr>
      ${links
        .map(
          link =>
            `<a href="/${link.title}" class="${link.class}" id="nav-icon" data-navigo>
              <p id="nav-bar-text">${link.text}</p>
            </a>`
        )
        .join("")}
    </ul>
  </nav>
`;
