"use script"

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", event => {
        card.setAttribute("selected",
            card.getAttribute("selected") === "true" ? "false" : "true");

        const isSelected = card.getAttribute("selected") === "true";

        if(isSelected) {
            card.style.setProperty("--translateY", "-16px");
        } else {
            card.style.setProperty("--translateY", "0px");
        }
    });
})
