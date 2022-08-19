/* eslint-disable no-undef */
const Ship = require('../ship')
const Gameboard = require("../gameboard.js")

test("determines whether the attack hit a ship", () =>{
    const ship = new Ship(3)
    const gameboard = new Gameboard(ship,[0,0])
    expect(gameboard.receiveAttack([0,0])).toBe("attack hit a ship")
    
})

/*test("determines whether the attack missed", () =>{
    const ship1 = new Ship(3)
    const gameboard1 = new Gameboard(ship1,[0,0])    
    expect(gameboard1.receiveAttack([1,2])).toBe("Attack missed")
})*/