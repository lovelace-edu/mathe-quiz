let qc = 10;

document.addEventListener("DOMContentLoaded", () => {
    beginQuiz(createTaskVolumen, qc);
});

function createTaskVolumen() {
    const UNITS = [
        { from: "ml", to: "l",  factor: 0.001 },

        { from: "l",  to: "ml", factor: 1000 },
        { from: "l",  to: "m³", factor: 0.001 },

        { from: "m³", to: "l",  factor: 1000 }
    ];

    const LIST = [];

    for (let i = 0; i < qc; i++) {
        const unit = UNITS[randomNumber(0, UNITS.length - 1)];
        let value;

        if (unit.from === "ml" && unit.to === "l") {
            value = randomNumber(1, 20) * 1000;     // 1000 ml → 1 l
        }
        else if (unit.from === "l" && unit.to === "ml") {
            value = randomNumber(1, 20);            // 1–20 l
        }
        else if (unit.from === "l" && unit.to === "m³") {
            value = randomNumber(1, 10) * 1000;     // 1000 l → 1 m³
        }
        else if (unit.from === "m³" && unit.to === "l") {
            value = randomNumber(1, 5);             // 1–5 m³
        }
        else {
            i--;
            continue;
        }

        LIST.push({
            text: `${value} ${unit.from} → ${unit.to}`,
            solution: round(value * unit.factor, 6)
        });
    }

    return LIST;
}
