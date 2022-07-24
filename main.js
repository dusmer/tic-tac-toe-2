
 
const gameBoardModule = (() => {
    let gameState = 1;
    const start = document.querySelector("#startButton");
    let gameBoard = ["","","","","","","","",""];

    const playerFactory = (name, symbol) => {
        const sayHello = () => console.log('hello!'); 
        return { name, symbol, sayHello };
    };

    const player1 = playerFactory('jeff', 'X');
    const player2 = playerFactory('bill', 'O');

    let currentPlayer = player1;

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

    start.addEventListener('click', () => {
        gameState = 1;
        gameBoardModule.resetGame();
        gameBoardModule.eventListeners();
        const boardDisplay = document.querySelector(".boardContainer");
        boardDisplay.setAttribute('style', 'display: grid');    


    })
    

    const eventListeners = () => {
        const squareClass = document.querySelectorAll(".symbol"); 
        squareClass.forEach((square) => {
            square.addEventListener('click', () => {

                if (gameBoard[square.dataset.position] == "" && gameState == 1){
                    gameBoardModule.addSymbol(currentPlayer.symbol, square.dataset.position);
                    displayBoard();
                    if (currentPlayer == player1 && gameState == 1){
                        currentPlayer = player2;
                        aiMove();
                    } else{
                        currentPlayer = player1;
                    }

                    
                }

            });
        });
    };
    

    const addSymbol = (symbol,position) => {
        gameBoard[position] = symbol;
    }

    const gameStatus = () => {
        winCondition.forEach((item, index) =>{
            if (gameBoard[item[0]] == gameBoard[item[1]] && gameBoard[item[0]] == gameBoard[item[2]] && gameBoard[item[0]] != ""){
                console.log("Win");
                gameState = 0;
                const gameStatusContainer = document.querySelector(".gameStatus");
                gameStatusContainer.textContent = `${currentPlayer.name} (${currentPlayer.symbol}) wins!`;
            }


        })

    }

    const resetGame = () => {
        gameBoard = ["","","","","","","","",""];
        currentPlayer = player1;
        const gameStatusContainer = document.querySelector(".gameStatus");
        gameStatusContainer.textContent = "";
        displayBoard(); 
    }

    const displayBoard = () => {
        for(x = 0; x < 9; x++){
            const square = document.querySelector(`#board${x}`);
            square.textContent = gameBoard[x];
            gameStatus();
        }
    };

    
    const aiMove = () => {
       let openSpots = []
       gameBoard.map((currElement, index) => {
            if (currElement == ""){
                openSpots.push(index);
            }
            
        })
        const spot = openSpots[Math.floor(Math.random()*openSpots.length)];
        addSymbol("O",spot)
        displayBoard();
        currentPlayer = player1;
        console.log(spot);
    }

    return{gameBoard, addSymbol, gameStatus, resetGame, eventListeners};
})();



const gameController = () => {


}