import html from "html-literal";
import toddWike from "/assets/img/Todd_Wike_0001.jpg";
import tomCruise2 from "/assets/img/tomCruise2.jpeg";

export default state => html`
  <main>
    <div class="image-holder">
      <img src="${toddWike}" id="tensor-image" crossorigin="anonymous" />
    </div>
  </main>
`;
