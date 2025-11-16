// se um jogador escolhe uma posição, preciso armazenar em variável de ESCOLHIDOS e na variável correspondente a pontuação do player da rodada. 
// ao escolher uma posição, verifica se a posição já foi escolhida. Se não foi, ela vai para ESCOLHIDOS e para pontuação do player da rodada.
// Ao final de rodada há uma verificação pra saber se o player da rodada pontuou com:
// uma linha: (se ele tem 3 arrays com primeiro elemento iguais, ex: [0,1], [0,2], [0,0])
// uma diagonal: (se ele tem arrays com todos os números iguais( [0,0], [1,1] ou [2,2]) ou a pontuação [2,0], [1,1] e [0,2]) 
// em pé: (se ele tem todos os números da esquerda diferentes e da direita iguais, exemplo: [0,0], [1,0], [2,0])

//const board = () => {}
const gameBoard = {
    board2: [[0,0], [0,1], [0,2],
            [1,0], [1,1], [1,2],
            [2,0], [2,1], [2,2]],
    board: [1,2,3,
            4,5,6,
            7,8,9],

    currentPlayer: "O",
    escolhido: [],
    escolhaP1: [],
    escolhaP2: [],
}

const getRandomChoice = () => {
    return Math.floor(Math.random() * 9) + 1;
}

const getP1 = function(player) {
    gameBoard.escolhaP1.push(player);
}

const getP2 = function(player) {
    gameBoard.escolhaP2.push(player);
}

const getEscolhidos = (player) => {
    gameBoard.escolhido.push(player);
    return gameBoard.escolhido;
}


const checkEscolhaP1 = () => {
    let player = getRandomChoice();
    if (!gameBoard.escolhido.includes(player)) {
        getP1(player);
        getEscolhidos(player);
        console.log(`${gameBoard.currentPlayer}: ${player} /\n${gameBoard.currentPlayer} escolhidas: ${gameBoard.escolhaP1}\n`);
    } else {
        return false || checkEscolhaP1();
    }
}
// console.log(gameBoard.escolhido);
// gameBoard.escolhido.push(1,2,3,4);
// console.log(gameBoard.escolhido);

const checkEscolhaP2 = () => {
    let player = getRandomChoice();
    if (!gameBoard.escolhido.includes(player)) {
        getP2(player);
        getEscolhidos(player);
        console.log(`${gameBoard.currentPlayer}: ${player} /\n${gameBoard.currentPlayer} escolhidas: ${gameBoard.escolhaP2}\n`);
    } else {
        return false || checkEscolhaP2();
    }
}

const getEscolha = () => {
    if (gameBoard.currentPlayer === "X") {
        gameBoard.currentPlayer = "O";
    } else {
        gameBoard.currentPlayer = "X";
    }

    switch (gameBoard.currentPlayer) {
        case "X":
            checkEscolhaP1();
            break;
        case "O":
            checkEscolhaP2();
            break;
        default:
            console.log("Erro, nem X nem O");
            break;
    }
}

function checkWin() {
    const winCombos = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,1],
    ];

    const player1HasWon = winCombos.some(combo => {
        return combo.every(cell => gameBoard.escolhaP1.includes(cell));
    });
    const player2HasWon = winCombos.some(combo => {
        return combo.every(cell => gameBoard.escolhaP2.includes(cell));
    });

    if (player1HasWon) {
        console.log(`\n${gameBoard.currentPlayer} venceu!\n`);
        return true;
    } 
    
    if (player2HasWon){
        console.log(`\n${gameBoard.currentPlayer} venceu!\n`);
        return true;
    }     

    if (gameBoard.escolhido.length === 9) {
        console.log("\nEmpate\n");
        return true;
    } 
    return false;
}

const jogo = (() => {
    //let end = false;
    while (!end) {
        getEscolha();
        var end = checkWin();
    }
    console.log(gameBoard.escolhido)
})();