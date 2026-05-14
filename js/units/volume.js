document.addEventListener("DOMContentLoaded", () => {
    beginQuiz(createTaskVolume, 10);
});

function createTaskVolume() {
    const UNITS = [
        { from: "ml", to: "l",  factor: 0.001 },
        { from: "l",  to: "ml", factor: 1000  },
        { from: "l",  to: "m³", factor: 0.001 },
        { from: "m³", to: "l",  factor: 1000  }
    ];

    const LIST = [];

    for (let i = 0; i < questionCount; i++) {
        const UNIT = UNITS[randomNumber(0, UNITS.length - 1)];
        let value;

        if (UNIT.from === "ml" && UNIT.to === "l")  value = randomNumber(1, 20) * 1000;
        else if (UNIT.from === "l" && UNIT.to === "ml") value = randomNumber(1, 20);
        else if (UNIT.from === "l" && UNIT.to === "m³") value = randomNumber(1, 10) * 1000;
        else if (UNIT.from === "m³" && UNIT.to === "l") value = randomNumber(1, 5);

        LIST.push({
            text: `${value} ${UNIT.from} → ${UNIT.to}`,
            solution: round(value * UNIT.factor, 6)
        });
    }

    return LIST;
}