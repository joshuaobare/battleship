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
/* harmony export */   "ships": () => (/* binding */ ships),
/* harmony export */   "winnerChecker": () => (/* binding */ winnerChecker)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ "./src/modules/controller.js");
/* eslint-disable no-empty */


const pbSection = document.querySelector("#player-board");
const cbSection = document.querySelector("#computer-board");
const placeShipSection = document.querySelector("#placeShips");
const shipName = document.createElement("div");
const maindialog = document.querySelector("#main-dialog");
shipName.className = "shipName";
shipName.id = "shipName";
shipName.textContent = "Where will you place your patrol boat?";
const winnerdialog = document.querySelector("#winner-dialog");
const winner = document.querySelector("#winner-identity");
const restartBtn = document.querySelector("#restart");
const playerName = document.createElement("div");
const computerName = document.createElement("div");
playerName.className = "playerName";
computerName.className = "playerName";
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

  playerName.textContent = "Player";
  pbSection.appendChild(pgridContainer);
  pbSection.appendChild(playerName);
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
  toggle1.className = "toggle";
  toggle2.className = "toggle";
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

  computerName.textContent = "Computer";
  cbSection.appendChild(cgridContainer);
  cbSection.appendChild(computerName);
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

  if (coordCheck1 && coordCheck2) {
    e.target.style.backgroundColor = "#D92121";
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
        square.style.backgroundColor = "lightskyblue";
      }
    });
  });
  playerSquares.forEach(square => {
    hitSpots.forEach(coord => {
      if (square.dataset.coord.toString() === "[".concat(coord.toString(), "]")) {
        square.style.backgroundColor = "#D92121";
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

  count += 1;
}

playerSquares.forEach(square => {
  square.addEventListener("click", e => {
    createShips(e);
  }, {
    once: true
  });
});

function winnerChecker(playerBoard, computerBoard) {
  if (playerBoard.allShipsSunk() || computerBoard.allShipsSunk()) {
    winnerdialog.showModal();

    if (playerBoard.allShipsSunk()) {
      winner.textContent = "Computer Wins !";
    } else {
      winner.textContent = "Humanity Wins !";
    }
  }
}

restartBtn.addEventListener("click", () => {
  winnerdialog.close();
  location.reload();
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
  enemySquares.forEach(square => {
    square.addEventListener("click", e => {
      (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.winnerChecker)(playerBoard, computerBoard);
      player.attackOpponent(JSON.parse(e.target.dataset.coord));
      (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.winnerChecker)(playerBoard, computerBoard);
      computer.attackOpponent();
      (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.winnerChecker)(playerBoard, computerBoard);
      (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.playerAttackDisplay)(computerBoard, e);
      (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.enemyAttackDisplay)(playerBoard);
      (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.winnerChecker)(playerBoard, computerBoard);
    }, {
      once: true
    });
  });
} // rcPlaceShip recursively tries to find a valid spot to place the ships


function rcPlaceShip(gameboard, ship) {
  try {
    gameboard.placeShip(ship);
  } catch {
    try {
      const newShip = new _ship__WEBPACK_IMPORTED_MODULE_3__.Ship(ship.name, [(0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9), (0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9)], options[Math.floor(Math.random() * options.length)]);
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
      };

      coordChecker();
    } else {
      this.gameboard.receiveAttack(coord);
    }

    return "".concat(this.name, " attacked");
  };
};

function getRandomInt(max, min) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}



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
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/BaufraBold.ttf */ "./src/fonts/BaufraBold.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/Stencil.ttf */ "./src/fonts/Stencil.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: baufra;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n@font-face {\n  font-family: stencil;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\nbody {\n  margin: 0;\n  \n}\n\nheader {\n  background-color: #D92121;\n  color: black;\n  text-align: center;\n  padding: 0px;\n  font-family: stencil, sans-serif;\n  letter-spacing: 0.25em;\n  font-size: 2.7em;\n  position: fixed;\n  top:0;\n  width: 100vw;\n  height: 2.7em;\n}\nh1 {\n    padding: 0;\n    margin-top: 13px;\n}\n.gameboards {\n  display: flex;\n  margin-top: 174px;\n  justify-items: center;\n  align-items: center;\n}\n\n.playerName {\n  text-align: center;\n  font-size: 1.8em;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  font-weight: 600;\n  color: black;\n}\n/*\n.computer-board {\n    background-color: maroon;\n}*/\n\n.player-board,\n.computer-board {\n  \n  display: flex;\n  flex-direction: column;\n  gap: 45px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.pbSection-item,\n.cbSection-item {\n  width: fit-content;\n  height: 318px;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n  justify-items: stretch;\n  align-items: stretch;\n  cursor: pointer;\n}\n\n.cb-grid-item:hover,\n.ps-grid-item:hover {\n  cursor: pointer;\n  background-color: rgb(0, 0, 0, 0.1);\n}\n\n.pb-grid-item,\n.cb-grid-item,\n.ps-grid-item {\n  width: 31.8px;\n  height: 31.8px;\n  border: 0.1px solid black;\n}\n.placeShips {\n  max-width: 350px;\n  height: 450px;\n  font-family: baufra;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n\nfieldset {\n  display: flex;\n  gap: 18.2px;\n  align-items: center;\n  max-width: fit-content;\n}\n\nlegend {\n  text-align: center;\n}\n.toggle {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.shipName {\n  padding: 1.8px;\n  text-align: center;\n  margin: 4.5px 4.55px;\n}\n\n.winner {\n  width: 273px;\n  height: 136.5px;\n  display: flex;\n  justify-content: space-between;\n  flex-direction: column;\n}\n.winner-dialog-button {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n.winner-identity {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  font-weight: 300;\n}\n\n.game-over {\n  font-size: 1.8em;\n  font-family: baufra;\n}\n\n.game-over,\n.winner-identity {\n  text-align: center;\n}\n\nbutton {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  background-color: #d92121;\n  color: white;\n  padding: 9px;\n  border-radius: 4.5px;\n  cursor: pointer;\n}\n\nfooter {\n  background-color: black;\n  color: white;\n  position: fixed;\n  font-family: baufra;\n  font-size: 0.75em;\n  bottom: 0;\n  width: 100vw;\n  text-align: center;\n}\n\n@media (max-width:600px) {\n  \n    header {\n      font-size: 20px;\n      padding-bottom: 10px;\n      \n    }\n\n    .placeShips {\n      max-width: 300px;\n      height: auto;\n    }\n\n    .placeShips > form {\n      max-width: 290px;\n    }\n    form > fieldset {\n      max-width: fit-content;\n    }\n\n    .pbSection-item {\n      max-width: fit-content;\n    }\n\n    .ps-grid-item {\n      max-width: 29px;\n      height: auto;\n    }\n\n    .gameboards {\n      margin-top: 100px;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      gap: 15px;\n    }\n\n    .player-board,.computer-board {\n      gap: 20px;\n    }\n\n    .computer-board {\n      padding-bottom: 20px;\n    }\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,4CAAgC;AAClC;AACA;EACE,oBAAoB;EACpB,4CAA6B;AAC/B;;AAEA;EACE,SAAS;;AAEX;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,gCAAgC;EAChC,sBAAsB;EACtB,gBAAgB;EAChB,eAAe;EACf,KAAK;EACL,YAAY;EACZ,aAAa;AACf;AACA;IACI,UAAU;IACV,gBAAgB;AACpB;AACA;EACE,aAAa;EACb,iBAAiB;EACjB,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB;gEAC8D;EAC9D,gBAAgB;EAChB,YAAY;AACd;AACA;;;EAGE;;AAEF;;;EAGE,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;;EAEE,kBAAkB;EAClB,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,mCAAmC;EACnC,sBAAsB;EACtB,oBAAoB;EACpB,eAAe;AACjB;;AAEA;;EAEE,eAAe;EACf,mCAAmC;AACrC;;AAEA;;;EAGE,aAAa;EACb,cAAc;EACd,yBAAyB;AAC3B;AACA;EACE,gBAAgB;EAChB,aAAa;EACb,mBAAmB;EACnB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,mBAAmB;EACnB,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;AACpB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,eAAe;EACf,aAAa;EACb,8BAA8B;EAC9B,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,qCAAqC;AACvC;AACA;EACE;gEAC8D;EAC9D,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;;EAEE,kBAAkB;AACpB;;AAEA;EACE;gEAC8D;EAC9D,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,oBAAoB;EACpB,eAAe;AACjB;;AAEA;EACE,uBAAuB;EACvB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,iBAAiB;EACjB,SAAS;EACT,YAAY;EACZ,kBAAkB;AACpB;;AAEA;;IAEI;MACE,eAAe;MACf,oBAAoB;;IAEtB;;IAEA;MACE,gBAAgB;MAChB,YAAY;IACd;;IAEA;MACE,gBAAgB;IAClB;IACA;MACE,sBAAsB;IACxB;;IAEA;MACE,sBAAsB;IACxB;;IAEA;MACE,eAAe;MACf,YAAY;IACd;;IAEA;MACE,iBAAiB;MACjB,aAAa;MACb,sBAAsB;MACtB,uBAAuB;MACvB,mBAAmB;MACnB,SAAS;IACX;;IAEA;MACE,SAAS;IACX;;IAEA;MACE,oBAAoB;IACtB;AACJ","sourcesContent":["@font-face {\n  font-family: baufra;\n  src: url(./fonts/BaufraBold.ttf);\n}\n@font-face {\n  font-family: stencil;\n  src: url(./fonts/Stencil.ttf);\n}\n\nbody {\n  margin: 0;\n  \n}\n\nheader {\n  background-color: #D92121;\n  color: black;\n  text-align: center;\n  padding: 0px;\n  font-family: stencil, sans-serif;\n  letter-spacing: 0.25em;\n  font-size: 2.7em;\n  position: fixed;\n  top:0;\n  width: 100vw;\n  height: 2.7em;\n}\nh1 {\n    padding: 0;\n    margin-top: 13px;\n}\n.gameboards {\n  display: flex;\n  margin-top: 174px;\n  justify-items: center;\n  align-items: center;\n}\n\n.playerName {\n  text-align: center;\n  font-size: 1.8em;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  font-weight: 600;\n  color: black;\n}\n/*\n.computer-board {\n    background-color: maroon;\n}*/\n\n.player-board,\n.computer-board {\n  \n  display: flex;\n  flex-direction: column;\n  gap: 45px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.pbSection-item,\n.cbSection-item {\n  width: fit-content;\n  height: 318px;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n  justify-items: stretch;\n  align-items: stretch;\n  cursor: pointer;\n}\n\n.cb-grid-item:hover,\n.ps-grid-item:hover {\n  cursor: pointer;\n  background-color: rgb(0, 0, 0, 0.1);\n}\n\n.pb-grid-item,\n.cb-grid-item,\n.ps-grid-item {\n  width: 31.8px;\n  height: 31.8px;\n  border: 0.1px solid black;\n}\n.placeShips {\n  max-width: 350px;\n  height: 450px;\n  font-family: baufra;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n\nfieldset {\n  display: flex;\n  gap: 18.2px;\n  align-items: center;\n  max-width: fit-content;\n}\n\nlegend {\n  text-align: center;\n}\n.toggle {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.shipName {\n  padding: 1.8px;\n  text-align: center;\n  margin: 4.5px 4.55px;\n}\n\n.winner {\n  width: 273px;\n  height: 136.5px;\n  display: flex;\n  justify-content: space-between;\n  flex-direction: column;\n}\n.winner-dialog-button {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n.winner-identity {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  font-weight: 300;\n}\n\n.game-over {\n  font-size: 1.8em;\n  font-family: baufra;\n}\n\n.game-over,\n.winner-identity {\n  text-align: center;\n}\n\nbutton {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  background-color: #d92121;\n  color: white;\n  padding: 9px;\n  border-radius: 4.5px;\n  cursor: pointer;\n}\n\nfooter {\n  background-color: black;\n  color: white;\n  position: fixed;\n  font-family: baufra;\n  font-size: 0.75em;\n  bottom: 0;\n  width: 100vw;\n  text-align: center;\n}\n\n@media (max-width:600px) {\n  \n    header {\n      font-size: 20px;\n      padding-bottom: 10px;\n      \n    }\n\n    .placeShips {\n      max-width: 300px;\n      height: auto;\n    }\n\n    .placeShips > form {\n      max-width: 290px;\n    }\n    form > fieldset {\n      max-width: fit-content;\n    }\n\n    .pbSection-item {\n      max-width: fit-content;\n    }\n\n    .ps-grid-item {\n      max-width: 29px;\n      height: auto;\n    }\n\n    .gameboards {\n      margin-top: 100px;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      gap: 15px;\n    }\n\n    .player-board,.computer-board {\n      gap: 20px;\n    }\n\n    .computer-board {\n      padding-bottom: 20px;\n    }\n}"],"sourceRoot":""}]);
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

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
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

/***/ }),

/***/ "./src/fonts/BaufraBold.ttf":
/*!**********************************!*\
  !*** ./src/fonts/BaufraBold.ttf ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "49faeea61e2ae8e932ef.ttf";

/***/ }),

/***/ "./src/fonts/Stencil.ttf":
/*!*******************************!*\
  !*** ./src/fonts/Stencil.ttf ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "eb44e824c2d7af53b77a.ttf";

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7Ozs7O1dDckJBOzs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUVBLE1BQU1sRyxVQUFVLEdBQUdOLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixjQUF2QixDQUFuQjtBQUNBSyxVQUFVLENBQUN1RixTQUFYLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCB7IGdhbWVMb29wIH0gZnJvbSBcIi4vY29udHJvbGxlclwiO1xuXG5jb25zdCBwYlNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllci1ib2FyZFwiKTtcbmNvbnN0IGNiU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tcHV0ZXItYm9hcmRcIik7XG5jb25zdCBwbGFjZVNoaXBTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGFjZVNoaXBzXCIpO1xuY29uc3Qgc2hpcE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuY29uc3QgbWFpbmRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi1kaWFsb2dcIik7XG5zaGlwTmFtZS5jbGFzc05hbWUgPSBcInNoaXBOYW1lXCI7XG5zaGlwTmFtZS5pZCA9IFwic2hpcE5hbWVcIjtcbnNoaXBOYW1lLnRleHRDb250ZW50ID0gYFdoZXJlIHdpbGwgeW91IHBsYWNlIHlvdXIgcGF0cm9sIGJvYXQ/YDtcbmNvbnN0IHdpbm5lcmRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2lubmVyLWRpYWxvZ1wiKTtcbmNvbnN0IHdpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2lubmVyLWlkZW50aXR5XCIpO1xuY29uc3QgcmVzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVzdGFydFwiKTtcbmNvbnN0IHBsYXllck5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuY29uc3QgY29tcHV0ZXJOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbnBsYXllck5hbWUuY2xhc3NOYW1lID0gXCJwbGF5ZXJOYW1lXCI7XG5jb21wdXRlck5hbWUuY2xhc3NOYW1lID0gXCJwbGF5ZXJOYW1lXCI7XG5cbmxldCBzaGlwcyA9IFtdO1xubGV0IG9jY3VwaWVkU3BvdHMgPSBbXTtcbmxldCBjb3VudCA9IDA7XG5sZXQgcGxheWFibGVTcG90cyA9IFtdO1xuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJHcmlkKCkge1xuICBjb25zdCBwZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgcGdyaWRDb250YWluZXIuY2xhc3NOYW1lID0gXCJwYlNlY3Rpb24taXRlbVwiO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk5OyB4KyspIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc05hbWUgPSBcInBiLWdyaWQtaXRlbVwiO1xuICAgIHBncmlkQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cbiAgcGxheWVyTmFtZS50ZXh0Q29udGVudCA9IFwiUGxheWVyXCI7XG4gIHBiU2VjdGlvbi5hcHBlbmRDaGlsZChwZ3JpZENvbnRhaW5lcik7XG5cbiAgcGJTZWN0aW9uLmFwcGVuZENoaWxkKHBsYXllck5hbWUpO1xuICBpZEdyaWRzKFwiLnBiLWdyaWQtaXRlbVwiKTtcbiAgY29uc3QgcGxheWVyU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGItZ3JpZC1pdGVtXCIpO1xuICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpO1xufVxuZnVuY3Rpb24gb3JpZW50YXRpb25Ub2dnbGUoKSB7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgY29uc3QgZmllbGRzZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XG4gIGNvbnN0IGxlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIik7XG4gIGxlZ2VuZC50ZXh0Q29udGVudCA9IFwiT3JpZW50YXRpb25cIjtcbiAgY29uc3QgdG9nZ2xlMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHRvZ2dsZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0b2dnbGUxLmNsYXNzTmFtZSA9IFwidG9nZ2xlXCI7XG4gIHRvZ2dsZTIuY2xhc3NOYW1lID0gXCJ0b2dnbGVcIjtcbiAgY29uc3QgdlRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgY29uc3QgaFRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgY29uc3QgbGFiZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICBjb25zdCBsYWJlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gIGxhYmVsMS5mb3IgPSBcIlZcIjtcbiAgbGFiZWwyLmZvciA9IFwiSFwiO1xuICBsYWJlbDEudGV4dENvbnRlbnQgPSBcIlZlcnRpY2FsOiBcIjtcbiAgbGFiZWwyLnRleHRDb250ZW50ID0gXCJIb3Jpem9udGFsOiBcIjtcbiAgdlRvZ2dsZS50eXBlID0gXCJyYWRpb1wiO1xuICB2VG9nZ2xlLmlkID0gXCJWXCI7XG4gIHZUb2dnbGUudmFsdWUgPSBcIlZcIjtcbiAgdlRvZ2dsZS5jaGVja2VkID0gdHJ1ZTtcbiAgdlRvZ2dsZS5uYW1lID0gXCJvcmllbnRhdGlvblwiO1xuICBoVG9nZ2xlLnR5cGUgPSBcInJhZGlvXCI7XG4gIGhUb2dnbGUuaWQgPSBcIkhcIjtcbiAgaFRvZ2dsZS52YWx1ZSA9IFwiSFwiO1xuICBoVG9nZ2xlLm5hbWUgPSBcIm9yaWVudGF0aW9uXCI7XG5cbiAgdG9nZ2xlMS5hcHBlbmRDaGlsZChsYWJlbDEpO1xuICB0b2dnbGUxLmFwcGVuZENoaWxkKHZUb2dnbGUpO1xuICB0b2dnbGUyLmFwcGVuZENoaWxkKGxhYmVsMik7XG4gIHRvZ2dsZTIuYXBwZW5kQ2hpbGQoaFRvZ2dsZSk7XG4gIGZpZWxkc2V0LmFwcGVuZENoaWxkKGxlZ2VuZCk7XG4gIGZpZWxkc2V0LmFwcGVuZENoaWxkKHRvZ2dsZTEpO1xuICBmaWVsZHNldC5hcHBlbmRDaGlsZCh0b2dnbGUyKTtcbiAgZm9ybS5hcHBlbmRDaGlsZChmaWVsZHNldCk7XG5cbiAgcGxhY2VTaGlwU2VjdGlvbi5hcHBlbmRDaGlsZChmb3JtKTtcbiAgcGxhY2VTaGlwU2VjdGlvbi5hcHBlbmRDaGlsZChzaGlwTmFtZSk7XG59XG5cbmZ1bmN0aW9uIHBsYWNlU2hpcEdyaWQoKSB7XG4gIGNvbnN0IHBsU2hpcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgcGxTaGlwQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwicGJTZWN0aW9uLWl0ZW1cIjtcblxuICBmb3IgKGxldCB4ID0gMDsgeCA8PSA5OTsgeCsrKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuY2xhc3NOYW1lID0gXCJwcy1ncmlkLWl0ZW1cIjtcbiAgICBwbFNoaXBDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgfVxuICBvcmllbnRhdGlvblRvZ2dsZSgpO1xuICBwbGFjZVNoaXBTZWN0aW9uLmFwcGVuZENoaWxkKHBsU2hpcENvbnRhaW5lcik7XG4gIGlkR3JpZHMoXCIucHMtZ3JpZC1pdGVtXCIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbmVteUdyaWQoKSB7XG4gIGNvbnN0IGNncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2dyaWRDb250YWluZXIuY2xhc3NOYW1lID0gXCJjYlNlY3Rpb24taXRlbVwiO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8PSA5OTsgeCsrKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuY2xhc3NOYW1lID0gYGNiLWdyaWQtaXRlbWA7XG5cbiAgICBjZ3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG4gIGNvbXB1dGVyTmFtZS50ZXh0Q29udGVudCA9IFwiQ29tcHV0ZXJcIjtcbiAgY2JTZWN0aW9uLmFwcGVuZENoaWxkKGNncmlkQ29udGFpbmVyKTtcbiAgY2JTZWN0aW9uLmFwcGVuZENoaWxkKGNvbXB1dGVyTmFtZSk7XG4gIGlkR3JpZHMoXCIuY2ItZ3JpZC1pdGVtXCIpO1xufVxuXG5mdW5jdGlvbiBpZEdyaWRzKHNlbGVjdG9yKSB7XG4gIGNvbnN0IGdyaWRpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICBsZXQgbXlBcnIgPSBbXTtcblxuICBmb3IgKGxldCB4ID0gMDsgeCA8PSA5OyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSA5OyB5KyspIHtcbiAgICAgIG15QXJyLnB1c2goW3ksIHhdKTtcbiAgICAgIHBsYXlhYmxlU3BvdHMucHVzaChbeSwgeF0pO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IHggPSAwOyB4IDwgMTAwOyB4KyspIHtcbiAgICBncmlkaXRlbXNbeF0uc2V0QXR0cmlidXRlKFwiZGF0YS1jb29yZFwiLCBgWyR7bXlBcnJbeF19XWApO1xuICB9XG59XG5wbGFjZVNoaXBHcmlkKCk7XG5jb25zdCBwbGF5ZXJTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcy1ncmlkLWl0ZW1cIik7XG5cbmZ1bmN0aW9uIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcykge1xuICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5jb29yZC5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgb2NjdXBpZWRTcG90cy5wdXNoKGBbJHtjb29yZH1dYCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHBsYXllclNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgb2NjdXBpZWRTcG90cy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgaWYgKHNxdWFyZS5kYXRhc2V0LmNvb3JkLnRvU3RyaW5nKCkgPT09IGNvb3JkLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JleVwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcGxheWVyQXR0YWNrRGlzcGxheShvYmosIGUpIHtcbiAgY29uc3QgYXR0YWNrZWRTcG90cyA9IG9iai5hdHRhY2tlZFNwb3RzO1xuICBjb25zdCBvY2N1cGllZFNwb3RzID0gb2JqLm9jY3VwaWVkU3BvdHM7XG5cbiAgY29uc3QgY29vcmRDaGVjazEgPSBhdHRhY2tlZFNwb3RzLnNvbWUoKGNvb3JkKSA9PiB7XG4gICAgcmV0dXJuIGUudGFyZ2V0LmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gYFske2Nvb3JkLnRvU3RyaW5nKCl9XWA7XG4gIH0pO1xuICBjb25zdCBjb29yZENoZWNrMiA9IG9jY3VwaWVkU3BvdHMuc29tZSgoY29vcmQpID0+IHtcbiAgICByZXR1cm4gZS50YXJnZXQuZGF0YXNldC5jb29yZC50b1N0cmluZygpID09PSBgWyR7Y29vcmQudG9TdHJpbmcoKX1dYDtcbiAgfSk7XG5cbiAgaWYgKGNvb3JkQ2hlY2sxICYmIGNvb3JkQ2hlY2syKSB7XG4gICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjRDkyMTIxXCI7XG4gIH0gZWxzZSBpZiAoY29vcmRDaGVjazEgJiYgIWNvb3JkQ2hlY2syKSB7XG4gICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodHNreWJsdWVcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmVteUF0dGFja0Rpc3BsYXkob2JqKSB7XG4gIGNvbnN0IG1pc3NlZEhpdHMgPSBvYmoubWlzc2VkSGl0O1xuICBjb25zdCBoaXRTcG90cyA9IG9iai5oaXRTcG90cztcbiAgY29uc3QgcGxheWVyU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGItZ3JpZC1pdGVtXCIpO1xuXG4gIHBsYXllclNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgbWlzc2VkSGl0cy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgaWYgKHNxdWFyZS5kYXRhc2V0LmNvb3JkLnRvU3RyaW5nKCkgPT09IGBbJHtjb29yZC50b1N0cmluZygpfV1gKSB7XG4gICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0c2t5Ymx1ZVwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICBwbGF5ZXJTcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgIGhpdFNwb3RzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gYFske2Nvb3JkLnRvU3RyaW5nKCl9XWApIHtcbiAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0Q5MjEyMVwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVDb29yZHMoc2hpcCkge1xuICBjb25zdCBwbGF5YWJsZVNwb3RDaGVjayA9IHNoaXAuY29vcmQuZXZlcnkoKGNvb3JkKSA9PiB7XG4gICAgcmV0dXJuIHBsYXlhYmxlU3BvdHMuc29tZSgoY29vcmRzKSA9PiB7XG4gICAgICBpZiAoY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIGlmICghcGxheWFibGVTcG90Q2hlY2spIHtcbiAgICBjb3VudC0tO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTaGlwcyhlKSB7XG4gIGNvbnN0IG9yaWVudGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAnaW5wdXRbbmFtZT1cIm9yaWVudGF0aW9uXCJdOmNoZWNrZWQnXG4gICkudmFsdWU7XG4gIGNvbnN0IGNvb3JkcyA9IEpTT04ucGFyc2UoZS50YXJnZXQuZGF0YXNldC5jb29yZCk7XG4gIGxldCBwYXRyb2wsIHN1Ym1hcmluZSwgZGVzdHJveWVyLCBiYXR0bGVzaGlwLCBjYXJyaWVyO1xuXG4gIHN3aXRjaCAoY291bnQpIHtcbiAgICBjYXNlIDA6XG4gICAgICBwYXRyb2wgPSBuZXcgU2hpcChcInBhdHJvbFwiLCBjb29yZHMsIG9yaWVudGF0aW9uKTtcblxuICAgICAgaWYgKCF2YWxpZGF0ZUNvb3JkcyhwYXRyb2wpKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBzLnB1c2gocGF0cm9sKTtcbiAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKTtcbiAgICAgIH1cblxuICAgICAgc2hpcE5hbWUudGV4dENvbnRlbnQgPSBgV2hlcmUgd2lsbCB5b3UgcGxhY2UgeW91ciBzdWJtYXJpbmU/YDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTpcbiAgICAgIHN1Ym1hcmluZSA9IG5ldyBTaGlwKFwic3VibWFyaW5lXCIsIGNvb3Jkcywgb3JpZW50YXRpb24pO1xuXG4gICAgICBpZiAoIXZhbGlkYXRlQ29vcmRzKHN1Ym1hcmluZSkpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcHMucHVzaChzdWJtYXJpbmUpO1xuICAgICAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpO1xuICAgICAgfVxuXG4gICAgICBzaGlwTmFtZS50ZXh0Q29udGVudCA9IGBXaGVyZSB3aWxsIHlvdSBwbGFjZSB5b3VyIGRlc3Ryb3llcj9gO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyOlxuICAgICAgZGVzdHJveWVyID0gbmV3IFNoaXAoXCJkZXN0cm95ZXJcIiwgY29vcmRzLCBvcmllbnRhdGlvbik7XG5cbiAgICAgIGlmICghdmFsaWRhdGVDb29yZHMoZGVzdHJveWVyKSkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGlwcy5wdXNoKGRlc3Ryb3llcik7XG4gICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcyk7XG4gICAgICB9XG4gICAgICBzaGlwTmFtZS50ZXh0Q29udGVudCA9IGBXaGVyZSB3aWxsIHlvdSBwbGFjZSB5b3VyIGJhdHRsZXNoaXA/YDtcblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKFwiYmF0dGxlc2hpcFwiLCBjb29yZHMsIG9yaWVudGF0aW9uKTtcblxuICAgICAgaWYgKCF2YWxpZGF0ZUNvb3JkcyhiYXR0bGVzaGlwKSkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGlwcy5wdXNoKGJhdHRsZXNoaXApO1xuICAgICAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpO1xuICAgICAgfVxuICAgICAgc2hpcE5hbWUudGV4dENvbnRlbnQgPSBgV2hlcmUgd2lsbCB5b3UgcGxhY2UgeW91ciBjYXJyaWVyP2A7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDQ6XG4gICAgICBjYXJyaWVyID0gbmV3IFNoaXAoXCJjYXJyaWVyXCIsIGNvb3Jkcywgb3JpZW50YXRpb24pO1xuXG4gICAgICBpZiAoIXZhbGlkYXRlQ29vcmRzKGNhcnJpZXIpKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBzLnB1c2goY2Fycmllcik7XG4gICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcyk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbiAgaWYgKGNvdW50ID09PSA0KSB7XG4gICAgbWFpbmRpYWxvZy5jbG9zZSgpO1xuICAgIGNyZWF0ZVBsYXllckdyaWQoKTtcbiAgICBjcmVhdGVFbmVteUdyaWQoKTtcbiAgICBnYW1lTG9vcCgpO1xuICB9XG5cbiAgY291bnQgKz0gMTtcbn1cblxucGxheWVyU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgIChlKSA9PiB7XG4gICAgICBjcmVhdGVTaGlwcyhlKTtcbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9XG4gICk7XG59KTtcblxuZnVuY3Rpb24gd2lubmVyQ2hlY2tlcihwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZCkge1xuICBpZiAocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkgfHwgY29tcHV0ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIHdpbm5lcmRpYWxvZy5zaG93TW9kYWwoKTtcblxuICAgIGlmIChwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgd2lubmVyLnRleHRDb250ZW50ID0gXCJDb21wdXRlciBXaW5zICFcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgd2lubmVyLnRleHRDb250ZW50ID0gXCJIdW1hbml0eSBXaW5zICFcIjtcbiAgICB9XG4gIH1cbn1cblxucmVzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICB3aW5uZXJkaWFsb2cuY2xvc2UoKTtcbiAgbG9jYXRpb24ucmVsb2FkKCk7XG59KTtcblxuZXhwb3J0IHtcbiAgc2hpcHMsXG4gIHBsYXllckF0dGFja0Rpc3BsYXksXG4gIGVuZW15QXR0YWNrRGlzcGxheSxcbiAgcGxhY2VTaGlwR3JpZCxcbiAgd2lubmVyQ2hlY2tlcixcbn07XG4iLCJpbXBvcnQge1xuICBzaGlwcyxcbiAgcGxheWVyQXR0YWNrRGlzcGxheSxcbiAgZW5lbXlBdHRhY2tEaXNwbGF5LFxuICB3aW5uZXJDaGVja2VyLFxufSBmcm9tIFwiLi9ET01cIjtcbmltcG9ydCB7IGdldFJhbmRvbUludCwgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IG9wdGlvbnMgPSBbXCJWXCIsIFwiSFwiXTtcbmNvbnN0IGNvbXB1dGVyU2hpcHMgPSBbXTtcbmNvbnN0IHBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZChcImNvbXB1dGVyYm9hcmRcIik7XG5jb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZChcInBsYXllcmJvYXJkXCIpO1xuXG5jb25zdCBwYXRyb2wgPSBuZXcgU2hpcChcbiAgXCJwYXRyb2xcIixcbiAgW2dldFJhbmRvbUludCgwLCA5KSwgZ2V0UmFuZG9tSW50KDAsIDkpXSxcbiAgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCldXG4pO1xuY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoXG4gIFwic3VibWFyaW5lXCIsXG4gIFtnZXRSYW5kb21JbnQoMCwgOSksIGdldFJhbmRvbUludCgwLCA5KV0sXG4gIG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5sZW5ndGgpXVxuKTtcbmNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKFxuICBcImRlc3Ryb3llclwiLFxuICBbZ2V0UmFuZG9tSW50KDAsIDkpLCBnZXRSYW5kb21JbnQoMCwgOSldLFxuICBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKV1cbik7XG5jb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXG4gIFwiYmF0dGxlc2hpcFwiLFxuICBbZ2V0UmFuZG9tSW50KDAsIDkpLCBnZXRSYW5kb21JbnQoMCwgOSldLFxuICBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKV1cbik7XG5jb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoXG4gIFwiY2FycmllclwiLFxuICBbZ2V0UmFuZG9tSW50KDAsIDkpLCBnZXRSYW5kb21JbnQoMCwgOSldLFxuICBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKV1cbik7XG5jb21wdXRlclNoaXBzLnB1c2gocGF0cm9sLCBzdWJtYXJpbmUsIGRlc3Ryb3llciwgYmF0dGxlc2hpcCwgY2Fycmllcik7XG5cbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoXCJQbGF5ZXIgMVwiLCBjb21wdXRlckJvYXJkKTtcbmNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcihcImNvbXB1dGVyXCIsIHBsYXllckJvYXJkKTtcblxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG4gIGNvbnN0IGVuZW15U3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2ItZ3JpZC1pdGVtXCIpO1xuXG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoc2hpcCk7XG4gIH0pO1xuXG4gIGNvbXB1dGVyU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHJjUGxhY2VTaGlwKGNvbXB1dGVyQm9hcmQsIHNoaXApO1xuICB9KTtcblxuICBlbmVteVNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImNsaWNrXCIsXG4gICAgICAoZSkgPT4ge1xuICAgICAgICB3aW5uZXJDaGVja2VyKHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkKTtcbiAgICAgICAgcGxheWVyLmF0dGFja09wcG9uZW50KEpTT04ucGFyc2UoZS50YXJnZXQuZGF0YXNldC5jb29yZCkpO1xuICAgICAgICB3aW5uZXJDaGVja2VyKHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkKTtcbiAgICAgICAgY29tcHV0ZXIuYXR0YWNrT3Bwb25lbnQoKTtcbiAgICAgICAgd2lubmVyQ2hlY2tlcihwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZCk7XG4gICAgICAgIHBsYXllckF0dGFja0Rpc3BsYXkoY29tcHV0ZXJCb2FyZCwgZSk7XG4gICAgICAgIGVuZW15QXR0YWNrRGlzcGxheShwbGF5ZXJCb2FyZCk7XG4gICAgICAgIHdpbm5lckNoZWNrZXIocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQpO1xuICAgICAgfSxcbiAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgKTtcbiAgfSk7XG59XG5cbi8vIHJjUGxhY2VTaGlwIHJlY3Vyc2l2ZWx5IHRyaWVzIHRvIGZpbmQgYSB2YWxpZCBzcG90IHRvIHBsYWNlIHRoZSBzaGlwc1xuXG5mdW5jdGlvbiByY1BsYWNlU2hpcChnYW1lYm9hcmQsIHNoaXApIHtcbiAgdHJ5IHtcbiAgICBnYW1lYm9hcmQucGxhY2VTaGlwKHNoaXApO1xuICB9IGNhdGNoIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbmV3U2hpcCA9IG5ldyBTaGlwKFxuICAgICAgICBzaGlwLm5hbWUsXG4gICAgICAgIFtnZXRSYW5kb21JbnQoMCwgOSksIGdldFJhbmRvbUludCgwLCA5KV0sXG4gICAgICAgIG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5sZW5ndGgpXVxuICAgICAgKTtcblxuICAgICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChuZXdTaGlwKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJjUGxhY2VTaGlwKGdhbWVib2FyZCwgc2hpcCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IGdhbWVMb29wIH07XG4iLCJjb25zdCBHYW1lYm9hcmQgPSBmdW5jdGlvbiAobmFtZSkge1xuICB0aGlzLm5hbWUgPSBuYW1lO1xuICB0aGlzLm1pc3NlZEhpdCA9IFtdO1xuICB0aGlzLnNoaXBzID0gW107XG4gIHRoaXMub2NjdXBpZWRTcG90cyA9IFtdO1xuICB0aGlzLnBsYXlhYmxlU3BvdHMgPSBbXTtcbiAgdGhpcy5hdHRhY2tlZFNwb3RzID0gW107XG4gIHRoaXMuaGl0U3BvdHMgPSBbXTtcblxuICBmb3IgKGxldCB4ID0gMDsgeCA8PSA5OyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSA5OyB5KyspIHtcbiAgICAgIHRoaXMucGxheWFibGVTcG90cy5wdXNoKFt5LCB4XSk7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5wbGFjZVNoaXAgPSAoc2hpcCkgPT4ge1xuICAgIGNvbnN0IG9jY3VwaWVkU3BvdENoZWNrID0gc2hpcC5jb29yZC5zb21lKChjb29yZCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMub2NjdXBpZWRTcG90cy5zb21lKChjb29yZHMpID0+IHtcbiAgICAgICAgaWYgKGNvb3JkLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcGxheWFibGVTcG90Q2hlY2sgPSBzaGlwLmNvb3JkLmV2ZXJ5KChjb29yZCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMucGxheWFibGVTcG90cy5zb21lKChjb29yZHMpID0+IHtcbiAgICAgICAgaWYgKGNvb3JkLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcHJveGltaXR5Q2hlY2sgPSBzaGlwLmNvb3JkLnNvbWUoKGNvb3JkKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5vY2N1cGllZFNwb3RzLnNvbWUoKGNvb3JkcykgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgW2Nvb3JkWzBdLCBjb29yZFsxXV0udG9TdHJpbmcoKSA9PT1cbiAgICAgICAgICAgIFtjb29yZHNbMF0gKyAxLCBjb29yZHNbMV1dLnRvU3RyaW5nKCkgfHxcbiAgICAgICAgICBbY29vcmRbMF0sIGNvb3JkWzFdXS50b1N0cmluZygpID09PVxuICAgICAgICAgICAgW2Nvb3Jkc1swXSwgY29vcmRzWzFdICsgMV0udG9TdHJpbmcoKSB8fFxuICAgICAgICAgIFtjb29yZFswXSwgY29vcmRbMV1dLnRvU3RyaW5nKCkgPT09XG4gICAgICAgICAgICBbY29vcmRzWzBdICsgMSwgY29vcmRzWzFdICsgMV0udG9TdHJpbmcoKSB8fFxuICAgICAgICAgIFtjb29yZFswXSwgY29vcmRbMV1dLnRvU3RyaW5nKCkgPT09XG4gICAgICAgICAgICBbY29vcmRzWzBdIC0gMSwgY29vcmRzWzFdXS50b1N0cmluZygpIHx8XG4gICAgICAgICAgW2Nvb3JkWzBdLCBjb29yZFsxXV0udG9TdHJpbmcoKSA9PT1cbiAgICAgICAgICAgIFtjb29yZHNbMF0sIGNvb3Jkc1sxXSAtIDFdLnRvU3RyaW5nKCkgfHxcbiAgICAgICAgICBbY29vcmRbMF0sIGNvb3JkWzFdXS50b1N0cmluZygpID09PVxuICAgICAgICAgICAgW2Nvb3Jkc1swXSAtIDEsIGNvb3Jkc1sxXSAtIDFdLnRvU3RyaW5nKClcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaWYgKG9jY3VwaWVkU3BvdENoZWNrKSB7XG4gICAgICB0aHJvdyBcIlNoaXAgY29vcmRpbmF0ZXMgYXJlIHRha2VuXCI7XG4gICAgfSBlbHNlIGlmICghcGxheWFibGVTcG90Q2hlY2spIHtcbiAgICAgIHRocm93IFwiU2hpcCBjb29yZGluYXRlcyBhcmUgb3V0IG9mIGJvdW5kc1wiO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBwcm94aW1pdHlDaGVjayAmJlxuICAgICAgdGhpcy5uYW1lLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKSA9PSBcIlBMQVlFUkJPQVJEXCJcbiAgICApIHtcbiAgICAgIHRocm93IFwiU2hpcCB0b28gY2xvc2VcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgICAgc2hpcC5jb29yZC5mb3JFYWNoKChwb2ludCkgPT4ge1xuICAgICAgICB0aGlzLm9jY3VwaWVkU3BvdHMucHVzaChwb2ludCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5yZWNlaXZlQXR0YWNrID0gKGNvb3JkcykgPT4ge1xuICAgIHRoaXMuYXR0YWNrZWRTcG90cy5wdXNoKGNvb3Jkcyk7XG5cbiAgICBjb25zdCBpbmRleCA9IHRoaXMucGxheWFibGVTcG90cy5maW5kSW5kZXgoKGVsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlbGVtZW50KSA9PSBKU09OLnN0cmluZ2lmeShjb29yZHMpO1xuICAgIH0pO1xuICAgIHRoaXMucGxheWFibGVTcG90cy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgY29uc3QgY29vcmRDaGVjayA9IHRoaXMub2NjdXBpZWRTcG90cy5zb21lKCh2YWwpID0+IHtcbiAgICAgIGlmICh2YWwudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoY29vcmRDaGVjaykge1xuICAgICAgY29uc3QgbXlTaGlwID0gdGhpcy5zaGlwcy5maW5kKChzaGlwKSA9PiB7XG4gICAgICAgIHJldHVybiBzaGlwLmNvb3JkLmZpbmQoKGNvb3JkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvb3JkLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBpbmRleCA9IG15U2hpcC5jb29yZC5maW5kSW5kZXgoKHZhbCkgPT4ge1xuICAgICAgICBpZiAodmFsLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbXlTaGlwLmhpdChpbmRleCk7XG4gICAgICB0aGlzLmhpdFNwb3RzLnB1c2goY29vcmRzKTtcblxuICAgICAgcmV0dXJuIFwiQXR0YWNrIGhpdCBhIHNoaXBcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5taXNzZWRIaXQucHVzaChjb29yZHMpO1xuXG4gICAgICByZXR1cm4gXCJBdHRhY2sgbWlzc2VkXCI7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGRlY2lzaW9uID0gdGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoZGVjaXNpb24pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1pbm5lci1kZWNsYXJhdGlvbnMgKi9cbmNvbnN0IFBsYXllciA9IGZ1bmN0aW9uIChuYW1lLCBnYW1lYm9hcmQpIHtcbiAgdGhpcy5uYW1lID0gbmFtZS50b1VwcGVyQ2FzZSgpO1xuICB0aGlzLmdhbWVib2FyZCA9IGdhbWVib2FyZDtcblxuICB0aGlzLmF0dGFja09wcG9uZW50ID0gKGNvb3JkKSA9PiB7XG4gICAgaWYgKHRoaXMubmFtZSA9PT0gXCJDT01QVVRFUlwiKSB7XG4gICAgICBjb25zdCBjb29yZENoZWNrZXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhbmRDb29yZCA9IFtnZXRSYW5kb21JbnQoMCwgOSksIGdldFJhbmRvbUludCgwLCA5KV07XG5cbiAgICAgICAgY29uc3QgY29vcmRDaGVjayA9IHRoaXMuZ2FtZWJvYXJkLnBsYXlhYmxlU3BvdHMuc29tZSgodmFsKSA9PiB7XG4gICAgICAgICAgaWYgKHZhbC50b1N0cmluZygpID09PSByYW5kQ29vcmQudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNvb3JkQ2hlY2spIHtcbiAgICAgICAgICB0aGlzLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRDb29yZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcmFuZENvb3JkID0gW2dldFJhbmRvbUludCgwLCA5KSwgZ2V0UmFuZG9tSW50KDAsIDkpXTtcbiAgICAgICAgICB0aGlzLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRDb29yZCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb29yZENoZWNrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZCk7XG4gICAgfVxuICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IGF0dGFja2VkYDtcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUludChtYXgsIG1pbikge1xuICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbn1cblxuZXhwb3J0IHsgZ2V0UmFuZG9tSW50LCBQbGF5ZXIgfTtcbiIsImNvbnN0IFNoaXAgPSBmdW5jdGlvbiAobmFtZSwgc0MsIG9yaWVudGF0aW9uKSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgdGhpcy5oaXRMb2NhdGlvbiA9IFtdO1xuICB0aGlzLnNDID0gc0M7XG5cbiAgY29uc3Qgb3JTdHIgPSBvcmllbnRhdGlvbi50b1N0cmluZygpLnRvVXBwZXJDYXNlKCk7XG5cbiAgc3dpdGNoIChuYW1lLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKSkge1xuICAgIGNhc2UgXCJQQVRST0xcIjpcbiAgICAgIHRoaXMubGVuZ3RoID0gMjtcblxuICAgICAgaWYgKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsIFt0aGlzLnNDWzBdICsgMSwgdGhpcy5zQ1sxXV1dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLCBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDFdXTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJTVUJNQVJJTkVcIjpcbiAgICAgIHRoaXMubGVuZ3RoID0gMztcbiAgICAgIGlmIChvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFtcbiAgICAgICAgICB0aGlzLnNDLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMSwgdGhpcy5zQ1sxXV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAyLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbXG4gICAgICAgICAgdGhpcy5zQyxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDFdLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMl0sXG4gICAgICAgIF07XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJERVNUUk9ZRVJcIjpcbiAgICAgIHRoaXMubGVuZ3RoID0gMztcblxuICAgICAgaWYgKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAxLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDIsIHRoaXMuc0NbMV1dLFxuICAgICAgICBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFtcbiAgICAgICAgICB0aGlzLnNDLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAyXSxcbiAgICAgICAgXTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkJBVFRMRVNISVBcIjpcbiAgICAgIHRoaXMubGVuZ3RoID0gNDtcblxuICAgICAgaWYgKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAxLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDIsIHRoaXMuc0NbMV1dLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMywgdGhpcy5zQ1sxXV0sXG4gICAgICAgIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAxXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDJdLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgM10sXG4gICAgICAgIF07XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJDQVJSSUVSXCI6XG4gICAgICB0aGlzLmxlbmd0aCA9IDU7XG5cbiAgICAgIGlmIChvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFtcbiAgICAgICAgICB0aGlzLnNDLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMSwgdGhpcy5zQ1sxXV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAyLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDMsIHRoaXMuc0NbMV1dLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgNCwgdGhpcy5zQ1sxXV0sXG4gICAgICAgIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAxXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDJdLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgM10sXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyA0XSxcbiAgICAgICAgXTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJJbnZhbGlkIGNob2ljZSBvZiBzaGlwXCI7XG4gIH1cblxuICB0aGlzLmhpdCA9IChudW0pID0+IHtcbiAgICB0aGlzLmhpdExvY2F0aW9uW251bV0gPSBcIlhcIjtcbiAgICB0aGlzLmxlbmd0aC0tO1xuXG4gICAgcmV0dXJuIGBTaGlwIGlzIGhpdCBhdCBwb2ludCAke251bX1gO1xuICB9O1xuXG4gIHRoaXMuaXNTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGhpdENoZWNrID0gdGhpcy5oaXRMb2NhdGlvbi5maWx0ZXIoKG51bSkgPT4ge1xuICAgICAgaWYgKG51bSA9PT0gXCJYXCIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoaGl0Q2hlY2sgJiYgdGhpcy5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnQgeyBTaGlwIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9mb250cy9CYXVmcmFCb2xkLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vZm9udHMvU3RlbmNpbC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogYmF1ZnJhO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBzdGVuY2lsO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG4gIFxcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0Q5MjEyMTtcXG4gIGNvbG9yOiBibGFjaztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDBweDtcXG4gIGZvbnQtZmFtaWx5OiBzdGVuY2lsLCBzYW5zLXNlcmlmO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMjVlbTtcXG4gIGZvbnQtc2l6ZTogMi43ZW07XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6MDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMi43ZW07XFxufVxcbmgxIHtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbWFyZ2luLXRvcDogMTNweDtcXG59XFxuLmdhbWVib2FyZHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIG1hcmdpbi10b3A6IDE3NHB4O1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnBsYXllck5hbWUge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjhlbTtcXG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFxcXCJTZWdvZSBVSVxcXCIsIFJvYm90bywgT3h5Z2VuLFxcbiAgICBVYnVudHUsIENhbnRhcmVsbCwgXFxcIk9wZW4gU2Fuc1xcXCIsIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG4vKlxcbi5jb21wdXRlci1ib2FyZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IG1hcm9vbjtcXG59Ki9cXG5cXG4ucGxheWVyLWJvYXJkLFxcbi5jb21wdXRlci1ib2FyZCB7XFxuICBcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiA0NXB4O1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcblxcbi5wYlNlY3Rpb24taXRlbSxcXG4uY2JTZWN0aW9uLWl0ZW0ge1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgaGVpZ2h0OiAzMThweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcXG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uY2ItZ3JpZC1pdGVtOmhvdmVyLFxcbi5wcy1ncmlkLWl0ZW06aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsIDAsIDAsIDAuMSk7XFxufVxcblxcbi5wYi1ncmlkLWl0ZW0sXFxuLmNiLWdyaWQtaXRlbSxcXG4ucHMtZ3JpZC1pdGVtIHtcXG4gIHdpZHRoOiAzMS44cHg7XFxuICBoZWlnaHQ6IDMxLjhweDtcXG4gIGJvcmRlcjogMC4xcHggc29saWQgYmxhY2s7XFxufVxcbi5wbGFjZVNoaXBzIHtcXG4gIG1heC13aWR0aDogMzUwcHg7XFxuICBoZWlnaHQ6IDQ1MHB4O1xcbiAgZm9udC1mYW1pbHk6IGJhdWZyYTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG5maWVsZHNldCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxOC4ycHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWF4LXdpZHRoOiBmaXQtY29udGVudDtcXG59XFxuXFxubGVnZW5kIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLnRvZ2dsZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG4uc2hpcE5hbWUge1xcbiAgcGFkZGluZzogMS44cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW46IDQuNXB4IDQuNTVweDtcXG59XFxuXFxuLndpbm5lciB7XFxuICB3aWR0aDogMjczcHg7XFxuICBoZWlnaHQ6IDEzNi41cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLndpbm5lci1kaWFsb2ctYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbn1cXG4ud2lubmVyLWlkZW50aXR5IHtcXG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFxcXCJTZWdvZSBVSVxcXCIsIFJvYm90bywgT3h5Z2VuLFxcbiAgICBVYnVudHUsIENhbnRhcmVsbCwgXFxcIk9wZW4gU2Fuc1xcXCIsIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogMzAwO1xcbn1cXG5cXG4uZ2FtZS1vdmVyIHtcXG4gIGZvbnQtc2l6ZTogMS44ZW07XFxuICBmb250LWZhbWlseTogYmF1ZnJhO1xcbn1cXG5cXG4uZ2FtZS1vdmVyLFxcbi53aW5uZXItaWRlbnRpdHkge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXFxcIlNlZ29lIFVJXFxcIiwgUm9ib3RvLCBPeHlnZW4sXFxuICAgIFVidW50dSwgQ2FudGFyZWxsLCBcXFwiT3BlbiBTYW5zXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkOTIxMjE7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiA5cHg7XFxuICBib3JkZXItcmFkaXVzOiA0LjVweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgZm9udC1mYW1pbHk6IGJhdWZyYTtcXG4gIGZvbnQtc2l6ZTogMC43NWVtO1xcbiAgYm90dG9tOiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDo2MDBweCkge1xcbiAgXFxuICAgIGhlYWRlciB7XFxuICAgICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xcbiAgICAgIFxcbiAgICB9XFxuXFxuICAgIC5wbGFjZVNoaXBzIHtcXG4gICAgICBtYXgtd2lkdGg6IDMwMHB4O1xcbiAgICAgIGhlaWdodDogYXV0bztcXG4gICAgfVxcblxcbiAgICAucGxhY2VTaGlwcyA+IGZvcm0ge1xcbiAgICAgIG1heC13aWR0aDogMjkwcHg7XFxuICAgIH1cXG4gICAgZm9ybSA+IGZpZWxkc2V0IHtcXG4gICAgICBtYXgtd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgICB9XFxuXFxuICAgIC5wYlNlY3Rpb24taXRlbSB7XFxuICAgICAgbWF4LXdpZHRoOiBmaXQtY29udGVudDtcXG4gICAgfVxcblxcbiAgICAucHMtZ3JpZC1pdGVtIHtcXG4gICAgICBtYXgtd2lkdGg6IDI5cHg7XFxuICAgICAgaGVpZ2h0OiBhdXRvO1xcbiAgICB9XFxuXFxuICAgIC5nYW1lYm9hcmRzIHtcXG4gICAgICBtYXJnaW4tdG9wOiAxMDBweDtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgICBnYXA6IDE1cHg7XFxuICAgIH1cXG5cXG4gICAgLnBsYXllci1ib2FyZCwuY29tcHV0ZXItYm9hcmQge1xcbiAgICAgIGdhcDogMjBweDtcXG4gICAgfVxcblxcbiAgICAuY29tcHV0ZXItYm9hcmQge1xcbiAgICAgIHBhZGRpbmctYm90dG9tOiAyMHB4O1xcbiAgICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxtQkFBbUI7RUFDbkIsNENBQWdDO0FBQ2xDO0FBQ0E7RUFDRSxvQkFBb0I7RUFDcEIsNENBQTZCO0FBQy9COztBQUVBO0VBQ0UsU0FBUzs7QUFFWDs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixnQ0FBZ0M7RUFDaEMsc0JBQXNCO0VBQ3RCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsS0FBSztFQUNMLFlBQVk7RUFDWixhQUFhO0FBQ2Y7QUFDQTtJQUNJLFVBQVU7SUFDVixnQkFBZ0I7QUFDcEI7QUFDQTtFQUNFLGFBQWE7RUFDYixpQkFBaUI7RUFDakIscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Z0VBQzhEO0VBQzlELGdCQUFnQjtFQUNoQixZQUFZO0FBQ2Q7QUFDQTs7O0VBR0U7O0FBRUY7OztFQUdFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsU0FBUztFQUNULGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7O0VBRUUsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG1DQUFtQztFQUNuQyxzQkFBc0I7RUFDdEIsb0JBQW9CO0VBQ3BCLGVBQWU7QUFDakI7O0FBRUE7O0VBRUUsZUFBZTtFQUNmLG1DQUFtQztBQUNyQzs7QUFFQTs7O0VBR0UsYUFBYTtFQUNiLGNBQWM7RUFDZCx5QkFBeUI7QUFDM0I7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7QUFDekI7QUFDQTtFQUNFLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGVBQWU7RUFDZixhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHFDQUFxQztBQUN2QztBQUNBO0VBQ0U7Z0VBQzhEO0VBQzlELGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckI7O0FBRUE7O0VBRUUsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0U7Z0VBQzhEO0VBQzlELHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osWUFBWTtFQUNaLG9CQUFvQjtFQUNwQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixTQUFTO0VBQ1QsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQjs7QUFFQTs7SUFFSTtNQUNFLGVBQWU7TUFDZixvQkFBb0I7O0lBRXRCOztJQUVBO01BQ0UsZ0JBQWdCO01BQ2hCLFlBQVk7SUFDZDs7SUFFQTtNQUNFLGdCQUFnQjtJQUNsQjtJQUNBO01BQ0Usc0JBQXNCO0lBQ3hCOztJQUVBO01BQ0Usc0JBQXNCO0lBQ3hCOztJQUVBO01BQ0UsZUFBZTtNQUNmLFlBQVk7SUFDZDs7SUFFQTtNQUNFLGlCQUFpQjtNQUNqQixhQUFhO01BQ2Isc0JBQXNCO01BQ3RCLHVCQUF1QjtNQUN2QixtQkFBbUI7TUFDbkIsU0FBUztJQUNYOztJQUVBO01BQ0UsU0FBUztJQUNYOztJQUVBO01BQ0Usb0JBQW9CO0lBQ3RCO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogYmF1ZnJhO1xcbiAgc3JjOiB1cmwoLi9mb250cy9CYXVmcmFCb2xkLnR0Zik7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IHN0ZW5jaWw7XFxuICBzcmM6IHVybCguL2ZvbnRzL1N0ZW5jaWwudHRmKTtcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEOTIxMjE7XFxuICBjb2xvcjogYmxhY2s7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwcHg7XFxuICBmb250LWZhbWlseTogc3RlbmNpbCwgc2Fucy1zZXJpZjtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjI1ZW07XFxuICBmb250LXNpemU6IDIuN2VtO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOjA7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDIuN2VtO1xcbn1cXG5oMSB7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG1hcmdpbi10b3A6IDEzcHg7XFxufVxcbi5nYW1lYm9hcmRzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtYXJnaW4tdG9wOiAxNzRweDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5wbGF5ZXJOYW1lIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS44ZW07XFxuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcXFwiU2Vnb2UgVUlcXFwiLCBSb2JvdG8sIE94eWdlbixcXG4gICAgVWJ1bnR1LCBDYW50YXJlbGwsIFxcXCJPcGVuIFNhbnNcXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLypcXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXJvb247XFxufSovXFxuXFxuLnBsYXllci1ib2FyZCxcXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgXFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogNDVweDtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbn1cXG5cXG4ucGJTZWN0aW9uLWl0ZW0sXFxuLmNiU2VjdGlvbi1pdGVtIHtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIGhlaWdodDogMzE4cHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XFxuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNiLWdyaWQtaXRlbTpob3ZlcixcXG4ucHMtZ3JpZC1pdGVtOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAwLCAwLCAwLjEpO1xcbn1cXG5cXG4ucGItZ3JpZC1pdGVtLFxcbi5jYi1ncmlkLWl0ZW0sXFxuLnBzLWdyaWQtaXRlbSB7XFxuICB3aWR0aDogMzEuOHB4O1xcbiAgaGVpZ2h0OiAzMS44cHg7XFxuICBib3JkZXI6IDAuMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG4ucGxhY2VTaGlwcyB7XFxuICBtYXgtd2lkdGg6IDM1MHB4O1xcbiAgaGVpZ2h0OiA0NTBweDtcXG4gIGZvbnQtZmFtaWx5OiBiYXVmcmE7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuZmllbGRzZXQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMTguMnB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1heC13aWR0aDogZml0LWNvbnRlbnQ7XFxufVxcblxcbmxlZ2VuZCB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi50b2dnbGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLnNoaXBOYW1lIHtcXG4gIHBhZGRpbmc6IDEuOHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luOiA0LjVweCA0LjU1cHg7XFxufVxcblxcbi53aW5uZXIge1xcbiAgd2lkdGg6IDI3M3B4O1xcbiAgaGVpZ2h0OiAxMzYuNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi53aW5uZXItZGlhbG9nLWJ1dHRvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG59XFxuLndpbm5lci1pZGVudGl0eSB7XFxuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcXFwiU2Vnb2UgVUlcXFwiLCBSb2JvdG8sIE94eWdlbixcXG4gICAgVWJ1bnR1LCBDYW50YXJlbGwsIFxcXCJPcGVuIFNhbnNcXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG59XFxuXFxuLmdhbWUtb3ZlciB7XFxuICBmb250LXNpemU6IDEuOGVtO1xcbiAgZm9udC1mYW1pbHk6IGJhdWZyYTtcXG59XFxuXFxuLmdhbWUtb3ZlcixcXG4ud2lubmVyLWlkZW50aXR5IHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFxcXCJTZWdvZSBVSVxcXCIsIFJvYm90bywgT3h5Z2VuLFxcbiAgICBVYnVudHUsIENhbnRhcmVsbCwgXFxcIk9wZW4gU2Fuc1xcXCIsIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIHNhbnMtc2VyaWY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDkyMTIxO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogOXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNC41cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGZvbnQtZmFtaWx5OiBiYXVmcmE7XFxuICBmb250LXNpemU6IDAuNzVlbTtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6NjAwcHgpIHtcXG4gIFxcbiAgICBoZWFkZXIge1xcbiAgICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcXG4gICAgICBcXG4gICAgfVxcblxcbiAgICAucGxhY2VTaGlwcyB7XFxuICAgICAgbWF4LXdpZHRoOiAzMDBweDtcXG4gICAgICBoZWlnaHQ6IGF1dG87XFxuICAgIH1cXG5cXG4gICAgLnBsYWNlU2hpcHMgPiBmb3JtIHtcXG4gICAgICBtYXgtd2lkdGg6IDI5MHB4O1xcbiAgICB9XFxuICAgIGZvcm0gPiBmaWVsZHNldCB7XFxuICAgICAgbWF4LXdpZHRoOiBmaXQtY29udGVudDtcXG4gICAgfVxcblxcbiAgICAucGJTZWN0aW9uLWl0ZW0ge1xcbiAgICAgIG1heC13aWR0aDogZml0LWNvbnRlbnQ7XFxuICAgIH1cXG5cXG4gICAgLnBzLWdyaWQtaXRlbSB7XFxuICAgICAgbWF4LXdpZHRoOiAyOXB4O1xcbiAgICAgIGhlaWdodDogYXV0bztcXG4gICAgfVxcblxcbiAgICAuZ2FtZWJvYXJkcyB7XFxuICAgICAgbWFyZ2luLXRvcDogMTAwcHg7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgZ2FwOiAxNXB4O1xcbiAgICB9XFxuXFxuICAgIC5wbGF5ZXItYm9hcmQsLmNvbXB1dGVyLWJvYXJkIHtcXG4gICAgICBnYXA6IDIwcHg7XFxuICAgIH1cXG5cXG4gICAgLmNvbXB1dGVyLWJvYXJkIHtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMjBweDtcXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgXCIuL21vZHVsZXMvRE9NXCI7XG5pbXBvcnQgXCIuL21vZHVsZXMvY29udHJvbGxlclwiO1xuXG5jb25zdCBtYWluZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLWRpYWxvZ1wiKTtcbm1haW5kaWFsb2cuc2hvd01vZGFsKCk7XG4iXSwibmFtZXMiOlsiU2hpcCIsImdhbWVMb29wIiwicGJTZWN0aW9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2JTZWN0aW9uIiwicGxhY2VTaGlwU2VjdGlvbiIsInNoaXBOYW1lIiwiY3JlYXRlRWxlbWVudCIsIm1haW5kaWFsb2ciLCJjbGFzc05hbWUiLCJpZCIsInRleHRDb250ZW50Iiwid2lubmVyZGlhbG9nIiwid2lubmVyIiwicmVzdGFydEJ0biIsInBsYXllck5hbWUiLCJjb21wdXRlck5hbWUiLCJzaGlwcyIsIm9jY3VwaWVkU3BvdHMiLCJjb3VudCIsInBsYXlhYmxlU3BvdHMiLCJjcmVhdGVQbGF5ZXJHcmlkIiwicGdyaWRDb250YWluZXIiLCJ4IiwiZGl2IiwiYXBwZW5kQ2hpbGQiLCJpZEdyaWRzIiwicGxheWVyU3F1YXJlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwb3B1bGF0ZVBsYXllckJvYXJkIiwib3JpZW50YXRpb25Ub2dnbGUiLCJmb3JtIiwiZmllbGRzZXQiLCJsZWdlbmQiLCJ0b2dnbGUxIiwidG9nZ2xlMiIsInZUb2dnbGUiLCJoVG9nZ2xlIiwibGFiZWwxIiwibGFiZWwyIiwiZm9yIiwidHlwZSIsInZhbHVlIiwiY2hlY2tlZCIsIm5hbWUiLCJwbGFjZVNoaXBHcmlkIiwicGxTaGlwQ29udGFpbmVyIiwiY3JlYXRlRW5lbXlHcmlkIiwiY2dyaWRDb250YWluZXIiLCJzZWxlY3RvciIsImdyaWRpdGVtcyIsIm15QXJyIiwieSIsInB1c2giLCJzZXRBdHRyaWJ1dGUiLCJmb3JFYWNoIiwic2hpcCIsImNvb3JkIiwic3F1YXJlIiwiZGF0YXNldCIsInRvU3RyaW5nIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwbGF5ZXJBdHRhY2tEaXNwbGF5Iiwib2JqIiwiZSIsImF0dGFja2VkU3BvdHMiLCJjb29yZENoZWNrMSIsInNvbWUiLCJ0YXJnZXQiLCJjb29yZENoZWNrMiIsImVuZW15QXR0YWNrRGlzcGxheSIsIm1pc3NlZEhpdHMiLCJtaXNzZWRIaXQiLCJoaXRTcG90cyIsInZhbGlkYXRlQ29vcmRzIiwicGxheWFibGVTcG90Q2hlY2siLCJldmVyeSIsImNvb3JkcyIsImNyZWF0ZVNoaXBzIiwib3JpZW50YXRpb24iLCJKU09OIiwicGFyc2UiLCJwYXRyb2wiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJiYXR0bGVzaGlwIiwiY2FycmllciIsImNsb3NlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uY2UiLCJ3aW5uZXJDaGVja2VyIiwicGxheWVyQm9hcmQiLCJjb21wdXRlckJvYXJkIiwiYWxsU2hpcHNTdW5rIiwic2hvd01vZGFsIiwibG9jYXRpb24iLCJyZWxvYWQiLCJnZXRSYW5kb21JbnQiLCJQbGF5ZXIiLCJHYW1lYm9hcmQiLCJvcHRpb25zIiwiY29tcHV0ZXJTaGlwcyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxlbmd0aCIsInBsYXllciIsImNvbXB1dGVyIiwiZW5lbXlTcXVhcmVzIiwicGxhY2VTaGlwIiwicmNQbGFjZVNoaXAiLCJhdHRhY2tPcHBvbmVudCIsImdhbWVib2FyZCIsIm5ld1NoaXAiLCJvY2N1cGllZFNwb3RDaGVjayIsInByb3hpbWl0eUNoZWNrIiwidG9VcHBlckNhc2UiLCJwb2ludCIsInJlY2VpdmVBdHRhY2siLCJpbmRleCIsImZpbmRJbmRleCIsImVsZW1lbnQiLCJzdHJpbmdpZnkiLCJzcGxpY2UiLCJjb29yZENoZWNrIiwidmFsIiwibXlTaGlwIiwiZmluZCIsImhpdCIsImRlY2lzaW9uIiwiaXNTdW5rIiwiY29vcmRDaGVja2VyIiwicmFuZENvb3JkIiwibWF4IiwibWluIiwiY2VpbCIsInNDIiwiaGl0TG9jYXRpb24iLCJvclN0ciIsIm51bSIsImhpdENoZWNrIiwiZmlsdGVyIl0sInNvdXJjZVJvb3QiOiIifQ==