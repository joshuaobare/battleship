const Ship = require("./ship")

const Gameboard = function(ship,coord) {
    this.missedHit = []
    ship.coord = coord

    this.receiveAttack = (coords) => {        
        
        if ((ship.coord[0] === coords[0]) && (ship.coord[1] === coords[1]))  {
            ship.hit(0)
            return "attack hit a ship"

        } else {
            this.missedHit.push(coords)
            return "Attack missed"
            
        }             

    }

    this.allShipsSunk = () => {
        if(ship.isSunk()) return "All ships have sank"
    }

    
}

const ship = new Ship(5)
const gb = new Gameboard(ship,[0,0])
console.log(gb.receiveAttack([0,0]))

module.exports = Gameboard