/* eslint-disable no-undef */
const Ship = require('../ship')
const Gameboard = require("../gameboard.js")

test("determines whether the attack hit a ship", () =>{
    const ship = new Ship(4,[[2,2],[3,2],[2,5],[3,5]])
    
    const gameboard = new Gameboard()
    gameboard.placeShip(ship)
    expect(gameboard.receiveAttack([1,2])).toBe("Attack missed")
    expect(gameboard.receiveAttack([3,2])).toBe("Attack hit a ship")
    
    
})

test("gameboard determines whether all ships have sunk", () => {
    const ship = new Ship(2,[[0,0],[0,1]])
    const ship2 = new Ship(2,[[2,1],[2,2]])
    const gameboard = new Gameboard()
    gameboard.placeShip(ship)
    gameboard.placeShip(ship2)
    gameboard.receiveAttack([0,0])
    gameboard.receiveAttack([0,1])
    gameboard.receiveAttack([2,1])
    gameboard.receiveAttack([2,2])

    expect(gameboard.allShipsSunk()).toBe("All ships have sank")

})

test("gameboard determines whether all ships have sunk", () => {
    const ship = new Ship(2,[[0,0],[0,1]])
    const ship2 = new Ship(2,[[2,1],[2,2]])
    const gameboard = new Gameboard()
    gameboard.placeShip(ship)
    gameboard.placeShip(ship2)
    gameboard.receiveAttack([0,0])
    gameboard.receiveAttack([0,1])
    gameboard.receiveAttack([2,1])
    
    expect(gameboard.allShipsSunk()).toBe("Some ships are afloat")

})