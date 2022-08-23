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
/*
 */



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
const playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__.Gameboard();
const computerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__.Gameboard();
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
      console.log(player.attackOpponent(JSON.parse(e.target.dataset.coord)));
      console.log(computer.attackOpponent());
      (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.playerAttackDisplay)(computerBoard, e);
      (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.enemyAttackDisplay)(playerBoard);
      console.log(computerBoard);
    }, {
      once: true
    });
  });

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
const Gameboard = function () {
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

    if (occupiedSpotCheck) {
      throw "Ship coordinates are taken";
    } else if (!playableSpotCheck) {
      throw "Ship coordinates are out of bounds";
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



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQSxNQUFNRSxTQUFTLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixlQUF2QixDQUFsQjtBQUNBLE1BQU1DLFNBQVMsR0FBR0YsUUFBUSxDQUFDQyxhQUFULENBQXVCLGlCQUF2QixDQUFsQjtBQUNBLE1BQU1FLGdCQUFnQixHQUFHSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBekI7QUFDQSxNQUFNRyxRQUFRLEdBQUdKLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUFqQjtBQUNBRCxRQUFRLENBQUNFLEVBQVQsR0FBYyxVQUFkO0FBQ0FGLFFBQVEsQ0FBQ0csV0FBVDtBQUVBLElBQUlDLEtBQUssR0FBRyxFQUFaO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLEVBQXBCO0FBQ0EsSUFBSUMsS0FBSyxHQUFHLENBQVo7QUFDQSxJQUFJQyxhQUFhLEdBQUcsRUFBcEI7O0FBRUEsU0FBU0MsZ0JBQVQsR0FBNEI7RUFDMUIsTUFBTUMsY0FBYyxHQUFHYixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdkI7RUFFQVEsY0FBYyxDQUFDQyxTQUFmLEdBQTJCLGdCQUEzQjs7RUFFQSxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLElBQUksRUFBckIsRUFBeUJBLENBQUMsRUFBMUIsRUFBOEI7SUFDNUIsTUFBTUMsR0FBRyxHQUFHaEIsUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQVo7SUFDQVcsR0FBRyxDQUFDRixTQUFKLEdBQWdCLGNBQWhCO0lBQ0FELGNBQWMsQ0FBQ0ksV0FBZixDQUEyQkQsR0FBM0I7RUFDRDs7RUFFRGpCLFNBQVMsQ0FBQ2tCLFdBQVYsQ0FBc0JKLGNBQXRCO0VBQ0FLLE9BQU8sQ0FBQyxlQUFELENBQVA7RUFDQSxNQUFNQyxhQUFhLEdBQUduQixRQUFRLENBQUNvQixnQkFBVCxDQUEwQixlQUExQixDQUF0QjtFQUNBQyxtQkFBbUIsQ0FBQ0YsYUFBRCxDQUFuQjtBQUNEOztBQUNELFNBQVNHLGlCQUFULEdBQTZCO0VBQzNCLE1BQU1DLElBQUksR0FBR3ZCLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixNQUF2QixDQUFiO0VBQ0EsTUFBTW1CLFFBQVEsR0FBR3hCLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixVQUF2QixDQUFqQjtFQUNBLE1BQU1vQixNQUFNLEdBQUd6QixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZjtFQUNBb0IsTUFBTSxDQUFDbEIsV0FBUCxHQUFxQixhQUFyQjtFQUNBLE1BQU1tQixPQUFPLEdBQUcxQixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7RUFDQSxNQUFNc0IsT0FBTyxHQUFHM0IsUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0VBQ0EsTUFBTXVCLE9BQU8sR0FBRzVCLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixPQUF2QixDQUFoQjtFQUNBLE1BQU13QixPQUFPLEdBQUc3QixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBaEI7RUFDQSxNQUFNeUIsTUFBTSxHQUFHOUIsUUFBUSxDQUFDSyxhQUFULENBQXVCLE9BQXZCLENBQWY7RUFDQSxNQUFNMEIsTUFBTSxHQUFHL0IsUUFBUSxDQUFDSyxhQUFULENBQXVCLE9BQXZCLENBQWY7RUFDQXlCLE1BQU0sQ0FBQ0UsR0FBUCxHQUFhLEdBQWI7RUFDQUQsTUFBTSxDQUFDQyxHQUFQLEdBQWEsR0FBYjtFQUNBRixNQUFNLENBQUN2QixXQUFQLEdBQXFCLFlBQXJCO0VBQ0F3QixNQUFNLENBQUN4QixXQUFQLEdBQXFCLGNBQXJCO0VBQ0FxQixPQUFPLENBQUNLLElBQVIsR0FBZSxPQUFmO0VBQ0FMLE9BQU8sQ0FBQ3RCLEVBQVIsR0FBYSxHQUFiO0VBQ0FzQixPQUFPLENBQUNNLEtBQVIsR0FBZ0IsR0FBaEI7RUFDQU4sT0FBTyxDQUFDTyxPQUFSLEdBQWtCLElBQWxCO0VBQ0FQLE9BQU8sQ0FBQ1EsSUFBUixHQUFlLGFBQWY7RUFDQVAsT0FBTyxDQUFDSSxJQUFSLEdBQWUsT0FBZjtFQUNBSixPQUFPLENBQUN2QixFQUFSLEdBQWEsR0FBYjtFQUNBdUIsT0FBTyxDQUFDSyxLQUFSLEdBQWdCLEdBQWhCO0VBQ0FMLE9BQU8sQ0FBQ08sSUFBUixHQUFlLGFBQWY7RUFFQVYsT0FBTyxDQUFDVCxXQUFSLENBQW9CYSxNQUFwQjtFQUNBSixPQUFPLENBQUNULFdBQVIsQ0FBb0JXLE9BQXBCO0VBQ0FELE9BQU8sQ0FBQ1YsV0FBUixDQUFvQmMsTUFBcEI7RUFDQUosT0FBTyxDQUFDVixXQUFSLENBQW9CWSxPQUFwQjtFQUNBTCxRQUFRLENBQUNQLFdBQVQsQ0FBcUJRLE1BQXJCO0VBQ0FELFFBQVEsQ0FBQ1AsV0FBVCxDQUFxQlMsT0FBckI7RUFDQUYsUUFBUSxDQUFDUCxXQUFULENBQXFCVSxPQUFyQjtFQUNBSixJQUFJLENBQUNOLFdBQUwsQ0FBaUJPLFFBQWpCO0VBRUFyQixnQkFBZ0IsQ0FBQ2MsV0FBakIsQ0FBNkJNLElBQTdCO0VBQ0FwQixnQkFBZ0IsQ0FBQ2MsV0FBakIsQ0FBNkJiLFFBQTdCO0FBQ0Q7O0FBRUQsU0FBU2lDLGFBQVQsR0FBeUI7RUFDdkIsTUFBTUMsZUFBZSxHQUFHdEMsUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQXhCO0VBRUFpQyxlQUFlLENBQUN4QixTQUFoQixHQUE0QixnQkFBNUI7O0VBRUEsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJLEVBQXJCLEVBQXlCQSxDQUFDLEVBQTFCLEVBQThCO0lBQzVCLE1BQU1DLEdBQUcsR0FBR2hCLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUFaO0lBQ0FXLEdBQUcsQ0FBQ0YsU0FBSixHQUFnQixjQUFoQjtJQUNBd0IsZUFBZSxDQUFDckIsV0FBaEIsQ0FBNEJELEdBQTVCO0VBQ0Q7O0VBQ0RNLGlCQUFpQjtFQUNqQm5CLGdCQUFnQixDQUFDYyxXQUFqQixDQUE2QnFCLGVBQTdCO0VBQ0FwQixPQUFPLENBQUMsZUFBRCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU3FCLGVBQVQsR0FBMkI7RUFDekIsTUFBTUMsY0FBYyxHQUFHeEMsUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQXZCO0VBQ0FtQyxjQUFjLENBQUMxQixTQUFmLEdBQTJCLGdCQUEzQjs7RUFDQSxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLElBQUksRUFBckIsRUFBeUJBLENBQUMsRUFBMUIsRUFBOEI7SUFDNUIsTUFBTUMsR0FBRyxHQUFHaEIsUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQVo7SUFDQVcsR0FBRyxDQUFDRixTQUFKO0lBRUEwQixjQUFjLENBQUN2QixXQUFmLENBQTJCRCxHQUEzQjtFQUNEOztFQUNEZCxTQUFTLENBQUNlLFdBQVYsQ0FBc0J1QixjQUF0QjtFQUNBdEIsT0FBTyxDQUFDLGVBQUQsQ0FBUDtBQUNEOztBQUVELFNBQVNBLE9BQVQsQ0FBaUJ1QixRQUFqQixFQUEyQjtFQUN6QixNQUFNQyxTQUFTLEdBQUcxQyxRQUFRLENBQUNvQixnQkFBVCxDQUEwQnFCLFFBQTFCLENBQWxCO0VBQ0EsSUFBSUUsS0FBSyxHQUFHLEVBQVo7O0VBRUEsS0FBSyxJQUFJNUIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSSxDQUFyQixFQUF3QkEsQ0FBQyxFQUF6QixFQUE2QjtJQUMzQixLQUFLLElBQUk2QixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJLENBQXJCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO01BQzNCRCxLQUFLLENBQUNFLElBQU4sQ0FBVyxDQUFDRCxDQUFELEVBQUk3QixDQUFKLENBQVg7TUFDQUosYUFBYSxDQUFDa0MsSUFBZCxDQUFtQixDQUFDRCxDQUFELEVBQUk3QixDQUFKLENBQW5CO0lBQ0Q7RUFDRjs7RUFFRCxLQUFLLElBQUlBLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsR0FBcEIsRUFBeUJBLENBQUMsRUFBMUIsRUFBOEI7SUFDNUIyQixTQUFTLENBQUMzQixDQUFELENBQVQsQ0FBYStCLFlBQWIsQ0FBMEIsWUFBMUIsYUFBNENILEtBQUssQ0FBQzVCLENBQUQsQ0FBakQ7RUFDRDtBQUNGOztBQUNEc0IsYUFBYTtBQUNiLE1BQU1sQixhQUFhLEdBQUduQixRQUFRLENBQUNvQixnQkFBVCxDQUEwQixlQUExQixDQUF0Qjs7QUFFQSxTQUFTQyxtQkFBVCxDQUE2QkYsYUFBN0IsRUFBNEM7RUFDMUNYLEtBQUssQ0FBQ3VDLE9BQU4sQ0FBZUMsSUFBRCxJQUFVO0lBQ3RCQSxJQUFJLENBQUNDLEtBQUwsQ0FBV0YsT0FBWCxDQUFvQkUsS0FBRCxJQUFXO01BQzVCeEMsYUFBYSxDQUFDb0MsSUFBZCxZQUF1QkksS0FBdkI7SUFDRCxDQUZEO0VBR0QsQ0FKRDtFQU1BOUIsYUFBYSxDQUFDNEIsT0FBZCxDQUF1QkcsTUFBRCxJQUFZO0lBQ2hDekMsYUFBYSxDQUFDc0MsT0FBZCxDQUF1QkUsS0FBRCxJQUFXO01BQy9CLElBQUlDLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlRixLQUFmLENBQXFCRyxRQUFyQixPQUFvQ0gsS0FBSyxDQUFDRyxRQUFOLEVBQXhDLEVBQTBEO1FBQ3hERixNQUFNLENBQUNHLEtBQVAsQ0FBYUMsZUFBYixHQUErQixNQUEvQjtNQUNEO0lBQ0YsQ0FKRDtFQUtELENBTkQ7QUFPRDs7QUFFRCxTQUFTQyxtQkFBVCxDQUE2QkMsR0FBN0IsRUFBa0NDLENBQWxDLEVBQXFDO0VBQ25DLE1BQU1DLGFBQWEsR0FBR0YsR0FBRyxDQUFDRSxhQUExQjtFQUNBLE1BQU1qRCxhQUFhLEdBQUcrQyxHQUFHLENBQUMvQyxhQUExQjtFQUVBLE1BQU1rRCxXQUFXLEdBQUdELGFBQWEsQ0FBQ0UsSUFBZCxDQUFvQlgsS0FBRCxJQUFXO0lBQ2hELE9BQU9RLENBQUMsQ0FBQ0ksTUFBRixDQUFTVixPQUFULENBQWlCRixLQUFqQixDQUF1QkcsUUFBdkIsa0JBQTBDSCxLQUFLLENBQUNHLFFBQU4sRUFBMUMsTUFBUDtFQUNELENBRm1CLENBQXBCO0VBR0EsTUFBTVUsV0FBVyxHQUFHckQsYUFBYSxDQUFDbUQsSUFBZCxDQUFvQlgsS0FBRCxJQUFXO0lBQ2hELE9BQU9RLENBQUMsQ0FBQ0ksTUFBRixDQUFTVixPQUFULENBQWlCRixLQUFqQixDQUF1QkcsUUFBdkIsa0JBQTBDSCxLQUFLLENBQUNHLFFBQU4sRUFBMUMsTUFBUDtFQUNELENBRm1CLENBQXBCO0VBR0FXLE9BQU8sQ0FBQ0MsR0FBUixDQUFZTCxXQUFaLEVBQXlCRyxXQUF6QjtFQUNBQyxPQUFPLENBQUNDLEdBQVIsQ0FBWVAsQ0FBQyxDQUFDSSxNQUFGLENBQVNWLE9BQVQsQ0FBaUJGLEtBQTdCOztFQUVBLElBQUlVLFdBQVcsSUFBSUcsV0FBbkIsRUFBZ0M7SUFDOUJMLENBQUMsQ0FBQ0ksTUFBRixDQUFTUixLQUFULENBQWVDLGVBQWYsR0FBaUMsS0FBakM7RUFDRCxDQUZELE1BRU8sSUFBSUssV0FBVyxJQUFJLENBQUNHLFdBQXBCLEVBQWlDO0lBQ3RDTCxDQUFDLENBQUNJLE1BQUYsQ0FBU1IsS0FBVCxDQUFlQyxlQUFmLEdBQWlDLGNBQWpDO0VBQ0Q7QUFDRjs7QUFFRCxTQUFTVyxrQkFBVCxDQUE0QlQsR0FBNUIsRUFBaUM7RUFDL0IsTUFBTVUsVUFBVSxHQUFHVixHQUFHLENBQUNXLFNBQXZCO0VBQ0EsTUFBTUMsUUFBUSxHQUFHWixHQUFHLENBQUNZLFFBQXJCO0VBQ0EsTUFBTWpELGFBQWEsR0FBR25CLFFBQVEsQ0FBQ29CLGdCQUFULENBQTBCLGVBQTFCLENBQXRCO0VBRUFELGFBQWEsQ0FBQzRCLE9BQWQsQ0FBdUJHLE1BQUQsSUFBWTtJQUNoQ2dCLFVBQVUsQ0FBQ25CLE9BQVgsQ0FBb0JFLEtBQUQsSUFBVztNQUM1QixJQUFJQyxNQUFNLENBQUNDLE9BQVAsQ0FBZUYsS0FBZixDQUFxQkcsUUFBckIsa0JBQXdDSCxLQUFLLENBQUNHLFFBQU4sRUFBeEMsTUFBSixFQUFpRTtRQUMvRDtRQUNBRixNQUFNLENBQUNHLEtBQVAsQ0FBYUMsZUFBYixHQUErQixjQUEvQjtNQUNEO0lBQ0YsQ0FMRDtFQU1ELENBUEQ7RUFTQW5DLGFBQWEsQ0FBQzRCLE9BQWQsQ0FBdUJHLE1BQUQsSUFBWTtJQUNoQ2tCLFFBQVEsQ0FBQ3JCLE9BQVQsQ0FBa0JFLEtBQUQsSUFBVztNQUMxQixJQUFJQyxNQUFNLENBQUNDLE9BQVAsQ0FBZUYsS0FBZixDQUFxQkcsUUFBckIsa0JBQXdDSCxLQUFLLENBQUNHLFFBQU4sRUFBeEMsTUFBSixFQUFpRTtRQUMvREYsTUFBTSxDQUFDRyxLQUFQLENBQWFDLGVBQWIsR0FBK0IsS0FBL0I7TUFDRDtJQUNGLENBSkQ7RUFLRCxDQU5EO0FBT0Q7O0FBRUQsU0FBU2UsY0FBVCxDQUF3QnJCLElBQXhCLEVBQThCO0VBQzVCLE1BQU1zQixpQkFBaUIsR0FBR3RCLElBQUksQ0FBQ0MsS0FBTCxDQUFXc0IsS0FBWCxDQUFrQnRCLEtBQUQsSUFBVztJQUNwRCxPQUFPdEMsYUFBYSxDQUFDaUQsSUFBZCxDQUFvQlksTUFBRCxJQUFZO01BQ3BDLElBQUl2QixLQUFLLENBQUNHLFFBQU4sT0FBcUJvQixNQUFNLENBQUNwQixRQUFQLEVBQXpCLEVBQTRDO1FBQzFDLE9BQU8sSUFBUDtNQUNEO0lBQ0YsQ0FKTSxDQUFQO0VBS0QsQ0FOeUIsQ0FBMUI7RUFPQVcsT0FBTyxDQUFDQyxHQUFSLENBQVlNLGlCQUFaOztFQUNBLElBQUksQ0FBQ0EsaUJBQUwsRUFBd0I7SUFDdEI1RCxLQUFLO0lBQ0wsT0FBTyxLQUFQO0VBQ0QsQ0FIRCxNQUdPO0lBQ0wsT0FBTyxJQUFQO0VBQ0Q7QUFDRjs7QUFFRCxTQUFTK0QsV0FBVCxDQUFxQmhCLENBQXJCLEVBQXdCO0VBQ3RCLE1BQU1pQixXQUFXLEdBQUcxRSxRQUFRLENBQUNDLGFBQVQsQ0FDbEIsbUNBRGtCLEVBRWxCaUMsS0FGRjtFQUdBLE1BQU1zQyxNQUFNLEdBQUdHLElBQUksQ0FBQ0MsS0FBTCxDQUFXbkIsQ0FBQyxDQUFDSSxNQUFGLENBQVNWLE9BQVQsQ0FBaUJGLEtBQTVCLENBQWY7RUFDQSxJQUFJNEIsTUFBSixFQUFZQyxTQUFaLEVBQXVCQyxTQUF2QixFQUFrQ0MsVUFBbEMsRUFBOENDLE9BQTlDOztFQUVBLFFBQVF2RSxLQUFSO0lBQ0UsS0FBSyxDQUFMO01BQ0VtRSxNQUFNLEdBQUcsSUFBSWhGLHVDQUFKLENBQVMsUUFBVCxFQUFtQjJFLE1BQW5CLEVBQTJCRSxXQUEzQixDQUFUOztNQUVBLElBQUksQ0FBQ0wsY0FBYyxDQUFDUSxNQUFELENBQW5CLEVBQTZCO1FBQzNCbkUsS0FBSyxJQUFJLENBQVQ7UUFDQTtNQUNELENBSEQsTUFHTztRQUNMRixLQUFLLENBQUNxQyxJQUFOLENBQVdnQyxNQUFYO1FBQ0F4RCxtQkFBbUIsQ0FBQ0YsYUFBRCxDQUFuQjtNQUNEOztNQUVEZixRQUFRLENBQUNHLFdBQVQ7TUFDQTs7SUFDRixLQUFLLENBQUw7TUFDRXVFLFNBQVMsR0FBRyxJQUFJakYsdUNBQUosQ0FBUyxXQUFULEVBQXNCMkUsTUFBdEIsRUFBOEJFLFdBQTlCLENBQVo7O01BRUEsSUFBSSxDQUFDTCxjQUFjLENBQUNTLFNBQUQsQ0FBbkIsRUFBZ0M7UUFDOUJwRSxLQUFLLElBQUksQ0FBVDtRQUNBO01BQ0QsQ0FIRCxNQUdPO1FBQ0xGLEtBQUssQ0FBQ3FDLElBQU4sQ0FBV2lDLFNBQVg7UUFDQXpELG1CQUFtQixDQUFDRixhQUFELENBQW5CO01BQ0Q7O01BRURmLFFBQVEsQ0FBQ0csV0FBVDtNQUNBOztJQUNGLEtBQUssQ0FBTDtNQUNFd0UsU0FBUyxHQUFHLElBQUlsRix1Q0FBSixDQUFTLFdBQVQsRUFBc0IyRSxNQUF0QixFQUE4QkUsV0FBOUIsQ0FBWjs7TUFFQSxJQUFJLENBQUNMLGNBQWMsQ0FBQ1UsU0FBRCxDQUFuQixFQUFnQztRQUM5QnJFLEtBQUssSUFBSSxDQUFUO1FBQ0E7TUFDRCxDQUhELE1BR087UUFDTEYsS0FBSyxDQUFDcUMsSUFBTixDQUFXa0MsU0FBWDtRQUNBMUQsbUJBQW1CLENBQUNGLGFBQUQsQ0FBbkI7TUFDRDs7TUFDRGYsUUFBUSxDQUFDRyxXQUFUO01BRUE7O0lBQ0YsS0FBSyxDQUFMO01BQ0V5RSxVQUFVLEdBQUcsSUFBSW5GLHVDQUFKLENBQVMsWUFBVCxFQUF1QjJFLE1BQXZCLEVBQStCRSxXQUEvQixDQUFiOztNQUVBLElBQUksQ0FBQ0wsY0FBYyxDQUFDVyxVQUFELENBQW5CLEVBQWlDO1FBQy9CdEUsS0FBSyxJQUFJLENBQVQ7UUFDQTtNQUNELENBSEQsTUFHTztRQUNMRixLQUFLLENBQUNxQyxJQUFOLENBQVdtQyxVQUFYO1FBQ0EzRCxtQkFBbUIsQ0FBQ0YsYUFBRCxDQUFuQjtNQUNEOztNQUNEZixRQUFRLENBQUNHLFdBQVQ7TUFDQTs7SUFDRixLQUFLLENBQUw7TUFDRTBFLE9BQU8sR0FBRyxJQUFJcEYsdUNBQUosQ0FBUyxTQUFULEVBQW9CMkUsTUFBcEIsRUFBNEJFLFdBQTVCLENBQVY7O01BRUEsSUFBSSxDQUFDTCxjQUFjLENBQUNZLE9BQUQsQ0FBbkIsRUFBOEI7UUFDNUJ2RSxLQUFLLElBQUksQ0FBVDtRQUNBO01BQ0QsQ0FIRCxNQUdPO1FBQ0xGLEtBQUssQ0FBQ3FDLElBQU4sQ0FBV29DLE9BQVg7UUFDQTVELG1CQUFtQixDQUFDRixhQUFELENBQW5CO01BQ0Q7O01BQ0Q7O0lBQ0Y7TUFDRTtFQWhFSjs7RUFrRUEsSUFBSVQsS0FBSyxLQUFLLENBQWQsRUFBaUI7SUFDZkUsZ0JBQWdCO0lBQ2hCMkIsZUFBZTtJQUNmekMscURBQVE7RUFDVDs7RUFFRGlFLE9BQU8sQ0FBQ0MsR0FBUixDQUFZeEQsS0FBWjtFQUNBRSxLQUFLLElBQUksQ0FBVDtBQUNEOztBQUVEUyxhQUFhLENBQUM0QixPQUFkLENBQXVCRyxNQUFELElBQVk7RUFDaENBLE1BQU0sQ0FBQ2dDLGdCQUFQLENBQ0UsT0FERixFQUVHekIsQ0FBRCxJQUFPO0lBQ0xnQixXQUFXLENBQUNoQixDQUFELENBQVg7RUFDRCxDQUpILEVBS0U7SUFBRTBCLElBQUksRUFBRTtFQUFSLENBTEY7QUFPRCxDQVJEO0FBVUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5UkE7QUFDQTtBQUNBO0FBQ0E7QUFFQSxNQUFNSSxPQUFPLEdBQUcsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFoQjtBQUNBLE1BQU1DLGFBQWEsR0FBRyxFQUF0QjtBQUNBLE1BQU1DLFdBQVcsR0FBRyxJQUFJSCxpREFBSixFQUFwQjtBQUNBLE1BQU1JLGFBQWEsR0FBRyxJQUFJSixpREFBSixFQUF0QjtBQUNBLE1BQU1ULE1BQU0sR0FBRyxJQUFJaEYsdUNBQUosQ0FDYixRQURhLEVBRWIsQ0FBQ3VGLHFEQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBYixFQUFxQkEscURBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFqQyxDQUZhLEVBR2JHLE9BQU8sQ0FBQ0ksSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQk4sT0FBTyxDQUFDTyxNQUFuQyxDQUFELENBSE0sQ0FBZjtBQUtBLE1BQU1oQixTQUFTLEdBQUcsSUFBSWpGLHVDQUFKLENBQ2hCLFdBRGdCLEVBRWhCLENBQUN1RixxREFBWSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQWIsRUFBcUJBLHFEQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBakMsQ0FGZ0IsRUFHaEJHLE9BQU8sQ0FBQ0ksSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQk4sT0FBTyxDQUFDTyxNQUFuQyxDQUFELENBSFMsQ0FBbEI7QUFLQSxNQUFNZixTQUFTLEdBQUcsSUFBSWxGLHVDQUFKLENBQ2hCLFdBRGdCLEVBRWhCLENBQUN1RixxREFBWSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQWIsRUFBcUJBLHFEQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBakMsQ0FGZ0IsRUFHaEJHLE9BQU8sQ0FBQ0ksSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQk4sT0FBTyxDQUFDTyxNQUFuQyxDQUFELENBSFMsQ0FBbEI7QUFLQSxNQUFNZCxVQUFVLEdBQUcsSUFBSW5GLHVDQUFKLENBQ2pCLFlBRGlCLEVBRWpCLENBQUN1RixxREFBWSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQWIsRUFBcUJBLHFEQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBakMsQ0FGaUIsRUFHakJHLE9BQU8sQ0FBQ0ksSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQk4sT0FBTyxDQUFDTyxNQUFuQyxDQUFELENBSFUsQ0FBbkI7QUFLQSxNQUFNYixPQUFPLEdBQUcsSUFBSXBGLHVDQUFKLENBQ2QsU0FEYyxFQUVkLENBQUN1RixxREFBWSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQWIsRUFBcUJBLHFEQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBakMsQ0FGYyxFQUdkRyxPQUFPLENBQUNJLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0JOLE9BQU8sQ0FBQ08sTUFBbkMsQ0FBRCxDQUhPLENBQWhCO0FBS0FOLGFBQWEsQ0FBQzNDLElBQWQsQ0FBbUJnQyxNQUFuQixFQUEyQkMsU0FBM0IsRUFBc0NDLFNBQXRDLEVBQWlEQyxVQUFqRCxFQUE2REMsT0FBN0Q7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTWMsTUFBTSxHQUFHLElBQUlWLDJDQUFKLENBQVcsVUFBWCxFQUF1QkssYUFBdkIsQ0FBZjtBQUNBLE1BQU1NLFFBQVEsR0FBRyxJQUFJWCwyQ0FBSixDQUFXLFVBQVgsRUFBdUJJLFdBQXZCLENBQWpCOztBQUVBLFNBQVMzRixRQUFULEdBQW9CO0VBQ2xCLE1BQU1tRyxZQUFZLEdBQUdqRyxRQUFRLENBQUNvQixnQkFBVCxDQUEwQixlQUExQixDQUFyQjtFQUVBWiwrQ0FBQSxDQUFld0MsSUFBRCxJQUFVO0lBQ3RCeUMsV0FBVyxDQUFDUyxTQUFaLENBQXNCbEQsSUFBdEI7RUFDRCxDQUZEO0VBSUF3QyxhQUFhLENBQUN6QyxPQUFkLENBQXVCQyxJQUFELElBQVU7SUFDOUJtRCxXQUFXLENBQUNULGFBQUQsRUFBZ0IxQyxJQUFoQixDQUFYO0VBQ0QsQ0FGRDtFQUdBZSxPQUFPLENBQUNDLEdBQVIsQ0FBWTBCLGFBQVo7RUFFQU8sWUFBWSxDQUFDbEQsT0FBYixDQUFzQkcsTUFBRCxJQUFZO0lBQy9CQSxNQUFNLENBQUNnQyxnQkFBUCxDQUNFLE9BREYsRUFFR3pCLENBQUQsSUFBTztNQUNMO01BQ0FNLE9BQU8sQ0FBQ0MsR0FBUixDQUFZK0IsTUFBTSxDQUFDSyxjQUFQLENBQXNCekIsSUFBSSxDQUFDQyxLQUFMLENBQVduQixDQUFDLENBQUNJLE1BQUYsQ0FBU1YsT0FBVCxDQUFpQkYsS0FBNUIsQ0FBdEIsQ0FBWjtNQUNBYyxPQUFPLENBQUNDLEdBQVIsQ0FBWWdDLFFBQVEsQ0FBQ0ksY0FBVCxFQUFaO01BQ0E3Qyx5REFBbUIsQ0FBQ21DLGFBQUQsRUFBZ0JqQyxDQUFoQixDQUFuQjtNQUNBUSx3REFBa0IsQ0FBQ3dCLFdBQUQsQ0FBbEI7TUFDQTFCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZMEIsYUFBWjtJQUNELENBVEgsRUFVRTtNQUFFUCxJQUFJLEVBQUU7SUFBUixDQVZGO0VBWUQsQ0FiRDs7RUFlQSxJQUFJTSxXQUFXLENBQUNZLFlBQVosTUFBOEJYLGFBQWEsQ0FBQ1csWUFBZCxFQUFsQyxFQUFnRTtJQUM5REMsS0FBSyxDQUFDLFlBQUQsQ0FBTDs7SUFFQSxJQUFJYixXQUFXLENBQUNZLFlBQVosRUFBSixFQUFnQztNQUM5QkMsS0FBSyxDQUFDLGVBQUQsQ0FBTDtJQUNELENBRkQsTUFFTztNQUNMQSxLQUFLLENBQUMsWUFBRCxDQUFMO0lBQ0Q7RUFDRjtBQUNGOztBQUVELFNBQVNILFdBQVQsQ0FBcUJJLFNBQXJCLEVBQWdDdkQsSUFBaEMsRUFBc0M7RUFDcEMsSUFBSTtJQUNGdUQsU0FBUyxDQUFDTCxTQUFWLENBQW9CbEQsSUFBcEI7RUFDRCxDQUZELENBRUUsTUFBTTtJQUNOLElBQUk7TUFDRixNQUFNd0QsT0FBTyxHQUFHLElBQUkzRyx1Q0FBSixDQUNkbUQsSUFBSSxDQUFDWixJQURTLEVBRWQsQ0FBQ2dELHFEQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBYixFQUFxQkEscURBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFqQyxDQUZjLEVBR2RHLE9BQU8sQ0FBQ0ksSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQk4sT0FBTyxDQUFDTyxNQUFuQyxDQUFELENBSE8sQ0FBaEI7TUFLQS9CLE9BQU8sQ0FBQ0MsR0FBUixDQUFZd0MsT0FBWjtNQUNBRCxTQUFTLENBQUNMLFNBQVYsQ0FBb0JNLE9BQXBCO0lBQ0QsQ0FSRCxDQVFFLE1BQU07TUFDTkwsV0FBVyxDQUFDSSxTQUFELEVBQVl2RCxJQUFaLENBQVg7SUFDRDtFQUNGO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxR0Q7QUFFQSxNQUFNc0MsU0FBUyxHQUFHLFlBQVk7RUFDNUIsS0FBS25CLFNBQUwsR0FBaUIsRUFBakI7RUFDQSxLQUFLM0QsS0FBTCxHQUFhLEVBQWI7RUFDQSxLQUFLQyxhQUFMLEdBQXFCLEVBQXJCO0VBQ0EsS0FBS0UsYUFBTCxHQUFxQixFQUFyQjtFQUNBLEtBQUsrQyxhQUFMLEdBQXFCLEVBQXJCO0VBQ0EsS0FBS1UsUUFBTCxHQUFnQixFQUFoQjs7RUFFQSxLQUFLLElBQUlyRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJLENBQXJCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0lBQzNCLEtBQUssSUFBSTZCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLElBQUksQ0FBckIsRUFBd0JBLENBQUMsRUFBekIsRUFBNkI7TUFDM0IsS0FBS2pDLGFBQUwsQ0FBbUJrQyxJQUFuQixDQUF3QixDQUFDRCxDQUFELEVBQUk3QixDQUFKLENBQXhCO0lBQ0Q7RUFDRjs7RUFFRCxLQUFLbUYsU0FBTCxHQUFrQmxELElBQUQsSUFBVTtJQUN6QixNQUFNeUQsaUJBQWlCLEdBQUd6RCxJQUFJLENBQUNDLEtBQUwsQ0FBV1csSUFBWCxDQUFpQlgsS0FBRCxJQUFXO01BQ25ELE9BQU8sS0FBS3hDLGFBQUwsQ0FBbUJtRCxJQUFuQixDQUF5QlksTUFBRCxJQUFZO1FBQ3pDLElBQUl2QixLQUFLLENBQUNHLFFBQU4sT0FBcUJvQixNQUFNLENBQUNwQixRQUFQLEVBQXpCLEVBQTRDO1VBQzFDLE9BQU8sSUFBUDtRQUNEO01BQ0YsQ0FKTSxDQUFQO0lBS0QsQ0FOeUIsQ0FBMUI7SUFRQSxNQUFNa0IsaUJBQWlCLEdBQUd0QixJQUFJLENBQUNDLEtBQUwsQ0FBV3NCLEtBQVgsQ0FBa0J0QixLQUFELElBQVc7TUFDcEQsT0FBTyxLQUFLdEMsYUFBTCxDQUFtQmlELElBQW5CLENBQXlCWSxNQUFELElBQVk7UUFDekMsSUFBSXZCLEtBQUssQ0FBQ0csUUFBTixPQUFxQm9CLE1BQU0sQ0FBQ3BCLFFBQVAsRUFBekIsRUFBNEM7VUFDMUMsT0FBTyxJQUFQO1FBQ0Q7TUFDRixDQUpNLENBQVA7SUFLRCxDQU55QixDQUExQjs7SUFRQSxJQUFJcUQsaUJBQUosRUFBdUI7TUFDckIsTUFBTSw0QkFBTjtJQUNELENBRkQsTUFFTyxJQUFJLENBQUNuQyxpQkFBTCxFQUF3QjtNQUM3QixNQUFNLG9DQUFOO0lBQ0QsQ0FGTSxNQUVBO01BQ0wsS0FBSzlELEtBQUwsQ0FBV3FDLElBQVgsQ0FBZ0JHLElBQWhCO01BQ0FBLElBQUksQ0FBQ0MsS0FBTCxDQUFXRixPQUFYLENBQW9CMkQsS0FBRCxJQUFXO1FBQzVCLEtBQUtqRyxhQUFMLENBQW1Cb0MsSUFBbkIsQ0FBd0I2RCxLQUF4QjtNQUNELENBRkQ7SUFHRDtFQUNGLENBM0JEOztFQTZCQSxLQUFLQyxhQUFMLEdBQXNCbkMsTUFBRCxJQUFZO0lBQy9CLEtBQUtkLGFBQUwsQ0FBbUJiLElBQW5CLENBQXdCMkIsTUFBeEI7SUFFQSxNQUFNb0MsS0FBSyxHQUFHLEtBQUtqRyxhQUFMLENBQW1Ca0csU0FBbkIsQ0FBOEJDLE9BQUQsSUFBYTtNQUN0RCxPQUFPbkMsSUFBSSxDQUFDb0MsU0FBTCxDQUFlRCxPQUFmLEtBQTJCbkMsSUFBSSxDQUFDb0MsU0FBTCxDQUFldkMsTUFBZixDQUFsQztJQUNELENBRmEsQ0FBZDtJQUdBLEtBQUs3RCxhQUFMLENBQW1CcUcsTUFBbkIsQ0FBMEJKLEtBQTFCLEVBQWlDLENBQWpDO0lBRUEsTUFBTUssVUFBVSxHQUFHLEtBQUt4RyxhQUFMLENBQW1CbUQsSUFBbkIsQ0FBeUJzRCxHQUFELElBQVM7TUFDbEQsSUFBSUEsR0FBRyxDQUFDOUQsUUFBSixPQUFtQm9CLE1BQU0sQ0FBQ3BCLFFBQVAsRUFBdkIsRUFBMEM7UUFDeEMsT0FBTyxJQUFQO01BQ0Q7SUFDRixDQUprQixDQUFuQjs7SUFNQSxJQUFJNkQsVUFBSixFQUFnQjtNQUNkLE1BQU1FLE1BQU0sR0FBRyxLQUFLM0csS0FBTCxDQUFXNEcsSUFBWCxDQUFpQnBFLElBQUQsSUFBVTtRQUN2QyxPQUFPQSxJQUFJLENBQUNDLEtBQUwsQ0FBV21FLElBQVgsQ0FBaUJuRSxLQUFELElBQVc7VUFDaEMsT0FBT0EsS0FBSyxDQUFDRyxRQUFOLE9BQXFCb0IsTUFBTSxDQUFDcEIsUUFBUCxFQUE1QjtRQUNELENBRk0sQ0FBUDtNQUdELENBSmMsQ0FBZjtNQU1BLE1BQU13RCxLQUFLLEdBQUdPLE1BQU0sQ0FBQ2xFLEtBQVAsQ0FBYTRELFNBQWIsQ0FBd0JLLEdBQUQsSUFBUztRQUM1QyxJQUFJQSxHQUFHLENBQUM5RCxRQUFKLE9BQW1Cb0IsTUFBTSxDQUFDcEIsUUFBUCxFQUF2QixFQUEwQztVQUN4QyxPQUFPLElBQVA7UUFDRDtNQUNGLENBSmEsQ0FBZDtNQUtBK0QsTUFBTSxDQUFDRSxHQUFQLENBQVdULEtBQVg7TUFDQSxLQUFLeEMsUUFBTCxDQUFjdkIsSUFBZCxDQUFtQjJCLE1BQW5CO01BRUEsT0FBTyxtQkFBUDtJQUNELENBaEJELE1BZ0JPO01BQ0wsS0FBS0wsU0FBTCxDQUFldEIsSUFBZixDQUFvQjJCLE1BQXBCO01BRUEsT0FBTyxlQUFQO0lBQ0Q7RUFDRixDQW5DRDs7RUFxQ0EsS0FBSzZCLFlBQUwsR0FBb0IsTUFBTTtJQUN4QixNQUFNaUIsUUFBUSxHQUFHLEtBQUs5RyxLQUFMLENBQVcrRCxLQUFYLENBQWtCdkIsSUFBRCxJQUFVO01BQzFDLElBQUlBLElBQUksQ0FBQ3VFLE1BQUwsRUFBSixFQUFtQjtRQUNqQixPQUFPLElBQVA7TUFDRDtJQUNGLENBSmdCLENBQWpCOztJQU1BLElBQUlELFFBQUosRUFBYztNQUNaLE9BQU8sSUFBUDtJQUNELENBRkQsTUFFTztNQUNMLE9BQU8sS0FBUDtJQUNEO0VBQ0YsQ0FaRDtBQWFELENBN0ZEO0FBK0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSEE7QUFDQSxNQUFNakMsTUFBTSxHQUFHLFVBQVVqRCxJQUFWLEVBQWdCbUUsU0FBaEIsRUFBMkI7RUFDeEMsS0FBS25FLElBQUwsR0FBWUEsSUFBSSxDQUFDb0YsV0FBTCxFQUFaO0VBQ0EsS0FBS2pCLFNBQUwsR0FBaUJBLFNBQWpCOztFQUVBLEtBQUtILGNBQUwsR0FBdUJuRCxLQUFELElBQVc7SUFDL0IsSUFBSSxLQUFLYixJQUFMLEtBQWMsVUFBbEIsRUFBOEI7TUFDNUIsTUFBTXFGLFlBQVksR0FBRyxNQUFNO1FBQ3pCLE1BQU1DLFNBQVMsR0FBRyxDQUFDdEMsWUFBWSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQWIsRUFBcUJBLFlBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFqQyxDQUFsQjtRQUVBLE1BQU02QixVQUFVLEdBQUcsS0FBS1YsU0FBTCxDQUFlNUYsYUFBZixDQUE2QmlELElBQTdCLENBQW1Dc0QsR0FBRCxJQUFTO1VBQzVELElBQUlBLEdBQUcsQ0FBQzlELFFBQUosT0FBbUJzRSxTQUFTLENBQUN0RSxRQUFWLEVBQXZCLEVBQTZDO1lBQzNDLE9BQU8sSUFBUDtVQUNEO1FBQ0YsQ0FKa0IsQ0FBbkI7O1FBTUEsSUFBSSxDQUFDNkQsVUFBTCxFQUFpQjtVQUNmLEtBQUtWLFNBQUwsQ0FBZUksYUFBZixDQUE2QmUsU0FBN0I7UUFDRCxDQUZELE1BRU87VUFDTCxNQUFNQSxTQUFTLEdBQUcsQ0FBQ3RDLFlBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFiLEVBQXFCQSxZQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBakMsQ0FBbEI7VUFDQSxLQUFLbUIsU0FBTCxDQUFlSSxhQUFmLENBQTZCZSxTQUE3QjtRQUNEOztRQUNEM0QsT0FBTyxDQUFDQyxHQUFSLENBQVkwRCxTQUFaO01BQ0QsQ0FoQkQ7O01BaUJBRCxZQUFZO0lBQ2IsQ0FuQkQsTUFtQk87TUFDTCxLQUFLbEIsU0FBTCxDQUFlSSxhQUFmLENBQTZCMUQsS0FBN0I7SUFDRDs7SUFDRCxpQkFBVSxLQUFLYixJQUFmLDBCQUFtQ2EsS0FBbkM7RUFDRCxDQXhCRDtBQXlCRCxDQTdCRDs7QUErQkEsU0FBU21DLFlBQVQsQ0FBc0J1QyxHQUF0QixFQUEyQkMsR0FBM0IsRUFBZ0M7RUFDOUJBLEdBQUcsR0FBR2pDLElBQUksQ0FBQ2tDLElBQUwsQ0FBVUQsR0FBVixDQUFOO0VBQ0FELEdBQUcsR0FBR2hDLElBQUksQ0FBQ0MsS0FBTCxDQUFXK0IsR0FBWCxDQUFOO0VBQ0EsT0FBT2hDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsTUFBaUI4QixHQUFHLEdBQUdDLEdBQU4sR0FBWSxDQUE3QixJQUFrQ0EsR0FBN0MsQ0FBUDtBQUNEOztDQUlEOzs7Ozs7Ozs7Ozs7OztBQ3hDQSxNQUFNL0gsSUFBSSxHQUFHLFVBQVV1QyxJQUFWLEVBQWdCMEYsRUFBaEIsRUFBb0JwRCxXQUFwQixFQUFpQztFQUM1QyxLQUFLdEMsSUFBTCxHQUFZQSxJQUFaO0VBQ0EsS0FBS3NDLFdBQUwsR0FBbUJBLFdBQW5CO0VBQ0EsS0FBS3FELFdBQUwsR0FBbUIsRUFBbkI7RUFDQSxLQUFLRCxFQUFMLEdBQVVBLEVBQVY7RUFFQSxNQUFNRSxLQUFLLEdBQUd0RCxXQUFXLENBQUN0QixRQUFaLEdBQXVCb0UsV0FBdkIsRUFBZDs7RUFFQSxRQUFRcEYsSUFBSSxDQUFDZ0IsUUFBTCxHQUFnQm9FLFdBQWhCLEVBQVI7SUFDRSxLQUFLLFFBQUw7TUFDRSxLQUFLMUIsTUFBTCxHQUFjLENBQWQ7O01BRUEsSUFBSWtDLEtBQUssS0FBSyxHQUFkLEVBQW1CO1FBQ2pCLEtBQUsvRSxLQUFMLEdBQWEsQ0FBQyxLQUFLNkUsRUFBTixFQUFVLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUFkLEVBQWlCLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLENBQWpCLENBQVYsQ0FBYjtNQUNELENBRkQsTUFFTztRQUNMLEtBQUs3RSxLQUFMLEdBQWEsQ0FBQyxLQUFLNkUsRUFBTixFQUFVLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBRCxFQUFhLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBMUIsQ0FBVixDQUFiO01BQ0Q7O01BQ0Q7O0lBQ0YsS0FBSyxXQUFMO01BQ0UsS0FBS2hDLE1BQUwsR0FBYyxDQUFkOztNQUNBLElBQUlrQyxLQUFLLEtBQUssR0FBZCxFQUFtQjtRQUNqQixLQUFLL0UsS0FBTCxHQUFhLENBQ1gsS0FBSzZFLEVBRE0sRUFFWCxDQUFDLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBZCxFQUFpQixLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFqQixDQUZXLEVBR1gsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixJQUFhLENBQWQsRUFBaUIsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBakIsQ0FIVyxDQUFiO01BS0QsQ0FORCxNQU1PO1FBQ0wsS0FBSzdFLEtBQUwsR0FBYSxDQUNYLEtBQUs2RSxFQURNLEVBRVgsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFELEVBQWEsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUExQixDQUZXLEVBR1gsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFELEVBQWEsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUExQixDQUhXLENBQWI7TUFLRDs7TUFFRDs7SUFDRixLQUFLLFdBQUw7TUFDRSxLQUFLaEMsTUFBTCxHQUFjLENBQWQ7O01BRUEsSUFBSWtDLEtBQUssS0FBSyxHQUFkLEVBQW1CO1FBQ2pCLEtBQUsvRSxLQUFMLEdBQWEsQ0FDWCxLQUFLNkUsRUFETSxFQUVYLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUFkLEVBQWlCLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLENBQWpCLENBRlcsRUFHWCxDQUFDLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBZCxFQUFpQixLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFqQixDQUhXLENBQWI7TUFLRCxDQU5ELE1BTU87UUFDTCxLQUFLN0UsS0FBTCxHQUFhLENBQ1gsS0FBSzZFLEVBRE0sRUFFWCxDQUFDLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLENBQUQsRUFBYSxLQUFLQSxFQUFMLENBQVEsQ0FBUixJQUFhLENBQTFCLENBRlcsRUFHWCxDQUFDLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLENBQUQsRUFBYSxLQUFLQSxFQUFMLENBQVEsQ0FBUixJQUFhLENBQTFCLENBSFcsQ0FBYjtNQUtEOztNQUVEOztJQUNGLEtBQUssWUFBTDtNQUNFLEtBQUtoQyxNQUFMLEdBQWMsQ0FBZDs7TUFFQSxJQUFJa0MsS0FBSyxLQUFLLEdBQWQsRUFBbUI7UUFDakIsS0FBSy9FLEtBQUwsR0FBYSxDQUNYLEtBQUs2RSxFQURNLEVBRVgsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixJQUFhLENBQWQsRUFBaUIsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBakIsQ0FGVyxFQUdYLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUFkLEVBQWlCLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLENBQWpCLENBSFcsRUFJWCxDQUFDLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBZCxFQUFpQixLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFqQixDQUpXLENBQWI7TUFNRCxDQVBELE1BT087UUFDTCxLQUFLN0UsS0FBTCxHQUFhLENBQ1gsS0FBSzZFLEVBRE0sRUFFWCxDQUFDLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLENBQUQsRUFBYSxLQUFLQSxFQUFMLENBQVEsQ0FBUixJQUFhLENBQTFCLENBRlcsRUFHWCxDQUFDLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLENBQUQsRUFBYSxLQUFLQSxFQUFMLENBQVEsQ0FBUixJQUFhLENBQTFCLENBSFcsRUFJWCxDQUFDLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLENBQUQsRUFBYSxLQUFLQSxFQUFMLENBQVEsQ0FBUixJQUFhLENBQTFCLENBSlcsQ0FBYjtNQU1EOztNQUVEOztJQUNGLEtBQUssU0FBTDtNQUNFLEtBQUtoQyxNQUFMLEdBQWMsQ0FBZDs7TUFFQSxJQUFJa0MsS0FBSyxLQUFLLEdBQWQsRUFBbUI7UUFDakIsS0FBSy9FLEtBQUwsR0FBYSxDQUNYLEtBQUs2RSxFQURNLEVBRVgsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixJQUFhLENBQWQsRUFBaUIsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBakIsQ0FGVyxFQUdYLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUFkLEVBQWlCLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLENBQWpCLENBSFcsRUFJWCxDQUFDLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBZCxFQUFpQixLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFqQixDQUpXLEVBS1gsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixJQUFhLENBQWQsRUFBaUIsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBakIsQ0FMVyxDQUFiO01BT0QsQ0FSRCxNQVFPO1FBQ0wsS0FBSzdFLEtBQUwsR0FBYSxDQUNYLEtBQUs2RSxFQURNLEVBRVgsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFELEVBQWEsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUExQixDQUZXLEVBR1gsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFELEVBQWEsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUExQixDQUhXLEVBSVgsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFELEVBQWEsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUExQixDQUpXLEVBS1gsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFELEVBQWEsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUExQixDQUxXLENBQWI7TUFPRDs7TUFDRDs7SUFDRjtNQUNFLE9BQU8sd0JBQVA7RUF2Rko7O0VBMEZBLEtBQUtULEdBQUwsR0FBWVksR0FBRCxJQUFTO0lBQ2xCLEtBQUtGLFdBQUwsQ0FBaUJFLEdBQWpCLElBQXdCLEdBQXhCO0lBQ0EsS0FBS25DLE1BQUw7SUFFQSxzQ0FBK0JtQyxHQUEvQjtFQUNELENBTEQ7O0VBT0EsS0FBS1YsTUFBTCxHQUFjLE1BQU07SUFDbEIsTUFBTVcsUUFBUSxHQUFHLEtBQUtILFdBQUwsQ0FBaUJJLE1BQWpCLENBQXlCRixHQUFELElBQVM7TUFDaEQsSUFBSUEsR0FBRyxLQUFLLEdBQVosRUFBaUI7UUFDZixPQUFPLElBQVA7TUFDRDtJQUNGLENBSmdCLENBQWpCOztJQU1BLElBQUlDLFFBQVEsSUFBSSxLQUFLcEMsTUFBTCxJQUFlLENBQS9CLEVBQWtDO01BQ2hDLE9BQU8sSUFBUDtJQUNELENBRkQsTUFFTztNQUNMLE9BQU8sS0FBUDtJQUNEO0VBQ0YsQ0FaRDtBQWFELENBdEhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQzBHO0FBQ2pCO0FBQ3pGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSxnREFBZ0QsY0FBYyxxQkFBcUIsR0FBRyxZQUFZLDRCQUE0QixpQkFBaUIsdUJBQXVCLGlCQUFpQixHQUFHLGVBQWUsa0JBQWtCLHNCQUFzQixHQUFHLHFCQUFxQiw2QkFBNkIsS0FBSyxxQkFBcUIsK0JBQStCLEdBQUcsdUNBQXVDLGlCQUFpQixrQkFBa0IsR0FBRyx1Q0FBdUMsaUJBQWlCLGtCQUFrQixrQkFBa0IsMkNBQTJDLHdDQUF3QywyQkFBMkIseUJBQXlCLEdBQUcsK0NBQStDLG9CQUFvQix3Q0FBd0MsR0FBRyxtREFBbUQsZ0JBQWdCLGlCQUFpQiw4QkFBOEIsR0FBRyxZQUFZLDRCQUE0QixpQkFBaUIsb0JBQW9CLGNBQWMsaUJBQWlCLHVCQUF1QixHQUFHLFNBQVMsZ0ZBQWdGLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxLQUFLLEtBQUssVUFBVSxZQUFZLE9BQU8sV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLE1BQU0sTUFBTSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sTUFBTSxVQUFVLFlBQVksT0FBTyxPQUFPLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxnQ0FBZ0MsY0FBYyxxQkFBcUIsR0FBRyxZQUFZLDRCQUE0QixpQkFBaUIsdUJBQXVCLGlCQUFpQixHQUFHLGVBQWUsa0JBQWtCLHNCQUFzQixHQUFHLHFCQUFxQiw2QkFBNkIsS0FBSyxxQkFBcUIsK0JBQStCLEdBQUcsdUNBQXVDLGlCQUFpQixrQkFBa0IsR0FBRyx1Q0FBdUMsaUJBQWlCLGtCQUFrQixrQkFBa0IsMkNBQTJDLHdDQUF3QywyQkFBMkIseUJBQXlCLEdBQUcsK0NBQStDLG9CQUFvQix3Q0FBd0MsR0FBRyxtREFBbUQsZ0JBQWdCLGlCQUFpQiw4QkFBOEIsR0FBRyxZQUFZLDRCQUE0QixpQkFBaUIsb0JBQW9CLGNBQWMsaUJBQWlCLHVCQUF1QixHQUFHLHFCQUFxQjtBQUN2L0U7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7QUNQMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxREFBcUQ7QUFDckQ7O0FBRUE7QUFDQSxnREFBZ0Q7QUFDaEQ7O0FBRUE7QUFDQSxxRkFBcUY7QUFDckY7O0FBRUE7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLHFCQUFxQjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNyR2E7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSw2RkFBYyxHQUFHLDZGQUFjLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCLDZCQUE2QjtBQUNsRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDdENhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDVmE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJOztBQUVqRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCB7IGdhbWVMb29wIH0gZnJvbSBcIi4vY29udHJvbGxlclwiO1xuXG5jb25zdCBwYlNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllci1ib2FyZFwiKTtcbmNvbnN0IGNiU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tcHV0ZXItYm9hcmRcIik7XG5jb25zdCBwbGFjZVNoaXBTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGFjZVNoaXBzXCIpO1xuY29uc3Qgc2hpcE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuc2hpcE5hbWUuaWQgPSBcInNoaXBOYW1lXCI7XG5zaGlwTmFtZS50ZXh0Q29udGVudCA9IGBXaGVyZSB3aWxsIHlvdSBwbGFjZSB5b3VyIHBhdHJvbCBib2F0P2A7XG5cbmxldCBzaGlwcyA9IFtdO1xubGV0IG9jY3VwaWVkU3BvdHMgPSBbXTtcbmxldCBjb3VudCA9IDA7XG5sZXQgcGxheWFibGVTcG90cyA9IFtdO1xuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJHcmlkKCkge1xuICBjb25zdCBwZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgcGdyaWRDb250YWluZXIuY2xhc3NOYW1lID0gXCJwYlNlY3Rpb24taXRlbVwiO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk5OyB4KyspIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc05hbWUgPSBcInBiLWdyaWQtaXRlbVwiO1xuICAgIHBncmlkQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cblxuICBwYlNlY3Rpb24uYXBwZW5kQ2hpbGQocGdyaWRDb250YWluZXIpO1xuICBpZEdyaWRzKFwiLnBiLWdyaWQtaXRlbVwiKTtcbiAgY29uc3QgcGxheWVyU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGItZ3JpZC1pdGVtXCIpO1xuICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpO1xufVxuZnVuY3Rpb24gb3JpZW50YXRpb25Ub2dnbGUoKSB7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgY29uc3QgZmllbGRzZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XG4gIGNvbnN0IGxlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIik7XG4gIGxlZ2VuZC50ZXh0Q29udGVudCA9IFwiT3JpZW50YXRpb25cIjtcbiAgY29uc3QgdG9nZ2xlMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHRvZ2dsZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB2VG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBjb25zdCBoVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBjb25zdCBsYWJlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gIGNvbnN0IGxhYmVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgbGFiZWwxLmZvciA9IFwiVlwiO1xuICBsYWJlbDIuZm9yID0gXCJIXCI7XG4gIGxhYmVsMS50ZXh0Q29udGVudCA9IFwiVmVydGljYWw6IFwiO1xuICBsYWJlbDIudGV4dENvbnRlbnQgPSBcIkhvcml6b250YWw6IFwiO1xuICB2VG9nZ2xlLnR5cGUgPSBcInJhZGlvXCI7XG4gIHZUb2dnbGUuaWQgPSBcIlZcIjtcbiAgdlRvZ2dsZS52YWx1ZSA9IFwiVlwiO1xuICB2VG9nZ2xlLmNoZWNrZWQgPSB0cnVlO1xuICB2VG9nZ2xlLm5hbWUgPSBcIm9yaWVudGF0aW9uXCI7XG4gIGhUb2dnbGUudHlwZSA9IFwicmFkaW9cIjtcbiAgaFRvZ2dsZS5pZCA9IFwiSFwiO1xuICBoVG9nZ2xlLnZhbHVlID0gXCJIXCI7XG4gIGhUb2dnbGUubmFtZSA9IFwib3JpZW50YXRpb25cIjtcblxuICB0b2dnbGUxLmFwcGVuZENoaWxkKGxhYmVsMSk7XG4gIHRvZ2dsZTEuYXBwZW5kQ2hpbGQodlRvZ2dsZSk7XG4gIHRvZ2dsZTIuYXBwZW5kQ2hpbGQobGFiZWwyKTtcbiAgdG9nZ2xlMi5hcHBlbmRDaGlsZChoVG9nZ2xlKTtcbiAgZmllbGRzZXQuYXBwZW5kQ2hpbGQobGVnZW5kKTtcbiAgZmllbGRzZXQuYXBwZW5kQ2hpbGQodG9nZ2xlMSk7XG4gIGZpZWxkc2V0LmFwcGVuZENoaWxkKHRvZ2dsZTIpO1xuICBmb3JtLmFwcGVuZENoaWxkKGZpZWxkc2V0KTtcblxuICBwbGFjZVNoaXBTZWN0aW9uLmFwcGVuZENoaWxkKGZvcm0pO1xuICBwbGFjZVNoaXBTZWN0aW9uLmFwcGVuZENoaWxkKHNoaXBOYW1lKTtcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwR3JpZCgpIHtcbiAgY29uc3QgcGxTaGlwQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICBwbFNoaXBDb250YWluZXIuY2xhc3NOYW1lID0gXCJwYlNlY3Rpb24taXRlbVwiO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk5OyB4KyspIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc05hbWUgPSBcInBzLWdyaWQtaXRlbVwiO1xuICAgIHBsU2hpcENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG4gIG9yaWVudGF0aW9uVG9nZ2xlKCk7XG4gIHBsYWNlU2hpcFNlY3Rpb24uYXBwZW5kQ2hpbGQocGxTaGlwQ29udGFpbmVyKTtcbiAgaWRHcmlkcyhcIi5wcy1ncmlkLWl0ZW1cIik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVuZW15R3JpZCgpIHtcbiAgY29uc3QgY2dyaWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjZ3JpZENvbnRhaW5lci5jbGFzc05hbWUgPSBcImNiU2VjdGlvbi1pdGVtXCI7XG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk5OyB4KyspIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc05hbWUgPSBgY2ItZ3JpZC1pdGVtYDtcblxuICAgIGNncmlkQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cbiAgY2JTZWN0aW9uLmFwcGVuZENoaWxkKGNncmlkQ29udGFpbmVyKTtcbiAgaWRHcmlkcyhcIi5jYi1ncmlkLWl0ZW1cIik7XG59XG5cbmZ1bmN0aW9uIGlkR3JpZHMoc2VsZWN0b3IpIHtcbiAgY29uc3QgZ3JpZGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIGxldCBteUFyciA9IFtdO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IDk7IHkrKykge1xuICAgICAgbXlBcnIucHVzaChbeSwgeF0pO1xuICAgICAgcGxheWFibGVTcG90cy5wdXNoKFt5LCB4XSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDA7IHgrKykge1xuICAgIGdyaWRpdGVtc1t4XS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkXCIsIGBbJHtteUFyclt4XX1dYCk7XG4gIH1cbn1cbnBsYWNlU2hpcEdyaWQoKTtcbmNvbnN0IHBsYXllclNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBzLWdyaWQtaXRlbVwiKTtcblxuZnVuY3Rpb24gcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKSB7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmNvb3JkLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBvY2N1cGllZFNwb3RzLnB1c2goYFske2Nvb3JkfV1gKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcGxheWVyU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBvY2N1cGllZFNwb3RzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmQudG9TdHJpbmcoKSkge1xuICAgICAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmV5XCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwbGF5ZXJBdHRhY2tEaXNwbGF5KG9iaiwgZSkge1xuICBjb25zdCBhdHRhY2tlZFNwb3RzID0gb2JqLmF0dGFja2VkU3BvdHM7XG4gIGNvbnN0IG9jY3VwaWVkU3BvdHMgPSBvYmoub2NjdXBpZWRTcG90cztcblxuICBjb25zdCBjb29yZENoZWNrMSA9IGF0dGFja2VkU3BvdHMuc29tZSgoY29vcmQpID0+IHtcbiAgICByZXR1cm4gZS50YXJnZXQuZGF0YXNldC5jb29yZC50b1N0cmluZygpID09PSBgWyR7Y29vcmQudG9TdHJpbmcoKX1dYDtcbiAgfSk7XG4gIGNvbnN0IGNvb3JkQ2hlY2syID0gb2NjdXBpZWRTcG90cy5zb21lKChjb29yZCkgPT4ge1xuICAgIHJldHVybiBlLnRhcmdldC5kYXRhc2V0LmNvb3JkLnRvU3RyaW5nKCkgPT09IGBbJHtjb29yZC50b1N0cmluZygpfV1gO1xuICB9KTtcbiAgY29uc29sZS5sb2coY29vcmRDaGVjazEsIGNvb3JkQ2hlY2syKTtcbiAgY29uc29sZS5sb2coZS50YXJnZXQuZGF0YXNldC5jb29yZCk7XG5cbiAgaWYgKGNvb3JkQ2hlY2sxICYmIGNvb3JkQ2hlY2syKSB7XG4gICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcbiAgfSBlbHNlIGlmIChjb29yZENoZWNrMSAmJiAhY29vcmRDaGVjazIpIHtcbiAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0c2t5Ymx1ZVwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuZW15QXR0YWNrRGlzcGxheShvYmopIHtcbiAgY29uc3QgbWlzc2VkSGl0cyA9IG9iai5taXNzZWRIaXQ7XG4gIGNvbnN0IGhpdFNwb3RzID0gb2JqLmhpdFNwb3RzO1xuICBjb25zdCBwbGF5ZXJTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wYi1ncmlkLWl0ZW1cIik7XG5cbiAgcGxheWVyU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBtaXNzZWRIaXRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gYFske2Nvb3JkLnRvU3RyaW5nKCl9XWApIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygpXG4gICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0c2t5Ymx1ZVwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICBwbGF5ZXJTcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgIGhpdFNwb3RzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gYFske2Nvb3JkLnRvU3RyaW5nKCl9XWApIHtcbiAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUNvb3JkcyhzaGlwKSB7XG4gIGNvbnN0IHBsYXlhYmxlU3BvdENoZWNrID0gc2hpcC5jb29yZC5ldmVyeSgoY29vcmQpID0+IHtcbiAgICByZXR1cm4gcGxheWFibGVTcG90cy5zb21lKChjb29yZHMpID0+IHtcbiAgICAgIGlmIChjb29yZC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKHBsYXlhYmxlU3BvdENoZWNrKTtcbiAgaWYgKCFwbGF5YWJsZVNwb3RDaGVjaykge1xuICAgIGNvdW50LS07XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXBzKGUpIHtcbiAgY29uc3Qgb3JpZW50YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICdpbnB1dFtuYW1lPVwib3JpZW50YXRpb25cIl06Y2hlY2tlZCdcbiAgKS52YWx1ZTtcbiAgY29uc3QgY29vcmRzID0gSlNPTi5wYXJzZShlLnRhcmdldC5kYXRhc2V0LmNvb3JkKTtcbiAgbGV0IHBhdHJvbCwgc3VibWFyaW5lLCBkZXN0cm95ZXIsIGJhdHRsZXNoaXAsIGNhcnJpZXI7XG5cbiAgc3dpdGNoIChjb3VudCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHBhdHJvbCA9IG5ldyBTaGlwKFwicGF0cm9sXCIsIGNvb3Jkcywgb3JpZW50YXRpb24pO1xuXG4gICAgICBpZiAoIXZhbGlkYXRlQ29vcmRzKHBhdHJvbCkpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcHMucHVzaChwYXRyb2wpO1xuICAgICAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpO1xuICAgICAgfVxuXG4gICAgICBzaGlwTmFtZS50ZXh0Q29udGVudCA9IGBXaGVyZSB3aWxsIHlvdSBwbGFjZSB5b3VyIHN1Ym1hcmluZT9gO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOlxuICAgICAgc3VibWFyaW5lID0gbmV3IFNoaXAoXCJzdWJtYXJpbmVcIiwgY29vcmRzLCBvcmllbnRhdGlvbik7XG5cbiAgICAgIGlmICghdmFsaWRhdGVDb29yZHMoc3VibWFyaW5lKSkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGlwcy5wdXNoKHN1Ym1hcmluZSk7XG4gICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcyk7XG4gICAgICB9XG5cbiAgICAgIHNoaXBOYW1lLnRleHRDb250ZW50ID0gYFdoZXJlIHdpbGwgeW91IHBsYWNlIHlvdXIgZGVzdHJveWVyP2A7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBkZXN0cm95ZXIgPSBuZXcgU2hpcChcImRlc3Ryb3llclwiLCBjb29yZHMsIG9yaWVudGF0aW9uKTtcblxuICAgICAgaWYgKCF2YWxpZGF0ZUNvb3JkcyhkZXN0cm95ZXIpKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBzLnB1c2goZGVzdHJveWVyKTtcbiAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKTtcbiAgICAgIH1cbiAgICAgIHNoaXBOYW1lLnRleHRDb250ZW50ID0gYFdoZXJlIHdpbGwgeW91IHBsYWNlIHlvdXIgYmF0dGxlc2hpcD9gO1xuXG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6XG4gICAgICBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXCJiYXR0bGVzaGlwXCIsIGNvb3Jkcywgb3JpZW50YXRpb24pO1xuXG4gICAgICBpZiAoIXZhbGlkYXRlQ29vcmRzKGJhdHRsZXNoaXApKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBzLnB1c2goYmF0dGxlc2hpcCk7XG4gICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcyk7XG4gICAgICB9XG4gICAgICBzaGlwTmFtZS50ZXh0Q29udGVudCA9IGBXaGVyZSB3aWxsIHlvdSBwbGFjZSB5b3VyIGNhcnJpZXI/YDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIGNhcnJpZXIgPSBuZXcgU2hpcChcImNhcnJpZXJcIiwgY29vcmRzLCBvcmllbnRhdGlvbik7XG5cbiAgICAgIGlmICghdmFsaWRhdGVDb29yZHMoY2FycmllcikpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcHMucHVzaChjYXJyaWVyKTtcbiAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAoY291bnQgPT09IDQpIHtcbiAgICBjcmVhdGVQbGF5ZXJHcmlkKCk7XG4gICAgY3JlYXRlRW5lbXlHcmlkKCk7XG4gICAgZ2FtZUxvb3AoKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgY291bnQgKz0gMTtcbn1cblxucGxheWVyU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgIChlKSA9PiB7XG4gICAgICBjcmVhdGVTaGlwcyhlKTtcbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9XG4gICk7XG59KTtcblxuLypcbiAqL1xuXG5leHBvcnQgeyBzaGlwcywgcGxheWVyQXR0YWNrRGlzcGxheSwgZW5lbXlBdHRhY2tEaXNwbGF5IH07XG4iLCJpbXBvcnQgeyBzaGlwcywgcGxheWVyQXR0YWNrRGlzcGxheSwgZW5lbXlBdHRhY2tEaXNwbGF5IH0gZnJvbSBcIi4vRE9NXCI7XG5pbXBvcnQgeyBnZXRSYW5kb21JbnQsIFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBvcHRpb25zID0gW1wiVlwiLCBcIkhcIl07XG5jb25zdCBjb21wdXRlclNoaXBzID0gW107XG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5jb25zdCBwYXRyb2wgPSBuZXcgU2hpcChcbiAgXCJwYXRyb2xcIixcbiAgW2dldFJhbmRvbUludCgwLCA5KSwgZ2V0UmFuZG9tSW50KDAsIDkpXSxcbiAgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCldXG4pO1xuY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoXG4gIFwic3VibWFyaW5lXCIsXG4gIFtnZXRSYW5kb21JbnQoMCwgOSksIGdldFJhbmRvbUludCgwLCA5KV0sXG4gIG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5sZW5ndGgpXVxuKTtcbmNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKFxuICBcImRlc3Ryb3llclwiLFxuICBbZ2V0UmFuZG9tSW50KDAsIDkpLCBnZXRSYW5kb21JbnQoMCwgOSldLFxuICBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKV1cbik7XG5jb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXG4gIFwiYmF0dGxlc2hpcFwiLFxuICBbZ2V0UmFuZG9tSW50KDAsIDkpLCBnZXRSYW5kb21JbnQoMCwgOSldLFxuICBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKV1cbik7XG5jb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoXG4gIFwiY2FycmllclwiLFxuICBbZ2V0UmFuZG9tSW50KDAsIDkpLCBnZXRSYW5kb21JbnQoMCwgOSldLFxuICBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKV1cbik7XG5jb21wdXRlclNoaXBzLnB1c2gocGF0cm9sLCBzdWJtYXJpbmUsIGRlc3Ryb3llciwgYmF0dGxlc2hpcCwgY2Fycmllcik7XG5cbi8qXG5cbmlmKHBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpIHx8IGNvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkgKSB7XG4gICAgYWxlcnQoXCJHYW1lJ3MgVVAhXCIpXG5cbiAgICBpZihwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICBhbGVydChcIkNvbXB1dGVyIFdJTlNcIilcbiAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydChcIkh1bWFuIFdJTlNcIilcbiAgICB9XG59XG4qL1xuXG5jb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiUGxheWVyIDFcIiwgY29tcHV0ZXJCb2FyZCk7XG5jb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJjb21wdXRlclwiLCBwbGF5ZXJCb2FyZCk7XG5cbmZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICBjb25zdCBlbmVteVNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNiLWdyaWQtaXRlbVwiKTtcblxuICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKHNoaXApO1xuICB9KTtcblxuICBjb21wdXRlclNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICByY1BsYWNlU2hpcChjb21wdXRlckJvYXJkLCBzaGlwKTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmQpO1xuXG4gIGVuZW15U3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiY2xpY2tcIixcbiAgICAgIChlKSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coZS50YXJnZXQuZGF0YXNldC5jb29yZClcbiAgICAgICAgY29uc29sZS5sb2cocGxheWVyLmF0dGFja09wcG9uZW50KEpTT04ucGFyc2UoZS50YXJnZXQuZGF0YXNldC5jb29yZCkpKTtcbiAgICAgICAgY29uc29sZS5sb2coY29tcHV0ZXIuYXR0YWNrT3Bwb25lbnQoKSk7XG4gICAgICAgIHBsYXllckF0dGFja0Rpc3BsYXkoY29tcHV0ZXJCb2FyZCwgZSk7XG4gICAgICAgIGVuZW15QXR0YWNrRGlzcGxheShwbGF5ZXJCb2FyZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmQpO1xuICAgICAgfSxcbiAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgKTtcbiAgfSk7XG5cbiAgaWYgKHBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpIHx8IGNvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICBhbGVydChcIkdhbWUncyBVUCFcIik7XG5cbiAgICBpZiAocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGFsZXJ0KFwiQ29tcHV0ZXIgV0lOU1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXCJIdW1hbiBXSU5TXCIpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByY1BsYWNlU2hpcChnYW1lYm9hcmQsIHNoaXApIHtcbiAgdHJ5IHtcbiAgICBnYW1lYm9hcmQucGxhY2VTaGlwKHNoaXApO1xuICB9IGNhdGNoIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbmV3U2hpcCA9IG5ldyBTaGlwKFxuICAgICAgICBzaGlwLm5hbWUsXG4gICAgICAgIFtnZXRSYW5kb21JbnQoMCwgOSksIGdldFJhbmRvbUludCgwLCA5KV0sXG4gICAgICAgIG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5sZW5ndGgpXVxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKG5ld1NoaXApO1xuICAgICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChuZXdTaGlwKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJjUGxhY2VTaGlwKGdhbWVib2FyZCwgc2hpcCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IGdhbWVMb29wIH07XG4iLCIvL2NvbnN0IFNoaXAgPSByZXF1aXJlKFwiLi9zaGlwXCIpXG5cbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5taXNzZWRIaXQgPSBbXTtcbiAgdGhpcy5zaGlwcyA9IFtdO1xuICB0aGlzLm9jY3VwaWVkU3BvdHMgPSBbXTtcbiAgdGhpcy5wbGF5YWJsZVNwb3RzID0gW107XG4gIHRoaXMuYXR0YWNrZWRTcG90cyA9IFtdO1xuICB0aGlzLmhpdFNwb3RzID0gW107XG5cbiAgZm9yIChsZXQgeCA9IDA7IHggPD0gOTsgeCsrKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gOTsgeSsrKSB7XG4gICAgICB0aGlzLnBsYXlhYmxlU3BvdHMucHVzaChbeSwgeF0pO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMucGxhY2VTaGlwID0gKHNoaXApID0+IHtcbiAgICBjb25zdCBvY2N1cGllZFNwb3RDaGVjayA9IHNoaXAuY29vcmQuc29tZSgoY29vcmQpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm9jY3VwaWVkU3BvdHMuc29tZSgoY29vcmRzKSA9PiB7XG4gICAgICAgIGlmIChjb29yZC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHBsYXlhYmxlU3BvdENoZWNrID0gc2hpcC5jb29yZC5ldmVyeSgoY29vcmQpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnBsYXlhYmxlU3BvdHMuc29tZSgoY29vcmRzKSA9PiB7XG4gICAgICAgIGlmIChjb29yZC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlmIChvY2N1cGllZFNwb3RDaGVjaykge1xuICAgICAgdGhyb3cgXCJTaGlwIGNvb3JkaW5hdGVzIGFyZSB0YWtlblwiO1xuICAgIH0gZWxzZSBpZiAoIXBsYXlhYmxlU3BvdENoZWNrKSB7XG4gICAgICB0aHJvdyBcIlNoaXAgY29vcmRpbmF0ZXMgYXJlIG91dCBvZiBib3VuZHNcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgICAgc2hpcC5jb29yZC5mb3JFYWNoKChwb2ludCkgPT4ge1xuICAgICAgICB0aGlzLm9jY3VwaWVkU3BvdHMucHVzaChwb2ludCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5yZWNlaXZlQXR0YWNrID0gKGNvb3JkcykgPT4ge1xuICAgIHRoaXMuYXR0YWNrZWRTcG90cy5wdXNoKGNvb3Jkcyk7XG5cbiAgICBjb25zdCBpbmRleCA9IHRoaXMucGxheWFibGVTcG90cy5maW5kSW5kZXgoKGVsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlbGVtZW50KSA9PSBKU09OLnN0cmluZ2lmeShjb29yZHMpO1xuICAgIH0pO1xuICAgIHRoaXMucGxheWFibGVTcG90cy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgY29uc3QgY29vcmRDaGVjayA9IHRoaXMub2NjdXBpZWRTcG90cy5zb21lKCh2YWwpID0+IHtcbiAgICAgIGlmICh2YWwudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoY29vcmRDaGVjaykge1xuICAgICAgY29uc3QgbXlTaGlwID0gdGhpcy5zaGlwcy5maW5kKChzaGlwKSA9PiB7XG4gICAgICAgIHJldHVybiBzaGlwLmNvb3JkLmZpbmQoKGNvb3JkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvb3JkLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBpbmRleCA9IG15U2hpcC5jb29yZC5maW5kSW5kZXgoKHZhbCkgPT4ge1xuICAgICAgICBpZiAodmFsLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbXlTaGlwLmhpdChpbmRleCk7XG4gICAgICB0aGlzLmhpdFNwb3RzLnB1c2goY29vcmRzKTtcblxuICAgICAgcmV0dXJuIFwiQXR0YWNrIGhpdCBhIHNoaXBcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5taXNzZWRIaXQucHVzaChjb29yZHMpO1xuXG4gICAgICByZXR1cm4gXCJBdHRhY2sgbWlzc2VkXCI7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGRlY2lzaW9uID0gdGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoZGVjaXNpb24pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xufTtcblxuLypjb25zdCBzaGlwID0gbmV3IFNoaXAoMyxbWzIsMl0sWzMsMl0sWzIsNV0sWzMsNV1dKVxuY29uc29sZS5sb2coc2hpcC5jb29yZClcbmZ1bmN0aW9uIGZpbmRJbmRleCh4LHkpIHtcblxuICAgIGNvbnN0IGluZGV4ICA9IHkuZmluZEluZGV4XG5cbn0gXG5cbmNvbnN0IHNoaXAgPSBuZXcgU2hpcCg0KVxuY29uc3Qgc2hpcENvb3JkcyA9IFtbMiwyXSxbMywyXSxbMiw1XSxbMyw1XV1cbmNvbnN0IGdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoc2hpcCxzaGlwQ29vcmRzKVxuLy9jb25zb2xlLmxvZyhnYW1lYm9hcmQucGxheWFibGVTcG90cylcblxuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soWzMsNV0pXG5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbMiwyXSlcbmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFszLDJdKVxuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soWzIsNV0pXG4vL2NvbnNvbGUubG9nKGdhbWVib2FyZC5wbGF5YWJsZVNwb3RzKVxuLy9jb25zb2xlLmxvZyhnYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpKi9cblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1pbm5lci1kZWNsYXJhdGlvbnMgKi9cbmNvbnN0IFBsYXllciA9IGZ1bmN0aW9uIChuYW1lLCBnYW1lYm9hcmQpIHtcbiAgdGhpcy5uYW1lID0gbmFtZS50b1VwcGVyQ2FzZSgpO1xuICB0aGlzLmdhbWVib2FyZCA9IGdhbWVib2FyZDtcblxuICB0aGlzLmF0dGFja09wcG9uZW50ID0gKGNvb3JkKSA9PiB7XG4gICAgaWYgKHRoaXMubmFtZSA9PT0gXCJDT01QVVRFUlwiKSB7XG4gICAgICBjb25zdCBjb29yZENoZWNrZXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhbmRDb29yZCA9IFtnZXRSYW5kb21JbnQoMCwgOSksIGdldFJhbmRvbUludCgwLCA5KV07XG5cbiAgICAgICAgY29uc3QgY29vcmRDaGVjayA9IHRoaXMuZ2FtZWJvYXJkLnBsYXlhYmxlU3BvdHMuc29tZSgodmFsKSA9PiB7XG4gICAgICAgICAgaWYgKHZhbC50b1N0cmluZygpID09PSByYW5kQ29vcmQudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNvb3JkQ2hlY2spIHtcbiAgICAgICAgICB0aGlzLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRDb29yZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcmFuZENvb3JkID0gW2dldFJhbmRvbUludCgwLCA5KSwgZ2V0UmFuZG9tSW50KDAsIDkpXTtcbiAgICAgICAgICB0aGlzLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRDb29yZCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocmFuZENvb3JkKTtcbiAgICAgIH07XG4gICAgICBjb29yZENoZWNrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZCk7XG4gICAgfVxuICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IGF0dGFja2VkIGF0ICR7Y29vcmR9YDtcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUludChtYXgsIG1pbikge1xuICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbn1cblxuZXhwb3J0IHsgZ2V0UmFuZG9tSW50LCBQbGF5ZXIgfTtcblxuLy9tb2R1bGUuZXhwb3J0cyA9IFBsYXllclxuIiwiY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChuYW1lLCBzQywgb3JpZW50YXRpb24pIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICB0aGlzLmhpdExvY2F0aW9uID0gW107XG4gIHRoaXMuc0MgPSBzQztcblxuICBjb25zdCBvclN0ciA9IG9yaWVudGF0aW9uLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKTtcblxuICBzd2l0Y2ggKG5hbWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgY2FzZSBcIlBBVFJPTFwiOlxuICAgICAgdGhpcy5sZW5ndGggPSAyO1xuXG4gICAgICBpZiAob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQywgW3RoaXMuc0NbMF0gKyAxLCB0aGlzLnNDWzFdXV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMV1dO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIlNVQk1BUklORVwiOlxuICAgICAgdGhpcy5sZW5ndGggPSAzO1xuICAgICAgaWYgKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAxLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDIsIHRoaXMuc0NbMV1dLFxuICAgICAgICBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFtcbiAgICAgICAgICB0aGlzLnNDLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAyXSxcbiAgICAgICAgXTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkRFU1RST1lFUlwiOlxuICAgICAgdGhpcy5sZW5ndGggPSAzO1xuXG4gICAgICBpZiAob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbXG4gICAgICAgICAgdGhpcy5zQyxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDEsIHRoaXMuc0NbMV1dLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMiwgdGhpcy5zQ1sxXV0sXG4gICAgICAgIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAxXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDJdLFxuICAgICAgICBdO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiQkFUVExFU0hJUFwiOlxuICAgICAgdGhpcy5sZW5ndGggPSA0O1xuXG4gICAgICBpZiAob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbXG4gICAgICAgICAgdGhpcy5zQyxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDEsIHRoaXMuc0NbMV1dLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMiwgdGhpcy5zQ1sxXV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAzLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbXG4gICAgICAgICAgdGhpcy5zQyxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDFdLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMl0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAzXSxcbiAgICAgICAgXTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkNBUlJJRVJcIjpcbiAgICAgIHRoaXMubGVuZ3RoID0gNTtcblxuICAgICAgaWYgKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAxLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDIsIHRoaXMuc0NbMV1dLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMywgdGhpcy5zQ1sxXV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyA0LCB0aGlzLnNDWzFdXSxcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbXG4gICAgICAgICAgdGhpcy5zQyxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDFdLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMl0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAzXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDRdLFxuICAgICAgICBdO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcIkludmFsaWQgY2hvaWNlIG9mIHNoaXBcIjtcbiAgfVxuXG4gIHRoaXMuaGl0ID0gKG51bSkgPT4ge1xuICAgIHRoaXMuaGl0TG9jYXRpb25bbnVtXSA9IFwiWFwiO1xuICAgIHRoaXMubGVuZ3RoLS07XG5cbiAgICByZXR1cm4gYFNoaXAgaXMgaGl0IGF0IHBvaW50ICR7bnVtfWA7XG4gIH07XG5cbiAgdGhpcy5pc1N1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgaGl0Q2hlY2sgPSB0aGlzLmhpdExvY2F0aW9uLmZpbHRlcigobnVtKSA9PiB7XG4gICAgICBpZiAobnVtID09PSBcIlhcIikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChoaXRDaGVjayAmJiB0aGlzLmxlbmd0aCA9PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogd2hpdGU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAycHg7XFxufVxcbi5nYW1lYm9hcmRzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtYXJnaW4tdG9wOiAxMDBweDtcXG59XFxuXFxuLyoucGxheWVyLWJvYXJkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG5cXG59XFxuXFxuLmNvbXB1dGVyLWJvYXJkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWFyb29uO1xcbn0qL1xcblxcbi5wbGF5ZXItYm9hcmQsXFxuLmNvbXB1dGVyLWJvYXJkIHtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi5wYlNlY3Rpb24taXRlbSxcXG4uY2JTZWN0aW9uLWl0ZW0ge1xcbiAgd2lkdGg6IDI2MHB4O1xcbiAgaGVpZ2h0OiAyNjBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcXG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xcbn1cXG5cXG4uY2ItZ3JpZC1pdGVtOmhvdmVyLFxcbi5wcy1ncmlkLWl0ZW06aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsIDAsIDAsIDAuMSk7XFxufVxcblxcbi5wYi1ncmlkLWl0ZW0sXFxuLmNiLWdyaWQtaXRlbSxcXG4ucHMtZ3JpZC1pdGVtIHtcXG4gIHdpZHRoOiAyNXB4O1xcbiAgaGVpZ2h0OiAyNXB4O1xcbiAgYm9yZGVyOiAwLjFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLFlBQVk7QUFDZDtBQUNBO0VBQ0UsYUFBYTtFQUNiLGlCQUFpQjtBQUNuQjs7QUFFQTs7Ozs7OztFQU9FOztBQUVGOztFQUVFLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7O0VBRUUsWUFBWTtFQUNaLGFBQWE7RUFDYixhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG1DQUFtQztFQUNuQyxzQkFBc0I7RUFDdEIsb0JBQW9CO0FBQ3RCOztBQUVBOztFQUVFLGVBQWU7RUFDZixtQ0FBbUM7QUFDckM7O0FBRUE7OztFQUdFLFdBQVc7RUFDWCxZQUFZO0VBQ1oseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixlQUFlO0VBQ2YsU0FBUztFQUNULFlBQVk7RUFDWixrQkFBa0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogd2hpdGU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAycHg7XFxufVxcbi5nYW1lYm9hcmRzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtYXJnaW4tdG9wOiAxMDBweDtcXG59XFxuXFxuLyoucGxheWVyLWJvYXJkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG5cXG59XFxuXFxuLmNvbXB1dGVyLWJvYXJkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWFyb29uO1xcbn0qL1xcblxcbi5wbGF5ZXItYm9hcmQsXFxuLmNvbXB1dGVyLWJvYXJkIHtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi5wYlNlY3Rpb24taXRlbSxcXG4uY2JTZWN0aW9uLWl0ZW0ge1xcbiAgd2lkdGg6IDI2MHB4O1xcbiAgaGVpZ2h0OiAyNjBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcXG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xcbn1cXG5cXG4uY2ItZ3JpZC1pdGVtOmhvdmVyLFxcbi5wcy1ncmlkLWl0ZW06aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsIDAsIDAsIDAuMSk7XFxufVxcblxcbi5wYi1ncmlkLWl0ZW0sXFxuLmNiLWdyaWQtaXRlbSxcXG4ucHMtZ3JpZC1pdGVtIHtcXG4gIHdpZHRoOiAyNXB4O1xcbiAgaGVpZ2h0OiAyNXB4O1xcbiAgYm9yZGVyOiAwLjFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgXCIuL21vZHVsZXMvRE9NXCI7XG5pbXBvcnQgXCIuL21vZHVsZXMvY29udHJvbGxlclwiO1xuIl0sIm5hbWVzIjpbIlNoaXAiLCJnYW1lTG9vcCIsInBiU2VjdGlvbiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNiU2VjdGlvbiIsInBsYWNlU2hpcFNlY3Rpb24iLCJzaGlwTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsInRleHRDb250ZW50Iiwic2hpcHMiLCJvY2N1cGllZFNwb3RzIiwiY291bnQiLCJwbGF5YWJsZVNwb3RzIiwiY3JlYXRlUGxheWVyR3JpZCIsInBncmlkQ29udGFpbmVyIiwiY2xhc3NOYW1lIiwieCIsImRpdiIsImFwcGVuZENoaWxkIiwiaWRHcmlkcyIsInBsYXllclNxdWFyZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicG9wdWxhdGVQbGF5ZXJCb2FyZCIsIm9yaWVudGF0aW9uVG9nZ2xlIiwiZm9ybSIsImZpZWxkc2V0IiwibGVnZW5kIiwidG9nZ2xlMSIsInRvZ2dsZTIiLCJ2VG9nZ2xlIiwiaFRvZ2dsZSIsImxhYmVsMSIsImxhYmVsMiIsImZvciIsInR5cGUiLCJ2YWx1ZSIsImNoZWNrZWQiLCJuYW1lIiwicGxhY2VTaGlwR3JpZCIsInBsU2hpcENvbnRhaW5lciIsImNyZWF0ZUVuZW15R3JpZCIsImNncmlkQ29udGFpbmVyIiwic2VsZWN0b3IiLCJncmlkaXRlbXMiLCJteUFyciIsInkiLCJwdXNoIiwic2V0QXR0cmlidXRlIiwiZm9yRWFjaCIsInNoaXAiLCJjb29yZCIsInNxdWFyZSIsImRhdGFzZXQiLCJ0b1N0cmluZyIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwicGxheWVyQXR0YWNrRGlzcGxheSIsIm9iaiIsImUiLCJhdHRhY2tlZFNwb3RzIiwiY29vcmRDaGVjazEiLCJzb21lIiwidGFyZ2V0IiwiY29vcmRDaGVjazIiLCJjb25zb2xlIiwibG9nIiwiZW5lbXlBdHRhY2tEaXNwbGF5IiwibWlzc2VkSGl0cyIsIm1pc3NlZEhpdCIsImhpdFNwb3RzIiwidmFsaWRhdGVDb29yZHMiLCJwbGF5YWJsZVNwb3RDaGVjayIsImV2ZXJ5IiwiY29vcmRzIiwiY3JlYXRlU2hpcHMiLCJvcmllbnRhdGlvbiIsIkpTT04iLCJwYXJzZSIsInBhdHJvbCIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsImJhdHRsZXNoaXAiLCJjYXJyaWVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uY2UiLCJnZXRSYW5kb21JbnQiLCJQbGF5ZXIiLCJHYW1lYm9hcmQiLCJvcHRpb25zIiwiY29tcHV0ZXJTaGlwcyIsInBsYXllckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxlbmd0aCIsInBsYXllciIsImNvbXB1dGVyIiwiZW5lbXlTcXVhcmVzIiwicGxhY2VTaGlwIiwicmNQbGFjZVNoaXAiLCJhdHRhY2tPcHBvbmVudCIsImFsbFNoaXBzU3VuayIsImFsZXJ0IiwiZ2FtZWJvYXJkIiwibmV3U2hpcCIsIm9jY3VwaWVkU3BvdENoZWNrIiwicG9pbnQiLCJyZWNlaXZlQXR0YWNrIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJlbGVtZW50Iiwic3RyaW5naWZ5Iiwic3BsaWNlIiwiY29vcmRDaGVjayIsInZhbCIsIm15U2hpcCIsImZpbmQiLCJoaXQiLCJkZWNpc2lvbiIsImlzU3VuayIsInRvVXBwZXJDYXNlIiwiY29vcmRDaGVja2VyIiwicmFuZENvb3JkIiwibWF4IiwibWluIiwiY2VpbCIsInNDIiwiaGl0TG9jYXRpb24iLCJvclN0ciIsIm51bSIsImhpdENoZWNrIiwiZmlsdGVyIl0sInNvdXJjZVJvb3QiOiIifQ==