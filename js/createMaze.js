let stack = [];
let current;
let drawMazeTimer;

function startMaze() {
    cellList[0].walls[3] = false;
    cellList[cellList.length - 1].walls[1] = false;
    current = cellList[Math.floor(Math.random() * cellList.length - 1)];
    current.setVisited();
    stack.push(current);
    drawMazeTimer = setInterval(() => {
        drawMaze();
    }, 1);
}


function drawMaze() {
    let visitedLeft = false;
    cellList.forEach((cell) => {
        if (!cell.viseted) {
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
    } else {
        clearInterval(drawMazeTimer);
        cellList.forEach((cell) => {
            cell.removeClasses();
        });
        runWrapper.classList.remove("hidden");
    }
}

function getIndex(x, y) {
    if (x < 0 || y < 0 || x > mapSize - 1 || y > mapSize - 1) {
        return undefined;
    }
    return x * mapSize + y;
}

function removeWall(current, next) {
    const x = current.x - next.x;
    if (x === 1) {
        current.walls[0] = false;
        next.walls[2] = false;
    } else if (x === -1) {
        current.walls[2] = false;
        next.walls[0] = false;
    }

    const y = current.y - next.y;
    if (y === 1) {
        current.walls[3] = false;
        next.walls[1] = false;
    } else if (y === -1) {
        current.walls[1] = false;
        next.walls[3] = false;
    }
}