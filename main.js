const gameBoard = document.getElementById('gameBoard');
const cardValues = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D']; // Pairs of values
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

// Shuffle the cards
cardValues.sort(() => Math.random() - 0.5);

// Create the cards on the board
cardValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!hasFlippedCard) {
        // First card clicked
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second card clicked
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.value === secondCard.dataset.value;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    // Matched pair
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    // Not a match
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
