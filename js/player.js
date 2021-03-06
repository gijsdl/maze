class Player {
    constructor(cell) {
        this.cell = cell;
        this.route = [];
        this.route.push(this.cell);
        this.path = [];
        this.path.push(this.cell);
        this.cell.timesVisited++;
    }

    goUp() {
        this.move(0)
    }

    goRight() {
        this.move(1);
    }

    goDown() {
        this.move(2);
    }

    goLeft() {
        this.move(3);
    }

    move(direction) {
        if (!this.cell.walls[direction]) {
            let next = this.cell.allNeighbors[direction];
            if (next) {
                this.cell.getElement().classList.remove("player");
                this.cell = next;
                if (next !== cellList[cellList.length - 1]) {
                    this.cell.timesVisited++;
                    this.route.push(this.cell);
                    if (next === this.path[this.path.length - 2]) {
                        this.path.pop();
                    } else {
                        this.path.push(this.cell);
                    }
                    this.cell.getElement().classList.add("player");
                    this.route.forEach((cell) => {
                        let times = 0.5 + cell.timesVisited / 10;
                        cell.getElement().style.backgroundColor = `rgba(205, 50, 50, ${times})`;
                        cell.getElement().classList.add("route-taken");
                    });
                } else {
                    this.path.push(next);
                    this.route.forEach((cell) => {
                        cell.getElement().style.backgroundColor = null;
                    });
                    this.path.forEach((cell) => {
                        cell.getElement().classList.add("route");
                    });
                    cellLast.classList.add("route");
                    document.removeEventListener("keydown", checkKey);
                }
            }
        }
    }

}