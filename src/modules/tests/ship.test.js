/* eslint-disable no-undef */
import { Ship } from "../ship.js";

test("sink ship with 3 hits", () => {
  const ship = new Ship("submarine", [0, 0], "V");
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  expect(ship.isSunk()).toBeTruthy();
});

test("ship unsunk without enough hits", () => {
  const ship = new Ship("battleship", [2, 5], "H");
  ship.hit(0);
  expect(ship.isSunk()).toBeFalsy();
});

test("ship name produces valid ship length", () => {
  const ship = new Ship("patrol", [0, 0], "V");
  const ship2 = new Ship("battleship", [0, 0], "H");
  expect(ship.length).toBe(2);
  expect(ship2.length).toBe(4);
});

test("ship produces valid ship coords based on starting coords", () => {
  const ship = new Ship("patrol", [0, 0], "V");
  const ship2 = new Ship("patrol", [0, 0], "H");
  const ship3 = new Ship("submarine", [1, 1], "V");
  const ship4 = new Ship("battleship", [2, 5], "H");
  const ship5 = new Ship("carrier", [2, 5], "V");

  expect(ship.coord).toStrictEqual([
    [0, 0],
    [0, 1],
  ]);
  expect(ship2.coord).toStrictEqual([
    [0, 0],
    [1, 0],
  ]);
  expect(ship3.coord).toStrictEqual([
    [1, 1],
    [1, 2],
    [1, 3],
  ]);
  expect(ship4.coord).toStrictEqual([
    [2, 5],
    [3, 5],
    [4, 5],
    [5, 5],
  ]);
  expect(ship5.coord).toStrictEqual([
    [2, 5],
    [2, 6],
    [2, 7],
    [2, 8],
    [2, 9],
  ]);
});
