"use strict"

const cards = document.querySelectorAll(".card");
const btn = document.querySelector(".btn");

cards.forEach(card => {
    card.addEventListener("click", event => {
        card.setAttribute("selected",
            card.getAttribute("selected") === "true" ? "false" : "true");

        if(card.getAttribute("selected") === "true") {
            card.style.setProperty("--translateY", "-16px");
        } else {
            card.style.setProperty("--translateY", "0px");
        }
    });
})

btn.addEventListener("click", event => {
    cards.forEach(card => {
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
    })
});
