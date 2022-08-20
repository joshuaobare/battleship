const Ship = function(length) {
    this.length = length
    this.hitLocation = []

    this.hit = (num) => {
        
        this.hitLocation[num] = "X"
        this.length--
       
    }

    this.isSunk = () => {
        const hitCheck = this.hitLocation.filter((num) => {
            if (num === "X") {
                return true
            }
        })

        if((hitCheck) && (this.length == 0)) {
            return "Ship has sunk!"
        } else {
            return false
        }
        
    }
}

module.exports = Ship