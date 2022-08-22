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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n    margin: 0;\n    overflow: hidden;\n}\n\nheader {\n    background-color: black;\n    color: white;\n    text-align: center;\n    padding: 2px;\n}\n.gameboards {\n    display: flex;\n    margin-top: 100px;\n    \n}\n\n/*.player-board {\n    background-color: blue;\n\n}\n\n.computer-board {\n    background-color: maroon;\n}*/\n\n.player-board , .computer-board {\n    width: 100vw;\n    height: 100vh;\n}\n\n.pbSection-item, .cbSection-item {\n    width: 260px;\n    height: 260px;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n    justify-items: stretch;\n    align-items: stretch;\n    \n}\n\n.cb-grid-item:hover, .ps-grid-item:hover {\n    cursor: pointer;\n    background-color: rgb(0,0,0,0.1);\n}\n\n.pb-grid-item, .cb-grid-item, .ps-grid-item {\n    width: 25px;\n    height: 25px;\n    border: .1px solid black;\n}\n\nfooter {\n    background-color: black;\n    color: white;\n    position: fixed;\n    bottom: 0;\n    width: 100vw;\n    text-align: center;    \n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,gBAAgB;AACpB;;AAEA;IACI,uBAAuB;IACvB,YAAY;IACZ,kBAAkB;IAClB,YAAY;AAChB;AACA;IACI,aAAa;IACb,iBAAiB;;AAErB;;AAEA;;;;;;;EAOE;;AAEF;IACI,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,aAAa;IACb,sCAAsC;IACtC,mCAAmC;IACnC,sBAAsB;IACtB,oBAAoB;;AAExB;;AAEA;IACI,eAAe;IACf,gCAAgC;AACpC;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,wBAAwB;AAC5B;;AAEA;IACI,uBAAuB;IACvB,YAAY;IACZ,eAAe;IACf,SAAS;IACT,YAAY;IACZ,kBAAkB;AACtB","sourcesContent":["body {\n    margin: 0;\n    overflow: hidden;\n}\n\nheader {\n    background-color: black;\n    color: white;\n    text-align: center;\n    padding: 2px;\n}\n.gameboards {\n    display: flex;\n    margin-top: 100px;\n    \n}\n\n/*.player-board {\n    background-color: blue;\n\n}\n\n.computer-board {\n    background-color: maroon;\n}*/\n\n.player-board , .computer-board {\n    width: 100vw;\n    height: 100vh;\n}\n\n.pbSection-item, .cbSection-item {\n    width: 260px;\n    height: 260px;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n    justify-items: stretch;\n    align-items: stretch;\n    \n}\n\n.cb-grid-item:hover, .ps-grid-item:hover {\n    cursor: pointer;\n    background-color: rgb(0,0,0,0.1);\n}\n\n.pb-grid-item, .cb-grid-item, .ps-grid-item {\n    width: 25px;\n    height: 25px;\n    border: .1px solid black;\n}\n\nfooter {\n    background-color: black;\n    color: white;\n    position: fixed;\n    bottom: 0;\n    width: 100vw;\n    text-align: center;    \n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbmltcG9ydCB7U2hpcH0gZnJvbSAnLi9zaGlwJ1xuaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tIFwiLi9jb250cm9sbGVyXCJcblxuXG5cbmNvbnN0IHBiU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyLWJvYXJkXCIpXG5jb25zdCBjYlNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXB1dGVyLWJvYXJkXCIpXG5jb25zdCBwbGFjZVNoaXBTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGFjZVNoaXBzXCIpXG5sZXQgc2hpcHMgPSBbXVxubGV0IG9jY3VwaWVkU3BvdHMgPSBbXVxubGV0IGNvdW50ID0gMFxuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJHcmlkKCkge1xuICAgIGNvbnN0IHBncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgIFxuICAgIHBncmlkQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwicGJTZWN0aW9uLWl0ZW1cIlxuICAgIFxuICAgIGZvcihsZXQgeD0wOyB4PD05OSA7IHgrKykge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIGRpdi5jbGFzc05hbWUgPSBcInBiLWdyaWQtaXRlbVwiXG4gICAgICAgIHBncmlkQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdilcbiAgICB9XG5cbiAgICAgXG4gICAgcGJTZWN0aW9uLmFwcGVuZENoaWxkKHBncmlkQ29udGFpbmVyKVxuICAgIGlkR3JpZHMoXCIucGItZ3JpZC1pdGVtXCIpXG4gICAgY29uc3QgcGxheWVyU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGItZ3JpZC1pdGVtXCIpXG4gICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKVxuICAgIFxufVxuZnVuY3Rpb24gb3JpZW50YXRpb25Ub2dnbGUoKSB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpXG4gICAgY29uc3QgZmllbGRzZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIilcbiAgICBjb25zdCBsZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGVnZW5kXCIpXG4gICAgbGVnZW5kLnRleHRDb250ZW50ID0gXCJPcmllbnRhdGlvblwiXG4gICAgY29uc3QgdG9nZ2xlMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBjb25zdCB0b2dnbGUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgIGNvbnN0IHZUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbiAgICBjb25zdCBoVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXG4gICAgY29uc3QgbGFiZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXG4gICAgY29uc3QgbGFiZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXG4gICAgbGFiZWwxLmZvciA9IFwiVlwiXG4gICAgbGFiZWwyLmZvciA9IFwiSFwiXG4gICAgbGFiZWwxLnRleHRDb250ZW50ID0gXCJWZXJ0aWNhbDogXCJcbiAgICBsYWJlbDIudGV4dENvbnRlbnQgPSBcIkhvcml6b250YWw6IFwiXG4gICAgdlRvZ2dsZS50eXBlID0gXCJyYWRpb1wiXG4gICAgdlRvZ2dsZS5pZCA9IFwiVlwiXG4gICAgdlRvZ2dsZS52YWx1ZSA9IFwiVlwiXG4gICAgdlRvZ2dsZS5jaGVja2VkID0gdHJ1ZVxuICAgIHZUb2dnbGUubmFtZSA9IFwib3JpZW50YXRpb25cIlxuICAgIGhUb2dnbGUudHlwZSA9IFwicmFkaW9cIlxuICAgIGhUb2dnbGUuaWQgPSBcIkhcIlxuICAgIGhUb2dnbGUudmFsdWUgPSBcIkhcIlxuICAgIGhUb2dnbGUubmFtZSA9IFwib3JpZW50YXRpb25cIlxuICAgIFxuICAgIHRvZ2dsZTEuYXBwZW5kQ2hpbGQobGFiZWwxKVxuICAgIHRvZ2dsZTEuYXBwZW5kQ2hpbGQodlRvZ2dsZSlcbiAgICB0b2dnbGUyLmFwcGVuZENoaWxkKGxhYmVsMilcbiAgICB0b2dnbGUyLmFwcGVuZENoaWxkKGhUb2dnbGUpXG4gICAgZmllbGRzZXQuYXBwZW5kQ2hpbGQobGVnZW5kKVxuICAgIGZpZWxkc2V0LmFwcGVuZENoaWxkKHRvZ2dsZTEpXG4gICAgZmllbGRzZXQuYXBwZW5kQ2hpbGQodG9nZ2xlMilcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZpZWxkc2V0KVxuICAgIFxuICAgIHBsYWNlU2hpcFNlY3Rpb24uYXBwZW5kQ2hpbGQoZm9ybSlcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwR3JpZCgpIHtcbiAgICBjb25zdCBwbFNoaXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgXG4gICAgXG4gICAgcGxTaGlwQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwicGJTZWN0aW9uLWl0ZW1cIlxuICAgIFxuICAgIGZvcihsZXQgeD0wOyB4PD05OSA7IHgrKykge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIGRpdi5jbGFzc05hbWUgPSBcInBzLWdyaWQtaXRlbVwiXG4gICAgICAgIHBsU2hpcENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpXG4gICAgfVxuICAgIG9yaWVudGF0aW9uVG9nZ2xlKClcbiAgICBwbGFjZVNoaXBTZWN0aW9uLmFwcGVuZENoaWxkKHBsU2hpcENvbnRhaW5lcilcbiAgICBpZEdyaWRzKFwiLnBzLWdyaWQtaXRlbVwiKVxufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUVuZW15R3JpZCgpIHtcbiAgICBjb25zdCBjZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBjZ3JpZENvbnRhaW5lci5jbGFzc05hbWUgPSBcImNiU2VjdGlvbi1pdGVtXCJcbiAgICBmb3IobGV0IHg9MDsgeDw9OTkgOyB4KyspIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICBkaXYuY2xhc3NOYW1lID0gYGNiLWdyaWQtaXRlbWAgXG5cbiAgICAgICAgY2dyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KVxuICAgIH1cbiAgICBjYlNlY3Rpb24uYXBwZW5kQ2hpbGQoY2dyaWRDb250YWluZXIpXG4gICAgaWRHcmlkcyhcIi5jYi1ncmlkLWl0ZW1cIilcbn1cblxuZnVuY3Rpb24gaWRHcmlkcyhzZWxlY3Rvcikge1xuICAgIGNvbnN0IGdyaWRpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICAgbGV0IG15QXJyID0gW11cblxuICAgIGZvcihsZXQgeCA9IDA7eDw9OTt4KyspIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDAgOyB5PD05IDt5Kyspe1xuICAgICAgICAgICAgbXlBcnIucHVzaChbeSx4XSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcihsZXQgeD0wIDsgeDwxMDA7eCsrKSB7XG4gICAgICAgIGdyaWRpdGVtc1t4XS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkXCIsYFske215QXJyW3hdfV1gKVxuICAgIH0gXG59ICAgIFxucGxhY2VTaGlwR3JpZCgpXG5jb25zdCBwbGF5ZXJTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcy1ncmlkLWl0ZW1cIilcblxuLypjb25zdCBwb3B1bGF0ZVBsYXllckJvYXJkID0gKCgpID0+IHtcbiAgICBjb25zdCBwYXRyb2wgPSBuZXcgU2hpcChcInBhdHJvbFwiLFs0LDNdLFwiVlwiKVxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKFwic3VibWFyaW5lXCIsWzEsMV0sXCJWXCIpXG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoXCJkZXN0cm95ZXJcIixbMSwxXSxcIkhcIilcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXCJiYXR0bGVzaGlwXCIsWzIsNV0sXCJIXCIpXG4gICAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKFwiY2FycmllclwiLFsyLDVdLFwiVlwiKVxuXG4gICAgLypzaGlwcy5wdXNoKHBhdHJvbClcbiAgICBzaGlwcy5wdXNoKHN1Ym1hcmluZSlcbiAgICBzaGlwcy5wdXNoKGRlc3Ryb3llcilcbiAgICBzaGlwcy5wdXNoKGJhdHRsZXNoaXApXG4gICAgc2hpcHMucHVzaChjYXJyaWVyKVxufSkoKVxuXG5cbnBsYXllclNxdWFyZXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY291bnQgKz0xXG5cbiAgICBpZihjb3VudCA9PSA1KSB7XG4gICAgICAgIHBsYXllclNxdWFyZXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigpXG4gICAgfVxuXG59KSovXG5cbmZ1bmN0aW9uIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcyl7XG4gICAgXG5cbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIHNoaXAuY29vcmQuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgICAgIG9jY3VwaWVkU3BvdHMucHVzaChgWyR7Y29vcmR9XWApXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIHBsYXllclNxdWFyZXMuZm9yRWFjaChzcXVhcmUgPT4ge1xuICAgICAgICAgb2NjdXBpZWRTcG90cy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNxdWFyZS5kYXRhc2V0LmNvb3JkLnRvU3RyaW5nKCkgPT09IGNvb3JkLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmV5XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgIFxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHBsYXllckF0dGFja0Rpc3BsYXkob2JqLGUpIHtcbiAgICBjb25zdCBhdHRhY2tlZFNwb3RzID0gb2JqLmF0dGFja2VkU3BvdHNcbiAgICBjb25zdCBvY2N1cGllZFNwb3RzID0gb2JqLm9jY3VwaWVkU3BvdHNcblxuICAgIGNvbnN0IGNvb3JkQ2hlY2sxID0gYXR0YWNrZWRTcG90cy5zb21lKChjb29yZCkgPT4ge1xuICAgICAgICBcbiAgICAgICByZXR1cm4gZS50YXJnZXQuZGF0YXNldC5jb29yZC50b1N0cmluZygpID09PSBgWyR7Y29vcmQudG9TdHJpbmcoKX1dYFxuICAgIH0pXG4gICAgY29uc3QgY29vcmRDaGVjazIgPSBvY2N1cGllZFNwb3RzLnNvbWUoKGNvb3JkKSA9PiB7XG4gICAgICAgIHJldHVybiBlLnRhcmdldC5kYXRhc2V0LmNvb3JkLnRvU3RyaW5nKCkgPT09IGBbJHtjb29yZC50b1N0cmluZygpfV1gXG4gICAgfSlcbiAgICBjb25zb2xlLmxvZyhjb29yZENoZWNrMSxjb29yZENoZWNrMilcbiAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5kYXRhc2V0LmNvb3JkKVxuXG4gICAgaWYoY29vcmRDaGVjazEgJiYgY29vcmRDaGVjazIpIHtcbiAgICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIlxuICAgIH0gZWxzZSBpZiAoKGNvb3JkQ2hlY2sxKSAmJiAhKGNvb3JkQ2hlY2syKSkge1xuICAgICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0c2t5Ymx1ZVwiXG4gICAgfVxuXG5cbn1cblxuZnVuY3Rpb24gZW5lbXlBdHRhY2tEaXNwbGF5KG9iaikge1xuXG4gICAgY29uc3QgbWlzc2VkSGl0cyA9IG9iai5taXNzZWRIaXRcbiAgICBjb25zdCBoaXRTcG90cyA9IG9iai5oaXRTcG90c1xuICAgIGNvbnN0IHBsYXllclNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBiLWdyaWQtaXRlbVwiKVxuXG4gICAgcGxheWVyU3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgIG1pc3NlZEhpdHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgICAgaWYgKHNxdWFyZS5kYXRhc2V0LmNvb3JkLnRvU3RyaW5nKCkgPT09IGBbJHtjb29yZC50b1N0cmluZygpfV1gKSB7XG4gICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKClcbiAgICAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0c2t5Ymx1ZVwiXG4gICAgICAgICAgIH1cbiAgICAgICB9KVxuXG4gICAgICBcbiAgICB9KVxuXG4gICBwbGF5ZXJTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgaGl0U3BvdHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgICAgIGlmIChzcXVhcmUuZGF0YXNldC5jb29yZC50b1N0cmluZygpID09PSBgWyR7Y29vcmQudG9TdHJpbmcoKX1dYCkge1xuICAgICAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgXG4gICAgfSlcblxuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXBzKGUpe1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm9yaWVudGF0aW9uXCJdOmNoZWNrZWQnKS52YWx1ZVxuICAgIGNvbnN0IGNvb3JkcyA9IEpTT04ucGFyc2UoZS50YXJnZXQuZGF0YXNldC5jb29yZClcbiAgICBsZXQgcGF0cm9sLHN1Ym1hcmluZSwgZGVzdHJveWVyLCBiYXR0bGVzaGlwLCBjYXJyaWVyXG5cbiAgICBzd2l0Y2goY291bnQpe1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBwYXRyb2wgPSBuZXcgU2hpcChcInBhdHJvbFwiLGNvb3JkcyxvcmllbnRhdGlvbilcbiAgICAgICAgICAgIHNoaXBzLnB1c2gocGF0cm9sKVxuICAgICAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgc3VibWFyaW5lID0gbmV3IFNoaXAoXCJzdWJtYXJpbmVcIixjb29yZHMsb3JpZW50YXRpb24pXG4gICAgICAgICAgICBzaGlwcy5wdXNoKHN1Ym1hcmluZSlcbiAgICAgICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcylcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGRlc3Ryb3llciA9IG5ldyBTaGlwKFwiZGVzdHJveWVyXCIsY29vcmRzLG9yaWVudGF0aW9uKVxuICAgICAgICAgICAgc2hpcHMucHVzaChkZXN0cm95ZXIpXG4gICAgICAgICAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXCJiYXR0bGVzaGlwXCIsY29vcmRzLG9yaWVudGF0aW9uKVxuICAgICAgICAgICAgc2hpcHMucHVzaChiYXR0bGVzaGlwKVxuICAgICAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgY2FycmllciA9IG5ldyBTaGlwKFwiY2FycmllclwiLGNvb3JkcyxvcmllbnRhdGlvbilcbiAgICAgICAgICAgIHNoaXBzLnB1c2goY2FycmllcilcbiAgICAgICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcylcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgICAgIGlmIChjb3VudCA9PT0gNSkge1xuICAgICAgICAgICAgY3JlYXRlUGxheWVyR3JpZCgpXG4gICAgICAgICAgICBjcmVhdGVFbmVteUdyaWQoKVxuICAgICAgICAgICAgZ2FtZUxvb3AoKVxuICAgICAgICB9XG4gICAgICAgICAgICAgICBcblxuICAgICAgICBcbiAgICBjb25zb2xlLmxvZyhzaGlwcylcbiAgICBjb3VudCArPTFcbn1cblxucGxheWVyU3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBjcmVhdGVTaGlwcyhlKVxuICAgICAgICBcbiAgICB9LHtvbmNlOnRydWV9KVxufSlcblxuXG5cblxuLypcbiovXG5cbmV4cG9ydCB7IHNoaXBzICwgcGxheWVyQXR0YWNrRGlzcGxheSwgZW5lbXlBdHRhY2tEaXNwbGF5IH0iLCJpbXBvcnQgeyBzaGlwcyAsIHBsYXllckF0dGFja0Rpc3BsYXksIGVuZW15QXR0YWNrRGlzcGxheSB9IGZyb20gXCIuL0RPTVwiXG5pbXBvcnQgeyBnZXRSYW5kb21JbnQgLCBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIlxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCJcbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCJcblxuXG5jb25zdCBvcHRpb25zID0gW1wiVlwiLFwiSFwiXVxuY29uc3QgY29tcHV0ZXJTaGlwcyA9IFtdXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKVxuY29uc3QgY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKVxuY29uc3QgcGF0cm9sID0gbmV3IFNoaXAoXCJwYXRyb2xcIixbZ2V0UmFuZG9tSW50KDAsOSksZ2V0UmFuZG9tSW50KDAsOSldLG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm9wdGlvbnMubGVuZ3RoKV0pXG5jb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcChcInN1Ym1hcmluZVwiLFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV0sb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqb3B0aW9ucy5sZW5ndGgpXSlcbmNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKFwiZGVzdHJveWVyXCIsW2dldFJhbmRvbUludCgwLDkpLGdldFJhbmRvbUludCgwLDkpXSxvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpvcHRpb25zLmxlbmd0aCldKVxuY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKFwiYmF0dGxlc2hpcFwiLFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV0sb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqb3B0aW9ucy5sZW5ndGgpXSlcbmNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcChcImNhcnJpZXJcIixbZ2V0UmFuZG9tSW50KDAsOSksZ2V0UmFuZG9tSW50KDAsOSldLG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm9wdGlvbnMubGVuZ3RoKV0pXG5jb21wdXRlclNoaXBzLnB1c2gocGF0cm9sLHN1Ym1hcmluZSxkZXN0cm95ZXIsYmF0dGxlc2hpcCxjYXJyaWVyKVxuXG4vKlxuXG5pZihwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSB8fCBjb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpICkge1xuICAgIGFsZXJ0KFwiR2FtZSdzIFVQIVwiKVxuXG4gICAgaWYocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgYWxlcnQoXCJDb21wdXRlciBXSU5TXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoXCJIdW1hbiBXSU5TXCIpXG4gICAgfVxufVxuKi9cblxuXG5jb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiUGxheWVyIDFcIixjb21wdXRlckJvYXJkKVxuY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIixwbGF5ZXJCb2FyZClcblxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG4gICAgY29uc3QgZW5lbXlTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYi1ncmlkLWl0ZW1cIilcbiAgICBcbiAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoc2hpcClcbiAgICB9KVxuXG4gICAgY29tcHV0ZXJTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChzaGlwKVxuICAgIH0pXG4gICAgY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZClcbiAgIFxuICAgIGVuZW15U3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQuY29vcmQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIuYXR0YWNrT3Bwb25lbnQoSlNPTi5wYXJzZShlLnRhcmdldC5kYXRhc2V0LmNvb3JkKSkpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb21wdXRlci5hdHRhY2tPcHBvbmVudCgpKVxuICAgICAgICAgICAgcGxheWVyQXR0YWNrRGlzcGxheShjb21wdXRlckJvYXJkLGUpXG4gICAgICAgICAgICBlbmVteUF0dGFja0Rpc3BsYXkocGxheWVyQm9hcmQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb21wdXRlckJvYXJkKVxuICAgICAgICB9LHtvbmNlOnRydWV9KVxuICAgIH0pXG5cbiAgICBcbiAgICBpZihwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSB8fCBjb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpICkge1xuICAgICAgICBhbGVydChcIkdhbWUncyBVUCFcIilcbiAgICBcbiAgICAgICAgaWYocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiQ29tcHV0ZXIgV0lOU1wiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoXCJIdW1hbiBXSU5TXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcblxuXG4gICAgXG4gICAgXG5cblxuICAgIFxuXG5cbn1cblxuZXhwb3J0IHsgZ2FtZUxvb3AgfVxuIiwiLy9jb25zdCBTaGlwID0gcmVxdWlyZShcIi4vc2hpcFwiKVxuXG5jb25zdCBHYW1lYm9hcmQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLm1pc3NlZEhpdCA9IFtdXG4gICAgdGhpcy5zaGlwcyA9IFtdXG4gICAgdGhpcy5vY2N1cGllZFNwb3RzID0gW11cbiAgICB0aGlzLnBsYXlhYmxlU3BvdHMgPSBbXVxuICAgIHRoaXMuYXR0YWNrZWRTcG90cyA9IFtdXG4gICAgdGhpcy5oaXRTcG90cyA9IFtdXG5cbiAgICBmb3IobGV0IHggPSAwO3g8PTk7eCsrKSB7XG4gICAgICAgIGZvciAobGV0IHkgPSAwIDsgeTw9OSA7eSsrKXtcbiAgICAgICAgICAgIHRoaXMucGxheWFibGVTcG90cy5wdXNoKFt5LHhdKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHRoaXMucGxhY2VTaGlwID0gKHNoaXApID0+IHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKVxuICAgICAgICBzaGlwLmNvb3JkLmZvckVhY2gocG9pbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5vY2N1cGllZFNwb3RzLnB1c2gocG9pbnQpXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcblxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgdGhpcy5yZWNlaXZlQXR0YWNrID0gKGNvb3JkcykgPT4ge1xuICAgICAgICB0aGlzLmF0dGFja2VkU3BvdHMucHVzaChjb29yZHMpXG5cbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnBsYXlhYmxlU3BvdHMuZmluZEluZGV4KChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZWxlbWVudCkgPT0gSlNPTi5zdHJpbmdpZnkoY29vcmRzKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnBsYXlhYmxlU3BvdHMuc3BsaWNlKGluZGV4LDEpXG4gICAgICAgIFxuICAgICAgICAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvb3JkQ2hlY2sgPSB0aGlzLm9jY3VwaWVkU3BvdHMuc29tZSgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuXG4gICAgICAgICAgICAgICBcbiAgICAgICAgaWYgKGNvb3JkQ2hlY2spICB7XG5cbiAgICAgICAgICAgIGNvbnN0IG15U2hpcCA9IHRoaXMuc2hpcHMuZmluZCgoc2hpcCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoaXAuY29vcmQuZmluZCgoY29vcmQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvb3JkLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBteVNoaXAuY29vcmQuZmluZEluZGV4KCh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZih2YWwudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBteVNoaXAuaGl0KGluZGV4KVxuICAgICAgICAgICAgdGhpcy5oaXRTcG90cy5wdXNoKGNvb3JkcylcblxuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBcIkF0dGFjayBoaXQgYSBzaGlwXCJcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5taXNzZWRIaXQucHVzaChjb29yZHMpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBcIkF0dGFjayBtaXNzZWRcIlxuICAgICAgICAgICAgXG4gICAgICAgIH0gICAgICAgICAgICAgXG5cbiAgICB9XG5cbiAgICB0aGlzLmFsbFNoaXBzU3VuayA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCBkZWNpc2lvbiA9IHRoaXMuc2hpcHMuZXZlcnkoc2hpcCA9PiB7XG5cbiAgICAgICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChkZWNpc2lvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgXG59XG5cblxuLypjb25zdCBzaGlwID0gbmV3IFNoaXAoMyxbWzIsMl0sWzMsMl0sWzIsNV0sWzMsNV1dKVxuY29uc29sZS5sb2coc2hpcC5jb29yZClcbmZ1bmN0aW9uIGZpbmRJbmRleCh4LHkpIHtcblxuICAgIGNvbnN0IGluZGV4ICA9IHkuZmluZEluZGV4XG5cbn0gXG5cbmNvbnN0IHNoaXAgPSBuZXcgU2hpcCg0KVxuY29uc3Qgc2hpcENvb3JkcyA9IFtbMiwyXSxbMywyXSxbMiw1XSxbMyw1XV1cbmNvbnN0IGdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoc2hpcCxzaGlwQ29vcmRzKVxuLy9jb25zb2xlLmxvZyhnYW1lYm9hcmQucGxheWFibGVTcG90cylcblxuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soWzMsNV0pXG5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbMiwyXSlcbmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFszLDJdKVxuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soWzIsNV0pXG4vL2NvbnNvbGUubG9nKGdhbWVib2FyZC5wbGF5YWJsZVNwb3RzKVxuLy9jb25zb2xlLmxvZyhnYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpKi9cblxuXG5leHBvcnQge0dhbWVib2FyZH1cblxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8taW5uZXItZGVjbGFyYXRpb25zICovXG5jb25zdCBQbGF5ZXIgPSBmdW5jdGlvbihuYW1lLGdhbWVib2FyZCkge1xuICAgIFxuICAgIHRoaXMubmFtZSA9IG5hbWUudG9VcHBlckNhc2UoKVxuICAgIHRoaXMuZ2FtZWJvYXJkID0gZ2FtZWJvYXJkXG5cbiAgICB0aGlzLmF0dGFja09wcG9uZW50ID0gKGNvb3JkKSA9PiB7XG4gICAgICAgIGlmKHRoaXMubmFtZSA9PT0gXCJDT01QVVRFUlwiICkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBjb29yZENoZWNrZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZENvb3JkID0gW2dldFJhbmRvbUludCgwLDkpLGdldFJhbmRvbUludCgwLDkpXVxuXG4gICAgICAgICAgICAgICAgY29uc3QgY29vcmRDaGVjayA9IHRoaXMuZ2FtZWJvYXJkLnBsYXlhYmxlU3BvdHMuc29tZSh2YWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsLnRvU3RyaW5nKCkgPT09IHJhbmRDb29yZC50b1N0cmluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGlmKCFjb29yZENoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmFuZENvb3JkKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRDb29yZCA9IFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kQ29vcmQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJhbmRDb29yZClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29vcmRDaGVja2VyKClcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmQpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0gYXR0YWNrZWQgYXQgJHtjb29yZH1gXG4gICAgICAgIFxuICAgIH1cblxuICAgIFxuXG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUludChtYXgsbWluKSB7XG4gICAgbWluID0gTWF0aC5jZWlsKG1pbilcbiAgICBtYXggPSBNYXRoLmZsb29yKG1heClcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKVxufVxuXG5leHBvcnQge2dldFJhbmRvbUludCAsIFBsYXllcn1cblxuLy9tb2R1bGUuZXhwb3J0cyA9IFBsYXllclxuXG4iLCJjb25zdCBTaGlwID0gZnVuY3Rpb24obmFtZSxzQyxvcmllbnRhdGlvbikgeyAgXG4gICAgdGhpcy5uYW1lID0gbmFtZSAgXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uXG4gICAgdGhpcy5oaXRMb2NhdGlvbiA9IFtdXG4gICAgdGhpcy5zQyA9IHNDXG4gICAgXG4gICAgY29uc3Qgb3JTdHIgPSBvcmllbnRhdGlvbi50b1N0cmluZygpLnRvVXBwZXJDYXNlKClcblxuICAgIHN3aXRjaChuYW1lLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKSl7XG4gICAgICAgIGNhc2UgXCJQQVRST0xcIjpcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMlxuXG4gICAgICAgICAgICBpZihvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0rMSx0aGlzLnNDWzFdXV1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rMV1dXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiU1VCTUFSSU5FXCI6XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDNcbiAgICAgICAgICAgIGlmKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSsxLHRoaXMuc0NbMV1dLFt0aGlzLnNDWzBdKzIsdGhpcy5zQ1sxXV1dXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzFdLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rMl1dXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkRFU1RST1lFUlwiOlxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAzXG5cbiAgICAgICAgICAgIGlmKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSsxLHRoaXMuc0NbMV1dLFt0aGlzLnNDWzBdKzIsdGhpcy5zQ1sxXV1dXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzFdLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rMl1dXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJCQVRUTEVTSElQXCI6XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDRcblxuICAgICAgICAgICAgaWYob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLFt0aGlzLnNDWzBdKzEsdGhpcy5zQ1sxXV0sW3RoaXMuc0NbMF0rMix0aGlzLnNDWzFdXSxbdGhpcy5zQ1swXSszLHRoaXMuc0NbMV1dXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSsxXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzJdLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rM11dXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJDQVJSSUVSXCI6XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDVcblxuICAgICAgICAgICAgaWYob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLFt0aGlzLnNDWzBdKzEsdGhpcy5zQ1sxXV0sW3RoaXMuc0NbMF0rMix0aGlzLnNDWzFdXSxbdGhpcy5zQ1swXSszLHRoaXMuc0NbMV1dLFt0aGlzLnNDWzBdKzQsdGhpcy5zQ1sxXV1dXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzFdLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rMl0sW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSszXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzRdXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBcIkludmFsaWQgY2hvaWNlIG9mIHNoaXBcIlxuICAgICAgICAgICAgXG4gICAgfVxuXG5cblxuICAgIHRoaXMuaGl0ID0gKG51bSkgPT4ge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5oaXRMb2NhdGlvbltudW1dID0gXCJYXCJcbiAgICAgICAgdGhpcy5sZW5ndGgtLVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGBTaGlwIGlzIGhpdCBhdCBwb2ludCAke251bX1gXG4gICAgICAgXG4gICAgfVxuXG4gICAgdGhpcy5pc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhpdENoZWNrID0gdGhpcy5oaXRMb2NhdGlvbi5maWx0ZXIoKG51bSkgPT4ge1xuICAgICAgICAgICAgaWYgKG51bSA9PT0gXCJYXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIFxuICAgICAgICBpZigoaGl0Q2hlY2spICYmICh0aGlzLmxlbmd0aCA9PSAwKSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufVxuXG5leHBvcnQge1NoaXB9XG5cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAycHg7XFxufVxcbi5nYW1lYm9hcmRzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbWFyZ2luLXRvcDogMTAwcHg7XFxuICAgIFxcbn1cXG5cXG4vKi5wbGF5ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcblxcbn1cXG5cXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXJvb247XFxufSovXFxuXFxuLnBsYXllci1ib2FyZCAsIC5jb21wdXRlci1ib2FyZCB7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnBiU2VjdGlvbi1pdGVtLCAuY2JTZWN0aW9uLWl0ZW0ge1xcbiAgICB3aWR0aDogMjYwcHg7XFxuICAgIGhlaWdodDogMjYwcHg7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcXG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XFxuICAgIFxcbn1cXG5cXG4uY2ItZ3JpZC1pdGVtOmhvdmVyLCAucHMtZ3JpZC1pdGVtOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwwLDAsMC4xKTtcXG59XFxuXFxuLnBiLWdyaWQtaXRlbSwgLmNiLWdyaWQtaXRlbSwgLnBzLWdyaWQtaXRlbSB7XFxuICAgIHdpZHRoOiAyNXB4O1xcbiAgICBoZWlnaHQ6IDI1cHg7XFxuICAgIGJvcmRlcjogLjFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuZm9vdGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDA7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyOyAgICBcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFNBQVM7SUFDVCxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxhQUFhO0lBQ2IsaUJBQWlCOztBQUVyQjs7QUFFQTs7Ozs7OztFQU9FOztBQUVGO0lBQ0ksWUFBWTtJQUNaLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLGFBQWE7SUFDYixzQ0FBc0M7SUFDdEMsbUNBQW1DO0lBQ25DLHNCQUFzQjtJQUN0QixvQkFBb0I7O0FBRXhCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixlQUFlO0lBQ2YsU0FBUztJQUNULFlBQVk7SUFDWixrQkFBa0I7QUFDdEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAycHg7XFxufVxcbi5nYW1lYm9hcmRzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbWFyZ2luLXRvcDogMTAwcHg7XFxuICAgIFxcbn1cXG5cXG4vKi5wbGF5ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcblxcbn1cXG5cXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXJvb247XFxufSovXFxuXFxuLnBsYXllci1ib2FyZCAsIC5jb21wdXRlci1ib2FyZCB7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnBiU2VjdGlvbi1pdGVtLCAuY2JTZWN0aW9uLWl0ZW0ge1xcbiAgICB3aWR0aDogMjYwcHg7XFxuICAgIGhlaWdodDogMjYwcHg7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcXG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XFxuICAgIFxcbn1cXG5cXG4uY2ItZ3JpZC1pdGVtOmhvdmVyLCAucHMtZ3JpZC1pdGVtOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwwLDAsMC4xKTtcXG59XFxuXFxuLnBiLWdyaWQtaXRlbSwgLmNiLWdyaWQtaXRlbSwgLnBzLWdyaWQtaXRlbSB7XFxuICAgIHdpZHRoOiAyNXB4O1xcbiAgICBoZWlnaHQ6IDI1cHg7XFxuICAgIGJvcmRlcjogLjFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuZm9vdGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDA7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyOyAgICBcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJ1xuaW1wb3J0ICcuL21vZHVsZXMvRE9NJ1xuaW1wb3J0ICcuL21vZHVsZXMvY29udHJvbGxlciciXSwibmFtZXMiOlsiU2hpcCIsImdhbWVMb29wIiwicGJTZWN0aW9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2JTZWN0aW9uIiwicGxhY2VTaGlwU2VjdGlvbiIsInNoaXBzIiwib2NjdXBpZWRTcG90cyIsImNvdW50IiwiY3JlYXRlUGxheWVyR3JpZCIsInBncmlkQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsIngiLCJkaXYiLCJhcHBlbmRDaGlsZCIsImlkR3JpZHMiLCJwbGF5ZXJTcXVhcmVzIiwicXVlcnlTZWxlY3RvckFsbCIsInBvcHVsYXRlUGxheWVyQm9hcmQiLCJvcmllbnRhdGlvblRvZ2dsZSIsImZvcm0iLCJmaWVsZHNldCIsImxlZ2VuZCIsInRleHRDb250ZW50IiwidG9nZ2xlMSIsInRvZ2dsZTIiLCJ2VG9nZ2xlIiwiaFRvZ2dsZSIsImxhYmVsMSIsImxhYmVsMiIsImZvciIsInR5cGUiLCJpZCIsInZhbHVlIiwiY2hlY2tlZCIsIm5hbWUiLCJwbGFjZVNoaXBHcmlkIiwicGxTaGlwQ29udGFpbmVyIiwiY3JlYXRlRW5lbXlHcmlkIiwiY2dyaWRDb250YWluZXIiLCJzZWxlY3RvciIsImdyaWRpdGVtcyIsIm15QXJyIiwieSIsInB1c2giLCJzZXRBdHRyaWJ1dGUiLCJmb3JFYWNoIiwic2hpcCIsImNvb3JkIiwic3F1YXJlIiwiZGF0YXNldCIsInRvU3RyaW5nIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwbGF5ZXJBdHRhY2tEaXNwbGF5Iiwib2JqIiwiZSIsImF0dGFja2VkU3BvdHMiLCJjb29yZENoZWNrMSIsInNvbWUiLCJ0YXJnZXQiLCJjb29yZENoZWNrMiIsImNvbnNvbGUiLCJsb2ciLCJlbmVteUF0dGFja0Rpc3BsYXkiLCJtaXNzZWRIaXRzIiwibWlzc2VkSGl0IiwiaGl0U3BvdHMiLCJjcmVhdGVTaGlwcyIsIm9yaWVudGF0aW9uIiwiY29vcmRzIiwiSlNPTiIsInBhcnNlIiwicGF0cm9sIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwiYmF0dGxlc2hpcCIsImNhcnJpZXIiLCJhZGRFdmVudExpc3RlbmVyIiwib25jZSIsImdldFJhbmRvbUludCIsIlBsYXllciIsIkdhbWVib2FyZCIsIm9wdGlvbnMiLCJjb21wdXRlclNoaXBzIiwicGxheWVyQm9hcmQiLCJjb21wdXRlckJvYXJkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwicGxheWVyIiwiY29tcHV0ZXIiLCJlbmVteVNxdWFyZXMiLCJwbGFjZVNoaXAiLCJhdHRhY2tPcHBvbmVudCIsImFsbFNoaXBzU3VuayIsImFsZXJ0IiwicGxheWFibGVTcG90cyIsInBvaW50IiwicmVjZWl2ZUF0dGFjayIsImluZGV4IiwiZmluZEluZGV4IiwiZWxlbWVudCIsInN0cmluZ2lmeSIsInNwbGljZSIsImNvb3JkQ2hlY2siLCJ2YWwiLCJteVNoaXAiLCJmaW5kIiwiaGl0IiwiZGVjaXNpb24iLCJldmVyeSIsImlzU3VuayIsImdhbWVib2FyZCIsInRvVXBwZXJDYXNlIiwiY29vcmRDaGVja2VyIiwicmFuZENvb3JkIiwibWF4IiwibWluIiwiY2VpbCIsInNDIiwiaGl0TG9jYXRpb24iLCJvclN0ciIsIm51bSIsImhpdENoZWNrIiwiZmlsdGVyIl0sInNvdXJjZVJvb3QiOiIifQ==