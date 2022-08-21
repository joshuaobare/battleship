/* eslint-disable no-undef */
const Player = require("../player")
const Ship = require('../ship')
const Gameboard = require("../gameboard.js")

test("Computer attacks Gameboard", () => {
    
    const ship = new Ship("patrol",[0,0],"V")
    const ship2 = new Ship("patrol",[2,1],"V")
    const gameboard = new Gameboard()
    const player = new Player("computer",gameboard)
    gameboard.placeShip(ship)
    gameboard.placeShip(ship2)
    expect(player.attackOpponent()).toBe("COMPUTER attacked")

})