console.log("main loaded");
const mazeDiv = document.querySelector(".maze");
const mazeSizeSlider = document.querySelector(".size-slider");
const mazeSizeValue = document.querySelector(".size-value");
const makeMapBtn = document.querySelector(".make-map-btn");

let size;
let mapSize;
let cellList = [];

setup();

function setup() {
    size = Number(mazeSizeSlider.value);
    mazeSizeValue.textContent = size;

    mazeSizeSlider.oninput = () => {
        size = Number(mazeSizeSlider.value);
        mazeSizeValue.textContent = size ;
    };
    mazeSizeSlider.addEventListener("keypress", (e)=>{
        if (e.key === "Enter"){
            mazeSetup();
        }
    })
    makeMapBtn.addEventListener("click", mazeSetup);

}

function mazeSetup() {
    mapSize = size;
    cellList = [];
    stack = [];
    if (drawMazeTimer){
        clearInterval(drawMazeTimer);
    }
    mazeDiv.textContent = "";
    mazeDiv.style.gridTemplateColumns = `repeat(${mapSize + 2}, 1fr`;
    mazeDiv.style.gridTemplateRows = `repeat(${mapSize}, 1fr`;
    const cellFirst = document.createElement("div");
    cellFirst.classList.add("cell");
    cellFirst.style.gridArea = `1/1/2/2`
    cellFirst.style.borderRight = "none";
    mazeDiv.appendChild(cellFirst);
    const LeftFill = document.createElement("div");
    LeftFill.classList.add("fill");
    LeftFill.style.gridArea = `2/1/${mapSize + 1}/2`
    LeftFill.style.borderLeft = "none";
    mazeDiv.appendChild(LeftFill);
    for (let x = 0; x < mapSize; x++) {
        for (let y = 0; y < mapSize; y++) {
            const cellEl = document.createElement("div");
            cellEl.classList.add("cell");
            cellEl.style.gridArea = `${x + 1}/${y + 2}/${x + 2}/${y + 3}`
            mazeDiv.appendChild(cellEl);
            cellList.push(new Cell(x, y, cellEl));
        }
    }
    const rightFill = document.createElement("div");
    rightFill.classList.add("fill");
    rightFill.style.gridArea = `1/${mapSize + 2}/${mapSize}/${mapSize + 3}`
    rightFill.style.borderRight = "none";
    mazeDiv.appendChild(rightFill);
    const cellLast = document.createElement("div");
    cellLast.classList.add("cell");
    cellLast.style.gridArea = `${mapSize}/${mapSize + 2}/${mapSize + 1}/${mapSize + 3}`
    cellLast.style.borderLeft = "none";
    mazeDiv.appendChild(cellLast);
    startMaze();
}