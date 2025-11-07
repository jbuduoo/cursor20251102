// 踩地雷遊戲邏輯
class Minesweeper {
    constructor(rows = 9, cols = 9, mines = 10) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.board = [];
        this.revealed = [];
        this.flagged = [];
        this.gameOver = false;
        this.gameWon = false;
        this.firstClick = true;
        this.timer = 0;
        this.timerInterval = null;
        this.cellsRevealed = 0;
        
        this.init();
    }

    init() {
        // 初始化遊戲板
        this.board = Array(this.rows).fill(null).map(() => Array(this.cols).fill(0));
        this.revealed = Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));
        this.flagged = Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));
        this.gameOver = false;
        this.gameWon = false;
        this.firstClick = true;
        this.cellsRevealed = 0;
        this.timer = 0;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        this.render();
    }

    placeMines(excludeRow, excludeCol) {
        let minesPlaced = 0;
        while (minesPlaced < this.mines) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);
            
            // 確保第一次點擊的位置及其周圍不會有地雷
            if (this.firstClick) {
                const distance = Math.max(Math.abs(row - excludeRow), Math.abs(col - excludeCol));
                if (distance <= 1) continue;
            }
            
            if (this.board[row][col] !== -1) {
                this.board[row][col] = -1; // -1 代表地雷
                minesPlaced++;
            }
        }
        
        // 計算每個格子的數字
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.board[row][col] !== -1) {
                    this.board[row][col] = this.countAdjacentMines(row, col);
                }
            }
        }
    }

    countAdjacentMines(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < this.rows && 
                    newCol >= 0 && newCol < this.cols && 
                    this.board[newRow][newCol] === -1) {
                    count++;
                }
            }
        }
        return count;
    }

    reveal(row, col) {
        if (this.gameOver || this.gameWon || this.revealed[row][col] || this.flagged[row][col]) {
            return;
        }

        // 第一次點擊時放置地雷
        if (this.firstClick) {
            this.placeMines(row, col);
            this.firstClick = false;
            this.startTimer();
        }

        // 如果點到地雷
        if (this.board[row][col] === -1) {
            this.gameOver = true;
            this.revealAllMines();
            this.render();
            this.endGame(false);
            return;
        }

        // 揭示格子（會遞歸揭示周圍的空白格子）
        this.revealCell(row, col);
        
        // 更新顯示
        this.render();

        // 檢查是否獲勝
        const totalCells = this.rows * this.cols;
        if (this.cellsRevealed === totalCells - this.mines) {
            this.gameWon = true;
            this.endGame(true);
        }
    }

    revealCell(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols || 
            this.revealed[row][col] || this.flagged[row][col]) {
            return;
        }

        this.revealed[row][col] = true;
        this.cellsRevealed++;

        // 如果格子是 0，自動揭示周圍的格子
        if (this.board[row][col] === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    this.revealCell(row + i, col + j);
                }
            }
        }
    }

    toggleFlag(row, col) {
        if (this.gameOver || this.gameWon || this.revealed[row][col]) {
            return;
        }

        this.flagged[row][col] = !this.flagged[row][col];
        this.updateMinesCount();
        this.render();
    }

    revealAllMines() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.board[row][col] === -1) {
                    this.revealed[row][col] = true;
                }
            }
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (!this.gameOver && !this.gameWon) {
                this.timer++;
                document.getElementById('timer').textContent = this.timer;
            }
        }, 1000);
    }

    endGame(won) {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        const gameOverDiv = document.getElementById('game-over');
        const content = document.getElementById('game-over-content');
        const title = document.getElementById('game-over-title');
        const message = document.getElementById('game-over-message');

        if (won) {
            content.className = 'game-over-content win';
            title.textContent = '🎉 恭喜獲勝！';
            message.textContent = `您用了 ${this.timer} 秒完成遊戲！`;
        } else {
            content.className = 'game-over-content lose';
            title.textContent = '💥 遊戲結束';
            message.textContent = '您踩到地雷了！';
        }

        gameOverDiv.classList.add('show');
    }

    updateMinesCount() {
        let flaggedCount = 0;
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.flagged[row][col]) flaggedCount++;
            }
        }
        document.getElementById('mines-count').textContent = this.mines - flaggedCount;
    }

    render() {
        const boardElement = document.getElementById('game-board');
        boardElement.style.gridTemplateColumns = `repeat(${this.cols}, 30px)`;
        boardElement.innerHTML = '';

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                
                if (this.revealed[row][col]) {
                    cell.classList.add('revealed');
                    if (this.board[row][col] === -1) {
                        cell.classList.add('mine');
                        cell.textContent = '💣';
                    } else if (this.board[row][col] > 0) {
                        cell.classList.add(`number-${this.board[row][col]}`);
                        cell.textContent = this.board[row][col];
                    }
                } else if (this.flagged[row][col]) {
                    cell.classList.add('flagged');
                    cell.textContent = '🚩';
                }

                cell.addEventListener('click', () => this.reveal(row, col));
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.toggleFlag(row, col);
                });

                boardElement.appendChild(cell);
            }
        }

        this.updateMinesCount();
        document.getElementById('timer').textContent = this.timer;
    }
}

// 全域變數
let game;
let currentRows = 9;
let currentCols = 9;
let currentMines = 10;

// 開始遊戲
function startGame(rows = null, cols = null, mines = null) {
    // 如果提供了參數，更新當前設置
    if (rows !== null && cols !== null && mines !== null) {
        currentRows = rows;
        currentCols = cols;
        currentMines = mines;
    }
    
    const gameOverDiv = document.getElementById('game-over');
    gameOverDiv.classList.remove('show');
    
    // 如果遊戲已存在，停止計時器
    if (game && game.timerInterval) {
        clearInterval(game.timerInterval);
    }
    
    game = new Minesweeper(currentRows, currentCols, currentMines);
    
    // 更新地雷數量顯示
    document.getElementById('mines-count').textContent = currentMines;
}

// 重新開始當前難度
function restartGame() {
    startGame(); // 使用當前設置重新開始
}

// 初始化遊戲
window.addEventListener('DOMContentLoaded', () => {
    startGame();
});

