// se um jogador escolhe uma posição, preciso armazenar em variável de ESCOLHIDOS e na variável correspondente a pontuação do player da rodada. 
// ao escolher uma posição, verifica se a posição já foi escolhida. Se não foi, ela vai para ESCOLHIDOS e para pontuação do player da rodada.
// Ao final de rodada há uma verificação pra saber se o player da rodada pontuou com:
// uma linha: (se ele tem 3 arrays com primeiro elemento iguais, ex: [0,1], [0,2], [0,0])
// uma diagonal: (se ele tem arrays com todos os números iguais( [0,0], [1,1] ou [2,2]) ou a pontuação [2,0], [1,1] e [0,2]) 
// em pé: (se ele tem todos os números da esquerda diferentes e da direita iguais, exemplo: [0,0], [1,0], [2,0])
// basicamente a lógica é: linha [n, n+1, n+2] / coluna [n, n+3, n+6] / diagonal [n, n+4, n+8] ou [n, n+2, n+4]

const createJogo = () => {
    const gameBoard = {
        // board2: [[0,0], [0,1], [0,2],
        //         [1,0], [1,1], [1,2],
        //         [2,0], [2,1], [2,2]],
        board: [1,2,3,
                4,5,6,
                7,8,9],
    
        currentPlayer: "O",
        escolhido: [],
        escolhaX: [],
        escolhaO: [],
        ptsX: 0,
        ptsY: 0,
        count: 0,
    };
    
    const addPtsX = () => gameBoard.ptsX++;
    const getPtsX = () => gameBoard.ptsX;
    const addPtsO = () => gameBoard.ptsY++;
    const getPtsO = () => gameBoard.ptsY;

    const getPlacar = () => `Player X: ${getPtsX()} pts / Player O: ${getPtsO()} pts`;
    const getCount = () => gameBoard.count;

    const getRandomChoice = () => {
        return Math.floor(Math.random() * 9) + 1;
    };
    
    const fillX = function(player) {
        gameBoard.escolhaX.push(player);
    };
    
    const fillO = function(player) {
        gameBoard.escolhaO.push(player);
    };
    
    const fillEscolhidos = (player) => {
        gameBoard.escolhido.push(player);
        return gameBoard.escolhido;
    };

    const getEscolhaX = () => {
        let player = getRandomChoice();
        if (!gameBoard.escolhido.includes(player)) {
            fillX(player);
            fillEscolhidos(player);
            console.log(`${gameBoard.currentPlayer}: ${player} /\n${gameBoard.currentPlayer} escolhidas: ${gameBoard.escolhaX}\n`);
        } else {
            return false || getEscolhaX();
        };
    };

    const getEscolhaO = () => {
        let player = getRandomChoice();
        if (!gameBoard.escolhido.includes(player)) {
            fillO(player);
            fillEscolhidos(player);
            console.log(`${gameBoard.currentPlayer}: ${player} /\n${gameBoard.currentPlayer} escolhidas: ${gameBoard.escolhaO}\n`);
        } else {
            return false || getEscolhaO();
        };
    };

    const getEscolha = function() {
        if (gameBoard.currentPlayer === "X") {
            gameBoard.currentPlayer = "O";
        } else {
            gameBoard.currentPlayer = "X";
        };
    
        switch (gameBoard.currentPlayer) {
            case "X":
                getEscolhaX();
                break;
            case "O":
                getEscolhaO();
                break;
            default:
                console.log("Erro, nem X nem O");
                break;
        };
    };

    const winCombos = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7],
    ];


    const resetGame = () => {
        gameBoard.count++;
        gameBoard.escolhido = [];
        gameBoard.escolhaO = [];
        gameBoard.escolhaX = [];
        if ((getPtsO() === 3) || (getPtsX() === 3)) {
            console.log("\n----------FIM DE JOGO----------\n");
        } else {
            console.log("\n------INICIO DA PROXIMA RODADA-----\n");
        }
    }

    const checkWin = () => {
        const playerXHasWon = winCombos.some(combo => {
            return combo.every(cell => gameBoard.escolhaX.includes(cell));
        });
        const playerOHasWon = winCombos.some(combo => {
            return combo.every(cell => gameBoard.escolhaO.includes(cell));
        });
        
        let win = false;
        if (playerXHasWon) {
            addPtsX();
            console.log(`\nPlayer X venceu!\n`);
            console.log(getPlacar());
            win = true;
            resetGame();
        } else if (playerOHasWon) {
            addPtsO();
            console.log(`\nPlayer O venceu!\n`);
            console.log(getPlacar());
            win = true;
            resetGame();
        } else if (gameBoard.escolhido.length === 9 && win != true) {
            console.log("\nEmpate\n");
            console.log(getPlacar());
            resetGame();
        }; 

        if (getPtsX() === 3) {
            console.log("VITORIA! Player X venceu 3!\n");
            return true;
        } else if (getPtsO() === 3) {
            console.log("DERROTA! Player O venceu 3!\n");
            return true;
        }         
        
        return false;
    };


    //const getGameBoard = () => gameBoard.escolhido;

    return { getEscolha, checkWin, getCount };
};

const jogo = (function() {
    const ticTacToe = createJogo();
    let end = false;
    while (!end) {
        ticTacToe.getEscolha();
        end = ticTacToe.checkWin();
    };
    console.log(`Foram ${ticTacToe.getCount()} rodadas\n`);
})();
