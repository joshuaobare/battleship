/* eslint-disable no-empty */
import { Ship } from "./ship";
import { gameLoop } from "./controller";

const pbSection = document.querySelector("#player-board");
const cbSection = document.querySelector("#computer-board");
const placeShipSection = document.querySelector("#placeShips");
const shipName = document.createElement("div");
shipName.id = "shipName";
shipName.textContent = `Where will you place your patrol boat?`;

let ships = [];
let occupiedSpots = [];
let count = 0;
let playableSpots = [];

function createPlayerGrid() {
  const pgridContainer = document.createElement("div");

  pgridContainer.className = "pbSection-item";

  for (let x = 0; x <= 99; x++) {
    const div = document.createElement("div");
    div.className = "pb-grid-item";
    pgridContainer.appendChild(div);
  }

  pbSection.appendChild(pgridContainer);
  idGrids(".pb-grid-item");
  const playerSquares = document.querySelectorAll(".pb-grid-item");
  populatePlayerBoard(playerSquares);
}
function orientationToggle() {
  const form = document.createElement("form");
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = "Orientation";
  const toggle1 = document.createElement("div");
  const toggle2 = document.createElement("div");
  const vToggle = document.createElement("input");
  const hToggle = document.createElement("input");
  const label1 = document.createElement("label");
  const label2 = document.createElement("label");
  label1.for = "V";
  label2.for = "H";
  label1.textContent = "Vertical: ";
  label2.textContent = "Horizontal: ";
  vToggle.type = "radio";
  vToggle.id = "V";
  vToggle.value = "V";
  vToggle.checked = true;
  vToggle.name = "orientation";
  hToggle.type = "radio";
  hToggle.id = "H";
  hToggle.value = "H";
  hToggle.name = "orientation";

  toggle1.appendChild(label1);
  toggle1.appendChild(vToggle);
  toggle2.appendChild(label2);
  toggle2.appendChild(hToggle);
  fieldset.appendChild(legend);
  fieldset.appendChild(toggle1);
  fieldset.appendChild(toggle2);
  form.appendChild(fieldset);

  placeShipSection.appendChild(form);
  placeShipSection.appendChild(shipName);
}

function placeShipGrid() {
  const plShipContainer = document.createElement("div");

  plShipContainer.className = "pbSection-item";

  for (let x = 0; x <= 99; x++) {
    const div = document.createElement("div");
    div.className = "ps-grid-item";
    plShipContainer.appendChild(div);
  }
  orientationToggle();
  placeShipSection.appendChild(plShipContainer);
  idGrids(".ps-grid-item");
}

function createEnemyGrid() {
  const cgridContainer = document.createElement("div");
  cgridContainer.className = "cbSection-item";
  for (let x = 0; x <= 99; x++) {
    const div = document.createElement("div");
    div.className = `cb-grid-item`;

    cgridContainer.appendChild(div);
  }
  cbSection.appendChild(cgridContainer);
  idGrids(".cb-grid-item");
}

function idGrids(selector) {
  const griditems = document.querySelectorAll(selector);
  let myArr = [];

  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 9; y++) {
      myArr.push([y, x]);
      playableSpots.push([y, x]);
    }
  }

  for (let x = 0; x < 100; x++) {
    griditems[x].setAttribute("data-coord", `[${myArr[x]}]`);
  }
}
placeShipGrid();
const playerSquares = document.querySelectorAll(".ps-grid-item");

function populatePlayerBoard(playerSquares) {
  ships.forEach((ship) => {
    ship.coord.forEach((coord) => {
      occupiedSpots.push(`[${coord}]`);
    });
  });

  playerSquares.forEach((square) => {
    occupiedSpots.forEach((coord) => {
      if (square.dataset.coord.toString() === coord.toString()) {
        square.style.backgroundColor = "grey";
      }
    });
  });
}

