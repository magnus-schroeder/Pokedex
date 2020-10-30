const Pokedex = require("json-pokemon");
const rawInput = document.querySelector("#search");

function giveResults(rawInput) {
  const searchInput = rawInput.target.value.toLowerCase();
  const allTypes = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy"
  ];
  if (isNaN(searchInput)) {
    const inputArray = searchInput.toLowerCase().split(" ");
    if (allTypes.includes(inputArray[0]) & (inputArray.length <= 2)) {
      addResultsToWebsite(giveTypeResults(inputArray));
    } else {
      addResultsToWebsite(giveNameResults(searchInput));
    }
  } else {
    addResultsToWebsite(giveIdResults(searchInput));
  }
}

function giveNameResults(searchInput) {
  return Pokedex.filter((n) => {
    return n.name.toLowerCase().includes(searchInput);
  });
}

function giveTypeResults(inputArray) {
  const results = filter(Pokedex, inputArray[0]);
  if (inputArray.length === 2) {
    return filter(results, inputArray[1]);
  }
  return results;
}

function filter(unfiltered, filter) {
  return unfiltered.filter((n) => {
    const types = n.typeList.map((type) => {
      return type.toLowerCase();
    });
    return types.includes(filter);
  });
}

function giveIdResults(searchInput) {
  return Pokedex.filter((n) => {
    const stringId = n.id + "";
    return stringId.includes(searchInput);
  });
}

function addResultsToWebsite(searchResults) {
  const objectKeys = ["id", "name", "typeList"];
  clearResults(document.getElementById("results"));
  if (searchResults.length !== 809) {
    createFirstRow();
    searchResults.forEach((result) => {
      const id = createRow(result);
      addSprite(result, id);
      objectKeys.forEach((key) => {
        const td = document.createElement("TD");
        td.setAttribute("id", key + result.id);
        td.setAttribute("class", key);
        if (key === "typeList" && result[key].length === 2) {
          td.innerText = result[key][0] + " " + result[key][1];
        } else {
          td.innerText = result[key];
        }
        document.getElementById(id).appendChild(td);
      });
    });
  }
}

function createFirstRow() {
  const result = { id: "First" };
  const tableKeys = ["Sprite", "Id", "Name", "Type(s)"];
  createRow(result);
  tableKeys.forEach((key) => {
    const td = document.createElement("TD");
    td.setAttribute("id", key);
    td.innerText = key;
    document.getElementById("rowFirst").appendChild(td);
  });
}

function createRow(result) {
  const id = "row" + result.id;
  const row = document.createElement("TR");
  row.setAttribute("id", id);
  row.setAttribute("class", "resultrow");
  document.getElementById("results").appendChild(row);
  return id;
}

function addSprite(result, id) {
  const img = document.createElement("IMG");
  img.setAttribute("src", "/img/sprites/" + result.id + ".png");
  img.setAttribute("height", "40px");
  img.setAttribute("class", "sprite");
  document.getElementById(id).appendChild(img);
}

function clearResults(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

rawInput.addEventListener("input", giveResults);
