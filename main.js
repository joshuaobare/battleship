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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: baufra;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n@font-face {\n  font-family: stencil;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\nbody {\n  margin: 0;\n  overflow: hidden;\n}\n\nheader {\n  background-color: #D92121;\n  color: black;\n  text-align: center;\n  padding: 0px;\n  font-family: stencil, sans-serif;\n  letter-spacing: 0.25em;\n  font-size: 3em;\n  position: fixed;\n  top:0;\n  width: 100vw;\n  height: 3em;\n}\nh1 {\n    padding: 0;\n    margin-top: 15px;\n}\n.gameboards {\n  display: flex;\n  margin-top: 20px;\n  justify-items: center;\n  align-items: center;\n}\n\n.playerName {\n  text-align: center;\n  font-size: 2em;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  font-weight: 200;\n  color: black;\n}\n/*\n.computer-board {\n    background-color: maroon;\n}*/\n\n.player-board,\n.computer-board {\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  gap: 50px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.pbSection-item,\n.cbSection-item {\n  width: 350px;\n  height: 350px;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n  justify-items: stretch;\n  align-items: stretch;\n}\n\n.cb-grid-item:hover,\n.ps-grid-item:hover {\n  cursor: pointer;\n  background-color: rgb(0, 0, 0, 0.1);\n}\n\n.pb-grid-item,\n.cb-grid-item,\n.ps-grid-item {\n  width: 35px;\n  height: 35px;\n  border: 0.1px solid black;\n}\n.placeShips {\n  width: 370px;\n  height: 460px;\n  font-family: baufra;\n}\n\nfieldset {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  width: 340px;\n}\n\nlegend {\n  text-align: center;\n}\n.toggle {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.shipName {\n  padding: 2px;\n  text-align: center;\n  margin: 5px 5px;\n}\n\n.winner {\n  width: 300px;\n  height: 150px;\n  display: flex;\n  justify-content: space-between;\n  flex-direction: column;\n}\n.winner-dialog-button {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n.winner-identity {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  font-weight: 300;\n}\n\n.game-over {\n  font-size: 2em;\n  font-family: baufra;\n}\n\n.game-over,\n.winner-identity {\n  text-align: center;\n}\n\nbutton {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  background-color: #d92121;\n  color: white;\n  padding: 10px;\n  border-radius: 5px;\n  cursor: pointer;\n}\n\nfooter {\n  background-color: black;\n  color: white;\n  position: fixed;\n  font-family: baufra;\n  font-size: 0.75em;\n  bottom: 0;\n  width: 100vw;\n  text-align: center;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,4CAAgC;AAClC;AACA;EACE,oBAAoB;EACpB,4CAA6B;AAC/B;;AAEA;EACE,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,gCAAgC;EAChC,sBAAsB;EACtB,cAAc;EACd,eAAe;EACf,KAAK;EACL,YAAY;EACZ,WAAW;AACb;AACA;IACI,UAAU;IACV,gBAAgB;AACpB;AACA;EACE,aAAa;EACb,gBAAgB;EAChB,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,cAAc;EACd;gEAC8D;EAC9D,gBAAgB;EAChB,YAAY;AACd;AACA;;;EAGE;;AAEF;;EAEE,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;;EAEE,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,mCAAmC;EACnC,sBAAsB;EACtB,oBAAoB;AACtB;;AAEA;;EAEE,eAAe;EACf,mCAAmC;AACrC;;AAEA;;;EAGE,WAAW;EACX,YAAY;EACZ,yBAAyB;AAC3B;AACA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;AACA;EACE,YAAY;EACZ,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,aAAa;EACb,8BAA8B;EAC9B,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,qCAAqC;AACvC;AACA;EACE;gEAC8D;EAC9D,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,mBAAmB;AACrB;;AAEA;;EAEE,kBAAkB;AACpB;;AAEA;EACE;gEAC8D;EAC9D,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,uBAAuB;EACvB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,iBAAiB;EACjB,SAAS;EACT,YAAY;EACZ,kBAAkB;AACpB","sourcesContent":["@font-face {\n  font-family: baufra;\n  src: url(./fonts/BaufraBold.ttf);\n}\n@font-face {\n  font-family: stencil;\n  src: url(./fonts/Stencil.ttf);\n}\n\nbody {\n  margin: 0;\n  overflow: hidden;\n}\n\nheader {\n  background-color: #D92121;\n  color: black;\n  text-align: center;\n  padding: 0px;\n  font-family: stencil, sans-serif;\n  letter-spacing: 0.25em;\n  font-size: 3em;\n  position: fixed;\n  top:0;\n  width: 100vw;\n  height: 3em;\n}\nh1 {\n    padding: 0;\n    margin-top: 15px;\n}\n.gameboards {\n  display: flex;\n  margin-top: 20px;\n  justify-items: center;\n  align-items: center;\n}\n\n.playerName {\n  text-align: center;\n  font-size: 2em;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  font-weight: 200;\n  color: black;\n}\n/*\n.computer-board {\n    background-color: maroon;\n}*/\n\n.player-board,\n.computer-board {\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  gap: 50px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.pbSection-item,\n.cbSection-item {\n  width: 350px;\n  height: 350px;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n  justify-items: stretch;\n  align-items: stretch;\n}\n\n.cb-grid-item:hover,\n.ps-grid-item:hover {\n  cursor: pointer;\n  background-color: rgb(0, 0, 0, 0.1);\n}\n\n.pb-grid-item,\n.cb-grid-item,\n.ps-grid-item {\n  width: 35px;\n  height: 35px;\n  border: 0.1px solid black;\n}\n.placeShips {\n  width: 370px;\n  height: 460px;\n  font-family: baufra;\n}\n\nfieldset {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  width: 340px;\n}\n\nlegend {\n  text-align: center;\n}\n.toggle {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.shipName {\n  padding: 2px;\n  text-align: center;\n  margin: 5px 5px;\n}\n\n.winner {\n  width: 300px;\n  height: 150px;\n  display: flex;\n  justify-content: space-between;\n  flex-direction: column;\n}\n.winner-dialog-button {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n.winner-identity {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  font-weight: 300;\n}\n\n.game-over {\n  font-size: 2em;\n  font-family: baufra;\n}\n\n.game-over,\n.winner-identity {\n  text-align: center;\n}\n\nbutton {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  background-color: #d92121;\n  color: white;\n  padding: 10px;\n  border-radius: 5px;\n  cursor: pointer;\n}\n\nfooter {\n  background-color: black;\n  color: white;\n  position: fixed;\n  font-family: baufra;\n  font-size: 0.75em;\n  bottom: 0;\n  width: 100vw;\n  text-align: center;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBLE1BQU1FLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLGVBQXZCLENBQWxCO0FBQ0EsTUFBTUMsU0FBUyxHQUFHRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsaUJBQXZCLENBQWxCO0FBQ0EsTUFBTUUsZ0JBQWdCLEdBQUdILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixhQUF2QixDQUF6QjtBQUNBLE1BQU1HLFFBQVEsR0FBR0osUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0FBQ0EsTUFBTUMsVUFBVSxHQUFHTixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBbkI7QUFDQUcsUUFBUSxDQUFDRyxTQUFULEdBQXFCLFVBQXJCO0FBQ0FILFFBQVEsQ0FBQ0ksRUFBVCxHQUFjLFVBQWQ7QUFDQUosUUFBUSxDQUFDSyxXQUFUO0FBQ0EsTUFBTUMsWUFBWSxHQUFHVixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXJCO0FBQ0EsTUFBTVUsTUFBTSxHQUFHWCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsa0JBQXZCLENBQWY7QUFDQSxNQUFNVyxVQUFVLEdBQUdaLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixDQUFuQjtBQUNBLE1BQU1ZLFVBQVUsR0FBR2IsUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQW5CO0FBQ0EsTUFBTVMsWUFBWSxHQUFHZCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBckI7QUFDQVEsVUFBVSxDQUFDTixTQUFYLEdBQXVCLFlBQXZCO0FBQ0FPLFlBQVksQ0FBQ1AsU0FBYixHQUF5QixZQUF6QjtBQUVBLElBQUlRLEtBQUssR0FBRyxFQUFaO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLEVBQXBCO0FBQ0EsSUFBSUMsS0FBSyxHQUFHLENBQVo7QUFDQSxJQUFJQyxhQUFhLEdBQUcsRUFBcEI7O0FBRUEsU0FBU0MsZ0JBQVQsR0FBNEI7RUFDMUIsTUFBTUMsY0FBYyxHQUFHcEIsUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQXZCO0VBRUFlLGNBQWMsQ0FBQ2IsU0FBZixHQUEyQixnQkFBM0I7O0VBRUEsS0FBSyxJQUFJYyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJLEVBQXJCLEVBQXlCQSxDQUFDLEVBQTFCLEVBQThCO0lBQzVCLE1BQU1DLEdBQUcsR0FBR3RCLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUFaO0lBQ0FpQixHQUFHLENBQUNmLFNBQUosR0FBZ0IsY0FBaEI7SUFDQWEsY0FBYyxDQUFDRyxXQUFmLENBQTJCRCxHQUEzQjtFQUNEOztFQUNEVCxVQUFVLENBQUNKLFdBQVgsR0FBeUIsUUFBekI7RUFDQVYsU0FBUyxDQUFDd0IsV0FBVixDQUFzQkgsY0FBdEI7RUFFQXJCLFNBQVMsQ0FBQ3dCLFdBQVYsQ0FBc0JWLFVBQXRCO0VBQ0FXLE9BQU8sQ0FBQyxlQUFELENBQVA7RUFDQSxNQUFNQyxhQUFhLEdBQUd6QixRQUFRLENBQUMwQixnQkFBVCxDQUEwQixlQUExQixDQUF0QjtFQUNBQyxtQkFBbUIsQ0FBQ0YsYUFBRCxDQUFuQjtBQUNEOztBQUNELFNBQVNHLGlCQUFULEdBQTZCO0VBQzNCLE1BQU1DLElBQUksR0FBRzdCLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixNQUF2QixDQUFiO0VBQ0EsTUFBTXlCLFFBQVEsR0FBRzlCLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixVQUF2QixDQUFqQjtFQUNBLE1BQU0wQixNQUFNLEdBQUcvQixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZjtFQUNBMEIsTUFBTSxDQUFDdEIsV0FBUCxHQUFxQixhQUFyQjtFQUNBLE1BQU11QixPQUFPLEdBQUdoQyxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7RUFDQSxNQUFNNEIsT0FBTyxHQUFHakMsUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0VBQ0EyQixPQUFPLENBQUN6QixTQUFSLEdBQW9CLFFBQXBCO0VBQ0EwQixPQUFPLENBQUMxQixTQUFSLEdBQW9CLFFBQXBCO0VBQ0EsTUFBTTJCLE9BQU8sR0FBR2xDLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixPQUF2QixDQUFoQjtFQUNBLE1BQU04QixPQUFPLEdBQUduQyxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBaEI7RUFDQSxNQUFNK0IsTUFBTSxHQUFHcEMsUUFBUSxDQUFDSyxhQUFULENBQXVCLE9BQXZCLENBQWY7RUFDQSxNQUFNZ0MsTUFBTSxHQUFHckMsUUFBUSxDQUFDSyxhQUFULENBQXVCLE9BQXZCLENBQWY7RUFDQStCLE1BQU0sQ0FBQ0UsR0FBUCxHQUFhLEdBQWI7RUFDQUQsTUFBTSxDQUFDQyxHQUFQLEdBQWEsR0FBYjtFQUNBRixNQUFNLENBQUMzQixXQUFQLEdBQXFCLFlBQXJCO0VBQ0E0QixNQUFNLENBQUM1QixXQUFQLEdBQXFCLGNBQXJCO0VBQ0F5QixPQUFPLENBQUNLLElBQVIsR0FBZSxPQUFmO0VBQ0FMLE9BQU8sQ0FBQzFCLEVBQVIsR0FBYSxHQUFiO0VBQ0EwQixPQUFPLENBQUNNLEtBQVIsR0FBZ0IsR0FBaEI7RUFDQU4sT0FBTyxDQUFDTyxPQUFSLEdBQWtCLElBQWxCO0VBQ0FQLE9BQU8sQ0FBQ1EsSUFBUixHQUFlLGFBQWY7RUFDQVAsT0FBTyxDQUFDSSxJQUFSLEdBQWUsT0FBZjtFQUNBSixPQUFPLENBQUMzQixFQUFSLEdBQWEsR0FBYjtFQUNBMkIsT0FBTyxDQUFDSyxLQUFSLEdBQWdCLEdBQWhCO0VBQ0FMLE9BQU8sQ0FBQ08sSUFBUixHQUFlLGFBQWY7RUFFQVYsT0FBTyxDQUFDVCxXQUFSLENBQW9CYSxNQUFwQjtFQUNBSixPQUFPLENBQUNULFdBQVIsQ0FBb0JXLE9BQXBCO0VBQ0FELE9BQU8sQ0FBQ1YsV0FBUixDQUFvQmMsTUFBcEI7RUFDQUosT0FBTyxDQUFDVixXQUFSLENBQW9CWSxPQUFwQjtFQUNBTCxRQUFRLENBQUNQLFdBQVQsQ0FBcUJRLE1BQXJCO0VBQ0FELFFBQVEsQ0FBQ1AsV0FBVCxDQUFxQlMsT0FBckI7RUFDQUYsUUFBUSxDQUFDUCxXQUFULENBQXFCVSxPQUFyQjtFQUNBSixJQUFJLENBQUNOLFdBQUwsQ0FBaUJPLFFBQWpCO0VBRUEzQixnQkFBZ0IsQ0FBQ29CLFdBQWpCLENBQTZCTSxJQUE3QjtFQUNBMUIsZ0JBQWdCLENBQUNvQixXQUFqQixDQUE2Qm5CLFFBQTdCO0FBQ0Q7O0FBRUQsU0FBU3VDLGFBQVQsR0FBeUI7RUFDdkIsTUFBTUMsZUFBZSxHQUFHNUMsUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQXhCO0VBRUF1QyxlQUFlLENBQUNyQyxTQUFoQixHQUE0QixnQkFBNUI7O0VBRUEsS0FBSyxJQUFJYyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJLEVBQXJCLEVBQXlCQSxDQUFDLEVBQTFCLEVBQThCO0lBQzVCLE1BQU1DLEdBQUcsR0FBR3RCLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUFaO0lBQ0FpQixHQUFHLENBQUNmLFNBQUosR0FBZ0IsY0FBaEI7SUFDQXFDLGVBQWUsQ0FBQ3JCLFdBQWhCLENBQTRCRCxHQUE1QjtFQUNEOztFQUNETSxpQkFBaUI7RUFDakJ6QixnQkFBZ0IsQ0FBQ29CLFdBQWpCLENBQTZCcUIsZUFBN0I7RUFDQXBCLE9BQU8sQ0FBQyxlQUFELENBQVA7QUFDRDs7QUFFRCxTQUFTcUIsZUFBVCxHQUEyQjtFQUN6QixNQUFNQyxjQUFjLEdBQUc5QyxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdkI7RUFDQXlDLGNBQWMsQ0FBQ3ZDLFNBQWYsR0FBMkIsZ0JBQTNCOztFQUNBLEtBQUssSUFBSWMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSSxFQUFyQixFQUF5QkEsQ0FBQyxFQUExQixFQUE4QjtJQUM1QixNQUFNQyxHQUFHLEdBQUd0QixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtJQUNBaUIsR0FBRyxDQUFDZixTQUFKO0lBRUF1QyxjQUFjLENBQUN2QixXQUFmLENBQTJCRCxHQUEzQjtFQUNEOztFQUNEUixZQUFZLENBQUNMLFdBQWIsR0FBMkIsVUFBM0I7RUFDQVAsU0FBUyxDQUFDcUIsV0FBVixDQUFzQnVCLGNBQXRCO0VBQ0E1QyxTQUFTLENBQUNxQixXQUFWLENBQXNCVCxZQUF0QjtFQUNBVSxPQUFPLENBQUMsZUFBRCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU0EsT0FBVCxDQUFpQnVCLFFBQWpCLEVBQTJCO0VBQ3pCLE1BQU1DLFNBQVMsR0FBR2hELFFBQVEsQ0FBQzBCLGdCQUFULENBQTBCcUIsUUFBMUIsQ0FBbEI7RUFDQSxJQUFJRSxLQUFLLEdBQUcsRUFBWjs7RUFFQSxLQUFLLElBQUk1QixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJLENBQXJCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0lBQzNCLEtBQUssSUFBSTZCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLElBQUksQ0FBckIsRUFBd0JBLENBQUMsRUFBekIsRUFBNkI7TUFDM0JELEtBQUssQ0FBQ0UsSUFBTixDQUFXLENBQUNELENBQUQsRUFBSTdCLENBQUosQ0FBWDtNQUNBSCxhQUFhLENBQUNpQyxJQUFkLENBQW1CLENBQUNELENBQUQsRUFBSTdCLENBQUosQ0FBbkI7SUFDRDtFQUNGOztFQUVELEtBQUssSUFBSUEsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxHQUFwQixFQUF5QkEsQ0FBQyxFQUExQixFQUE4QjtJQUM1QjJCLFNBQVMsQ0FBQzNCLENBQUQsQ0FBVCxDQUFhK0IsWUFBYixDQUEwQixZQUExQixhQUE0Q0gsS0FBSyxDQUFDNUIsQ0FBRCxDQUFqRDtFQUNEO0FBQ0Y7O0FBQ0RzQixhQUFhO0FBQ2IsTUFBTWxCLGFBQWEsR0FBR3pCLFFBQVEsQ0FBQzBCLGdCQUFULENBQTBCLGVBQTFCLENBQXRCOztBQUVBLFNBQVNDLG1CQUFULENBQTZCRixhQUE3QixFQUE0QztFQUMxQ1YsS0FBSyxDQUFDc0MsT0FBTixDQUFlQyxJQUFELElBQVU7SUFDdEJBLElBQUksQ0FBQ0MsS0FBTCxDQUFXRixPQUFYLENBQW9CRSxLQUFELElBQVc7TUFDNUJ2QyxhQUFhLENBQUNtQyxJQUFkLFlBQXVCSSxLQUF2QjtJQUNELENBRkQ7RUFHRCxDQUpEO0VBTUE5QixhQUFhLENBQUM0QixPQUFkLENBQXVCRyxNQUFELElBQVk7SUFDaEN4QyxhQUFhLENBQUNxQyxPQUFkLENBQXVCRSxLQUFELElBQVc7TUFDL0IsSUFBSUMsTUFBTSxDQUFDQyxPQUFQLENBQWVGLEtBQWYsQ0FBcUJHLFFBQXJCLE9BQW9DSCxLQUFLLENBQUNHLFFBQU4sRUFBeEMsRUFBMEQ7UUFDeERGLE1BQU0sQ0FBQ0csS0FBUCxDQUFhQyxlQUFiLEdBQStCLE1BQS9CO01BQ0Q7SUFDRixDQUpEO0VBS0QsQ0FORDtBQU9EOztBQUVELFNBQVNDLG1CQUFULENBQTZCQyxHQUE3QixFQUFrQ0MsQ0FBbEMsRUFBcUM7RUFDbkMsTUFBTUMsYUFBYSxHQUFHRixHQUFHLENBQUNFLGFBQTFCO0VBQ0EsTUFBTWhELGFBQWEsR0FBRzhDLEdBQUcsQ0FBQzlDLGFBQTFCO0VBRUEsTUFBTWlELFdBQVcsR0FBR0QsYUFBYSxDQUFDRSxJQUFkLENBQW9CWCxLQUFELElBQVc7SUFDaEQsT0FBT1EsQ0FBQyxDQUFDSSxNQUFGLENBQVNWLE9BQVQsQ0FBaUJGLEtBQWpCLENBQXVCRyxRQUF2QixrQkFBMENILEtBQUssQ0FBQ0csUUFBTixFQUExQyxNQUFQO0VBQ0QsQ0FGbUIsQ0FBcEI7RUFHQSxNQUFNVSxXQUFXLEdBQUdwRCxhQUFhLENBQUNrRCxJQUFkLENBQW9CWCxLQUFELElBQVc7SUFDaEQsT0FBT1EsQ0FBQyxDQUFDSSxNQUFGLENBQVNWLE9BQVQsQ0FBaUJGLEtBQWpCLENBQXVCRyxRQUF2QixrQkFBMENILEtBQUssQ0FBQ0csUUFBTixFQUExQyxNQUFQO0VBQ0QsQ0FGbUIsQ0FBcEI7O0VBSUEsSUFBSU8sV0FBVyxJQUFJRyxXQUFuQixFQUFnQztJQUM5QkwsQ0FBQyxDQUFDSSxNQUFGLENBQVNSLEtBQVQsQ0FBZUMsZUFBZixHQUFpQyxTQUFqQztFQUNELENBRkQsTUFFTyxJQUFJSyxXQUFXLElBQUksQ0FBQ0csV0FBcEIsRUFBaUM7SUFDdENMLENBQUMsQ0FBQ0ksTUFBRixDQUFTUixLQUFULENBQWVDLGVBQWYsR0FBaUMsY0FBakM7RUFDRDtBQUNGOztBQUVELFNBQVNTLGtCQUFULENBQTRCUCxHQUE1QixFQUFpQztFQUMvQixNQUFNUSxVQUFVLEdBQUdSLEdBQUcsQ0FBQ1MsU0FBdkI7RUFDQSxNQUFNQyxRQUFRLEdBQUdWLEdBQUcsQ0FBQ1UsUUFBckI7RUFDQSxNQUFNL0MsYUFBYSxHQUFHekIsUUFBUSxDQUFDMEIsZ0JBQVQsQ0FBMEIsZUFBMUIsQ0FBdEI7RUFFQUQsYUFBYSxDQUFDNEIsT0FBZCxDQUF1QkcsTUFBRCxJQUFZO0lBQ2hDYyxVQUFVLENBQUNqQixPQUFYLENBQW9CRSxLQUFELElBQVc7TUFDNUIsSUFBSUMsTUFBTSxDQUFDQyxPQUFQLENBQWVGLEtBQWYsQ0FBcUJHLFFBQXJCLGtCQUF3Q0gsS0FBSyxDQUFDRyxRQUFOLEVBQXhDLE1BQUosRUFBaUU7UUFDL0RGLE1BQU0sQ0FBQ0csS0FBUCxDQUFhQyxlQUFiLEdBQStCLGNBQS9CO01BQ0Q7SUFDRixDQUpEO0VBS0QsQ0FORDtFQVFBbkMsYUFBYSxDQUFDNEIsT0FBZCxDQUF1QkcsTUFBRCxJQUFZO0lBQ2hDZ0IsUUFBUSxDQUFDbkIsT0FBVCxDQUFrQkUsS0FBRCxJQUFXO01BQzFCLElBQUlDLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlRixLQUFmLENBQXFCRyxRQUFyQixrQkFBd0NILEtBQUssQ0FBQ0csUUFBTixFQUF4QyxNQUFKLEVBQWlFO1FBQy9ERixNQUFNLENBQUNHLEtBQVAsQ0FBYUMsZUFBYixHQUErQixTQUEvQjtNQUNEO0lBQ0YsQ0FKRDtFQUtELENBTkQ7QUFPRDs7QUFFRCxTQUFTYSxjQUFULENBQXdCbkIsSUFBeEIsRUFBOEI7RUFDNUIsTUFBTW9CLGlCQUFpQixHQUFHcEIsSUFBSSxDQUFDQyxLQUFMLENBQVdvQixLQUFYLENBQWtCcEIsS0FBRCxJQUFXO0lBQ3BELE9BQU9yQyxhQUFhLENBQUNnRCxJQUFkLENBQW9CVSxNQUFELElBQVk7TUFDcEMsSUFBSXJCLEtBQUssQ0FBQ0csUUFBTixPQUFxQmtCLE1BQU0sQ0FBQ2xCLFFBQVAsRUFBekIsRUFBNEM7UUFDMUMsT0FBTyxJQUFQO01BQ0Q7SUFDRixDQUpNLENBQVA7RUFLRCxDQU55QixDQUExQjs7RUFRQSxJQUFJLENBQUNnQixpQkFBTCxFQUF3QjtJQUN0QnpELEtBQUs7SUFDTCxPQUFPLEtBQVA7RUFDRCxDQUhELE1BR087SUFDTCxPQUFPLElBQVA7RUFDRDtBQUNGOztBQUVELFNBQVM0RCxXQUFULENBQXFCZCxDQUFyQixFQUF3QjtFQUN0QixNQUFNZSxXQUFXLEdBQUc5RSxRQUFRLENBQUNDLGFBQVQsQ0FDbEIsbUNBRGtCLEVBRWxCdUMsS0FGRjtFQUdBLE1BQU1vQyxNQUFNLEdBQUdHLElBQUksQ0FBQ0MsS0FBTCxDQUFXakIsQ0FBQyxDQUFDSSxNQUFGLENBQVNWLE9BQVQsQ0FBaUJGLEtBQTVCLENBQWY7RUFDQSxJQUFJMEIsTUFBSixFQUFZQyxTQUFaLEVBQXVCQyxTQUF2QixFQUFrQ0MsVUFBbEMsRUFBOENDLE9BQTlDOztFQUVBLFFBQVFwRSxLQUFSO0lBQ0UsS0FBSyxDQUFMO01BQ0VnRSxNQUFNLEdBQUcsSUFBSXBGLHVDQUFKLENBQVMsUUFBVCxFQUFtQitFLE1BQW5CLEVBQTJCRSxXQUEzQixDQUFUOztNQUVBLElBQUksQ0FBQ0wsY0FBYyxDQUFDUSxNQUFELENBQW5CLEVBQTZCO1FBQzNCaEUsS0FBSyxJQUFJLENBQVQ7UUFDQTtNQUNELENBSEQsTUFHTztRQUNMRixLQUFLLENBQUNvQyxJQUFOLENBQVc4QixNQUFYO1FBQ0F0RCxtQkFBbUIsQ0FBQ0YsYUFBRCxDQUFuQjtNQUNEOztNQUVEckIsUUFBUSxDQUFDSyxXQUFUO01BQ0E7O0lBQ0YsS0FBSyxDQUFMO01BQ0V5RSxTQUFTLEdBQUcsSUFBSXJGLHVDQUFKLENBQVMsV0FBVCxFQUFzQitFLE1BQXRCLEVBQThCRSxXQUE5QixDQUFaOztNQUVBLElBQUksQ0FBQ0wsY0FBYyxDQUFDUyxTQUFELENBQW5CLEVBQWdDO1FBQzlCakUsS0FBSyxJQUFJLENBQVQ7UUFDQTtNQUNELENBSEQsTUFHTztRQUNMRixLQUFLLENBQUNvQyxJQUFOLENBQVcrQixTQUFYO1FBQ0F2RCxtQkFBbUIsQ0FBQ0YsYUFBRCxDQUFuQjtNQUNEOztNQUVEckIsUUFBUSxDQUFDSyxXQUFUO01BQ0E7O0lBQ0YsS0FBSyxDQUFMO01BQ0UwRSxTQUFTLEdBQUcsSUFBSXRGLHVDQUFKLENBQVMsV0FBVCxFQUFzQitFLE1BQXRCLEVBQThCRSxXQUE5QixDQUFaOztNQUVBLElBQUksQ0FBQ0wsY0FBYyxDQUFDVSxTQUFELENBQW5CLEVBQWdDO1FBQzlCbEUsS0FBSyxJQUFJLENBQVQ7UUFDQTtNQUNELENBSEQsTUFHTztRQUNMRixLQUFLLENBQUNvQyxJQUFOLENBQVdnQyxTQUFYO1FBQ0F4RCxtQkFBbUIsQ0FBQ0YsYUFBRCxDQUFuQjtNQUNEOztNQUNEckIsUUFBUSxDQUFDSyxXQUFUO01BRUE7O0lBQ0YsS0FBSyxDQUFMO01BQ0UyRSxVQUFVLEdBQUcsSUFBSXZGLHVDQUFKLENBQVMsWUFBVCxFQUF1QitFLE1BQXZCLEVBQStCRSxXQUEvQixDQUFiOztNQUVBLElBQUksQ0FBQ0wsY0FBYyxDQUFDVyxVQUFELENBQW5CLEVBQWlDO1FBQy9CbkUsS0FBSyxJQUFJLENBQVQ7UUFDQTtNQUNELENBSEQsTUFHTztRQUNMRixLQUFLLENBQUNvQyxJQUFOLENBQVdpQyxVQUFYO1FBQ0F6RCxtQkFBbUIsQ0FBQ0YsYUFBRCxDQUFuQjtNQUNEOztNQUNEckIsUUFBUSxDQUFDSyxXQUFUO01BQ0E7O0lBQ0YsS0FBSyxDQUFMO01BQ0U0RSxPQUFPLEdBQUcsSUFBSXhGLHVDQUFKLENBQVMsU0FBVCxFQUFvQitFLE1BQXBCLEVBQTRCRSxXQUE1QixDQUFWOztNQUVBLElBQUksQ0FBQ0wsY0FBYyxDQUFDWSxPQUFELENBQW5CLEVBQThCO1FBQzVCcEUsS0FBSyxJQUFJLENBQVQ7UUFDQTtNQUNELENBSEQsTUFHTztRQUNMRixLQUFLLENBQUNvQyxJQUFOLENBQVdrQyxPQUFYO1FBQ0ExRCxtQkFBbUIsQ0FBQ0YsYUFBRCxDQUFuQjtNQUNEOztNQUNEOztJQUNGO01BQ0U7RUFoRUo7O0VBa0VBLElBQUlSLEtBQUssS0FBSyxDQUFkLEVBQWlCO0lBQ2ZYLFVBQVUsQ0FBQ2dGLEtBQVg7SUFDQW5FLGdCQUFnQjtJQUNoQjBCLGVBQWU7SUFDZi9DLHFEQUFRO0VBQ1Q7O0VBRURtQixLQUFLLElBQUksQ0FBVDtBQUNEOztBQUVEUSxhQUFhLENBQUM0QixPQUFkLENBQXVCRyxNQUFELElBQVk7RUFDaENBLE1BQU0sQ0FBQytCLGdCQUFQLENBQ0UsT0FERixFQUVHeEIsQ0FBRCxJQUFPO0lBQ0xjLFdBQVcsQ0FBQ2QsQ0FBRCxDQUFYO0VBQ0QsQ0FKSCxFQUtFO0lBQUV5QixJQUFJLEVBQUU7RUFBUixDQUxGO0FBT0QsQ0FSRDs7QUFVQSxTQUFTQyxhQUFULENBQXVCQyxXQUF2QixFQUFvQ0MsYUFBcEMsRUFBbUQ7RUFDakQsSUFBSUQsV0FBVyxDQUFDRSxZQUFaLE1BQThCRCxhQUFhLENBQUNDLFlBQWQsRUFBbEMsRUFBZ0U7SUFDOURsRixZQUFZLENBQUNtRixTQUFiOztJQUVBLElBQUlILFdBQVcsQ0FBQ0UsWUFBWixFQUFKLEVBQWdDO01BQzlCakYsTUFBTSxDQUFDRixXQUFQLEdBQXFCLGlCQUFyQjtJQUNELENBRkQsTUFFTztNQUNMRSxNQUFNLENBQUNGLFdBQVAsR0FBcUIsaUJBQXJCO0lBQ0Q7RUFDRjtBQUNGOztBQUVERyxVQUFVLENBQUMyRSxnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxNQUFNO0VBQ3pDN0UsWUFBWSxDQUFDNEUsS0FBYjtFQUNBUSxRQUFRLENBQUNDLE1BQVQ7QUFDRCxDQUhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDclRBO0FBTUE7QUFDQTtBQUNBO0FBRUEsTUFBTUksT0FBTyxHQUFHLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBaEI7QUFDQSxNQUFNQyxhQUFhLEdBQUcsRUFBdEI7QUFDQSxNQUFNVixXQUFXLEdBQUcsSUFBSVEsaURBQUosQ0FBYyxlQUFkLENBQXBCO0FBQ0EsTUFBTVAsYUFBYSxHQUFHLElBQUlPLGlEQUFKLENBQWMsYUFBZCxDQUF0QjtBQUVBLE1BQU1qQixNQUFNLEdBQUcsSUFBSXBGLHVDQUFKLENBQ2IsUUFEYSxFQUViLENBQUNtRyxxREFBWSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQWIsRUFBcUJBLHFEQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBakMsQ0FGYSxFQUdiRyxPQUFPLENBQUNFLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0JKLE9BQU8sQ0FBQ0ssTUFBbkMsQ0FBRCxDQUhNLENBQWY7QUFLQSxNQUFNdEIsU0FBUyxHQUFHLElBQUlyRix1Q0FBSixDQUNoQixXQURnQixFQUVoQixDQUFDbUcscURBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFiLEVBQXFCQSxxREFBWSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQWpDLENBRmdCLEVBR2hCRyxPQUFPLENBQUNFLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0JKLE9BQU8sQ0FBQ0ssTUFBbkMsQ0FBRCxDQUhTLENBQWxCO0FBS0EsTUFBTXJCLFNBQVMsR0FBRyxJQUFJdEYsdUNBQUosQ0FDaEIsV0FEZ0IsRUFFaEIsQ0FBQ21HLHFEQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBYixFQUFxQkEscURBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFqQyxDQUZnQixFQUdoQkcsT0FBTyxDQUFDRSxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCSixPQUFPLENBQUNLLE1BQW5DLENBQUQsQ0FIUyxDQUFsQjtBQUtBLE1BQU1wQixVQUFVLEdBQUcsSUFBSXZGLHVDQUFKLENBQ2pCLFlBRGlCLEVBRWpCLENBQUNtRyxxREFBWSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQWIsRUFBcUJBLHFEQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBakMsQ0FGaUIsRUFHakJHLE9BQU8sQ0FBQ0UsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQkosT0FBTyxDQUFDSyxNQUFuQyxDQUFELENBSFUsQ0FBbkI7QUFLQSxNQUFNbkIsT0FBTyxHQUFHLElBQUl4Rix1Q0FBSixDQUNkLFNBRGMsRUFFZCxDQUFDbUcscURBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFiLEVBQXFCQSxxREFBWSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQWpDLENBRmMsRUFHZEcsT0FBTyxDQUFDRSxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCSixPQUFPLENBQUNLLE1BQW5DLENBQUQsQ0FITyxDQUFoQjtBQUtBSixhQUFhLENBQUNqRCxJQUFkLENBQW1COEIsTUFBbkIsRUFBMkJDLFNBQTNCLEVBQXNDQyxTQUF0QyxFQUFpREMsVUFBakQsRUFBNkRDLE9BQTdEO0FBRUEsTUFBTW9CLE1BQU0sR0FBRyxJQUFJUiwyQ0FBSixDQUFXLFVBQVgsRUFBdUJOLGFBQXZCLENBQWY7QUFDQSxNQUFNZSxRQUFRLEdBQUcsSUFBSVQsMkNBQUosQ0FBVyxVQUFYLEVBQXVCUCxXQUF2QixDQUFqQjs7QUFFQSxTQUFTNUYsUUFBVCxHQUFvQjtFQUNsQixNQUFNNkcsWUFBWSxHQUFHM0csUUFBUSxDQUFDMEIsZ0JBQVQsQ0FBMEIsZUFBMUIsQ0FBckI7RUFFQVgsK0NBQUEsQ0FBZXVDLElBQUQsSUFBVTtJQUN0Qm9DLFdBQVcsQ0FBQ2tCLFNBQVosQ0FBc0J0RCxJQUF0QjtFQUNELENBRkQ7RUFJQThDLGFBQWEsQ0FBQy9DLE9BQWQsQ0FBdUJDLElBQUQsSUFBVTtJQUM5QnVELFdBQVcsQ0FBQ2xCLGFBQUQsRUFBZ0JyQyxJQUFoQixDQUFYO0VBQ0QsQ0FGRDtFQUlBcUQsWUFBWSxDQUFDdEQsT0FBYixDQUFzQkcsTUFBRCxJQUFZO0lBQy9CQSxNQUFNLENBQUMrQixnQkFBUCxDQUNFLE9BREYsRUFFR3hCLENBQUQsSUFBTztNQUNMMEIsbURBQWEsQ0FBQ0MsV0FBRCxFQUFjQyxhQUFkLENBQWI7TUFDQWMsTUFBTSxDQUFDSyxjQUFQLENBQXNCL0IsSUFBSSxDQUFDQyxLQUFMLENBQVdqQixDQUFDLENBQUNJLE1BQUYsQ0FBU1YsT0FBVCxDQUFpQkYsS0FBNUIsQ0FBdEI7TUFDQWtDLG1EQUFhLENBQUNDLFdBQUQsRUFBY0MsYUFBZCxDQUFiO01BQ0FlLFFBQVEsQ0FBQ0ksY0FBVDtNQUNBckIsbURBQWEsQ0FBQ0MsV0FBRCxFQUFjQyxhQUFkLENBQWI7TUFDQTlCLHlEQUFtQixDQUFDOEIsYUFBRCxFQUFnQjVCLENBQWhCLENBQW5CO01BQ0FNLHdEQUFrQixDQUFDcUIsV0FBRCxDQUFsQjtNQUNBRCxtREFBYSxDQUFDQyxXQUFELEVBQWNDLGFBQWQsQ0FBYjtJQUNELENBWEgsRUFZRTtNQUFFSCxJQUFJLEVBQUU7SUFBUixDQVpGO0VBY0QsQ0FmRDtBQWdCRCxFQUVEOzs7QUFFQSxTQUFTcUIsV0FBVCxDQUFxQkUsU0FBckIsRUFBZ0N6RCxJQUFoQyxFQUFzQztFQUNwQyxJQUFJO0lBQ0Z5RCxTQUFTLENBQUNILFNBQVYsQ0FBb0J0RCxJQUFwQjtFQUNELENBRkQsQ0FFRSxNQUFNO0lBQ04sSUFBSTtNQUNGLE1BQU0wRCxPQUFPLEdBQUcsSUFBSW5ILHVDQUFKLENBQ2R5RCxJQUFJLENBQUNaLElBRFMsRUFFZCxDQUFDc0QscURBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFiLEVBQXFCQSxxREFBWSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQWpDLENBRmMsRUFHZEcsT0FBTyxDQUFDRSxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCSixPQUFPLENBQUNLLE1BQW5DLENBQUQsQ0FITyxDQUFoQjtNQU1BTyxTQUFTLENBQUNILFNBQVYsQ0FBb0JJLE9BQXBCO0lBQ0QsQ0FSRCxDQVFFLE1BQU07TUFDTkgsV0FBVyxDQUFDRSxTQUFELEVBQVl6RCxJQUFaLENBQVg7SUFDRDtFQUNGO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RkQsTUFBTTRDLFNBQVMsR0FBRyxVQUFVeEQsSUFBVixFQUFnQjtFQUNoQyxLQUFLQSxJQUFMLEdBQVlBLElBQVo7RUFDQSxLQUFLNkIsU0FBTCxHQUFpQixFQUFqQjtFQUNBLEtBQUt4RCxLQUFMLEdBQWEsRUFBYjtFQUNBLEtBQUtDLGFBQUwsR0FBcUIsRUFBckI7RUFDQSxLQUFLRSxhQUFMLEdBQXFCLEVBQXJCO0VBQ0EsS0FBSzhDLGFBQUwsR0FBcUIsRUFBckI7RUFDQSxLQUFLUSxRQUFMLEdBQWdCLEVBQWhCOztFQUVBLEtBQUssSUFBSW5ELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLElBQUksQ0FBckIsRUFBd0JBLENBQUMsRUFBekIsRUFBNkI7SUFDM0IsS0FBSyxJQUFJNkIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSSxDQUFyQixFQUF3QkEsQ0FBQyxFQUF6QixFQUE2QjtNQUMzQixLQUFLaEMsYUFBTCxDQUFtQmlDLElBQW5CLENBQXdCLENBQUNELENBQUQsRUFBSTdCLENBQUosQ0FBeEI7SUFDRDtFQUNGOztFQUVELEtBQUt1RixTQUFMLEdBQWtCdEQsSUFBRCxJQUFVO0lBQ3pCLE1BQU0yRCxpQkFBaUIsR0FBRzNELElBQUksQ0FBQ0MsS0FBTCxDQUFXVyxJQUFYLENBQWlCWCxLQUFELElBQVc7TUFDbkQsT0FBTyxLQUFLdkMsYUFBTCxDQUFtQmtELElBQW5CLENBQXlCVSxNQUFELElBQVk7UUFDekMsSUFBSXJCLEtBQUssQ0FBQ0csUUFBTixPQUFxQmtCLE1BQU0sQ0FBQ2xCLFFBQVAsRUFBekIsRUFBNEM7VUFDMUMsT0FBTyxJQUFQO1FBQ0Q7TUFDRixDQUpNLENBQVA7SUFLRCxDQU55QixDQUExQjtJQVFBLE1BQU1nQixpQkFBaUIsR0FBR3BCLElBQUksQ0FBQ0MsS0FBTCxDQUFXb0IsS0FBWCxDQUFrQnBCLEtBQUQsSUFBVztNQUNwRCxPQUFPLEtBQUtyQyxhQUFMLENBQW1CZ0QsSUFBbkIsQ0FBeUJVLE1BQUQsSUFBWTtRQUN6QyxJQUFJckIsS0FBSyxDQUFDRyxRQUFOLE9BQXFCa0IsTUFBTSxDQUFDbEIsUUFBUCxFQUF6QixFQUE0QztVQUMxQyxPQUFPLElBQVA7UUFDRDtNQUNGLENBSk0sQ0FBUDtJQUtELENBTnlCLENBQTFCO0lBUUEsTUFBTXdELGNBQWMsR0FBRzVELElBQUksQ0FBQ0MsS0FBTCxDQUFXVyxJQUFYLENBQWlCWCxLQUFELElBQVc7TUFDaEQsT0FBTyxLQUFLdkMsYUFBTCxDQUFtQmtELElBQW5CLENBQXlCVSxNQUFELElBQVk7UUFDekMsSUFDRSxDQUFDckIsS0FBSyxDQUFDLENBQUQsQ0FBTixFQUFXQSxLQUFLLENBQUMsQ0FBRCxDQUFoQixFQUFxQkcsUUFBckIsT0FDRSxDQUFDa0IsTUFBTSxDQUFDLENBQUQsQ0FBTixHQUFZLENBQWIsRUFBZ0JBLE1BQU0sQ0FBQyxDQUFELENBQXRCLEVBQTJCbEIsUUFBM0IsRUFERixJQUVBLENBQUNILEtBQUssQ0FBQyxDQUFELENBQU4sRUFBV0EsS0FBSyxDQUFDLENBQUQsQ0FBaEIsRUFBcUJHLFFBQXJCLE9BQ0UsQ0FBQ2tCLE1BQU0sQ0FBQyxDQUFELENBQVAsRUFBWUEsTUFBTSxDQUFDLENBQUQsQ0FBTixHQUFZLENBQXhCLEVBQTJCbEIsUUFBM0IsRUFIRixJQUlBLENBQUNILEtBQUssQ0FBQyxDQUFELENBQU4sRUFBV0EsS0FBSyxDQUFDLENBQUQsQ0FBaEIsRUFBcUJHLFFBQXJCLE9BQ0UsQ0FBQ2tCLE1BQU0sQ0FBQyxDQUFELENBQU4sR0FBWSxDQUFiLEVBQWdCQSxNQUFNLENBQUMsQ0FBRCxDQUFOLEdBQVksQ0FBNUIsRUFBK0JsQixRQUEvQixFQUxGLElBTUEsQ0FBQ0gsS0FBSyxDQUFDLENBQUQsQ0FBTixFQUFXQSxLQUFLLENBQUMsQ0FBRCxDQUFoQixFQUFxQkcsUUFBckIsT0FDRSxDQUFDa0IsTUFBTSxDQUFDLENBQUQsQ0FBTixHQUFZLENBQWIsRUFBZ0JBLE1BQU0sQ0FBQyxDQUFELENBQXRCLEVBQTJCbEIsUUFBM0IsRUFQRixJQVFBLENBQUNILEtBQUssQ0FBQyxDQUFELENBQU4sRUFBV0EsS0FBSyxDQUFDLENBQUQsQ0FBaEIsRUFBcUJHLFFBQXJCLE9BQ0UsQ0FBQ2tCLE1BQU0sQ0FBQyxDQUFELENBQVAsRUFBWUEsTUFBTSxDQUFDLENBQUQsQ0FBTixHQUFZLENBQXhCLEVBQTJCbEIsUUFBM0IsRUFURixJQVVBLENBQUNILEtBQUssQ0FBQyxDQUFELENBQU4sRUFBV0EsS0FBSyxDQUFDLENBQUQsQ0FBaEIsRUFBcUJHLFFBQXJCLE9BQ0UsQ0FBQ2tCLE1BQU0sQ0FBQyxDQUFELENBQU4sR0FBWSxDQUFiLEVBQWdCQSxNQUFNLENBQUMsQ0FBRCxDQUFOLEdBQVksQ0FBNUIsRUFBK0JsQixRQUEvQixFQVpKLEVBYUU7VUFDQSxPQUFPLElBQVA7UUFDRDtNQUNGLENBakJNLENBQVA7SUFrQkQsQ0FuQnNCLENBQXZCOztJQXFCQSxJQUFJdUQsaUJBQUosRUFBdUI7TUFDckIsTUFBTSw0QkFBTjtJQUNELENBRkQsTUFFTyxJQUFJLENBQUN2QyxpQkFBTCxFQUF3QjtNQUM3QixNQUFNLG9DQUFOO0lBQ0QsQ0FGTSxNQUVBLElBQ0x3QyxjQUFjLElBQ2QsS0FBS3hFLElBQUwsQ0FBVWdCLFFBQVYsR0FBcUJ5RCxXQUFyQixNQUFzQyxhQUZqQyxFQUdMO01BQ0EsTUFBTSxnQkFBTjtJQUNELENBTE0sTUFLQTtNQUNMLEtBQUtwRyxLQUFMLENBQVdvQyxJQUFYLENBQWdCRyxJQUFoQjtNQUNBQSxJQUFJLENBQUNDLEtBQUwsQ0FBV0YsT0FBWCxDQUFvQitELEtBQUQsSUFBVztRQUM1QixLQUFLcEcsYUFBTCxDQUFtQm1DLElBQW5CLENBQXdCaUUsS0FBeEI7TUFDRCxDQUZEO0lBR0Q7RUFDRixDQXJERDs7RUF1REEsS0FBS0MsYUFBTCxHQUFzQnpDLE1BQUQsSUFBWTtJQUMvQixLQUFLWixhQUFMLENBQW1CYixJQUFuQixDQUF3QnlCLE1BQXhCO0lBRUEsTUFBTTBDLEtBQUssR0FBRyxLQUFLcEcsYUFBTCxDQUFtQnFHLFNBQW5CLENBQThCQyxPQUFELElBQWE7TUFDdEQsT0FBT3pDLElBQUksQ0FBQzBDLFNBQUwsQ0FBZUQsT0FBZixLQUEyQnpDLElBQUksQ0FBQzBDLFNBQUwsQ0FBZTdDLE1BQWYsQ0FBbEM7SUFDRCxDQUZhLENBQWQ7SUFHQSxLQUFLMUQsYUFBTCxDQUFtQndHLE1BQW5CLENBQTBCSixLQUExQixFQUFpQyxDQUFqQztJQUVBLE1BQU1LLFVBQVUsR0FBRyxLQUFLM0csYUFBTCxDQUFtQmtELElBQW5CLENBQXlCMEQsR0FBRCxJQUFTO01BQ2xELElBQUlBLEdBQUcsQ0FBQ2xFLFFBQUosT0FBbUJrQixNQUFNLENBQUNsQixRQUFQLEVBQXZCLEVBQTBDO1FBQ3hDLE9BQU8sSUFBUDtNQUNEO0lBQ0YsQ0FKa0IsQ0FBbkI7O0lBTUEsSUFBSWlFLFVBQUosRUFBZ0I7TUFDZCxNQUFNRSxNQUFNLEdBQUcsS0FBSzlHLEtBQUwsQ0FBVytHLElBQVgsQ0FBaUJ4RSxJQUFELElBQVU7UUFDdkMsT0FBT0EsSUFBSSxDQUFDQyxLQUFMLENBQVd1RSxJQUFYLENBQWlCdkUsS0FBRCxJQUFXO1VBQ2hDLE9BQU9BLEtBQUssQ0FBQ0csUUFBTixPQUFxQmtCLE1BQU0sQ0FBQ2xCLFFBQVAsRUFBNUI7UUFDRCxDQUZNLENBQVA7TUFHRCxDQUpjLENBQWY7TUFNQSxNQUFNNEQsS0FBSyxHQUFHTyxNQUFNLENBQUN0RSxLQUFQLENBQWFnRSxTQUFiLENBQXdCSyxHQUFELElBQVM7UUFDNUMsSUFBSUEsR0FBRyxDQUFDbEUsUUFBSixPQUFtQmtCLE1BQU0sQ0FBQ2xCLFFBQVAsRUFBdkIsRUFBMEM7VUFDeEMsT0FBTyxJQUFQO1FBQ0Q7TUFDRixDQUphLENBQWQ7TUFLQW1FLE1BQU0sQ0FBQ0UsR0FBUCxDQUFXVCxLQUFYO01BQ0EsS0FBSzlDLFFBQUwsQ0FBY3JCLElBQWQsQ0FBbUJ5QixNQUFuQjtNQUVBLE9BQU8sbUJBQVA7SUFDRCxDQWhCRCxNQWdCTztNQUNMLEtBQUtMLFNBQUwsQ0FBZXBCLElBQWYsQ0FBb0J5QixNQUFwQjtNQUVBLE9BQU8sZUFBUDtJQUNEO0VBQ0YsQ0FuQ0Q7O0VBcUNBLEtBQUtnQixZQUFMLEdBQW9CLE1BQU07SUFDeEIsTUFBTW9DLFFBQVEsR0FBRyxLQUFLakgsS0FBTCxDQUFXNEQsS0FBWCxDQUFrQnJCLElBQUQsSUFBVTtNQUMxQyxJQUFJQSxJQUFJLENBQUMyRSxNQUFMLEVBQUosRUFBbUI7UUFDakIsT0FBTyxJQUFQO01BQ0Q7SUFDRixDQUpnQixDQUFqQjs7SUFNQSxJQUFJRCxRQUFKLEVBQWM7TUFDWixPQUFPLElBQVA7SUFDRCxDQUZELE1BRU87TUFDTCxPQUFPLEtBQVA7SUFDRDtFQUNGLENBWkQ7QUFhRCxDQXhIRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBLE1BQU0vQixNQUFNLEdBQUcsVUFBVXZELElBQVYsRUFBZ0JxRSxTQUFoQixFQUEyQjtFQUN4QyxLQUFLckUsSUFBTCxHQUFZQSxJQUFJLENBQUN5RSxXQUFMLEVBQVo7RUFDQSxLQUFLSixTQUFMLEdBQWlCQSxTQUFqQjs7RUFFQSxLQUFLRCxjQUFMLEdBQXVCdkQsS0FBRCxJQUFXO0lBQy9CLElBQUksS0FBS2IsSUFBTCxLQUFjLFVBQWxCLEVBQThCO01BQzVCLE1BQU13RixZQUFZLEdBQUcsTUFBTTtRQUN6QixNQUFNQyxTQUFTLEdBQUcsQ0FBQ25DLFlBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFiLEVBQXFCQSxZQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBakMsQ0FBbEI7UUFFQSxNQUFNMkIsVUFBVSxHQUFHLEtBQUtaLFNBQUwsQ0FBZTdGLGFBQWYsQ0FBNkJnRCxJQUE3QixDQUFtQzBELEdBQUQsSUFBUztVQUM1RCxJQUFJQSxHQUFHLENBQUNsRSxRQUFKLE9BQW1CeUUsU0FBUyxDQUFDekUsUUFBVixFQUF2QixFQUE2QztZQUMzQyxPQUFPLElBQVA7VUFDRDtRQUNGLENBSmtCLENBQW5COztRQU1BLElBQUksQ0FBQ2lFLFVBQUwsRUFBaUI7VUFDZixLQUFLWixTQUFMLENBQWVNLGFBQWYsQ0FBNkJjLFNBQTdCO1FBQ0QsQ0FGRCxNQUVPO1VBQ0wsTUFBTUEsU0FBUyxHQUFHLENBQUNuQyxZQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBYixFQUFxQkEsWUFBWSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQWpDLENBQWxCO1VBQ0EsS0FBS2UsU0FBTCxDQUFlTSxhQUFmLENBQTZCYyxTQUE3QjtRQUNEO01BQ0YsQ0FmRDs7TUFnQkFELFlBQVk7SUFDYixDQWxCRCxNQWtCTztNQUNMLEtBQUtuQixTQUFMLENBQWVNLGFBQWYsQ0FBNkI5RCxLQUE3QjtJQUNEOztJQUNELGlCQUFVLEtBQUtiLElBQWY7RUFDRCxDQXZCRDtBQXdCRCxDQTVCRDs7QUE4QkEsU0FBU3NELFlBQVQsQ0FBc0JvQyxHQUF0QixFQUEyQkMsR0FBM0IsRUFBZ0M7RUFDOUJBLEdBQUcsR0FBR2hDLElBQUksQ0FBQ2lDLElBQUwsQ0FBVUQsR0FBVixDQUFOO0VBQ0FELEdBQUcsR0FBRy9CLElBQUksQ0FBQ0MsS0FBTCxDQUFXOEIsR0FBWCxDQUFOO0VBQ0EsT0FBTy9CLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsTUFBaUI2QixHQUFHLEdBQUdDLEdBQU4sR0FBWSxDQUE3QixJQUFrQ0EsR0FBN0MsQ0FBUDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkNELE1BQU14SSxJQUFJLEdBQUcsVUFBVTZDLElBQVYsRUFBZ0I2RixFQUFoQixFQUFvQnpELFdBQXBCLEVBQWlDO0VBQzVDLEtBQUtwQyxJQUFMLEdBQVlBLElBQVo7RUFDQSxLQUFLb0MsV0FBTCxHQUFtQkEsV0FBbkI7RUFDQSxLQUFLMEQsV0FBTCxHQUFtQixFQUFuQjtFQUNBLEtBQUtELEVBQUwsR0FBVUEsRUFBVjtFQUVBLE1BQU1FLEtBQUssR0FBRzNELFdBQVcsQ0FBQ3BCLFFBQVosR0FBdUJ5RCxXQUF2QixFQUFkOztFQUVBLFFBQVF6RSxJQUFJLENBQUNnQixRQUFMLEdBQWdCeUQsV0FBaEIsRUFBUjtJQUNFLEtBQUssUUFBTDtNQUNFLEtBQUtYLE1BQUwsR0FBYyxDQUFkOztNQUVBLElBQUlpQyxLQUFLLEtBQUssR0FBZCxFQUFtQjtRQUNqQixLQUFLbEYsS0FBTCxHQUFhLENBQUMsS0FBS2dGLEVBQU4sRUFBVSxDQUFDLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBZCxFQUFpQixLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFqQixDQUFWLENBQWI7TUFDRCxDQUZELE1BRU87UUFDTCxLQUFLaEYsS0FBTCxHQUFhLENBQUMsS0FBS2dGLEVBQU4sRUFBVSxDQUFDLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLENBQUQsRUFBYSxLQUFLQSxFQUFMLENBQVEsQ0FBUixJQUFhLENBQTFCLENBQVYsQ0FBYjtNQUNEOztNQUNEOztJQUNGLEtBQUssV0FBTDtNQUNFLEtBQUsvQixNQUFMLEdBQWMsQ0FBZDs7TUFDQSxJQUFJaUMsS0FBSyxLQUFLLEdBQWQsRUFBbUI7UUFDakIsS0FBS2xGLEtBQUwsR0FBYSxDQUNYLEtBQUtnRixFQURNLEVBRVgsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixJQUFhLENBQWQsRUFBaUIsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBakIsQ0FGVyxFQUdYLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUFkLEVBQWlCLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLENBQWpCLENBSFcsQ0FBYjtNQUtELENBTkQsTUFNTztRQUNMLEtBQUtoRixLQUFMLEdBQWEsQ0FDWCxLQUFLZ0YsRUFETSxFQUVYLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBRCxFQUFhLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBMUIsQ0FGVyxFQUdYLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBRCxFQUFhLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBMUIsQ0FIVyxDQUFiO01BS0Q7O01BRUQ7O0lBQ0YsS0FBSyxXQUFMO01BQ0UsS0FBSy9CLE1BQUwsR0FBYyxDQUFkOztNQUVBLElBQUlpQyxLQUFLLEtBQUssR0FBZCxFQUFtQjtRQUNqQixLQUFLbEYsS0FBTCxHQUFhLENBQ1gsS0FBS2dGLEVBRE0sRUFFWCxDQUFDLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBZCxFQUFpQixLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFqQixDQUZXLEVBR1gsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixJQUFhLENBQWQsRUFBaUIsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBakIsQ0FIVyxDQUFiO01BS0QsQ0FORCxNQU1PO1FBQ0wsS0FBS2hGLEtBQUwsR0FBYSxDQUNYLEtBQUtnRixFQURNLEVBRVgsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFELEVBQWEsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUExQixDQUZXLEVBR1gsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFELEVBQWEsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUExQixDQUhXLENBQWI7TUFLRDs7TUFFRDs7SUFDRixLQUFLLFlBQUw7TUFDRSxLQUFLL0IsTUFBTCxHQUFjLENBQWQ7O01BRUEsSUFBSWlDLEtBQUssS0FBSyxHQUFkLEVBQW1CO1FBQ2pCLEtBQUtsRixLQUFMLEdBQWEsQ0FDWCxLQUFLZ0YsRUFETSxFQUVYLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUFkLEVBQWlCLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLENBQWpCLENBRlcsRUFHWCxDQUFDLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBZCxFQUFpQixLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFqQixDQUhXLEVBSVgsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixJQUFhLENBQWQsRUFBaUIsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBakIsQ0FKVyxDQUFiO01BTUQsQ0FQRCxNQU9PO1FBQ0wsS0FBS2hGLEtBQUwsR0FBYSxDQUNYLEtBQUtnRixFQURNLEVBRVgsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFELEVBQWEsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUExQixDQUZXLEVBR1gsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFELEVBQWEsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUExQixDQUhXLEVBSVgsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFELEVBQWEsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUExQixDQUpXLENBQWI7TUFNRDs7TUFFRDs7SUFDRixLQUFLLFNBQUw7TUFDRSxLQUFLL0IsTUFBTCxHQUFjLENBQWQ7O01BRUEsSUFBSWlDLEtBQUssS0FBSyxHQUFkLEVBQW1CO1FBQ2pCLEtBQUtsRixLQUFMLEdBQWEsQ0FDWCxLQUFLZ0YsRUFETSxFQUVYLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUFkLEVBQWlCLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLENBQWpCLENBRlcsRUFHWCxDQUFDLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBZCxFQUFpQixLQUFLQSxFQUFMLENBQVEsQ0FBUixDQUFqQixDQUhXLEVBSVgsQ0FBQyxLQUFLQSxFQUFMLENBQVEsQ0FBUixJQUFhLENBQWQsRUFBaUIsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBakIsQ0FKVyxFQUtYLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsSUFBYSxDQUFkLEVBQWlCLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLENBQWpCLENBTFcsQ0FBYjtNQU9ELENBUkQsTUFRTztRQUNMLEtBQUtoRixLQUFMLEdBQWEsQ0FDWCxLQUFLZ0YsRUFETSxFQUVYLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBRCxFQUFhLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBMUIsQ0FGVyxFQUdYLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBRCxFQUFhLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBMUIsQ0FIVyxFQUlYLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBRCxFQUFhLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBMUIsQ0FKVyxFQUtYLENBQUMsS0FBS0EsRUFBTCxDQUFRLENBQVIsQ0FBRCxFQUFhLEtBQUtBLEVBQUwsQ0FBUSxDQUFSLElBQWEsQ0FBMUIsQ0FMVyxDQUFiO01BT0Q7O01BQ0Q7O0lBQ0Y7TUFDRSxPQUFPLHdCQUFQO0VBdkZKOztFQTBGQSxLQUFLUixHQUFMLEdBQVlXLEdBQUQsSUFBUztJQUNsQixLQUFLRixXQUFMLENBQWlCRSxHQUFqQixJQUF3QixHQUF4QjtJQUNBLEtBQUtsQyxNQUFMO0lBRUEsc0NBQStCa0MsR0FBL0I7RUFDRCxDQUxEOztFQU9BLEtBQUtULE1BQUwsR0FBYyxNQUFNO0lBQ2xCLE1BQU1VLFFBQVEsR0FBRyxLQUFLSCxXQUFMLENBQWlCSSxNQUFqQixDQUF5QkYsR0FBRCxJQUFTO01BQ2hELElBQUlBLEdBQUcsS0FBSyxHQUFaLEVBQWlCO1FBQ2YsT0FBTyxJQUFQO01BQ0Q7SUFDRixDQUpnQixDQUFqQjs7SUFNQSxJQUFJQyxRQUFRLElBQUksS0FBS25DLE1BQUwsSUFBZSxDQUEvQixFQUFrQztNQUNoQyxPQUFPLElBQVA7SUFDRCxDQUZELE1BRU87TUFDTCxPQUFPLEtBQVA7SUFDRDtFQUNGLENBWkQ7QUFhRCxDQXRIRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQzBHO0FBQ2pCO0FBQ087QUFDaEcsNENBQTRDLHlIQUF5QztBQUNyRiw0Q0FBNEMsbUhBQXNDO0FBQ2xGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0YseUNBQXlDLHNGQUErQjtBQUN4RSx5Q0FBeUMsc0ZBQStCO0FBQ3hFO0FBQ0Esc0RBQXNELHdCQUF3Qix5REFBeUQsR0FBRyxjQUFjLHlCQUF5Qix5REFBeUQsR0FBRyxVQUFVLGNBQWMscUJBQXFCLEdBQUcsWUFBWSw4QkFBOEIsaUJBQWlCLHVCQUF1QixpQkFBaUIscUNBQXFDLDJCQUEyQixtQkFBbUIsb0JBQW9CLFVBQVUsaUJBQWlCLGdCQUFnQixHQUFHLE1BQU0saUJBQWlCLHVCQUF1QixHQUFHLGVBQWUsa0JBQWtCLHFCQUFxQiwwQkFBMEIsd0JBQXdCLEdBQUcsaUJBQWlCLHVCQUF1QixtQkFBbUIsd0pBQXdKLHFCQUFxQixpQkFBaUIsR0FBRyx1QkFBdUIsK0JBQStCLEdBQUcsdUNBQXVDLGtCQUFrQixrQkFBa0IsMkJBQTJCLGNBQWMsc0JBQXNCLHVCQUF1QixHQUFHLHVDQUF1QyxpQkFBaUIsa0JBQWtCLGtCQUFrQiwyQ0FBMkMsd0NBQXdDLDJCQUEyQix5QkFBeUIsR0FBRywrQ0FBK0Msb0JBQW9CLHdDQUF3QyxHQUFHLG1EQUFtRCxnQkFBZ0IsaUJBQWlCLDhCQUE4QixHQUFHLGVBQWUsaUJBQWlCLGtCQUFrQix3QkFBd0IsR0FBRyxjQUFjLGtCQUFrQixjQUFjLHdCQUF3QixpQkFBaUIsR0FBRyxZQUFZLHVCQUF1QixHQUFHLFdBQVcsa0JBQWtCLHdCQUF3Qiw0QkFBNEIsR0FBRyxhQUFhLGlCQUFpQix1QkFBdUIsb0JBQW9CLEdBQUcsYUFBYSxpQkFBaUIsa0JBQWtCLGtCQUFrQixtQ0FBbUMsMkJBQTJCLEdBQUcseUJBQXlCLGtCQUFrQiwwQ0FBMEMsR0FBRyxvQkFBb0Isd0pBQXdKLHFCQUFxQixHQUFHLGdCQUFnQixtQkFBbUIsd0JBQXdCLEdBQUcsbUNBQW1DLHVCQUF1QixHQUFHLFlBQVksd0pBQXdKLDhCQUE4QixpQkFBaUIsa0JBQWtCLHVCQUF1QixvQkFBb0IsR0FBRyxZQUFZLDRCQUE0QixpQkFBaUIsb0JBQW9CLHdCQUF3QixzQkFBc0IsY0FBYyxpQkFBaUIsdUJBQXVCLEdBQUcsU0FBUyxnRkFBZ0YsWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxLQUFLLE9BQU8sYUFBYSxXQUFXLEtBQUssT0FBTyxNQUFNLE1BQU0sVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxNQUFNLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxNQUFNLFVBQVUsWUFBWSxPQUFPLE9BQU8sVUFBVSxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxLQUFLLE9BQU8sYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sTUFBTSxZQUFZLE9BQU8sS0FBSyxLQUFLLE9BQU8sYUFBYSxXQUFXLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksc0NBQXNDLHdCQUF3QixxQ0FBcUMsR0FBRyxjQUFjLHlCQUF5QixrQ0FBa0MsR0FBRyxVQUFVLGNBQWMscUJBQXFCLEdBQUcsWUFBWSw4QkFBOEIsaUJBQWlCLHVCQUF1QixpQkFBaUIscUNBQXFDLDJCQUEyQixtQkFBbUIsb0JBQW9CLFVBQVUsaUJBQWlCLGdCQUFnQixHQUFHLE1BQU0saUJBQWlCLHVCQUF1QixHQUFHLGVBQWUsa0JBQWtCLHFCQUFxQiwwQkFBMEIsd0JBQXdCLEdBQUcsaUJBQWlCLHVCQUF1QixtQkFBbUIsd0pBQXdKLHFCQUFxQixpQkFBaUIsR0FBRyx1QkFBdUIsK0JBQStCLEdBQUcsdUNBQXVDLGtCQUFrQixrQkFBa0IsMkJBQTJCLGNBQWMsc0JBQXNCLHVCQUF1QixHQUFHLHVDQUF1QyxpQkFBaUIsa0JBQWtCLGtCQUFrQiwyQ0FBMkMsd0NBQXdDLDJCQUEyQix5QkFBeUIsR0FBRywrQ0FBK0Msb0JBQW9CLHdDQUF3QyxHQUFHLG1EQUFtRCxnQkFBZ0IsaUJBQWlCLDhCQUE4QixHQUFHLGVBQWUsaUJBQWlCLGtCQUFrQix3QkFBd0IsR0FBRyxjQUFjLGtCQUFrQixjQUFjLHdCQUF3QixpQkFBaUIsR0FBRyxZQUFZLHVCQUF1QixHQUFHLFdBQVcsa0JBQWtCLHdCQUF3Qiw0QkFBNEIsR0FBRyxhQUFhLGlCQUFpQix1QkFBdUIsb0JBQW9CLEdBQUcsYUFBYSxpQkFBaUIsa0JBQWtCLGtCQUFrQixtQ0FBbUMsMkJBQTJCLEdBQUcseUJBQXlCLGtCQUFrQiwwQ0FBMEMsR0FBRyxvQkFBb0Isd0pBQXdKLHFCQUFxQixHQUFHLGdCQUFnQixtQkFBbUIsd0JBQXdCLEdBQUcsbUNBQW1DLHVCQUF1QixHQUFHLFlBQVksd0pBQXdKLDhCQUE4QixpQkFBaUIsa0JBQWtCLHVCQUF1QixvQkFBb0IsR0FBRyxZQUFZLDRCQUE0QixpQkFBaUIsb0JBQW9CLHdCQUF3QixzQkFBc0IsY0FBYyxpQkFBaUIsdUJBQXVCLEdBQUcscUJBQXFCO0FBQ3JsTztBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ1oxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFEQUFxRDtBQUNyRDs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRDs7QUFFQTtBQUNBLHFGQUFxRjtBQUNyRjs7QUFFQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLEtBQUs7QUFDTCxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIscUJBQXFCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ3JHYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0RBQW9EOztBQUVwRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM1QmE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSw2RkFBYyxHQUFHLDZGQUFjLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCLDZCQUE2QjtBQUNsRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDdENhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDVmE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJOztBQUVqRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBRUEsTUFBTWxHLFVBQVUsR0FBR04sUUFBUSxDQUFDQyxhQUFULENBQXVCLGNBQXZCLENBQW5CO0FBQ0FLLFVBQVUsQ0FBQ3VGLFNBQVgsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG5pbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5cbmNvbnN0IHBiU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyLWJvYXJkXCIpO1xuY29uc3QgY2JTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wdXRlci1ib2FyZFwiKTtcbmNvbnN0IHBsYWNlU2hpcFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYWNlU2hpcHNcIik7XG5jb25zdCBzaGlwTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5jb25zdCBtYWluZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLWRpYWxvZ1wiKTtcbnNoaXBOYW1lLmNsYXNzTmFtZSA9IFwic2hpcE5hbWVcIjtcbnNoaXBOYW1lLmlkID0gXCJzaGlwTmFtZVwiO1xuc2hpcE5hbWUudGV4dENvbnRlbnQgPSBgV2hlcmUgd2lsbCB5b3UgcGxhY2UgeW91ciBwYXRyb2wgYm9hdD9gO1xuY29uc3Qgd2lubmVyZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3aW5uZXItZGlhbG9nXCIpO1xuY29uc3Qgd2lubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3aW5uZXItaWRlbnRpdHlcIik7XG5jb25zdCByZXN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZXN0YXJ0XCIpO1xuY29uc3QgcGxheWVyTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5jb25zdCBjb21wdXRlck5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xucGxheWVyTmFtZS5jbGFzc05hbWUgPSBcInBsYXllck5hbWVcIjtcbmNvbXB1dGVyTmFtZS5jbGFzc05hbWUgPSBcInBsYXllck5hbWVcIjtcblxubGV0IHNoaXBzID0gW107XG5sZXQgb2NjdXBpZWRTcG90cyA9IFtdO1xubGV0IGNvdW50ID0gMDtcbmxldCBwbGF5YWJsZVNwb3RzID0gW107XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckdyaWQoKSB7XG4gIGNvbnN0IHBncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICBwZ3JpZENvbnRhaW5lci5jbGFzc05hbWUgPSBcInBiU2VjdGlvbi1pdGVtXCI7XG5cbiAgZm9yIChsZXQgeCA9IDA7IHggPD0gOTk7IHgrKykge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTmFtZSA9IFwicGItZ3JpZC1pdGVtXCI7XG4gICAgcGdyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgfVxuICBwbGF5ZXJOYW1lLnRleHRDb250ZW50ID0gXCJQbGF5ZXJcIjtcbiAgcGJTZWN0aW9uLmFwcGVuZENoaWxkKHBncmlkQ29udGFpbmVyKTtcblxuICBwYlNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyTmFtZSk7XG4gIGlkR3JpZHMoXCIucGItZ3JpZC1pdGVtXCIpO1xuICBjb25zdCBwbGF5ZXJTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wYi1ncmlkLWl0ZW1cIik7XG4gIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcyk7XG59XG5mdW5jdGlvbiBvcmllbnRhdGlvblRvZ2dsZSgpIHtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICBjb25zdCBmaWVsZHNldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKTtcbiAgY29uc3QgbGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxlZ2VuZFwiKTtcbiAgbGVnZW5kLnRleHRDb250ZW50ID0gXCJPcmllbnRhdGlvblwiO1xuICBjb25zdCB0b2dnbGUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgdG9nZ2xlMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRvZ2dsZTEuY2xhc3NOYW1lID0gXCJ0b2dnbGVcIjtcbiAgdG9nZ2xlMi5jbGFzc05hbWUgPSBcInRvZ2dsZVwiO1xuICBjb25zdCB2VG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBjb25zdCBoVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBjb25zdCBsYWJlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gIGNvbnN0IGxhYmVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgbGFiZWwxLmZvciA9IFwiVlwiO1xuICBsYWJlbDIuZm9yID0gXCJIXCI7XG4gIGxhYmVsMS50ZXh0Q29udGVudCA9IFwiVmVydGljYWw6IFwiO1xuICBsYWJlbDIudGV4dENvbnRlbnQgPSBcIkhvcml6b250YWw6IFwiO1xuICB2VG9nZ2xlLnR5cGUgPSBcInJhZGlvXCI7XG4gIHZUb2dnbGUuaWQgPSBcIlZcIjtcbiAgdlRvZ2dsZS52YWx1ZSA9IFwiVlwiO1xuICB2VG9nZ2xlLmNoZWNrZWQgPSB0cnVlO1xuICB2VG9nZ2xlLm5hbWUgPSBcIm9yaWVudGF0aW9uXCI7XG4gIGhUb2dnbGUudHlwZSA9IFwicmFkaW9cIjtcbiAgaFRvZ2dsZS5pZCA9IFwiSFwiO1xuICBoVG9nZ2xlLnZhbHVlID0gXCJIXCI7XG4gIGhUb2dnbGUubmFtZSA9IFwib3JpZW50YXRpb25cIjtcblxuICB0b2dnbGUxLmFwcGVuZENoaWxkKGxhYmVsMSk7XG4gIHRvZ2dsZTEuYXBwZW5kQ2hpbGQodlRvZ2dsZSk7XG4gIHRvZ2dsZTIuYXBwZW5kQ2hpbGQobGFiZWwyKTtcbiAgdG9nZ2xlMi5hcHBlbmRDaGlsZChoVG9nZ2xlKTtcbiAgZmllbGRzZXQuYXBwZW5kQ2hpbGQobGVnZW5kKTtcbiAgZmllbGRzZXQuYXBwZW5kQ2hpbGQodG9nZ2xlMSk7XG4gIGZpZWxkc2V0LmFwcGVuZENoaWxkKHRvZ2dsZTIpO1xuICBmb3JtLmFwcGVuZENoaWxkKGZpZWxkc2V0KTtcblxuICBwbGFjZVNoaXBTZWN0aW9uLmFwcGVuZENoaWxkKGZvcm0pO1xuICBwbGFjZVNoaXBTZWN0aW9uLmFwcGVuZENoaWxkKHNoaXBOYW1lKTtcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwR3JpZCgpIHtcbiAgY29uc3QgcGxTaGlwQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICBwbFNoaXBDb250YWluZXIuY2xhc3NOYW1lID0gXCJwYlNlY3Rpb24taXRlbVwiO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk5OyB4KyspIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc05hbWUgPSBcInBzLWdyaWQtaXRlbVwiO1xuICAgIHBsU2hpcENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG4gIG9yaWVudGF0aW9uVG9nZ2xlKCk7XG4gIHBsYWNlU2hpcFNlY3Rpb24uYXBwZW5kQ2hpbGQocGxTaGlwQ29udGFpbmVyKTtcbiAgaWRHcmlkcyhcIi5wcy1ncmlkLWl0ZW1cIik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVuZW15R3JpZCgpIHtcbiAgY29uc3QgY2dyaWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjZ3JpZENvbnRhaW5lci5jbGFzc05hbWUgPSBcImNiU2VjdGlvbi1pdGVtXCI7XG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk5OyB4KyspIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc05hbWUgPSBgY2ItZ3JpZC1pdGVtYDtcblxuICAgIGNncmlkQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cbiAgY29tcHV0ZXJOYW1lLnRleHRDb250ZW50ID0gXCJDb21wdXRlclwiO1xuICBjYlNlY3Rpb24uYXBwZW5kQ2hpbGQoY2dyaWRDb250YWluZXIpO1xuICBjYlNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJOYW1lKTtcbiAgaWRHcmlkcyhcIi5jYi1ncmlkLWl0ZW1cIik7XG59XG5cbmZ1bmN0aW9uIGlkR3JpZHMoc2VsZWN0b3IpIHtcbiAgY29uc3QgZ3JpZGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIGxldCBteUFyciA9IFtdO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IDk7IHkrKykge1xuICAgICAgbXlBcnIucHVzaChbeSwgeF0pO1xuICAgICAgcGxheWFibGVTcG90cy5wdXNoKFt5LCB4XSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDA7IHgrKykge1xuICAgIGdyaWRpdGVtc1t4XS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkXCIsIGBbJHtteUFyclt4XX1dYCk7XG4gIH1cbn1cbnBsYWNlU2hpcEdyaWQoKTtcbmNvbnN0IHBsYXllclNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBzLWdyaWQtaXRlbVwiKTtcblxuZnVuY3Rpb24gcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKSB7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmNvb3JkLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBvY2N1cGllZFNwb3RzLnB1c2goYFske2Nvb3JkfV1gKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcGxheWVyU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBvY2N1cGllZFNwb3RzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmQudG9TdHJpbmcoKSkge1xuICAgICAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmV5XCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwbGF5ZXJBdHRhY2tEaXNwbGF5KG9iaiwgZSkge1xuICBjb25zdCBhdHRhY2tlZFNwb3RzID0gb2JqLmF0dGFja2VkU3BvdHM7XG4gIGNvbnN0IG9jY3VwaWVkU3BvdHMgPSBvYmoub2NjdXBpZWRTcG90cztcblxuICBjb25zdCBjb29yZENoZWNrMSA9IGF0dGFja2VkU3BvdHMuc29tZSgoY29vcmQpID0+IHtcbiAgICByZXR1cm4gZS50YXJnZXQuZGF0YXNldC5jb29yZC50b1N0cmluZygpID09PSBgWyR7Y29vcmQudG9TdHJpbmcoKX1dYDtcbiAgfSk7XG4gIGNvbnN0IGNvb3JkQ2hlY2syID0gb2NjdXBpZWRTcG90cy5zb21lKChjb29yZCkgPT4ge1xuICAgIHJldHVybiBlLnRhcmdldC5kYXRhc2V0LmNvb3JkLnRvU3RyaW5nKCkgPT09IGBbJHtjb29yZC50b1N0cmluZygpfV1gO1xuICB9KTtcblxuICBpZiAoY29vcmRDaGVjazEgJiYgY29vcmRDaGVjazIpIHtcbiAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNEOTIxMjFcIjtcbiAgfSBlbHNlIGlmIChjb29yZENoZWNrMSAmJiAhY29vcmRDaGVjazIpIHtcbiAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0c2t5Ymx1ZVwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuZW15QXR0YWNrRGlzcGxheShvYmopIHtcbiAgY29uc3QgbWlzc2VkSGl0cyA9IG9iai5taXNzZWRIaXQ7XG4gIGNvbnN0IGhpdFNwb3RzID0gb2JqLmhpdFNwb3RzO1xuICBjb25zdCBwbGF5ZXJTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wYi1ncmlkLWl0ZW1cIik7XG5cbiAgcGxheWVyU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBtaXNzZWRIaXRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gYFske2Nvb3JkLnRvU3RyaW5nKCl9XWApIHtcbiAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRza3libHVlXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHBsYXllclNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgaGl0U3BvdHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGlmIChzcXVhcmUuZGF0YXNldC5jb29yZC50b1N0cmluZygpID09PSBgWyR7Y29vcmQudG9TdHJpbmcoKX1dYCkge1xuICAgICAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjRDkyMTIxXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUNvb3JkcyhzaGlwKSB7XG4gIGNvbnN0IHBsYXlhYmxlU3BvdENoZWNrID0gc2hpcC5jb29yZC5ldmVyeSgoY29vcmQpID0+IHtcbiAgICByZXR1cm4gcGxheWFibGVTcG90cy5zb21lKChjb29yZHMpID0+IHtcbiAgICAgIGlmIChjb29yZC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgaWYgKCFwbGF5YWJsZVNwb3RDaGVjaykge1xuICAgIGNvdW50LS07XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXBzKGUpIHtcbiAgY29uc3Qgb3JpZW50YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICdpbnB1dFtuYW1lPVwib3JpZW50YXRpb25cIl06Y2hlY2tlZCdcbiAgKS52YWx1ZTtcbiAgY29uc3QgY29vcmRzID0gSlNPTi5wYXJzZShlLnRhcmdldC5kYXRhc2V0LmNvb3JkKTtcbiAgbGV0IHBhdHJvbCwgc3VibWFyaW5lLCBkZXN0cm95ZXIsIGJhdHRsZXNoaXAsIGNhcnJpZXI7XG5cbiAgc3dpdGNoIChjb3VudCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHBhdHJvbCA9IG5ldyBTaGlwKFwicGF0cm9sXCIsIGNvb3Jkcywgb3JpZW50YXRpb24pO1xuXG4gICAgICBpZiAoIXZhbGlkYXRlQ29vcmRzKHBhdHJvbCkpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcHMucHVzaChwYXRyb2wpO1xuICAgICAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpO1xuICAgICAgfVxuXG4gICAgICBzaGlwTmFtZS50ZXh0Q29udGVudCA9IGBXaGVyZSB3aWxsIHlvdSBwbGFjZSB5b3VyIHN1Ym1hcmluZT9gO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOlxuICAgICAgc3VibWFyaW5lID0gbmV3IFNoaXAoXCJzdWJtYXJpbmVcIiwgY29vcmRzLCBvcmllbnRhdGlvbik7XG5cbiAgICAgIGlmICghdmFsaWRhdGVDb29yZHMoc3VibWFyaW5lKSkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGlwcy5wdXNoKHN1Ym1hcmluZSk7XG4gICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcyk7XG4gICAgICB9XG5cbiAgICAgIHNoaXBOYW1lLnRleHRDb250ZW50ID0gYFdoZXJlIHdpbGwgeW91IHBsYWNlIHlvdXIgZGVzdHJveWVyP2A7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBkZXN0cm95ZXIgPSBuZXcgU2hpcChcImRlc3Ryb3llclwiLCBjb29yZHMsIG9yaWVudGF0aW9uKTtcblxuICAgICAgaWYgKCF2YWxpZGF0ZUNvb3JkcyhkZXN0cm95ZXIpKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBzLnB1c2goZGVzdHJveWVyKTtcbiAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKTtcbiAgICAgIH1cbiAgICAgIHNoaXBOYW1lLnRleHRDb250ZW50ID0gYFdoZXJlIHdpbGwgeW91IHBsYWNlIHlvdXIgYmF0dGxlc2hpcD9gO1xuXG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6XG4gICAgICBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXCJiYXR0bGVzaGlwXCIsIGNvb3Jkcywgb3JpZW50YXRpb24pO1xuXG4gICAgICBpZiAoIXZhbGlkYXRlQ29vcmRzKGJhdHRsZXNoaXApKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBzLnB1c2goYmF0dGxlc2hpcCk7XG4gICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcyk7XG4gICAgICB9XG4gICAgICBzaGlwTmFtZS50ZXh0Q29udGVudCA9IGBXaGVyZSB3aWxsIHlvdSBwbGFjZSB5b3VyIGNhcnJpZXI/YDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIGNhcnJpZXIgPSBuZXcgU2hpcChcImNhcnJpZXJcIiwgY29vcmRzLCBvcmllbnRhdGlvbik7XG5cbiAgICAgIGlmICghdmFsaWRhdGVDb29yZHMoY2FycmllcikpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcHMucHVzaChjYXJyaWVyKTtcbiAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAoY291bnQgPT09IDQpIHtcbiAgICBtYWluZGlhbG9nLmNsb3NlKCk7XG4gICAgY3JlYXRlUGxheWVyR3JpZCgpO1xuICAgIGNyZWF0ZUVuZW15R3JpZCgpO1xuICAgIGdhbWVMb29wKCk7XG4gIH1cblxuICBjb3VudCArPSAxO1xufVxuXG5wbGF5ZXJTcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNsaWNrXCIsXG4gICAgKGUpID0+IHtcbiAgICAgIGNyZWF0ZVNoaXBzKGUpO1xuICAgIH0sXG4gICAgeyBvbmNlOiB0cnVlIH1cbiAgKTtcbn0pO1xuXG5mdW5jdGlvbiB3aW5uZXJDaGVja2VyKHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkKSB7XG4gIGlmIChwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSB8fCBjb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgd2lubmVyZGlhbG9nLnNob3dNb2RhbCgpO1xuXG4gICAgaWYgKHBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICB3aW5uZXIudGV4dENvbnRlbnQgPSBcIkNvbXB1dGVyIFdpbnMgIVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5uZXIudGV4dENvbnRlbnQgPSBcIkh1bWFuaXR5IFdpbnMgIVwiO1xuICAgIH1cbiAgfVxufVxuXG5yZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHdpbm5lcmRpYWxvZy5jbG9zZSgpO1xuICBsb2NhdGlvbi5yZWxvYWQoKTtcbn0pO1xuXG5leHBvcnQge1xuICBzaGlwcyxcbiAgcGxheWVyQXR0YWNrRGlzcGxheSxcbiAgZW5lbXlBdHRhY2tEaXNwbGF5LFxuICBwbGFjZVNoaXBHcmlkLFxuICB3aW5uZXJDaGVja2VyLFxufTtcbiIsImltcG9ydCB7XG4gIHNoaXBzLFxuICBwbGF5ZXJBdHRhY2tEaXNwbGF5LFxuICBlbmVteUF0dGFja0Rpc3BsYXksXG4gIHdpbm5lckNoZWNrZXIsXG59IGZyb20gXCIuL0RPTVwiO1xuaW1wb3J0IHsgZ2V0UmFuZG9tSW50LCBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3Qgb3B0aW9ucyA9IFtcIlZcIiwgXCJIXCJdO1xuY29uc3QgY29tcHV0ZXJTaGlwcyA9IFtdO1xuY29uc3QgcGxheWVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKFwiY29tcHV0ZXJib2FyZFwiKTtcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKFwicGxheWVyYm9hcmRcIik7XG5cbmNvbnN0IHBhdHJvbCA9IG5ldyBTaGlwKFxuICBcInBhdHJvbFwiLFxuICBbZ2V0UmFuZG9tSW50KDAsIDkpLCBnZXRSYW5kb21JbnQoMCwgOSldLFxuICBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKV1cbik7XG5jb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcChcbiAgXCJzdWJtYXJpbmVcIixcbiAgW2dldFJhbmRvbUludCgwLCA5KSwgZ2V0UmFuZG9tSW50KDAsIDkpXSxcbiAgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCldXG4pO1xuY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoXG4gIFwiZGVzdHJveWVyXCIsXG4gIFtnZXRSYW5kb21JbnQoMCwgOSksIGdldFJhbmRvbUludCgwLCA5KV0sXG4gIG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5sZW5ndGgpXVxuKTtcbmNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcChcbiAgXCJiYXR0bGVzaGlwXCIsXG4gIFtnZXRSYW5kb21JbnQoMCwgOSksIGdldFJhbmRvbUludCgwLCA5KV0sXG4gIG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5sZW5ndGgpXVxuKTtcbmNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcChcbiAgXCJjYXJyaWVyXCIsXG4gIFtnZXRSYW5kb21JbnQoMCwgOSksIGdldFJhbmRvbUludCgwLCA5KV0sXG4gIG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5sZW5ndGgpXVxuKTtcbmNvbXB1dGVyU2hpcHMucHVzaChwYXRyb2wsIHN1Ym1hcmluZSwgZGVzdHJveWVyLCBiYXR0bGVzaGlwLCBjYXJyaWVyKTtcblxuY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihcIlBsYXllciAxXCIsIGNvbXB1dGVyQm9hcmQpO1xuY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIiwgcGxheWVyQm9hcmQpO1xuXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgY29uc3QgZW5lbXlTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYi1ncmlkLWl0ZW1cIik7XG5cbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcChzaGlwKTtcbiAgfSk7XG5cbiAgY29tcHV0ZXJTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgcmNQbGFjZVNoaXAoY29tcHV0ZXJCb2FyZCwgc2hpcCk7XG4gIH0pO1xuXG4gIGVuZW15U3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiY2xpY2tcIixcbiAgICAgIChlKSA9PiB7XG4gICAgICAgIHdpbm5lckNoZWNrZXIocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQpO1xuICAgICAgICBwbGF5ZXIuYXR0YWNrT3Bwb25lbnQoSlNPTi5wYXJzZShlLnRhcmdldC5kYXRhc2V0LmNvb3JkKSk7XG4gICAgICAgIHdpbm5lckNoZWNrZXIocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQpO1xuICAgICAgICBjb21wdXRlci5hdHRhY2tPcHBvbmVudCgpO1xuICAgICAgICB3aW5uZXJDaGVja2VyKHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkKTtcbiAgICAgICAgcGxheWVyQXR0YWNrRGlzcGxheShjb21wdXRlckJvYXJkLCBlKTtcbiAgICAgICAgZW5lbXlBdHRhY2tEaXNwbGF5KHBsYXllckJvYXJkKTtcbiAgICAgICAgd2lubmVyQ2hlY2tlcihwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZCk7XG4gICAgICB9LFxuICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICApO1xuICB9KTtcbn1cblxuLy8gcmNQbGFjZVNoaXAgcmVjdXJzaXZlbHkgdHJpZXMgdG8gZmluZCBhIHZhbGlkIHNwb3QgdG8gcGxhY2UgdGhlIHNoaXBzXG5cbmZ1bmN0aW9uIHJjUGxhY2VTaGlwKGdhbWVib2FyZCwgc2hpcCkge1xuICB0cnkge1xuICAgIGdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcCk7XG4gIH0gY2F0Y2gge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAoXG4gICAgICAgIHNoaXAubmFtZSxcbiAgICAgICAgW2dldFJhbmRvbUludCgwLCA5KSwgZ2V0UmFuZG9tSW50KDAsIDkpXSxcbiAgICAgICAgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCldXG4gICAgICApO1xuXG4gICAgICBnYW1lYm9hcmQucGxhY2VTaGlwKG5ld1NoaXApO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmNQbGFjZVNoaXAoZ2FtZWJvYXJkLCBzaGlwKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgZ2FtZUxvb3AgfTtcbiIsImNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMubWlzc2VkSGl0ID0gW107XG4gIHRoaXMuc2hpcHMgPSBbXTtcbiAgdGhpcy5vY2N1cGllZFNwb3RzID0gW107XG4gIHRoaXMucGxheWFibGVTcG90cyA9IFtdO1xuICB0aGlzLmF0dGFja2VkU3BvdHMgPSBbXTtcbiAgdGhpcy5oaXRTcG90cyA9IFtdO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDk7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IDk7IHkrKykge1xuICAgICAgdGhpcy5wbGF5YWJsZVNwb3RzLnB1c2goW3ksIHhdKTtcbiAgICB9XG4gIH1cblxuICB0aGlzLnBsYWNlU2hpcCA9IChzaGlwKSA9PiB7XG4gICAgY29uc3Qgb2NjdXBpZWRTcG90Q2hlY2sgPSBzaGlwLmNvb3JkLnNvbWUoKGNvb3JkKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5vY2N1cGllZFNwb3RzLnNvbWUoKGNvb3JkcykgPT4ge1xuICAgICAgICBpZiAoY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwbGF5YWJsZVNwb3RDaGVjayA9IHNoaXAuY29vcmQuZXZlcnkoKGNvb3JkKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5wbGF5YWJsZVNwb3RzLnNvbWUoKGNvb3JkcykgPT4ge1xuICAgICAgICBpZiAoY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm94aW1pdHlDaGVjayA9IHNoaXAuY29vcmQuc29tZSgoY29vcmQpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm9jY3VwaWVkU3BvdHMuc29tZSgoY29vcmRzKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBbY29vcmRbMF0sIGNvb3JkWzFdXS50b1N0cmluZygpID09PVxuICAgICAgICAgICAgW2Nvb3Jkc1swXSArIDEsIGNvb3Jkc1sxXV0udG9TdHJpbmcoKSB8fFxuICAgICAgICAgIFtjb29yZFswXSwgY29vcmRbMV1dLnRvU3RyaW5nKCkgPT09XG4gICAgICAgICAgICBbY29vcmRzWzBdLCBjb29yZHNbMV0gKyAxXS50b1N0cmluZygpIHx8XG4gICAgICAgICAgW2Nvb3JkWzBdLCBjb29yZFsxXV0udG9TdHJpbmcoKSA9PT1cbiAgICAgICAgICAgIFtjb29yZHNbMF0gKyAxLCBjb29yZHNbMV0gKyAxXS50b1N0cmluZygpIHx8XG4gICAgICAgICAgW2Nvb3JkWzBdLCBjb29yZFsxXV0udG9TdHJpbmcoKSA9PT1cbiAgICAgICAgICAgIFtjb29yZHNbMF0gLSAxLCBjb29yZHNbMV1dLnRvU3RyaW5nKCkgfHxcbiAgICAgICAgICBbY29vcmRbMF0sIGNvb3JkWzFdXS50b1N0cmluZygpID09PVxuICAgICAgICAgICAgW2Nvb3Jkc1swXSwgY29vcmRzWzFdIC0gMV0udG9TdHJpbmcoKSB8fFxuICAgICAgICAgIFtjb29yZFswXSwgY29vcmRbMV1dLnRvU3RyaW5nKCkgPT09XG4gICAgICAgICAgICBbY29vcmRzWzBdIC0gMSwgY29vcmRzWzFdIC0gMV0udG9TdHJpbmcoKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAob2NjdXBpZWRTcG90Q2hlY2spIHtcbiAgICAgIHRocm93IFwiU2hpcCBjb29yZGluYXRlcyBhcmUgdGFrZW5cIjtcbiAgICB9IGVsc2UgaWYgKCFwbGF5YWJsZVNwb3RDaGVjaykge1xuICAgICAgdGhyb3cgXCJTaGlwIGNvb3JkaW5hdGVzIGFyZSBvdXQgb2YgYm91bmRzXCI7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHByb3hpbWl0eUNoZWNrICYmXG4gICAgICB0aGlzLm5hbWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpID09IFwiUExBWUVSQk9BUkRcIlxuICAgICkge1xuICAgICAgdGhyb3cgXCJTaGlwIHRvbyBjbG9zZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgICBzaGlwLmNvb3JkLmZvckVhY2goKHBvaW50KSA9PiB7XG4gICAgICAgIHRoaXMub2NjdXBpZWRTcG90cy5wdXNoKHBvaW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLnJlY2VpdmVBdHRhY2sgPSAoY29vcmRzKSA9PiB7XG4gICAgdGhpcy5hdHRhY2tlZFNwb3RzLnB1c2goY29vcmRzKTtcblxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wbGF5YWJsZVNwb3RzLmZpbmRJbmRleCgoZWxlbWVudCkgPT4ge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpID09IEpTT04uc3RyaW5naWZ5KGNvb3Jkcyk7XG4gICAgfSk7XG4gICAgdGhpcy5wbGF5YWJsZVNwb3RzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICBjb25zdCBjb29yZENoZWNrID0gdGhpcy5vY2N1cGllZFNwb3RzLnNvbWUoKHZhbCkgPT4ge1xuICAgICAgaWYgKHZhbC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChjb29yZENoZWNrKSB7XG4gICAgICBjb25zdCBteVNoaXAgPSB0aGlzLnNoaXBzLmZpbmQoKHNoaXApID0+IHtcbiAgICAgICAgcmV0dXJuIHNoaXAuY29vcmQuZmluZCgoY29vcmQpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGluZGV4ID0gbXlTaGlwLmNvb3JkLmZpbmRJbmRleCgodmFsKSA9PiB7XG4gICAgICAgIGlmICh2YWwudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBteVNoaXAuaGl0KGluZGV4KTtcbiAgICAgIHRoaXMuaGl0U3BvdHMucHVzaChjb29yZHMpO1xuXG4gICAgICByZXR1cm4gXCJBdHRhY2sgaGl0IGEgc2hpcFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pc3NlZEhpdC5wdXNoKGNvb3Jkcyk7XG5cbiAgICAgIHJldHVybiBcIkF0dGFjayBtaXNzZWRcIjtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5hbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgZGVjaXNpb24gPSB0aGlzLnNoaXBzLmV2ZXJ5KChzaGlwKSA9PiB7XG4gICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChkZWNpc2lvbikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWlubmVyLWRlY2xhcmF0aW9ucyAqL1xuY29uc3QgUGxheWVyID0gZnVuY3Rpb24gKG5hbWUsIGdhbWVib2FyZCkge1xuICB0aGlzLm5hbWUgPSBuYW1lLnRvVXBwZXJDYXNlKCk7XG4gIHRoaXMuZ2FtZWJvYXJkID0gZ2FtZWJvYXJkO1xuXG4gIHRoaXMuYXR0YWNrT3Bwb25lbnQgPSAoY29vcmQpID0+IHtcbiAgICBpZiAodGhpcy5uYW1lID09PSBcIkNPTVBVVEVSXCIpIHtcbiAgICAgIGNvbnN0IGNvb3JkQ2hlY2tlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZENvb3JkID0gW2dldFJhbmRvbUludCgwLCA5KSwgZ2V0UmFuZG9tSW50KDAsIDkpXTtcblxuICAgICAgICBjb25zdCBjb29yZENoZWNrID0gdGhpcy5nYW1lYm9hcmQucGxheWFibGVTcG90cy5zb21lKCh2YWwpID0+IHtcbiAgICAgICAgICBpZiAodmFsLnRvU3RyaW5nKCkgPT09IHJhbmRDb29yZC50b1N0cmluZygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY29vcmRDaGVjaykge1xuICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmFuZENvb3JkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCByYW5kQ29vcmQgPSBbZ2V0UmFuZG9tSW50KDAsIDkpLCBnZXRSYW5kb21JbnQoMCwgOSldO1xuICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmFuZENvb3JkKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvb3JkQ2hlY2tlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkKTtcbiAgICB9XG4gICAgcmV0dXJuIGAke3RoaXMubmFtZX0gYXR0YWNrZWRgO1xuICB9O1xufTtcblxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1heCwgbWluKSB7XG4gIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xufVxuXG5leHBvcnQgeyBnZXRSYW5kb21JbnQsIFBsYXllciB9O1xuIiwiY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChuYW1lLCBzQywgb3JpZW50YXRpb24pIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICB0aGlzLmhpdExvY2F0aW9uID0gW107XG4gIHRoaXMuc0MgPSBzQztcblxuICBjb25zdCBvclN0ciA9IG9yaWVudGF0aW9uLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKTtcblxuICBzd2l0Y2ggKG5hbWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgY2FzZSBcIlBBVFJPTFwiOlxuICAgICAgdGhpcy5sZW5ndGggPSAyO1xuXG4gICAgICBpZiAob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQywgW3RoaXMuc0NbMF0gKyAxLCB0aGlzLnNDWzFdXV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMV1dO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIlNVQk1BUklORVwiOlxuICAgICAgdGhpcy5sZW5ndGggPSAzO1xuICAgICAgaWYgKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAxLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDIsIHRoaXMuc0NbMV1dLFxuICAgICAgICBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb29yZCA9IFtcbiAgICAgICAgICB0aGlzLnNDLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAyXSxcbiAgICAgICAgXTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkRFU1RST1lFUlwiOlxuICAgICAgdGhpcy5sZW5ndGggPSAzO1xuXG4gICAgICBpZiAob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbXG4gICAgICAgICAgdGhpcy5zQyxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDEsIHRoaXMuc0NbMV1dLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMiwgdGhpcy5zQ1sxXV0sXG4gICAgICAgIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAxXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDJdLFxuICAgICAgICBdO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiQkFUVExFU0hJUFwiOlxuICAgICAgdGhpcy5sZW5ndGggPSA0O1xuXG4gICAgICBpZiAob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbXG4gICAgICAgICAgdGhpcy5zQyxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDEsIHRoaXMuc0NbMV1dLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMiwgdGhpcy5zQ1sxXV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAzLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbXG4gICAgICAgICAgdGhpcy5zQyxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDFdLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMl0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAzXSxcbiAgICAgICAgXTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkNBUlJJRVJcIjpcbiAgICAgIHRoaXMubGVuZ3RoID0gNTtcblxuICAgICAgaWYgKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICB0aGlzLmNvb3JkID0gW1xuICAgICAgICAgIHRoaXMuc0MsXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyAxLCB0aGlzLnNDWzFdXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSArIDIsIHRoaXMuc0NbMV1dLFxuICAgICAgICAgIFt0aGlzLnNDWzBdICsgMywgdGhpcy5zQ1sxXV0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0gKyA0LCB0aGlzLnNDWzFdXSxcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29vcmQgPSBbXG4gICAgICAgICAgdGhpcy5zQyxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDFdLFxuICAgICAgICAgIFt0aGlzLnNDWzBdLCB0aGlzLnNDWzFdICsgMl0sXG4gICAgICAgICAgW3RoaXMuc0NbMF0sIHRoaXMuc0NbMV0gKyAzXSxcbiAgICAgICAgICBbdGhpcy5zQ1swXSwgdGhpcy5zQ1sxXSArIDRdLFxuICAgICAgICBdO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcIkludmFsaWQgY2hvaWNlIG9mIHNoaXBcIjtcbiAgfVxuXG4gIHRoaXMuaGl0ID0gKG51bSkgPT4ge1xuICAgIHRoaXMuaGl0TG9jYXRpb25bbnVtXSA9IFwiWFwiO1xuICAgIHRoaXMubGVuZ3RoLS07XG5cbiAgICByZXR1cm4gYFNoaXAgaXMgaGl0IGF0IHBvaW50ICR7bnVtfWA7XG4gIH07XG5cbiAgdGhpcy5pc1N1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgaGl0Q2hlY2sgPSB0aGlzLmhpdExvY2F0aW9uLmZpbHRlcigobnVtKSA9PiB7XG4gICAgICBpZiAobnVtID09PSBcIlhcIikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChoaXRDaGVjayAmJiB0aGlzLmxlbmd0aCA9PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL0JhdWZyYUJvbGQudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9mb250cy9TdGVuY2lsLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBiYXVmcmE7XFxuICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IHN0ZW5jaWw7XFxuICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIik7XFxufVxcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEOTIxMjE7XFxuICBjb2xvcjogYmxhY2s7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwcHg7XFxuICBmb250LWZhbWlseTogc3RlbmNpbCwgc2Fucy1zZXJpZjtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjI1ZW07XFxuICBmb250LXNpemU6IDNlbTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDowO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAzZW07XFxufVxcbmgxIHtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbWFyZ2luLXRvcDogMTVweDtcXG59XFxuLmdhbWVib2FyZHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ucGxheWVyTmFtZSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFxcXCJTZWdvZSBVSVxcXCIsIFJvYm90bywgT3h5Z2VuLFxcbiAgICBVYnVudHUsIENhbnRhcmVsbCwgXFxcIk9wZW4gU2Fuc1xcXCIsIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogMjAwO1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG4vKlxcbi5jb21wdXRlci1ib2FyZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IG1hcm9vbjtcXG59Ki9cXG5cXG4ucGxheWVyLWJvYXJkLFxcbi5jb21wdXRlci1ib2FyZCB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDUwcHg7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuXFxuLnBiU2VjdGlvbi1pdGVtLFxcbi5jYlNlY3Rpb24taXRlbSB7XFxuICB3aWR0aDogMzUwcHg7XFxuICBoZWlnaHQ6IDM1MHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICBqdXN0aWZ5LWl0ZW1zOiBzdHJldGNoO1xcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XFxufVxcblxcbi5jYi1ncmlkLWl0ZW06aG92ZXIsXFxuLnBzLWdyaWQtaXRlbTpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCwgMC4xKTtcXG59XFxuXFxuLnBiLWdyaWQtaXRlbSxcXG4uY2ItZ3JpZC1pdGVtLFxcbi5wcy1ncmlkLWl0ZW0ge1xcbiAgd2lkdGg6IDM1cHg7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICBib3JkZXI6IDAuMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG4ucGxhY2VTaGlwcyB7XFxuICB3aWR0aDogMzcwcHg7XFxuICBoZWlnaHQ6IDQ2MHB4O1xcbiAgZm9udC1mYW1pbHk6IGJhdWZyYTtcXG59XFxuXFxuZmllbGRzZXQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMjBweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMzQwcHg7XFxufVxcblxcbmxlZ2VuZCB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi50b2dnbGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLnNoaXBOYW1lIHtcXG4gIHBhZGRpbmc6IDJweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbjogNXB4IDVweDtcXG59XFxuXFxuLndpbm5lciB7XFxuICB3aWR0aDogMzAwcHg7XFxuICBoZWlnaHQ6IDE1MHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi53aW5uZXItZGlhbG9nLWJ1dHRvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG59XFxuLndpbm5lci1pZGVudGl0eSB7XFxuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcXFwiU2Vnb2UgVUlcXFwiLCBSb2JvdG8sIE94eWdlbixcXG4gICAgVWJ1bnR1LCBDYW50YXJlbGwsIFxcXCJPcGVuIFNhbnNcXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG59XFxuXFxuLmdhbWUtb3ZlciB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIGZvbnQtZmFtaWx5OiBiYXVmcmE7XFxufVxcblxcbi5nYW1lLW92ZXIsXFxuLndpbm5lci1pZGVudGl0eSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcXFwiU2Vnb2UgVUlcXFwiLCBSb2JvdG8sIE94eWdlbixcXG4gICAgVWJ1bnR1LCBDYW50YXJlbGwsIFxcXCJPcGVuIFNhbnNcXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q5MjEyMTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGZvbnQtZmFtaWx5OiBiYXVmcmE7XFxuICBmb250LXNpemU6IDAuNzVlbTtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLG1CQUFtQjtFQUNuQiw0Q0FBZ0M7QUFDbEM7QUFDQTtFQUNFLG9CQUFvQjtFQUNwQiw0Q0FBNkI7QUFDL0I7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLGdDQUFnQztFQUNoQyxzQkFBc0I7RUFDdEIsY0FBYztFQUNkLGVBQWU7RUFDZixLQUFLO0VBQ0wsWUFBWTtFQUNaLFdBQVc7QUFDYjtBQUNBO0lBQ0ksVUFBVTtJQUNWLGdCQUFnQjtBQUNwQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixxQkFBcUI7RUFDckIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZDtnRUFDOEQ7RUFDOUQsZ0JBQWdCO0VBQ2hCLFlBQVk7QUFDZDtBQUNBOzs7RUFHRTs7QUFFRjs7RUFFRSxhQUFhO0VBQ2IsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0VBQ1QsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTs7RUFFRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGFBQWE7RUFDYixzQ0FBc0M7RUFDdEMsbUNBQW1DO0VBQ25DLHNCQUFzQjtFQUN0QixvQkFBb0I7QUFDdEI7O0FBRUE7O0VBRUUsZUFBZTtFQUNmLG1DQUFtQztBQUNyQzs7QUFFQTs7O0VBR0UsV0FBVztFQUNYLFlBQVk7RUFDWix5QkFBeUI7QUFDM0I7QUFDQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7RUFDVCxtQkFBbUI7RUFDbkIsWUFBWTtBQUNkOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6QjtBQUNBO0VBQ0UsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHFDQUFxQztBQUN2QztBQUNBO0VBQ0U7Z0VBQzhEO0VBQzlELGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxtQkFBbUI7QUFDckI7O0FBRUE7O0VBRUUsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0U7Z0VBQzhEO0VBQzlELHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixTQUFTO0VBQ1QsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBiYXVmcmE7XFxuICBzcmM6IHVybCguL2ZvbnRzL0JhdWZyYUJvbGQudHRmKTtcXG59XFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogc3RlbmNpbDtcXG4gIHNyYzogdXJsKC4vZm9udHMvU3RlbmNpbC50dGYpO1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDkyMTIxO1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMHB4O1xcbiAgZm9udC1mYW1pbHk6IHN0ZW5jaWwsIHNhbnMtc2VyaWY7XFxuICBsZXR0ZXItc3BhY2luZzogMC4yNWVtO1xcbiAgZm9udC1zaXplOiAzZW07XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6MDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogM2VtO1xcbn1cXG5oMSB7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG1hcmdpbi10b3A6IDE1cHg7XFxufVxcbi5nYW1lYm9hcmRzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnBsYXllck5hbWUge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcXFwiU2Vnb2UgVUlcXFwiLCBSb2JvdG8sIE94eWdlbixcXG4gICAgVWJ1bnR1LCBDYW50YXJlbGwsIFxcXCJPcGVuIFNhbnNcXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDIwMDtcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLypcXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXJvb247XFxufSovXFxuXFxuLnBsYXllci1ib2FyZCxcXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiA1MHB4O1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcblxcbi5wYlNlY3Rpb24taXRlbSxcXG4uY2JTZWN0aW9uLWl0ZW0ge1xcbiAgd2lkdGg6IDM1MHB4O1xcbiAgaGVpZ2h0OiAzNTBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcXG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xcbn1cXG5cXG4uY2ItZ3JpZC1pdGVtOmhvdmVyLFxcbi5wcy1ncmlkLWl0ZW06aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsIDAsIDAsIDAuMSk7XFxufVxcblxcbi5wYi1ncmlkLWl0ZW0sXFxuLmNiLWdyaWQtaXRlbSxcXG4ucHMtZ3JpZC1pdGVtIHtcXG4gIHdpZHRoOiAzNXB4O1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgYm9yZGVyOiAwLjFweCBzb2xpZCBibGFjaztcXG59XFxuLnBsYWNlU2hpcHMge1xcbiAgd2lkdGg6IDM3MHB4O1xcbiAgaGVpZ2h0OiA0NjBweDtcXG4gIGZvbnQtZmFtaWx5OiBiYXVmcmE7XFxufVxcblxcbmZpZWxkc2V0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDIwcHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDM0MHB4O1xcbn1cXG5cXG5sZWdlbmQge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4udG9nZ2xlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5zaGlwTmFtZSB7XFxuICBwYWRkaW5nOiAycHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW46IDVweCA1cHg7XFxufVxcblxcbi53aW5uZXIge1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgaGVpZ2h0OiAxNTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4ud2lubmVyLWRpYWxvZy1idXR0b24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxufVxcbi53aW5uZXItaWRlbnRpdHkge1xcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXFxcIlNlZ29lIFVJXFxcIiwgUm9ib3RvLCBPeHlnZW4sXFxuICAgIFVidW50dSwgQ2FudGFyZWxsLCBcXFwiT3BlbiBTYW5zXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxufVxcblxcbi5nYW1lLW92ZXIge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBmb250LWZhbWlseTogYmF1ZnJhO1xcbn1cXG5cXG4uZ2FtZS1vdmVyLFxcbi53aW5uZXItaWRlbnRpdHkge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXFxcIlNlZ29lIFVJXFxcIiwgUm9ib3RvLCBPeHlnZW4sXFxuICAgIFVidW50dSwgQ2FudGFyZWxsLCBcXFwiT3BlbiBTYW5zXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkOTIxMjE7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBmb250LWZhbWlseTogYmF1ZnJhO1xcbiAgZm9udC1zaXplOiAwLjc1ZW07XFxuICBib3R0b206IDA7XFxuICB3aWR0aDogMTAwdnc7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBcIi4vbW9kdWxlcy9ET01cIjtcbmltcG9ydCBcIi4vbW9kdWxlcy9jb250cm9sbGVyXCI7XG5cbmNvbnN0IG1haW5kaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tZGlhbG9nXCIpO1xubWFpbmRpYWxvZy5zaG93TW9kYWwoKTtcbiJdLCJuYW1lcyI6WyJTaGlwIiwiZ2FtZUxvb3AiLCJwYlNlY3Rpb24iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjYlNlY3Rpb24iLCJwbGFjZVNoaXBTZWN0aW9uIiwic2hpcE5hbWUiLCJjcmVhdGVFbGVtZW50IiwibWFpbmRpYWxvZyIsImNsYXNzTmFtZSIsImlkIiwidGV4dENvbnRlbnQiLCJ3aW5uZXJkaWFsb2ciLCJ3aW5uZXIiLCJyZXN0YXJ0QnRuIiwicGxheWVyTmFtZSIsImNvbXB1dGVyTmFtZSIsInNoaXBzIiwib2NjdXBpZWRTcG90cyIsImNvdW50IiwicGxheWFibGVTcG90cyIsImNyZWF0ZVBsYXllckdyaWQiLCJwZ3JpZENvbnRhaW5lciIsIngiLCJkaXYiLCJhcHBlbmRDaGlsZCIsImlkR3JpZHMiLCJwbGF5ZXJTcXVhcmVzIiwicXVlcnlTZWxlY3RvckFsbCIsInBvcHVsYXRlUGxheWVyQm9hcmQiLCJvcmllbnRhdGlvblRvZ2dsZSIsImZvcm0iLCJmaWVsZHNldCIsImxlZ2VuZCIsInRvZ2dsZTEiLCJ0b2dnbGUyIiwidlRvZ2dsZSIsImhUb2dnbGUiLCJsYWJlbDEiLCJsYWJlbDIiLCJmb3IiLCJ0eXBlIiwidmFsdWUiLCJjaGVja2VkIiwibmFtZSIsInBsYWNlU2hpcEdyaWQiLCJwbFNoaXBDb250YWluZXIiLCJjcmVhdGVFbmVteUdyaWQiLCJjZ3JpZENvbnRhaW5lciIsInNlbGVjdG9yIiwiZ3JpZGl0ZW1zIiwibXlBcnIiLCJ5IiwicHVzaCIsInNldEF0dHJpYnV0ZSIsImZvckVhY2giLCJzaGlwIiwiY29vcmQiLCJzcXVhcmUiLCJkYXRhc2V0IiwidG9TdHJpbmciLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsInBsYXllckF0dGFja0Rpc3BsYXkiLCJvYmoiLCJlIiwiYXR0YWNrZWRTcG90cyIsImNvb3JkQ2hlY2sxIiwic29tZSIsInRhcmdldCIsImNvb3JkQ2hlY2syIiwiZW5lbXlBdHRhY2tEaXNwbGF5IiwibWlzc2VkSGl0cyIsIm1pc3NlZEhpdCIsImhpdFNwb3RzIiwidmFsaWRhdGVDb29yZHMiLCJwbGF5YWJsZVNwb3RDaGVjayIsImV2ZXJ5IiwiY29vcmRzIiwiY3JlYXRlU2hpcHMiLCJvcmllbnRhdGlvbiIsIkpTT04iLCJwYXJzZSIsInBhdHJvbCIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsImJhdHRsZXNoaXAiLCJjYXJyaWVyIiwiY2xvc2UiLCJhZGRFdmVudExpc3RlbmVyIiwib25jZSIsIndpbm5lckNoZWNrZXIiLCJwbGF5ZXJCb2FyZCIsImNvbXB1dGVyQm9hcmQiLCJhbGxTaGlwc1N1bmsiLCJzaG93TW9kYWwiLCJsb2NhdGlvbiIsInJlbG9hZCIsImdldFJhbmRvbUludCIsIlBsYXllciIsIkdhbWVib2FyZCIsIm9wdGlvbnMiLCJjb21wdXRlclNoaXBzIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwicGxheWVyIiwiY29tcHV0ZXIiLCJlbmVteVNxdWFyZXMiLCJwbGFjZVNoaXAiLCJyY1BsYWNlU2hpcCIsImF0dGFja09wcG9uZW50IiwiZ2FtZWJvYXJkIiwibmV3U2hpcCIsIm9jY3VwaWVkU3BvdENoZWNrIiwicHJveGltaXR5Q2hlY2siLCJ0b1VwcGVyQ2FzZSIsInBvaW50IiwicmVjZWl2ZUF0dGFjayIsImluZGV4IiwiZmluZEluZGV4IiwiZWxlbWVudCIsInN0cmluZ2lmeSIsInNwbGljZSIsImNvb3JkQ2hlY2siLCJ2YWwiLCJteVNoaXAiLCJmaW5kIiwiaGl0IiwiZGVjaXNpb24iLCJpc1N1bmsiLCJjb29yZENoZWNrZXIiLCJyYW5kQ29vcmQiLCJtYXgiLCJtaW4iLCJjZWlsIiwic0MiLCJoaXRMb2NhdGlvbiIsIm9yU3RyIiwibnVtIiwiaGl0Q2hlY2siLCJmaWx0ZXIiXSwic291cmNlUm9vdCI6IiJ9