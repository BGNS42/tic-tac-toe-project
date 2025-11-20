// basicamente a lógica é: linha [n, n+1, n+2] / coluna [n, n+3, n+6] / diagonal [n, n+4, n+8] ou [n, n+2, n+4]

// =================
// Factory do Player
// =================
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
// =================
// Factory do Jogo
// =================
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

    const getCurrentPlayer = () => gameBoard.currentPlayer; // esse devolve se "X" ou se "O"    
    const getPlayer = () => getCurrentPlayer() === "X" ? pX : pO; // esse devolve o objeto pX ou pO
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
// =================
// Factory do DOM
// =================
const model = (jogo) => {
    const dom = {
        board: document.querySelector(".board"),
        cell: document.querySelectorAll(".cell"),
        scoreX: document.querySelector(".playerX"),
        scoreO: document.querySelector(".playerO"),
        turn: document.querySelector(".turn"),
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

    const fillScore = (X, O) => {
        dom.scoreX.textContent = `Player X: ${X} pts`;
        dom.scoreO.textContent = `Player O: ${O} pts`;
    };

    const handleResult = (result) => {
        if (result === "continue") return;

        swanFill();
        
        const { X, O } = jogo.getScore();
        
        fillScore(X, O);   

        if (X === 3 || O === 3) {
            const winner = X > O ? "X" : "O";
            alert(`Fim de jogo! Player ${winner} venceu a partida!`);

            jogo.resetMatch();
            swanFill();
            fillScore(0, 0);
            dom.turn.textContent = `Player X goes first.`;
            return;
        }

        jogo.resetRodada();
        dom.turn.textContent = `Player X goes first.`;      
    };

    dom.board.addEventListener("click", (event) => {
        if (!event.target.classList.contains('cell')) return;

        const escolha = event.target.id;

        const jogadaValida = jogo.setEscolha(escolha, event);
        if (!jogadaValida) return;
        dom.turn.textContent = `Player ${jogo.getCurrentPlayer() === "X"? "O" : "X"} turn`;    
        const venceu = jogo.checkWin();
        handleResult(venceu);
    });
};
// ==================================================
// Cria o jogo e altera o DOM com base no jogo criado
// ==================================================
const ticTacToe = createJogo();
const dom = model(ticTacToe);