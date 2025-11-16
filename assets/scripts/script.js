// se um jogador escolhe uma posição, preciso armazenar em variável de ESCOLHIDOS e na variável correspondente a pontuação do player da rodada. 
// ao escolher uma posição, verifica se a posição já foi escolhida. Se não foi, ela vai para ESCOLHIDOS e para pontuação do player da rodada.
// Ao final de rodada há uma verificação pra saber se o player da rodada pontuou com:
// uma linha: (se ele tem 3 arrays com primeiro elemento iguais, ex: [0,1], [0,2], [0,0])
// uma diagonal: (se ele tem arrays com todos os números iguais( [0,0], [1,1] ou [2,2]) ou a pontuação [2,0], [1,1] e [0,2]) 
// em pé: (se ele tem todos os números da esquerda diferentes e da direita iguais, exemplo: [0,0], [1,0], [2,0])

const gameBoard = {
    board2: [[0,0], [0,1], [0,2],
            [1,0], [1,1], [1,2],
            [2,0], [2,1], [2,2]],
    board: [1,2,3,
            4,5,6,
            7,8,9],
    
    //winCon: ,
    currentPlayer: "O",
    escolhido: [],
    escolhaP1: [],
    escolhaP2: [],
    escolheu: [[],[]],
}

// const getRandomChoice = () => {
//     return [Math.floor((Math.random() * 9)), Math.floor((Math.random() * 9))];
// }
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
    let player1 = getRandomChoice();
    if (!gameBoard.escolhido.includes(player1)) {
        getP1(player1);
        getEscolhidos(player1);
        console.log(`P1: ${player1}/ p1 escolhidas: ${gameBoard.escolhaP1}`);
    } else {
        return false || checkEscolhaP1();
    }
}
// console.log(gameBoard.escolhido);
// gameBoard.escolhido.push(1,2,3,4);
// console.log(gameBoard.escolhido);

const checkEscolhaP2 = () => {
    let player2 = getRandomChoice();
    if (!gameBoard.escolhido.includes(player2)) {
        getP2(player2);
        getEscolhidos(player2);
        console.log(`P2: ${player2}/ p2 escolhidas: ${gameBoard.escolhaP2}`);
    } else {
        return false || checkEscolhaP2();
    }
}

const getEscolha = () => {
    if (gameBoard.currentPlayer === "X") {
        gameBoard.currentPlayer = "O";
        console.log(gameBoard.currentPlayer);
    } else {
        gameBoard.currentPlayer = "X";
        console.log(gameBoard.currentPlayer);
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

// function containsArray(player) {
//     // if (gameBoard.escolhido.indexOf(player) !== -1) {
//     //     return true
//     // } else {
//     //     return false
//     // }
//     return gameBoard.escolhido.some(innerArr => {
//         if(innerArr.length !== player.length) {
//             return false;
//         }
//         return innerArr.every((value, index) => value === player[index]);
//     });
// }

// function containsArrayP1(player) {
//     return gameBoard.escolhaP1.some(innerArr => {
//         if(innerArr.length !== player.length) {
//             return false;
//         }
//         return innerArr.every((value, index) => value === player[index]);
//     });
// }

// function containsArrayP2(player) {
//     return gameBoard.escolhaP2.some(innerArr => {
//         if(innerArr.length !== player.length) {
//             return false;
//         }
//         return innerArr.every((value, index) => value === player[index]);
//     });
// }

function checkWin() {
    if ((gameBoard.escolhaP1.includes(1,2,3))||(gameBoard.escolhaP1.includes(1,4,7))||(gameBoard.escolhaP1.includes(4,5,6))||(gameBoard.escolhaP1.includes(2,5,8))||(gameBoard.escolhaP1.includes(7,8,9))||(gameBoard.escolhaP1.includes(3,6,9))||(gameBoard.escolhaP1.includes(1,5,9))||(gameBoard.escolhaP1.includes(3,5,7))) {
        console.log("\nPlayer 1 venceu!\n");
        return true;
    } else if (gameBoard.escolhido.length === 9) {
        console.log("\nEmpate\n");
        return true;
    } else if ((gameBoard.escolhaP2.includes(1,2,3))||(gameBoard.escolhaP2.includes(1,4,7))||(gameBoard.escolhaP2.includes(4,5,6))||(gameBoard.escolhaP2.includes(2,5,8))||(gameBoard.escolhaP2.includes(7,8,9))||(gameBoard.escolhaP2.includes(3,6,9))||(gameBoard.escolhaP2.includes(1,5,9))||(gameBoard.escolhaP2.includes(3,5,7))){
        console.log("\nPlayer 2 venceu!\n");
        return true;
    }     
    return false;
//     if ((containsArrayP1(1) && containsArrayP1(2) && containsArrayP1(3))||(containsArrayP1(1) && containsArrayP1(4) && containsArrayP1(7))||(containsArrayP1(4) && containsArrayP1(5) && containsArrayP1(6))||(containsArrayP1(2) && containsArrayP1(5) && containsArrayP1(8))||(containsArrayP1(7) && containsArrayP1(8) && containsArrayP1(9))||(containsArrayP1(3) && containsArrayP1(6) && containsArrayP1(9))||(containsArrayP1(1) && containsArrayP1(5) && containsArrayP1(9))||(containsArrayP1(3) && containsArrayP1(5) && containsArrayP1(7))) {
//         console.log("\nPlayer 1 venceu!\n");
//         return true;
//     } else if (gameBoard.escolhido.length === 9) {
//         console.log("\nEmpate\n");
//         return true;
//     } else if ((containsArrayP2(1) && containsArrayP2(2) && containsArrayP2(3))||(containsArrayP2(1) && containsArrayP2(4) && containsArrayP2(7))||(containsArrayP2(4) && containsArrayP2(5) && containsArrayP2(6))||(containsArrayP2(2) && containsArrayP2(5) && containsArrayP2(8))||(containsArrayP2(7) && containsArrayP2(8) && containsArrayP2(9))||(containsArrayP2(3) && containsArrayP2(6) && containsArrayP2(9))||(containsArrayP2(1) && containsArrayP2(5) && containsArrayP2(9))||(containsArrayP2(3) && containsArrayP2(5) && containsArrayP2(7))){
//         console.log("\nPlayer 2 venceu!\n");
//         return true;
//     } else {
//         return false;
//     }
}

//const winCon = 
const jogo = (() => {
    let end = false;
    while (!end) {
        
        
        getEscolha();
        end = checkWin();
    }
})();