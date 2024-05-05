const carBrands = ["Toyota", "Ford", "Chevrolet", "Honda", "Tesla", "Infinity", "Lexus", "Kia", "Nissan", "Jeep", "Dodge", "Mercedes",];
let selectedBrand = '';
let attempts = 6;
let guessedLetters = [];
let wordDisplay = document.getElementById('wordDisplay');
let hangmanDrawing = document.getElementById('hangmanDrawing');

const hangmanParts = [
    '<line x1="60" y1="230" x2="60" y2="50" stroke="black" stroke-width="2" />',  // Stand
    '<line x1="60" y1="50" x2="140" y2="50" stroke="black" stroke-width="2" />',  // Top bar
    '<line x1="140" y1="50" x2="140" y2="70" stroke="black" stroke-width="2" />', // Rope
    '<circle cx="140" cy="90" r="20" fill="none" stroke="black" stroke-width="2" />', // Head
    '<line x1="140" y1="110" x2="140" y2="150" stroke="black" stroke-width="2" />',  // Body
    '<line x1="140" y1="120" x2="120" y2="100" stroke="black" stroke-width="2" />',  // Left arm
    '<line x1="140" y1="120" x2="160" y2="100" stroke="black" stroke-width="2" />',  // Right arm
    '<line x1="140" y1="150" x2="120" y2="180" stroke="black" stroke-width="2" />',  // Left leg
    '<line x1="140" y1="150" x2="160" y2="180" stroke="black" stroke-width="2" />'   // Right leg
];

function chooseWord() {
    // Initialize the guessedLetters array with underscores
    guessedLetters = Array(selectedBrand.length).fill('_');
    // Display the word with underscores
    displayWord();
    // Initialize the hangman drawing with the base and stand
    hangmanDrawing.innerHTML = '<line x1="20" y1="230" x2="180" y2="230" stroke="black" stroke-width="2" />'; // Base
    hangmanDrawing.innerHTML += hangmanParts.slice(0, 3).join(''); // Add stand and top bar initially
}

function displayWord() {
    // Display the guessed letters
    wordDisplay.textContent = guessedLetters.join(' ');
}

function handleGuess(letter) {
    // Check if the guessed letter is in the selected brand
    if (!selectedBrand.includes(letter)) {
        // If not, decrement the number of attempts
        attempts--;
        // If there are incorrect guesses, add hangman parts
        if (attempts < 6) {
            hangmanDrawing.innerHTML += hangmanParts[6 - attempts + 2]; // Adjust to correctly position hangman parts
        }
    } else {
        // If the guessed letter is in the selected brand, replace the underscores
        for (let i = 0; i < selectedBrand.length; i++) {
            if (selectedBrand[i] === letter) {
                guessedLetters[i] = letter;
            }
        }
    }
    // Check if the game is over
    checkGameOver();
    // Display the word with the guessed letters
    displayWord();
}

function generateKeyboard() {
    // Generate the keyboard with buttons for each letter
    const buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
        `<button onclick="handleGuess('${letter}')">${letter}</button>`
    ).join('');
    // Add the buttons to the keyboard div
    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function checkGameOver() {
    // Check if all the letters have been guessed
    if (!guessedLetters.includes('_')) {
        // If so, alert the user and restart the game
        alert('Congratulations! You guessed the car brand.');
        restartGame();
    } else if (attempts < 0) {
        // If not, alert the user and restart the game
        alert(`Game over! The correct car brand was ${selectedBrand}.`);
        restartGame();
    }
}

function restartGame() {
    // Reset the number of attempts and choose a new word
    attempts = 6;
    chooseWord();
}

// Initialize the game when the page loads
window.onload = function() {
    chooseWord();
    generateKeyboard();
}
