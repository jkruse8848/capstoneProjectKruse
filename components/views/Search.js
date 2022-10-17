import html from "html-literal";
import toddwike from "../../assets/img/Todd_Wike_0001.jpg";

export default state => html`
  <div class="search-all-container">
    <div class="search-header">
      <h3>Your Search for _blank_ Returned _blank_ Results</h3>
    </div>
    <table id="search-table">
      <tr id="tr-header-search">
        <th id="table-search">Photo</th>
        <th id="table-search">Name</th>
        <th id="table-search">Address</th>
        <th id="table-search">Age</th>
        <th id="table-search">SSN</th>
        <th id="table-search">Inmate ID</th>
      </tr>
      ${checkSearch(state.searchResults)}
    </table>
  </div>
`;

function checkSearch(results) {
  if (results) {
    console.log("Results", results);
    console.log(results[0][0].fullname);
    let imageValue = results[0][0].fullname.replace(/ /g, "_");
    console.log(imageValue);
    return results[0]
      .map(
        searchResult =>
          `<tr id="search-tr"><td id="search-td"><img src="https://raw.githubusercontent.com/jkruse8848/imageStore/main/lfw/${imageValue}/${imageValue}_0001.jpg" id="search-photo" /></td>
    <td id="search-td">${searchResult.fullname}</td>
    <td id="search-td">${searchResult.address}</td>
    <td id="search-td">${searchResult.age}</td>
    <td id="search-td">${searchResult.ssn}</td>
    <td id="search-td">${searchResult.inmateid}</td></tr>`
      )
      .join("");
  }
}
