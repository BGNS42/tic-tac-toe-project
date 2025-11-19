// se um jogador escolhe uma posição, preciso armazenar em variável de ESCOLHIDOS e na variável correspondente a pontuação do player da rodada. 
// ao escolher uma posição, verifica se a posição já foi escolhida. Se não foi, ela vai para ESCOLHIDOS e para pontuação do player da rodada.
// Ao final de rodada há uma verificação pra saber se o player da rodada pontuou com:
// uma linha: (se ele tem 3 arrays com primeiro elemento iguais, ex: [0,1], [0,2], [0,0])
// uma diagonal: (se ele tem arrays com todos os números iguais( [0,0], [1,1] ou [2,2]) ou a pontuação [2,0], [1,1] e [0,2]) 
// em pé: (se ele tem todos os números da esquerda diferentes e da direita iguais, exemplo: [0,0], [1,0], [2,0])
// basicamente a lógica é: linha [n, n+1, n+2] / coluna [n, n+3, n+6] / diagonal [n, n+4, n+8] ou [n, n+2, n+4]

const createPlayer = (name) => {
    let _score = 0;
    const _escolha = [];

    const addEscolha = (escolha) => _escolha.push(escolha);
    const getEscolhas = () => _escolha;
    const addScore = () => _score++;
    const getScore = () => _score;
    const resetEscolhas = () => {_escolha.splice(0, _escolha.length)};

    return { getEscolhas, addScore, getScore, addEscolha, resetEscolhas };
};

const createJogo = () => {
    const pX = createPlayer("X");
    const pO = createPlayer("O");

    const gameBoard = {
        //board2: [[x,x,o],
        //         [x,o,x],
        //         [x,o,o]],
        board: [1,2,3,
                4,5,6,
                7,8,9],
    
        currentPlayer: "X",
        escolhidos: [],
        count: 0,
    };

    const getPlacar = () => `Player X: ${pX.getScore()} pts / Player O: ${pO.getScore()} pts`;
    const getRodada = () => gameBoard.count;

    const setEscolha = (escolha) => {
        if (!gameBoard.escolhidos.includes(escolha)) {
            if (gameBoard.currentPlayer === "X") {
                pX.addEscolha(escolha);
                console.log(`${gameBoard.currentPlayer}: ${escolha} /\n${gameBoard.currentPlayer} escolhidas: ${pX.getEscolhas()}\n`);
            } else {
                pO.addEscolha(escolha);
                console.log(`${gameBoard.currentPlayer}: ${escolha} /\n${gameBoard.currentPlayer} escolhidas: ${pO.getEscolhas()}\n`);
            }
            gameBoard.escolhidos.push(escolha);
        }
    };
    
    const changeTurn = () => gameBoard.currentPlayer = gameBoard.currentPlayer === "X" ? "O" : "X";

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

    const resetGame = () => {
        gameBoard.currentPlayer = "X";
        gameBoard.count++;
        gameBoard.escolhidos = [];
        pX.resetEscolhas();
        pO.resetEscolhas();

        if ((pX.getScore() === 3) || (pO.getScore() === 3)) {
            console.log("\n----------FIM DE JOGO----------\n");
        } else {
            console.log("\n------INICIO DA PROXIMA RODADA-----\n");
        };
    };

    const checkWin = () => {
        const playerXHasWon = winCombos.some(combo => {
            return combo.every(cell => pX.getEscolhas().includes(cell));
        });
        const playerOHasWon = winCombos.some(combo => {
            return combo.every(cell => pO.getEscolhas().includes(cell));
        });
        
        if (playerXHasWon) {
            pX.addScore();
            console.log(`\nPlayer X venceu!\n`);
            alert(`${getCurrentPlayer()} venceu o jogo!`);
            console.log(getPlacar());
            return true;
        } else if (playerOHasWon) {
            pO.addScore();
            console.log(`\nPlayer O venceu!\n`);
            alert(`${getCurrentPlayer()} venceu o jogo!`);
            console.log(getPlacar());
            return true;
        } else if (gameBoard.escolhidos.length === 9) {
            console.log("\nEmpate\n");
            alert("Empate!")
            console.log(getPlacar());
            return true;
        } else {
            return false;
        }; 
    };

    const getCurrentPlayer = () => gameBoard.currentPlayer;

    return { setEscolha, checkWin, changeTurn, getRodada, getCurrentPlayer, resetGame };
};

const model = (jogo) => {
    const domObj = {
        container: document.querySelector('.container'),
        board: document.querySelector(".board"),
        cell: document.querySelectorAll(".cell"),
    };

    const resetGame = () => {
        domObj.cell.forEach(e => {
            e.textContent = "";
        });
        jogo.resetGame();
    };

    const eListener = (() => {
        domObj.board.addEventListener("click", (event) => {
            if (event.target.classList.contains('cell')) {

                const clickedCellId = event.target.id;
                console.log(`You clicked ${clickedCellId}`);

                jogo.setEscolha(clickedCellId);

                if (jogo.getCurrentPlayer() === "X") {
                    event.target.innerText = "X";
                } else {
                    event.target.innerText = "O";
                };
                
                const venceu = jogo.checkWin();
                if (venceu === true) {
                    resetGame();
                } else {
                    jogo.changeTurn();
                }
            };
        });
    })();

    return {};
};

const ticTacToe = createJogo();
const dom = model(ticTacToe);