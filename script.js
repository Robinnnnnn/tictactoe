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

const player1 = PlayerFactory("Player 1", 'X');
const player2 = PlayerFactory("Player 2", 'O');

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

    let moveTracker = 1;
    const identifySpot = Array.from(document.getElementsByClassName('spots'));

    const ruleOne = () => {
        for (let i = 0; i < identifySpot.length; i++) {
            identifySpot[i].setAttribute('id', 'spot' + i);
            identifySpot[i].addEventListener('click', function (event) {
                if (moveTracker % 2 == 0 && event.target.textContent == "") {
                    event.target.textContent = player1.playerMark;
                    moveTracker++;
                    ruleTwo();
                } else if (moveTracker % 2 == 1 && event.target.textContent == "") {
                    event.target.textContent = player2.playerMark;
                    moveTracker++;
                    ruleTwo();
                } else {
                    //Will add functionality to blink red to show cant make that move
                    console.log("ERROR - Mark Here Already")
                }
            })
        };


    }

    const ruleTwo = () => {
        for (let i = 0; i < identifySpot.length; i++) {
            Gameboard.boardArr[i] = identifySpot[i].textContent;
        }

    }

    const ruleThree = () => {
        if (moveTracker == 8) {
            console.log("Draw");
            for (let i = 0; i < Gameboard.boardArr.length; i++) {
                Gameboard.boardArr[i] == "";
            }
            moveTracker = 0;
        }

    }

    return {
        invokeRuleOne: function () {
            ruleOne();
        },

        invokeRuleThree: function () {
            ruleThree();
        }

    }

})();

GameLogic.invokeRuleOne();
GameLogic.invokeRuleThree();