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
    const getRodada = () => gameBoard.count;

    const getRandomChoice = () => {
        return Math.floor(Math.random() * 9) + 1;
    };
    
    const fillX = function(escolha) {
        gameBoard.escolhaX.push(escolha);
    };
    
    const fillO = function(escolha) {
        gameBoard.escolhaO.push(escolha);
    };
    
    const fillEscolhidos = (escolha) => {
        gameBoard.escolhido.push(escolha);
        return gameBoard.escolhido;
    };

    const getEscolhaX = (value) => {
        let escolha = value;
        if (!gameBoard.escolhido.includes(escolha)) {
            fillX(escolha);
            fillEscolhidos(escolha);
            console.log(`${gameBoard.currentPlayer}: ${escolha} /\n${gameBoard.currentPlayer} escolhidas: ${gameBoard.escolhaX}\n`);
        } else {
            return false || getEscolhaX(value);
        };
    };

    const getEscolhaO = (value) => {
        let escolha = value;
        if (!gameBoard.escolhido.includes(escolha)) {
            fillO(escolha);
            fillEscolhidos(escolha);
            console.log(`${gameBoard.currentPlayer}: ${escolha} /\n${gameBoard.currentPlayer} escolhidas: ${gameBoard.escolhaO}\n`);
        } else {
            return false || getEscolhaO(value);
        };
    };

    const getEscolha = function(value) {
        if (gameBoard.currentPlayer === "X") {
            gameBoard.currentPlayer = "O";
        } else {
            gameBoard.currentPlayer = "X";
        };
    
        switch (gameBoard.currentPlayer) {
            case "X":
                getEscolhaX(value);
                break;
            case "O":
                getEscolhaO(value);
                break;
            default:
                console.log("Erro, nem X nem O");
                break;
        };
    };

    const winCombos = [
        ["pos1","pos2","pos3"],
        ["pos4","pos5","pos6"],
        ["pos7","pos8","pos9"],
        ["pos1","pos4","pos7"],
        ["pos2","pos5","pos8"],
        ["pos3","pos6","pos9"],
        ["pos1","pos5","pos9"],
        ["pos3","pos5","pos7"],
    ];


    const resetGame = (domObj) => {
        gameBoard.count++;
        gameBoard.escolhido = [];
        gameBoard.escolhaO = [];
        gameBoard.escolhaX = [];
        domObj.cell.innerText = "";
        if ((getPtsO() === 3) || (getPtsX() === 3)) {
            console.log("\n----------FIM DE JOGO----------\n");
        } else {
            console.log("\n------INICIO DA PROXIMA RODADA-----\n");
        };
    };

    const checkWin = (domObj) => {
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
            resetGame(domObj);
        } else if (playerOHasWon) {
            addPtsO();
            console.log(`\nPlayer O venceu!\n`);
            console.log(getPlacar());
            win = true;
            resetGame(domObj);
        } else if (gameBoard.escolhido.length === 9) {
            console.log("\nEmpate\n");
            console.log(getPlacar());
            resetGame(domObj);
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

    const getCurrentPlayer = () => gameBoard.currentPlayer;

    return { getEscolha, checkWin, getRodada, getCurrentPlayer };
};

const model = (jogo) => {
    const domObj = {
        container: document.querySelector('.container'),
        board: document.querySelector(".board"),
        cell: document.querySelectorAll(".cell"),
    };

    const resetGame = () => {
        domObj.cell.innerText = "";
    };

    const eListener = (() => {
        let venceu = false;
        domObj.board.addEventListener("click", (event) => {
            if (event.target.classList.contains('cell')) {
                const clickedCellId = event.target.id;
                console.log(`You clicked ${clickedCellId}`);
                jogo.getEscolha(clickedCellId);
                if (jogo.getCurrentPlayer() === "X") {
                    event.target.innerText = "X";
                } else {
                    event.target.innerText = "O";
                }
                venceu = jogo.checkWin(domObj);
            //     if (venceu === true) {
            //         resetGame();
            //     }
            }
        });
    })();

    return {};
};

const ticTacToe = createJogo();
const dom = model(ticTacToe);

// const jogo = (function() {
//     const ticTacToe = createJogo();
//     const dom = model(ticTacToe);
//     let end = false;
//     while (!end) {
//         ticTacToe.getEscolha();
//         end = ticTacToe.checkWin();
//     };
//     console.log(`Foram ${ticTacToe.getRodada()} rodadas\n`);
// })//();
