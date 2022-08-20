/* eslint-disable no-undef */
const Ship = require('../ship')
const Gameboard = require("../gameboard.js")

test("determines whether the attack hit a ship", () =>{
    const ship = new Ship(3)
    const gameboard = new Gameboard(ship,[0,0])
    expect(gameboard.receiveAttack([0,0])).toBe("attack hit a ship")
    expect(gameboard.receiveAttack([1,2])).toBe("Attack missed")
    
})

/*

test("gameboard determines whether ship has sunk", () => {
    const ship = new Ship(3)
    const gameboard = new Gameboard(ship,[0,0])
    gameboard.receiveAttack

})*/