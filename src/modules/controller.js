import { ships } from "./DOM"
import { getRandomInt , Player } from "./player"
import { Gameboard } from "./gameboard"
import { Ship } from "./ship"

//const Player = require("./player")
/*
const Gameboard = require("./gameboard")
const Ship = require("./ship") */
const options = ["V","H"]
const computerShips = []


const playerBoard = new Gameboard()
const computerBoard = new Gameboard()
const patrol = new Ship("patrol",[getRandomInt(0,9),getRandomInt(0,9)],Math.floor(Math.random()*options.length))
const submarine = new Ship("submarine",[getRandomInt(0,9),getRandomInt(0,9)],Math.floor(Math.random()*options.length))
const destroyer = new Ship("destroyer",[getRandomInt(0,9),getRandomInt(0,9)],Math.floor(Math.random()*options.length))
const battleship = new Ship("battleship",[getRandomInt(0,9),getRandomInt(0,9)],Math.floor(Math.random()*options.length))
const carrier = new Ship("carrier",[getRandomInt(0,9),getRandomInt(0,9)],Math.floor(Math.random()*options.length))
computerShips.push(patrol,submarine,destroyer,battleship,carrier)


/*playerBoard.placeShip(patrol)
playerBoard.placeShip(submarine)
playerBoard.placeShip(destroyer)
playerBoard.placeShip(battleship)
playerBoard.placeShip(carrier) 
playerBoard.receiveAttack([0,1])
playerBoard.receiveAttack([0,0])
playerBoard.receiveAttack([8,7])*/


const player = new Player("Player 1",computerBoard)
const computer = new Player("computer",playerBoard)

function gameLoop() {

    if(playerBoard.allShipsSunk() || computerBoard.allShipsSunk() ) {
        alert("Game's UP!")

        if(playerBoard.allShipsSunk()) {
            alert("Computer WINS")
        } else {
            alert("Human WINS")
        }
    }

    ships.forEach(ship => {
        playerBoard.placeShip(ship)
    })

    for(let x=0 ; x<=computerShips.length;x++) {
        computerBoard.placeShip(computerShips[x])
    }

    

    //console.log(playerBoard)
    console.log(computerBoard)


    
    


    


}

export { gameLoop }
