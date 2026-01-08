document.addEventListener("DOMContentLoaded", () => {
    // Buttons für Einheiten
    document.querySelectorAll(".button-groessen").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.dataset.target) {
                window.location.href = btn.dataset.target;
            }
        });
    });

    // Zurück-Button
    document.querySelectorAll(".button-zurueck").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.dataset.target) {
                window.location.href = btn.dataset.target;
            }
        });
    });
});

// Zufallszahl passend zur Einheit
function randomValue(unit, step = 1) {
    let min, max;

    switch(unit) {
        case "mm": min = 10; max = 900; break;
        case "cm": min =  1; max = 900; break;
        case "dm": min =  1; max =  90; break;
        case "m" : min =  1; max = 500; break; 
        case "km": min =  1; max =  20; break;

        case "mg": min = 100; max = 1000; break;
        case "g":  min =   1; max = 1000; break;
        case "kg": min =   1; max = 1000; break;
        case "zt": min =   1; max =   20; break;
        case "t":  min =   1; max =   10; break;

        default:   min = 1; max =  100; 
    }

    let val = randomNumber(min, max);
    return val * step; // Schrittweite berücksichtigen (z.B. 50 kg für zt)
}