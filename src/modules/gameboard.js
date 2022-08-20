const Ship = require("./ship")

const Gameboard = function() {
    this.missedHit = []
    this.ships = []
    this.occupiedSpots = []
    
    this.placeShip = (ship) => {
        this.ships.push(ship)
        ship.coord.forEach(point => {
            this.occupiedSpots.push(point)
        })
        
    }

    this.receiveAttack = (coords) => {
        
        
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
            return "All ships have sank"
        } else {
            return "Some ships are afloat"
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

gameboard.receiveAttack([3,5])
gameboard.receiveAttack([2,2])
gameboard.receiveAttack([3,2])
gameboard.receiveAttack([2,5])
console.log(gameboard.allShipsSunk())

*/
module.exports = Gameboard