/* eslint-disable no-inner-declarations */
const Player = function(name,gameboard) {
    
    this.name = name.toUpperCase()
    this.gameboard = gameboard

    this.attackOpponent = (coord) => {
        if(this.name === "COMPUTER" ) {

            const coordChecker = (() => {
                const randCoord = [getRandomInt(0,10),getRandomInt(0,10)]

                const coordCheck = gameboard.playableSpots.some(val => {
                    if (val.toString() === randCoord.toString()) {
                        return true
                    }
                })

                if(coordCheck) {
                    coordChecker()
                } else {
                    gameboard.receivedAttack(randCoord)
                }

            
            })()
            

            
        } else {
            gameboard.receivedAttack(coord)
        }
        
    }

    

}

function getRandomInt(max,min) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = Player