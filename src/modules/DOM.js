/* eslint-disable no-empty */
const pbSection = document.querySelector("#player-board")
const cbSection = document.querySelector("#computer-board")
const placeShipSection = document.querySelector("#placeShips")

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
    vToggle.name = "orientation"
    hToggle.type = "radio"
    hToggle.id = "H"
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

function populatePlayerBoard() {

}



placeShipGrid()/*
createPlayerGrid()
createEnemyGrid()*/