document.addEventListener("DOMContentLoaded", () => {
    beginQuiz(createTaskEinmaleins, 15);
});

// Aufgabe erstellen aus zufälligen Zahlen zwischen 0 & 10
function createTaskEinmaleins() {
    const LIST = [];

    // eindeutige Paare erstellen
    for (let a = 2; a <= 10; a++) {
        for (let b = a; b <= 10; b++) {
            LIST.push({a,b});
        }
    }

    // Paare zufällig drehen (8*5 oder 5*8)
    const TASKS = LIST.map(pair => {
        let x = pair.a;
        let y = pair.b;

        // 50% Chance
        if(Math.random() < 0.5) {
            [x,y] = [y,x];
        }

        return {
            text: `${x} × ${y}`,
            solution: x * y
        };
    });

    return TASKS;
}

