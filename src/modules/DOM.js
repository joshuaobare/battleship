/* eslint-disable no-empty */
const pbSection = document.querySelector("#player-board")
const cbSection = document.querySelector("#computer-board")

function createGrids() {
    const pgridContainer = document.createElement("div")
    const cgridContainer = document.createElement("div")
    pgridContainer.className = "pbSection-item"
    cgridContainer.className = "cbSection-item"

    for(let x=0; x<=99 ; x++) {
        const div = document.createElement("div")
        div.className = "pb-grid-item"
        pgridContainer.appendChild(div)
    }

    for(let x=0; x<=99 ; x++) {
        const div = document.createElement("div")
        div.className = `cb-grid-item ${x} ` 

        cgridContainer.appendChild(div)
    }
    
    pbSection.appendChild(pgridContainer)
    cbSection.appendChild(cgridContainer)
}

function idGrids() {
    const griditems = document.querySelectorAll(".cb-grid-item")
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

createGrids()
idGrids()