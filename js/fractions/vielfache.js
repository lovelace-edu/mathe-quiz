let qc = 10; // Fragenanzahl

document.addEventListener("DOMContentLoaded", () => {
    beginQuiz(createTaskVielfache, qc);
});

function createTaskVielfache() {
    const LIST = [];

    while(LIST.length < qc) {
        const A = randomNumber(2, 20);
        const B = randomNumber(2, 20);
        const SOLUTION = scd(A, B);

        if(A !== B && SOLUTION <= 50) {
            LIST.push({
                text: `${A} und ${B}`,
                solution: SOLUTION
            });
        }
    }

    return LIST;
}

// moderner euklidischer Algorithmus zur Bestimmung des ggT
function gcd(a, b) {
    while(b !== 0) {
        let h = a % b;
        a = b;
        b = h;
    }
    return a;
}

// kleinster gemeinsamer Teiler (smallest common divisor)
function scd(a,b) {
    return (a * b) / gcd(a, b);
}