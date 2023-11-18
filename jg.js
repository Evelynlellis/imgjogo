// Imagens para X e O
const imageX = "img/barbie.jpg";
const imageO = "img/raquyelle.jpg";

// Estado inicial do jogo
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const board = document.getElementById('board');
const result = document.getElementById('result');

// Cria as células do tabuleiro
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

function handleCellClick(event) {
    if (!gameActive) return;

    const cell = event.target;
    const index = cell.dataset.index;

    // Verifica se a célula está vazia
    if (!boardState[index]) {
        // Define a imagem com base no jogador atual
        cell.style.backgroundImage = `url(${currentPlayer === 'X' ? imageX : imageO})`;

        // Atualiza o estado do tabuleiro
        boardState[index] = currentPlayer;

        // Verifica se há um vencedor após a jogada
        if (checkWinner()) {
            result.textContent = `Jogador ${currentPlayer} venceu!`;
            gameActive = false;
        } else if (boardState.every(cell => cell !== '')) {
            // Se não houver vencedor e o tabuleiro estiver cheio, é um empate
            result.textContent = 'Empate!';
            gameActive = false;
        } else {
            // Alterna para o próximo jogador
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    // Combinacoes de células que levam à vitória
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]              // Diagonais
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true; // Há um vencedor
        }
    }

    return false;
}