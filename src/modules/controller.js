import {
  ships,
  playerAttackDisplay,
  enemyAttackDisplay,
  winnerChecker,
} from "./DOM";
import { getRandomInt, Player } from "./player";
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const options = ["V", "H"];
const computerShips = [];
const playerBoard = new Gameboard("computerboard");
const computerBoard = new Gameboard("playerboard");

const patrol = new Ship(
  "patrol",
  [getRandomInt(0, 9), getRandomInt(0, 9)],
  options[Math.floor(Math.random() * options.length)]
);
const submarine = new Ship(
  "submarine",
  [getRandomInt(0, 9), getRandomInt(0, 9)],
  options[Math.floor(Math.random() * options.length)]
);
const destroyer = new Ship(
  "destroyer",
  [getRandomInt(0, 9), getRandomInt(0, 9)],
  options[Math.floor(Math.random() * options.length)]
);
const battleship = new Ship(
  "battleship",
  [getRandomInt(0, 9), getRandomInt(0, 9)],
  options[Math.floor(Math.random() * options.length)]
);
const carrier = new Ship(
  "carrier",
  [getRandomInt(0, 9), getRandomInt(0, 9)],
  options[Math.floor(Math.random() * options.length)]
);
computerShips.push(patrol, submarine, destroyer, battleship, carrier);

const player = new Player("Player 1", computerBoard);
const computer = new Player("computer", playerBoard);

function gameLoop() {
  const enemySquares = document.querySelectorAll(".cb-grid-item");

  ships.forEach((ship) => {
    playerBoard.placeShip(ship);
  });

  computerShips.forEach((ship) => {
    rcPlaceShip(computerBoard, ship);
  });

  enemySquares.forEach((square) => {
    square.addEventListener(
      "click",
      (e) => {
        winnerChecker(playerBoard, computerBoard);
        player.attackOpponent(JSON.parse(e.target.dataset.coord));
        winnerChecker(playerBoard, computerBoard);
        computer.attackOpponent();
        winnerChecker(playerBoard, computerBoard);
        playerAttackDisplay(computerBoard, e);
        enemyAttackDisplay(playerBoard);
        winnerChecker(playerBoard, computerBoard);
      },
      { once: true }
    );
  });
}

// rcPlaceShip recursively tries to find a valid spot to place the ships

function rcPlaceShip(gameboard, ship) {
  try {
    gameboard.placeShip(ship);
  } catch {
    try {
      const newShip = new Ship(
        ship.name,
        [getRandomInt(0, 9), getRandomInt(0, 9)],
        options[Math.floor(Math.random() * options.length)]
      );

      gameboard.placeShip(newShip);
    } catch {
      rcPlaceShip(gameboard, ship);
    }
  }
}

export { gameLoop };
