
const playerFactory = (name, symbol) => {
    const sayHello = () => console.log('hello!'); 
    return { name, symbol, sayHello };
}; 


const gameBoardModule = (() => {
    const gameBoard = ["x","","","","","x","","",""];
    const setField = (index, symbol) => {
        gameBoard[index] = symbol;
    }
    const getField = (index) => {
        return gameBoard[index];

    }
    const reset = () => {

    }
    return {setField, getField, reset };
})();

const displayController = (() => {


})();

const gameController = (() => {

    const player1 = playerFactory('jeff', 'X');
    const player2 = playerFactory('bill', 'O');
    //const gameBoard = gameBoardModule();

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

    const boardDisplay = document.querySelector(".boardContainer");
    boardDisplay.setAttribute('style', 'display: grid');   


    const updateBoard = () => {
        for(x = 0; x < 9; x++){
            const square = document.querySelector(`#board${x}`);
            square.textContent = gameBoardModule.getField(x);
        }
    };
    updateBoard();
   
})();



