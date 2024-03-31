"use strict"

const scoreContainer = document.querySelector(".score");
const cardContainer = document.querySelector(".card-container");
let flippedCards = 0;
let timer = 0;
let timerId;

// Generating cards
const colors = ["navy","magenta","red", "gold", "green", "yellow", "mediumspringgreen"];
const cardSet = generateCardSet(colors);

// Test shuffle
console.log(colors);
console.log(shuffleArray(colors));

cardSet.forEach(cardObject => {
    console.log(cardObject);
    addNewCard(cardObject);
});

// Set container width based on card's width
setCardContainerWidth(7);
setScoreContainerWidth(7);

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", event => {
        handleCardClick(card);
    });
})

// Enable timer
increaseTimer();

// Functions
let firstCard = null;
let secondCard = null;

function handleCardClick(card) {
    if(
        !card.classList.contains("card--matched") 
        && !card.classList.contains("card--flipped")
    ) {
        updateFlippedCards();
        if(firstCard == null) {
            firstCard = card;
            flipCard(card);
        } else {
            secondCard = card;
            flipCard(card);
            if(firstCard.dataset.id === secondCard.dataset.id){
                markCardAsMatched(firstCard,secondCard);
                // If all are matched, stop timer
                const allMatched = checkIfAllMatched();
                if(allMatched) clearTimeout(timerId);
            } else {
                const tempFirstCard = firstCard;
                const tempSecondCard = secondCard;
                setTimeout(() => {
                    flipCard(tempFirstCard);
                    flipCard(tempSecondCard);
                }, 1000);
            }
            firstCard = null;
            secondCard = null;
        }
    }
}

function flipCard(card) {
    card.classList.toggle("card--flipped");
}

function markCardAsMatched(card1, card2) {
    card1.classList.toggle("card--matched");
    card2.classList.toggle("card--matched");
}

function updateFlippedCards() {
    flippedCards++;
    document.getElementById("flipped-cards-count").innerHTML = flippedCards;
}

function checkIfAllMatched() {
    return Array.from(document.querySelectorAll(".card")).every(card => {
        return card.classList.contains("card--matched");
    });
}

function increaseTimer() {
    timer++;
    document.getElementById("time").innerHTML = timer;
    timerId = setTimeout(increaseTimer, 1000);
}

function addNewCard(cardObject) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.dataset.id = cardObject.id;
    if(cardObject.color.trim().length !==0) newCard.style.setProperty("--cardColor", cardObject.color);
    cardContainer.appendChild(newCard);
}

function setCardContainerWidth(n) {
    /* Take a number of cards as parameter (ie: 5 to have 5 cards per line); */
    const cardWidth = window.getComputedStyle(document.querySelector(".card")).width;
    const width = parseInt(cardWidth) * n + 16 * (n - 1);
    cardContainer.style.width = `${width}px`;
}

function setScoreContainerWidth(n) {
    /* Take a number of cards as parameter (ie: 5 to have 5 cards per line); */
    const cardWidth = window.getComputedStyle(document.querySelector(".card")).width;
    const width = parseInt(cardWidth) * n + 16 * (n - 1);
    scoreContainer.style.width = `${width}px`;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateCardSet(colors) {
    /* Takes strings color list (for now) / Returns a list with objects representing cards */

    let cardSet = [];
    let i = 0;

    colors.forEach(color => {
        const newCard = {id: i++, color};
        for(let j = 0; j < 2; j++) {
            cardSet.push(newCard);
        }
    });

    cardSet = shuffleArray(cardSet);
    return cardSet;
}

function shuffleArray(array) {
    for(let i = 0; i < array.length; i++) {
        const j = getRandomInt(0, i);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
