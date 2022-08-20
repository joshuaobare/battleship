/* eslint-disable no-undef */
const Player = require("../player")
const Ship = require('../ship')
const Gameboard = require("../gameboard.js")

test("Computer attacks Gameboard", () => {
    
    const ship = new Ship(2,[[0,0],[0,1]])
    const ship2 = new Ship(2,[[2,1],[2,2]])
    const gameboard = new Gameboard()
    const player = new Player("computer",gameboard)
    gameboard.placeShip(ship)
    gameboard.placeShip(ship2)
    expect(player.attackOpponent()).toBe("COMPUTER attacked")

})