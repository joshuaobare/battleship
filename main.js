/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DOM.js":
/*!****************************!*\
  !*** ./src/modules/DOM.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enemyAttackDisplay": () => (/* binding */ enemyAttackDisplay),
/* harmony export */   "placeShipGrid": () => (/* binding */ placeShipGrid),
/* harmony export */   "playerAttackDisplay": () => (/* binding */ playerAttackDisplay),
/* harmony export */   "ships": () => (/* binding */ ships)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ "./src/modules/controller.js");
/* eslint-disable no-empty */


const pbSection = document.querySelector("#player-board");
const cbSection = document.querySelector("#computer-board");
const placeShipSection = document.querySelector("#placeShips");
const shipName = document.createElement("div");
const maindialog = document.querySelector("#main-dialog");
shipName.id = "shipName";
shipName.textContent = "Where will you place your patrol boat?";
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
    div.className = "cb-grid-item";
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
    griditems[x].setAttribute("data-coord", "[".concat(myArr[x], "]"));
  }
}

placeShipGrid();
const playerSquares = document.querySelectorAll(".ps-grid-item");

function populatePlayerBoard(playerSquares) {
  ships.forEach(ship => {
    ship.coord.forEach(coord => {
      occupiedSpots.push("[".concat(coord, "]"));
    });
  });
  playerSquares.forEach(square => {
    occupiedSpots.forEach(coord => {
      if (square.dataset.coord.toString() === coord.toString()) {
        square.style.backgroundColor = "grey";
      }
    });
  });
}

function playerAttackDisplay(obj, e) {
  const attackedSpots = obj.attackedSpots;
  const occupiedSpots = obj.occupiedSpots;
  const coordCheck1 = attackedSpots.some(coord => {
    return e.target.dataset.coord.toString() === "[".concat(coord.toString(), "]");
  });
  const coordCheck2 = occupiedSpots.some(coord => {
    return e.target.dataset.coord.toString() === "[".concat(coord.toString(), "]");
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
  playerSquares.forEach(square => {
    missedHits.forEach(coord => {
      if (square.dataset.coord.toString() === "[".concat(coord.toString(), "]")) {
        //console.log()
        square.style.backgroundColor = "lightskyblue";
      }
    });
  });
  playerSquares.forEach(square => {
    hitSpots.forEach(coord => {
      if (square.dataset.coord.toString() === "[".concat(coord.toString(), "]")) {
        square.style.backgroundColor = "red";
      }
    });
  });
}

function validateCoords(ship) {
  const playableSpotCheck = ship.coord.every(coord => {
    return playableSpots.some(coords => {
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
  const orientation = document.querySelector('input[name="orientation"]:checked').value;
  const coords = JSON.parse(e.target.dataset.coord);
  let patrol, submarine, destroyer, battleship, carrier;

  switch (count) {
    case 0:
      patrol = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("patrol", coords, orientation);

      if (!validateCoords(patrol)) {
        count += 1;
        return;
      } else {
        ships.push(patrol);
        populatePlayerBoard(playerSquares);
      }

      shipName.textContent = "Where will you place your submarine?";
      break;

    case 1:
      submarine = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("submarine", coords, orientation);

      if (!validateCoords(submarine)) {
        count += 1;
        return;
      } else {
        ships.push(submarine);
        populatePlayerBoard(playerSquares);
      }

      shipName.textContent = "Where will you place your destroyer?";
      break;

    case 2:
      destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("destroyer", coords, orientation);

      if (!validateCoords(destroyer)) {
        count += 1;
        return;
      } else {
        ships.push(destroyer);
        populatePlayerBoard(playerSquares);
      }

      shipName.textContent = "Where will you place your battleship?";
      break;

    case 3:
      battleship = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("battleship", coords, orientation);

      if (!validateCoords(battleship)) {
        count += 1;
        return;
      } else {
        ships.push(battleship);
        populatePlayerBoard(playerSquares);
      }

      shipName.textContent = "Where will you place your carrier?";
      break;

    case 4:
      carrier = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("carrier", coords, orientation);

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
    maindialog.close();
    createPlayerGrid();
    createEnemyGrid();
    (0,_controller__WEBPACK_IMPORTED_MODULE_1__.gameLoop)();
  }

  console.log(ships);
  count += 1;
}

playerSquares.forEach(square => {
  square.addEventListener("click", e => {
    createShips(e);
  }, {
    once: true
  });
});


/***/ }),

/***/ "./src/modules/controller.js":
/*!***********************************!*\
  !*** ./src/modules/controller.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameLoop": () => (/* binding */ gameLoop)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ "./src/modules/DOM.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");




const options = ["V", "H"];
const computerShips = [];
const playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__.Gameboard("computerboard");
const computerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__.Gameboard("playerboard");
const patrol = new _ship__WEBPACK_IMPORTED_MODULE_3__.Ship("patrol", [(0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9), (0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9)], options[Math.floor(Math.random() * options.length)]);
const submarine = new _ship__WEBPACK_IMPORTED_MODULE_3__.Ship("submarine", [(0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9), (0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9)], options[Math.floor(Math.random() * options.length)]);
const destroyer = new _ship__WEBPACK_IMPORTED_MODULE_3__.Ship("destroyer", [(0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9), (0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9)], options[Math.floor(Math.random() * options.length)]);
const battleship = new _ship__WEBPACK_IMPORTED_MODULE_3__.Ship("battleship", [(0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9), (0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9)], options[Math.floor(Math.random() * options.length)]);
const carrier = new _ship__WEBPACK_IMPORTED_MODULE_3__.Ship("carrier", [(0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9), (0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9)], options[Math.floor(Math.random() * options.length)]);
computerShips.push(patrol, submarine, destroyer, battleship, carrier);
/*

if(playerBoard.allShipsSunk() || computerBoard.allShipsSunk() ) {
    alert("Game's UP!")

    if(playerBoard.allShipsSunk()) {
        alert("Computer WINS")
    } else {
        alert("Human WINS")
    }
}
*/

const player = new _player__WEBPACK_IMPORTED_MODULE_1__.Player("Player 1", computerBoard);
const computer = new _player__WEBPACK_IMPORTED_MODULE_1__.Player("computer", playerBoard);

function gameLoop() {
  const enemySquares = document.querySelectorAll(".cb-grid-item");
  _DOM__WEBPACK_IMPORTED_MODULE_0__.ships.forEach(ship => {
    playerBoard.placeShip(ship);
  });
  computerShips.forEach(ship => {
    rcPlaceShip(computerBoard, ship);
  });
  console.log(computerBoard);
  enemySquares.forEach(square => {
    square.addEventListener("click", e => {
      //console.log(e.target.dataset.coord)
      winnerChecker();
      console.log(player.attackOpponent(JSON.parse(e.target.dataset.coord)));
      winnerChecker();
      console.log(computer.attackOpponent());
      winnerChecker();
      (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.playerAttackDisplay)(computerBoard, e);
      (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.enemyAttackDisplay)(playerBoard);
      console.log(computerBoard);
    }, {
      once: true
    });
  });
}

function winnerChecker() {
  if (playerBoard.allShipsSunk() || computerBoard.allShipsSunk()) {
    alert("Game's UP!");

    if (playerBoard.allShipsSunk()) {
      alert("Computer WINS");
    } else {
      alert("Human WINS");
    }
  }
}

function rcPlaceShip(gameboard, ship) {
  try {
    gameboard.placeShip(ship);
  } catch {
    try {
      const newShip = new _ship__WEBPACK_IMPORTED_MODULE_3__.Ship(ship.name, [(0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9), (0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9)], options[Math.floor(Math.random() * options.length)]);
      console.log(newShip);
      gameboard.placeShip(newShip);
    } catch {
      rcPlaceShip(gameboard, ship);
    }
  }
}



/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
//const Ship = require("./ship")
const Gameboard = function (name) {
  this.name = name;
  this.missedHit = [];
  this.ships = [];
  this.occupiedSpots = [];
  this.playableSpots = [];
  this.attackedSpots = [];
  this.hitSpots = [];

  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 9; y++) {
      this.playableSpots.push([y, x]);
    }
  }

  this.placeShip = ship => {
    const occupiedSpotCheck = ship.coord.some(coord => {
      return this.occupiedSpots.some(coords => {
        if (coord.toString() === coords.toString()) {
          return true;
        }
      });
    });
    const playableSpotCheck = ship.coord.every(coord => {
      return this.playableSpots.some(coords => {
        if (coord.toString() === coords.toString()) {
          return true;
        }
      });
    });
    const proximityCheck = ship.coord.some(coord => {
      return this.occupiedSpots.some(coords => {
        if ([coord[0], coord[1]].toString() === [coords[0] + 1, coords[1]].toString() || [coord[0], coord[1]].toString() === [coords[0], coords[1] + 1].toString() || [coord[0], coord[1]].toString() === [coords[0] + 1, coords[1] + 1].toString() || [coord[0], coord[1]].toString() === [coords[0] - 1, coords[1]].toString() || [coord[0], coord[1]].toString() === [coords[0], coords[1] - 1].toString() || [coord[0], coord[1]].toString() === [coords[0] - 1, coords[1] - 1].toString()) {
          return true;
        }
      });
    });

    if (occupiedSpotCheck) {
      throw "Ship coordinates are taken";
    } else if (!playableSpotCheck) {
      throw "Ship coordinates are out of bounds";
    } else if (proximityCheck && this.name.toString().toUpperCase() == "PLAYERBOARD") {
      throw "Ship too close";
    } else {
      this.ships.push(ship);
      ship.coord.forEach(point => {
        this.occupiedSpots.push(point);
      });
    }
  };

  this.receiveAttack = coords => {
    this.attackedSpots.push(coords);
    const index = this.playableSpots.findIndex(element => {
      return JSON.stringify(element) == JSON.stringify(coords);
    });
    this.playableSpots.splice(index, 1);
    const coordCheck = this.occupiedSpots.some(val => {
      if (val.toString() === coords.toString()) {
        return true;
      }
    });

    if (coordCheck) {
      const myShip = this.ships.find(ship => {
        return ship.coord.find(coord => {
          return coord.toString() === coords.toString();
        });
      });
      const index = myShip.coord.findIndex(val => {
        if (val.toString() === coords.toString()) {
          return true;
        }
      });
      myShip.hit(index);
      this.hitSpots.push(coords);
      return "Attack hit a ship";
    } else {
      this.missedHit.push(coords);
      return "Attack missed";
    }
  };

  this.allShipsSunk = () => {
    const decision = this.ships.every(ship => {
      if (ship.isSunk()) {
        return true;
      }
    });

    if (decision) {
      return true;
    } else {
      return false;
    }
  };
};
/*const ship = new Ship(3,[[2,2],[3,2],[2,5],[3,5]])
console.log(ship.coord)
function findIndex(x,y) {

    const index  = y.findIndex

} 

const ship = new Ship(4)
const shipCoords = [[2,2],[3,2],[2,5],[3,5]]
const gameboard = new Gameboard(ship,shipCoords)
//console.log(gameboard.playableSpots)

gameboard.receiveAttack([3,5])
gameboard.receiveAttack([2,2])
gameboard.receiveAttack([3,2])
gameboard.receiveAttack([2,5])
//console.log(gameboard.playableSpots)
//console.log(gameboard.allShipsSunk())*/




