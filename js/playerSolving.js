let player

function startSolve() {
    reset();
    player = new Player(cellList[0]);
    player.cell.getElement().classList.add("player");
    cellFirst.classList.add("path");
    document.addEventListener("keydown", checkKey);
}

function checkKey(e) {
    switch (e.key) {
        case "ArrowUp":
            player.goUp();
            break;
        case "ArrowRight":
            player.goRight();
            break;
        case "ArrowDown":
            player.goDown();
            break;
        case "ArrowLeft":
            player.goLeft();
            break;
    }
}