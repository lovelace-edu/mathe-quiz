document.addEventListener("DOMContentLoaded", () => {
    registerCheckAnswer(checkAnswerDecimal);
    beginQuiz(createTaskDecimal, 10);
});

function createTaskDecimal() {

    const LIST = [
        { fraction: "1/2", decimal: "0,5"   },
        { fraction: "1/3", decimal: "0,333" },
        { fraction: "2/3", decimal: "0,666" },
        { fraction: "1/4", decimal: "0,25"  },
        { fraction: "3/4", decimal: "0,75"  },

        { fraction: "1/5", decimal: "0,2" },
        { fraction: "2/5", decimal: "0,4" },
        { fraction: "3/5", decimal: "0,6" },
        { fraction: "4/5", decimal: "0,8" },

        { fraction: "1/8",  decimal: "0,125"  },
        { fraction: "1/80", decimal: "0,0125" },

        { fraction: "1/10", decimal: "0,1" },
        { fraction: "2/10", decimal: "0,2" },
        { fraction: "5/10", decimal: "0,5" },
        { fraction: "9/10", decimal: "0,9" },

        { fraction: "1/20", decimal: "0,05" },
        { fraction: "1/25", decimal: "0,04" },
        { fraction: "1/50", decimal: "0,02" },

        { fraction: "1/100", decimal: "0,01" },
        { fraction: "2/100", decimal: "0,02" },
        { fraction: "5/100", decimal: "0,05" },
        { fraction: "7/100", decimal: "0,07" },
        { fraction: "8/100", decimal: "0,08" },

        { fraction: "1/200", decimal: "0,005" },
        { fraction: "1/500", decimal: "0,002" },
        { fraction: "1/1000", decimal: "0,001" }
    ];

    // Für jede Aufgabe zufällig Richtung wählen
    return LIST.map(item => {
        const TO_DECIMAL = Math.random() < 0.5;

        if(TO_DECIMAL) {
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

// Funktion akzeptiert Dezimalzahl oder gemeinen Bruch
function checkAnswerDecimal(tasks, currentQuestion, showFeedback) {
    const RAW = document.querySelector("#answer").value;
    if (!RAW) return null;

    const INPUT = normalizeInput(RAW); // Komma → Punkt
    const TASK  = tasks[currentQuestion];

    let correct = false;

    if (TASK.toDecimal) {
        // Erwartet: Dezimalzahl → numerisch vergleichen
        const INPUT_NUM = Number(INPUT);
        const SOLUTION_NUM = Number(TASK.decimal.replace(",", "."));

        if (!isNaN(INPUT_NUM)) {
            correct = Math.abs(INPUT_NUM - SOLUTION_NUM) < 0.0001;
        }
    } else {
        // Erwartet: Bruch → als Bruch vergleichen
        const INPUT_FRAC = parseFraction(INPUT);
        const SOLUTION_FRAC = parseFraction(TASK.fraction);

        if (INPUT_FRAC && SOLUTION_FRAC) {
            correct = fractionsEqual(INPUT_FRAC, SOLUTION_FRAC);
        }
    }

    if (showFeedback) {
        document.querySelector(".feedback").textContent = correct
            ? "✅ Richtig!"
            : `❌ Falsch – richtig wäre: ${TASK.solution}`;
    }

    return {
        task: TASK,
        answer: INPUT,
        correct
    };
}