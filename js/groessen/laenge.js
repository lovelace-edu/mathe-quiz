let qc = 10; // Fragenanzahl

document.addEventListener("DOMContentLoaded", () => {
    beginQuiz(createTaskLaenge, qc);
});

function createTaskLaenge() {
    const UNITS = [
        { from: "mm", to: "cm", factor: 0.1 },
        { from: "mm", to: "dm", factor: 0.01 },
        { from: "mm", to: "m",  factor: 0.001 },
        { from: "mm", to: "km", factor: 0.000001 },

        { from: "cm", to: "mm", factor: 10 },
        { from: "cm", to: "dm", factor: 0.1 },
        { from: "cm", to: "m" , factor: 0.01 },
        { from: "cm", to: "km", factor: 0.00001 },

        { from: "dm", to: "mm", factor: 100 },
        { from: "dm", to: "cm", factor: 10 },
        { from: "dm", to: "m" , factor: 0.1 },
        { from: "dm", to: "km", factor: 0.0001 },

        { from: "m" , to: "mm", factor: 1000 },
        { from: "m" , to: "cm", factor: 100 },
        { from: "m" , to: "dm", factor: 10 },
        { from: "m" , to: "km", factor: 0.001 },

        { from: "km", to: "mm", factor: 1000000 },
        { from: "km", to: "cm", factor: 100000 },
        { from: "km", to: "dm", factor: 10000 },
        { from: "km", to: "m" , factor: 1000 }
    ];

    const LIST = [];

    for (let i = 0; i < qc; i++) {
        let unit = UNITS[randomNumber(0, UNITS.length - 1)];

        let value = randomValue(unit.from); // randomValue aus groesseneinheiten.js

        LIST.push({
            text: `${value} ${unit.from} → ${unit.to}`,
            solution: round(value * unit.factor, 6)
        });
    }

    return LIST;
}