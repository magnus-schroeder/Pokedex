const Pokedex = require("json-pokemon");
const rawInput = document.querySelector("#search");

rawInput.addEventListener("input", giveResults);

function giveResults(rawInput) {
  const searchInput = rawInput.target.value.toLowerCase();
  giveNameResults(searchInput);
}

function giveNameResults(searchInput) {
  const searchResults = Pokedex.filter((n) => {
    return n.name.toLowerCase().includes(searchInput);
  });
  addResultsToWebsite(searchResults);
  console.log(searchResults);
}

function addResultsToWebsite(searchResults) {
  clearResults(document.getElementById("results"));

  if (searchResults.length !== 809) {
    searchResults.forEach((result) => {
      const row = document.createElement("TR");
      row.setAttribute("id", "row");
      //    row.innerHTML = result.id;
      document.getElementById("results").appendChild(row);
      const tdId = document.createElement("TD");
      tdId.innerText = result.id;
      document.getElementById("row").appendChild(tdId);
      const tdName = document.createElement("TD");
      tdName.innerText = result.name;
      document.getElementById("row").appendChild(tdName);
      const tdType = document.createElement("TD");
      tdType.innerText = result.typeList;
      document.getElementById("row").appendChild(tdType);
    });
  }
}

function clearResults(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}
