document.addEventListener("DOMContentLoaded", () => {
    registerCheckAnswer(checkAnswerPercent);
    beginQuiz(createTaskPercent, 10);
});

function createTaskPercent() {
    const LIST_FRACTIONS = [
        { fraction: "1/2", decimal: "0,5",   percent:"50"   },
        { fraction: "1/3", decimal: "0,333", percent:"33" },
        { fraction: "2/3", decimal: "0,66",  percent:"66" },
        { fraction: "1/4", decimal: "0,25",  percent:"25"   },
        { fraction: "3/4", decimal: "0,75",  percent:"75"   },

        { fraction: "1/5", decimal: "0,2", percent:"20" },
        { fraction: "2/5", decimal: "0,4", percent:"40" },
        { fraction: "3/5", decimal: "0,6", percent:"60" },
        { fraction: "4/5", decimal: "0,8", percent:"80" },

        { fraction: "1/8", decimal: "0,125", percent:"12,5" },

        { fraction: "1/10", decimal: "0,1", percent:"10" },
        { fraction: "3/10", decimal: "0,3", percent:"30" },
        { fraction: "7/10", decimal: "0,7", percent:"70" },
        { fraction: "8/10", decimal: "0,8", percent:"80" },

        { fraction: "1/20", decimal: "0,05", percent:"5" },
        { fraction: "1/25", decimal: "0,04", percent:"4" },
        { fraction: "1/50", decimal: "0,02", percent:"2" },

        { fraction: "1/100",  decimal: "0,01", percent:"1"  },
        { fraction: "14/100", decimal: "0,14", percent:"14" },
        { fraction: "35/100", decimal: "0,35", percent:"35" },
        { fraction: "47/100", decimal: "0,47", percent:"47" },
        { fraction: "71/100", decimal: "0,71", percent:"71" },
        { fraction: "93/100", decimal: "0,93", percent:"93" }
    ];

    // für jede Aufgabe zufällig Richtung wählen
    return LIST_FRACTIONS.map(item => {
        const TO_DECIMAL = Math.random();

        if(TO_DECIMAL < 0.25) { // geg: gemeiner Bruch 
            return {
                text: `<b>${item.fraction} in Prozent</b>`,
                fraction: item.fraction,
                decimal:  item.decimal,
                percent:  item.percent
            };
        } else if(TO_DECIMAL >= 0.33 && TO_DECIMAL < 0.5) { // geg: Dezimalbruch
            return {
                text: `<b>${item.decimal} in Prozent</b>`,
                fraction: item.fraction,
                decimal:  item.decimal,
                percent:  item.percent
            };
        } else { // geg: Prozent
            return {
                text: `<b>${item.percent}% als Bruch</b>`,
                fraction: item.fraction,
                decimal:  item.decimal,
                percent:  item.percent
            };
        }
    });
}

function checkAnswerPercent(tasks, currentQuestion, showFeedback) {
    const RAW = document.querySelector("#answer").value;
    if (!RAW) return null;

    const TASK = tasks[currentQuestion];
    
    // Lösung immer als Dezimalzahl (percent / 100)
    const SOLUTION_DECIMAL = Number(TASK.percent.replace(",", ".")) / 100;

    // Eingabe normalisieren
    let input = normalizeInput(RAW);
    input = input.replace("%", "").trim(); // % raus

    let inputDecimal = null;

    // Eingabe als Bruch? (z.B. 7/10 oder 70/100)
    const FRAC = parseFraction(input);
    if (FRAC) {
        inputDecimal = FRAC.num / FRAC.den;
    } else { // Eingabe als Dezimal oder Prozent?
        const NUM = Number(input);
        if (!isNaN(NUM)) {
            if (NUM >= 1) { inputDecimal = NUM / 100; } 
            else { inputDecimal = NUM; }
        }
    }

    if (inputDecimal === null) {
        alert("Bitte eine gültige Eingabe");
        return null;
    }

    const CORRECT = Math.abs(inputDecimal - SOLUTION_DECIMAL) < 0.001;

    if (showFeedback) {
        document.querySelector(".feedback").textContent = CORRECT
            ? "✅ Richtig!"
            : `❌ Falsch – richtig wäre ${TASK.percent}%`;
    }

    return { 
        task: TASK,
        answer: input,
        correct: CORRECT
    }; 
}