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
                } else if (moveTracker % 2 == 1 && event.target.textContent == "") {
                    event.target.textContent = player2.playerMark;
                    moveTracker++;
                } else {
                    //Will add functionality to blink red to show cant make that move
                    console.log("ERROR Move Here Alread")
                }
            })
        };
    }

    const ruleTwo = () => {
        let spots = Array.from(document.getElementsByClassName('spots'));
        for (let i = 0; i < spots.length; i++) {
            Gameboard.boardArr[i] = spots[i].textContent;
        }
    }

    const ruleThree = () => {
        //How to win logic goes here

    }

    return {
        invokeRuleOne: function () {
            ruleOne();
        },

        invokeRuleTwo: function () {
            ruleTwo();
        },

    }

})();

GameLogic.invokeRuleOne();
GameLogic.invokeRuleTwo();