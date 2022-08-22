const Player = require("./player")
const Gameboard = require("./gameboard")
const Ship = require("./ship")


const playerBoard = new Gameboard()
const computerBoard = new Gameboard()
const patrol = new Ship("patrol",[0,0],"V")
const submarine = new Ship("submarine",[1,1],"V")
const destroyer = new Ship("destroyer",[1,1],"H")
const battleship = new Ship("battleship",[2,5],"H")
const carrier = new Ship("carrier",[2,5],"V")

playerBoard.placeShip(patrol)
playerBoard.placeShip(submarine)
playerBoard.placeShip(destroyer)
playerBoard.placeShip(battleship)
playerBoard.placeShip(carrier)
playerBoard.receiveAttack([0,1])
playerBoard.receiveAttack([0,0])
playerBoard.receiveAttack([8,7])
console.log(playerBoard)
console.table(patrol.isSunk())



const player = new Player("Player 1",computerBoard)
const computer = new Player("computer",playerBoard)

const gameLoop = (() => {
    
    


})()
