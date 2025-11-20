// se um jogador escolhe uma posição, preciso armazenar em variável de ESCOLHIDOS e na variável correspondente a pontuação do player da rodada. 
// ao escolher uma posição, verifica se a posição já foi escolhida. Se não foi, ela vai para ESCOLHIDOS e para pontuação do player da rodada.
// Ao final de rodada há uma verificação pra saber se o player da rodada pontuou com:
// uma linha: (se ele tem 3 arrays com primeiro elemento iguais, ex: [0,1], [0,2], [0,0])
// uma diagonal: (se ele tem arrays com todos os números iguais( [0,0], [1,1] ou [2,2]) ou a pontuação [2,0], [1,1] e [0,2]) 
// em pé: (se ele tem todos os números da esquerda diferentes e da direita iguais, exemplo: [0,0], [1,0], [2,0])
// basicamente a lógica é: linha [n, n+1, n+2] / coluna [n, n+3, n+6] / diagonal [n, n+4, n+8] ou [n, n+2, n+4]

const createPlayer = () => {
    let score = 0;
    const escolhas = [];

    const addEscolha = (escolha) => escolhas.push(escolha);
    const getEscolhas = () => escolhas;
    const addScore = () => score++;
    const getScore = () => score;
    const resetEscolhas = () => {escolhas.splice(0, escolhas.length)};
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
        currentPlayer: "X",
        escolhidos: [],
        rodada: 1,
    };

    const getCurrentPlayer = () => gameBoard.currentPlayer;    
    const getPlayer = () => getCurrentPlayer() === "X" ? pX : pO;
    const changeTurn = () => {
        gameBoard.currentPlayer = gameBoard.currentPlayer === "X" ? "O" : "X";
    };

    const setEscolha = (escolha, event) => {
        if (gameBoard.escolhidos.includes(escolha)) {
            alert("Posição já foi escolhida");
            return false;
        };

        getPlayer().addEscolha(escolha);

        gameBoard.escolhidos.push(escolha);
        
        event.target.innerText = getCurrentPlayer();
        return true;
    };

    const getPlacar = () => `Player X: ${pX.getScore()} pts / Player O: ${pO.getScore()} pts`;
    const getRodada = () => gameBoard.rodada;
    // const getEscolhasJogo = () => gameBoard.escolhidos;
    
    const checkWin = () => {
        const escolhas = getPlayer().getEscolhas();

        const won = winCombos.some(combo => {
            return combo.every(cell => escolhas.includes(cell));
        });
        
        if (won) {
            getPlayer().addScore();
            alert(`${getCurrentPlayer()} venceu a rodada ${getRodada()}!\n${getPlacar()}`);
            console.log(`\nPlayer ${getCurrentPlayer()} venceu!\n`);
            console.log(getPlacar());
            return "win"
        } else if (gameBoard.escolhidos.length === 9) {
            alert("Empate!")
            console.log("\nEmpate\n");
            console.log(getPlacar());
            return "draw"
        } else {
            changeTurn();
            return "continue"
        }; 
    };
    const resetRodada = () => {
        gameBoard.currentPlayer = "X";
        gameBoard.rodada++;
        gameBoard.escolhidos = [];
        pX.resetEscolhas();
        pO.resetEscolhas();
    }
    
    const resetMatch = () => {
        pX.resetScore();
        pO.resetScore();
        gameBoard.rodada = 0;
        resetRodada();
    };

    const getScore = () => ({
        X: pX.getScore(),
        O: pO.getScore(),
        rodada: gameBoard.rodada,
    });

    return { setEscolha, checkWin, resetRodada, resetMatch, getScore, getCurrentPlayer };
};

const model = (jogo) => {
    const dom = {
        board: document.querySelector(".board"),
        cell: document.querySelectorAll(".cell"),
        scoreX: document.querySelector(".playerX"),
        scoreO: document.querySelector(".playerO"),
    };

    const swanFill = () => {
        dom.cell.forEach(e => {
            e.textContent = "🦢";
        });
    };

    const clearBoard = (() => {
        dom.cell.forEach(e => {
            e.textContent = "🦢";
        });
    })();

    const handleResult = (result) => {
        if (result === "continue") return;

        swanFill();
        
        const { X, O } = jogo.getScore();
        
        dom.scoreX.textContent = `Player X: ${X} pts`;
        dom.scoreO.textContent = `Player O: ${O} pts`;          

        if (X === 3 || O === 3) {
            const winner = X > O ? "X" : "O";
            alert(`Fim de jogo! Player ${winner} venceu a partida!`);

            jogo.resetMatch();
            swanFill();
            dom.scoreX.textContent = `Player X: ${0} pts`;
            dom.scoreO.textContent = `Player O: ${0} pts`;
            return;
        }

        jogo.resetRodada();      
    };

    dom.board.addEventListener("click", (event) => {
        if (!event.target.classList.contains('cell')) return;

        const escolha = event.target.id;

        const jogadaValida = jogo.setEscolha(escolha, event);
        if (!jogadaValida) return;
            
        const venceu = jogo.checkWin();
        handleResult(venceu);
    });
};

const ticTacToe = createJogo();
const dom = model(ticTacToe);