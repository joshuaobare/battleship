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
    /* try {
         computerBoard.placeShip(ship)
     } catch{
         try{
             const newShip = new Ship (ship.name,[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
             computerBoard.placeShip(newShip)
         }catch{
             try {
                 const newShip = new Ship (ship.name,[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
                 computerBoard.placeShip(newShip)
             }catch{
                 
               try {
                 const newShip = new Ship (ship.name,[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
                 computerBoard.placeShip(newShip)
               } catch {
                 try {
                     const newShip = new Ship (ship.name,[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
                     computerBoard.placeShip(newShip)
                   } catch {
                     const newShip = new Ship (ship.name,[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
                     computerBoard.placeShip(newShip)
                 }
             }
             }
         }
     } */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuaW1wb3J0IHtTaGlwfSBmcm9tICcuL3NoaXAnXG5pbXBvcnQgeyBnYW1lTG9vcCB9IGZyb20gXCIuL2NvbnRyb2xsZXJcIlxuXG5cblxuY29uc3QgcGJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXItYm9hcmRcIilcbmNvbnN0IGNiU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tcHV0ZXItYm9hcmRcIilcbmNvbnN0IHBsYWNlU2hpcFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYWNlU2hpcHNcIilcbmxldCBzaGlwcyA9IFtdXG5sZXQgb2NjdXBpZWRTcG90cyA9IFtdXG5sZXQgY291bnQgPSAwXG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckdyaWQoKSB7XG4gICAgY29uc3QgcGdyaWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgXG4gICAgcGdyaWRDb250YWluZXIuY2xhc3NOYW1lID0gXCJwYlNlY3Rpb24taXRlbVwiXG4gICAgXG4gICAgZm9yKGxldCB4PTA7IHg8PTk5IDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwicGItZ3JpZC1pdGVtXCJcbiAgICAgICAgcGdyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KVxuICAgIH1cblxuICAgICBcbiAgICBwYlNlY3Rpb24uYXBwZW5kQ2hpbGQocGdyaWRDb250YWluZXIpXG4gICAgaWRHcmlkcyhcIi5wYi1ncmlkLWl0ZW1cIilcbiAgICBjb25zdCBwbGF5ZXJTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wYi1ncmlkLWl0ZW1cIilcbiAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpXG4gICAgXG59XG5mdW5jdGlvbiBvcmllbnRhdGlvblRvZ2dsZSgpIHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIilcbiAgICBjb25zdCBmaWVsZHNldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKVxuICAgIGNvbnN0IGxlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIilcbiAgICBsZWdlbmQudGV4dENvbnRlbnQgPSBcIk9yaWVudGF0aW9uXCJcbiAgICBjb25zdCB0b2dnbGUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgIGNvbnN0IHRvZ2dsZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgY29uc3QgdlRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuICAgIGNvbnN0IGhUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbiAgICBjb25zdCBsYWJlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcbiAgICBjb25zdCBsYWJlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcbiAgICBsYWJlbDEuZm9yID0gXCJWXCJcbiAgICBsYWJlbDIuZm9yID0gXCJIXCJcbiAgICBsYWJlbDEudGV4dENvbnRlbnQgPSBcIlZlcnRpY2FsOiBcIlxuICAgIGxhYmVsMi50ZXh0Q29udGVudCA9IFwiSG9yaXpvbnRhbDogXCJcbiAgICB2VG9nZ2xlLnR5cGUgPSBcInJhZGlvXCJcbiAgICB2VG9nZ2xlLmlkID0gXCJWXCJcbiAgICB2VG9nZ2xlLnZhbHVlID0gXCJWXCJcbiAgICB2VG9nZ2xlLmNoZWNrZWQgPSB0cnVlXG4gICAgdlRvZ2dsZS5uYW1lID0gXCJvcmllbnRhdGlvblwiXG4gICAgaFRvZ2dsZS50eXBlID0gXCJyYWRpb1wiXG4gICAgaFRvZ2dsZS5pZCA9IFwiSFwiXG4gICAgaFRvZ2dsZS52YWx1ZSA9IFwiSFwiXG4gICAgaFRvZ2dsZS5uYW1lID0gXCJvcmllbnRhdGlvblwiXG4gICAgXG4gICAgdG9nZ2xlMS5hcHBlbmRDaGlsZChsYWJlbDEpXG4gICAgdG9nZ2xlMS5hcHBlbmRDaGlsZCh2VG9nZ2xlKVxuICAgIHRvZ2dsZTIuYXBwZW5kQ2hpbGQobGFiZWwyKVxuICAgIHRvZ2dsZTIuYXBwZW5kQ2hpbGQoaFRvZ2dsZSlcbiAgICBmaWVsZHNldC5hcHBlbmRDaGlsZChsZWdlbmQpXG4gICAgZmllbGRzZXQuYXBwZW5kQ2hpbGQodG9nZ2xlMSlcbiAgICBmaWVsZHNldC5hcHBlbmRDaGlsZCh0b2dnbGUyKVxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZmllbGRzZXQpXG4gICAgXG4gICAgcGxhY2VTaGlwU2VjdGlvbi5hcHBlbmRDaGlsZChmb3JtKVxufVxuXG5mdW5jdGlvbiBwbGFjZVNoaXBHcmlkKCkge1xuICAgIGNvbnN0IHBsU2hpcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBcbiAgICBcbiAgICBwbFNoaXBDb250YWluZXIuY2xhc3NOYW1lID0gXCJwYlNlY3Rpb24taXRlbVwiXG4gICAgXG4gICAgZm9yKGxldCB4PTA7IHg8PTk5IDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwicHMtZ3JpZC1pdGVtXCJcbiAgICAgICAgcGxTaGlwQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdilcbiAgICB9XG4gICAgb3JpZW50YXRpb25Ub2dnbGUoKVxuICAgIHBsYWNlU2hpcFNlY3Rpb24uYXBwZW5kQ2hpbGQocGxTaGlwQ29udGFpbmVyKVxuICAgIGlkR3JpZHMoXCIucHMtZ3JpZC1pdGVtXCIpXG59XG5cblxuZnVuY3Rpb24gY3JlYXRlRW5lbXlHcmlkKCkge1xuICAgIGNvbnN0IGNncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgIGNncmlkQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiY2JTZWN0aW9uLWl0ZW1cIlxuICAgIGZvcihsZXQgeD0wOyB4PD05OSA7IHgrKykge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIGRpdi5jbGFzc05hbWUgPSBgY2ItZ3JpZC1pdGVtYCBcblxuICAgICAgICBjZ3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpXG4gICAgfVxuICAgIGNiU2VjdGlvbi5hcHBlbmRDaGlsZChjZ3JpZENvbnRhaW5lcilcbiAgICBpZEdyaWRzKFwiLmNiLWdyaWQtaXRlbVwiKVxufVxuXG5mdW5jdGlvbiBpZEdyaWRzKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgZ3JpZGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcilcbiAgICBsZXQgbXlBcnIgPSBbXVxuXG4gICAgZm9yKGxldCB4ID0gMDt4PD05O3grKykge1xuICAgICAgICBmb3IgKGxldCB5ID0gMCA7IHk8PTkgO3krKyl7XG4gICAgICAgICAgICBteUFyci5wdXNoKFt5LHhdKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKGxldCB4PTAgOyB4PDEwMDt4KyspIHtcbiAgICAgICAgZ3JpZGl0ZW1zW3hdLnNldEF0dHJpYnV0ZShcImRhdGEtY29vcmRcIixgWyR7bXlBcnJbeF19XWApXG4gICAgfSBcbn0gICAgXG5wbGFjZVNoaXBHcmlkKClcbmNvbnN0IHBsYXllclNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBzLWdyaWQtaXRlbVwiKVxuXG4vKmNvbnN0IHBvcHVsYXRlUGxheWVyQm9hcmQgPSAoKCkgPT4ge1xuICAgIGNvbnN0IHBhdHJvbCA9IG5ldyBTaGlwKFwicGF0cm9sXCIsWzQsM10sXCJWXCIpXG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoXCJzdWJtYXJpbmVcIixbMSwxXSxcIlZcIilcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcChcImRlc3Ryb3llclwiLFsxLDFdLFwiSFwiKVxuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcChcImJhdHRsZXNoaXBcIixbMiw1XSxcIkhcIilcbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoXCJjYXJyaWVyXCIsWzIsNV0sXCJWXCIpXG5cbiAgICAvKnNoaXBzLnB1c2gocGF0cm9sKVxuICAgIHNoaXBzLnB1c2goc3VibWFyaW5lKVxuICAgIHNoaXBzLnB1c2goZGVzdHJveWVyKVxuICAgIHNoaXBzLnB1c2goYmF0dGxlc2hpcClcbiAgICBzaGlwcy5wdXNoKGNhcnJpZXIpXG59KSgpXG5cblxucGxheWVyU3F1YXJlcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb3VudCArPTFcblxuICAgIGlmKGNvdW50ID09IDUpIHtcbiAgICAgICAgcGxheWVyU3F1YXJlcy5yZW1vdmVFdmVudExpc3RlbmVyKClcbiAgICB9XG5cbn0pKi9cblxuZnVuY3Rpb24gcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKXtcbiAgICBcblxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgc2hpcC5jb29yZC5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICAgICAgb2NjdXBpZWRTcG90cy5wdXNoKGBbJHtjb29yZH1dYClcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgcGxheWVyU3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgICBvY2N1cGllZFNwb3RzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmQudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcGxheWVyQXR0YWNrRGlzcGxheShvYmosZSkge1xuICAgIGNvbnN0IGF0dGFja2VkU3BvdHMgPSBvYmouYXR0YWNrZWRTcG90c1xuICAgIGNvbnN0IG9jY3VwaWVkU3BvdHMgPSBvYmoub2NjdXBpZWRTcG90c1xuXG4gICAgY29uc3QgY29vcmRDaGVjazEgPSBhdHRhY2tlZFNwb3RzLnNvbWUoKGNvb3JkKSA9PiB7XG4gICAgICAgIFxuICAgICAgIHJldHVybiBlLnRhcmdldC5kYXRhc2V0LmNvb3JkLnRvU3RyaW5nKCkgPT09IGBbJHtjb29yZC50b1N0cmluZygpfV1gXG4gICAgfSlcbiAgICBjb25zdCBjb29yZENoZWNrMiA9IG9jY3VwaWVkU3BvdHMuc29tZSgoY29vcmQpID0+IHtcbiAgICAgICAgcmV0dXJuIGUudGFyZ2V0LmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gYFske2Nvb3JkLnRvU3RyaW5nKCl9XWBcbiAgICB9KVxuICAgIGNvbnNvbGUubG9nKGNvb3JkQ2hlY2sxLGNvb3JkQ2hlY2syKVxuICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQuY29vcmQpXG5cbiAgICBpZihjb29yZENoZWNrMSAmJiBjb29yZENoZWNrMikge1xuICAgICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiXG4gICAgfSBlbHNlIGlmICgoY29vcmRDaGVjazEpICYmICEoY29vcmRDaGVjazIpKSB7XG4gICAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRza3libHVlXCJcbiAgICB9XG5cblxufVxuXG5mdW5jdGlvbiBlbmVteUF0dGFja0Rpc3BsYXkob2JqKSB7XG5cbiAgICBjb25zdCBtaXNzZWRIaXRzID0gb2JqLm1pc3NlZEhpdFxuICAgIGNvbnN0IGhpdFNwb3RzID0gb2JqLmhpdFNwb3RzXG4gICAgY29uc3QgcGxheWVyU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGItZ3JpZC1pdGVtXCIpXG5cbiAgICBwbGF5ZXJTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgbWlzc2VkSGl0cy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuY29vcmQudG9TdHJpbmcoKSA9PT0gYFske2Nvb3JkLnRvU3RyaW5nKCl9XWApIHtcbiAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coKVxuICAgICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRza3libHVlXCJcbiAgICAgICAgICAgfVxuICAgICAgIH0pXG5cbiAgICAgIFxuICAgIH0pXG5cbiAgIHBsYXllclNxdWFyZXMuZm9yRWFjaChzcXVhcmUgPT4ge1xuICAgICAgICBoaXRTcG90cy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNxdWFyZS5kYXRhc2V0LmNvb3JkLnRvU3RyaW5nKCkgPT09IGBbJHtjb29yZC50b1N0cmluZygpfV1gKSB7XG4gICAgICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICBcbiAgICB9KVxuXG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlU2hpcHMoZSl7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwib3JpZW50YXRpb25cIl06Y2hlY2tlZCcpLnZhbHVlXG4gICAgY29uc3QgY29vcmRzID0gSlNPTi5wYXJzZShlLnRhcmdldC5kYXRhc2V0LmNvb3JkKVxuICAgIGxldCBwYXRyb2wsc3VibWFyaW5lLCBkZXN0cm95ZXIsIGJhdHRsZXNoaXAsIGNhcnJpZXJcblxuICAgIHN3aXRjaChjb3VudCl7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHBhdHJvbCA9IG5ldyBTaGlwKFwicGF0cm9sXCIsY29vcmRzLG9yaWVudGF0aW9uKVxuICAgICAgICAgICAgc2hpcHMucHVzaChwYXRyb2wpXG4gICAgICAgICAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBzdWJtYXJpbmUgPSBuZXcgU2hpcChcInN1Ym1hcmluZVwiLGNvb3JkcyxvcmllbnRhdGlvbilcbiAgICAgICAgICAgIHNoaXBzLnB1c2goc3VibWFyaW5lKVxuICAgICAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgZGVzdHJveWVyID0gbmV3IFNoaXAoXCJkZXN0cm95ZXJcIixjb29yZHMsb3JpZW50YXRpb24pXG4gICAgICAgICAgICBzaGlwcy5wdXNoKGRlc3Ryb3llcilcbiAgICAgICAgICAgIHBvcHVsYXRlUGxheWVyQm9hcmQocGxheWVyU3F1YXJlcylcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGJhdHRsZXNoaXAgPSBuZXcgU2hpcChcImJhdHRsZXNoaXBcIixjb29yZHMsb3JpZW50YXRpb24pXG4gICAgICAgICAgICBzaGlwcy5wdXNoKGJhdHRsZXNoaXApXG4gICAgICAgICAgICBwb3B1bGF0ZVBsYXllckJvYXJkKHBsYXllclNxdWFyZXMpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICBjYXJyaWVyID0gbmV3IFNoaXAoXCJjYXJyaWVyXCIsY29vcmRzLG9yaWVudGF0aW9uKVxuICAgICAgICAgICAgc2hpcHMucHVzaChjYXJyaWVyKVxuICAgICAgICAgICAgcG9wdWxhdGVQbGF5ZXJCb2FyZChwbGF5ZXJTcXVhcmVzKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBicmVha1xuICAgIH1cbiAgICAgICAgaWYgKGNvdW50ID09PSA1KSB7XG4gICAgICAgICAgICBjcmVhdGVQbGF5ZXJHcmlkKClcbiAgICAgICAgICAgIGNyZWF0ZUVuZW15R3JpZCgpXG4gICAgICAgICAgICBnYW1lTG9vcCgpXG4gICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuXG4gICAgICAgIFxuICAgIGNvbnNvbGUubG9nKHNoaXBzKVxuICAgIGNvdW50ICs9MVxufVxuXG5wbGF5ZXJTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNyZWF0ZVNoaXBzKGUpXG4gICAgICAgIFxuICAgIH0se29uY2U6dHJ1ZX0pXG59KVxuXG5cblxuXG4vKlxuKi9cblxuZXhwb3J0IHsgc2hpcHMgLCBwbGF5ZXJBdHRhY2tEaXNwbGF5LCBlbmVteUF0dGFja0Rpc3BsYXkgfSIsImltcG9ydCB7IHNoaXBzICwgcGxheWVyQXR0YWNrRGlzcGxheSwgZW5lbXlBdHRhY2tEaXNwbGF5IH0gZnJvbSBcIi4vRE9NXCJcbmltcG9ydCB7IGdldFJhbmRvbUludCAsIFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIlxuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIlxuXG5cbmNvbnN0IG9wdGlvbnMgPSBbXCJWXCIsXCJIXCJdXG5jb25zdCBjb21wdXRlclNoaXBzID0gW11cbmNvbnN0IHBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpXG5jb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZCgpXG5jb25zdCBwYXRyb2wgPSBuZXcgU2hpcChcInBhdHJvbFwiLFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV0sb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqb3B0aW9ucy5sZW5ndGgpXSlcbmNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKFwic3VibWFyaW5lXCIsW2dldFJhbmRvbUludCgwLDkpLGdldFJhbmRvbUludCgwLDkpXSxvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpvcHRpb25zLmxlbmd0aCldKVxuY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoXCJkZXN0cm95ZXJcIixbZ2V0UmFuZG9tSW50KDAsOSksZ2V0UmFuZG9tSW50KDAsOSldLG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm9wdGlvbnMubGVuZ3RoKV0pXG5jb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXCJiYXR0bGVzaGlwXCIsW2dldFJhbmRvbUludCgwLDkpLGdldFJhbmRvbUludCgwLDkpXSxvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpvcHRpb25zLmxlbmd0aCldKVxuY29uc3QgY2FycmllciA9IG5ldyBTaGlwKFwiY2FycmllclwiLFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV0sb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqb3B0aW9ucy5sZW5ndGgpXSlcbmNvbXB1dGVyU2hpcHMucHVzaChwYXRyb2wsc3VibWFyaW5lLGRlc3Ryb3llcixiYXR0bGVzaGlwLGNhcnJpZXIpXG5cbi8qXG5cbmlmKHBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpIHx8IGNvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkgKSB7XG4gICAgYWxlcnQoXCJHYW1lJ3MgVVAhXCIpXG5cbiAgICBpZihwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICBhbGVydChcIkNvbXB1dGVyIFdJTlNcIilcbiAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydChcIkh1bWFuIFdJTlNcIilcbiAgICB9XG59XG4qL1xuXG5cbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoXCJQbGF5ZXIgMVwiLGNvbXB1dGVyQm9hcmQpXG5jb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJjb21wdXRlclwiLHBsYXllckJvYXJkKVxuXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgICBjb25zdCBlbmVteVNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNiLWdyaWQtaXRlbVwiKVxuICAgIFxuICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcChzaGlwKVxuICAgIH0pXG5cbiAgICBjb21wdXRlclNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgLyogdHJ5IHtcbiAgICAgICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKHNoaXApXG4gICAgICAgIH0gY2F0Y2h7XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U2hpcCA9IG5ldyBTaGlwIChzaGlwLm5hbWUsW2dldFJhbmRvbUludCgwLDkpLGdldFJhbmRvbUludCgwLDkpXSxvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpvcHRpb25zLmxlbmd0aCldKVxuICAgICAgICAgICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKG5ld1NoaXApXG4gICAgICAgICAgICB9Y2F0Y2h7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3U2hpcCA9IG5ldyBTaGlwIChzaGlwLm5hbWUsW2dldFJhbmRvbUludCgwLDkpLGdldFJhbmRvbUludCgwLDkpXSxvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpvcHRpb25zLmxlbmd0aCldKVxuICAgICAgICAgICAgICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChuZXdTaGlwKVxuICAgICAgICAgICAgICAgIH1jYXRjaHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAgKHNoaXAubmFtZSxbZ2V0UmFuZG9tSW50KDAsOSksZ2V0UmFuZG9tSW50KDAsOSldLG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm9wdGlvbnMubGVuZ3RoKV0pXG4gICAgICAgICAgICAgICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKG5ld1NoaXApXG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1NoaXAgPSBuZXcgU2hpcCAoc2hpcC5uYW1lLFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV0sb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqb3B0aW9ucy5sZW5ndGgpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKG5ld1NoaXApXG4gICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAgKHNoaXAubmFtZSxbZ2V0UmFuZG9tSW50KDAsOSksZ2V0UmFuZG9tSW50KDAsOSldLG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm9wdGlvbnMubGVuZ3RoKV0pXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChuZXdTaGlwKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAqL1xuICAgICAgICByY1BsYWNlU2hpcChjb21wdXRlckJvYXJkLHNoaXApXG5cbiAgICAgICAgXG5cblxuXG4gICAgICAgIFxuICAgIH0pXG4gICAgY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZClcbiAgIFxuICAgIGVuZW15U3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQuY29vcmQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIuYXR0YWNrT3Bwb25lbnQoSlNPTi5wYXJzZShlLnRhcmdldC5kYXRhc2V0LmNvb3JkKSkpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb21wdXRlci5hdHRhY2tPcHBvbmVudCgpKVxuICAgICAgICAgICAgcGxheWVyQXR0YWNrRGlzcGxheShjb21wdXRlckJvYXJkLGUpXG4gICAgICAgICAgICBlbmVteUF0dGFja0Rpc3BsYXkocGxheWVyQm9hcmQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb21wdXRlckJvYXJkKVxuICAgICAgICB9LHtvbmNlOnRydWV9KVxuICAgIH0pXG5cbiAgICBcbiAgICBpZihwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSB8fCBjb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpICkge1xuICAgICAgICBhbGVydChcIkdhbWUncyBVUCFcIilcbiAgICBcbiAgICAgICAgaWYocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiQ29tcHV0ZXIgV0lOU1wiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoXCJIdW1hbiBXSU5TXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcblxuXG4gICAgXG4gICAgXG5cblxuICAgIFxuXG5cbn1cblxuXG5mdW5jdGlvbiByY1BsYWNlU2hpcChnYW1lYm9hcmQsc2hpcCl7XG4gICAgdHJ5IHtcbiAgICAgICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwKVxuICAgIH0gY2F0Y2gge1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAgKHNoaXAubmFtZSxbZ2V0UmFuZG9tSW50KDAsOSksZ2V0UmFuZG9tSW50KDAsOSldLG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm9wdGlvbnMubGVuZ3RoKV0pXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdTaGlwKVxuICAgICAgICAgICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChuZXdTaGlwKVxuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHJjUGxhY2VTaGlwKGdhbWVib2FyZCwgc2hpcClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBcbn1cblxuZXhwb3J0IHsgZ2FtZUxvb3AgfVxuIiwiLy9jb25zdCBTaGlwID0gcmVxdWlyZShcIi4vc2hpcFwiKVxuXG5jb25zdCBHYW1lYm9hcmQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLm1pc3NlZEhpdCA9IFtdXG4gICAgdGhpcy5zaGlwcyA9IFtdXG4gICAgdGhpcy5vY2N1cGllZFNwb3RzID0gW11cbiAgICB0aGlzLnBsYXlhYmxlU3BvdHMgPSBbXVxuICAgIHRoaXMuYXR0YWNrZWRTcG90cyA9IFtdXG4gICAgdGhpcy5oaXRTcG90cyA9IFtdXG5cbiAgICBmb3IobGV0IHggPSAwO3g8PTk7eCsrKSB7XG4gICAgICAgIGZvciAobGV0IHkgPSAwIDsgeTw9OSA7eSsrKXtcbiAgICAgICAgICAgIHRoaXMucGxheWFibGVTcG90cy5wdXNoKFt5LHhdKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHRoaXMucGxhY2VTaGlwID0gKHNoaXApID0+IHtcblxuICAgICAgICBjb25zdCBvY2N1cGllZFNwb3RDaGVjayA9IHNoaXAuY29vcmQuc29tZSgoY29vcmQpID0+IHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMub2NjdXBpZWRTcG90cy5zb21lKGNvb3JkcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvb3JkLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpKSB7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHBsYXlhYmxlU3BvdENoZWNrID0gc2hpcC5jb29yZC5ldmVyeSgoY29vcmQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXlhYmxlU3BvdHMuc29tZShjb29yZHMgPT4ge1xuICAgICAgICAgICAgICAgICBpZiAoY29vcmQudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpIHsgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9KVxuICAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIGlmIChvY2N1cGllZFNwb3RDaGVjaykge1xuICAgICAgICAgICAgdGhyb3cgXCJTaGlwIGNvb3JkaW5hdGVzIGFyZSB0YWtlblwiXG4gICAgICAgIH0gZWxzZSBpZiAoIXBsYXlhYmxlU3BvdENoZWNrKSB7XG4gICAgICAgICAgICB0aHJvdyBcIlNoaXAgY29vcmRpbmF0ZXMgYXJlIG91dCBvZiBib3VuZHNcIlxuICAgICAgICB9ICAgICAgXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApXG4gICAgICAgICAgICBzaGlwLmNvb3JkLmZvckVhY2gocG9pbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5vY2N1cGllZFNwb3RzLnB1c2gocG9pbnQpXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG5cbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuICAgIHRoaXMucmVjZWl2ZUF0dGFjayA9IChjb29yZHMpID0+IHtcbiAgICAgICAgdGhpcy5hdHRhY2tlZFNwb3RzLnB1c2goY29vcmRzKVxuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wbGF5YWJsZVNwb3RzLmZpbmRJbmRleCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpID09IEpTT04uc3RyaW5naWZ5KGNvb3JkcylcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5wbGF5YWJsZVNwb3RzLnNwbGljZShpbmRleCwxKVxuICAgICAgICBcbiAgICAgICAgICAgICAgIFxuICAgICAgICBjb25zdCBjb29yZENoZWNrID0gdGhpcy5vY2N1cGllZFNwb3RzLnNvbWUoKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgICAgICAgICAgICAgXG4gICAgICAgIGlmIChjb29yZENoZWNrKSAge1xuXG4gICAgICAgICAgICBjb25zdCBteVNoaXAgPSB0aGlzLnNoaXBzLmZpbmQoKHNoaXApID0+IHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzaGlwLmNvb3JkLmZpbmQoKGNvb3JkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb29yZC50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gbXlTaGlwLmNvb3JkLmZpbmRJbmRleCgodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYodmFsLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbXlTaGlwLmhpdChpbmRleClcbiAgICAgICAgICAgIHRoaXMuaGl0U3BvdHMucHVzaChjb29yZHMpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gXCJBdHRhY2sgaGl0IGEgc2hpcFwiXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWlzc2VkSGl0LnB1c2goY29vcmRzKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gXCJBdHRhY2sgbWlzc2VkXCJcbiAgICAgICAgICAgIFxuICAgICAgICB9ICAgICAgICAgICAgIFxuXG4gICAgfVxuXG4gICAgdGhpcy5hbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG5cbiAgICAgICAgY29uc3QgZGVjaXNpb24gPSB0aGlzLnNoaXBzLmV2ZXJ5KHNoaXAgPT4ge1xuXG4gICAgICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoZGVjaXNpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cblxuICAgIFxufVxuXG5cbi8qY29uc3Qgc2hpcCA9IG5ldyBTaGlwKDMsW1syLDJdLFszLDJdLFsyLDVdLFszLDVdXSlcbmNvbnNvbGUubG9nKHNoaXAuY29vcmQpXG5mdW5jdGlvbiBmaW5kSW5kZXgoeCx5KSB7XG5cbiAgICBjb25zdCBpbmRleCAgPSB5LmZpbmRJbmRleFxuXG59IFxuXG5jb25zdCBzaGlwID0gbmV3IFNoaXAoNClcbmNvbnN0IHNoaXBDb29yZHMgPSBbWzIsMl0sWzMsMl0sWzIsNV0sWzMsNV1dXG5jb25zdCBnYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKHNoaXAsc2hpcENvb3Jkcylcbi8vY29uc29sZS5sb2coZ2FtZWJvYXJkLnBsYXlhYmxlU3BvdHMpXG5cbmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFszLDVdKVxuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soWzIsMl0pXG5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbMywyXSlcbmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFsyLDVdKVxuLy9jb25zb2xlLmxvZyhnYW1lYm9hcmQucGxheWFibGVTcG90cylcbi8vY29uc29sZS5sb2coZ2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSovXG5cblxuZXhwb3J0IHtHYW1lYm9hcmR9XG5cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWlubmVyLWRlY2xhcmF0aW9ucyAqL1xuY29uc3QgUGxheWVyID0gZnVuY3Rpb24obmFtZSxnYW1lYm9hcmQpIHtcbiAgICBcbiAgICB0aGlzLm5hbWUgPSBuYW1lLnRvVXBwZXJDYXNlKClcbiAgICB0aGlzLmdhbWVib2FyZCA9IGdhbWVib2FyZFxuXG4gICAgdGhpcy5hdHRhY2tPcHBvbmVudCA9IChjb29yZCkgPT4ge1xuICAgICAgICBpZih0aGlzLm5hbWUgPT09IFwiQ09NUFVURVJcIiApIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgY29vcmRDaGVja2VyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRDb29yZCA9IFtnZXRSYW5kb21JbnQoMCw5KSxnZXRSYW5kb21JbnQoMCw5KV1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvb3JkQ2hlY2sgPSB0aGlzLmdhbWVib2FyZC5wbGF5YWJsZVNwb3RzLnNvbWUodmFsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbC50b1N0cmluZygpID09PSByYW5kQ29vcmQudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBpZighY29vcmRDaGVjaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRDb29yZClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5kQ29vcmQgPSBbZ2V0UmFuZG9tSW50KDAsOSksZ2V0UmFuZG9tSW50KDAsOSldXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmFuZENvb3JkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyYW5kQ29vcmQpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvb3JkQ2hlY2tlcigpXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IGF0dGFja2VkIGF0ICR7Y29vcmR9YFxuICAgICAgICBcbiAgICB9XG5cbiAgICBcblxufVxuXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWF4LG1pbikge1xuICAgIG1pbiA9IE1hdGguY2VpbChtaW4pXG4gICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbn1cblxuZXhwb3J0IHtnZXRSYW5kb21JbnQgLCBQbGF5ZXJ9XG5cbi8vbW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJcblxuIiwiY29uc3QgU2hpcCA9IGZ1bmN0aW9uKG5hbWUsc0Msb3JpZW50YXRpb24pIHsgIFxuICAgIHRoaXMubmFtZSA9IG5hbWUgIFxuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvblxuICAgIHRoaXMuaGl0TG9jYXRpb24gPSBbXVxuICAgIHRoaXMuc0MgPSBzQ1xuICAgIFxuICAgIGNvbnN0IG9yU3RyID0gb3JpZW50YXRpb24udG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpXG5cbiAgICBzd2l0Y2gobmFtZS50b1N0cmluZygpLnRvVXBwZXJDYXNlKCkpe1xuICAgICAgICBjYXNlIFwiUEFUUk9MXCI6XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDJcblxuICAgICAgICAgICAgaWYob3JTdHIgPT09IFwiSFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLFt0aGlzLnNDWzBdKzEsdGhpcy5zQ1sxXV1dXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzFdXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIlNVQk1BUklORVwiOlxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAzXG4gICAgICAgICAgICBpZihvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0rMSx0aGlzLnNDWzFdXSxbdGhpcy5zQ1swXSsyLHRoaXMuc0NbMV1dXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSsxXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzJdXVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJERVNUUk9ZRVJcIjpcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gM1xuXG4gICAgICAgICAgICBpZihvclN0ciA9PT0gXCJIXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0rMSx0aGlzLnNDWzFdXSxbdGhpcy5zQ1swXSsyLHRoaXMuc0NbMV1dXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSsxXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzJdXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQkFUVExFU0hJUFwiOlxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSA0XG5cbiAgICAgICAgICAgIGlmKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSsxLHRoaXMuc0NbMV1dLFt0aGlzLnNDWzBdKzIsdGhpcy5zQ1sxXV0sW3RoaXMuc0NbMF0rMyx0aGlzLnNDWzFdXV1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZCA9IFt0aGlzLnNDLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rMV0sW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSsyXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzNdXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQ0FSUklFUlwiOlxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSA1XG5cbiAgICAgICAgICAgIGlmKG9yU3RyID09PSBcIkhcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmQgPSBbdGhpcy5zQyxbdGhpcy5zQ1swXSsxLHRoaXMuc0NbMV1dLFt0aGlzLnNDWzBdKzIsdGhpcy5zQ1sxXV0sW3RoaXMuc0NbMF0rMyx0aGlzLnNDWzFdXSxbdGhpcy5zQ1swXSs0LHRoaXMuc0NbMV1dXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3JkID0gW3RoaXMuc0MsW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSsxXSxbdGhpcy5zQ1swXSx0aGlzLnNDWzFdKzJdLFt0aGlzLnNDWzBdLHRoaXMuc0NbMV0rM10sW3RoaXMuc0NbMF0sdGhpcy5zQ1sxXSs0XV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gXCJJbnZhbGlkIGNob2ljZSBvZiBzaGlwXCJcbiAgICAgICAgICAgIFxuICAgIH1cblxuXG5cbiAgICB0aGlzLmhpdCA9IChudW0pID0+IHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaGl0TG9jYXRpb25bbnVtXSA9IFwiWFwiXG4gICAgICAgIHRoaXMubGVuZ3RoLS1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBgU2hpcCBpcyBoaXQgYXQgcG9pbnQgJHtudW19YFxuICAgICAgIFxuICAgIH1cblxuICAgIHRoaXMuaXNTdW5rID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBoaXRDaGVjayA9IHRoaXMuaGl0TG9jYXRpb24uZmlsdGVyKChudW0pID0+IHtcbiAgICAgICAgICAgIGlmIChudW0gPT09IFwiWFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBcbiAgICAgICAgaWYoKGhpdENoZWNrKSAmJiAodGhpcy5sZW5ndGggPT0gMCkpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IHtTaGlwfVxuXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbmhlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMnB4O1xcbn1cXG4uZ2FtZWJvYXJkcyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIG1hcmdpbi10b3A6IDEwMHB4O1xcbiAgICBcXG59XFxuXFxuLyoucGxheWVyLWJvYXJkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG5cXG59XFxuXFxuLmNvbXB1dGVyLWJvYXJkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWFyb29uO1xcbn0qL1xcblxcbi5wbGF5ZXItYm9hcmQgLCAuY29tcHV0ZXItYm9hcmQge1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi5wYlNlY3Rpb24taXRlbSwgLmNiU2VjdGlvbi1pdGVtIHtcXG4gICAgd2lkdGg6IDI2MHB4O1xcbiAgICBoZWlnaHQ6IDI2MHB4O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XFxuICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xcbiAgICBcXG59XFxuXFxuLmNiLWdyaWQtaXRlbTpob3ZlciwgLnBzLWdyaWQtaXRlbTpob3ZlciB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsMCwwLDAuMSk7XFxufVxcblxcbi5wYi1ncmlkLWl0ZW0sIC5jYi1ncmlkLWl0ZW0sIC5wcy1ncmlkLWl0ZW0ge1xcbiAgICB3aWR0aDogMjVweDtcXG4gICAgaGVpZ2h0OiAyNXB4O1xcbiAgICBib3JkZXI6IC4xcHggc29saWQgYmxhY2s7XFxufVxcblxcbmZvb3RlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYm90dG9tOiAwO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjsgICAgXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxTQUFTO0lBQ1QsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsWUFBWTtBQUNoQjtBQUNBO0lBQ0ksYUFBYTtJQUNiLGlCQUFpQjs7QUFFckI7O0FBRUE7Ozs7Ozs7RUFPRTs7QUFFRjtJQUNJLFlBQVk7SUFDWixhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYixhQUFhO0lBQ2Isc0NBQXNDO0lBQ3RDLG1DQUFtQztJQUNuQyxzQkFBc0I7SUFDdEIsb0JBQW9COztBQUV4Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLHdCQUF3QjtBQUM1Qjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixZQUFZO0lBQ1osZUFBZTtJQUNmLFNBQVM7SUFDVCxZQUFZO0lBQ1osa0JBQWtCO0FBQ3RCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbmhlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMnB4O1xcbn1cXG4uZ2FtZWJvYXJkcyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIG1hcmdpbi10b3A6IDEwMHB4O1xcbiAgICBcXG59XFxuXFxuLyoucGxheWVyLWJvYXJkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG5cXG59XFxuXFxuLmNvbXB1dGVyLWJvYXJkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWFyb29uO1xcbn0qL1xcblxcbi5wbGF5ZXItYm9hcmQgLCAuY29tcHV0ZXItYm9hcmQge1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi5wYlNlY3Rpb24taXRlbSwgLmNiU2VjdGlvbi1pdGVtIHtcXG4gICAgd2lkdGg6IDI2MHB4O1xcbiAgICBoZWlnaHQ6IDI2MHB4O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XFxuICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xcbiAgICBcXG59XFxuXFxuLmNiLWdyaWQtaXRlbTpob3ZlciwgLnBzLWdyaWQtaXRlbTpob3ZlciB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsMCwwLDAuMSk7XFxufVxcblxcbi5wYi1ncmlkLWl0ZW0sIC5jYi1ncmlkLWl0ZW0sIC5wcy1ncmlkLWl0ZW0ge1xcbiAgICB3aWR0aDogMjVweDtcXG4gICAgaGVpZ2h0OiAyNXB4O1xcbiAgICBib3JkZXI6IC4xcHggc29saWQgYmxhY2s7XFxufVxcblxcbmZvb3RlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYm90dG9tOiAwO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjsgICAgXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlLmNzcydcbmltcG9ydCAnLi9tb2R1bGVzL0RPTSdcbmltcG9ydCAnLi9tb2R1bGVzL2NvbnRyb2xsZXInIl0sIm5hbWVzIjpbIlNoaXAiLCJnYW1lTG9vcCIsInBiU2VjdGlvbiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNiU2VjdGlvbiIsInBsYWNlU2hpcFNlY3Rpb24iLCJzaGlwcyIsIm9jY3VwaWVkU3BvdHMiLCJjb3VudCIsImNyZWF0ZVBsYXllckdyaWQiLCJwZ3JpZENvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJ4IiwiZGl2IiwiYXBwZW5kQ2hpbGQiLCJpZEdyaWRzIiwicGxheWVyU3F1YXJlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwb3B1bGF0ZVBsYXllckJvYXJkIiwib3JpZW50YXRpb25Ub2dnbGUiLCJmb3JtIiwiZmllbGRzZXQiLCJsZWdlbmQiLCJ0ZXh0Q29udGVudCIsInRvZ2dsZTEiLCJ0b2dnbGUyIiwidlRvZ2dsZSIsImhUb2dnbGUiLCJsYWJlbDEiLCJsYWJlbDIiLCJmb3IiLCJ0eXBlIiwiaWQiLCJ2YWx1ZSIsImNoZWNrZWQiLCJuYW1lIiwicGxhY2VTaGlwR3JpZCIsInBsU2hpcENvbnRhaW5lciIsImNyZWF0ZUVuZW15R3JpZCIsImNncmlkQ29udGFpbmVyIiwic2VsZWN0b3IiLCJncmlkaXRlbXMiLCJteUFyciIsInkiLCJwdXNoIiwic2V0QXR0cmlidXRlIiwiZm9yRWFjaCIsInNoaXAiLCJjb29yZCIsInNxdWFyZSIsImRhdGFzZXQiLCJ0b1N0cmluZyIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwicGxheWVyQXR0YWNrRGlzcGxheSIsIm9iaiIsImUiLCJhdHRhY2tlZFNwb3RzIiwiY29vcmRDaGVjazEiLCJzb21lIiwidGFyZ2V0IiwiY29vcmRDaGVjazIiLCJjb25zb2xlIiwibG9nIiwiZW5lbXlBdHRhY2tEaXNwbGF5IiwibWlzc2VkSGl0cyIsIm1pc3NlZEhpdCIsImhpdFNwb3RzIiwiY3JlYXRlU2hpcHMiLCJvcmllbnRhdGlvbiIsImNvb3JkcyIsIkpTT04iLCJwYXJzZSIsInBhdHJvbCIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsImJhdHRsZXNoaXAiLCJjYXJyaWVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uY2UiLCJnZXRSYW5kb21JbnQiLCJQbGF5ZXIiLCJHYW1lYm9hcmQiLCJvcHRpb25zIiwiY29tcHV0ZXJTaGlwcyIsInBsYXllckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxlbmd0aCIsInBsYXllciIsImNvbXB1dGVyIiwiZW5lbXlTcXVhcmVzIiwicGxhY2VTaGlwIiwicmNQbGFjZVNoaXAiLCJhdHRhY2tPcHBvbmVudCIsImFsbFNoaXBzU3VuayIsImFsZXJ0IiwiZ2FtZWJvYXJkIiwibmV3U2hpcCIsInBsYXlhYmxlU3BvdHMiLCJvY2N1cGllZFNwb3RDaGVjayIsInBsYXlhYmxlU3BvdENoZWNrIiwiZXZlcnkiLCJwb2ludCIsInJlY2VpdmVBdHRhY2siLCJpbmRleCIsImZpbmRJbmRleCIsImVsZW1lbnQiLCJzdHJpbmdpZnkiLCJzcGxpY2UiLCJjb29yZENoZWNrIiwidmFsIiwibXlTaGlwIiwiZmluZCIsImhpdCIsImRlY2lzaW9uIiwiaXNTdW5rIiwidG9VcHBlckNhc2UiLCJjb29yZENoZWNrZXIiLCJyYW5kQ29vcmQiLCJtYXgiLCJtaW4iLCJjZWlsIiwic0MiLCJoaXRMb2NhdGlvbiIsIm9yU3RyIiwibnVtIiwiaGl0Q2hlY2siLCJmaWx0ZXIiXSwic291cmNlUm9vdCI6IiJ9