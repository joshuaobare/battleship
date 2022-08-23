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
    const coordCheck = ship.coord.some(coord => {
      return this.occupiedSpots.some(coords => {
        if (coord.toString() === coords.toString()) {
          return true;
        }
      });
    });

    if (coordCheck) {
      throw "Ship coordinates are taken";
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
        } //console.log(randCoord)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuaW1wb3J0IHtTaGlwfSBmcm9tICcuL3NoaXAnXG5pbXBvcnQgeyBnYW1lTG9vcCB9IGZyb20gXCIuL2NvbnRyb2xsZXJcIlxuXG5cblxuY29uc3QgcGJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXItYm9hcmRcIilcbmNvbnN0IGNiU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tcHV0ZXItYm9hcmRcIilcbmNvbnN0IHBsYWNlU2hpcFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYWNlU2hpcHNcIilcbmxldCBzaGlwcyA9IFtdXG5sZXQgb2NjdXBpZWRTcG90cyA9IFtdXG5sZXQgY291bnQgPSAwXG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckdyaWQoKSB7XG4gICAgY29uc3QgcGdyaWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgXG4gICAgcGdyaWRDb250YWluZXIuY2xhc3NOYW1lID0gXCJwYlNlY3Rpb24taXRlbVwiXG4gICAgXG4gICAgZm9yKGxldCB4PTA7IHg8PTk5IDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwicGItZ3JpZC1pdGVtXCJcbiAgICAgICAgcGdyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KVxuICAgIH1cblxuICAgICBcbiAgICBwYlNlY3Rpb24uYXBwZW5kQ2hpbGQocGdyaWRDb250YWluZXIpXG4gICAgaWRHcmlkcyhcIi5wYi1ncmlkLWl0ZW1cIilcbiAgICBjb25zdCBwbGF5ZXJTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wYi1ncmlkLWl0ZW1cIilcbiAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpXG4gICAgXG59XG5mdW5jdGlvbiBvcmllbnRhdGlvblRvZ2dsZSgpIHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIilcbiAgICBjb25zdCBmaWVsZHNldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKVxuICAgIGNvbnN0IGxlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIilcbiAgICBsZWdlbmQudGV4dENvbnRlbnQgPSBcIk9yaWVudGF0aW9uXCJcbiAgICBjb25zdCB0b2dnbGUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgIGNvbnN0IHRvZ2dsZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgY29uc3QgdlRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuICAgIGNvbnN0IGhUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbiAgICBjb25zdCBsYWJlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcbiAgICBjb25zdCBsYWJlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcbiAgICBsYWJlbDEuZm9yID0gXCJWXCJcbiAgICBsYWJlbDIuZm9yID0gXCJIXCJcbiAgICBsYWJlbDEudGV4dENvbnRlbnQgPSBcIlZlcnRpY2FsOiBcIlxuICAgIGxhYmVsMi50ZXh0Q29udGVudCA9IFwiSG9yaXpvbnRhbDogXCJcbiAgICB2VG9nZ2xlLnR5cGUgPSBcInJhZGlvXCJcbiAgICB2VG9nZ2xlLmlkID0gXCJWXCJcbiAgICB2VG9nZ2xlLnZhbHVlID0gXCJWXCJcbiAgICB2VG9nZ2xlLmNoZWNrZWQgPSB0cnVlXG4gICAgdlRvZ2dsZS5uYW1lID0gXCJvcmllbnRhdGlvblwiXG4gICAgaFRvZ2dsZS50eXBlID0gXCJyYWRpb1wiXG4gICAgaFRvZ2dsZS5pZCA9IFwiSFwiXG4gICAgaFRvZ2dsZS52YWx1ZSA9IFwiSFwiXG4gICAgaFRvZ2dsZS5uYW1lID0gXCJvcmllbnRhdGlvblwiXG4gICAgXG4gICAgdG9nZ2xlMS5hcHBlbmRDaGlsZChsYWJlbDEpXG4gICAgdG9nZ2xlMS5hcHBlbmRDaGlsZCh2VG9nZ2xlKVxuICAgIHRvZ2dsZTIuYXBwZW5kQ2hpbGQobGFiZWwyKVxuICAgIHRvZ2dsZTIuYXBwZW5kQ2hpbGQoaFRvZ2dsZSlcbiAgICBmaWVsZHNldC5hcHBlbmRDaGlsZChsZWdlbmQpXG4gICAgZmllbGRzZXQuYXBwZW5kQ2hpbGQodG9nZ2xlMSlcbiAgICBmaWVsZHNldC5hcHBlbmRDaGlsZCh0b2dnbGUyKVxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZmllbGRzZXQpXG4gICAgXG4gICAgcGxhY2VTaGlwU2VjdGlvbi5hcHBlbmRDaGlsZChmb3JtKVxufVxuXG5mdW5jdGlvbiBwbGFjZVNoaXBHcmlkKCkge1xuICAgIGNvbnN0IHBsU2hpcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBcbiAgICBcbiAgICBwbFNoaXBDb250YWluZXIuY2xhc3NOYW1lID0gXCJwYlNlY3Rpb24taXRlbVwiXG4gICAgXG4gICAgZm9yKGxldCB4PTA7IHg8PTk5IDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwicHMtZ3JpZC1pdGVtXCJcbiAgICAgICAgcGxTaGlwQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdilcbiAgICB9XG4gICAgb3JpZW50YXRpb25Ub2dnbGUoKVxuICAgIHBsYWNlU2hpcFNlY3Rpb24uYXBwZW5kQ2hpbGQocGxTaGlwQ29udGFpbmVyKVxuICAgIGlkR3JpZHMoXCIucHMtZ3JpZC1pdGVtXCIpXG59XG5cblxuZnVuY3Rpb24gY3JlYXRlRW5lbXlHcmlkKCkge1xuICAgIGNvbnN0IGNncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgIGNncmlkQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiY2JTZWN0aW9uLWl0ZW1cIlxuICAgIGZvcihsZXQgeD0wOyB4PD05OSA7IHgrKykge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIGRpdi5jbGFzc05hbWUgPSBgY2ItZ3JpZC1pdGVtYCBcblxuICAgICAgICBjZ3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpXG4gICAgfVxuICAgIGNiU2VjdGlvbi5hcHBlbmRDaGlsZChjZ3JpZENvbnRhaW5lcilcbiAgICBpZEdyaWRzKFwiLmNiLWdyaWQtaXRlbVwiKVxufVxuXG5mdW5jdGlvbiBpZEdyaWRzKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgZ3JpZGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcilcbiAgICBsZXQgbXlBcnIgPSBbXVxuXG4gICAgZm9yKGxldCB4ID0gMDt4PD05O3grKykge1xuICAgICAgICBmb3IgKGxldCB5ID0gMCA7IHk8PTkgO3krKyl7XG4gICAgICAgICAgICBteUFyci5wdXNoKFt5LHhdKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKGxldCB4PTAgOyB4PDEwMDt4KyspIHtcbiAgICAgICAgZ3JpZGl0ZW1zW3hdLnNldEF0dHJpYnV0ZShcImRhdGEtY29vcmRcIixgWyR7bXlBcnJbeF19XWApXG4gICAgfSBcbn0gICAgXG5wbGFjZVNoaXBHcmlkKClcbmNvbnN0IHBsYXllclNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBzLWdyaWQtaXRlbVwiKVxuXG4vKmNvbnN0IHBvcHVsYXRlUGxheWVyQm9hcmQgPSAoKCkgPT4ge1xuICAgIGNvbnN0IHBhdHJvbCA9IG5ldyBTaGlwKFwicGF0cm9sXCIsWzQsM10sXCJWXCIpXG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoXCJzdWJtYXJpbmVcIixbMSwxXSxcIlZcIilcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcChcImRlc3Ryb3llclwiLFsxLDFdLFwiSFwiKVxuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcChcImJhdHRsZXNoaXBcIixbMiw1XSxcIkhcIilcbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoXCJjYXJyaWVyXCIsWzIsNV0sXCJWXCIpXG5cbiAgICAvKnNoaXBzLnB1c2gocGF0cm9sKVxuICAgIHNoaXBzLnB1c2goc3VibWFyaW5lKVxuICAgIHNoaXBzLnB1c2goZGVzdHJveWVyKVxuICAgIHNoaXBzLnB1c2goYmF0dGxlc2hpcClcbiAgICBzaGlwcy5wdXNoKGNhcnJpZXIpXG59KSgpXG5cblxucGxheWVyU3F1YXJlcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb3VudCArPTFcblxuICAgIGlmKGNvdW50ID09IDUpIHtcbiAgICAgICAgcGxheWVyU3F1YXJlcy5yZW1vdmVFdmVudExpc3RlbmVyKClcbiAgICB9XG5cbn0pKi9cblxuZnVuY3Rpb24gcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKXtcbiAgICBcblxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgc2hpcC5jb29yZC5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICAgICAgb2NjdXBpZWRTcG90cy5wdXNoKGBbJHtjb29yZH1dYClcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgcGxheWVyU3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgICBvY2N1cGllZFNwb3RzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmQudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcGxheWVyQXR0YWNrRGlzcGxheShvYmosZSkge1xuICAgIGNvbnN0IGF0dGFja2VkU3BvdHMgPSBvYmouYXR0YWNrZWRTcG90c1xuICAgIGNvbnN0IG9jY3VwaWVkU3BvdHMgPSBvYmoub2NjdXBpZWRTcG90c1xuXG4gICAgY29uc3QgY29vcmRDaGVjazEgPSBhdHRhY2tlZFNwb3RzLnNvbWUoKGNvb3JkKSA9PiB7XG4gICAgICAgIFxuICAgICAgIHJldHVybiBlLnRhcmdldC5kYXRhc2V0LmNvb3JkLnRvU3RyaW5nKCkgPT09IGBbJHtjb29yZC50b1N0cmluZygpfV1gXG4gICAgfSlcbiAgICBjb25zdCBjb29yZENoZWNrMiA9IG9jY3VwaWVkU3BvdHMuc29tZSgoY29vcmQpID0+IHtcbiAgICAgICAgcmV0dXJuIGUudGFyZ2V0LmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gYFske2Nvb3JkLnRvU3RyaW5nKCl9XWBcbiAgICB9KVxuICAgIGNvbnNvbGUubG9nKGNvb3JkQ2hlY2sxLGNvb3JkQ2hlY2syKVxuICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQuY29vcmQpXG5cbiAgICBpZihjb29yZENoZWNrMSAmJiBjb29yZENoZWNrMikge1xuICAgICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiXG4gICAgfSBlbHNlIGlmICgoY29vcmRDaGVjazEpICYmICEoY29vcmRDaGVjazIpKSB7XG4gICAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRza3libHVlXCJcbiAgICB9XG5cblxufVxuXG5mdW5jdGlvbiBlbmVteUF0dGFja0Rpc3BsYXkob2JqKSB7XG5cbiAgICBjb25zdCBtaXNzZWRIaXRzID0gb2JqLm1pc3NlZEhpdFxuICAgIGNvbnN0IGhpdFNwb3RzID0gb2JqLmhpdFNwb3RzXG4gICAgY29uc3QgcGxheWVyU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGItZ3JpZC1pdGVtXCIpXG5cbiAgICBwbGF5ZXJTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgbWlzc2VkSGl0cy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gYFske2Nvb3JkLnRvU3RyaW5nKCl9XWApIHtcbiAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coKVxuICAgICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRza3libHVlXCJcbiAgICAgICAgICAgfVxuICAgICAgIH0pXG5cbiAgICAgIFxuICAgIH0pXG5cbiAgIHBsYXllclNxdWFyZXMuZm9yRWFjaChzcXVhcmUgPT4ge1xuICAgICAgICBoaXRTcG90cy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNxdWFyZS5kYXRhc2V0LmNvb3JkLnRvU3RyaW5nKCkgPT09IGBbJHtjb29yZC50b1N0cmluZygpfV1gKSB7XG4gICAgICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICBcbiAgICB9KVxuXG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlU2hpcHMoZSl7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwib3JpZW50YXRpb25cIl06Y2hlY2tlZCcpLnZhbHVlXG4gICAgY29uc3QgY29vcmRzID0gSlNPTi5wYXJzZShlLnRhcmdldC5kYXRhc2V0LmNvb3JkKVxuICAgIGxldCBwYXRyb2wsc3VibWFyaW5lLCBkZXN0cm95ZXIsIGJhdHRsZXNoaXAsIGNhcnJpZXJcblxuICAgIHN3aXRjaChjb3VudCl7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHBhdHJvbCA9IG5ldyBTaGlwKFwicGF0cm9sXCIsY29vcmRzLG9yaWVudGF0aW9uKVxuICAgICAgICAgICAgc2hpcHMucHVzaChwYXRyb2wpXG4gICAgICAgICAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBzdWJtYXJpbmUgPSBuZXcgU2hpcChcInN1Ym1hcmluZVwiLGNvb3JkcyxvcmllbnRhdGlvbilcbiAgICAgICAgICAgIHNoaXBzLnB1c2goc3VibWFyaW5lKVxuICAgICAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgZGVzdHJveWVyID0gbmV3IFNoaXAoXCJkZXN0cm95ZXJcIixjb29yZHMsb3JpZW50YXRpb24pXG4gICAgICAgICAgICBzaGlwcy5wdXNoKGRlc3Ryb3llcilcbiAgICAgICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcylcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGJhdHRsZXNoaXAgPSBuZXcgU2hpcChcImJhdHRsZXNoaXBcIixjb29yZHMsb3JpZW50YXRpb24pXG4gICAgICAgICAgICBzaGlwcy5wdXNoKGJhdHRsZXNoaXApXG4gICAgICAgICAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICBjYXJyaWVyID0gbmV3IFNoaXAoXCJjYXJyaWVyXCIsY29vcmRzLG9yaWVudGF0aW9uKVxuICAgICAgICAgICAgc2hpcHMucHVzaChjYXJyaWVyKVxuICAgICAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBicmVha1xuICAgIH1cbiAgICAgICAgaWYgKGNvdW50ID09PSA1KSB7XG4gICAgICAgICAgICBjcmVhdGVQbGF5ZXJHcmlkKClcbiAgICAgICAgICAgIGNyZWF0ZUVuZW15R3JpZCgpXG4gICAgICAgICAgICBnYW1lTG9vcCgpXG4gICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuXG4gICAgICAgIFxuICAgIGNvbnNvbGUubG9nKHNoaXBzKVxuICAgIGNvdW50ICs9MVxufVxuXG5wbGF5ZXJTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNyZWF0ZVNoaXBzKGUpXG4gICAgICAgIFxuICAgIH0se29uY2U6dHJ1ZX0pXG59KVxuXG5cblxuXG4vKlxuKi9cblxuZXhwb3J0IHsgc2hpcHMgLCBwbGF5ZXJBdHRhY2tEaXNwbGF5LCBlbmVteUF0dGFja0Rpc3BsYXkgfSIsImltcG9ydCB7IHNoaXBzICwgcGxheWVyQXR0YWNrRGlzcGxheSwgZW5lbXlBdHRhY2tEaXNwbGF5IH0gZnJvbSBcIi4vRE9NXCJcbmltcG9ydCB7IGdldFJhbmRvbUludCAsIFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIlxuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIlxuXG5cbmNvbnN0IG9wdGlvbnMgPSBbXCJWXCIsXCJIXCJdXG5jb25zdCBjb21wdXRlclNoaXBzID0gW11cbmNvbnN0IHBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpXG5jb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZCgpXG5jb25zdCBwYXRyb2wgPSBuZXcgU2hpcChcInBhdHJvbFwiLFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV0sb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqb3B0aW9ucy5sZW5ndGgpXSlcbmNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKFwic3VibWFyaW5lXCIsW2dldFJhbmRvbUludCgwLDkpLGdldFJhbmRvbUludCgwLDkpXSxvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpvcHRpb25zLmxlbmd0aCldKVxuY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoXCJkZXN0cm95ZXJcIixbZ2V0UmFuZG9tSW50KDAsOSksZ2V0UmFuZG9tSW50KDAsOSldLG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm9wdGlvbnMubGVuZ3RoKV0pXG5jb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXCJiYXR0bGVzaGlwXCIsW2dldFJhbmRvbUludCgwLDkpLGdldFJhbmRvbUludCgwLDkpXSxvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpvcHRpb25zLmxlbmd0aCldKVxuY29uc3QgY2FycmllciA9IG5ldyBTaGlwKFwiY2FycmllclwiLFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV0sb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqb3B0aW9ucy5sZW5ndGgpXSlcbmNvbXB1dGVyU2hpcHMucHVzaChwYXRyb2wsc3VibWFyaW5lLGRlc3Ryb3llcixiYXR0bGVzaGlwLGNhcnJpZXIpXG5cbi8qXG5cbmlmKHBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpIHx8IGNvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkgKSB7XG4gICAgYWxlcnQoXCJHYW1lJ3MgVVAhXCIpXG5cbiAgICBpZihwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICBhbGVydChcIkNvbXB1dGVyIFdJTlNcIilcbiAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydChcIkh1bWFuIFdJTlNcIilcbiAgICB9XG59XG4qL1xuXG5cbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoXCJQbGF5ZXIgMVwiLGNvbXB1dGVyQm9hcmQpXG5jb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJjb21wdXRlclwiLHBsYXllckJvYXJkKVxuXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgICBjb25zdCBlbmVteVNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNiLWdyaWQtaXRlbVwiKVxuICAgIFxuICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcChzaGlwKVxuICAgIH0pXG5cbiAgICBjb21wdXRlclNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKHNoaXApXG4gICAgfSlcbiAgICBjb25zb2xlLmxvZyhjb21wdXRlckJvYXJkKVxuICAgXG4gICAgZW5lbXlTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZS50YXJnZXQuZGF0YXNldC5jb29yZClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBsYXllci5hdHRhY2tPcHBvbmVudChKU09OLnBhcnNlKGUudGFyZ2V0LmRhdGFzZXQuY29vcmQpKSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbXB1dGVyLmF0dGFja09wcG9uZW50KCkpXG4gICAgICAgICAgICBwbGF5ZXJBdHRhY2tEaXNwbGF5KGNvbXB1dGVyQm9hcmQsZSlcbiAgICAgICAgICAgIGVuZW15QXR0YWNrRGlzcGxheShwbGF5ZXJCb2FyZClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmQpXG4gICAgICAgIH0se29uY2U6dHJ1ZX0pXG4gICAgfSlcblxuICAgIFxuICAgIGlmKHBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpIHx8IGNvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkgKSB7XG4gICAgICAgIGFsZXJ0KFwiR2FtZSdzIFVQIVwiKVxuICAgIFxuICAgICAgICBpZihwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgICAgYWxlcnQoXCJDb21wdXRlciBXSU5TXCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbGVydChcIkh1bWFuIFdJTlNcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuXG5cbiAgICBcbiAgICBcblxuXG4gICAgXG5cblxufVxuXG5leHBvcnQgeyBnYW1lTG9vcCB9XG4iLCIvL2NvbnN0IFNoaXAgPSByZXF1aXJlKFwiLi9zaGlwXCIpXG5cbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubWlzc2VkSGl0ID0gW11cbiAgICB0aGlzLnNoaXBzID0gW11cbiAgICB0aGlzLm9jY3VwaWVkU3BvdHMgPSBbXVxuICAgIHRoaXMucGxheWFibGVTcG90cyA9IFtdXG4gICAgdGhpcy5hdHRhY2tlZFNwb3RzID0gW11cbiAgICB0aGlzLmhpdFNwb3RzID0gW11cblxuICAgIGZvcihsZXQgeCA9IDA7eDw9OTt4KyspIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDAgOyB5PD05IDt5Kyspe1xuICAgICAgICAgICAgdGhpcy5wbGF5YWJsZVNwb3RzLnB1c2goW3kseF0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdGhpcy5wbGFjZVNoaXAgPSAoc2hpcCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGNvb3JkQ2hlY2sgPSBzaGlwLmNvb3JkLnNvbWUoKGNvb3JkKSA9PiB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLm9jY3VwaWVkU3BvdHMuc29tZShjb29yZHMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb29yZC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgaWYgKGNvb3JkQ2hlY2spIHtcbiAgICAgICAgICAgIHRocm93IFwiU2hpcCBjb29yZGluYXRlcyBhcmUgdGFrZW5cIlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApXG4gICAgICAgICAgICBzaGlwLmNvb3JkLmZvckVhY2gocG9pbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5vY2N1cGllZFNwb3RzLnB1c2gocG9pbnQpXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG5cbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuICAgIHRoaXMucmVjZWl2ZUF0dGFjayA9IChjb29yZHMpID0+IHtcbiAgICAgICAgdGhpcy5hdHRhY2tlZFNwb3RzLnB1c2goY29vcmRzKVxuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wbGF5YWJsZVNwb3RzLmZpbmRJbmRleCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpID09IEpTT04uc3RyaW5naWZ5KGNvb3JkcylcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5wbGF5YWJsZVNwb3RzLnNwbGljZShpbmRleCwxKVxuICAgICAgICBcbiAgICAgICAgICAgICAgIFxuICAgICAgICBjb25zdCBjb29yZENoZWNrID0gdGhpcy5vY2N1cGllZFNwb3RzLnNvbWUoKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgICAgICAgICAgICAgXG4gICAgICAgIGlmIChjb29yZENoZWNrKSAge1xuXG4gICAgICAgICAgICBjb25zdCBteVNoaXAgPSB0aGlzLnNoaXBzLmZpbmQoKHNoaXApID0+IHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzaGlwLmNvb3JkLmZpbmQoKGNvb3JkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb29yZC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gbXlTaGlwLmNvb3JkLmZpbmRJbmRleCgodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYodmFsLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbXlTaGlwLmhpdChpbmRleClcbiAgICAgICAgICAgIHRoaXMuaGl0U3BvdHMucHVzaChjb29yZHMpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gXCJBdHRhY2sgaGl0IGEgc2hpcFwiXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWlzc2VkSGl0LnB1c2goY29vcmRzKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gXCJBdHRhY2sgbWlzc2VkXCJcbiAgICAgICAgICAgIFxuICAgICAgICB9ICAgICAgICAgICAgIFxuXG4gICAgfVxuXG4gICAgdGhpcy5hbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG5cbiAgICAgICAgY29uc3QgZGVjaXNpb24gPSB0aGlzLnNoaXBzLmV2ZXJ5KHNoaXAgPT4ge1xuXG4gICAgICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoZGVjaXNpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cblxuICAgIFxufVxuXG5cbi8qY29uc3Qgc2hpcCA9IG5ldyBTaGlwKDMsW1syLDJdLFszLDJdLFsyLDVdLFszLDVdXSlcbmNvbnNvbGUubG9nKHNoaXAuY29vcmQpXG5mdW5jdGlvbiBmaW5kSW5kZXgoeCx5KSB7XG5cbiAgICBjb25zdCBpbmRleCAgPSB5LmZpbmRJbmRleFxuXG59IFxuXG5jb25zdCBzaGlwID0gbmV3IFNoaXAoNClcbmNvbnN0IHNoaXBDb29yZHMgPSBbWzIsMl0sWzMsMl0sWzIsNV0sWzMsNV1dXG5jb25zdCBnYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKHNoaXAsc2hpcENvb3Jkcylcbi8vY29uc29sZS5sb2coZ2FtZWJvYXJkLnBsYXlhYmxlU3BvdHMpXG5cbmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFszLDVdKVxuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soWzIsMl0pXG5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbMywyXSlcbmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFsyLDVdKVxuLy9jb25zb2xlLmxvZyhnYW1lYm9hcmQucGxheWFibGVTcG90cylcbi8vY29uc29sZS5sb2coZ2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSovXG5cblxuZXhwb3J0IHtHYW1lYm9hcmR9XG5cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWlubmVyLWRlY2xhcmF0aW9ucyAqL1xuY29uc3QgUGxheWVyID0gZnVuY3Rpb24obmFtZSxnYW1lYm9hcmQpIHtcbiAgICBcbiAgICB0aGlzLm5hbWUgPSBuYW1lLnRvVXBwZXJDYXNlKClcbiAgICB0aGlzLmdhbWVib2FyZCA9IGdhbWVib2FyZFxuXG4gICAgdGhpcy5hdHRhY2tPcHBvbmVudCA9IChjb29yZCkgPT4ge1xuICAgICAgICBpZih0aGlzLm5hbWUgPT09IFwiQ09NUFVURVJcIiApIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgY29vcmRDaGVja2VyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRDb29yZCA9IFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvb3JkQ2hlY2sgPSB0aGlzLmdhbWVib2FyZC5wbGF5YWJsZVNwb3RzLnNvbWUodmFsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbC50b1N0cmluZygpID09PSByYW5kQ29vcmQudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBpZighY29vcmRDaGVjaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRDb29yZClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5kQ29vcmQgPSBbZ2V0UmFuZG9tSW50KDAsOSksZ2V0UmFuZG9tSW50KDAsOSldXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmFuZENvb3JkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJhbmRDb29yZClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29vcmRDaGVja2VyKClcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmQpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0gYXR0YWNrZWRgXG4gICAgICAgIFxuICAgIH1cblxuICAgIFxuXG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUludChtYXgsbWluKSB7XG4gICAgbWluID0gTWF0aC5jZWlsKG1pbilcbiAgICBtYXggPSBNYXRoLmZsb29yKG1heClcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKVxufVxuXG5leHBvcnQge2dldFJhbmRvbUludCAsIFBsYXllcn1cblxuLy9tb2R1bGUuZXhwb3J0cyA9IFBsYXllclxuXG4iLCJjb25zdCBTaGlwID0gZnVuY3Rpb24obmFtZSxzQyxvcmllbnRhdGlvbikgeyAgXG4gICAgdGhpcy5uYW1lID0gbmFtZSAgXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uXG4gICAgdGhpcy5oaXRMb2NhdGlvbiA9IFtdXG4gICAgdGhpcy5zQyA9IHNDXG4gICAgXG4gICAgY29uc3Qgb3JTdHIgPSBvcmllbnRhdGlvbi50b1N0cmluZygpLnRvVXBwZXJDYXNlKClcblxuICAgIHN3aXRjaChuYW1lLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKSl7XG4gICAgICAgIGNhc2UgXCJQQVRST0xcIjpcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMlxuXG4gICAgICAgICAgICBpZihvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0rMSx0aGlzLnNDWzFdXV1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rMV1dXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiU1VCTUFSSU5FXCI6XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDNcbiAgICAgICAgICAgIGlmKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSsxLHRoaXMuc0NbMV1dLFt0aGlzLnNDWzBdKzIsdGhpcy5zQ1sxXV1dXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzFdLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rMl1dXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkRFU1RST1lFUlwiOlxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAzXG5cbiAgICAgICAgICAgIGlmKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSsxLHRoaXMuc0NbMV1dLFt0aGlzLnNDWzBdKzIsdGhpcy5zQ1sxXV1dXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzFdLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rMl1dXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJCQVRUTEVTSElQXCI6XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDRcblxuICAgICAgICAgICAgaWYob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLFt0aGlzLnNDWzBdKzEsdGhpcy5zQ1sxXV0sW3RoaXMuc0NbMF0rMix0aGlzLnNDWzFdXSxbdGhpcy5zQ1swXSszLHRoaXMuc0NbMV1dXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSsxXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzJdLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rM11dXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJDQVJSSUVSXCI6XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDVcblxuICAgICAgICAgICAgaWYob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLFt0aGlzLnNDWzBdKzEsdGhpcy5zQ1sxXV0sW3RoaXMuc0NbMF0rMix0aGlzLnNDWzFdXSxbdGhpcy5zQ1swXSszLHRoaXMuc0NbMV1dLFt0aGlzLnNDWzBdKzQsdGhpcy5zQ1sxXV1dXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzFdLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rMl0sW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSszXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzRdXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBcIkludmFsaWQgY2hvaWNlIG9mIHNoaXBcIlxuICAgICAgICAgICAgXG4gICAgfVxuXG5cblxuICAgIHRoaXMuaGl0ID0gKG51bSkgPT4ge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5oaXRMb2NhdGlvbltudW1dID0gXCJYXCJcbiAgICAgICAgdGhpcy5sZW5ndGgtLVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGBTaGlwIGlzIGhpdCBhdCBwb2ludCAke251bX1gXG4gICAgICAgXG4gICAgfVxuXG4gICAgdGhpcy5pc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhpdENoZWNrID0gdGhpcy5oaXRMb2NhdGlvbi5maWx0ZXIoKG51bSkgPT4ge1xuICAgICAgICAgICAgaWYgKG51bSA9PT0gXCJYXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIFxuICAgICAgICBpZigoaGl0Q2hlY2spICYmICh0aGlzLmxlbmd0aCA9PSAwKSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufVxuXG5leHBvcnQge1NoaXB9XG5cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAycHg7XFxufVxcbi5nYW1lYm9hcmRzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbWFyZ2luLXRvcDogMTAwcHg7XFxuICAgIFxcbn1cXG5cXG4vKi5wbGF5ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcblxcbn1cXG5cXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXJvb247XFxufSovXFxuXFxuLnBsYXllci1ib2FyZCAsIC5jb21wdXRlci1ib2FyZCB7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnBiU2VjdGlvbi1pdGVtLCAuY2JTZWN0aW9uLWl0ZW0ge1xcbiAgICB3aWR0aDogMjYwcHg7XFxuICAgIGhlaWdodDogMjYwcHg7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcXG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XFxuICAgIFxcbn1cXG5cXG4uY2ItZ3JpZC1pdGVtOmhvdmVyLCAucHMtZ3JpZC1pdGVtOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwwLDAsMC4xKTtcXG59XFxuXFxuLnBiLWdyaWQtaXRlbSwgLmNiLWdyaWQtaXRlbSwgLnBzLWdyaWQtaXRlbSB7XFxuICAgIHdpZHRoOiAyNXB4O1xcbiAgICBoZWlnaHQ6IDI1cHg7XFxuICAgIGJvcmRlcjogLjFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuZm9vdGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDA7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyOyAgICBcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFNBQVM7SUFDVCxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxhQUFhO0lBQ2IsaUJBQWlCOztBQUVyQjs7QUFFQTs7Ozs7OztFQU9FOztBQUVGO0lBQ0ksWUFBWTtJQUNaLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLGFBQWE7SUFDYixzQ0FBc0M7SUFDdEMsbUNBQW1DO0lBQ25DLHNCQUFzQjtJQUN0QixvQkFBb0I7O0FBRXhCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixlQUFlO0lBQ2YsU0FBUztJQUNULFlBQVk7SUFDWixrQkFBa0I7QUFDdEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAycHg7XFxufVxcbi5nYW1lYm9hcmRzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbWFyZ2luLXRvcDogMTAwcHg7XFxuICAgIFxcbn1cXG5cXG4vKi5wbGF5ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcblxcbn1cXG5cXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXJvb247XFxufSovXFxuXFxuLnBsYXllci1ib2FyZCAsIC5jb21wdXRlci1ib2FyZCB7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnBiU2VjdGlvbi1pdGVtLCAuY2JTZWN0aW9uLWl0ZW0ge1xcbiAgICB3aWR0aDogMjYwcHg7XFxuICAgIGhlaWdodDogMjYwcHg7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcXG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XFxuICAgIFxcbn1cXG5cXG4uY2ItZ3JpZC1pdGVtOmhvdmVyLCAucHMtZ3JpZC1pdGVtOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwwLDAsMC4xKTtcXG59XFxuXFxuLnBiLWdyaWQtaXRlbSwgLmNiLWdyaWQtaXRlbSwgLnBzLWdyaWQtaXRlbSB7XFxuICAgIHdpZHRoOiAyNXB4O1xcbiAgICBoZWlnaHQ6IDI1cHg7XFxuICAgIGJvcmRlcjogLjFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuZm9vdGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDA7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyOyAgICBcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJ1xuaW1wb3J0ICcuL21vZHVsZXMvRE9NJ1xuaW1wb3J0ICcuL21vZHVsZXMvY29udHJvbGxlciciXSwibmFtZXMiOlsiU2hpcCIsImdhbWVMb29wIiwicGJTZWN0aW9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2JTZWN0aW9uIiwicGxhY2VTaGlwU2VjdGlvbiIsInNoaXBzIiwib2NjdXBpZWRTcG90cyIsImNvdW50IiwiY3JlYXRlUGxheWVyR3JpZCIsInBncmlkQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsIngiLCJkaXYiLCJhcHBlbmRDaGlsZCIsImlkR3JpZHMiLCJwbGF5ZXJTcXVhcmVzIiwicXVlcnlTZWxlY3RvckFsbCIsInBvcHVsYXRlUGxheWVyQm9hcmQiLCJvcmllbnRhdGlvblRvZ2dsZSIsImZvcm0iLCJmaWVsZHNldCIsImxlZ2VuZCIsInRleHRDb250ZW50IiwidG9nZ2xlMSIsInRvZ2dsZTIiLCJ2VG9nZ2xlIiwiaFRvZ2dsZSIsImxhYmVsMSIsImxhYmVsMiIsImZvciIsInR5cGUiLCJpZCIsInZhbHVlIiwiY2hlY2tlZCIsIm5hbWUiLCJwbGFjZVNoaXBHcmlkIiwicGxTaGlwQ29udGFpbmVyIiwiY3JlYXRlRW5lbXlHcmlkIiwiY2dyaWRDb250YWluZXIiLCJzZWxlY3RvciIsImdyaWRpdGVtcyIsIm15QXJyIiwieSIsInB1c2giLCJzZXRBdHRyaWJ1dGUiLCJmb3JFYWNoIiwic2hpcCIsImNvb3JkIiwic3F1YXJlIiwiZGF0YXNldCIsInRvU3RyaW5nIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwbGF5ZXJBdHRhY2tEaXNwbGF5Iiwib2JqIiwiZSIsImF0dGFja2VkU3BvdHMiLCJjb29yZENoZWNrMSIsInNvbWUiLCJ0YXJnZXQiLCJjb29yZENoZWNrMiIsImNvbnNvbGUiLCJsb2ciLCJlbmVteUF0dGFja0Rpc3BsYXkiLCJtaXNzZWRIaXRzIiwibWlzc2VkSGl0IiwiaGl0U3BvdHMiLCJjcmVhdGVTaGlwcyIsIm9yaWVudGF0aW9uIiwiY29vcmRzIiwiSlNPTiIsInBhcnNlIiwicGF0cm9sIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwiYmF0dGxlc2hpcCIsImNhcnJpZXIiLCJhZGRFdmVudExpc3RlbmVyIiwib25jZSIsImdldFJhbmRvbUludCIsIlBsYXllciIsIkdhbWVib2FyZCIsIm9wdGlvbnMiLCJjb21wdXRlclNoaXBzIiwicGxheWVyQm9hcmQiLCJjb21wdXRlckJvYXJkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwicGxheWVyIiwiY29tcHV0ZXIiLCJlbmVteVNxdWFyZXMiLCJwbGFjZVNoaXAiLCJhdHRhY2tPcHBvbmVudCIsImFsbFNoaXBzU3VuayIsImFsZXJ0IiwicGxheWFibGVTcG90cyIsImNvb3JkQ2hlY2siLCJwb2ludCIsInJlY2VpdmVBdHRhY2siLCJpbmRleCIsImZpbmRJbmRleCIsImVsZW1lbnQiLCJzdHJpbmdpZnkiLCJzcGxpY2UiLCJ2YWwiLCJteVNoaXAiLCJmaW5kIiwiaGl0IiwiZGVjaXNpb24iLCJldmVyeSIsImlzU3VuayIsImdhbWVib2FyZCIsInRvVXBwZXJDYXNlIiwiY29vcmRDaGVja2VyIiwicmFuZENvb3JkIiwibWF4IiwibWluIiwiY2VpbCIsInNDIiwiaGl0TG9jYXRpb24iLCJvclN0ciIsIm51bSIsImhpdENoZWNrIiwiZmlsdGVyIl0sInNvdXJjZVJvb3QiOiIifQ==