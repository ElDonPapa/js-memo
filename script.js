"use strict"

const cardContainer = document.querySelector(".card-container");
let cards = document.querySelectorAll(".card");
const btn = document.querySelector(".btn");
let selectedCards = 0;


// Generating cards
const colors = ["red", "blue", "green", "orange", "royalblue"];

const cardSet = generateCardSet(colors);

cardSet.forEach(cardObject => {
    addNewCard(cardObject.color);
});

// Set container width based on card's width
setCardContainerWidth(7);

cards.forEach(card => {
    card.addEventListener("click", event => {
        selectCard(card);
        setButtonState();
    });
})

btn.addEventListener("click", event => {
    cards.forEach(card => {
        flipCard(card);
    })
    selectedCards = 0;
    setButtonState();
});

// Functions
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

function addNewCard(color = "") {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    if(color.trim().length !==0) newCard.style.setProperty("--cardColor", color);
    cardContainer.appendChild(newCard);
    cards = document.querySelectorAll(".card");
}

function setCardContainerWidth(n) {
    /* Take a number of cards as parameter (ie: 5 to have 5 cards per line); */
    const width = parseInt(window.getComputedStyle(cards[0]).width) * n + 16 * (n - 1);
    console.log(width);
    cardContainer.style.width = `${width}px`;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateCardSet(colors) {
    /* Takes strings color list (for now) / Returns a list with objects representing cards */

    let cardSet = [];

    for(let i = 0; i < colors.length; i++) {
        const cardObject = {id: i, color: colors[i]};
        for(let j = 0; j < 2; j++) cardSet.push(cardObject);
    }

    // Scramble the set

    return cardSet;
}
