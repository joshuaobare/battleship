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
/* harmony export */   "ships": () => (/* binding */ ships)
/* harmony export */ });
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/modules/controller.js");
/* eslint-disable no-empty */


const Player = __webpack_require__(/*! ./player */ "./src/modules/player.js");

const Gameboard = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");

const Ship = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");

const pbSection = document.querySelector("#player-board");
const cbSection = document.querySelector("#computer-board");
const placeShipSection = document.querySelector("#placeShips");
let ships = [];
let occupiedSpots = [];
let count = 0;

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
    }
  }

  for (let x = 0; x < 100; x++) {
    griditems[x].setAttribute("data-coord", "[".concat(myArr[x], "]"));
  }
}

placeShipGrid();
const playerSquares = document.querySelectorAll(".ps-grid-item");
/*const populatePlayerBoard = (() => {
    const patrol = new Ship("patrol",[4,3],"V")
    const submarine = new Ship("submarine",[1,1],"V")
    const destroyer = new Ship("destroyer",[1,1],"H")
    const battleship = new Ship("battleship",[2,5],"H")
    const carrier = new Ship("carrier",[2,5],"V")

    /*ships.push(patrol)
    ships.push(submarine)
    ships.push(destroyer)
    ships.push(battleship)
    ships.push(carrier)
})()


playerSquares.addEventListener("click", (e) => {
    count +=1

    if(count == 5) {
        playerSquares.removeEventListener()
    }

})*/

