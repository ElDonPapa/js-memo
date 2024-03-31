"use strict"

const cardContainer = document.querySelector(".card-container");
let selectedCards = 0;

// Generating cards
const colors = ["red", "blue", "green", "orange", "royalblue"];
const cardSet = generateCardSet(colors);

cardSet.forEach(cardObject => {
    console.log(cardObject);
    addNewCard(cardObject);
});

// Set container width based on card's width
setCardContainerWidth(7);

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", event => {
        handleCardClick(card);
    });
})

// Functions
let firstCard = null;
let secondCard = null;

function handleCardClick(card) {
    if(
        !card.classList.contains("card--matched") 
        && !card.classList.contains("card--flipped")
    ) {
        if(firstCard == null) {
            firstCard = card;
            flipCard(card);
        } else {
            secondCard = card;
            flipCard(card);
            if(firstCard.dataset.id === secondCard.dataset.id){
                console.log("match");
                markCardAsMatched(firstCard,secondCard);
            } else {
                console.log("not match");
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

/* outdated functions
function selectCard(card) {
    card.setAttribute("selected",
        card.getAttribute("selected") === "true" ? "false" : "true");

    if(card.getAttribute("selected") === "true") {
        card.style.setProperty("--translateY", "-12px");
        selectedCards++;
    } else {
        card.style.setProperty("--translateY", "0px");
        selectedCards--;
    }
}

function flipCard(card) {
    if(card.getAttribute("selected") === "true") {
        card.setAttribute("selected", "false");
        card.setAttribute("flipped", card.getAttribute("flipped") === "true" ? "false" : "true");
        card.style.setProperty("--translateY", "0");
        if(card.getAttribute("flipped") === "true") {
            card.style.setProperty("--rotateYFront", "0deg");
            card.style.setProperty("--rotateYBack", "180deg");
        } else {
            card.style.setProperty("--rotateYFront", "180deg");
            card.style.setProperty("--rotateYBack", "0deg");
        }
    }
}

function setButtonState() {
    if(selectedCards > 0) {
        btn.classList.remove("btn--disabled");
    } else {
        btn.classList.add("btn--disabled");
    }
}
*/

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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateCardSet(colors) {
    /* Takes strings color list (for now) / Returns a list with objects representing cards */

    const cardSet = [];
    let i = 0;

    colors.forEach(color => {
        const newCard = {id: i++, color};
        for(let j = 0; j < 2; j++) {
            cardSet.push(newCard);
        }
    });

    // Scramble the set

    return cardSet;
}
