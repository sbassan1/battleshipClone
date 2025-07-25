import { Player } from "../game_classes/player.js"; // Add .js extension
import { gameShips } from "../game_classes/defaultShips.js";

const player = new Player();
const cpu = new Player();
cpu.populateRandomShips();

let playerCells = [];
let cpuCells = [];

function createGrid(gridId, title) {
    
    const container = document.createElement("div");
    container.className = "has-text-centered"; // Center the entire container content

    
    const titleElement = document.createElement("h3");
    titleElement.className = "title is-4 has-text-centered";
    titleElement.id = gridId.replace('-grid', '-title');
    titleElement.textContent = title;
    
    const grid = document.createElement("div");
    grid.className = 'has-background-grey'
    grid.id = gridId;
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(11, 40px)";
    grid.style.gridTemplateRows = "repeat(11, 40px)";
    grid.style.gap = "6px"; // Small gap between cells
    grid.style.width = "fit-content";
    grid.style.padding = "2px";
    grid.style.borderRadius = "6px";
    grid.style.margin = "0 auto"; // Center the grid horizontally

    const cells = Array.from({ length: 10 }, () => Array(10));

    for (let row = 0; row < 11; row++) {
        for (let col = 0; col < 11; col++) {
            const cell = document.createElement("div");

            cell.style.width = "40px";
            cell.style.height = "40px";

            if (row === 0 && col === 0) {   // The upper left corner should be black
                cell.className = "has-background-black";
            } else if (row === 0) {    // The column headers
                cell.innerText = col;
                cell.className = "has-background-dark";
                cell.classList.add("has-text-white"); // White text for better contrast
                cell.classList.add("is-flex", "is-justify-content-center", "is-align-items-center");
            
            } else if (col === 0) {     // The row headers               
                cell.innerText = row;
                cell.className = "has-background-dark";
                cell.classList.add("has-text-white"); // White text for better contrast
                cell.classList.add("is-flex", "is-justify-content-center", "is-align-items-center");

            } else {        // The actual game board cells
                cell.className = "has-background-grey-dark";
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.style.cursor = "pointer";
                
                cells[row - 1][col - 1] = {
                    row: row - 1,
                    col: col - 1,
                    html: cell
                };

            }

            grid.appendChild(cell);
        }
    }

    container.appendChild(titleElement);
    container.appendChild(grid);

    return { container, cells };
}

function playGame(name) {
    const gameDiv = document.getElementById('game-boards');

    gameDiv.innerHTML = '';

    const columnsDiv = document.createElement('div');
    columnsDiv.className = 'columns is-3';

    const playerColumn = document.createElement('div');
    playerColumn.className = 'column player-board';
    
    const cpuColumn = document.createElement('div');
    cpuColumn.className = 'column cpu-board';

    const playerGrid = createGrid('player-grid', `${name}'s Board`);
    const cpuGrid = createGrid('cpu-grid', 'CPU Board');

    playerCells = playerGrid.cells;
    cpuCells = cpuGrid.cells;

    playerColumn.appendChild(playerGrid.container);
    cpuColumn.appendChild(cpuGrid.container);
    
    columnsDiv.appendChild(playerColumn);
    columnsDiv.appendChild(cpuColumn);
    
    gameDiv.appendChild(columnsDiv);

    placeAllBoats(playerCells, name);


}

let orientation = true; // true = horizontal, false = vertical

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    orientation = !orientation; // Simplified toggle
    console.log("Orientation changed to:", orientation ? "horizontal" : "vertical");
});

