import html from "html-literal";

export default links => html`
  <nav>
    <i class="fas fa-bars"></i>
    <ul class="hidden--mobile nav-links">
      ${links
        .map(
          link =>
            `<a href="/${link.title}" class="${link.class}" id="${link.id}" data-navigo>
              <p id="nav-bar-text">${link.text}</p>
            </a>`
        )
        .join("")}
    </ul>
  </nav>
`;
