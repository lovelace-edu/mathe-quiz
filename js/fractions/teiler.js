let qc = 10; // Fragenanzahl

document.addEventListener("DOMContentLoaded", () => {
    beginQuiz(createTaskTeiler, qc);
});

function createTaskTeiler() {
    const LIST = [];

    while(LIST.length < qc) {
        const A = randomNumber(6, 50);
        const B = randomNumber(6, 50);

        const SOLUTION = gcd(A,B);

        if(SOLUTION > 1) {
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