function placeAllBoats(cells,name) {

    const playerTitleText = document.getElementById('player-title');
    playerTitleText.style.animation = "pulseOpacity 2s ease-in-out infinite";
    playerTitleText.style.color = "hsl(141, 71%, 48%)";

    let currentBoatIndex = 0; 
    let currentBoat = gameShips[currentBoatIndex];

    playerTitleText.textContent = `${name}'s Board, placing: ${currentBoat.getName()}`;

    // Cells event handlers
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = cells[row][col];
            if (!cell) continue;

            cell.html.addEventListener("mouseenter", () => {

                if (currentBoatIndex >= gameShips.length) return;

                const ship = currentBoat;
                const localOrientation = orientation;
                
                let canPlace;
                try {
                    canPlace = player.getBoard().isPlaceAvailable(ship, row, col, localOrientation);
                } catch (error) {
                    canPlace = false;
                }
                
                const highlightColor = canPlace ? "outline-green" : "outline-red";
                const hoveredCells = [];

                for (let i = 0; i < ship.getLength(); i++) {
                    let r = row;
                    let c = col;

                    if (localOrientation === true) {
                        c += i;
                    } else {
                        r += i;
                    }

                    if (r < 10 && c < 10 && cells[r] && cells[r][c]) {
                        cells[r][c].html.classList.add(highlightColor);
                        hoveredCells.push(cells[r][c].html);
                    }
                }

                cell.html._hoveredCells = hoveredCells;
            });

            cell.html.addEventListener("mouseleave", () => {

                const hoveredCells = cell.html._hoveredCells || [];

                hoveredCells.forEach(c => {
                    c.classList.remove("outline-green", "outline-red");
                });

                cell.html._hoveredCells = null;
            });

            cell.html.addEventListener("click", () => {

                if (currentBoatIndex >= gameShips.length) return;

                console.log(`Clicked on: row:${cell.row}, col:${cell.col}`);

                const localOrientation = orientation;
                let canPlace;
                
                try {
                    canPlace = player.getBoard().isPlaceAvailable(currentBoat, row, col, localOrientation);
                } catch (error) {
                    canPlace = false;
                }

                if (!canPlace) return;

                // Place the ship in the gameboard
                player.getBoard().placeShip(currentBoat, row, col, localOrientation);

                // Visual feedback - color the cells
                for (let i = 0; i < currentBoat.getLength(); i++) {
                    let r = row;
                    let c = col;

                    if (localOrientation === true) {
                        c += i;
                    } else {
                        r += i;
                    }

                    if (r < 10 && c < 10 && cells[r] && cells[r][c]) {
                        const cellDiv = cells[r][c].html;
                        
                        cellDiv.classList.remove("outline-green", "outline-red");
                        cellDiv.className = '';
                        cellDiv.classList.add("fade-in"); 
                        cellDiv.classList.add("has-background-info"); // Bulma blue background
                        cellDiv.classList.add("has-text-white"); // White text for better contrast
                        cellDiv.classList.add("is-flex", "is-justify-content-center", "is-align-items-center");
                        cellDiv.textContent = currentBoat.getName()[0];
                    }
                }

                // Move to next boat
                currentBoatIndex++;
                if (currentBoatIndex < gameShips.length) {
                    currentBoat = gameShips[currentBoatIndex];
                    playerTitleText.textContent = `${name}'s Board, placing: ${currentBoat.getName()}`;
                } else {
                    console.log("All ships placed!");
                    playerTitleText.style.animation = '';
                    playerTitleText.style.color = "rgb(235,236,240)";
                    playerTitleText.textContent = `${name}'s Board`;

                    return;
                }
            });
        }
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function mainGameState(playerCells,cpuCells) {

    let gameOver = false;

    function highlightPlayerTurn() {
        const playerTitle = document.getElementById('player-title');
        const cpuTitle = document.getElementById('cpu-title');
        
        playerTitle.style.animation = "pulseOpacity 2s ease-in-out infinite";
        playerTitle.style.color = "hsl(141, 71%, 48%)"; // Green
        
        cpuTitle.style.animation = "";
        cpuTitle.style.color = "rgb(235,236,240)";
    }

    function highlightCpuTurn() {
        const playerTitle = document.getElementById('player-title');
        const cpuTitle = document.getElementById('cpu-title');
        
        playerTitle.style.animation = "";
        playerTitle.style.color = "rgb(235,236,240)"; // Default color
        
        cpuTitle.style.animation = "pulseOpacity 2s ease-in-out infinite";
        cpuTitle.style.color = "hsl(141, 71%, 48%)";
    }

    function resetTitleStyles() {
        const playerTitle = document.getElementById('player-title');
        const cpuTitle = document.getElementById('cpu-title');
        
        playerTitle.style.animation = "";
        playerTitle.style.color = "rgb(235,236,240)";
        cpuTitle.style.animation = "";
        cpuTitle.style.color = "rgb(235,236,240)";
    }


    function playerTurn(cpuCells) {

        if (gameOver) {
            return;
        }

        highlightPlayerTurn();

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const cell = cpuCells[row][col];
                if (!cell) continue;

                cell.html.addEventListener("mouseenter", () => {
                    cell.classList.add('is-danger is-outlined');
                })

                cell.html.addEventListener("mouseleave", () => {
                    cell.classList.remove("is-danger is-outlined");
                });

                // You clicked on a cell that you want to attack
                cell.html.addEventListener('click', () => {

                    try {
                        const isHit = cpu.getBoard().receiveAttack(cell.row,cell.col);
                        cell.classList.remove('is-danger is-outlined');
                        cell.className = '';
                        cell.classList.add("fade-in"); 
                        cell.classList.add('is-danger is-inverted');
                        cell.classList.add("has-text-white");
                        cell.classList.add("is-flex", "is-justify-content-center", "is-align-items-center");

                        if(isHit){
                            cell.textContent = "X";
                            return;
                        }

                    } catch (error) {
                        playerTurn(cpuCells);
                    }
                })
            }
        }
    }

    function CPUTurn(playerCells) {

        if (gameOver) {
            return;
        }

        highlightCpuTurn();

        let spot = {
            y : getRandomInt(10),
            x : getRandomInt(10)
        };

        try {
            
            const cell = playerCells[spot.y][spot.x];

            const isHit = player.getBoard().receiveAttack(spot.y,spot.x);

            cell.classList.remove('is-danger is-outlined');
            cell.className = '';
            cell.classList.add("fade-in"); 
            cell.classList.add('is-danger is-inverted');
            cell.classList.add("has-text-white");
            cell.classList.add("is-flex", "is-justify-content-center", "is-align-items-center");

            if(isHit){
                cell.textContent = "X";
            }
            
            
        } catch (error) {
            cpuTurn(playerCells); // Call itself again until it hits a target
        }


    }

    while(!gameOver) {

        playerTurn();
        cpuTurn();

    }


}


export { playGame, placeAllBoats };