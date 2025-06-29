const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', '']

    const render = () => {
        let boardHTML = '';
        gameboard.forEach((square, index) => {
            boardHTML += `<div class='square' id='square-${index}'>${square}</div>`
        }) 
        document.querySelector('#gameboard').innerHTML = boardHTML;
          const squares = document.querySelectorAll('.square');
            squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick);
        });
    }


    const update = (index, value) => {
        gameboard[index] = value;
        render( );
    };


    const getGameboard = () => gameboard;


    return {
        render,
        update,
        getGameboard
    }
})();


    const Game = (() => {
        let players = [];
        let currentPlayerIndex = 0;
        let gameOver;

        const createPlayer = (name, mark) => {
            return {
                name,
                mark
            }
        }
      
      
        const start = () => {
            players = [
                createPlayer(document.querySelector('#player1').value, 'X'),
                createPlayer(document.querySelector('#player2').value, 'O')
            ]
            currentPlayerIndex = 0;
            gameOver = false;
            Gameboard.render()
             const squares = document.querySelectorAll('.square');
            squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick);
        });
    }
        const handleClick = (event) => {
            let index = parseInt(event.target.id.split('-')[1]);
            if (Gameboard.getGameboard() [index] !== '')
                return;

            Gameboard.update(index, players[currentPlayerIndex].mark);

            if (checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
                gameOver = true;
                alert(`${players[currentPlayerIndex].name} won!`)
            } else if (checkForTie(Gameboard.getGameboard())) {
                gameOver = true;
                alert(`Its a tie`)
            }

            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        }

        const restart = () => {
            for (let i = 0; i < 9; i++) {
                Gameboard.update(i, '');
            }
            Gameboard.render();
        }



        return {
            start,
            restart,
            handleClick
        }


    })();

function checkForWin(board) {
    const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ]
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkForTie(board) {
    return board.every(cell => cell !== '')
}


const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');

startButton.addEventListener('click', () => {
    Game.start();
});

restartButton.addEventListener('click', () => {
Game.restart();
});

