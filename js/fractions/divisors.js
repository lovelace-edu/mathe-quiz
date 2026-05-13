let qc = 10; // Fragenanzahl

document.addEventListener("DOMContentLoaded", () => {
    beginQuiz(createTaskDivisors, qc);
});

function createTaskDivisors() {
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