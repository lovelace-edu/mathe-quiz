let questions = 15;

document.addEventListener("DOMContentLoaded", () => {
    beginQuiz(createTaskKopfrechnen, questions);
});

function createTaskKopfrechnen() {
    const LIST = [];

    for (let i = 1; i <= 50; i++) {
        for (let j = 1; j <= 50; j++) {
            let text, solution;

            // Addition
            if (Math.random() < 0.5) {
                // Reihenfolge der Summanden mischen
                if(Math.random() < 0.5) {
                    let tmp = i;
                    i = j;;
                    j = tmp;
                }

                text = `${i} + ${j}`;
                solution = i + j;
            } else {
                // Subtraktion, keine negativen Ergebnisse
                const x = Math.max(i, j);
                const y = Math.min(i, j);
                text = `${x} - ${y}`;
                solution = x - y;
            }

            LIST.push({ text, solution });
        }
    }

    // Shuffle, damit die Aufgaben pro Quiz unterschiedlich sind
    shuffle(LIST);

    // Slice auf die gewünschte Anzahl (z. B. 15 Fragen)
    return LIST.slice(0, questions);
}