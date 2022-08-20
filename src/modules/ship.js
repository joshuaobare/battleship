const Ship = function(length) {
    this.length = length
    this.hitLocation = []

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

        console.log(hitCheck)
            console.log(this.length)
        if((hitCheck) && (this.length == 0)) {
            
            return true
        } else {
            return false
        }
        
    }
}

module.exports = Ship