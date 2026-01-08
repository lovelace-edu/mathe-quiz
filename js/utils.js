// Hilfsfunktionen

function $(id) {
    return document.getElementById(id);
}

// Zufallszahl erzeugen
function randomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Runden auf n Dezimalstellen
function round(value, decimals = 3) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

// Array mischen (für Fragen Liste)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = randomNumber(0, i);
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Zahlen runden (gegen JS-Gleitkommafehler)
function normalizeNumber(value, decimals = 6) {
    return Number(Number(value).toFixed(decimals));
}

// Nutzereingabe normalisieren (Leerzeichen, Komma → Punkt)
function normalizeInput(value) {
    if (typeof value !== "string") return "";
    return value
        .trim()
        .replace(/\s+/g, "")   // alle Leerzeichen raus
        .replace(",", ".");    // deutsches Komma erlauben
}