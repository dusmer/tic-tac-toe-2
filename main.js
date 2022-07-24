
const playerFactory = (name, symbol) => {
    const sayHello = () => console.log('hello!'); 
    return { name, symbol, sayHello };
}; 


const gameBoardModule = (() => {
    const gameBoard = ["","","","","","","","",""];
    let openSpots = [];
    const setField = (symbol, index) => {
        gameBoard[index] = symbol;
    }
    const getField = (index) => {
        return gameBoard[index];

    }
    const reset = () => {
        for (x = 0; x < 9; x++){
            gameBoard[x] = "";
        }
    }
    const tie = () => {

        return gameBoard.includes("");
    }

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



const gameController = (() => {

    let currentPlayer;
    let player1;
    let player2;
    let gameState = 0;

    const player1Name = document.querySelector("#playerName1");
    const player2Name = document.querySelector('#playerName2');
    const scoreBoard = document.querySelector(".scoreBoard");
    const AI = document.querySelector('#AI');





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

    function AIturn(){

        availableSpots = gameBoardModule.openSpot();
        const spot = availableSpots[Math.floor(Math.random()*availableSpots.length)];
        gameBoardModule.setField(player2.symbol,spot);

        updateBoard();
        gameStatus();
        switchPlayer(currentPlayer);


    }


    const updateBoard = () => {
        for(x = 0; x < 9; x++){
            const square = document.querySelector(`#board${x}`);
            square.textContent = gameBoardModule.getField(x);
        }

    };

    updateBoard();

    const gameStatus = () => {

        const scoreContainer = document.querySelector(".scoreBoard");
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


    const start = document.querySelector("#startButton");
    start.addEventListener('click', () => {
        gameBoardModule.reset();
        gameState = 1;



        player1 = playerFactory(player1Name.value, 'X');
        player2 = playerFactory(player2Name.value, 'O'); 

        scoreBoard.textContent = `${player1.name} VS ${player2.name}`        
        currentPlayer = player1;
        updateBoard();
        eventListeners();
    })

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



const displayController = (() => {
    const boardDisplay = document.querySelector(".boardContainer");
    boardDisplay.setAttribute('style', 'display: grid');   


    


})();