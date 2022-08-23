/* eslint-disable no-undef */

import { Player } from "../player";
import { Ship } from "../ship";
import { Gameboard } from "../gameboard";

test("Computer attacks Gameboard", () => {
  const ship = new Ship("patrol", [0, 0], "V");
  const ship2 = new Ship("patrol", [2, 1], "V");
  const gameboard = new Gameboard();
  const player = new Player("computer", gameboard);
  gameboard.placeShip(ship);
  gameboard.placeShip(ship2);
  expect(player.attackOpponent()).toBe("COMPUTER attacked");
});
