// allgemeine Quiz-Logik

// Event Listener
document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelectorAll(".button-next").forEach(btn => {
        btn.addEventListener("click", onNext);
    });

    document.querySelectorAll(".button-check").forEach(btn => {
        btn.addEventListener("click", onCheck);
    });

    document.querySelectorAll(".button-intermediate").forEach(btn => {
        btn.addEventListener("click", toggleIntermediate);
    });

    document.querySelectorAll(".button-cancel").forEach(btn => {
        btn.addEventListener("click", () => onCancel(btn.dataset.target));
    });

    document.querySelectorAll(".button-result, .button-result-home").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const ACTION = e.currentTarget.dataset.action;
            if(ACTION === "retry" && createTaskFnRef) {
                beginQuiz(createTaskFnRef, questionCount);
            } else if(ACTION === "home") {
                window.location.href = "../index.html";
            }
        });
    }); 

    document.querySelectorAll(".button-result-units").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const ACTION = e.currentTarget.dataset.action;
            if(ACTION === "retry" && createTaskFnRef) {
                beginQuiz(createTaskFnRef, questionCount);
            } else if(ACTION === "selection") {
                window.location.href = "units.html";
            }
        });
    });

    document.querySelectorAll(".button-result-fractions").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const ACTION = e.currentTarget.dataset.action;
            if(ACTION === "retry" && createTaskFnRef) {
                beginQuiz(createTaskFnRef, questionCount);
            } else if(ACTION === "selection") {
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

// Optional: Modul-spezifische checkAnswer-Funktion (z.B. für dezimal.js)
// Wird mit registerCheckAnswer(fn) gesetzt, sonst greift die allgemeine Logik.
let customCheckAnswerFn = null;

function registerCheckAnswer(fn) {
    customCheckAnswerFn = fn;
}

// zur nächsten Frage springen
function onNext() {
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
    document.querySelectorAll(".button-intermediate").forEach(btn => {
        btn.disabled = answers.length === 0;
    });

    if (currentQuestion < questionCount) showTask();
    else showResult();
}

// Quiz Zustand verwerfen & zurück zur Auswahlseite
function onCancel(target) {
    if(confirm("Quiz wirklich abbrechen?")) {
        tasks = [];
        answers = [];
        currentQuestion = 0;
        currentChecked = false;
        window.location.href = target;
    }
}

function onCheck() {
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

    // Views vorbereiten
    document.querySelector("#quiz-view").style.display = "block";
    document.querySelector("#result-view").style.display = "none";
    const INTERMEDIATE_EL = document.querySelector(".intermediate");
    INTERMEDIATE_EL.style.display = "none";
    INTERMEDIATE_EL.textContent = "";

    showTask();
}

// Allgemeine Antwortprüfung (numerisch, mit Komma-Support)
function checkAnswer(showFeedback) {

    // Modul hat eine eigene Prüflogik registriert → diese verwenden
    if (customCheckAnswerFn) {
        return customCheckAnswerFn(tasks, currentQuestion, showFeedback);
    }

    const RAW = document.querySelector("#answer").value;
    if (!RAW) return null;

    const INPUT_R = normalizeInput(RAW);

    if (INPUT_R === "") {
        alert("Bitte eine gültige Zahl eingeben");
        return null;
    }

    const INPUT = Number(INPUT_R);
    if (isNaN(INPUT)) {
        alert("Bitte eine gültige Zahl eingeben");
        return null;
    }

    const TASK = tasks[currentQuestion];
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

    if(EL.style.display === "none" || EL.style.display === "") {
        updateIntermediate();
        EL.style.display = "block"; // einblenden
    } else {
        EL.style.display = "none"; // ausblenden
    }
}

function updateIntermediate() {
    let correct = 0;
    let total = answers.length;

    answers.forEach(item => {
        if(item.correct) correct++;
    });

    // Wenn die aktuelle Frage geprüft wurde, aber noch nicht weiter, addieren
    if (currentChecked && answers[currentQuestion] === undefined) {
        total++;
        // Letzte geprüfte Antwort war korrekt, wenn currentChecked gesetzt wurde
        const LAST_FEEDBACK = document.querySelector(".feedback").textContent;
        if (LAST_FEEDBACK.startsWith("✅")) correct++;
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
    answers.forEach(item => { if(item.correct) correct++; });

    document.querySelector("#quiz-view").style.display = "none";
    document.querySelector("#result-view").style.display = "block";
    document.querySelector("#result-text").textContent = `Richtig: ${correct} von ${questionCount}`;
}