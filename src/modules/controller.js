/*import { Player } from "./player"
import { Gameboard } from "./gameboard"
import { Ship } from "./ship"*/

const Player = require("./player")
const Gameboard = require("./gameboard")
const Ship = require("./ship")


const playerBoard = new Gameboard()
const computerBoard = new Gameboard()

const player = new Player("Player 1",computerBoard)
const computer = new Player("computer",playerBoard)
console.log(player)