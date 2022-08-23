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



const maindialog = document.querySelector("#main-dialog");
maindialog.showModal();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUVBLE1BQU0xRixVQUFVLEdBQUdOLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixjQUF2QixDQUFuQjtBQUNBSyxVQUFVLENBQUNnSSxTQUFYLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgeyBnYW1lTG9vcCB9IGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcblxuY29uc3QgcGJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXItYm9hcmRcIik7XG5jb25zdCBjYlNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXB1dGVyLWJvYXJkXCIpO1xuY29uc3QgcGxhY2VTaGlwU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxhY2VTaGlwc1wiKTtcbmNvbnN0IHNoaXBOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmNvbnN0IG1haW5kaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tZGlhbG9nXCIpXG5zaGlwTmFtZS5pZCA9IFwic2hpcE5hbWVcIjtcbnNoaXBOYW1lLnRleHRDb250ZW50ID0gYFdoZXJlIHdpbGwgeW91IHBsYWNlIHlvdXIgcGF0cm9sIGJvYXQ/YDtcblxubGV0IHNoaXBzID0gW107XG5sZXQgb2NjdXBpZWRTcG90cyA9IFtdO1xubGV0IGNvdW50ID0gMDtcbmxldCBwbGF5YWJsZVNwb3RzID0gW107XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckdyaWQoKSB7XG4gIGNvbnN0IHBncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICBwZ3JpZENvbnRhaW5lci5jbGFzc05hbWUgPSBcInBiU2VjdGlvbi1pdGVtXCI7XG5cbiAgZm9yIChsZXQgeCA9IDA7IHggPD0gOTk7IHgrKykge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTmFtZSA9IFwicGItZ3JpZC1pdGVtXCI7XG4gICAgcGdyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgfVxuXG4gIHBiU2VjdGlvbi5hcHBlbmRDaGlsZChwZ3JpZENvbnRhaW5lcik7XG4gIGlkR3JpZHMoXCIucGItZ3JpZC1pdGVtXCIpO1xuICBjb25zdCBwbGF5ZXJTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wYi1ncmlkLWl0ZW1cIik7XG4gIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcyk7XG59XG5mdW5jdGlvbiBvcmllbnRhdGlvblRvZ2dsZSgpIHtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICBjb25zdCBmaWVsZHNldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKTtcbiAgY29uc3QgbGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxlZ2VuZFwiKTtcbiAgbGVnZW5kLnRleHRDb250ZW50ID0gXCJPcmllbnRhdGlvblwiO1xuICBjb25zdCB0b2dnbGUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgdG9nZ2xlMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHZUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIGNvbnN0IGhUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIGNvbnN0IGxhYmVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgY29uc3QgbGFiZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICBsYWJlbDEuZm9yID0gXCJWXCI7XG4gIGxhYmVsMi5mb3IgPSBcIkhcIjtcbiAgbGFiZWwxLnRleHRDb250ZW50ID0gXCJWZXJ0aWNhbDogXCI7XG4gIGxhYmVsMi50ZXh0Q29udGVudCA9IFwiSG9yaXpvbnRhbDogXCI7XG4gIHZUb2dnbGUudHlwZSA9IFwicmFkaW9cIjtcbiAgdlRvZ2dsZS5pZCA9IFwiVlwiO1xuICB2VG9nZ2xlLnZhbHVlID0gXCJWXCI7XG4gIHZUb2dnbGUuY2hlY2tlZCA9IHRydWU7XG4gIHZUb2dnbGUubmFtZSA9IFwib3JpZW50YXRpb25cIjtcbiAgaFRvZ2dsZS50eXBlID0gXCJyYWRpb1wiO1xuICBoVG9nZ2xlLmlkID0gXCJIXCI7XG4gIGhUb2dnbGUudmFsdWUgPSBcIkhcIjtcbiAgaFRvZ2dsZS5uYW1lID0gXCJvcmllbnRhdGlvblwiO1xuXG4gIHRvZ2dsZTEuYXBwZW5kQ2hpbGQobGFiZWwxKTtcbiAgdG9nZ2xlMS5hcHBlbmRDaGlsZCh2VG9nZ2xlKTtcbiAgdG9nZ2xlMi5hcHBlbmRDaGlsZChsYWJlbDIpO1xuICB0b2dnbGUyLmFwcGVuZENoaWxkKGhUb2dnbGUpO1xuICBmaWVsZHNldC5hcHBlbmRDaGlsZChsZWdlbmQpO1xuICBmaWVsZHNldC5hcHBlbmRDaGlsZCh0b2dnbGUxKTtcbiAgZmllbGRzZXQuYXBwZW5kQ2hpbGQodG9nZ2xlMik7XG4gIGZvcm0uYXBwZW5kQ2hpbGQoZmllbGRzZXQpO1xuXG4gIHBsYWNlU2hpcFNlY3Rpb24uYXBwZW5kQ2hpbGQoZm9ybSk7XG4gIHBsYWNlU2hpcFNlY3Rpb24uYXBwZW5kQ2hpbGQoc2hpcE5hbWUpO1xufVxuXG5mdW5jdGlvbiBwbGFjZVNoaXBHcmlkKCkge1xuICBjb25zdCBwbFNoaXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIHBsU2hpcENvbnRhaW5lci5jbGFzc05hbWUgPSBcInBiU2VjdGlvbi1pdGVtXCI7XG5cbiAgZm9yIChsZXQgeCA9IDA7IHggPD0gOTk7IHgrKykge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTmFtZSA9IFwicHMtZ3JpZC1pdGVtXCI7XG4gICAgcGxTaGlwQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cbiAgb3JpZW50YXRpb25Ub2dnbGUoKTtcbiAgcGxhY2VTaGlwU2VjdGlvbi5hcHBlbmRDaGlsZChwbFNoaXBDb250YWluZXIpO1xuICBpZEdyaWRzKFwiLnBzLWdyaWQtaXRlbVwiKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRW5lbXlHcmlkKCkge1xuICBjb25zdCBjZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNncmlkQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiY2JTZWN0aW9uLWl0ZW1cIjtcbiAgZm9yIChsZXQgeCA9IDA7IHggPD0gOTk7IHgrKykge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTmFtZSA9IGBjYi1ncmlkLWl0ZW1gO1xuXG4gICAgY2dyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgfVxuICBjYlNlY3Rpb24uYXBwZW5kQ2hpbGQoY2dyaWRDb250YWluZXIpO1xuICBpZEdyaWRzKFwiLmNiLWdyaWQtaXRlbVwiKTtcbn1cblxuZnVuY3Rpb24gaWRHcmlkcyhzZWxlY3Rvcikge1xuICBjb25zdCBncmlkaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgbGV0IG15QXJyID0gW107XG5cbiAgZm9yIChsZXQgeCA9IDA7IHggPD0gOTsgeCsrKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gOTsgeSsrKSB7XG4gICAgICBteUFyci5wdXNoKFt5LCB4XSk7XG4gICAgICBwbGF5YWJsZVNwb3RzLnB1c2goW3ksIHhdKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwMDsgeCsrKSB7XG4gICAgZ3JpZGl0ZW1zW3hdLnNldEF0dHJpYnV0ZShcImRhdGEtY29vcmRcIiwgYFske215QXJyW3hdfV1gKTtcbiAgfVxufVxucGxhY2VTaGlwR3JpZCgpO1xuY29uc3QgcGxheWVyU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHMtZ3JpZC1pdGVtXCIpO1xuXG5mdW5jdGlvbiBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpIHtcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAuY29vcmQuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIG9jY3VwaWVkU3BvdHMucHVzaChgWyR7Y29vcmR9XWApO1xuICAgIH0pO1xuICB9KTtcblxuICBwbGF5ZXJTcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgIG9jY3VwaWVkU3BvdHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGlmIChzcXVhcmUuZGF0YXNldC5jb29yZC50b1N0cmluZygpID09PSBjb29yZC50b1N0cmluZygpKSB7XG4gICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBsYXllckF0dGFja0Rpc3BsYXkob2JqLCBlKSB7XG4gIGNvbnN0IGF0dGFja2VkU3BvdHMgPSBvYmouYXR0YWNrZWRTcG90cztcbiAgY29uc3Qgb2NjdXBpZWRTcG90cyA9IG9iai5vY2N1cGllZFNwb3RzO1xuXG4gIGNvbnN0IGNvb3JkQ2hlY2sxID0gYXR0YWNrZWRTcG90cy5zb21lKChjb29yZCkgPT4ge1xuICAgIHJldHVybiBlLnRhcmdldC5kYXRhc2V0LmNvb3JkLnRvU3RyaW5nKCkgPT09IGBbJHtjb29yZC50b1N0cmluZygpfV1gO1xuICB9KTtcbiAgY29uc3QgY29vcmRDaGVjazIgPSBvY2N1cGllZFNwb3RzLnNvbWUoKGNvb3JkKSA9PiB7XG4gICAgcmV0dXJuIGUudGFyZ2V0LmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gYFske2Nvb3JkLnRvU3RyaW5nKCl9XWA7XG4gIH0pO1xuICBjb25zb2xlLmxvZyhjb29yZENoZWNrMSwgY29vcmRDaGVjazIpO1xuICBjb25zb2xlLmxvZyhlLnRhcmdldC5kYXRhc2V0LmNvb3JkKTtcblxuICBpZiAoY29vcmRDaGVjazEgJiYgY29vcmRDaGVjazIpIHtcbiAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuICB9IGVsc2UgaWYgKGNvb3JkQ2hlY2sxICYmICFjb29yZENoZWNrMikge1xuICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRza3libHVlXCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5lbXlBdHRhY2tEaXNwbGF5KG9iaikge1xuICBjb25zdCBtaXNzZWRIaXRzID0gb2JqLm1pc3NlZEhpdDtcbiAgY29uc3QgaGl0U3BvdHMgPSBvYmouaGl0U3BvdHM7XG4gIGNvbnN0IHBsYXllclNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBiLWdyaWQtaXRlbVwiKTtcblxuICBwbGF5ZXJTcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgIG1pc3NlZEhpdHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGlmIChzcXVhcmUuZGF0YXNldC5jb29yZC50b1N0cmluZygpID09PSBgWyR7Y29vcmQudG9TdHJpbmcoKX1dYCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKClcbiAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRza3libHVlXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHBsYXllclNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgaGl0U3BvdHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGlmIChzcXVhcmUuZGF0YXNldC5jb29yZC50b1N0cmluZygpID09PSBgWyR7Y29vcmQudG9TdHJpbmcoKX1dYCkge1xuICAgICAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ29vcmRzKHNoaXApIHtcbiAgY29uc3QgcGxheWFibGVTcG90Q2hlY2sgPSBzaGlwLmNvb3JkLmV2ZXJ5KChjb29yZCkgPT4ge1xuICAgIHJldHVybiBwbGF5YWJsZVNwb3RzLnNvbWUoKGNvb3JkcykgPT4ge1xuICAgICAgaWYgKGNvb3JkLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgY29uc29sZS5sb2cocGxheWFibGVTcG90Q2hlY2spO1xuICBpZiAoIXBsYXlhYmxlU3BvdENoZWNrKSB7XG4gICAgY291bnQtLTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU2hpcHMoZSkge1xuICBjb25zdCBvcmllbnRhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgJ2lucHV0W25hbWU9XCJvcmllbnRhdGlvblwiXTpjaGVja2VkJ1xuICApLnZhbHVlO1xuICBjb25zdCBjb29yZHMgPSBKU09OLnBhcnNlKGUudGFyZ2V0LmRhdGFzZXQuY29vcmQpO1xuICBsZXQgcGF0cm9sLCBzdWJtYXJpbmUsIGRlc3Ryb3llciwgYmF0dGxlc2hpcCwgY2FycmllcjtcblxuICBzd2l0Y2ggKGNvdW50KSB7XG4gICAgY2FzZSAwOlxuICAgICAgcGF0cm9sID0gbmV3IFNoaXAoXCJwYXRyb2xcIiwgY29vcmRzLCBvcmllbnRhdGlvbik7XG5cbiAgICAgIGlmICghdmFsaWRhdGVDb29yZHMocGF0cm9sKSkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGlwcy5wdXNoKHBhdHJvbCk7XG4gICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcyk7XG4gICAgICB9XG5cbiAgICAgIHNoaXBOYW1lLnRleHRDb250ZW50ID0gYFdoZXJlIHdpbGwgeW91IHBsYWNlIHlvdXIgc3VibWFyaW5lP2A7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDE6XG4gICAgICBzdWJtYXJpbmUgPSBuZXcgU2hpcChcInN1Ym1hcmluZVwiLCBjb29yZHMsIG9yaWVudGF0aW9uKTtcblxuICAgICAgaWYgKCF2YWxpZGF0ZUNvb3JkcyhzdWJtYXJpbmUpKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBzLnB1c2goc3VibWFyaW5lKTtcbiAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKTtcbiAgICAgIH1cblxuICAgICAgc2hpcE5hbWUudGV4dENvbnRlbnQgPSBgV2hlcmUgd2lsbCB5b3UgcGxhY2UgeW91ciBkZXN0cm95ZXI/YDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIGRlc3Ryb3llciA9IG5ldyBTaGlwKFwiZGVzdHJveWVyXCIsIGNvb3Jkcywgb3JpZW50YXRpb24pO1xuXG4gICAgICBpZiAoIXZhbGlkYXRlQ29vcmRzKGRlc3Ryb3llcikpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcHMucHVzaChkZXN0cm95ZXIpO1xuICAgICAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpO1xuICAgICAgfVxuICAgICAgc2hpcE5hbWUudGV4dENvbnRlbnQgPSBgV2hlcmUgd2lsbCB5b3UgcGxhY2UgeW91ciBiYXR0bGVzaGlwP2A7XG5cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIGJhdHRsZXNoaXAgPSBuZXcgU2hpcChcImJhdHRsZXNoaXBcIiwgY29vcmRzLCBvcmllbnRhdGlvbik7XG5cbiAgICAgIGlmICghdmFsaWRhdGVDb29yZHMoYmF0dGxlc2hpcCkpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcHMucHVzaChiYXR0bGVzaGlwKTtcbiAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKTtcbiAgICAgIH1cbiAgICAgIHNoaXBOYW1lLnRleHRDb250ZW50ID0gYFdoZXJlIHdpbGwgeW91IHBsYWNlIHlvdXIgY2Fycmllcj9gO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA0OlxuICAgICAgY2FycmllciA9IG5ldyBTaGlwKFwiY2FycmllclwiLCBjb29yZHMsIG9yaWVudGF0aW9uKTtcblxuICAgICAgaWYgKCF2YWxpZGF0ZUNvb3JkcyhjYXJyaWVyKSkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGlwcy5wdXNoKGNhcnJpZXIpO1xuICAgICAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG4gIGlmIChjb3VudCA9PT0gNCkge1xuICAgIG1haW5kaWFsb2cuY2xvc2UoKVxuICAgIGNyZWF0ZVBsYXllckdyaWQoKTtcbiAgICBjcmVhdGVFbmVteUdyaWQoKTtcbiAgICBnYW1lTG9vcCgpO1xuICB9XG5cbiAgY29uc29sZS5sb2coc2hpcHMpO1xuICBjb3VudCArPSAxO1xufVxuXG5wbGF5ZXJTcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNsaWNrXCIsXG4gICAgKGUpID0+IHtcbiAgICAgIGNyZWF0ZVNoaXBzKGUpO1xuICAgIH0sXG4gICAgeyBvbmNlOiB0cnVlIH1cbiAgKTtcbn0pO1xuXG5cblxuZXhwb3J0IHsgc2hpcHMsIHBsYXllckF0dGFja0Rpc3BsYXksIGVuZW15QXR0YWNrRGlzcGxheSwgcGxhY2VTaGlwR3JpZCB9O1xuIiwiaW1wb3J0IHsgc2hpcHMsIHBsYXllckF0dGFja0Rpc3BsYXksIGVuZW15QXR0YWNrRGlzcGxheSB9IGZyb20gXCIuL0RPTVwiO1xuaW1wb3J0IHsgZ2V0UmFuZG9tSW50LCBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3Qgb3B0aW9ucyA9IFtcIlZcIiwgXCJIXCJdO1xuY29uc3QgY29tcHV0ZXJTaGlwcyA9IFtdO1xuY29uc3QgcGxheWVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5jb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuY29uc3QgcGF0cm9sID0gbmV3IFNoaXAoXG4gIFwicGF0cm9sXCIsXG4gIFtnZXRSYW5kb21JbnQoMCwgOSksIGdldFJhbmRvbUludCgwLCA5KV0sXG4gIG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5sZW5ndGgpXVxuKTtcbmNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKFxuICBcInN1Ym1hcmluZVwiLFxuICBbZ2V0UmFuZG9tSW50KDAsIDkpLCBnZXRSYW5kb21JbnQoMCwgOSldLFxuICBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKV1cbik7XG5jb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcChcbiAgXCJkZXN0cm95ZXJcIixcbiAgW2dldFJhbmRvbUludCgwLCA5KSwgZ2V0UmFuZG9tSW50KDAsIDkpXSxcbiAgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCldXG4pO1xuY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKFxuICBcImJhdHRsZXNoaXBcIixcbiAgW2dldFJhbmRvbUludCgwLCA5KSwgZ2V0UmFuZG9tSW50KDAsIDkpXSxcbiAgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCldXG4pO1xuY29uc3QgY2FycmllciA9IG5ldyBTaGlwKFxuICBcImNhcnJpZXJcIixcbiAgW2dldFJhbmRvbUludCgwLCA5KSwgZ2V0UmFuZG9tSW50KDAsIDkpXSxcbiAgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCldXG4pO1xuY29tcHV0ZXJTaGlwcy5wdXNoKHBhdHJvbCwgc3VibWFyaW5lLCBkZXN0cm95ZXIsIGJhdHRsZXNoaXAsIGNhcnJpZXIpO1xuXG4vKlxuXG5pZihwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSB8fCBjb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpICkge1xuICAgIGFsZXJ0KFwiR2FtZSdzIFVQIVwiKVxuXG4gICAgaWYocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgYWxlcnQoXCJDb21wdXRlciBXSU5TXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoXCJIdW1hbiBXSU5TXCIpXG4gICAgfVxufVxuKi9cblxuY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihcIlBsYXllciAxXCIsIGNvbXB1dGVyQm9hcmQpO1xuY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIiwgcGxheWVyQm9hcmQpO1xuXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgY29uc3QgZW5lbXlTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYi1ncmlkLWl0ZW1cIik7XG5cbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcChzaGlwKTtcbiAgfSk7XG5cbiAgY29tcHV0ZXJTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgcmNQbGFjZVNoaXAoY29tcHV0ZXJCb2FyZCwgc2hpcCk7XG4gIH0pO1xuICBjb25zb2xlLmxvZyhjb21wdXRlckJvYXJkKTtcblxuICBlbmVteVNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImNsaWNrXCIsXG4gICAgICAoZSkgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQuY29vcmQpXG4gICAgICAgIGNvbnNvbGUubG9nKHBsYXllci5hdHRhY2tPcHBvbmVudChKU09OLnBhcnNlKGUudGFyZ2V0LmRhdGFzZXQuY29vcmQpKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbXB1dGVyLmF0dGFja09wcG9uZW50KCkpO1xuICAgICAgICBwbGF5ZXJBdHRhY2tEaXNwbGF5KGNvbXB1dGVyQm9hcmQsIGUpO1xuICAgICAgICBlbmVteUF0dGFja0Rpc3BsYXkocGxheWVyQm9hcmQpO1xuICAgICAgICBjb25zb2xlLmxvZyhjb21wdXRlckJvYXJkKTtcbiAgICAgIH0sXG4gICAgICB7IG9uY2U6IHRydWUgfVxuICAgICk7XG4gIH0pO1xuXG4gIGlmIChwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSB8fCBjb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgYWxlcnQoXCJHYW1lJ3MgVVAhXCIpO1xuXG4gICAgaWYgKHBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBhbGVydChcIkNvbXB1dGVyIFdJTlNcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwiSHVtYW4gV0lOU1wiKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmNQbGFjZVNoaXAoZ2FtZWJvYXJkLCBzaGlwKSB7XG4gIHRyeSB7XG4gICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwKTtcbiAgfSBjYXRjaCB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG5ld1NoaXAgPSBuZXcgU2hpcChcbiAgICAgICAgc2hpcC5uYW1lLFxuICAgICAgICBbZ2V0UmFuZG9tSW50KDAsIDkpLCBnZXRSYW5kb21JbnQoMCwgOSldLFxuICAgICAgICBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKV1cbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyhuZXdTaGlwKTtcbiAgICAgIGdhbWVib2FyZC5wbGFjZVNoaXAobmV3U2hpcCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByY1BsYWNlU2hpcChnYW1lYm9hcmQsIHNoaXApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBnYW1lTG9vcCB9O1xuIiwiLy9jb25zdCBTaGlwID0gcmVxdWlyZShcIi4vc2hpcFwiKVxuXG5jb25zdCBHYW1lYm9hcmQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubWlzc2VkSGl0ID0gW107XG4gIHRoaXMuc2hpcHMgPSBbXTtcbiAgdGhpcy5vY2N1cGllZFNwb3RzID0gW107XG4gIHRoaXMucGxheWFibGVTcG90cyA9IFtdO1xuICB0aGlzLmF0dGFja2VkU3BvdHMgPSBbXTtcbiAgdGhpcy5oaXRTcG90cyA9IFtdO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IDk7IHkrKykge1xuICAgICAgdGhpcy5wbGF5YWJsZVNwb3RzLnB1c2goW3ksIHhdKTtcbiAgICB9XG4gIH1cblxuICB0aGlzLnBsYWNlU2hpcCA9IChzaGlwKSA9PiB7XG4gICAgY29uc3Qgb2NjdXBpZWRTcG90Q2hlY2sgPSBzaGlwLmNvb3JkLnNvbWUoKGNvb3JkKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5vY2N1cGllZFNwb3RzLnNvbWUoKGNvb3JkcykgPT4ge1xuICAgICAgICBpZiAoY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwbGF5YWJsZVNwb3RDaGVjayA9IHNoaXAuY29vcmQuZXZlcnkoKGNvb3JkKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5wbGF5YWJsZVNwb3RzLnNvbWUoKGNvb3JkcykgPT4ge1xuICAgICAgICBpZiAoY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAob2NjdXBpZWRTcG90Q2hlY2spIHtcbiAgICAgIHRocm93IFwiU2hpcCBjb29yZGluYXRlcyBhcmUgdGFrZW5cIjtcbiAgICB9IGVsc2UgaWYgKCFwbGF5YWJsZVNwb3RDaGVjaykge1xuICAgICAgdGhyb3cgXCJTaGlwIGNvb3JkaW5hdGVzIGFyZSBvdXQgb2YgYm91bmRzXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgICAgIHNoaXAuY29vcmQuZm9yRWFjaCgocG9pbnQpID0+IHtcbiAgICAgICAgdGhpcy5vY2N1cGllZFNwb3RzLnB1c2gocG9pbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMucmVjZWl2ZUF0dGFjayA9IChjb29yZHMpID0+IHtcbiAgICB0aGlzLmF0dGFja2VkU3BvdHMucHVzaChjb29yZHMpO1xuXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnBsYXlhYmxlU3BvdHMuZmluZEluZGV4KChlbGVtZW50KSA9PiB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZWxlbWVudCkgPT0gSlNPTi5zdHJpbmdpZnkoY29vcmRzKTtcbiAgICB9KTtcbiAgICB0aGlzLnBsYXlhYmxlU3BvdHMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIGNvbnN0IGNvb3JkQ2hlY2sgPSB0aGlzLm9jY3VwaWVkU3BvdHMuc29tZSgodmFsKSA9PiB7XG4gICAgICBpZiAodmFsLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGNvb3JkQ2hlY2spIHtcbiAgICAgIGNvbnN0IG15U2hpcCA9IHRoaXMuc2hpcHMuZmluZCgoc2hpcCkgPT4ge1xuICAgICAgICByZXR1cm4gc2hpcC5jb29yZC5maW5kKChjb29yZCkgPT4ge1xuICAgICAgICAgIHJldHVybiBjb29yZC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgaW5kZXggPSBteVNoaXAuY29vcmQuZmluZEluZGV4KCh2YWwpID0+IHtcbiAgICAgICAgaWYgKHZhbC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG15U2hpcC5oaXQoaW5kZXgpO1xuICAgICAgdGhpcy5oaXRTcG90cy5wdXNoKGNvb3Jkcyk7XG5cbiAgICAgIHJldHVybiBcIkF0dGFjayBoaXQgYSBzaGlwXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWlzc2VkSGl0LnB1c2goY29vcmRzKTtcblxuICAgICAgcmV0dXJuIFwiQXR0YWNrIG1pc3NlZFwiO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBkZWNpc2lvbiA9IHRoaXMuc2hpcHMuZXZlcnkoKHNoaXApID0+IHtcbiAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGRlY2lzaW9uKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbn07XG5cbi8qY29uc3Qgc2hpcCA9IG5ldyBTaGlwKDMsW1syLDJdLFszLDJdLFsyLDVdLFszLDVdXSlcbmNvbnNvbGUubG9nKHNoaXAuY29vcmQpXG5mdW5jdGlvbiBmaW5kSW5kZXgoeCx5KSB7XG5cbiAgICBjb25zdCBpbmRleCAgPSB5LmZpbmRJbmRleFxuXG59IFxuXG5jb25zdCBzaGlwID0gbmV3IFNoaXAoNClcbmNvbnN0IHNoaXBDb29yZHMgPSBbWzIsMl0sWzMsMl0sWzIsNV0sWzMsNV1dXG5jb25zdCBnYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKHNoaXAsc2hpcENvb3Jkcylcbi8vY29uc29sZS5sb2coZ2FtZWJvYXJkLnBsYXlhYmxlU3BvdHMpXG5cbmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFszLDVdKVxuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soWzIsMl0pXG5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbMywyXSlcbmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFsyLDVdKVxuLy9jb25zb2xlLmxvZyhnYW1lYm9hcmQucGxheWFibGVTcG90cylcbi8vY29uc29sZS5sb2coZ2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSovXG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8taW5uZXItZGVjbGFyYXRpb25zICovXG5jb25zdCBQbGF5ZXIgPSBmdW5jdGlvbiAobmFtZSwgZ2FtZWJvYXJkKSB7XG4gIHRoaXMubmFtZSA9IG5hbWUudG9VcHBlckNhc2UoKTtcbiAgdGhpcy5nYW1lYm9hcmQgPSBnYW1lYm9hcmQ7XG5cbiAgdGhpcy5hdHRhY2tPcHBvbmVudCA9IChjb29yZCkgPT4ge1xuICAgIGlmICh0aGlzLm5hbWUgPT09IFwiQ09NUFVURVJcIikge1xuICAgICAgY29uc3QgY29vcmRDaGVja2VyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByYW5kQ29vcmQgPSBbZ2V0UmFuZG9tSW50KDAsIDkpLCBnZXRSYW5kb21JbnQoMCwgOSldO1xuXG4gICAgICAgIGNvbnN0IGNvb3JkQ2hlY2sgPSB0aGlzLmdhbWVib2FyZC5wbGF5YWJsZVNwb3RzLnNvbWUoKHZhbCkgPT4ge1xuICAgICAgICAgIGlmICh2YWwudG9TdHJpbmcoKSA9PT0gcmFuZENvb3JkLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFjb29yZENoZWNrKSB7XG4gICAgICAgICAgdGhpcy5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kQ29vcmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHJhbmRDb29yZCA9IFtnZXRSYW5kb21JbnQoMCwgOSksIGdldFJhbmRvbUludCgwLCA5KV07XG4gICAgICAgICAgdGhpcy5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kQ29vcmQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHJhbmRDb29yZCk7XG4gICAgICB9O1xuICAgICAgY29vcmRDaGVja2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmQpO1xuICAgIH1cbiAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSBhdHRhY2tlZCBhdCAke2Nvb3JkfWA7XG4gIH07XG59O1xuXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWF4LCBtaW4pIHtcbiAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gIG1heCA9IE1hdGguZmxvb3IobWF4KTtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG59XG5cbmV4cG9ydCB7IGdldFJhbmRvbUludCwgUGxheWVyIH07XG5cbi8vbW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJcbiIsImNvbnN0IFNoaXAgPSBmdW5jdGlvbiAobmFtZSwgc0MsIG9yaWVudGF0aW9uKSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgdGhpcy5oaXRMb2NhdGlvbiA9IFtdO1xuICB0aGlzLnNDID0gc0M7XG5cbiAgY29uc3Qgb3JTdHIgPSBvcmllbnRhdGlvbi50b1N0cmluZygpLnRvVXBwZXJDYXNlKCk7XG5cbiAgc3dpdGNoIChuYW1lLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKSkge1xuICAgIGNhc2UgXCJQQVRST0xcIjpcbiAgICAgIHRoaXMubGVuZ3RoID0gMjtcblxuICAgICAgaWYgKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsIFt0aGlzLnNDWzBdICsgMSwgdGhpcy5zQ1sxXV1dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLCBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDFdXTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJTVUJNQVJJTkVcIjpcbiAgICAgIHRoaXMubGVuZ3RoID0gMztcbiAgICAgIGlmIChvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFtcbiAgICAgICAgICB0aGlzLnNDLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMSwgdGhpcy5zQ1sxXV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAyLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbXG4gICAgICAgICAgdGhpcy5zQyxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDFdLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMl0sXG4gICAgICAgIF07XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJERVNUUk9ZRVJcIjpcbiAgICAgIHRoaXMubGVuZ3RoID0gMztcblxuICAgICAgaWYgKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAxLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDIsIHRoaXMuc0NbMV1dLFxuICAgICAgICBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFtcbiAgICAgICAgICB0aGlzLnNDLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAyXSxcbiAgICAgICAgXTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkJBVFRMRVNISVBcIjpcbiAgICAgIHRoaXMubGVuZ3RoID0gNDtcblxuICAgICAgaWYgKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAxLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDIsIHRoaXMuc0NbMV1dLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMywgdGhpcy5zQ1sxXV0sXG4gICAgICAgIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAxXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDJdLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgM10sXG4gICAgICAgIF07XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJDQVJSSUVSXCI6XG4gICAgICB0aGlzLmxlbmd0aCA9IDU7XG5cbiAgICAgIGlmIChvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFtcbiAgICAgICAgICB0aGlzLnNDLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMSwgdGhpcy5zQ1sxXV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAyLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDMsIHRoaXMuc0NbMV1dLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgNCwgdGhpcy5zQ1sxXV0sXG4gICAgICAgIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAxXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDJdLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgM10sXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyA0XSxcbiAgICAgICAgXTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJJbnZhbGlkIGNob2ljZSBvZiBzaGlwXCI7XG4gIH1cblxuICB0aGlzLmhpdCA9IChudW0pID0+IHtcbiAgICB0aGlzLmhpdExvY2F0aW9uW251bV0gPSBcIlhcIjtcbiAgICB0aGlzLmxlbmd0aC0tO1xuXG4gICAgcmV0dXJuIGBTaGlwIGlzIGhpdCBhdCBwb2ludCAke251bX1gO1xuICB9O1xuXG4gIHRoaXMuaXNTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGhpdENoZWNrID0gdGhpcy5oaXRMb2NhdGlvbi5maWx0ZXIoKG51bSkgPT4ge1xuICAgICAgaWYgKG51bSA9PT0gXCJYXCIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoaGl0Q2hlY2sgJiYgdGhpcy5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnQgeyBTaGlwIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMnB4O1xcbn1cXG4uZ2FtZWJvYXJkcyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgbWFyZ2luLXRvcDogMTAwcHg7XFxufVxcblxcbi8qLnBsYXllci1ib2FyZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XFxuXFxufVxcblxcbi5jb21wdXRlci1ib2FyZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IG1hcm9vbjtcXG59Ki9cXG5cXG4ucGxheWVyLWJvYXJkLFxcbi5jb21wdXRlci1ib2FyZCB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4ucGJTZWN0aW9uLWl0ZW0sXFxuLmNiU2VjdGlvbi1pdGVtIHtcXG4gIHdpZHRoOiAyNjBweDtcXG4gIGhlaWdodDogMjYwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XFxuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcXG59XFxuXFxuLmNiLWdyaWQtaXRlbTpob3ZlcixcXG4ucHMtZ3JpZC1pdGVtOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAwLCAwLCAwLjEpO1xcbn1cXG5cXG4ucGItZ3JpZC1pdGVtLFxcbi5jYi1ncmlkLWl0ZW0sXFxuLnBzLWdyaWQtaXRlbSB7XFxuICB3aWR0aDogMjVweDtcXG4gIGhlaWdodDogMjVweDtcXG4gIGJvcmRlcjogMC4xcHggc29saWQgYmxhY2s7XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFNBQVM7RUFDVCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixZQUFZO0FBQ2Q7QUFDQTtFQUNFLGFBQWE7RUFDYixpQkFBaUI7QUFDbkI7O0FBRUE7Ozs7Ozs7RUFPRTs7QUFFRjs7RUFFRSxZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBOztFQUVFLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQ0FBbUM7RUFDbkMsc0JBQXNCO0VBQ3RCLG9CQUFvQjtBQUN0Qjs7QUFFQTs7RUFFRSxlQUFlO0VBQ2YsbUNBQW1DO0FBQ3JDOztBQUVBOzs7RUFHRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osZUFBZTtFQUNmLFNBQVM7RUFDVCxZQUFZO0VBQ1osa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMnB4O1xcbn1cXG4uZ2FtZWJvYXJkcyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgbWFyZ2luLXRvcDogMTAwcHg7XFxufVxcblxcbi8qLnBsYXllci1ib2FyZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XFxuXFxufVxcblxcbi5jb21wdXRlci1ib2FyZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IG1hcm9vbjtcXG59Ki9cXG5cXG4ucGxheWVyLWJvYXJkLFxcbi5jb21wdXRlci1ib2FyZCB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4ucGJTZWN0aW9uLWl0ZW0sXFxuLmNiU2VjdGlvbi1pdGVtIHtcXG4gIHdpZHRoOiAyNjBweDtcXG4gIGhlaWdodDogMjYwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XFxuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcXG59XFxuXFxuLmNiLWdyaWQtaXRlbTpob3ZlcixcXG4ucHMtZ3JpZC1pdGVtOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAwLCAwLCAwLjEpO1xcbn1cXG5cXG4ucGItZ3JpZC1pdGVtLFxcbi5jYi1ncmlkLWl0ZW0sXFxuLnBzLWdyaWQtaXRlbSB7XFxuICB3aWR0aDogMjVweDtcXG4gIGhlaWdodDogMjVweDtcXG4gIGJvcmRlcjogMC4xcHggc29saWQgYmxhY2s7XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IFwiLi9tb2R1bGVzL0RPTVwiO1xuaW1wb3J0IFwiLi9tb2R1bGVzL2NvbnRyb2xsZXJcIjtcblxuY29uc3QgbWFpbmRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi1kaWFsb2dcIilcbm1haW5kaWFsb2cuc2hvd01vZGFsKClcbiJdLCJuYW1lcyI6WyJTaGlwIiwiZ2FtZUxvb3AiLCJwYlNlY3Rpb24iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjYlNlY3Rpb24iLCJwbGFjZVNoaXBTZWN0aW9uIiwic2hpcE5hbWUiLCJjcmVhdGVFbGVtZW50IiwibWFpbmRpYWxvZyIsImlkIiwidGV4dENvbnRlbnQiLCJzaGlwcyIsIm9jY3VwaWVkU3BvdHMiLCJjb3VudCIsInBsYXlhYmxlU3BvdHMiLCJjcmVhdGVQbGF5ZXJHcmlkIiwicGdyaWRDb250YWluZXIiLCJjbGFzc05hbWUiLCJ4IiwiZGl2IiwiYXBwZW5kQ2hpbGQiLCJpZEdyaWRzIiwicGxheWVyU3F1YXJlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwb3B1bGF0ZVBsYXllckJvYXJkIiwib3JpZW50YXRpb25Ub2dnbGUiLCJmb3JtIiwiZmllbGRzZXQiLCJsZWdlbmQiLCJ0b2dnbGUxIiwidG9nZ2xlMiIsInZUb2dnbGUiLCJoVG9nZ2xlIiwibGFiZWwxIiwibGFiZWwyIiwiZm9yIiwidHlwZSIsInZhbHVlIiwiY2hlY2tlZCIsIm5hbWUiLCJwbGFjZVNoaXBHcmlkIiwicGxTaGlwQ29udGFpbmVyIiwiY3JlYXRlRW5lbXlHcmlkIiwiY2dyaWRDb250YWluZXIiLCJzZWxlY3RvciIsImdyaWRpdGVtcyIsIm15QXJyIiwieSIsInB1c2giLCJzZXRBdHRyaWJ1dGUiLCJmb3JFYWNoIiwic2hpcCIsImNvb3JkIiwic3F1YXJlIiwiZGF0YXNldCIsInRvU3RyaW5nIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwbGF5ZXJBdHRhY2tEaXNwbGF5Iiwib2JqIiwiZSIsImF0dGFja2VkU3BvdHMiLCJjb29yZENoZWNrMSIsInNvbWUiLCJ0YXJnZXQiLCJjb29yZENoZWNrMiIsImNvbnNvbGUiLCJsb2ciLCJlbmVteUF0dGFja0Rpc3BsYXkiLCJtaXNzZWRIaXRzIiwibWlzc2VkSGl0IiwiaGl0U3BvdHMiLCJ2YWxpZGF0ZUNvb3JkcyIsInBsYXlhYmxlU3BvdENoZWNrIiwiZXZlcnkiLCJjb29yZHMiLCJjcmVhdGVTaGlwcyIsIm9yaWVudGF0aW9uIiwiSlNPTiIsInBhcnNlIiwicGF0cm9sIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwiYmF0dGxlc2hpcCIsImNhcnJpZXIiLCJjbG9zZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbmNlIiwiZ2V0UmFuZG9tSW50IiwiUGxheWVyIiwiR2FtZWJvYXJkIiwib3B0aW9ucyIsImNvbXB1dGVyU2hpcHMiLCJwbGF5ZXJCb2FyZCIsImNvbXB1dGVyQm9hcmQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJwbGF5ZXIiLCJjb21wdXRlciIsImVuZW15U3F1YXJlcyIsInBsYWNlU2hpcCIsInJjUGxhY2VTaGlwIiwiYXR0YWNrT3Bwb25lbnQiLCJhbGxTaGlwc1N1bmsiLCJhbGVydCIsImdhbWVib2FyZCIsIm5ld1NoaXAiLCJvY2N1cGllZFNwb3RDaGVjayIsInBvaW50IiwicmVjZWl2ZUF0dGFjayIsImluZGV4IiwiZmluZEluZGV4IiwiZWxlbWVudCIsInN0cmluZ2lmeSIsInNwbGljZSIsImNvb3JkQ2hlY2siLCJ2YWwiLCJteVNoaXAiLCJmaW5kIiwiaGl0IiwiZGVjaXNpb24iLCJpc1N1bmsiLCJ0b1VwcGVyQ2FzZSIsImNvb3JkQ2hlY2tlciIsInJhbmRDb29yZCIsIm1heCIsIm1pbiIsImNlaWwiLCJzQyIsImhpdExvY2F0aW9uIiwib3JTdHIiLCJudW0iLCJoaXRDaGVjayIsImZpbHRlciIsInNob3dNb2RhbCJdLCJzb3VyY2VSb290IjoiIn0=