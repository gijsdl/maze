let pathTimer;
let openSet = [];
let closedSet = [];
let start;
let end;
let path = [];
let done = false;

function startPathFinding() {
    runMazeBtn.disabled = true;
    start = cellList[0];
    end = cellList[cellList.length - 1];
    openSet = [];
    closedSet = [];
    done = false;
    cellLast.classList.remove("path");
    cellFirst.classList.remove("path");
    cellList.forEach((cell) => {
        cell.reset();
        cell.checkNeighborsPath();
    });
    openSet.push(start);
    cellFirst.classList.add("path");
    pathTimer = setInterval(() => {
        drawPathFinding();
    }, 1);
}


function removeFromArray(arr, element) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === element) {
            arr.splice(i, 1);
        }
    }
}

function getHeuristic(cell, end) {
    return Math.abs(cell.x - end.x) + Math.abs(cell.y - end.y);
}

function drawPathFinding() {
    if (openSet.length > 0) {

        let winner = 0;

        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].totalLength < openSet[winner].totalLength) {
                winner = i;
            }
        }

        current = openSet[winner];

        if (current === end) {
            clearInterval(pathTimer);
            done = true;
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

        current.neighborsPath.forEach((neighbor) => {
            if (neighbor) {
                if (!closedSet.includes(neighbor)) {
                    let tempStepTaken = current.stepsTaken + 1;
                    if (openSet.includes(neighbor)) {
                        if (tempStepTaken < neighbor.stepsTaken) {
                            neighbor.stepsTaken = tempStepTaken;
                        }
                    } else {
                        neighbor.stepsTaken = tempStepTaken;
                        openSet.push(neighbor);
                    }
                    neighbor.heuristic = getHeuristic(neighbor, end);
                    neighbor.totalLength = neighbor.stepsTaken + neighbor.heuristic;
                    neighbor.previous = current;
                }
            }
        })

    } else {
        clearInterval(pathTimer);
        done = true;
        console.log("no solution");
    }

    cellList.forEach((cell) => {
        cell.removeClasses();
    });

    closedSet.forEach((cell) => {
        cell.getElement().classList.add("visited");
    });

    openSet.forEach((cell) => {
        cell.getElement().classList.add("current");
    });

    path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }
    path.forEach((cell) => {
        cell.getElement().classList.add("path");
    });

    if (done){
        cellList.forEach((cell) => {
            cell.removeExcesClasses();
        });
        cellLast.classList.add("path");
        runMazeBtn.disabled = false;
    }
}