function populatePlayerBoard() {
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

function createShips(e) {
  const orientation = document.querySelector('input[name="orientation"]:checked').value;
  const coords = JSON.parse(e.target.dataset.coord);
  let patrol, submarine, destroyer, battleship, carrier;

  switch (count) {
    case 0:
      patrol = new Ship("patrol", coords, orientation);
      ships.push(patrol);
      populatePlayerBoard();
      break;

    case 1:
      submarine = new Ship("submarine", coords, orientation);
      ships.push(submarine);
      populatePlayerBoard();
      break;

    case 2:
      destroyer = new Ship("destroyer", coords, orientation);
      ships.push(destroyer);
      populatePlayerBoard();
      break;

    case 3:
      battleship = new Ship("battleship", coords, orientation);
      ships.push(battleship);
      populatePlayerBoard();
      break;

    case 4:
      carrier = new Ship("carrier", coords, orientation);
      ships.push(carrier);
      populatePlayerBoard();
      break;

    default:
      (0,_controller__WEBPACK_IMPORTED_MODULE_0__.gameLoop)();
      break;
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
createPlayerGrid()
createEnemyGrid()*/



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



 //const Player = require("./player")

/*
const Gameboard = require("./gameboard")
const Ship = require("./ship") */

const options = ["V", "H"];
const computerShips = [];
const playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__.Gameboard();
const computerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__.Gameboard();
const patrol = new _ship__WEBPACK_IMPORTED_MODULE_3__.Ship("patrol", [(0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9), (0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9)], Math.floor(Math.random() * options.length));
const submarine = new _ship__WEBPACK_IMPORTED_MODULE_3__.Ship("submarine", [(0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9), (0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9)], Math.floor(Math.random() * options.length));
const destroyer = new _ship__WEBPACK_IMPORTED_MODULE_3__.Ship("destroyer", [(0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9), (0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9)], Math.floor(Math.random() * options.length));
const battleship = new _ship__WEBPACK_IMPORTED_MODULE_3__.Ship("battleship", [(0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9), (0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9)], Math.floor(Math.random() * options.length));
const carrier = new _ship__WEBPACK_IMPORTED_MODULE_3__.Ship("carrier", [(0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9), (0,_player__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 9)], Math.floor(Math.random() * options.length));
computerShips.push(patrol, submarine, destroyer, battleship, carrier);
/*playerBoard.placeShip(patrol)
playerBoard.placeShip(submarine)
playerBoard.placeShip(destroyer)
playerBoard.placeShip(battleship)
playerBoard.placeShip(carrier) 
playerBoard.receiveAttack([0,1])
playerBoard.receiveAttack([0,0])
playerBoard.receiveAttack([8,7])*/

const player = new _player__WEBPACK_IMPORTED_MODULE_1__.Player("Player 1", computerBoard);
const computer = new _player__WEBPACK_IMPORTED_MODULE_1__.Player("computer", playerBoard);

function gameLoop() {
  if (playerBoard.allShipsSunk() || computerBoard.allShipsSunk()) {
    alert("Game's UP!");

    if (playerBoard.allShipsSunk()) {
      alert("Computer WINS");
    } else {
      alert("Human WINS");
    }
  }

  _DOM__WEBPACK_IMPORTED_MODULE_0__.ships.forEach(ship => {
    playerBoard.placeShip(ship);
  });

  for (let x = 0; x <= computerShips.length; x++) {
    computerBoard.placeShip(computerShips[x]);
  } //console.log(playerBoard)


  console.log(computerBoard);
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

  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 9; y++) {
      this.playableSpots.push([y, x]);
    }
  }

  this.placeShip = ship => {
    this.ships.push(ship);
    ship.coord.forEach(point => {
      this.occupiedSpots.push(point);
    });
  };

  this.receiveAttack = coords => {
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
      return "All ships have sank";
    } else {
      return "Some ships are afloat";
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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n    margin: 0;\n    overflow: hidden;\n}\n\nheader {\n    background-color: black;\n    color: white;\n    text-align: center;\n    padding: 2px;\n}\n.gameboards {\n    display: flex;\n    margin-top: 100px;\n    \n}\n\n/*.player-board {\n    background-color: blue;\n\n}\n\n.computer-board {\n    background-color: maroon;\n}*/\n\n.player-board , .computer-board {\n    width: 100vw;\n    height: 100vh;\n}\n\n.pbSection-item, .cbSection-item {\n    width: 260px;\n    height: 260px;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n    justify-items: stretch;\n    align-items: stretch;\n    \n}\n\n.cb-grid-item:hover, .ps-grid-item:hover {\n    cursor: pointer;\n    background-color: rgb(0,0,0,0.1);\n}\n\n.pb-grid-item, .cb-grid-item, .ps-grid-item {\n    width: 25px;\n    height: 25px;\n    border: .1px solid black;\n}\n\nfooter {\n    background-color: black;\n    color: white;\n    position: fixed;\n    bottom: 0;\n    width: 100vw;\n    text-align: center;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,gBAAgB;AACpB;;AAEA;IACI,uBAAuB;IACvB,YAAY;IACZ,kBAAkB;IAClB,YAAY;AAChB;AACA;IACI,aAAa;IACb,iBAAiB;;AAErB;;AAEA;;;;;;;EAOE;;AAEF;IACI,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,aAAa;IACb,sCAAsC;IACtC,mCAAmC;IACnC,sBAAsB;IACtB,oBAAoB;;AAExB;;AAEA;IACI,eAAe;IACf,gCAAgC;AACpC;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,wBAAwB;AAC5B;;AAEA;IACI,uBAAuB;IACvB,YAAY;IACZ,eAAe;IACf,SAAS;IACT,YAAY;IACZ,kBAAkB;AACtB","sourcesContent":["body {\n    margin: 0;\n    overflow: hidden;\n}\n\nheader {\n    background-color: black;\n    color: white;\n    text-align: center;\n    padding: 2px;\n}\n.gameboards {\n    display: flex;\n    margin-top: 100px;\n    \n}\n\n/*.player-board {\n    background-color: blue;\n\n}\n\n.computer-board {\n    background-color: maroon;\n}*/\n\n.player-board , .computer-board {\n    width: 100vw;\n    height: 100vh;\n}\n\n.pbSection-item, .cbSection-item {\n    width: 260px;\n    height: 260px;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n    justify-items: stretch;\n    align-items: stretch;\n    \n}\n\n.cb-grid-item:hover, .ps-grid-item:hover {\n    cursor: pointer;\n    background-color: rgb(0,0,0,0.1);\n}\n\n.pb-grid-item, .cb-grid-item, .ps-grid-item {\n    width: 25px;\n    height: 25px;\n    border: .1px solid black;\n}\n\nfooter {\n    background-color: black;\n    color: white;\n    position: fixed;\n    bottom: 0;\n    width: 100vw;\n    text-align: center;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbmltcG9ydCB7IGdhbWVMb29wIH0gZnJvbSBcIi4vY29udHJvbGxlclwiXG5cbmNvbnN0IFBsYXllciA9IHJlcXVpcmUoXCIuL3BsYXllclwiKVxuY29uc3QgR2FtZWJvYXJkID0gcmVxdWlyZShcIi4vZ2FtZWJvYXJkXCIpXG5jb25zdCBTaGlwID0gcmVxdWlyZShcIi4vc2hpcFwiKVxuXG5jb25zdCBwYlNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllci1ib2FyZFwiKVxuY29uc3QgY2JTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wdXRlci1ib2FyZFwiKVxuY29uc3QgcGxhY2VTaGlwU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxhY2VTaGlwc1wiKVxubGV0IHNoaXBzID0gW11cbmxldCBvY2N1cGllZFNwb3RzID0gW11cbmxldCBjb3VudCA9IDBcblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyR3JpZCgpIHtcbiAgICBjb25zdCBwZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBcbiAgICBwZ3JpZENvbnRhaW5lci5jbGFzc05hbWUgPSBcInBiU2VjdGlvbi1pdGVtXCJcbiAgICBcbiAgICBmb3IobGV0IHg9MDsgeDw9OTkgOyB4KyspIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJwYi1ncmlkLWl0ZW1cIlxuICAgICAgICBwZ3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpXG4gICAgfVxuICAgIHBiU2VjdGlvbi5hcHBlbmRDaGlsZChwZ3JpZENvbnRhaW5lcilcbiAgICBpZEdyaWRzKFwiLnBiLWdyaWQtaXRlbVwiKVxuICAgIFxufVxuZnVuY3Rpb24gb3JpZW50YXRpb25Ub2dnbGUoKSB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpXG4gICAgY29uc3QgZmllbGRzZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIilcbiAgICBjb25zdCBsZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGVnZW5kXCIpXG4gICAgbGVnZW5kLnRleHRDb250ZW50ID0gXCJPcmllbnRhdGlvblwiXG4gICAgY29uc3QgdG9nZ2xlMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBjb25zdCB0b2dnbGUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgIGNvbnN0IHZUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbiAgICBjb25zdCBoVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXG4gICAgY29uc3QgbGFiZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXG4gICAgY29uc3QgbGFiZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXG4gICAgbGFiZWwxLmZvciA9IFwiVlwiXG4gICAgbGFiZWwyLmZvciA9IFwiSFwiXG4gICAgbGFiZWwxLnRleHRDb250ZW50ID0gXCJWZXJ0aWNhbDogXCJcbiAgICBsYWJlbDIudGV4dENvbnRlbnQgPSBcIkhvcml6b250YWw6IFwiXG4gICAgdlRvZ2dsZS50eXBlID0gXCJyYWRpb1wiXG4gICAgdlRvZ2dsZS5pZCA9IFwiVlwiXG4gICAgdlRvZ2dsZS52YWx1ZSA9IFwiVlwiXG4gICAgdlRvZ2dsZS5jaGVja2VkID0gdHJ1ZVxuICAgIHZUb2dnbGUubmFtZSA9IFwib3JpZW50YXRpb25cIlxuICAgIGhUb2dnbGUudHlwZSA9IFwicmFkaW9cIlxuICAgIGhUb2dnbGUuaWQgPSBcIkhcIlxuICAgIGhUb2dnbGUudmFsdWUgPSBcIkhcIlxuICAgIGhUb2dnbGUubmFtZSA9IFwib3JpZW50YXRpb25cIlxuICAgIFxuICAgIHRvZ2dsZTEuYXBwZW5kQ2hpbGQobGFiZWwxKVxuICAgIHRvZ2dsZTEuYXBwZW5kQ2hpbGQodlRvZ2dsZSlcbiAgICB0b2dnbGUyLmFwcGVuZENoaWxkKGxhYmVsMilcbiAgICB0b2dnbGUyLmFwcGVuZENoaWxkKGhUb2dnbGUpXG4gICAgZmllbGRzZXQuYXBwZW5kQ2hpbGQobGVnZW5kKVxuICAgIGZpZWxkc2V0LmFwcGVuZENoaWxkKHRvZ2dsZTEpXG4gICAgZmllbGRzZXQuYXBwZW5kQ2hpbGQodG9nZ2xlMilcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZpZWxkc2V0KVxuICAgIFxuICAgIHBsYWNlU2hpcFNlY3Rpb24uYXBwZW5kQ2hpbGQoZm9ybSlcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwR3JpZCgpIHtcbiAgICBjb25zdCBwbFNoaXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgXG4gICAgXG4gICAgcGxTaGlwQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwicGJTZWN0aW9uLWl0ZW1cIlxuICAgIFxuICAgIGZvcihsZXQgeD0wOyB4PD05OSA7IHgrKykge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIGRpdi5jbGFzc05hbWUgPSBcInBzLWdyaWQtaXRlbVwiXG4gICAgICAgIHBsU2hpcENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpXG4gICAgfVxuICAgIG9yaWVudGF0aW9uVG9nZ2xlKClcbiAgICBwbGFjZVNoaXBTZWN0aW9uLmFwcGVuZENoaWxkKHBsU2hpcENvbnRhaW5lcilcbiAgICBpZEdyaWRzKFwiLnBzLWdyaWQtaXRlbVwiKVxufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUVuZW15R3JpZCgpIHtcbiAgICBjb25zdCBjZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBjZ3JpZENvbnRhaW5lci5jbGFzc05hbWUgPSBcImNiU2VjdGlvbi1pdGVtXCJcbiAgICBmb3IobGV0IHg9MDsgeDw9OTkgOyB4KyspIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICBkaXYuY2xhc3NOYW1lID0gYGNiLWdyaWQtaXRlbWAgXG5cbiAgICAgICAgY2dyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KVxuICAgIH1cbiAgICBjYlNlY3Rpb24uYXBwZW5kQ2hpbGQoY2dyaWRDb250YWluZXIpXG4gICAgaWRHcmlkcyhcIi5jYi1ncmlkLWl0ZW1cIilcbn1cblxuZnVuY3Rpb24gaWRHcmlkcyhzZWxlY3Rvcikge1xuICAgIGNvbnN0IGdyaWRpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICAgbGV0IG15QXJyID0gW11cblxuICAgIGZvcihsZXQgeCA9IDA7eDw9OTt4KyspIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDAgOyB5PD05IDt5Kyspe1xuICAgICAgICAgICAgbXlBcnIucHVzaChbeSx4XSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcihsZXQgeD0wIDsgeDwxMDA7eCsrKSB7XG4gICAgICAgIGdyaWRpdGVtc1t4XS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkXCIsYFske215QXJyW3hdfV1gKVxuICAgIH0gXG59ICAgIFxucGxhY2VTaGlwR3JpZCgpXG5jb25zdCBwbGF5ZXJTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcy1ncmlkLWl0ZW1cIilcblxuLypjb25zdCBwb3B1bGF0ZVBsYXllckJvYXJkID0gKCgpID0+IHtcbiAgICBjb25zdCBwYXRyb2wgPSBuZXcgU2hpcChcInBhdHJvbFwiLFs0LDNdLFwiVlwiKVxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKFwic3VibWFyaW5lXCIsWzEsMV0sXCJWXCIpXG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoXCJkZXN0cm95ZXJcIixbMSwxXSxcIkhcIilcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXCJiYXR0bGVzaGlwXCIsWzIsNV0sXCJIXCIpXG4gICAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKFwiY2FycmllclwiLFsyLDVdLFwiVlwiKVxuXG4gICAgLypzaGlwcy5wdXNoKHBhdHJvbClcbiAgICBzaGlwcy5wdXNoKHN1Ym1hcmluZSlcbiAgICBzaGlwcy5wdXNoKGRlc3Ryb3llcilcbiAgICBzaGlwcy5wdXNoKGJhdHRsZXNoaXApXG4gICAgc2hpcHMucHVzaChjYXJyaWVyKVxufSkoKVxuXG5cbnBsYXllclNxdWFyZXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY291bnQgKz0xXG5cbiAgICBpZihjb3VudCA9PSA1KSB7XG4gICAgICAgIHBsYXllclNxdWFyZXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigpXG4gICAgfVxuXG59KSovXG5cbmZ1bmN0aW9uIHBvcHVsYXRlUGxheWVyQm9hcmQoKXtcbiAgICBcblxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgc2hpcC5jb29yZC5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICAgICAgb2NjdXBpZWRTcG90cy5wdXNoKGBbJHtjb29yZH1dYClcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgcGxheWVyU3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgICBvY2N1cGllZFNwb3RzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmQudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgXG4gICAgfSlcblxuICAgIFxuXG5cblxuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXBzKGUpe1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm9yaWVudGF0aW9uXCJdOmNoZWNrZWQnKS52YWx1ZVxuICAgIGNvbnN0IGNvb3JkcyA9IEpTT04ucGFyc2UoZS50YXJnZXQuZGF0YXNldC5jb29yZClcbiAgICBsZXQgcGF0cm9sLHN1Ym1hcmluZSwgZGVzdHJveWVyLCBiYXR0bGVzaGlwLCBjYXJyaWVyXG5cbiAgICBzd2l0Y2goY291bnQpe1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBwYXRyb2wgPSBuZXcgU2hpcChcInBhdHJvbFwiLGNvb3JkcyxvcmllbnRhdGlvbilcbiAgICAgICAgICAgIHNoaXBzLnB1c2gocGF0cm9sKVxuICAgICAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZCgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBzdWJtYXJpbmUgPSBuZXcgU2hpcChcInN1Ym1hcmluZVwiLGNvb3JkcyxvcmllbnRhdGlvbilcbiAgICAgICAgICAgIHNoaXBzLnB1c2goc3VibWFyaW5lKVxuICAgICAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZCgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBkZXN0cm95ZXIgPSBuZXcgU2hpcChcImRlc3Ryb3llclwiLGNvb3JkcyxvcmllbnRhdGlvbilcbiAgICAgICAgICAgIHNoaXBzLnB1c2goZGVzdHJveWVyKVxuICAgICAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZCgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXCJiYXR0bGVzaGlwXCIsY29vcmRzLG9yaWVudGF0aW9uKVxuICAgICAgICAgICAgc2hpcHMucHVzaChiYXR0bGVzaGlwKVxuICAgICAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZCgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICBjYXJyaWVyID0gbmV3IFNoaXAoXCJjYXJyaWVyXCIsY29vcmRzLG9yaWVudGF0aW9uKVxuICAgICAgICAgICAgc2hpcHMucHVzaChjYXJyaWVyKVxuICAgICAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZCgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgZ2FtZUxvb3AoKVxuICAgICAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgICAgICAgICAgICBcblxuICAgICAgICBcbiAgICBjb25zb2xlLmxvZyhzaGlwcylcbiAgICBjb3VudCArPTFcbn1cblxucGxheWVyU3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBjcmVhdGVTaGlwcyhlKVxuICAgICAgICBcbiAgICB9LHtvbmNlOnRydWV9KVxufSlcblxuXG5cbi8qXG5jcmVhdGVQbGF5ZXJHcmlkKClcbmNyZWF0ZUVuZW15R3JpZCgpKi9cblxuZXhwb3J0IHsgc2hpcHMgfSIsImltcG9ydCB7IHNoaXBzIH0gZnJvbSBcIi4vRE9NXCJcbmltcG9ydCB7IGdldFJhbmRvbUludCAsIFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIlxuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIlxuXG4vL2NvbnN0IFBsYXllciA9IHJlcXVpcmUoXCIuL3BsYXllclwiKVxuLypcbmNvbnN0IEdhbWVib2FyZCA9IHJlcXVpcmUoXCIuL2dhbWVib2FyZFwiKVxuY29uc3QgU2hpcCA9IHJlcXVpcmUoXCIuL3NoaXBcIikgKi9cbmNvbnN0IG9wdGlvbnMgPSBbXCJWXCIsXCJIXCJdXG5jb25zdCBjb21wdXRlclNoaXBzID0gW11cblxuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKVxuY29uc3QgY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKVxuY29uc3QgcGF0cm9sID0gbmV3IFNoaXAoXCJwYXRyb2xcIixbZ2V0UmFuZG9tSW50KDAsOSksZ2V0UmFuZG9tSW50KDAsOSldLE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpvcHRpb25zLmxlbmd0aCkpXG5jb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcChcInN1Ym1hcmluZVwiLFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV0sTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm9wdGlvbnMubGVuZ3RoKSlcbmNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKFwiZGVzdHJveWVyXCIsW2dldFJhbmRvbUludCgwLDkpLGdldFJhbmRvbUludCgwLDkpXSxNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqb3B0aW9ucy5sZW5ndGgpKVxuY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKFwiYmF0dGxlc2hpcFwiLFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV0sTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm9wdGlvbnMubGVuZ3RoKSlcbmNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcChcImNhcnJpZXJcIixbZ2V0UmFuZG9tSW50KDAsOSksZ2V0UmFuZG9tSW50KDAsOSldLE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpvcHRpb25zLmxlbmd0aCkpXG5jb21wdXRlclNoaXBzLnB1c2gocGF0cm9sLHN1Ym1hcmluZSxkZXN0cm95ZXIsYmF0dGxlc2hpcCxjYXJyaWVyKVxuXG5cbi8qcGxheWVyQm9hcmQucGxhY2VTaGlwKHBhdHJvbClcbnBsYXllckJvYXJkLnBsYWNlU2hpcChzdWJtYXJpbmUpXG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoZGVzdHJveWVyKVxucGxheWVyQm9hcmQucGxhY2VTaGlwKGJhdHRsZXNoaXApXG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoY2FycmllcikgXG5wbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKFswLDFdKVxucGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhbMCwwXSlcbnBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2soWzgsN10pKi9cblxuXG5jb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiUGxheWVyIDFcIixjb21wdXRlckJvYXJkKVxuY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIixwbGF5ZXJCb2FyZClcblxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG5cbiAgICBpZihwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSB8fCBjb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpICkge1xuICAgICAgICBhbGVydChcIkdhbWUncyBVUCFcIilcblxuICAgICAgICBpZihwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgICAgYWxlcnQoXCJDb21wdXRlciBXSU5TXCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbGVydChcIkh1bWFuIFdJTlNcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcChzaGlwKVxuICAgIH0pXG5cbiAgICBmb3IobGV0IHg9MCA7IHg8PWNvbXB1dGVyU2hpcHMubGVuZ3RoO3grKykge1xuICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChjb21wdXRlclNoaXBzW3hdKVxuICAgIH1cblxuICAgIFxuXG4gICAgLy9jb25zb2xlLmxvZyhwbGF5ZXJCb2FyZClcbiAgICBjb25zb2xlLmxvZyhjb21wdXRlckJvYXJkKVxuXG5cbiAgICBcbiAgICBcblxuXG4gICAgXG5cblxufVxuXG5leHBvcnQgeyBnYW1lTG9vcCB9XG4iLCIvL2NvbnN0IFNoaXAgPSByZXF1aXJlKFwiLi9zaGlwXCIpXG5cbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubWlzc2VkSGl0ID0gW11cbiAgICB0aGlzLnNoaXBzID0gW11cbiAgICB0aGlzLm9jY3VwaWVkU3BvdHMgPSBbXVxuICAgIHRoaXMucGxheWFibGVTcG90cyA9IFtdXG5cbiAgICBmb3IobGV0IHggPSAwO3g8PTk7eCsrKSB7XG4gICAgICAgIGZvciAobGV0IHkgPSAwIDsgeTw9OSA7eSsrKXtcbiAgICAgICAgICAgIHRoaXMucGxheWFibGVTcG90cy5wdXNoKFt5LHhdKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHRoaXMucGxhY2VTaGlwID0gKHNoaXApID0+IHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKVxuICAgICAgICBzaGlwLmNvb3JkLmZvckVhY2gocG9pbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5vY2N1cGllZFNwb3RzLnB1c2gocG9pbnQpXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcblxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgdGhpcy5yZWNlaXZlQXR0YWNrID0gKGNvb3JkcykgPT4ge1xuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wbGF5YWJsZVNwb3RzLmZpbmRJbmRleCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpID09IEpTT04uc3RyaW5naWZ5KGNvb3JkcylcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5wbGF5YWJsZVNwb3RzLnNwbGljZShpbmRleCwxKVxuICAgICAgICBcbiAgICAgICAgICAgICAgIFxuICAgICAgICBjb25zdCBjb29yZENoZWNrID0gdGhpcy5vY2N1cGllZFNwb3RzLnNvbWUoKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgICAgICAgICAgICAgXG4gICAgICAgIGlmIChjb29yZENoZWNrKSAge1xuXG4gICAgICAgICAgICBjb25zdCBteVNoaXAgPSB0aGlzLnNoaXBzLmZpbmQoKHNoaXApID0+IHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzaGlwLmNvb3JkLmZpbmQoKGNvb3JkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb29yZC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gbXlTaGlwLmNvb3JkLmZpbmRJbmRleCgodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYodmFsLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbXlTaGlwLmhpdChpbmRleClcblxuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBcIkF0dGFjayBoaXQgYSBzaGlwXCJcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5taXNzZWRIaXQucHVzaChjb29yZHMpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBcIkF0dGFjayBtaXNzZWRcIlxuICAgICAgICAgICAgXG4gICAgICAgIH0gICAgICAgICAgICAgXG5cbiAgICB9XG5cbiAgICB0aGlzLmFsbFNoaXBzU3VuayA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCBkZWNpc2lvbiA9IHRoaXMuc2hpcHMuZXZlcnkoc2hpcCA9PiB7XG5cbiAgICAgICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChkZWNpc2lvbikge1xuICAgICAgICAgICAgcmV0dXJuIFwiQWxsIHNoaXBzIGhhdmUgc2Fua1wiXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJTb21lIHNoaXBzIGFyZSBhZmxvYXRcIlxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgXG59XG5cblxuLypjb25zdCBzaGlwID0gbmV3IFNoaXAoMyxbWzIsMl0sWzMsMl0sWzIsNV0sWzMsNV1dKVxuY29uc29sZS5sb2coc2hpcC5jb29yZClcbmZ1bmN0aW9uIGZpbmRJbmRleCh4LHkpIHtcblxuICAgIGNvbnN0IGluZGV4ICA9IHkuZmluZEluZGV4XG5cbn0gXG5cbmNvbnN0IHNoaXAgPSBuZXcgU2hpcCg0KVxuY29uc3Qgc2hpcENvb3JkcyA9IFtbMiwyXSxbMywyXSxbMiw1XSxbMyw1XV1cbmNvbnN0IGdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoc2hpcCxzaGlwQ29vcmRzKVxuLy9jb25zb2xlLmxvZyhnYW1lYm9hcmQucGxheWFibGVTcG90cylcblxuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soWzMsNV0pXG5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbMiwyXSlcbmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFszLDJdKVxuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soWzIsNV0pXG4vL2NvbnNvbGUubG9nKGdhbWVib2FyZC5wbGF5YWJsZVNwb3RzKVxuLy9jb25zb2xlLmxvZyhnYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpKi9cblxuXG5leHBvcnQge0dhbWVib2FyZH1cblxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8taW5uZXItZGVjbGFyYXRpb25zICovXG5jb25zdCBQbGF5ZXIgPSBmdW5jdGlvbihuYW1lLGdhbWVib2FyZCkge1xuICAgIFxuICAgIHRoaXMubmFtZSA9IG5hbWUudG9VcHBlckNhc2UoKVxuICAgIHRoaXMuZ2FtZWJvYXJkID0gZ2FtZWJvYXJkXG5cbiAgICB0aGlzLmF0dGFja09wcG9uZW50ID0gKGNvb3JkKSA9PiB7XG4gICAgICAgIGlmKHRoaXMubmFtZSA9PT0gXCJDT01QVVRFUlwiICkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBjb29yZENoZWNrZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZENvb3JkID0gW2dldFJhbmRvbUludCgwLDkpLGdldFJhbmRvbUludCgwLDkpXVxuXG4gICAgICAgICAgICAgICAgY29uc3QgY29vcmRDaGVjayA9IHRoaXMuZ2FtZWJvYXJkLnBsYXlhYmxlU3BvdHMuc29tZSh2YWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsLnRvU3RyaW5nKCkgPT09IHJhbmRDb29yZC50b1N0cmluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGlmKCFjb29yZENoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmFuZENvb3JkKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRDb29yZCA9IFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kQ29vcmQpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvb3JkQ2hlY2tlcigpXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IGF0dGFja2VkYFxuICAgICAgICBcbiAgICB9XG5cbiAgICBcblxufVxuXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWF4LG1pbikge1xuICAgIG1pbiA9IE1hdGguY2VpbChtaW4pXG4gICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbn1cblxuZXhwb3J0IHtnZXRSYW5kb21JbnQgLCBQbGF5ZXJ9XG5cbi8vbW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJcblxuIiwiY29uc3QgU2hpcCA9IGZ1bmN0aW9uKG5hbWUsc0Msb3JpZW50YXRpb24pIHsgIFxuICAgIHRoaXMubmFtZSA9IG5hbWUgIFxuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvblxuICAgIHRoaXMuaGl0TG9jYXRpb24gPSBbXVxuICAgIHRoaXMuc0MgPSBzQ1xuICAgIFxuICAgIGNvbnN0IG9yU3RyID0gb3JpZW50YXRpb24udG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpXG5cbiAgICBzd2l0Y2gobmFtZS50b1N0cmluZygpLnRvVXBwZXJDYXNlKCkpe1xuICAgICAgICBjYXNlIFwiUEFUUk9MXCI6XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDJcblxuICAgICAgICAgICAgaWYob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLFt0aGlzLnNDWzBdKzEsdGhpcy5zQ1sxXV1dXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzFdXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIlNVQk1BUklORVwiOlxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAzXG4gICAgICAgICAgICBpZihvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0rMSx0aGlzLnNDWzFdXSxbdGhpcy5zQ1swXSsyLHRoaXMuc0NbMV1dXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSsxXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzJdXVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJERVNUUk9ZRVJcIjpcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gM1xuXG4gICAgICAgICAgICBpZihvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0rMSx0aGlzLnNDWzFdXSxbdGhpcy5zQ1swXSsyLHRoaXMuc0NbMV1dXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSsxXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzJdXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQkFUVExFU0hJUFwiOlxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSA0XG5cbiAgICAgICAgICAgIGlmKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSsxLHRoaXMuc0NbMV1dLFt0aGlzLnNDWzBdKzIsdGhpcy5zQ1sxXV0sW3RoaXMuc0NbMF0rMyx0aGlzLnNDWzFdXV1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rMV0sW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSsyXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzNdXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQ0FSUklFUlwiOlxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSA1XG5cbiAgICAgICAgICAgIGlmKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSsxLHRoaXMuc0NbMV1dLFt0aGlzLnNDWzBdKzIsdGhpcy5zQ1sxXV0sW3RoaXMuc0NbMF0rMyx0aGlzLnNDWzFdXSxbdGhpcy5zQ1swXSs0LHRoaXMuc0NbMV1dXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSsxXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzJdLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rM10sW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSs0XV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gXCJJbnZhbGlkIGNob2ljZSBvZiBzaGlwXCJcbiAgICAgICAgICAgIFxuICAgIH1cblxuXG5cbiAgICB0aGlzLmhpdCA9IChudW0pID0+IHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaGl0TG9jYXRpb25bbnVtXSA9IFwiWFwiXG4gICAgICAgIHRoaXMubGVuZ3RoLS1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBgU2hpcCBpcyBoaXQgYXQgcG9pbnQgJHtudW19YFxuICAgICAgIFxuICAgIH1cblxuICAgIHRoaXMuaXNTdW5rID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBoaXRDaGVjayA9IHRoaXMuaGl0TG9jYXRpb24uZmlsdGVyKChudW0pID0+IHtcbiAgICAgICAgICAgIGlmIChudW0gPT09IFwiWFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBcbiAgICAgICAgaWYoKGhpdENoZWNrKSAmJiAodGhpcy5sZW5ndGggPT0gMCkpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IHtTaGlwfVxuXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbmhlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMnB4O1xcbn1cXG4uZ2FtZWJvYXJkcyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIG1hcmdpbi10b3A6IDEwMHB4O1xcbiAgICBcXG59XFxuXFxuLyoucGxheWVyLWJvYXJkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG5cXG59XFxuXFxuLmNvbXB1dGVyLWJvYXJkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWFyb29uO1xcbn0qL1xcblxcbi5wbGF5ZXItYm9hcmQgLCAuY29tcHV0ZXItYm9hcmQge1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi5wYlNlY3Rpb24taXRlbSwgLmNiU2VjdGlvbi1pdGVtIHtcXG4gICAgd2lkdGg6IDI2MHB4O1xcbiAgICBoZWlnaHQ6IDI2MHB4O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XFxuICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xcbiAgICBcXG59XFxuXFxuLmNiLWdyaWQtaXRlbTpob3ZlciwgLnBzLWdyaWQtaXRlbTpob3ZlciB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsMCwwLDAuMSk7XFxufVxcblxcbi5wYi1ncmlkLWl0ZW0sIC5jYi1ncmlkLWl0ZW0sIC5wcy1ncmlkLWl0ZW0ge1xcbiAgICB3aWR0aDogMjVweDtcXG4gICAgaGVpZ2h0OiAyNXB4O1xcbiAgICBib3JkZXI6IC4xcHggc29saWQgYmxhY2s7XFxufVxcblxcbmZvb3RlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYm90dG9tOiAwO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFNBQVM7SUFDVCxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxhQUFhO0lBQ2IsaUJBQWlCOztBQUVyQjs7QUFFQTs7Ozs7OztFQU9FOztBQUVGO0lBQ0ksWUFBWTtJQUNaLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLGFBQWE7SUFDYixzQ0FBc0M7SUFDdEMsbUNBQW1DO0lBQ25DLHNCQUFzQjtJQUN0QixvQkFBb0I7O0FBRXhCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixlQUFlO0lBQ2YsU0FBUztJQUNULFlBQVk7SUFDWixrQkFBa0I7QUFDdEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAycHg7XFxufVxcbi5nYW1lYm9hcmRzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbWFyZ2luLXRvcDogMTAwcHg7XFxuICAgIFxcbn1cXG5cXG4vKi5wbGF5ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcblxcbn1cXG5cXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXJvb247XFxufSovXFxuXFxuLnBsYXllci1ib2FyZCAsIC5jb21wdXRlci1ib2FyZCB7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnBiU2VjdGlvbi1pdGVtLCAuY2JTZWN0aW9uLWl0ZW0ge1xcbiAgICB3aWR0aDogMjYwcHg7XFxuICAgIGhlaWdodDogMjYwcHg7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcXG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XFxuICAgIFxcbn1cXG5cXG4uY2ItZ3JpZC1pdGVtOmhvdmVyLCAucHMtZ3JpZC1pdGVtOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwwLDAsMC4xKTtcXG59XFxuXFxuLnBiLWdyaWQtaXRlbSwgLmNiLWdyaWQtaXRlbSwgLnBzLWdyaWQtaXRlbSB7XFxuICAgIHdpZHRoOiAyNXB4O1xcbiAgICBoZWlnaHQ6IDI1cHg7XFxuICAgIGJvcmRlcjogLjFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuZm9vdGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDA7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnXG5pbXBvcnQgJy4vbW9kdWxlcy9ET00nXG5pbXBvcnQgJy4vbW9kdWxlcy9jb250cm9sbGVyJyJdLCJuYW1lcyI6WyJnYW1lTG9vcCIsIlBsYXllciIsInJlcXVpcmUiLCJHYW1lYm9hcmQiLCJTaGlwIiwicGJTZWN0aW9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2JTZWN0aW9uIiwicGxhY2VTaGlwU2VjdGlvbiIsInNoaXBzIiwib2NjdXBpZWRTcG90cyIsImNvdW50IiwiY3JlYXRlUGxheWVyR3JpZCIsInBncmlkQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsIngiLCJkaXYiLCJhcHBlbmRDaGlsZCIsImlkR3JpZHMiLCJvcmllbnRhdGlvblRvZ2dsZSIsImZvcm0iLCJmaWVsZHNldCIsImxlZ2VuZCIsInRleHRDb250ZW50IiwidG9nZ2xlMSIsInRvZ2dsZTIiLCJ2VG9nZ2xlIiwiaFRvZ2dsZSIsImxhYmVsMSIsImxhYmVsMiIsImZvciIsInR5cGUiLCJpZCIsInZhbHVlIiwiY2hlY2tlZCIsIm5hbWUiLCJwbGFjZVNoaXBHcmlkIiwicGxTaGlwQ29udGFpbmVyIiwiY3JlYXRlRW5lbXlHcmlkIiwiY2dyaWRDb250YWluZXIiLCJzZWxlY3RvciIsImdyaWRpdGVtcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJteUFyciIsInkiLCJwdXNoIiwic2V0QXR0cmlidXRlIiwicGxheWVyU3F1YXJlcyIsInBvcHVsYXRlUGxheWVyQm9hcmQiLCJmb3JFYWNoIiwic2hpcCIsImNvb3JkIiwic3F1YXJlIiwiZGF0YXNldCIsInRvU3RyaW5nIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjcmVhdGVTaGlwcyIsImUiLCJvcmllbnRhdGlvbiIsImNvb3JkcyIsIkpTT04iLCJwYXJzZSIsInRhcmdldCIsInBhdHJvbCIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsImJhdHRsZXNoaXAiLCJjYXJyaWVyIiwiY29uc29sZSIsImxvZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbmNlIiwiZ2V0UmFuZG9tSW50Iiwib3B0aW9ucyIsImNvbXB1dGVyU2hpcHMiLCJwbGF5ZXJCb2FyZCIsImNvbXB1dGVyQm9hcmQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJwbGF5ZXIiLCJjb21wdXRlciIsImFsbFNoaXBzU3VuayIsImFsZXJ0IiwicGxhY2VTaGlwIiwibWlzc2VkSGl0IiwicGxheWFibGVTcG90cyIsInBvaW50IiwicmVjZWl2ZUF0dGFjayIsImluZGV4IiwiZmluZEluZGV4IiwiZWxlbWVudCIsInN0cmluZ2lmeSIsInNwbGljZSIsImNvb3JkQ2hlY2siLCJzb21lIiwidmFsIiwibXlTaGlwIiwiZmluZCIsImhpdCIsImRlY2lzaW9uIiwiZXZlcnkiLCJpc1N1bmsiLCJnYW1lYm9hcmQiLCJ0b1VwcGVyQ2FzZSIsImF0dGFja09wcG9uZW50IiwiY29vcmRDaGVja2VyIiwicmFuZENvb3JkIiwibWF4IiwibWluIiwiY2VpbCIsInNDIiwiaGl0TG9jYXRpb24iLCJvclN0ciIsIm51bSIsImhpdENoZWNrIiwiZmlsdGVyIl0sInNvdXJjZVJvb3QiOiIifQ==