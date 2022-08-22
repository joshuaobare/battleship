/* eslint-disable no-empty */
import {Ship} from './ship'
import { gameLoop } from "./controller"



const pbSection = document.querySelector("#player-board")
const cbSection = document.querySelector("#computer-board")
const placeShipSection = document.querySelector("#placeShips")
let ships = []
let occupiedSpots = []
let count = 0

function createPlayerGrid() {
    const pgridContainer = document.createElement("div")
    
    pgridContainer.className = "pbSection-item"
    
    for(let x=0; x<=99 ; x++) {
        const div = document.createElement("div")
        div.className = "pb-grid-item"
        pgridContainer.appendChild(div)
    }

     
    pbSection.appendChild(pgridContainer)
    idGrids(".pb-grid-item")
    const playerSquares = document.querySelectorAll(".pb-grid-item")
    populatePlayerBoard(playerSquares)
    
}
function orientationToggle() {
    const form = document.createElement("form")
    const fieldset = document.createElement("fieldset")
    const legend = document.createElement("legend")
    legend.textContent = "Orientation"
    const toggle1 = document.createElement("div")
    const toggle2 = document.createElement("div")
    const vToggle = document.createElement("input")
    const hToggle = document.createElement("input")
    const label1 = document.createElement("label")
    const label2 = document.createElement("label")
    label1.for = "V"
    label2.for = "H"
    label1.textContent = "Vertical: "
    label2.textContent = "Horizontal: "
    vToggle.type = "radio"
    vToggle.id = "V"
    vToggle.value = "V"
    vToggle.checked = true
    vToggle.name = "orientation"
    hToggle.type = "radio"
    hToggle.id = "H"
    hToggle.value = "H"
    hToggle.name = "orientation"
    
    toggle1.appendChild(label1)
    toggle1.appendChild(vToggle)
    toggle2.appendChild(label2)
    toggle2.appendChild(hToggle)
    fieldset.appendChild(legend)
    fieldset.appendChild(toggle1)
    fieldset.appendChild(toggle2)
    form.appendChild(fieldset)
    
    placeShipSection.appendChild(form)
}

function placeShipGrid() {
    const plShipContainer = document.createElement("div")
    
    
    plShipContainer.className = "pbSection-item"
    
    for(let x=0; x<=99 ; x++) {
        const div = document.createElement("div")
        div.className = "ps-grid-item"
        plShipContainer.appendChild(div)
    }
    orientationToggle()
    placeShipSection.appendChild(plShipContainer)
    idGrids(".ps-grid-item")
}


function createEnemyGrid() {
    const cgridContainer = document.createElement("div")
    cgridContainer.className = "cbSection-item"
    for(let x=0; x<=99 ; x++) {
        const div = document.createElement("div")
        div.className = `cb-grid-item` 

        cgridContainer.appendChild(div)
    }
    cbSection.appendChild(cgridContainer)
    idGrids(".cb-grid-item")
}

function idGrids(selector) {
    const griditems = document.querySelectorAll(selector)
    let myArr = []

    for(let x = 0;x<=9;x++) {
        for (let y = 0 ; y<=9 ;y++){
            myArr.push([y,x])
        }
    }

    for(let x=0 ; x<100;x++) {
        griditems[x].setAttribute("data-coord",`[${myArr[x]}]`)
    } 
}    
placeShipGrid()
const playerSquares = document.querySelectorAll(".ps-grid-item")

/*const populatePlayerBoard = (() => {
    const patrol = new Ship("patrol",[4,3],"V")
    const submarine = new Ship("submarine",[1,1],"V")
    const destroyer = new Ship("destroyer",[1,1],"H")
    const battleship = new Ship("battleship",[2,5],"H")
    const carrier = new Ship("carrier",[2,5],"V")

    /*ships.push(patrol)
    ships.push(submarine)
    ships.push(destroyer)
    ships.push(battleship)
    ships.push(carrier)
})()


playerSquares.addEventListener("click", (e) => {
    count +=1

    if(count == 5) {
        playerSquares.removeEventListener()
    }

})*/

function populatePlayerBoard(playerSquares){
    

    ships.forEach((ship) => {
        ship.coord.forEach((coord) => {
            occupiedSpots.push(`[${coord}]`)
        })
    })

    playerSquares.forEach(square => {
         occupiedSpots.forEach((coord) => {
            if (square.dataset.coord.toString() === coord.toString()) {
                square.style.backgroundColor = "grey"
            }
        })

       
    })
}

function playerAttackDisplay(obj,e) {
    const attackedSpots = obj.attackedSpots
    const occupiedSpots = obj.occupiedSpots

    const coordCheck1 = attackedSpots.some((coord) => {
        
       return e.target.dataset.coord.toString() === `[${coord.toString()}]`
    })
    const coordCheck2 = occupiedSpots.some((coord) => {
        return e.target.dataset.coord.toString() === `[${coord.toString()}]`
    })
    console.log(coordCheck1,coordCheck2)
    console.log(e.target.dataset.coord)

    if(coordCheck1 && coordCheck2) {
        e.target.style.backgroundColor = "red"
    } else if ((coordCheck1) && !(coordCheck2)) {
        e.target.style.backgroundColor = "lightskyblue"
    }


}

function enemyAttackDisplay(obj) {

    const missedHits = obj.missedHit
    const hitSpots = obj.hitSpots
    const playerSquares = document.querySelectorAll(".pb-grid-item")

    playerSquares.forEach(square => {
        missedHits.forEach((coord) => {
           if (square.dataset.coord.toString() === `[${coord.toString()}]`) {
               //console.log()
               square.style.backgroundColor = "lightskyblue"
           }
       })

      
    })

   playerSquares.forEach(square => {
        hitSpots.forEach((coord) => {
            if (square.dataset.coord.toString() === `[${coord.toString()}]`) {
                square.style.backgroundColor = "red"
            }
        })

  
    })


}

function createShips(e){
    const orientation = document.querySelector('input[name="orientation"]:checked').value
    const coords = JSON.parse(e.target.dataset.coord)
    let patrol,submarine, destroyer, battleship, carrier

    switch(count){
        case 0:
            patrol = new Ship("patrol",coords,orientation)
            ships.push(patrol)
            populatePlayerBoard(playerSquares)
            break
        case 1:
            submarine = new Ship("submarine",coords,orientation)
            ships.push(submarine)
            populatePlayerBoard(playerSquares)
            break
        case 2:
            destroyer = new Ship("destroyer",coords,orientation)
            ships.push(destroyer)
            populatePlayerBoard(playerSquares)
            break
        case 3:
            battleship = new Ship("battleship",coords,orientation)
            ships.push(battleship)
            populatePlayerBoard(playerSquares)
            break
        case 4:
            carrier = new Ship("carrier",coords,orientation)
            ships.push(carrier)
            populatePlayerBoard(playerSquares)
            break
        default:
            

            break
    }
        if (count === 5) {
            createPlayerGrid()
            createEnemyGrid()
            gameLoop()
        }
               

        
    console.log(ships)
    count +=1
}

playerSquares.forEach(square => {
    square.addEventListener("click", (e) => {
        createShips(e)
        
    },{once:true})
})




/*
*/

export { ships , playerAttackDisplay, enemyAttackDisplay }