function playerAttackDisplay(obj, e) {
  const attackedSpots = obj.attackedSpots;
  const occupiedSpots = obj.occupiedSpots;

  const coordCheck1 = attackedSpots.some((coord) => {
    return e.target.dataset.coord.toString() === `[${coord.toString()}]`;
  });
  const coordCheck2 = occupiedSpots.some((coord) => {
    return e.target.dataset.coord.toString() === `[${coord.toString()}]`;
  });
  console.log(coordCheck1, coordCheck2);
  console.log(e.target.dataset.coord);

  if (coordCheck1 && coordCheck2) {
    e.target.style.backgroundColor = "red";
  } else if (coordCheck1 && !coordCheck2) {
    e.target.style.backgroundColor = "lightskyblue";
  }
}

function enemyAttackDisplay(obj) {
  const missedHits = obj.missedHit;
  const hitSpots = obj.hitSpots;
  const playerSquares = document.querySelectorAll(".pb-grid-item");

  playerSquares.forEach((square) => {
    missedHits.forEach((coord) => {
      if (square.dataset.coord.toString() === `[${coord.toString()}]`) {
        //console.log()
        square.style.backgroundColor = "lightskyblue";
      }
    });
  });

  playerSquares.forEach((square) => {
    hitSpots.forEach((coord) => {
      if (square.dataset.coord.toString() === `[${coord.toString()}]`) {
        square.style.backgroundColor = "red";
      }
    });
  });
}

function validateCoords(ship) {
  const playableSpotCheck = ship.coord.every((coord) => {
    return playableSpots.some((coords) => {
      if (coord.toString() === coords.toString()) {
        return true;
      }
    });
  });
  console.log(playableSpotCheck);
  if (!playableSpotCheck) {
    count--;
    return false;
  } else {
    return true;
  }
}

function createShips(e) {
  const orientation = document.querySelector(
    'input[name="orientation"]:checked'
  ).value;
  const coords = JSON.parse(e.target.dataset.coord);
  let patrol, submarine, destroyer, battleship, carrier;

  switch (count) {
    case 0:
      patrol = new Ship("patrol", coords, orientation);

      if (!validateCoords(patrol)) {
        count += 1;
        return;
      } else {
        ships.push(patrol);
        populatePlayerBoard(playerSquares);
      }

      shipName.textContent = `Where will you place your submarine?`;
      break;
    case 1:
      submarine = new Ship("submarine", coords, orientation);

      if (!validateCoords(submarine)) {
        count += 1;
        return;
      } else {
        ships.push(submarine);
        populatePlayerBoard(playerSquares);
      }

      shipName.textContent = `Where will you place your destroyer?`;
      break;
    case 2:
      destroyer = new Ship("destroyer", coords, orientation);

      if (!validateCoords(destroyer)) {
        count += 1;
        return;
      } else {
        ships.push(destroyer);
        populatePlayerBoard(playerSquares);
      }
      shipName.textContent = `Where will you place your battleship?`;

      break;
    case 3:
      battleship = new Ship("battleship", coords, orientation);

      if (!validateCoords(battleship)) {
        count += 1;
        return;
      } else {
        ships.push(battleship);
        populatePlayerBoard(playerSquares);
      }
      shipName.textContent = `Where will you place your carrier?`;
      break;
    case 4:
      carrier = new Ship("carrier", coords, orientation);

      if (!validateCoords(carrier)) {
        count += 1;
        return;
      } else {
        ships.push(carrier);
        populatePlayerBoard(playerSquares);
      }
      break;
    default:
      break;
  }
  if (count === 4) {
    createPlayerGrid();
    createEnemyGrid();
    gameLoop();
  }

  console.log(ships);
  count += 1;
}

playerSquares.forEach((square) => {
  square.addEventListener(
    "click",
    (e) => {
      createShips(e);
    },
    { once: true }
  );
});

/*
 */

export { ships, playerAttackDisplay, enemyAttackDisplay };
