'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Игровые переменные
    const GAME_CONFIG = {
        maxNumber: 100,
        maxAttempts: 10,
    };

    let gameState = {
        randomNumber: 0,
        attemptsLeft: 0,
        previousGuesses: [],
        gameOver: false,
    };

    // DOM элементы
    const elements = {
        input: document.getElementById('guess-input'),
        button: document.getElementById('guess-button'),
        hint: document.getElementById('hint'),
        attempts: document.getElementById('attempts'),
        previousGuesses: document.getElementById('previous-guesses'),
        resultContainer: document.getElementById('result-container'),
        resultMessage: document.getElementById('result-message'),
        playAgain: document.getElementById('play-again'),
    };

    // Инициализация игры
    function initGame() {
        gameState = {
            randomNumber: Math.floor(
                Math.random() * (GAME_CONFIG.maxNumber + 1)
            ),
            attemptsLeft: GAME_CONFIG.maxAttempts,
            previousGuesses: [],
            gameOver: false,
        };

        updateUI();
    }

    // Обновление интерфейса
    function updateUI() {
        elements.attempts.textContent = gameState.attemptsLeft;
        elements.previousGuesses.textContent =
            gameState.previousGuesses.join(', ');
        elements.hint.textContent = '';
        elements.input.value = '';
        elements.input.disabled = gameState.gameOver;
        elements.button.disabled = gameState.gameOver;

        if (gameState.gameOver) {
            elements.resultContainer.classList.remove('d-none');
        } else {
            elements.resultContainer.classList.add('d-none');
            elements.playAgain.className = 'btn btn-success mt-2';
            elements.input.focus();
        }
    }

    // Проверка введенного числа
    function checkGuess() {
        if (gameState.gameOver) return;

        const userGuess = parseInt(elements.input.value);

        if (
            isNaN(userGuess) ||
            userGuess < 0 ||
            userGuess > GAME_CONFIG.maxNumber
        ) {
            elements.hint.textContent = `Пожалуйста, введите число от 0 до ${GAME_CONFIG.maxNumber}.`;
            return;
        }

        gameState.attemptsLeft--;
        gameState.previousGuesses.push(userGuess);

        if (userGuess === gameState.randomNumber) {
            endGame(true);
        } else {
            const hint =
                userGuess < gameState.randomNumber ? 'больше' : 'меньше';
            elements.hint.textContent = `Загаданное число ${hint} чем ${userGuess}.`;

            if (gameState.attemptsLeft === 0) {
                endGame(false);
            }
        }

        updateUI();
    }

    // Завершение игры
    function endGame(isWin) {
        gameState.gameOver = true;

        if (isWin) {
            elements.resultMessage.textContent = `Поздравляем! Вы угадали число ${gameState.randomNumber}!`;
        } else {
            elements.resultMessage.textContent = `Вы проиграли. Загаданное число было ${gameState.randomNumber}.`;
            elements.playAgain.className = 'btn btn-danger mt-2';
        }
    }

    // Обработчики событий
    elements.button.addEventListener('click', checkGuess);
    elements.input.addEventListener(
        'keypress',
        (e) => e.key === 'Enter' && checkGuess()
    );
    elements.playAgain.addEventListener('click', initGame);

    // Запуск игры
    initGame();
});
