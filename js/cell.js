class Cell{
    constructor(x, y, element) {
        this.x = x;
        this.y = y;
        this.element = element;
        this.viseted = false;
        this.walls = [true, true, true, true];
    }

    show() {
        if (!this.walls[0]) {
            this.getElement().style.borderTop = "none";
        }
        if (!this.walls[1]) {
            this.getElement().style.borderRight = "none";
        }
        if (!this.walls[2]) {
            this.getElement().style.borderBottom = "none";
        }
        if (!this.walls[3]) {
            this.getElement().style.borderLeft = "none";
        }
    }

    checkNeighbors() {
        const neighbors = [];
        const allNeighbors = [];
        allNeighbors.push(cellList[getIndex(this.x, this.y -1)]);
        allNeighbors.push(cellList[getIndex(this.x + 1, this.y)]);
        allNeighbors.push(cellList[getIndex(this.x, this.y +1)]);
        allNeighbors.push(cellList[getIndex(this.x - 1, this.y)]);

        allNeighbors.forEach((neighbor) =>{
           if (neighbor && !neighbor.viseted){
               neighbors.push(neighbor);
           }
        });

        if (neighbors.length > 0){
            let index = Math.floor(Math.random() * neighbors.length);
            return neighbors[index];
        }else {
            return undefined;
        }

    }


    getElement(){
        return this.element;
    }

    setVisited(){
        this.viseted = true;
        this.getElement().classList.add("visited");
        this.getElement().classList.add("current");
    }
}