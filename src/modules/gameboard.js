//const Ship = require("./ship")

const Gameboard = function() {
    this.missedHit = []
    this.ships = []
    this.occupiedSpots = []
    this.playableSpots = []
    this.attackedSpots = []
    this.hitSpots = []

    for(let x = 0;x<=9;x++) {
        for (let y = 0 ; y<=9 ;y++){
            this.playableSpots.push([y,x])
        }
    }
    
    this.placeShip = (ship) => {
        
        this.ships.push(ship)
        ship.coord.forEach(point => {
            this.occupiedSpots.push(point)
            
        })

        
        
    }

    this.receiveAttack = (coords) => {
        this.attackedSpots.push(coords)

        const index = this.playableSpots.findIndex((element) => {
            return JSON.stringify(element) == JSON.stringify(coords)
        })
        this.playableSpots.splice(index,1)
        
               
        const coordCheck = this.occupiedSpots.some((val) => {
            if (val.toString() === coords.toString()) {
                return true
            }
        })


               
        if (coordCheck)  {

            const myShip = this.ships.find((ship) => {

                return ship.coord.find((coord) => {
                    return coord.toString() === coords.toString()
                })

            })
            
            const index = myShip.coord.findIndex((val) => {
                if(val.toString() === coords.toString()){
                    return true
                }
            })
            myShip.hit(index)
            this.hitSpots.push(coords)

                       
            return "Attack hit a ship"

        } else {
            this.missedHit.push(coords)
            
            return "Attack missed"
            
        }             

    }

    this.allShipsSunk = () => {

        const decision = this.ships.every(ship => {

           if (ship.isSunk()) {
               return true
           }
            
        })

        if (decision) {
            return true
        } else {
            return false
        }
        
    }


    
}


/*const ship = new Ship(3,[[2,2],[3,2],[2,5],[3,5]])
console.log(ship.coord)
function findIndex(x,y) {

    const index  = y.findIndex

} 

const ship = new Ship(4)
const shipCoords = [[2,2],[3,2],[2,5],[3,5]]
const gameboard = new Gameboard(ship,shipCoords)
//console.log(gameboard.playableSpots)

gameboard.receiveAttack([3,5])
gameboard.receiveAttack([2,2])
gameboard.receiveAttack([3,2])
gameboard.receiveAttack([2,5])
//console.log(gameboard.playableSpots)
//console.log(gameboard.allShipsSunk())*/


export {Gameboard}