/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player),
/* harmony export */   "getRandomInt": () => (/* binding */ getRandomInt)
/* harmony export */ });
/* eslint-disable no-inner-declarations */
const Player = function (name, gameboard) {
  this.name = name.toUpperCase();
  this.gameboard = gameboard;

  this.attackOpponent = coord => {
    if (this.name === "COMPUTER") {
      const coordChecker = () => {
        const randCoord = [getRandomInt(0, 9), getRandomInt(0, 9)];
        const coordCheck = this.gameboard.playableSpots.some(val => {
          if (val.toString() === randCoord.toString()) {
            return true;
          }
        });

        if (!coordCheck) {
          this.gameboard.receiveAttack(randCoord);
        } else {
          const randCoord = [getRandomInt(0, 9), getRandomInt(0, 9)];
          this.gameboard.receiveAttack(randCoord);
        }

        console.log(randCoord);
      };

      coordChecker();
    } else {
      this.gameboard.receiveAttack(coord);
    }

    return "".concat(this.name, " attacked at ").concat(coord);
  };
};

function getRandomInt(max, min) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

 //module.exports = Player

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
const Ship = function (name, sC, orientation) {
  this.name = name;
  this.orientation = orientation;
  this.hitLocation = [];
  this.sC = sC;
  const orStr = orientation.toString().toUpperCase();

  switch (name.toString().toUpperCase()) {
    case "PATROL":
      this.length = 2;

      if (orStr === "H") {
        this.coord = [this.sC, [this.sC[0] + 1, this.sC[1]]];
      } else {
        this.coord = [this.sC, [this.sC[0], this.sC[1] + 1]];
      }

      break;

    case "SUBMARINE":
      this.length = 3;

      if (orStr === "H") {
        this.coord = [this.sC, [this.sC[0] + 1, this.sC[1]], [this.sC[0] + 2, this.sC[1]]];
      } else {
        this.coord = [this.sC, [this.sC[0], this.sC[1] + 1], [this.sC[0], this.sC[1] + 2]];
      }

      break;

    case "DESTROYER":
      this.length = 3;

      if (orStr === "H") {
        this.coord = [this.sC, [this.sC[0] + 1, this.sC[1]], [this.sC[0] + 2, this.sC[1]]];
      } else {
        this.coord = [this.sC, [this.sC[0], this.sC[1] + 1], [this.sC[0], this.sC[1] + 2]];
      }

      break;

    case "BATTLESHIP":
      this.length = 4;

      if (orStr === "H") {
        this.coord = [this.sC, [this.sC[0] + 1, this.sC[1]], [this.sC[0] + 2, this.sC[1]], [this.sC[0] + 3, this.sC[1]]];
      } else {
        this.coord = [this.sC, [this.sC[0], this.sC[1] + 1], [this.sC[0], this.sC[1] + 2], [this.sC[0], this.sC[1] + 3]];
      }

      break;

    case "CARRIER":
      this.length = 5;

      if (orStr === "H") {
        this.coord = [this.sC, [this.sC[0] + 1, this.sC[1]], [this.sC[0] + 2, this.sC[1]], [this.sC[0] + 3, this.sC[1]], [this.sC[0] + 4, this.sC[1]]];
      } else {
        this.coord = [this.sC, [this.sC[0], this.sC[1] + 1], [this.sC[0], this.sC[1] + 2], [this.sC[0], this.sC[1] + 3], [this.sC[0], this.sC[1] + 4]];
      }

      break;

    default:
      return "Invalid choice of ship";
  }

  this.hit = num => {
    this.hitLocation[num] = "X";
    this.length--;
    return "Ship is hit at point ".concat(num);
  };

  this.isSunk = () => {
    const hitCheck = this.hitLocation.filter(num => {
      if (num === "X") {
        return true;
      }
    });

    if (hitCheck && this.length == 0) {
      return true;
    } else {
      return false;
    }
  };
};



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  margin: 0;\n  overflow: hidden;\n}\n\nheader {\n  background-color: black;\n  color: white;\n  text-align: center;\n  padding: 2px;\n}\n.gameboards {\n  display: flex;\n  margin-top: 100px;\n}\n\n/*.player-board {\n    background-color: blue;\n\n}\n\n.computer-board {\n    background-color: maroon;\n}*/\n\n.player-board,\n.computer-board {\n  width: 100vw;\n  height: 100vh;\n}\n\n.pbSection-item,\n.cbSection-item {\n  width: 260px;\n  height: 260px;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n  justify-items: stretch;\n  align-items: stretch;\n}\n\n.cb-grid-item:hover,\n.ps-grid-item:hover {\n  cursor: pointer;\n  background-color: rgb(0, 0, 0, 0.1);\n}\n\n.pb-grid-item,\n.cb-grid-item,\n.ps-grid-item {\n  width: 25px;\n  height: 25px;\n  border: 0.1px solid black;\n}\n\nfooter {\n  background-color: black;\n  color: white;\n  position: fixed;\n  bottom: 0;\n  width: 100vw;\n  text-align: center;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,uBAAuB;EACvB,YAAY;EACZ,kBAAkB;EAClB,YAAY;AACd;AACA;EACE,aAAa;EACb,iBAAiB;AACnB;;AAEA;;;;;;;EAOE;;AAEF;;EAEE,YAAY;EACZ,aAAa;AACf;;AAEA;;EAEE,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,mCAAmC;EACnC,sBAAsB;EACtB,oBAAoB;AACtB;;AAEA;;EAEE,eAAe;EACf,mCAAmC;AACrC;;AAEA;;;EAGE,WAAW;EACX,YAAY;EACZ,yBAAyB;AAC3B;;AAEA;EACE,uBAAuB;EACvB,YAAY;EACZ,eAAe;EACf,SAAS;EACT,YAAY;EACZ,kBAAkB;AACpB","sourcesContent":["body {\n  margin: 0;\n  overflow: hidden;\n}\n\nheader {\n  background-color: black;\n  color: white;\n  text-align: center;\n  padding: 2px;\n}\n.gameboards {\n  display: flex;\n  margin-top: 100px;\n}\n\n/*.player-board {\n    background-color: blue;\n\n}\n\n.computer-board {\n    background-color: maroon;\n}*/\n\n.player-board,\n.computer-board {\n  width: 100vw;\n  height: 100vh;\n}\n\n.pbSection-item,\n.cbSection-item {\n  width: 260px;\n  height: 260px;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n  justify-items: stretch;\n  align-items: stretch;\n}\n\n.cb-grid-item:hover,\n.ps-grid-item:hover {\n  cursor: pointer;\n  background-color: rgb(0, 0, 0, 0.1);\n}\n\n.pb-grid-item,\n.cb-grid-item,\n.ps-grid-item {\n  width: 25px;\n  height: 25px;\n  border: 0.1px solid black;\n}\n\nfooter {\n  background-color: black;\n  color: white;\n  position: fixed;\n  bottom: 0;\n  width: 100vw;\n  text-align: center;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/DOM */ "./src/modules/DOM.js");
/* harmony import */ var _modules_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/controller */ "./src/modules/controller.js");



