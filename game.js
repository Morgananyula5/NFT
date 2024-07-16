const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function createCard(card) {
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.card = card;
    div.textContent = card;
    div.addEventListener('click', flipCard);
    document.querySelector('.game-container').appendChild(div);
}

function startGame() {
    const shuffledCards = shuffle(cards);
    shuffledCards.forEach(card => {
        createCard(card);
    });
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.card === secondCard.dataset.card) {
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            displayPopup(true);
        }
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove('flipped'));
            flippedCards = [];
        }, 1000);
    }
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !matchedCards.includes(this)) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function displayPopup(win) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    const message = document.createElement('p');
    message.textContent = win ? 'NFT HAS BEEN WON!' : 'You Lose!';
    popup.appendChild(message);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
        overlay.remove();
    }, 2000);
}

startGame();
