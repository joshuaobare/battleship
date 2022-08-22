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
/* harmony export */   "ships": () => (/* binding */ ships)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ "./src/modules/controller.js");
/* eslint-disable no-empty */


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

function enemyAttackDisplay(obj, e) {
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
    e.target.style.backgroundColor = "blue";
  }
}

function createShips(e) {
  const orientation = document.querySelector('input[name="orientation"]:checked').value;
  const coords = JSON.parse(e.target.dataset.coord);
  let patrol, submarine, destroyer, battleship, carrier;

  switch (count) {
    case 0:
      patrol = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("patrol", coords, orientation);
      ships.push(patrol);
      populatePlayerBoard(playerSquares);
      break;

    case 1:
      submarine = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("submarine", coords, orientation);
      ships.push(submarine);
      populatePlayerBoard(playerSquares);
      break;

    case 2:
      destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("destroyer", coords, orientation);
      ships.push(destroyer);
      populatePlayerBoard(playerSquares);
      break;

    case 3:
      battleship = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("battleship", coords, orientation);
      ships.push(battleship);
      populatePlayerBoard(playerSquares);
      break;

    case 4:
      carrier = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("carrier", coords, orientation);
      ships.push(carrier);
      populatePlayerBoard(playerSquares);
      break;

    default:
      break;
  }

  if (count === 5) {
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
    computerBoard.placeShip(ship);
  });
  console.log(computerBoard);
  enemySquares.forEach(square => {
    square.addEventListener("click", e => {
      //console.log(e.target.dataset.coord)
      console.log(player.attackOpponent(JSON.parse(e.target.dataset.coord)));
      console.log(computer.attackOpponent());
      (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.enemyAttackDisplay)(computerBoard, e);
      console.log(computerBoard);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG5pbXBvcnQge1NoaXB9IGZyb20gJy4vc2hpcCdcbmltcG9ydCB7IGdhbWVMb29wIH0gZnJvbSBcIi4vY29udHJvbGxlclwiXG5cblxuXG5jb25zdCBwYlNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllci1ib2FyZFwiKVxuY29uc3QgY2JTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wdXRlci1ib2FyZFwiKVxuY29uc3QgcGxhY2VTaGlwU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxhY2VTaGlwc1wiKVxubGV0IHNoaXBzID0gW11cbmxldCBvY2N1cGllZFNwb3RzID0gW11cbmxldCBjb3VudCA9IDBcblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyR3JpZCgpIHtcbiAgICBjb25zdCBwZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBcbiAgICBwZ3JpZENvbnRhaW5lci5jbGFzc05hbWUgPSBcInBiU2VjdGlvbi1pdGVtXCJcbiAgICBcbiAgICBmb3IobGV0IHg9MDsgeDw9OTkgOyB4KyspIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJwYi1ncmlkLWl0ZW1cIlxuICAgICAgICBwZ3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpXG4gICAgfVxuXG4gICAgIFxuICAgIHBiU2VjdGlvbi5hcHBlbmRDaGlsZChwZ3JpZENvbnRhaW5lcilcbiAgICBpZEdyaWRzKFwiLnBiLWdyaWQtaXRlbVwiKVxuICAgIGNvbnN0IHBsYXllclNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBiLWdyaWQtaXRlbVwiKVxuICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcylcbiAgICBcbn1cbmZ1bmN0aW9uIG9yaWVudGF0aW9uVG9nZ2xlKCkge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKVxuICAgIGNvbnN0IGZpZWxkc2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpXG4gICAgY29uc3QgbGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxlZ2VuZFwiKVxuICAgIGxlZ2VuZC50ZXh0Q29udGVudCA9IFwiT3JpZW50YXRpb25cIlxuICAgIGNvbnN0IHRvZ2dsZTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgY29uc3QgdG9nZ2xlMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBjb25zdCB2VG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXG4gICAgY29uc3QgaFRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuICAgIGNvbnN0IGxhYmVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxuICAgIGNvbnN0IGxhYmVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxuICAgIGxhYmVsMS5mb3IgPSBcIlZcIlxuICAgIGxhYmVsMi5mb3IgPSBcIkhcIlxuICAgIGxhYmVsMS50ZXh0Q29udGVudCA9IFwiVmVydGljYWw6IFwiXG4gICAgbGFiZWwyLnRleHRDb250ZW50ID0gXCJIb3Jpem9udGFsOiBcIlxuICAgIHZUb2dnbGUudHlwZSA9IFwicmFkaW9cIlxuICAgIHZUb2dnbGUuaWQgPSBcIlZcIlxuICAgIHZUb2dnbGUudmFsdWUgPSBcIlZcIlxuICAgIHZUb2dnbGUuY2hlY2tlZCA9IHRydWVcbiAgICB2VG9nZ2xlLm5hbWUgPSBcIm9yaWVudGF0aW9uXCJcbiAgICBoVG9nZ2xlLnR5cGUgPSBcInJhZGlvXCJcbiAgICBoVG9nZ2xlLmlkID0gXCJIXCJcbiAgICBoVG9nZ2xlLnZhbHVlID0gXCJIXCJcbiAgICBoVG9nZ2xlLm5hbWUgPSBcIm9yaWVudGF0aW9uXCJcbiAgICBcbiAgICB0b2dnbGUxLmFwcGVuZENoaWxkKGxhYmVsMSlcbiAgICB0b2dnbGUxLmFwcGVuZENoaWxkKHZUb2dnbGUpXG4gICAgdG9nZ2xlMi5hcHBlbmRDaGlsZChsYWJlbDIpXG4gICAgdG9nZ2xlMi5hcHBlbmRDaGlsZChoVG9nZ2xlKVxuICAgIGZpZWxkc2V0LmFwcGVuZENoaWxkKGxlZ2VuZClcbiAgICBmaWVsZHNldC5hcHBlbmRDaGlsZCh0b2dnbGUxKVxuICAgIGZpZWxkc2V0LmFwcGVuZENoaWxkKHRvZ2dsZTIpXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmaWVsZHNldClcbiAgICBcbiAgICBwbGFjZVNoaXBTZWN0aW9uLmFwcGVuZENoaWxkKGZvcm0pXG59XG5cbmZ1bmN0aW9uIHBsYWNlU2hpcEdyaWQoKSB7XG4gICAgY29uc3QgcGxTaGlwQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgIFxuICAgIFxuICAgIHBsU2hpcENvbnRhaW5lci5jbGFzc05hbWUgPSBcInBiU2VjdGlvbi1pdGVtXCJcbiAgICBcbiAgICBmb3IobGV0IHg9MDsgeDw9OTkgOyB4KyspIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJwcy1ncmlkLWl0ZW1cIlxuICAgICAgICBwbFNoaXBDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KVxuICAgIH1cbiAgICBvcmllbnRhdGlvblRvZ2dsZSgpXG4gICAgcGxhY2VTaGlwU2VjdGlvbi5hcHBlbmRDaGlsZChwbFNoaXBDb250YWluZXIpXG4gICAgaWRHcmlkcyhcIi5wcy1ncmlkLWl0ZW1cIilcbn1cblxuXG5mdW5jdGlvbiBjcmVhdGVFbmVteUdyaWQoKSB7XG4gICAgY29uc3QgY2dyaWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgY2dyaWRDb250YWluZXIuY2xhc3NOYW1lID0gXCJjYlNlY3Rpb24taXRlbVwiXG4gICAgZm9yKGxldCB4PTA7IHg8PTk5IDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgZGl2LmNsYXNzTmFtZSA9IGBjYi1ncmlkLWl0ZW1gIFxuXG4gICAgICAgIGNncmlkQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdilcbiAgICB9XG4gICAgY2JTZWN0aW9uLmFwcGVuZENoaWxkKGNncmlkQ29udGFpbmVyKVxuICAgIGlkR3JpZHMoXCIuY2ItZ3JpZC1pdGVtXCIpXG59XG5cbmZ1bmN0aW9uIGlkR3JpZHMoc2VsZWN0b3IpIHtcbiAgICBjb25zdCBncmlkaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICAgIGxldCBteUFyciA9IFtdXG5cbiAgICBmb3IobGV0IHggPSAwO3g8PTk7eCsrKSB7XG4gICAgICAgIGZvciAobGV0IHkgPSAwIDsgeTw9OSA7eSsrKXtcbiAgICAgICAgICAgIG15QXJyLnB1c2goW3kseF0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IobGV0IHg9MCA7IHg8MTAwO3grKykge1xuICAgICAgICBncmlkaXRlbXNbeF0uc2V0QXR0cmlidXRlKFwiZGF0YS1jb29yZFwiLGBbJHtteUFyclt4XX1dYClcbiAgICB9IFxufSAgICBcbnBsYWNlU2hpcEdyaWQoKVxuY29uc3QgcGxheWVyU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHMtZ3JpZC1pdGVtXCIpXG5cbi8qY29uc3QgcG9wdWxhdGVQbGF5ZXJCb2FyZCA9ICgoKSA9PiB7XG4gICAgY29uc3QgcGF0cm9sID0gbmV3IFNoaXAoXCJwYXRyb2xcIixbNCwzXSxcIlZcIilcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcChcInN1Ym1hcmluZVwiLFsxLDFdLFwiVlwiKVxuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKFwiZGVzdHJveWVyXCIsWzEsMV0sXCJIXCIpXG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKFwiYmF0dGxlc2hpcFwiLFsyLDVdLFwiSFwiKVxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcChcImNhcnJpZXJcIixbMiw1XSxcIlZcIilcblxuICAgIC8qc2hpcHMucHVzaChwYXRyb2wpXG4gICAgc2hpcHMucHVzaChzdWJtYXJpbmUpXG4gICAgc2hpcHMucHVzaChkZXN0cm95ZXIpXG4gICAgc2hpcHMucHVzaChiYXR0bGVzaGlwKVxuICAgIHNoaXBzLnB1c2goY2Fycmllcilcbn0pKClcblxuXG5wbGF5ZXJTcXVhcmVzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGNvdW50ICs9MVxuXG4gICAgaWYoY291bnQgPT0gNSkge1xuICAgICAgICBwbGF5ZXJTcXVhcmVzLnJlbW92ZUV2ZW50TGlzdGVuZXIoKVxuICAgIH1cblxufSkqL1xuXG5mdW5jdGlvbiBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpe1xuICAgIFxuXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBzaGlwLmNvb3JkLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgICAgICBvY2N1cGllZFNwb3RzLnB1c2goYFske2Nvb3JkfV1gKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBwbGF5ZXJTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgIG9jY3VwaWVkU3BvdHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgICAgIGlmIChzcXVhcmUuZGF0YXNldC5jb29yZC50b1N0cmluZygpID09PSBjb29yZC50b1N0cmluZygpKSB7XG4gICAgICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JleVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICBcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBlbmVteUF0dGFja0Rpc3BsYXkob2JqLGUpIHtcbiAgICBjb25zdCBhdHRhY2tlZFNwb3RzID0gb2JqLmF0dGFja2VkU3BvdHNcbiAgICBjb25zdCBvY2N1cGllZFNwb3RzID0gb2JqLm9jY3VwaWVkU3BvdHNcblxuICAgIGNvbnN0IGNvb3JkQ2hlY2sxID0gYXR0YWNrZWRTcG90cy5zb21lKChjb29yZCkgPT4ge1xuICAgICAgICBcbiAgICAgICByZXR1cm4gZS50YXJnZXQuZGF0YXNldC5jb29yZC50b1N0cmluZygpID09PSBgWyR7Y29vcmQudG9TdHJpbmcoKX1dYFxuICAgIH0pXG4gICAgY29uc3QgY29vcmRDaGVjazIgPSBvY2N1cGllZFNwb3RzLnNvbWUoKGNvb3JkKSA9PiB7XG4gICAgICAgIHJldHVybiBlLnRhcmdldC5kYXRhc2V0LmNvb3JkLnRvU3RyaW5nKCkgPT09IGBbJHtjb29yZC50b1N0cmluZygpfV1gXG4gICAgfSlcbiAgICBjb25zb2xlLmxvZyhjb29yZENoZWNrMSxjb29yZENoZWNrMilcbiAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5kYXRhc2V0LmNvb3JkKVxuXG4gICAgaWYoY29vcmRDaGVjazEgJiYgY29vcmRDaGVjazIpIHtcbiAgICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIlxuICAgIH0gZWxzZSBpZiAoKGNvb3JkQ2hlY2sxKSAmJiAhKGNvb3JkQ2hlY2syKSkge1xuICAgICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImJsdWVcIlxuICAgIH1cblxuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXBzKGUpe1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm9yaWVudGF0aW9uXCJdOmNoZWNrZWQnKS52YWx1ZVxuICAgIGNvbnN0IGNvb3JkcyA9IEpTT04ucGFyc2UoZS50YXJnZXQuZGF0YXNldC5jb29yZClcbiAgICBsZXQgcGF0cm9sLHN1Ym1hcmluZSwgZGVzdHJveWVyLCBiYXR0bGVzaGlwLCBjYXJyaWVyXG5cbiAgICBzd2l0Y2goY291bnQpe1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBwYXRyb2wgPSBuZXcgU2hpcChcInBhdHJvbFwiLGNvb3JkcyxvcmllbnRhdGlvbilcbiAgICAgICAgICAgIHNoaXBzLnB1c2gocGF0cm9sKVxuICAgICAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgc3VibWFyaW5lID0gbmV3IFNoaXAoXCJzdWJtYXJpbmVcIixjb29yZHMsb3JpZW50YXRpb24pXG4gICAgICAgICAgICBzaGlwcy5wdXNoKHN1Ym1hcmluZSlcbiAgICAgICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcylcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGRlc3Ryb3llciA9IG5ldyBTaGlwKFwiZGVzdHJveWVyXCIsY29vcmRzLG9yaWVudGF0aW9uKVxuICAgICAgICAgICAgc2hpcHMucHVzaChkZXN0cm95ZXIpXG4gICAgICAgICAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXCJiYXR0bGVzaGlwXCIsY29vcmRzLG9yaWVudGF0aW9uKVxuICAgICAgICAgICAgc2hpcHMucHVzaChiYXR0bGVzaGlwKVxuICAgICAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgY2FycmllciA9IG5ldyBTaGlwKFwiY2FycmllclwiLGNvb3JkcyxvcmllbnRhdGlvbilcbiAgICAgICAgICAgIHNoaXBzLnB1c2goY2FycmllcilcbiAgICAgICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcylcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgICAgIGlmIChjb3VudCA9PT0gNSkge1xuICAgICAgICAgICAgY3JlYXRlUGxheWVyR3JpZCgpXG4gICAgICAgICAgICBjcmVhdGVFbmVteUdyaWQoKVxuICAgICAgICAgICAgZ2FtZUxvb3AoKVxuICAgICAgICB9XG4gICAgICAgICAgICAgICBcblxuICAgICAgICBcbiAgICBjb25zb2xlLmxvZyhzaGlwcylcbiAgICBjb3VudCArPTFcbn1cblxucGxheWVyU3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBjcmVhdGVTaGlwcyhlKVxuICAgICAgICBcbiAgICB9LHtvbmNlOnRydWV9KVxufSlcblxuXG5cblxuLypcbiovXG5cbmV4cG9ydCB7IHNoaXBzICwgZW5lbXlBdHRhY2tEaXNwbGF5IH0iLCJpbXBvcnQgeyBzaGlwcyAsIGVuZW15QXR0YWNrRGlzcGxheSB9IGZyb20gXCIuL0RPTVwiXG5pbXBvcnQgeyBnZXRSYW5kb21JbnQgLCBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIlxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCJcbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCJcblxuXG5jb25zdCBvcHRpb25zID0gW1wiVlwiLFwiSFwiXVxuY29uc3QgY29tcHV0ZXJTaGlwcyA9IFtdXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKVxuY29uc3QgY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKVxuY29uc3QgcGF0cm9sID0gbmV3IFNoaXAoXCJwYXRyb2xcIixbZ2V0UmFuZG9tSW50KDAsOSksZ2V0UmFuZG9tSW50KDAsOSldLG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm9wdGlvbnMubGVuZ3RoKV0pXG5jb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcChcInN1Ym1hcmluZVwiLFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV0sb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqb3B0aW9ucy5sZW5ndGgpXSlcbmNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKFwiZGVzdHJveWVyXCIsW2dldFJhbmRvbUludCgwLDkpLGdldFJhbmRvbUludCgwLDkpXSxvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpvcHRpb25zLmxlbmd0aCldKVxuY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKFwiYmF0dGxlc2hpcFwiLFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV0sb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqb3B0aW9ucy5sZW5ndGgpXSlcbmNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcChcImNhcnJpZXJcIixbZ2V0UmFuZG9tSW50KDAsOSksZ2V0UmFuZG9tSW50KDAsOSldLG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm9wdGlvbnMubGVuZ3RoKV0pXG5jb21wdXRlclNoaXBzLnB1c2gocGF0cm9sLHN1Ym1hcmluZSxkZXN0cm95ZXIsYmF0dGxlc2hpcCxjYXJyaWVyKVxuXG4vKlxuXG5pZihwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSB8fCBjb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpICkge1xuICAgIGFsZXJ0KFwiR2FtZSdzIFVQIVwiKVxuXG4gICAgaWYocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgYWxlcnQoXCJDb21wdXRlciBXSU5TXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoXCJIdW1hbiBXSU5TXCIpXG4gICAgfVxufVxuKi9cblxuXG5jb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiUGxheWVyIDFcIixjb21wdXRlckJvYXJkKVxuY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIixwbGF5ZXJCb2FyZClcblxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG4gICAgY29uc3QgZW5lbXlTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYi1ncmlkLWl0ZW1cIilcbiAgICBcbiAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoc2hpcClcbiAgICB9KVxuXG4gICAgY29tcHV0ZXJTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChzaGlwKVxuICAgIH0pXG4gICAgY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZClcbiAgIFxuICAgIGVuZW15U3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQuY29vcmQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIuYXR0YWNrT3Bwb25lbnQoSlNPTi5wYXJzZShlLnRhcmdldC5kYXRhc2V0LmNvb3JkKSkpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb21wdXRlci5hdHRhY2tPcHBvbmVudCgpKVxuICAgICAgICAgICAgZW5lbXlBdHRhY2tEaXNwbGF5KGNvbXB1dGVyQm9hcmQsZSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmQpXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIFxuICAgIGlmKHBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpIHx8IGNvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkgKSB7XG4gICAgICAgIGFsZXJ0KFwiR2FtZSdzIFVQIVwiKVxuICAgIFxuICAgICAgICBpZihwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgICAgYWxlcnQoXCJDb21wdXRlciBXSU5TXCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbGVydChcIkh1bWFuIFdJTlNcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuXG5cbiAgICBcbiAgICBcblxuXG4gICAgXG5cblxufVxuXG5leHBvcnQgeyBnYW1lTG9vcCB9XG4iLCIvL2NvbnN0IFNoaXAgPSByZXF1aXJlKFwiLi9zaGlwXCIpXG5cbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubWlzc2VkSGl0ID0gW11cbiAgICB0aGlzLnNoaXBzID0gW11cbiAgICB0aGlzLm9jY3VwaWVkU3BvdHMgPSBbXVxuICAgIHRoaXMucGxheWFibGVTcG90cyA9IFtdXG4gICAgdGhpcy5hdHRhY2tlZFNwb3RzID0gW11cblxuICAgIGZvcihsZXQgeCA9IDA7eDw9OTt4KyspIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDAgOyB5PD05IDt5Kyspe1xuICAgICAgICAgICAgdGhpcy5wbGF5YWJsZVNwb3RzLnB1c2goW3kseF0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdGhpcy5wbGFjZVNoaXAgPSAoc2hpcCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApXG4gICAgICAgIHNoaXAuY29vcmQuZm9yRWFjaChwb2ludCA9PiB7XG4gICAgICAgICAgICB0aGlzLm9jY3VwaWVkU3BvdHMucHVzaChwb2ludClcbiAgICAgICAgICAgIFxuICAgICAgICB9KVxuXG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICB0aGlzLnJlY2VpdmVBdHRhY2sgPSAoY29vcmRzKSA9PiB7XG4gICAgICAgIHRoaXMuYXR0YWNrZWRTcG90cy5wdXNoKGNvb3JkcylcblxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucGxheWFibGVTcG90cy5maW5kSW5kZXgoKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlbGVtZW50KSA9PSBKU09OLnN0cmluZ2lmeShjb29yZHMpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMucGxheWFibGVTcG90cy5zcGxpY2UoaW5kZXgsMSlcbiAgICAgICAgXG4gICAgICAgICAgICAgICBcbiAgICAgICAgY29uc3QgY29vcmRDaGVjayA9IHRoaXMub2NjdXBpZWRTcG90cy5zb21lKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG5cbiAgICAgICAgICAgICAgIFxuICAgICAgICBpZiAoY29vcmRDaGVjaykgIHtcblxuICAgICAgICAgICAgY29uc3QgbXlTaGlwID0gdGhpcy5zaGlwcy5maW5kKChzaGlwKSA9PiB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2hpcC5jb29yZC5maW5kKChjb29yZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IG15U2hpcC5jb29yZC5maW5kSW5kZXgoKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHZhbC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIG15U2hpcC5oaXQoaW5kZXgpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gXCJBdHRhY2sgaGl0IGEgc2hpcFwiXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWlzc2VkSGl0LnB1c2goY29vcmRzKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gXCJBdHRhY2sgbWlzc2VkXCJcbiAgICAgICAgICAgIFxuICAgICAgICB9ICAgICAgICAgICAgIFxuXG4gICAgfVxuXG4gICAgdGhpcy5hbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG5cbiAgICAgICAgY29uc3QgZGVjaXNpb24gPSB0aGlzLnNoaXBzLmV2ZXJ5KHNoaXAgPT4ge1xuXG4gICAgICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoZGVjaXNpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cblxuICAgIFxufVxuXG5cbi8qY29uc3Qgc2hpcCA9IG5ldyBTaGlwKDMsW1syLDJdLFszLDJdLFsyLDVdLFszLDVdXSlcbmNvbnNvbGUubG9nKHNoaXAuY29vcmQpXG5mdW5jdGlvbiBmaW5kSW5kZXgoeCx5KSB7XG5cbiAgICBjb25zdCBpbmRleCAgPSB5LmZpbmRJbmRleFxuXG59IFxuXG5jb25zdCBzaGlwID0gbmV3IFNoaXAoNClcbmNvbnN0IHNoaXBDb29yZHMgPSBbWzIsMl0sWzMsMl0sWzIsNV0sWzMsNV1dXG5jb25zdCBnYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKHNoaXAsc2hpcENvb3Jkcylcbi8vY29uc29sZS5sb2coZ2FtZWJvYXJkLnBsYXlhYmxlU3BvdHMpXG5cbmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFszLDVdKVxuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soWzIsMl0pXG5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbMywyXSlcbmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFsyLDVdKVxuLy9jb25zb2xlLmxvZyhnYW1lYm9hcmQucGxheWFibGVTcG90cylcbi8vY29uc29sZS5sb2coZ2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSovXG5cblxuZXhwb3J0IHtHYW1lYm9hcmR9XG5cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWlubmVyLWRlY2xhcmF0aW9ucyAqL1xuY29uc3QgUGxheWVyID0gZnVuY3Rpb24obmFtZSxnYW1lYm9hcmQpIHtcbiAgICBcbiAgICB0aGlzLm5hbWUgPSBuYW1lLnRvVXBwZXJDYXNlKClcbiAgICB0aGlzLmdhbWVib2FyZCA9IGdhbWVib2FyZFxuXG4gICAgdGhpcy5hdHRhY2tPcHBvbmVudCA9IChjb29yZCkgPT4ge1xuICAgICAgICBpZih0aGlzLm5hbWUgPT09IFwiQ09NUFVURVJcIiApIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgY29vcmRDaGVja2VyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRDb29yZCA9IFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvb3JkQ2hlY2sgPSB0aGlzLmdhbWVib2FyZC5wbGF5YWJsZVNwb3RzLnNvbWUodmFsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbC50b1N0cmluZygpID09PSByYW5kQ29vcmQudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBpZighY29vcmRDaGVjaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRDb29yZClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5kQ29vcmQgPSBbZ2V0UmFuZG9tSW50KDAsOSksZ2V0UmFuZG9tSW50KDAsOSldXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmFuZENvb3JkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyYW5kQ29vcmQpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvb3JkQ2hlY2tlcigpXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IGF0dGFja2VkIGF0ICR7Y29vcmR9YFxuICAgICAgICBcbiAgICB9XG5cbiAgICBcblxufVxuXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWF4LG1pbikge1xuICAgIG1pbiA9IE1hdGguY2VpbChtaW4pXG4gICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbn1cblxuZXhwb3J0IHtnZXRSYW5kb21JbnQgLCBQbGF5ZXJ9XG5cbi8vbW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJcblxuIiwiY29uc3QgU2hpcCA9IGZ1bmN0aW9uKG5hbWUsc0Msb3JpZW50YXRpb24pIHsgIFxuICAgIHRoaXMubmFtZSA9IG5hbWUgIFxuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvblxuICAgIHRoaXMuaGl0TG9jYXRpb24gPSBbXVxuICAgIHRoaXMuc0MgPSBzQ1xuICAgIFxuICAgIGNvbnN0IG9yU3RyID0gb3JpZW50YXRpb24udG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpXG5cbiAgICBzd2l0Y2gobmFtZS50b1N0cmluZygpLnRvVXBwZXJDYXNlKCkpe1xuICAgICAgICBjYXNlIFwiUEFUUk9MXCI6XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDJcblxuICAgICAgICAgICAgaWYob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLFt0aGlzLnNDWzBdKzEsdGhpcy5zQ1sxXV1dXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzFdXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIlNVQk1BUklORVwiOlxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAzXG4gICAgICAgICAgICBpZihvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0rMSx0aGlzLnNDWzFdXSxbdGhpcy5zQ1swXSsyLHRoaXMuc0NbMV1dXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSsxXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzJdXVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJERVNUUk9ZRVJcIjpcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gM1xuXG4gICAgICAgICAgICBpZihvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0rMSx0aGlzLnNDWzFdXSxbdGhpcy5zQ1swXSsyLHRoaXMuc0NbMV1dXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSsxXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzJdXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQkFUVExFU0hJUFwiOlxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSA0XG5cbiAgICAgICAgICAgIGlmKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSsxLHRoaXMuc0NbMV1dLFt0aGlzLnNDWzBdKzIsdGhpcy5zQ1sxXV0sW3RoaXMuc0NbMF0rMyx0aGlzLnNDWzFdXV1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rMV0sW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSsyXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzNdXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQ0FSUklFUlwiOlxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSA1XG5cbiAgICAgICAgICAgIGlmKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSsxLHRoaXMuc0NbMV1dLFt0aGlzLnNDWzBdKzIsdGhpcy5zQ1sxXV0sW3RoaXMuc0NbMF0rMyx0aGlzLnNDWzFdXSxbdGhpcy5zQ1swXSs0LHRoaXMuc0NbMV1dXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSsxXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzJdLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rM10sW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSs0XV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gXCJJbnZhbGlkIGNob2ljZSBvZiBzaGlwXCJcbiAgICAgICAgICAgIFxuICAgIH1cblxuXG5cbiAgICB0aGlzLmhpdCA9IChudW0pID0+IHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaGl0TG9jYXRpb25bbnVtXSA9IFwiWFwiXG4gICAgICAgIHRoaXMubGVuZ3RoLS1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBgU2hpcCBpcyBoaXQgYXQgcG9pbnQgJHtudW19YFxuICAgICAgIFxuICAgIH1cblxuICAgIHRoaXMuaXNTdW5rID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBoaXRDaGVjayA9IHRoaXMuaGl0TG9jYXRpb24uZmlsdGVyKChudW0pID0+IHtcbiAgICAgICAgICAgIGlmIChudW0gPT09IFwiWFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBcbiAgICAgICAgaWYoKGhpdENoZWNrKSAmJiAodGhpcy5sZW5ndGggPT0gMCkpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IHtTaGlwfVxuXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbmhlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMnB4O1xcbn1cXG4uZ2FtZWJvYXJkcyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIG1hcmdpbi10b3A6IDEwMHB4O1xcbiAgICBcXG59XFxuXFxuLyoucGxheWVyLWJvYXJkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG5cXG59XFxuXFxuLmNvbXB1dGVyLWJvYXJkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWFyb29uO1xcbn0qL1xcblxcbi5wbGF5ZXItYm9hcmQgLCAuY29tcHV0ZXItYm9hcmQge1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi5wYlNlY3Rpb24taXRlbSwgLmNiU2VjdGlvbi1pdGVtIHtcXG4gICAgd2lkdGg6IDI2MHB4O1xcbiAgICBoZWlnaHQ6IDI2MHB4O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XFxuICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xcbiAgICBcXG59XFxuXFxuLmNiLWdyaWQtaXRlbTpob3ZlciwgLnBzLWdyaWQtaXRlbTpob3ZlciB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsMCwwLDAuMSk7XFxufVxcblxcbi5wYi1ncmlkLWl0ZW0sIC5jYi1ncmlkLWl0ZW0sIC5wcy1ncmlkLWl0ZW0ge1xcbiAgICB3aWR0aDogMjVweDtcXG4gICAgaGVpZ2h0OiAyNXB4O1xcbiAgICBib3JkZXI6IC4xcHggc29saWQgYmxhY2s7XFxufVxcblxcbmZvb3RlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYm90dG9tOiAwO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFNBQVM7SUFDVCxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxhQUFhO0lBQ2IsaUJBQWlCOztBQUVyQjs7QUFFQTs7Ozs7OztFQU9FOztBQUVGO0lBQ0ksWUFBWTtJQUNaLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLGFBQWE7SUFDYixzQ0FBc0M7SUFDdEMsbUNBQW1DO0lBQ25DLHNCQUFzQjtJQUN0QixvQkFBb0I7O0FBRXhCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixlQUFlO0lBQ2YsU0FBUztJQUNULFlBQVk7SUFDWixrQkFBa0I7QUFDdEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAycHg7XFxufVxcbi5nYW1lYm9hcmRzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbWFyZ2luLXRvcDogMTAwcHg7XFxuICAgIFxcbn1cXG5cXG4vKi5wbGF5ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcblxcbn1cXG5cXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXJvb247XFxufSovXFxuXFxuLnBsYXllci1ib2FyZCAsIC5jb21wdXRlci1ib2FyZCB7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnBiU2VjdGlvbi1pdGVtLCAuY2JTZWN0aW9uLWl0ZW0ge1xcbiAgICB3aWR0aDogMjYwcHg7XFxuICAgIGhlaWdodDogMjYwcHg7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcXG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XFxuICAgIFxcbn1cXG5cXG4uY2ItZ3JpZC1pdGVtOmhvdmVyLCAucHMtZ3JpZC1pdGVtOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwwLDAsMC4xKTtcXG59XFxuXFxuLnBiLWdyaWQtaXRlbSwgLmNiLWdyaWQtaXRlbSwgLnBzLWdyaWQtaXRlbSB7XFxuICAgIHdpZHRoOiAyNXB4O1xcbiAgICBoZWlnaHQ6IDI1cHg7XFxuICAgIGJvcmRlcjogLjFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuZm9vdGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDA7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnXG5pbXBvcnQgJy4vbW9kdWxlcy9ET00nXG5pbXBvcnQgJy4vbW9kdWxlcy9jb250cm9sbGVyJyJdLCJuYW1lcyI6WyJTaGlwIiwiZ2FtZUxvb3AiLCJwYlNlY3Rpb24iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjYlNlY3Rpb24iLCJwbGFjZVNoaXBTZWN0aW9uIiwic2hpcHMiLCJvY2N1cGllZFNwb3RzIiwiY291bnQiLCJjcmVhdGVQbGF5ZXJHcmlkIiwicGdyaWRDb250YWluZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwieCIsImRpdiIsImFwcGVuZENoaWxkIiwiaWRHcmlkcyIsInBsYXllclNxdWFyZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicG9wdWxhdGVQbGF5ZXJCb2FyZCIsIm9yaWVudGF0aW9uVG9nZ2xlIiwiZm9ybSIsImZpZWxkc2V0IiwibGVnZW5kIiwidGV4dENvbnRlbnQiLCJ0b2dnbGUxIiwidG9nZ2xlMiIsInZUb2dnbGUiLCJoVG9nZ2xlIiwibGFiZWwxIiwibGFiZWwyIiwiZm9yIiwidHlwZSIsImlkIiwidmFsdWUiLCJjaGVja2VkIiwibmFtZSIsInBsYWNlU2hpcEdyaWQiLCJwbFNoaXBDb250YWluZXIiLCJjcmVhdGVFbmVteUdyaWQiLCJjZ3JpZENvbnRhaW5lciIsInNlbGVjdG9yIiwiZ3JpZGl0ZW1zIiwibXlBcnIiLCJ5IiwicHVzaCIsInNldEF0dHJpYnV0ZSIsImZvckVhY2giLCJzaGlwIiwiY29vcmQiLCJzcXVhcmUiLCJkYXRhc2V0IiwidG9TdHJpbmciLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImVuZW15QXR0YWNrRGlzcGxheSIsIm9iaiIsImUiLCJhdHRhY2tlZFNwb3RzIiwiY29vcmRDaGVjazEiLCJzb21lIiwidGFyZ2V0IiwiY29vcmRDaGVjazIiLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlU2hpcHMiLCJvcmllbnRhdGlvbiIsImNvb3JkcyIsIkpTT04iLCJwYXJzZSIsInBhdHJvbCIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsImJhdHRsZXNoaXAiLCJjYXJyaWVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uY2UiLCJnZXRSYW5kb21JbnQiLCJQbGF5ZXIiLCJHYW1lYm9hcmQiLCJvcHRpb25zIiwiY29tcHV0ZXJTaGlwcyIsInBsYXllckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxlbmd0aCIsInBsYXllciIsImNvbXB1dGVyIiwiZW5lbXlTcXVhcmVzIiwicGxhY2VTaGlwIiwiYXR0YWNrT3Bwb25lbnQiLCJhbGxTaGlwc1N1bmsiLCJhbGVydCIsIm1pc3NlZEhpdCIsInBsYXlhYmxlU3BvdHMiLCJwb2ludCIsInJlY2VpdmVBdHRhY2siLCJpbmRleCIsImZpbmRJbmRleCIsImVsZW1lbnQiLCJzdHJpbmdpZnkiLCJzcGxpY2UiLCJjb29yZENoZWNrIiwidmFsIiwibXlTaGlwIiwiZmluZCIsImhpdCIsImRlY2lzaW9uIiwiZXZlcnkiLCJpc1N1bmsiLCJnYW1lYm9hcmQiLCJ0b1VwcGVyQ2FzZSIsImNvb3JkQ2hlY2tlciIsInJhbmRDb29yZCIsIm1heCIsIm1pbiIsImNlaWwiLCJzQyIsImhpdExvY2F0aW9uIiwib3JTdHIiLCJudW0iLCJoaXRDaGVjayIsImZpbHRlciJdLCJzb3VyY2VSb290IjoiIn0=