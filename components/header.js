import html from "html-literal";

export default state => html`
  <header>
    <div class="border-maker">
      <div class="fas fa-search fa-lg" id="header-search"></div>
      <input
        type="search"
        id="site-search"
        name="q"
        placeholder="Run Your Search Here..."
      />
      <div class="fas fa-filter fa-lg" id="header-search2"></div>
    </div>
  </header>
`;
