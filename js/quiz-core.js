// allgemeine Quiz-Logik

// Event Listener
document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelectorAll(".button-weiter").forEach(btn => {
        btn.addEventListener("click", onWeiter);
    });

    document.querySelectorAll(".button-pruefen").forEach(btn => {
        btn.addEventListener("click", onPruefen);
    });

    document.querySelectorAll(".button-zwischenstand").forEach(btn => {
        btn.addEventListener("click", toggleIntermediate);
    });

    document.querySelectorAll(".button-abbrechen").forEach(btn => {
        btn.addEventListener("click", onAbbrechen);
    });

    document.querySelectorAll(".button-abbrechen-groessen").forEach(btn => {
        btn.addEventListener("click", onAbbrechenGroessen)
    });

    document.querySelectorAll(".button-abbrechen-brueche").forEach(btn => {
        btn.addEventListener("click", onAbbrechenBrueche)
    });

    document.querySelectorAll(".button-auswertung").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const action = e.currentTarget.dataset.action;
            if(action === "nochmal" && createTaskFnRef) {
                beginQuiz(createTaskFnRef, questionCount);
            } else if(action === "startseite") {
                window.location.href = "../index.html";
            }
        });
    }); 

    document.querySelectorAll(".button-auswertung-groessen").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const action = e.currentTarget.dataset.action;
            if(action === "nochmal" && createTaskFnRef) {
                beginQuiz(createTaskFnRef, questionCount);
            } else if(action === "auswahlseite") {
                window.location.href = "groesseneinheiten.html";
            }
        });
    });

    document.querySelectorAll(".button-auswertung-brueche").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const action = e.currentTarget.dataset.action;
            if(action === "nochmal" && createTaskFnRef) {
                beginQuiz(createTaskFnRef, questionCount);
            } else if(action === "auswahlseite") {
                window.location.href = "fractions.html";
            }
        });
    });
});

let questionCount = 10;
let currentQuestion = 0;
let currentChecked = false;
let createTaskFnRef = null;

let tasks = [];
let answers = [];

// zur nächsten Frage springen
function onWeiter() {
    let result;

    if (!currentChecked) {
        result = checkAnswer(true);
        if (!result) return;
    } else {
        result = checkAnswer(false);
    }

    answers.push(result);
    currentQuestion++;
    currentChecked = false;

    // Feedback & Zwischenstand zurücksetzen
    document.querySelector(".feedback").textContent = "";
    document.querySelector(".intermediate").style.display = "none";

    // Zwischenstand nur aktiv, wenn mindestens eine Antwort vorhanden
    document.querySelectorAll(".button-zwischenstand").forEach(btn => {
        btn.disabled = answers.length === 0;
    });

    if (currentQuestion < questionCount) showTask();
    else showResult();
}

// Quiz Zustand verwerfen & zurück zur Auswahlseite
function onAbbrechen() {
    if(confirm("Quiz wirklich abbrechen?")) {
        tasks = [];
        answers = [];
        currentQuestion = 0;
        currentChecked = false;
        window.location.href = "../index.html";
    }
}

function onAbbrechenGroessen() {
    if(confirm("Quiz wirklich abbrechen?")) {
        tasks = [];
        answers = [];
        currentQuestion = 0;
        currentChecked = false;
        window.location.href = "groesseneinheiten.html";
    }
}

function onAbbrechenBrueche() {
    if(confirm("Quiz wirklich abbrechen?")) {
        tasks = [];
        answers = [];
        currentQuestion = 0;
        currentChecked = false;
        window.location.href = "fractions.html";
    }
}

function onPruefen() {
    const RESULT = checkAnswer(true);
    if(!RESULT) return;
    currentChecked = true; // markiert Frage als geprüft
    updateIntermediate(); // Zwischenstand aktualisieren
}

function beginQuiz(createTaskFn, count = 10) {
    createTaskFnRef = createTaskFn;
    questionCount = count;

    tasks = [];
    answers = [];
    currentQuestion = 0;
    currentChecked = false;

    // Fragen-Liste erstellen und mischen
    const POOL = createTaskFn();
    shuffle(POOL);
    tasks = POOL.slice(0, questionCount);

    // Debugging
    console.log("Tasks zurückgegeben:", tasks);
    console.log("Tasks Länge:", tasks?.length);

    // Views vorbereiten
    document.querySelector("#quiz-view").style.display = "block";
    document.querySelector("#result-view").style.display = "none";
    const intermediateEl = document.querySelector(".intermediate");
    intermediateEl.style.display = "none";
    intermediateEl.textContent = "";

    showTask();
}

// Antwort prüfen
function checkAnswer(showFeedback) {

    // Roh-Eingabe holen
    const USER_INPUT = document.querySelector("#answer").value;
    if (!USER_INPUT) return null;

    // Normalisieren (Leerzeichen + Komma)
    const INPUT_STRING = normalizeInput(USER_INPUT);

    if (INPUT_STRING === "") {
        alert("Bitte eine gültige Zahl eingeben");
        return null;
    }

    const INPUT = Number(INPUT_STRING);
    if (Number.isNaN(INPUT)) {
        alert("Bitte eine gültige Zahl eingeben");
        return null;
    }

    const TASK = tasks[currentQuestion];

    // Eingabe und Lösung normalisieren
    const USER_VALUE = normalizeNumber(INPUT);
    const SOLUTION = normalizeNumber(TASK.solution);

    const CORRECT = USER_VALUE === SOLUTION;

    if (showFeedback) {
        document.querySelector(".feedback").textContent = CORRECT
            ? "✅ Richtig!"
            : `❌ Falsch – richtig wäre ${SOLUTION}`;
    }

    return {
        task: TASK,
        answer: USER_VALUE,
        correct: CORRECT
    };
}

// Zwischenstand ein- & ausblenden
function toggleIntermediate() {
    const EL = document.querySelector(".intermediate");

    if(!EL) return;

    if(EL.style.display == "none" || EL.style.display === "") {
        updateIntermediate();
        EL.style.display = "block"; // einblenden
    } else {
        EL.style.display = "none"; // ausblenden
    }
}

function updateIntermediate(extra) {
    let correct = 0;
    let total = answers.length;

    answers.forEach(item => {
        if(item.answer === item.task.solution) correct++;
    });

    // Wenn die aktuelle Frage geprüft wurde, aber noch nicht weiter, addieren
    if (currentChecked && answers[currentQuestion] === undefined) {
        const CURRENT_TASK = tasks[currentQuestion];
         const INPUT_VALUE = Number(document.querySelector("#answer").value);
        if (!isNaN(INPUT_VALUE )) {
            total++;
            if(INPUT_VALUE  === CURRENT_TASK.solution) correct++;
        }
    }

    document.querySelector(".intermediate").textContent = `Richtig bisher: ${correct} von ${total}`;
}

function showTask() {
    const QUESTION = tasks[currentQuestion];

    if (!QUESTION) {
        console.error("Ungültiger Aufgabenindex:", currentQuestion, tasks);
        return;
    }

    document.querySelector(".progress").textContent =
        `Frage ${currentQuestion + 1} / ${questionCount}`;

    document.querySelector(".task").innerHTML = QUESTION.text;

    document.querySelector("#answer").value = "";
    document.querySelector(".feedback").textContent = "";
}

function showResult() {
    let correct = 0;
    answers.forEach(item => { if(item.answer === item.task.solution) correct++; });

    document.querySelector("#quiz-view").style.display = "none";
    document.querySelector("#result-view").style.display = "block";
    document.querySelector("#result-text").textContent = `Richtig: ${correct} von ${questionCount}`;
}