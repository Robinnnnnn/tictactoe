//Module
const Gameboard = (function() {

    return {
        boardArr: ["", "", "", "", "", "", "", "", ""],
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

const GameLogic = (function() {
    //controlls users inputs and relays info to Gameboard
    //Doesnt allow moves to be played in the same spot

    let moveTracker = 1;
    const identifySpot = Array.from(document.getElementsByClassName('spots'));


    return {

        rulesOne: function() {

            for (let i = 0; i < identifySpot.length; i++) {
                identifySpot[i].setAttribute('id', 'spot' + i);
                identifySpot[i].addEventListener('click', function(event) {
                    if (moveTracker % 2 == 0) {
                        event.target.textContent = player1.playerMark;
                        moveTracker++;
                    } else {
                        event.target.textContent = player2.playerMark;
                        moveTracker++;
                    }
                })
            };
        }
    }

})();

GameLogic.rulesOne();