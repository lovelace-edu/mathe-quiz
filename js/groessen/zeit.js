let qc = 10;

document.addEventListener("DOMContentLoaded", () => {
    beginQuiz(createTaskZeit, qc);
});

function createTaskZeit() {
    const UNITS = [
        { from: "ms",  to: "s",   factor: 0.001 },

        { from: "s",   to: "ms",  factor: 1000 },
        { from: "s",   to: "min", factor: 1 / 60 },
        { from: "s",   to: "h",   factor: 1 / 3600 },

        { from: "min", to: "s",   factor: 60 },
        { from: "min", to: "h",   factor: 1 / 60 },

        { from: "h",   to: "min", factor: 60 },
        { from: "h",   to: "d",   factor: 1 / 24 },

        { from: "d",   to: "h",   factor: 24 }
    ];

    const LIST = [];

    for (let i = 0; i < qc; i++) {
        const unit = UNITS[randomNumber(0, UNITS.length - 1)];
        let value;

        if (unit.from === "ms" && unit.to === "s") {
            value = randomNumber(1, 9) * 1000;
        }
        else if (unit.from === "s" && unit.to === "ms") {
            value = randomNumber(1, 20);
        }
        else if (unit.from === "s" && unit.to === "min") {
            value = randomNumber(1, 20) * 60;
        }
        else if (unit.from === "min" && unit.to === "s") {
            value = randomNumber(1, 15);
        }
        else if (unit.from === "min" && unit.to === "h") {
            value = randomNumber(1, 6) * 60;
        }
        else if (unit.from === "h" && unit.to === "min") {
            value = randomNumber(1, 12);
        }
        else if (unit.from === "h" && unit.to === "d") {
            value = randomNumber(1, 3) * 24;
        }
        else if (unit.from === "d" && unit.to === "h") {
            value = randomNumber(1, 3);
        }
        else {
            console.error("Nicht behandelter Einheitentyp:", unit);
            i--;
            continue;
        }

        const SOLUTION = round(value * unit.factor, 6);

        LIST.push({
            text: `${value} ${unit.from} → ${unit.to}`,
            solution: SOLUTION
        });
    }

    return LIST;
}
