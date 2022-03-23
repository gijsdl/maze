console.log("main loaded");
const mazeDiv = document.querySelector(".maze");

const size = 50;
const cellList = [];
const stack = [];
let current;
let drawMazeTime;

setup();

function setup() {
    mazeDiv.style.gridTemplateColumns = `repeat(${size}, 1fr`;
    mazeDiv.style.gridTemplateRows = `repeat(${size}, 1fr`;
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const cellEl = document.createElement("div");
            cellEl.classList.add("cell");
            cellEl.style.gridArea = `${x + 1}/${y + 1}/${x + 2}/${y + 2}`
            mazeDiv.appendChild(cellEl);
            cellList.push(new Cell(x, y, cellEl));
        }
    }
}
startMaze();
function startMaze(){
    current = cellList[0];
    current.setVisited();
    stack.push(current);
    drawMazeTime = setInterval(()=>{
        drawMaze();
    }, 10);
}


function drawMaze(){
    let visitedLeft = false;
    cellList.forEach((cell) =>{
        if (!cell.viseted){
            visitedLeft = true;
        }
        cell.show();
    })
    if (visitedLeft) {
        const next = current.checkNeighbors();
        // console.log(next)
        if (next) {
            next.setVisited();
            stack.push(next);
            removeWall(current, next);
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        }
    }else {
        clearInterval(drawMazeTime);
        console.log("maze drawn")
    }
}

function getIndex(x,y){
    if (x < 0 || y < 0 || x > size - 1 || y >size -1){
        return undefined;
    }
    return x * size + y;
}

function removeWall(current, next){
    const x = current.x - next.x;
    if (x === 1){
        current.walls[0] = false;
        next.walls[2] = false;
    }else if(x === -1){
        current.walls[2] = false;
        next.walls[0] = false;
    }

    const y = current.y - next.y;
    if (y === 1){
        current.walls[3] = false;
        next.walls[1] = false;
    }else if(y === -1){
        current.walls[1] = false;
        next.walls[3] = false;
    }
}