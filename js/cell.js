class Cell {
    constructor(x, y, element) {
        this.x = x;
        this.y = y;
        this.element = element;
        this.viseted = false;
        this.walls = [true, true, true, true];
        this.allNeighbors = [];
        this.totalLength = 0;
        this.stepsTaken = 0;
        this.heuristic = 0;
        this.previous = undefined;
        this.neighborsPath = [];
        this.timesVisited = 0;
    }

    show() {
        if (!this.walls[0]) {
            this.element.style.borderTop = "none";
        }
        if (!this.walls[1]) {
            this.element.style.borderRight = "none";
        }
        if (!this.walls[2]) {
            this.element.style.borderBottom = "none";
        }
        if (!this.walls[3]) {
            this.element.style.borderLeft = "none";
        }
    }

    getAllNeighbors() {
        this.allNeighbors = [];
        this.allNeighbors.push(cellList[getIndex(this.x - 1, this.y)]);//boven
        this.allNeighbors.push(cellList[getIndex(this.x, this.y + 1)]);//rechts
        this.allNeighbors.push(cellList[getIndex(this.x + 1, this.y)]);//beneden
        this.allNeighbors.push(cellList[getIndex(this.x, this.y - 1)]);//links
    }

    checkNeighbors() {
        const neighbors = [];

        this.allNeighbors.forEach((neighbor) => {
            if (neighbor && !neighbor.viseted) {
                neighbors.push(neighbor);
            }
        });

        if (neighbors.length > 0) {
            let index = Math.floor(Math.random() * neighbors.length);
            return neighbors[index];
        } else {
            return undefined;
        }

    }

    checkNeighborsPath() {
        const neighbors = [];
        for (let i = 0; i < 4; i++) {
            if (this.allNeighbors[i] && !this.walls[i]) {
                neighbors.push(this.allNeighbors[i]);
            }
        }
        this.neighborsPath = neighbors;
    }


    getElement() {
        return this.element;
    }

    setVisited() {
        this.viseted = true;
        this.element.classList.add("visited");
        this.element.classList.add("current");
    }

    removeClasses() {
        const classes = [];
        if (this.element.classList.contains("route-taken")) {
           classes.push("route-taken");
        }
        if (this.element.classList.contains("route")) {
            classes.push("route");
        }
        this.element.classList = "cell"
        classes.forEach((cssClass)=>{
            this.element.classList.add(cssClass);
        });

    }

    removeExcessClasses() {
        this.element.classList.remove("visited");
        this.element.classList.remove("current");
    }

    reset() {
        this.totalLength = 0;
        this.stepsTaken = 0;
        this.heuristic = 0;
        this.previous = undefined;
    }
}