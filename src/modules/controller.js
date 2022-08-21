/*import { Player } from "./player"
import { Gameboard } from "./gameboard"
import { Ship } from "./ship"*/

const Player = require("./player")
const Gameboard = require("./gameboard")
const Ship = require("./ship")


const playerBoard = new Gameboard()
const computerBoard = new Gameboard()
const patrol = new Ship(2,[0,0])
const submarine = new Ship(3,[1,1])
const destroyer = new Ship(3,[1,2])
const battleship = new Ship(4,[9,0])
const carrier = new Ship(5,[8,0])

const player = new Player("Player 1",computerBoard)
const computer = new Player("computer",playerBoard)
console.log(player)