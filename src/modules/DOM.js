/* eslint-disable no-empty */
const Player = require("./player")
const Gameboard = require("./gameboard")
const Ship = require("./ship")

const pbSection = document.querySelector("#player-board")
const cbSection = document.querySelector("#computer-board")
const placeShipSection = document.querySelector("#placeShips")
let ships = []

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
    
}
function orientationToggle() {
    const form = document.createElement("form")
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
    vToggle.name = "orientation"
    hToggle.type = "radio"
    hToggle.id = "H"
    hToggle.value = "H"
    hToggle.name = "orientation"
    toggle1.appendChild(label1)
    toggle1.appendChild(vToggle)
    toggle2.appendChild(label2)
    toggle2.appendChild(hToggle)
    form.appendChild(toggle1)
    form.appendChild(toggle2)
    
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
let count = 0
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

})()*/

const playerSquares = document.querySelectorAll(".ps-grid-item")/*
playerSquares.addEventListener("click", (e) => {
    count +=1

    if(count == 5) {
        playerSquares.removeEventListener()
    }

})*/


playerSquares.forEach(square => {
    square.addEventListener("click", (e) => {
        console.log(e)
        const orientation = document.querySelector('input[name="orientation"]:checked').value
        const coords = JSON.parse(e.target.dataset.coord)
        let patrol,submarine, destroyer, battleship, carrier

        switch(count){
            case 0:
                patrol = new Ship("patrol",coords,orientation)
                ships.push(patrol)
                break
            case 1:
                submarine = new Ship("submarine",coords,orientation)
                ships.push(submarine)
                break
            case 2:
                destroyer = new Ship("destroyer",coords,orientation)
                ships.push(destroyer)
                break
            case 3:
                battleship = new Ship("battleship",coords,orientation)
                ships.push(battleship)
                break
            case 4:
                carrier = new Ship("carrier",coords,orientation)
                ships.push(carrier)
                break
            default:
                break
        }
               

        
        console.log(ships)
        count +=1
    },{once:true})
})



/*
createPlayerGrid()
createEnemyGrid()*/