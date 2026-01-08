let qc = 10; // Anzahl Fragen

document.addEventListener("DOMContentLoaded", () => {
    beginQuiz(createTaskMasse, qc);
});

function createTaskMasse() {
    const UNITS = [
        { from: "mg", to: "g" , factor: 0.001 },

        { from: "g",  to: "mg", factor: 1000 },
        { from: "g",  to: "kg", factor: 0.001 },

        { from: "kg", to: "g",  factor: 1000 },
        { from: "kg", to: "zt", factor: 1 / 50 },
        { from: "kg", to: "t" , factor: 0.001 },

        { from: "zt", to: "kg", factor: 50 },
        
        { from: "t",  to: "kg", factor: 1000 }
    ];

    const LIST = [];

    for (let i = 0; i < qc; i++) {
        let unit = UNITS[randomNumber(0, UNITS.length - 1)];
        let value;

        if (unit.from === "mg" && unit.to === "g") {
            value = randomNumber(500, 5000);
        } else if (unit.from === "g" && unit.to === "mg") {
            value = randomNumber(1, 200);
        } else if (unit.from === "g" && unit.to === "kg") {
            value = randomNumber(100, 5000);
        } else if (unit.from === "kg" && unit.to === "g") {
            value = randomNumber(1, 200);
        } else if (unit.from === "kg" && unit.to === "zt") { // nur Vielfache von 50
            value = randomNumber(1, 10) * 50;
        } else if (unit.from === "kg" && unit.to === "t") {
            value = randomNumber(1, 9000);
        } else if (unit.from === "zt" && unit.to === "kg") {
            value = randomNumber(1, 10);
        } else if (unit.from === "t" && unit.to === "kg") {
            value = randomNumber(1, 15);
        } else {
            value = randomNumber(1, 1000); // Standardwerte
        }
        
        const solution = round(value * unit.factor, 6);

        LIST.push({
            text: `${value} ${unit.from} → ${unit.to}`,
            solution
        });
    }

    return LIST;
}