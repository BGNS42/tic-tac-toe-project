// se um jogador escolhe uma posição, preciso armazenar em variável de ESCOLHIDOS e na variável correspondente a pontuação do player da rodada. 
// ao escolher uma posição, verifica se a posição já foi escolhida. Se não foi, ela vai para ESCOLHIDOS e para pontuação do player da rodada.
// Ao final de rodada há uma verificação pra saber se o player da rodada pontuou com:
// uma linha: (se ele tem 3 arrays com primeiro elemento iguais, ex: [0,1], [0,2], [0,0])
// uma diagonal: (se ele tem arrays com todos os números iguais( [0,0], [1,1] ou [2,2]) ou a pontuação [2,0], [1,1] e [0,2]) 
// em pé: (se ele tem todos os números da esquerda diferentes e da direita iguais, exemplo: [0,0], [1,0], [2,0])
// basicamente a lógica é: linha [n, n+1, n+2] / coluna [n, n+3, n+6] / diagonal [n, n+4, n+8] ou [n, n+2, n+4]

const createPlayer = () => {
    let score = 0;
    const _escolha = [];

    const addEscolha = (escolha) => _escolha.push(escolha);
    const getEscolhas = () => _escolha;
    const addScore = () => score++;
    const getScore = () => score;
    const resetEscolhas = () => {_escolha.splice(0, _escolha.length)};
    const resetScore = () => score = 0;

    return { getEscolhas, addEscolha, resetEscolhas, addScore, getScore, resetScore };
};

const createJogo = () => {
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

    const pX = createPlayer();
    const pO = createPlayer();

    const gameBoard = {
        // board: [1,2,3,
        //         4,5,6,
        //         7,8,9],
    
        currentPlayer: "X",
        escolhidos: [],
        count: 1,
    };

    const getPlacar = () => `Player X: ${pX.getScore()} pts / Player O: ${pO.getScore()} pts`;
    const getRodada = () => gameBoard.count;
    const getEscolhasJogo = () => gameBoard.escolhidos;
    const getCurrentPlayer = () => gameBoard.currentPlayer;    
    const changeTurn = () => gameBoard.currentPlayer = gameBoard.currentPlayer === "X" ? "O" : "X";
    const getPlayer = () => getCurrentPlayer() === "X" ? pX : pO;

    const setEscolha = (escolha, event) => {
        if (getEscolhasJogo().includes(escolha)) {
            alert("Posição já foi escolhida");
            return false;
        };

        getPlayer().addEscolha(escolha);

        gameBoard.escolhidos.push(escolha);
        
        event.target.innerText = getCurrentPlayer();
        return true;
    };

    const resetGame = (fn, venceu = false) => {
        gameBoard.currentPlayer = "X";
        gameBoard.count++;
        gameBoard.escolhidos = [];
        pX.resetEscolhas();
        pO.resetEscolhas();

        if (pX.getScore() === 3 || pO.getScore() === 3) {

            console.log("\n----------FIM DE JOGO----------\n");
            gameBoard.count = 1;
            let alertMsg = "";

            if (pX.getScore() > pO.getScore()) {
                alertMsg = `Player X venceu a partida!`;
            } else {
                alertMsg = `Player O venceu a partida!`;
            }

            alert(`Fim de jogo! ${alertMsg}`);
            fn();
            resetScores();
            return;

        } else if (venceu === true) {
            fn();
        } else {
            console.log("\n------INICIO DA PROXIMA RODADA-----\n");
        };
    };

    const checkWin = () => {
        const player = getPlayer();
        const escolhas = player.getEscolhas();

        const playerHasWon = winCombos.some(combo => {
            return combo.every(cell => escolhas.includes(cell));
        });
        
        if (playerHasWon) {
            player.addScore();
            console.log(`\nPlayer ${getCurrentPlayer()} venceu!\n`);
            alert(`${getCurrentPlayer()} venceu a rodada ${getRodada()}!`);
            console.log(getPlacar());
            return true;
        } else if (gameBoard.escolhidos.length === 9) {
            console.log("\nEmpate\n");
            alert("Empate!")
            console.log(getPlacar());
            return true;
        } else {
            changeTurn();
            return false;
        }; 
    };

    const resetScores = () => {
        pX.resetScore();
        pO.resetScore();
    };

    return { setEscolha, getEscolhasJogo, checkWin, resetGame };
};

const model = (jogo) => {
    const domObj = {
        container: document.querySelector('.container'),
        board: document.querySelector(".board"),
        cell: document.querySelectorAll(".cell"),

    };
    // const fill = (() => {
    //     domObj.cell.forEach(e => {
    //         e.textContent = "BGNS";
    //     });
    // })();

    const resetDom = () => {
        domObj.cell.forEach(e => {
            e.textContent = "";
        });
    };

    const eListener = (() => {
        domObj.board.addEventListener("click", (event) => {
            if (event.target.classList.contains('cell')) {

                const escolha = event.target.id;

                const jogadaValida = jogo.setEscolha(escolha, event);
                if (!jogadaValida) return;
                
                const venceu = jogo.checkWin();
                if (venceu) jogo.resetGame(resetDom, venceu);
            };
        });
    })();

    return {};
};

const ticTacToe = createJogo();
const dom = model(ticTacToe);