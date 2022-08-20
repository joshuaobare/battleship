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
        div.className = "cb-grid-item"
        cgridContainer.appendChild(div)
    }
    
    pbSection.appendChild(pgridContainer)
    cbSection.appendChild(cgridContainer)
}




createGrids()