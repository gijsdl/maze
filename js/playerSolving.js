let player

function startSolve(){
    player = new Player(cellList[0]);
    console.log("test")
    document.addEventListener("keydown", (e)=>{
        switch (e.key){
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
    })
}