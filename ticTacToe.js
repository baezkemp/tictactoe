var playerOne = "X";
var playerTwo = "O";
var currPlayer = playerOne;

var gameOver = false;
var board;

var gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    whosTurn();

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", setTile);
            document.getElementById("board").append(tile);
        }
    }

}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') {
        return;
    }

    board[r][c] = currPlayer;
    this.innerText = currPlayer;

    currPlayer = currPlayer == playerOne ? playerTwo : playerOne;

    checkWinner();
}

function whosTurn() {
    let winner = document.getElementById("winner");
    winner.innerText = "It's " + currPlayer + "'s Turn"; 
}

function checkWinner() {
    // horizontal
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            for (let c = 0; c < 3; c++){
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                tile.classList.add("winner");
            }
            setWinner(r, 0);
            return;
        } else {
            whosTurn();
        }
    }

    // vertical
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' ') {
            for (let r = 0; r < 3; r++){
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                tile.classList.add("winner");
            }
            setWinner(0, c);
            return;
        } else {
            whosTurn();
        }
    }

    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
            tile.classList.add("winner"); 
        }
        setWinner(0, 0);
        return;
    } else {
        whosTurn();
    }

    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");                
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        setWinner(0, 2);
        return;
    } else {
        whosTurn();
    }

    // draw
    let boardFill = [];
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3 ; c++) {
            if (board[r][c] != ' ') {
                boardFill.push(board[r][c]);
            }
        }
    }
    if (boardFill.length == 9){
        let winner = document.getElementById("winner");
                    winner.innerText = "Draw!";
                    gameOver = true;
                    return;
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    winner.innerText = board[r][c] + " Wins!";
    gameOver = true;
}