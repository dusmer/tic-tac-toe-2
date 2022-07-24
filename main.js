
//Player Factory to add name and symbol for each player
const playerFactory = (name, symbol) => {
    return { name, symbol };
}; 

//GameBoardModule controls the array that represents the gameboard
const gameBoardModule = (() => {
    const gameBoard = ["","","","","","","","",""];
    let openSpots = [];

    //Set value for board
    const setField = (symbol, index) => {
        gameBoard[index] = symbol;
    }
    //Return value for board
    const getField = (index) => {
        return gameBoard[index];

    }
    //Reset each board space to empty for a new game
    const reset = () => {
        for (x = 0; x < 9; x++){
            gameBoard[x] = "";
        }
    }

    //Check if the board array is full, represented by no more empty values
    const tie = () => {
        return gameBoard.includes("");
    }

    //Return all available empty spots for AI turn
    const openSpot = () => {
       openSpots = [];
        gameBoard.map((currElement, index) => {
            if (currElement == ""){
                openSpots.push(index);
            }
            
        })
        return openSpots;
    }

    return {setField, getField, reset,tie, openSpot };
})();


//GameController Module controls the flow of the game
const gameController = (() => {

    //Variables for players and gameState
    let currentPlayer;
    let player1;
    let player2;
    let gameState = 0;

    const player1Name = document.querySelector("#playerName1");
    const player2Name = document.querySelector('#playerName2');
    const scoreBoard = document.querySelector(".scoreBoard");
    const AI = document.querySelector('#AI');

    const winCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8], 
        [2,4,6],
    ];

    //Switch the player turn, and if AI turn, execute function for their turn
    function switchPlayer(current){

        switch(current){
            case player1:{
                currentPlayer = player2;
                if (AI.checked == true && gameState == 1){
                    AIturn();
                }
                break;
            }
            case player2:{
                currentPlayer = player1;
                break;
            }
        }

    }

    //Find all available spots and set a random spot for the AI turn. Update the board and check if winner, then switch back to player 1
    function AIturn(){
        availableSpots = gameBoardModule.openSpot();
        const spot = availableSpots[Math.floor(Math.random()*availableSpots.length)];
        gameBoardModule.setField(player2.symbol,spot);

        updateBoard();
        gameStatus();
        switchPlayer(currentPlayer);
    }

    //Update the display with the current board values
    const updateBoard = () => {
        for(x = 0; x < 9; x++){
            const square = document.querySelector(`#board${x}`);
            square.textContent = gameBoardModule.getField(x);
        }

    };

    updateBoard();

    //Check if the game should continue
    const gameStatus = () => {

        const scoreContainer = document.querySelector(".scoreBoard");
        //Check if the current board mateches any of the win conditions specified in the win condition array. If not, check if there's a tie
        winCondition.forEach((item,index) =>{
            if (gameBoardModule.getField(item[0]) == gameBoardModule.getField(item[1]) && gameBoardModule.getField(item[0]) == gameBoardModule.getField(item[2]) && gameBoardModule.getField(item[0]) != ""){
                console.log("should win");
                scoreContainer.textContent = `${currentPlayer.name} wins!`;
                gameState = 0;
                
            }else if(gameBoardModule.tie() == false && gameState == 1){
                scoreContainer.textContent = "That's a dang ass tie!";
                gameState = 0;
            }

        })

    }

    //Starting a new game by resetting board, creating players, and updating the scoreboard
    const start = document.querySelector("#startButton");
    start.addEventListener('click', () => {
        const boardDisplay = document.querySelector(".boardContainer");
        boardDisplay.setAttribute('style', 'display: grid');  

        gameBoardModule.reset();
        gameState = 1;

        player1 = playerFactory(player1Name.value, 'X');
        player2 = playerFactory(player2Name.value, 'O'); 

        scoreBoard.textContent = `${player1.name} VS ${player2.name}`        
        currentPlayer = player1;
        updateBoard();
        eventListeners();
    })

    //Add event listeners for each spot on the board, and if it's a valid spot, add the player syv=mbol to the board when clicked
    const eventListeners = () => {
        const squareClass = document.querySelectorAll(".symbol"); 
        squareClass.forEach((square) => {
            square.addEventListener('click', () => {

                if (gameBoardModule.getField(square.dataset.position) == "" && gameState == 1){
                    gameBoardModule.setField(currentPlayer.symbol, square.dataset.position);
                    updateBoard();
                    gameStatus();
                    switchPlayer(currentPlayer);

                    
                }

            });
        });
    };
   
})();

