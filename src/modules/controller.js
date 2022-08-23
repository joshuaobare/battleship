import { ships , playerAttackDisplay, enemyAttackDisplay } from "./DOM"
import { getRandomInt , Player } from "./player"
import { Gameboard } from "./gameboard"
import { Ship } from "./ship"


const options = ["V","H"]
const computerShips = []
const playerBoard = new Gameboard()
const computerBoard = new Gameboard()
const patrol = new Ship("patrol",[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
const submarine = new Ship("submarine",[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
const destroyer = new Ship("destroyer",[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
const battleship = new Ship("battleship",[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
const carrier = new Ship("carrier",[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
computerShips.push(patrol,submarine,destroyer,battleship,carrier)

/*

if(playerBoard.allShipsSunk() || computerBoard.allShipsSunk() ) {
    alert("Game's UP!")

    if(playerBoard.allShipsSunk()) {
        alert("Computer WINS")
    } else {
        alert("Human WINS")
    }
}
*/


const player = new Player("Player 1",computerBoard)
const computer = new Player("computer",playerBoard)

function gameLoop() {
    const enemySquares = document.querySelectorAll(".cb-grid-item")
    
    ships.forEach(ship => {
        playerBoard.placeShip(ship)
    })

    computerShips.forEach(ship => {
       /* try {
            computerBoard.placeShip(ship)
        } catch{
            try{
                const newShip = new Ship (ship.name,[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
                computerBoard.placeShip(newShip)
            }catch{
                try {
                    const newShip = new Ship (ship.name,[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
                    computerBoard.placeShip(newShip)
                }catch{
                    
                  try {
                    const newShip = new Ship (ship.name,[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
                    computerBoard.placeShip(newShip)
                  } catch {
                    try {
                        const newShip = new Ship (ship.name,[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
                        computerBoard.placeShip(newShip)
                      } catch {
                        const newShip = new Ship (ship.name,[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
                        computerBoard.placeShip(newShip)
                    }
                }
                }
            }
        } */
        rcPlaceShip(computerBoard,ship)

        



        
    })
    console.log(computerBoard)
   
    enemySquares.forEach(square => {
        square.addEventListener("click", e => {
            //console.log(e.target.dataset.coord)
            console.log(player.attackOpponent(JSON.parse(e.target.dataset.coord)))
            console.log(computer.attackOpponent())
            playerAttackDisplay(computerBoard,e)
            enemyAttackDisplay(playerBoard)
            console.log(computerBoard)
        },{once:true})
    })

    
    if(playerBoard.allShipsSunk() || computerBoard.allShipsSunk() ) {
        alert("Game's UP!")
    
        if(playerBoard.allShipsSunk()) {
            alert("Computer WINS")
        } else {
            alert("Human WINS")
        }
    }

    


    
    


    


}


function rcPlaceShip(gameboard,ship){
    try {
        gameboard.placeShip(ship)
    } catch {

        try {
            const newShip = new Ship (ship.name,[getRandomInt(0,9),getRandomInt(0,9)],options[Math.floor(Math.random()*options.length)])
            console.log(newShip)
            gameboard.placeShip(newShip)
        } catch {
            rcPlaceShip(gameboard, ship)
        }
        
    }

    
}

export { gameLoop }
