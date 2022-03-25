console.log("main loaded");
const mazeDiv = document.querySelector(".maze");

const size = 50;
const cellList = [];
const stack = [];
let current;
let drawMazeTime;

setup();

function setup() {
    mazeDiv.style.gridTemplateColumns = `repeat(${size +2}, 1fr`;
    mazeDiv.style.gridTemplateRows = `repeat(${size}, 1fr`;
    const cellFirst = document.createElement("div");
    cellFirst.classList.add("cell");
    cellFirst.style.gridArea = `1/1/2/2`
    cellFirst.style.borderRight = "none";
    mazeDiv.appendChild(cellFirst);
    const LeftFill = document.createElement("div");
    LeftFill.classList.add("fill");
    LeftFill.style.gridArea = `2/1/${size + 1}/2`
    LeftFill.style.borderLeft = "none";
    mazeDiv.appendChild(LeftFill);
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const cellEl = document.createElement("div");
            cellEl.classList.add("cell");
            cellEl.style.gridArea = `${x + 1}/${y + 2}/${x + 2}/${y + 3}`
            mazeDiv.appendChild(cellEl);
            cellList.push(new Cell(x, y, cellEl));
        }
    }
    const rightFill = document.createElement("div");
    rightFill.classList.add("fill");
    rightFill.style.gridArea = `1/${size + 2}/${size}/${size +3}`
    rightFill.style.borderRight = "none";
    mazeDiv.appendChild(rightFill);
    const cellLast = document.createElement("div");
    cellLast.classList.add("cell");
    cellLast.style.gridArea = `${size}/${size + 2}/${size + 1}/${size + 3}`
    cellLast.style.borderLeft = "none";
    mazeDiv.appendChild(cellLast);
}

startMaze();
function startMaze(){
    cellList[0].walls[3] = false;
    cellList[cellList.length - 1].walls[1] = false;
    current = cellList[0];
    current.setVisited();
    stack.push(current);
    drawMazeTime = setInterval(()=>{
        drawMaze();
    }, 1);
}


function drawMaze(){
    let visitedLeft = false;
    cellList.forEach((cell) =>{
        if (!cell.viseted){
            visitedLeft = true;
        }
        cell.show();
    })
    current.getElement().classList.remove("current");
    if (visitedLeft) {
        const next = current.checkNeighbors();
        if (next) {
            next.setVisited();
            stack.push(next);
            removeWall(current, next);
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
            current.getElement().classList.add("current");
        }
    }else {
        clearInterval(drawMazeTime);
        cellList.forEach((cell) =>{
            cell.getElement().classList.remove("visited");
        })
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