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

// Bruchstring → {num, den}
function parseFraction(str) {
    if (!str.includes("/")) return null;

    const [num, den] = str.split("/").map(Number);

    if (isNaN(num) || isNaN(den) || den === 0) return null;

    return { num, den };
}

// moderner euklidischer Algorithmus zur Bestimmung des ggT
function gcd(a, b) {
    while(b !== 0) {
        let h = a % b;
        a = b;
        b = h;
    }
    return a;
}

// Bruch kürzen
function simplifyFraction(num, den) {
    const g = gcd(num, den);
    return { num: num / g, den: den / g };
}

// Vergleich Brüche
function fractionsEqual(a, b) {
    const f1 = simplifyFraction(a.num, a.den);
    const f2 = simplifyFraction(b.num, b.den);

    return f1.num === f2.num && f1.den === f2.den;
}