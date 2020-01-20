//Module
const Gameboard = (function () {

    let board = ["", "", "", "", "", "", "", "", ""];

    return {
        boardArr: board,
    }
})();



//Factory Functions
const PlayerFactory = (player, mark) => {
    const playerName = player;
    const playerMark = mark;

    return {
        playerName,
        playerMark,
    }

}

const player1 = PlayerFactory("Player 1", "X");
const player2 = PlayerFactory("Player 2", "O");

function render() {
    //renders the array from Gameboard to screen
    const gameContainer = document.getElementById('gameContainer');

    Gameboard.boardArr.forEach(spot => {
        const position = document.createElement('div');
        position.setAttribute('class', 'spots');
        position.textContent = spot;

        gameContainer.appendChild(position);
    });

}

render();

//Module IIFE
const GameLogic = (function () {
    //controlls users inputs and relays info to Gameboard
    //Doesnt allow moves to be played in the same spot

    let moveTracker = 0;
    const identifySpot = Array.from(document.getElementsByClassName('spots'));
    let winsTracker = 0;
    let currentGameTracker = 0;

    const playGame = () => {
        for (let i = 0; i < identifySpot.length; i++) {
            identifySpot[i].setAttribute('id', 'spot' + i);
            identifySpot[i].addEventListener('click', function (event) {
                if ((moveTracker + 1) % 2 == 0 && event.target.textContent == "") {
                    event.target.textContent = player1.playerMark;
                    moveTracker++;
                    matchArrayToBoard();
                    checkForWin(player1.playerMark);
                    checkForDraw();
                    currentGameTracker = 0;
                } else if ((moveTracker + 1) % 2 == 1 && event.target.textContent == "") {
                    event.target.textContent = player2.playerMark;
                    moveTracker++;
                    matchArrayToBoard();
                    checkForWin(player2.playerMark);
                    checkForDraw();
                    currentGameTracker = 0;
                } else {
                    //Will add functionality to blink red to show cant make that move
                    console.log("ERROR - Mark Here Already")
                }
            })
        };


    }

    //sets gameboard array = to the spots played
    const matchArrayToBoard = () => {
        for (let i = 0; i < identifySpot.length; i++) {
            Gameboard.boardArr[i] = identifySpot[i].textContent;
        }

    }

    //clears the board on a draw, clear boardArr on draw
    const checkForDraw = () => {
        if (moveTracker > 8 && currentGameTracker == 0) {
            console.log("draw");
            setTimeout(clearBoard, 1000);
            moveTracker = 0;
            matchArrayToBoard();
        }

    }
    //clears the booard and Gameboard Array
    const clearBoard = () => {
        for (let i = 0; i < identifySpot.length; i++) {
            identifySpot[i].textContent = "";
            Gameboard.boardArr[i] = "";
        }
    }

    // checks board for winning solutions
    const checkForWin = playersMark => {
        //start @ when movetracker = 5;
        console.log(playersMark);
        if (moveTracker > 4) {
            if ((Gameboard.boardArr[0] === playersMark) && (Gameboard.boardArr[1] === playersMark) && (Gameboard.boardArr[2] === playersMark)) {
                playerWins(playersMark);
            } else if ((Gameboard.boardArr[3] === playersMark) && (Gameboard.boardArr[4] === playersMark) && (Gameboard.boardArr[5] === playersMark)) {
                playerWins(playersMark);
            } else if ((Gameboard.boardArr[6] === playersMark) && (Gameboard.boardArr[7] === playersMark) && (Gameboard.boardArr[8] === playersMark)) {
                playerWins(playersMark);
            } else if ((Gameboard.boardArr[0] === playersMark) && (Gameboard.boardArr[3] === playersMark) && (Gameboard.boardArr[6] === playersMark)) {
                playerWins(playersMark);
            } else if ((Gameboard.boardArr[1] === playersMark) && (Gameboard.boardArr[4] === playersMark) && (Gameboard.boardArr[7] === playersMark)) {
                playerWins(playersMark);
            } else if ((Gameboard.boardArr[2] === playersMark) && (Gameboard.boardArr[5] === playersMark) && (Gameboard.boardArr[8] === playersMark)) {
                playerWins(playersMark);
            } else if ((Gameboard.boardArr[2] === playersMark) && (Gameboard.boardArr[4] === playersMark) && (Gameboard.boardArr[6] === playersMark)) {
                playerWins(playersMark);
            } else if ((Gameboard.boardArr[0] === playersMark) && (Gameboard.boardArr[4] === playersMark) && (Gameboard.boardArr[8] === playersMark)) {
                playerWins(playersMark);
            }
        }
    }

    const playerWins = (playersMark) => {
        if (playersMark === "X") {
            console.log("Player 1 Wins!");
            winsTracker++;
            currentGameTracker++;
            moveTracker = 0;
            setTimeout(clearBoard, 2000);
            adjustScoreBoard(playersMark);
        } else {
            console.log("Player 2 Wins!");
            winsTracker++;
            currentGameTracker++;
            moveTracker = 0;
            setTimeout(clearBoard, 1200);
            adjustScoreBoard(playersMark);
        }
    }

    //adjusts the score of the game
    const adjustScoreBoard = (playersMark) => {
        const playerOneBoard = document.getElementById('score1');
        const playerTwoBoard = document.getElementById('score2');

        if (playersMark === "X") {
            playerOneBoard.textContent = parseInt(playerOneBoard.textContent) + 1;
        } else {
            playerTwoBoard.textContent = parseInt(playerOneBoard.textContent) + 1;
        }

    }

    return {
        invokePlayGame: function () {
            playGame();
        },

    }

})();

GameLogic.invokePlayGame();
