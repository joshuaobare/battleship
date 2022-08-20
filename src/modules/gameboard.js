const Ship = require("./ship")

const Gameboard = function(ship,coord) {
    this.missedHit = []
    ship.coord = coord

    this.receiveAttack = (coords) => {
        
        
        const coordCheck = ship.coord.some((val) => {
            if (val.toString() === coords.toString()) {
                return true
            }
        })
        
        if (coordCheck)  {
            const index = ship.coord.findIndex((val) => {
                if(val.toString() === coords.toString()){
                    return true
                }
            })
            ship.hit(index)
            console.log(ship.hit(index))
            return "Attack hit a ship"

        } else {
            this.missedHit.push(coords)
            return "Attack missed"
            
        }             

    }

    this.allShipsSunk = () => {
        if(ship.isSunk()) return "All ships have sank"
    }

    
}

/*function findIndex(x,y) {

    const index  = y.findIndex

}*/

const ship = new Ship(4)
const shipCoords = [[2,2],[3,2],[2,5],[3,5]]
const gameboard = new Gameboard(ship,shipCoords)

gameboard.receiveAttack([3,5])
gameboard.receiveAttack([2,2])
gameboard.receiveAttack([3,2])
gameboard.receiveAttack([2,5])
console.log(gameboard.allShipsSunk())


module.exports = Gameboard