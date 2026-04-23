document.addEventListener("DOMContentLoaded", () => {
    // Eigene Prüflogik für Dezimal ↔ Bruch registrieren
    registerCheckAnswer(checkAnswerDezimal);
    beginQuiz(createTaskDecimal, 10);
});

function createTaskDecimal() {

    const LIST = [
        { fraction: "1/2", decimal: "0,5" },
        { fraction: "1/3", decimal: "0,333" },
        { fraction: "1/4", decimal: "0,25" },
        { fraction: "3/4", decimal: "0,75" },

        { fraction: "1/5", decimal: "0,2" },
        { fraction: "2/5", decimal: "0,4" },
        { fraction: "3/5", decimal: "0,6" },
        { fraction: "4/5", decimal: "0,8" },

        { fraction: "1/8", decimal: "0,125" },

        { fraction: "1/10", decimal: "0,1" },
        { fraction: "2/10", decimal: "0,2" },
        { fraction: "5/10", decimal: "0,5" },
        { fraction: "9/10", decimal: "0,9" },

        { fraction: "1/20", decimal: "0,05" },
        { fraction: "1/25", decimal: "0,04" },
        { fraction: "1/50", decimal: "0,02" },

        { fraction: "1/100", decimal: "0,01" },
        { fraction: "1/200", decimal: "0,005" },
        { fraction: "1/500", decimal: "0,002" },
        { fraction: "1/1000", decimal: "0,001" }
    ];

    // Für jede Aufgabe zufällig Richtung wählen
    return LIST.map(item => {
        const toDecimal = Math.random() < 0.5;

        if(toDecimal) {
            return {
                text: `<b>${item.fraction}</b>`,
                fraction: item.fraction,
                decimal:  item.decimal,
                solution: item.decimal,
                toDecimal: true
            };
        } else {
            return {
                text: `<b>${item.decimal}</b>`,
                fraction: item.fraction,
                decimal:  item.decimal,
                solution: item.fraction,
                toDecimal: false
            };
        }
    });
}

// Eigene Prüflogik: akzeptiert Dezimalzahl (mit Komma) oder Bruch
function checkAnswerDezimal(tasks, currentQuestion, showFeedback) {
    const raw = document.querySelector("#answer").value;
    if (!raw) return null;

    const input = normalizeInput(raw); // Komma → Punkt
    const TASK  = tasks[currentQuestion];

    let correct = false;

    if (TASK.toDecimal) {
        // Erwartet: Dezimalzahl → numerisch vergleichen
        const inputNum   = Number(input);
        const solutionNum = Number(TASK.decimal.replace(",", "."));

        if (!isNaN(inputNum)) {
            correct = Math.abs(inputNum - solutionNum) < 0.0001;
        }
    } else {
        // Erwartet: Bruch → als Bruch vergleichen
        const inputFrac    = parseFraction(input);
        const solutionFrac = parseFraction(TASK.fraction);

        if (inputFrac && solutionFrac) {
            correct = fractionsEqual(inputFrac, solutionFrac);
        }
    }

    if (showFeedback) {
        document.querySelector(".feedback").textContent = correct
            ? "✅ Richtig!"
            : `❌ Falsch – richtig wäre: ${TASK.solution}`;
    }

    return {
        task: TASK,
        answer: input,
        correct
    };
}