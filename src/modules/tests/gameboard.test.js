/* eslint-disable no-undef */
import { Ship } from "../ship";
import { Gameboard } from "../gameboard";

test("determines whether the attack hit a ship", () => {
  const ship = new Ship("battleship", [2, 2], "H");

  const gameboard = new Gameboard();
  gameboard.placeShip(ship);
  expect(gameboard.receiveAttack([1, 2])).toBe("Attack missed");
  expect(gameboard.receiveAttack([3, 2])).toBe("Attack hit a ship");
});

test("gameboard determines whether all ships have sunk", () => {
  const ship = new Ship("patrol", [0, 0], "V");
  const ship2 = new Ship("patrol", [2, 1], "V");
  const gameboard = new Gameboard();
  gameboard.placeShip(ship);
  gameboard.placeShip(ship2);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([2, 1]);
  gameboard.receiveAttack([2, 2]);

  expect(gameboard.allShipsSunk()).toBeTruthy();
});

test("gameboard determines whether all ships have sunk", () => {
  const ship = new Ship("patrol", [0, 0], "V");
  const ship2 = new Ship("patrol", [2, 1], "V");
  const gameboard = new Gameboard();
  gameboard.placeShip(ship);
  gameboard.placeShip(ship2);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([2, 1]);

  expect(gameboard.allShipsSunk()).toBeFalsy();
});

test("gameboard should prevent placing ships on occupied spots", () => {
  const ship = new Ship("patrol", [0, 0], "V");
  const ship2 = new Ship("patrol", [0, 0], "V");

  const gameboard = new Gameboard();
  gameboard.placeShip(ship);
  expect(() => {
    gameboard.placeShip(ship2);
  }).toThrow("Ship coordinates are taken");
});

test("gameboard should prevent placing ships on spots out of its range", () => {
  const ship = new Ship("carrier", [10, 10], "V");
  const gameboard = new Gameboard();
  expect(() => {
    gameboard.placeShip(ship);
  }).toThrow("Ship coordinates are out of bounds");
});

test("computer gameboard should prevent placing ships too close to each other", () => {
  const ship = new Ship("carrier", [0, 0], "V");
  const ship2 = new Ship("carrier", [1, 0], "V")
  const gameboard = new Gameboard("playerboard");
  gameboard.placeShip(ship)
  expect(() => {
    gameboard.placeShip(ship2);
  }).toThrow("Ship too close")
})