const maindialog = document.querySelector("#main-dialog");
maindialog.showModal();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFFQSxNQUFNMUYsVUFBVSxHQUFHTixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBbkI7QUFDQUssVUFBVSxDQUFDa0ksU0FBWCxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG5pbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5cbmNvbnN0IHBiU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyLWJvYXJkXCIpO1xuY29uc3QgY2JTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wdXRlci1ib2FyZFwiKTtcbmNvbnN0IHBsYWNlU2hpcFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYWNlU2hpcHNcIik7XG5jb25zdCBzaGlwTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5jb25zdCBtYWluZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLWRpYWxvZ1wiKVxuc2hpcE5hbWUuaWQgPSBcInNoaXBOYW1lXCI7XG5zaGlwTmFtZS50ZXh0Q29udGVudCA9IGBXaGVyZSB3aWxsIHlvdSBwbGFjZSB5b3VyIHBhdHJvbCBib2F0P2A7XG5cbmxldCBzaGlwcyA9IFtdO1xubGV0IG9jY3VwaWVkU3BvdHMgPSBbXTtcbmxldCBjb3VudCA9IDA7XG5sZXQgcGxheWFibGVTcG90cyA9IFtdO1xuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJHcmlkKCkge1xuICBjb25zdCBwZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgcGdyaWRDb250YWluZXIuY2xhc3NOYW1lID0gXCJwYlNlY3Rpb24taXRlbVwiO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk5OyB4KyspIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc05hbWUgPSBcInBiLWdyaWQtaXRlbVwiO1xuICAgIHBncmlkQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cblxuICBwYlNlY3Rpb24uYXBwZW5kQ2hpbGQocGdyaWRDb250YWluZXIpO1xuICBpZEdyaWRzKFwiLnBiLWdyaWQtaXRlbVwiKTtcbiAgY29uc3QgcGxheWVyU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGItZ3JpZC1pdGVtXCIpO1xuICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpO1xufVxuZnVuY3Rpb24gb3JpZW50YXRpb25Ub2dnbGUoKSB7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgY29uc3QgZmllbGRzZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XG4gIGNvbnN0IGxlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIik7XG4gIGxlZ2VuZC50ZXh0Q29udGVudCA9IFwiT3JpZW50YXRpb25cIjtcbiAgY29uc3QgdG9nZ2xlMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHRvZ2dsZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB2VG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBjb25zdCBoVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBjb25zdCBsYWJlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gIGNvbnN0IGxhYmVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgbGFiZWwxLmZvciA9IFwiVlwiO1xuICBsYWJlbDIuZm9yID0gXCJIXCI7XG4gIGxhYmVsMS50ZXh0Q29udGVudCA9IFwiVmVydGljYWw6IFwiO1xuICBsYWJlbDIudGV4dENvbnRlbnQgPSBcIkhvcml6b250YWw6IFwiO1xuICB2VG9nZ2xlLnR5cGUgPSBcInJhZGlvXCI7XG4gIHZUb2dnbGUuaWQgPSBcIlZcIjtcbiAgdlRvZ2dsZS52YWx1ZSA9IFwiVlwiO1xuICB2VG9nZ2xlLmNoZWNrZWQgPSB0cnVlO1xuICB2VG9nZ2xlLm5hbWUgPSBcIm9yaWVudGF0aW9uXCI7XG4gIGhUb2dnbGUudHlwZSA9IFwicmFkaW9cIjtcbiAgaFRvZ2dsZS5pZCA9IFwiSFwiO1xuICBoVG9nZ2xlLnZhbHVlID0gXCJIXCI7XG4gIGhUb2dnbGUubmFtZSA9IFwib3JpZW50YXRpb25cIjtcblxuICB0b2dnbGUxLmFwcGVuZENoaWxkKGxhYmVsMSk7XG4gIHRvZ2dsZTEuYXBwZW5kQ2hpbGQodlRvZ2dsZSk7XG4gIHRvZ2dsZTIuYXBwZW5kQ2hpbGQobGFiZWwyKTtcbiAgdG9nZ2xlMi5hcHBlbmRDaGlsZChoVG9nZ2xlKTtcbiAgZmllbGRzZXQuYXBwZW5kQ2hpbGQobGVnZW5kKTtcbiAgZmllbGRzZXQuYXBwZW5kQ2hpbGQodG9nZ2xlMSk7XG4gIGZpZWxkc2V0LmFwcGVuZENoaWxkKHRvZ2dsZTIpO1xuICBmb3JtLmFwcGVuZENoaWxkKGZpZWxkc2V0KTtcblxuICBwbGFjZVNoaXBTZWN0aW9uLmFwcGVuZENoaWxkKGZvcm0pO1xuICBwbGFjZVNoaXBTZWN0aW9uLmFwcGVuZENoaWxkKHNoaXBOYW1lKTtcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwR3JpZCgpIHtcbiAgY29uc3QgcGxTaGlwQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICBwbFNoaXBDb250YWluZXIuY2xhc3NOYW1lID0gXCJwYlNlY3Rpb24taXRlbVwiO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk5OyB4KyspIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc05hbWUgPSBcInBzLWdyaWQtaXRlbVwiO1xuICAgIHBsU2hpcENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG4gIG9yaWVudGF0aW9uVG9nZ2xlKCk7XG4gIHBsYWNlU2hpcFNlY3Rpb24uYXBwZW5kQ2hpbGQocGxTaGlwQ29udGFpbmVyKTtcbiAgaWRHcmlkcyhcIi5wcy1ncmlkLWl0ZW1cIik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVuZW15R3JpZCgpIHtcbiAgY29uc3QgY2dyaWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjZ3JpZENvbnRhaW5lci5jbGFzc05hbWUgPSBcImNiU2VjdGlvbi1pdGVtXCI7XG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk5OyB4KyspIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc05hbWUgPSBgY2ItZ3JpZC1pdGVtYDtcblxuICAgIGNncmlkQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cbiAgY2JTZWN0aW9uLmFwcGVuZENoaWxkKGNncmlkQ29udGFpbmVyKTtcbiAgaWRHcmlkcyhcIi5jYi1ncmlkLWl0ZW1cIik7XG59XG5cbmZ1bmN0aW9uIGlkR3JpZHMoc2VsZWN0b3IpIHtcbiAgY29uc3QgZ3JpZGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIGxldCBteUFyciA9IFtdO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IDk7IHkrKykge1xuICAgICAgbXlBcnIucHVzaChbeSwgeF0pO1xuICAgICAgcGxheWFibGVTcG90cy5wdXNoKFt5LCB4XSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDA7IHgrKykge1xuICAgIGdyaWRpdGVtc1t4XS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkXCIsIGBbJHtteUFyclt4XX1dYCk7XG4gIH1cbn1cbnBsYWNlU2hpcEdyaWQoKTtcbmNvbnN0IHBsYXllclNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBzLWdyaWQtaXRlbVwiKTtcblxuZnVuY3Rpb24gcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKSB7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmNvb3JkLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBvY2N1cGllZFNwb3RzLnB1c2goYFske2Nvb3JkfV1gKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcGxheWVyU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBvY2N1cGllZFNwb3RzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmQudG9TdHJpbmcoKSkge1xuICAgICAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmV5XCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwbGF5ZXJBdHRhY2tEaXNwbGF5KG9iaiwgZSkge1xuICBjb25zdCBhdHRhY2tlZFNwb3RzID0gb2JqLmF0dGFja2VkU3BvdHM7XG4gIGNvbnN0IG9jY3VwaWVkU3BvdHMgPSBvYmoub2NjdXBpZWRTcG90cztcblxuICBjb25zdCBjb29yZENoZWNrMSA9IGF0dGFja2VkU3BvdHMuc29tZSgoY29vcmQpID0+IHtcbiAgICByZXR1cm4gZS50YXJnZXQuZGF0YXNldC5jb29yZC50b1N0cmluZygpID09PSBgWyR7Y29vcmQudG9TdHJpbmcoKX1dYDtcbiAgfSk7XG4gIGNvbnN0IGNvb3JkQ2hlY2syID0gb2NjdXBpZWRTcG90cy5zb21lKChjb29yZCkgPT4ge1xuICAgIHJldHVybiBlLnRhcmdldC5kYXRhc2V0LmNvb3JkLnRvU3RyaW5nKCkgPT09IGBbJHtjb29yZC50b1N0cmluZygpfV1gO1xuICB9KTtcbiAgY29uc29sZS5sb2coY29vcmRDaGVjazEsIGNvb3JkQ2hlY2syKTtcbiAgY29uc29sZS5sb2coZS50YXJnZXQuZGF0YXNldC5jb29yZCk7XG5cbiAgaWYgKGNvb3JkQ2hlY2sxICYmIGNvb3JkQ2hlY2syKSB7XG4gICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcbiAgfSBlbHNlIGlmIChjb29yZENoZWNrMSAmJiAhY29vcmRDaGVjazIpIHtcbiAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0c2t5Ymx1ZVwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuZW15QXR0YWNrRGlzcGxheShvYmopIHtcbiAgY29uc3QgbWlzc2VkSGl0cyA9IG9iai5taXNzZWRIaXQ7XG4gIGNvbnN0IGhpdFNwb3RzID0gb2JqLmhpdFNwb3RzO1xuICBjb25zdCBwbGF5ZXJTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wYi1ncmlkLWl0ZW1cIik7XG5cbiAgcGxheWVyU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBtaXNzZWRIaXRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gYFske2Nvb3JkLnRvU3RyaW5nKCl9XWApIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygpXG4gICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0c2t5Ymx1ZVwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICBwbGF5ZXJTcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgIGhpdFNwb3RzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gYFske2Nvb3JkLnRvU3RyaW5nKCl9XWApIHtcbiAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUNvb3JkcyhzaGlwKSB7XG4gIGNvbnN0IHBsYXlhYmxlU3BvdENoZWNrID0gc2hpcC5jb29yZC5ldmVyeSgoY29vcmQpID0+IHtcbiAgICByZXR1cm4gcGxheWFibGVTcG90cy5zb21lKChjb29yZHMpID0+IHtcbiAgICAgIGlmIChjb29yZC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKHBsYXlhYmxlU3BvdENoZWNrKTtcbiAgaWYgKCFwbGF5YWJsZVNwb3RDaGVjaykge1xuICAgIGNvdW50LS07XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXBzKGUpIHtcbiAgY29uc3Qgb3JpZW50YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICdpbnB1dFtuYW1lPVwib3JpZW50YXRpb25cIl06Y2hlY2tlZCdcbiAgKS52YWx1ZTtcbiAgY29uc3QgY29vcmRzID0gSlNPTi5wYXJzZShlLnRhcmdldC5kYXRhc2V0LmNvb3JkKTtcbiAgbGV0IHBhdHJvbCwgc3VibWFyaW5lLCBkZXN0cm95ZXIsIGJhdHRsZXNoaXAsIGNhcnJpZXI7XG5cbiAgc3dpdGNoIChjb3VudCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHBhdHJvbCA9IG5ldyBTaGlwKFwicGF0cm9sXCIsIGNvb3Jkcywgb3JpZW50YXRpb24pO1xuXG4gICAgICBpZiAoIXZhbGlkYXRlQ29vcmRzKHBhdHJvbCkpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcHMucHVzaChwYXRyb2wpO1xuICAgICAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpO1xuICAgICAgfVxuXG4gICAgICBzaGlwTmFtZS50ZXh0Q29udGVudCA9IGBXaGVyZSB3aWxsIHlvdSBwbGFjZSB5b3VyIHN1Ym1hcmluZT9gO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOlxuICAgICAgc3VibWFyaW5lID0gbmV3IFNoaXAoXCJzdWJtYXJpbmVcIiwgY29vcmRzLCBvcmllbnRhdGlvbik7XG5cbiAgICAgIGlmICghdmFsaWRhdGVDb29yZHMoc3VibWFyaW5lKSkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGlwcy5wdXNoKHN1Ym1hcmluZSk7XG4gICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcyk7XG4gICAgICB9XG5cbiAgICAgIHNoaXBOYW1lLnRleHRDb250ZW50ID0gYFdoZXJlIHdpbGwgeW91IHBsYWNlIHlvdXIgZGVzdHJveWVyP2A7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBkZXN0cm95ZXIgPSBuZXcgU2hpcChcImRlc3Ryb3llclwiLCBjb29yZHMsIG9yaWVudGF0aW9uKTtcblxuICAgICAgaWYgKCF2YWxpZGF0ZUNvb3JkcyhkZXN0cm95ZXIpKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBzLnB1c2goZGVzdHJveWVyKTtcbiAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKTtcbiAgICAgIH1cbiAgICAgIHNoaXBOYW1lLnRleHRDb250ZW50ID0gYFdoZXJlIHdpbGwgeW91IHBsYWNlIHlvdXIgYmF0dGxlc2hpcD9gO1xuXG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6XG4gICAgICBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXCJiYXR0bGVzaGlwXCIsIGNvb3Jkcywgb3JpZW50YXRpb24pO1xuXG4gICAgICBpZiAoIXZhbGlkYXRlQ29vcmRzKGJhdHRsZXNoaXApKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBzLnB1c2goYmF0dGxlc2hpcCk7XG4gICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcyk7XG4gICAgICB9XG4gICAgICBzaGlwTmFtZS50ZXh0Q29udGVudCA9IGBXaGVyZSB3aWxsIHlvdSBwbGFjZSB5b3VyIGNhcnJpZXI/YDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIGNhcnJpZXIgPSBuZXcgU2hpcChcImNhcnJpZXJcIiwgY29vcmRzLCBvcmllbnRhdGlvbik7XG5cbiAgICAgIGlmICghdmFsaWRhdGVDb29yZHMoY2FycmllcikpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcHMucHVzaChjYXJyaWVyKTtcbiAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAoY291bnQgPT09IDQpIHtcbiAgICBtYWluZGlhbG9nLmNsb3NlKClcbiAgICBjcmVhdGVQbGF5ZXJHcmlkKCk7XG4gICAgY3JlYXRlRW5lbXlHcmlkKCk7XG4gICAgZ2FtZUxvb3AoKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgY291bnQgKz0gMTtcbn1cblxucGxheWVyU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgIChlKSA9PiB7XG4gICAgICBjcmVhdGVTaGlwcyhlKTtcbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9XG4gICk7XG59KTtcblxuXG5cbmV4cG9ydCB7IHNoaXBzLCBwbGF5ZXJBdHRhY2tEaXNwbGF5LCBlbmVteUF0dGFja0Rpc3BsYXksIHBsYWNlU2hpcEdyaWQgfTtcbiIsImltcG9ydCB7IHNoaXBzLCBwbGF5ZXJBdHRhY2tEaXNwbGF5LCBlbmVteUF0dGFja0Rpc3BsYXkgfSBmcm9tIFwiLi9ET01cIjtcbmltcG9ydCB7IGdldFJhbmRvbUludCwgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IG9wdGlvbnMgPSBbXCJWXCIsIFwiSFwiXTtcbmNvbnN0IGNvbXB1dGVyU2hpcHMgPSBbXTtcbmNvbnN0IHBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZChcImNvbXB1dGVyYm9hcmRcIik7XG5jb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZChcInBsYXllcmJvYXJkXCIpO1xuY29uc3QgcGF0cm9sID0gbmV3IFNoaXAoXG4gIFwicGF0cm9sXCIsXG4gIFtnZXRSYW5kb21JbnQoMCwgOSksIGdldFJhbmRvbUludCgwLCA5KV0sXG4gIG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5sZW5ndGgpXVxuKTtcbmNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKFxuICBcInN1Ym1hcmluZVwiLFxuICBbZ2V0UmFuZG9tSW50KDAsIDkpLCBnZXRSYW5kb21JbnQoMCwgOSldLFxuICBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKV1cbik7XG5jb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcChcbiAgXCJkZXN0cm95ZXJcIixcbiAgW2dldFJhbmRvbUludCgwLCA5KSwgZ2V0UmFuZG9tSW50KDAsIDkpXSxcbiAgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCldXG4pO1xuY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKFxuICBcImJhdHRsZXNoaXBcIixcbiAgW2dldFJhbmRvbUludCgwLCA5KSwgZ2V0UmFuZG9tSW50KDAsIDkpXSxcbiAgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCldXG4pO1xuY29uc3QgY2FycmllciA9IG5ldyBTaGlwKFxuICBcImNhcnJpZXJcIixcbiAgW2dldFJhbmRvbUludCgwLCA5KSwgZ2V0UmFuZG9tSW50KDAsIDkpXSxcbiAgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCldXG4pO1xuY29tcHV0ZXJTaGlwcy5wdXNoKHBhdHJvbCwgc3VibWFyaW5lLCBkZXN0cm95ZXIsIGJhdHRsZXNoaXAsIGNhcnJpZXIpO1xuXG4vKlxuXG5pZihwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSB8fCBjb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpICkge1xuICAgIGFsZXJ0KFwiR2FtZSdzIFVQIVwiKVxuXG4gICAgaWYocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgYWxlcnQoXCJDb21wdXRlciBXSU5TXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoXCJIdW1hbiBXSU5TXCIpXG4gICAgfVxufVxuKi9cblxuY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihcIlBsYXllciAxXCIsIGNvbXB1dGVyQm9hcmQpO1xuY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIiwgcGxheWVyQm9hcmQpO1xuXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgY29uc3QgZW5lbXlTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYi1ncmlkLWl0ZW1cIik7XG5cbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcChzaGlwKTtcbiAgfSk7XG5cbiAgY29tcHV0ZXJTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgcmNQbGFjZVNoaXAoY29tcHV0ZXJCb2FyZCwgc2hpcCk7XG4gIH0pO1xuICBjb25zb2xlLmxvZyhjb21wdXRlckJvYXJkKTtcblxuICBlbmVteVNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImNsaWNrXCIsXG4gICAgICAoZSkgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQuY29vcmQpXG4gICAgICAgIHdpbm5lckNoZWNrZXIoKVxuICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIuYXR0YWNrT3Bwb25lbnQoSlNPTi5wYXJzZShlLnRhcmdldC5kYXRhc2V0LmNvb3JkKSkpO1xuICAgICAgICB3aW5uZXJDaGVja2VyKClcbiAgICAgICAgY29uc29sZS5sb2coY29tcHV0ZXIuYXR0YWNrT3Bwb25lbnQoKSk7XG4gICAgICAgIHdpbm5lckNoZWNrZXIoKVxuICAgICAgICBwbGF5ZXJBdHRhY2tEaXNwbGF5KGNvbXB1dGVyQm9hcmQsIGUpO1xuICAgICAgICBlbmVteUF0dGFja0Rpc3BsYXkocGxheWVyQm9hcmQpO1xuICAgICAgICBjb25zb2xlLmxvZyhjb21wdXRlckJvYXJkKTtcbiAgICAgIH0sXG4gICAgICB7IG9uY2U6IHRydWUgfVxuICAgICk7XG4gIH0pO1xuXG4gIFxufVxuXG5mdW5jdGlvbiB3aW5uZXJDaGVja2VyKCl7XG4gICAgaWYgKHBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpIHx8IGNvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgYWxlcnQoXCJHYW1lJ3MgVVAhXCIpO1xuICAgIFxuICAgICAgICBpZiAocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgICBhbGVydChcIkNvbXB1dGVyIFdJTlNcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnQoXCJIdW1hbiBXSU5TXCIpO1xuICAgICAgICB9XG4gICAgICB9XG59XG5cblxuZnVuY3Rpb24gcmNQbGFjZVNoaXAoZ2FtZWJvYXJkLCBzaGlwKSB7XG4gIHRyeSB7XG4gICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwKTtcbiAgfSBjYXRjaCB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG5ld1NoaXAgPSBuZXcgU2hpcChcbiAgICAgICAgc2hpcC5uYW1lLFxuICAgICAgICBbZ2V0UmFuZG9tSW50KDAsIDkpLCBnZXRSYW5kb21JbnQoMCwgOSldLFxuICAgICAgICBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKV1cbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyhuZXdTaGlwKTtcbiAgICAgIGdhbWVib2FyZC5wbGFjZVNoaXAobmV3U2hpcCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByY1BsYWNlU2hpcChnYW1lYm9hcmQsIHNoaXApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBnYW1lTG9vcCB9O1xuIiwiLy9jb25zdCBTaGlwID0gcmVxdWlyZShcIi4vc2hpcFwiKVxuXG5jb25zdCBHYW1lYm9hcmQgPSBmdW5jdGlvbiAobmFtZSkge1xuICB0aGlzLm5hbWUgPSBuYW1lXG4gIHRoaXMubWlzc2VkSGl0ID0gW107XG4gIHRoaXMuc2hpcHMgPSBbXTtcbiAgdGhpcy5vY2N1cGllZFNwb3RzID0gW107XG4gIHRoaXMucGxheWFibGVTcG90cyA9IFtdO1xuICB0aGlzLmF0dGFja2VkU3BvdHMgPSBbXTtcbiAgdGhpcy5oaXRTcG90cyA9IFtdO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IDk7IHkrKykge1xuICAgICAgdGhpcy5wbGF5YWJsZVNwb3RzLnB1c2goW3ksIHhdKTtcbiAgICB9XG4gIH1cblxuICB0aGlzLnBsYWNlU2hpcCA9IChzaGlwKSA9PiB7XG4gICAgY29uc3Qgb2NjdXBpZWRTcG90Q2hlY2sgPSBzaGlwLmNvb3JkLnNvbWUoKGNvb3JkKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5vY2N1cGllZFNwb3RzLnNvbWUoKGNvb3JkcykgPT4ge1xuICAgICAgICBpZiAoY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwbGF5YWJsZVNwb3RDaGVjayA9IHNoaXAuY29vcmQuZXZlcnkoKGNvb3JkKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5wbGF5YWJsZVNwb3RzLnNvbWUoKGNvb3JkcykgPT4ge1xuICAgICAgICBpZiAoY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm94aW1pdHlDaGVjayA9IHNoaXAuY29vcmQuc29tZSgoY29vcmQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub2NjdXBpZWRTcG90cy5zb21lKChjb29yZHMpID0+IHtcbiAgICAgICAgICBpZiAoKFtjb29yZFswXSxjb29yZFsxXV0udG9TdHJpbmcoKSA9PT0gW2Nvb3Jkc1swXSsxLGNvb3Jkc1sxXV0udG9TdHJpbmcoKSkgfHxcbiAgICAgICAgICAoW2Nvb3JkWzBdLGNvb3JkWzFdXS50b1N0cmluZygpID09PSBbY29vcmRzWzBdLGNvb3Jkc1sxXSsxXS50b1N0cmluZygpKSB8fFxuICAgICAgICAgIChbY29vcmRbMF0sY29vcmRbMV1dLnRvU3RyaW5nKCkgPT09IFtjb29yZHNbMF0rMSxjb29yZHNbMV0rMV0udG9TdHJpbmcoKSkgfHxcbiAgICAgICAgICAoW2Nvb3JkWzBdLGNvb3JkWzFdXS50b1N0cmluZygpID09PSBbY29vcmRzWzBdLTEsY29vcmRzWzFdXS50b1N0cmluZygpKSB8fFxuICAgICAgICAgIChbY29vcmRbMF0sY29vcmRbMV1dLnRvU3RyaW5nKCkgPT09IFtjb29yZHNbMF0sY29vcmRzWzFdLTFdLnRvU3RyaW5nKCkpIHx8XG4gICAgICAgICAgKFtjb29yZFswXSxjb29yZFsxXV0udG9TdHJpbmcoKSA9PT0gW2Nvb3Jkc1swXS0xLGNvb3Jkc1sxXS0xXS50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKG9jY3VwaWVkU3BvdENoZWNrKSB7XG4gICAgICB0aHJvdyBcIlNoaXAgY29vcmRpbmF0ZXMgYXJlIHRha2VuXCI7XG4gICAgfSBlbHNlIGlmICghcGxheWFibGVTcG90Q2hlY2spIHtcbiAgICAgIHRocm93IFwiU2hpcCBjb29yZGluYXRlcyBhcmUgb3V0IG9mIGJvdW5kc1wiO1xuICAgIH0gZWxzZSBpZiAocHJveGltaXR5Q2hlY2sgJiYgdGhpcy5uYW1lLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKSA9PSBcIlBMQVlFUkJPQVJEXCIgKSB7XG4gICAgICAgIHRocm93IFwiU2hpcCB0b28gY2xvc2VcIlxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgICBzaGlwLmNvb3JkLmZvckVhY2goKHBvaW50KSA9PiB7XG4gICAgICAgIHRoaXMub2NjdXBpZWRTcG90cy5wdXNoKHBvaW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLnJlY2VpdmVBdHRhY2sgPSAoY29vcmRzKSA9PiB7XG4gICAgdGhpcy5hdHRhY2tlZFNwb3RzLnB1c2goY29vcmRzKTtcblxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wbGF5YWJsZVNwb3RzLmZpbmRJbmRleCgoZWxlbWVudCkgPT4ge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpID09IEpTT04uc3RyaW5naWZ5KGNvb3Jkcyk7XG4gICAgfSk7XG4gICAgdGhpcy5wbGF5YWJsZVNwb3RzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICBjb25zdCBjb29yZENoZWNrID0gdGhpcy5vY2N1cGllZFNwb3RzLnNvbWUoKHZhbCkgPT4ge1xuICAgICAgaWYgKHZhbC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChjb29yZENoZWNrKSB7XG4gICAgICBjb25zdCBteVNoaXAgPSB0aGlzLnNoaXBzLmZpbmQoKHNoaXApID0+IHtcbiAgICAgICAgcmV0dXJuIHNoaXAuY29vcmQuZmluZCgoY29vcmQpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGluZGV4ID0gbXlTaGlwLmNvb3JkLmZpbmRJbmRleCgodmFsKSA9PiB7XG4gICAgICAgIGlmICh2YWwudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBteVNoaXAuaGl0KGluZGV4KTtcbiAgICAgIHRoaXMuaGl0U3BvdHMucHVzaChjb29yZHMpO1xuXG4gICAgICByZXR1cm4gXCJBdHRhY2sgaGl0IGEgc2hpcFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pc3NlZEhpdC5wdXNoKGNvb3Jkcyk7XG5cbiAgICAgIHJldHVybiBcIkF0dGFjayBtaXNzZWRcIjtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5hbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgZGVjaXNpb24gPSB0aGlzLnNoaXBzLmV2ZXJ5KChzaGlwKSA9PiB7XG4gICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChkZWNpc2lvbikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG59O1xuXG4vKmNvbnN0IHNoaXAgPSBuZXcgU2hpcCgzLFtbMiwyXSxbMywyXSxbMiw1XSxbMyw1XV0pXG5jb25zb2xlLmxvZyhzaGlwLmNvb3JkKVxuZnVuY3Rpb24gZmluZEluZGV4KHgseSkge1xuXG4gICAgY29uc3QgaW5kZXggID0geS5maW5kSW5kZXhcblxufSBcblxuY29uc3Qgc2hpcCA9IG5ldyBTaGlwKDQpXG5jb25zdCBzaGlwQ29vcmRzID0gW1syLDJdLFszLDJdLFsyLDVdLFszLDVdXVxuY29uc3QgZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZChzaGlwLHNoaXBDb29yZHMpXG4vL2NvbnNvbGUubG9nKGdhbWVib2FyZC5wbGF5YWJsZVNwb3RzKVxuXG5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbMyw1XSlcbmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFsyLDJdKVxuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soWzMsMl0pXG5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbMiw1XSlcbi8vY29uc29sZS5sb2coZ2FtZWJvYXJkLnBsYXlhYmxlU3BvdHMpXG4vL2NvbnNvbGUubG9nKGdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkqL1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWlubmVyLWRlY2xhcmF0aW9ucyAqL1xuY29uc3QgUGxheWVyID0gZnVuY3Rpb24gKG5hbWUsIGdhbWVib2FyZCkge1xuICB0aGlzLm5hbWUgPSBuYW1lLnRvVXBwZXJDYXNlKCk7XG4gIHRoaXMuZ2FtZWJvYXJkID0gZ2FtZWJvYXJkO1xuXG4gIHRoaXMuYXR0YWNrT3Bwb25lbnQgPSAoY29vcmQpID0+IHtcbiAgICBpZiAodGhpcy5uYW1lID09PSBcIkNPTVBVVEVSXCIpIHtcbiAgICAgIGNvbnN0IGNvb3JkQ2hlY2tlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZENvb3JkID0gW2dldFJhbmRvbUludCgwLCA5KSwgZ2V0UmFuZG9tSW50KDAsIDkpXTtcblxuICAgICAgICBjb25zdCBjb29yZENoZWNrID0gdGhpcy5nYW1lYm9hcmQucGxheWFibGVTcG90cy5zb21lKCh2YWwpID0+IHtcbiAgICAgICAgICBpZiAodmFsLnRvU3RyaW5nKCkgPT09IHJhbmRDb29yZC50b1N0cmluZygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY29vcmRDaGVjaykge1xuICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmFuZENvb3JkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCByYW5kQ29vcmQgPSBbZ2V0UmFuZG9tSW50KDAsIDkpLCBnZXRSYW5kb21JbnQoMCwgOSldO1xuICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmFuZENvb3JkKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhyYW5kQ29vcmQpO1xuICAgICAgfTtcbiAgICAgIGNvb3JkQ2hlY2tlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkKTtcbiAgICB9XG4gICAgcmV0dXJuIGAke3RoaXMubmFtZX0gYXR0YWNrZWQgYXQgJHtjb29yZH1gO1xuICB9O1xufTtcblxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1heCwgbWluKSB7XG4gIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xufVxuXG5leHBvcnQgeyBnZXRSYW5kb21JbnQsIFBsYXllciB9O1xuXG4vL21vZHVsZS5leHBvcnRzID0gUGxheWVyXG4iLCJjb25zdCBTaGlwID0gZnVuY3Rpb24gKG5hbWUsIHNDLCBvcmllbnRhdGlvbikge1xuICB0aGlzLm5hbWUgPSBuYW1lO1xuICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gIHRoaXMuaGl0TG9jYXRpb24gPSBbXTtcbiAgdGhpcy5zQyA9IHNDO1xuXG4gIGNvbnN0IG9yU3RyID0gb3JpZW50YXRpb24udG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpO1xuXG4gIHN3aXRjaCAobmFtZS50b1N0cmluZygpLnRvVXBwZXJDYXNlKCkpIHtcbiAgICBjYXNlIFwiUEFUUk9MXCI6XG4gICAgICB0aGlzLmxlbmd0aCA9IDI7XG5cbiAgICAgIGlmIChvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLCBbdGhpcy5zQ1swXSArIDEsIHRoaXMuc0NbMV1dXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQywgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAxXV07XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiU1VCTUFSSU5FXCI6XG4gICAgICB0aGlzLmxlbmd0aCA9IDM7XG4gICAgICBpZiAob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbXG4gICAgICAgICAgdGhpcy5zQyxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDEsIHRoaXMuc0NbMV1dLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMiwgdGhpcy5zQ1sxXV0sXG4gICAgICAgIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAxXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDJdLFxuICAgICAgICBdO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiREVTVFJPWUVSXCI6XG4gICAgICB0aGlzLmxlbmd0aCA9IDM7XG5cbiAgICAgIGlmIChvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFtcbiAgICAgICAgICB0aGlzLnNDLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMSwgdGhpcy5zQ1sxXV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAyLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbXG4gICAgICAgICAgdGhpcy5zQyxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDFdLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMl0sXG4gICAgICAgIF07XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJCQVRUTEVTSElQXCI6XG4gICAgICB0aGlzLmxlbmd0aCA9IDQ7XG5cbiAgICAgIGlmIChvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFtcbiAgICAgICAgICB0aGlzLnNDLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMSwgdGhpcy5zQ1sxXV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAyLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDMsIHRoaXMuc0NbMV1dLFxuICAgICAgICBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFtcbiAgICAgICAgICB0aGlzLnNDLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAyXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDNdLFxuICAgICAgICBdO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiQ0FSUklFUlwiOlxuICAgICAgdGhpcy5sZW5ndGggPSA1O1xuXG4gICAgICBpZiAob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbXG4gICAgICAgICAgdGhpcy5zQyxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDEsIHRoaXMuc0NbMV1dLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMiwgdGhpcy5zQ1sxXV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAzLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDQsIHRoaXMuc0NbMV1dLFxuICAgICAgICBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFtcbiAgICAgICAgICB0aGlzLnNDLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAyXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDNdLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgNF0sXG4gICAgICAgIF07XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFwiSW52YWxpZCBjaG9pY2Ugb2Ygc2hpcFwiO1xuICB9XG5cbiAgdGhpcy5oaXQgPSAobnVtKSA9PiB7XG4gICAgdGhpcy5oaXRMb2NhdGlvbltudW1dID0gXCJYXCI7XG4gICAgdGhpcy5sZW5ndGgtLTtcblxuICAgIHJldHVybiBgU2hpcCBpcyBoaXQgYXQgcG9pbnQgJHtudW19YDtcbiAgfTtcblxuICB0aGlzLmlzU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBoaXRDaGVjayA9IHRoaXMuaGl0TG9jYXRpb24uZmlsdGVyKChudW0pID0+IHtcbiAgICAgIGlmIChudW0gPT09IFwiWFwiKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGhpdENoZWNrICYmIHRoaXMubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IHsgU2hpcCB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIG1hcmdpbjogMDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDJweDtcXG59XFxuLmdhbWVib2FyZHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIG1hcmdpbi10b3A6IDEwMHB4O1xcbn1cXG5cXG4vKi5wbGF5ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcblxcbn1cXG5cXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXJvb247XFxufSovXFxuXFxuLnBsYXllci1ib2FyZCxcXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnBiU2VjdGlvbi1pdGVtLFxcbi5jYlNlY3Rpb24taXRlbSB7XFxuICB3aWR0aDogMjYwcHg7XFxuICBoZWlnaHQ6IDI2MHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICBqdXN0aWZ5LWl0ZW1zOiBzdHJldGNoO1xcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XFxufVxcblxcbi5jYi1ncmlkLWl0ZW06aG92ZXIsXFxuLnBzLWdyaWQtaXRlbTpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCwgMC4xKTtcXG59XFxuXFxuLnBiLWdyaWQtaXRlbSxcXG4uY2ItZ3JpZC1pdGVtLFxcbi5wcy1ncmlkLWl0ZW0ge1xcbiAgd2lkdGg6IDI1cHg7XFxuICBoZWlnaHQ6IDI1cHg7XFxuICBib3JkZXI6IDAuMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBib3R0b206IDA7XFxuICB3aWR0aDogMTAwdnc7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxTQUFTO0VBQ1QsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsWUFBWTtBQUNkO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsaUJBQWlCO0FBQ25COztBQUVBOzs7Ozs7O0VBT0U7O0FBRUY7O0VBRUUsWUFBWTtFQUNaLGFBQWE7QUFDZjs7QUFFQTs7RUFFRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGFBQWE7RUFDYixzQ0FBc0M7RUFDdEMsbUNBQW1DO0VBQ25DLHNCQUFzQjtFQUN0QixvQkFBb0I7QUFDdEI7O0FBRUE7O0VBRUUsZUFBZTtFQUNmLG1DQUFtQztBQUNyQzs7QUFFQTs7O0VBR0UsV0FBVztFQUNYLFlBQVk7RUFDWix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLGVBQWU7RUFDZixTQUFTO0VBQ1QsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJib2R5IHtcXG4gIG1hcmdpbjogMDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDJweDtcXG59XFxuLmdhbWVib2FyZHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIG1hcmdpbi10b3A6IDEwMHB4O1xcbn1cXG5cXG4vKi5wbGF5ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcblxcbn1cXG5cXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXJvb247XFxufSovXFxuXFxuLnBsYXllci1ib2FyZCxcXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnBiU2VjdGlvbi1pdGVtLFxcbi5jYlNlY3Rpb24taXRlbSB7XFxuICB3aWR0aDogMjYwcHg7XFxuICBoZWlnaHQ6IDI2MHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICBqdXN0aWZ5LWl0ZW1zOiBzdHJldGNoO1xcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XFxufVxcblxcbi5jYi1ncmlkLWl0ZW06aG92ZXIsXFxuLnBzLWdyaWQtaXRlbTpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCwgMC4xKTtcXG59XFxuXFxuLnBiLWdyaWQtaXRlbSxcXG4uY2ItZ3JpZC1pdGVtLFxcbi5wcy1ncmlkLWl0ZW0ge1xcbiAgd2lkdGg6IDI1cHg7XFxuICBoZWlnaHQ6IDI1cHg7XFxuICBib3JkZXI6IDAuMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBib3R0b206IDA7XFxuICB3aWR0aDogMTAwdnc7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBcIi4vbW9kdWxlcy9ET01cIjtcbmltcG9ydCBcIi4vbW9kdWxlcy9jb250cm9sbGVyXCI7XG5cbmNvbnN0IG1haW5kaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tZGlhbG9nXCIpXG5tYWluZGlhbG9nLnNob3dNb2RhbCgpXG4iXSwibmFtZXMiOlsiU2hpcCIsImdhbWVMb29wIiwicGJTZWN0aW9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2JTZWN0aW9uIiwicGxhY2VTaGlwU2VjdGlvbiIsInNoaXBOYW1lIiwiY3JlYXRlRWxlbWVudCIsIm1haW5kaWFsb2ciLCJpZCIsInRleHRDb250ZW50Iiwic2hpcHMiLCJvY2N1cGllZFNwb3RzIiwiY291bnQiLCJwbGF5YWJsZVNwb3RzIiwiY3JlYXRlUGxheWVyR3JpZCIsInBncmlkQ29udGFpbmVyIiwiY2xhc3NOYW1lIiwieCIsImRpdiIsImFwcGVuZENoaWxkIiwiaWRHcmlkcyIsInBsYXllclNxdWFyZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicG9wdWxhdGVQbGF5ZXJCb2FyZCIsIm9yaWVudGF0aW9uVG9nZ2xlIiwiZm9ybSIsImZpZWxkc2V0IiwibGVnZW5kIiwidG9nZ2xlMSIsInRvZ2dsZTIiLCJ2VG9nZ2xlIiwiaFRvZ2dsZSIsImxhYmVsMSIsImxhYmVsMiIsImZvciIsInR5cGUiLCJ2YWx1ZSIsImNoZWNrZWQiLCJuYW1lIiwicGxhY2VTaGlwR3JpZCIsInBsU2hpcENvbnRhaW5lciIsImNyZWF0ZUVuZW15R3JpZCIsImNncmlkQ29udGFpbmVyIiwic2VsZWN0b3IiLCJncmlkaXRlbXMiLCJteUFyciIsInkiLCJwdXNoIiwic2V0QXR0cmlidXRlIiwiZm9yRWFjaCIsInNoaXAiLCJjb29yZCIsInNxdWFyZSIsImRhdGFzZXQiLCJ0b1N0cmluZyIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwicGxheWVyQXR0YWNrRGlzcGxheSIsIm9iaiIsImUiLCJhdHRhY2tlZFNwb3RzIiwiY29vcmRDaGVjazEiLCJzb21lIiwidGFyZ2V0IiwiY29vcmRDaGVjazIiLCJjb25zb2xlIiwibG9nIiwiZW5lbXlBdHRhY2tEaXNwbGF5IiwibWlzc2VkSGl0cyIsIm1pc3NlZEhpdCIsImhpdFNwb3RzIiwidmFsaWRhdGVDb29yZHMiLCJwbGF5YWJsZVNwb3RDaGVjayIsImV2ZXJ5IiwiY29vcmRzIiwiY3JlYXRlU2hpcHMiLCJvcmllbnRhdGlvbiIsIkpTT04iLCJwYXJzZSIsInBhdHJvbCIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsImJhdHRsZXNoaXAiLCJjYXJyaWVyIiwiY2xvc2UiLCJhZGRFdmVudExpc3RlbmVyIiwib25jZSIsImdldFJhbmRvbUludCIsIlBsYXllciIsIkdhbWVib2FyZCIsIm9wdGlvbnMiLCJjb21wdXRlclNoaXBzIiwicGxheWVyQm9hcmQiLCJjb21wdXRlckJvYXJkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwicGxheWVyIiwiY29tcHV0ZXIiLCJlbmVteVNxdWFyZXMiLCJwbGFjZVNoaXAiLCJyY1BsYWNlU2hpcCIsIndpbm5lckNoZWNrZXIiLCJhdHRhY2tPcHBvbmVudCIsImFsbFNoaXBzU3VuayIsImFsZXJ0IiwiZ2FtZWJvYXJkIiwibmV3U2hpcCIsIm9jY3VwaWVkU3BvdENoZWNrIiwicHJveGltaXR5Q2hlY2siLCJ0b1VwcGVyQ2FzZSIsInBvaW50IiwicmVjZWl2ZUF0dGFjayIsImluZGV4IiwiZmluZEluZGV4IiwiZWxlbWVudCIsInN0cmluZ2lmeSIsInNwbGljZSIsImNvb3JkQ2hlY2siLCJ2YWwiLCJteVNoaXAiLCJmaW5kIiwiaGl0IiwiZGVjaXNpb24iLCJpc1N1bmsiLCJjb29yZENoZWNrZXIiLCJyYW5kQ29vcmQiLCJtYXgiLCJtaW4iLCJjZWlsIiwic0MiLCJoaXRMb2NhdGlvbiIsIm9yU3RyIiwibnVtIiwiaGl0Q2hlY2siLCJmaWx0ZXIiLCJzaG93TW9kYWwiXSwic291cmNlUm9vdCI6IiJ9