const Ship = function(name,sC,orientation) {    
    this.orientation = orientation
    this.hitLocation = []
    
    const orStr = orientation.toString().toUpperCase()

    switch(name.toString().toUpperCase()){
        case "PATROL":
            this.length = 2

            if(orStr === "H") {
                this.coord = [sC,[sC[0]+1,sC[1]]]
            } else {
                this.coord = [sC,[sC[0],sC[1]+1]]
            }
            break
        case "SUBMARINE":
            this.length = 3
            if(orStr === "H") {
                this.coord = [sC,[sC[0]+1,sC[1]],[sC[0]+2,sC[1]]]
            } else {
                this.coord = [sC,[sC[0],sC[1]+1],[sC[0],sC[1]+2]]
            }


            break
        case "DESTROYER":
            this.length = 3

            if(orStr === "H") {
                this.coord = [sC,[sC[0]+1,sC[1]],[sC[0]+2,sC[1]]]
            } else {
                this.coord = [sC,[sC[0],sC[1]+1],[sC[0],sC[1]+2]]
            }

            break
        case "BATTLESHIP":
            this.length = 4

            if(orStr === "H") {
                this.coord = [sC,[sC[0]+1,sC[1]],[sC[0]+2,sC[1]],[sC[0]+3,sC[1]]]
            } else {
                this.coord = [sC,[sC[0],sC[1]+1],[sC[0],sC[1]+2],[sC[0],sC[1]+3]]
            }

            break
        case "CARRIER":
            this.length = 5

            if(orStr === "H") {
                this.coord = [sC,[sC[0]+1,sC[1]],[sC[0]+2,sC[1]],[sC[0]+3,sC[1]],[sC[0]+4,sC[1]]]
            } else {
                this.coord = [sC,[sC[0],sC[1]+1],[sC[0],sC[1]+2],[sC[0],sC[1]+3],[sC[0],sC[1]+4]]
            }
            break
        default:
            return "Invalid choice of ship"
            
    }



    this.hit = (num) => {
        
        this.hitLocation[num] = "X"
        this.length--
        
        return `Ship is hit at point ${num}`
       
    }

    this.isSunk = () => {
        const hitCheck = this.hitLocation.filter((num) => {
            if (num === "X") {
                return true
            }
        })

        
        if((hitCheck) && (this.length == 0)) {
            
            return true
        } else {
            return false
        }
        
    }
}

module.exports = Ship

