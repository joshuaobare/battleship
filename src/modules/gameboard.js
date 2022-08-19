const Ship = require("./ship")

const Gameboard = function(ship,coord) {
    this.missedHit = []
    ship.coord = coord

    this.receiveAttack = (coords) => {

        if(ship.coord == coords)  {
            ship.hit(0)
            return "attack hit a ship"

        } else {
            this.missedHit.push(coords)
            return "Attack missed"
            
        }

        /*if(coordinates === ship.coord) {
            ship.hit(coordinates[0])
        }*/
        

    }
}

const ship = new Ship(5)
const gb = new Gameboard(ship,[0,0])
gb.receiveAttack([0,0])

module.exports = Gameboard