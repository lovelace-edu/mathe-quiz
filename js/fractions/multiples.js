document.addEventListener("DOMContentLoaded", () => {
    beginQuiz(createTaskMultiples, 10);
});

function createTaskMultiples() {
    const LIST = [];

    while(LIST.length < questionCount) {
        const A = randomNumber(2, 20);
        const B = randomNumber(2, 20);
        const SOLUTION = lcm(A, B);

        if(A !== B && SOLUTION <= 50) {
            LIST.push({
                text: `${A} und ${B}`,
                solution: SOLUTION
            });
        }
    }

    return LIST;
}

// kleinster gemeinsamer Teiler (least common multiple)
function lcm(a,b) {
    return (a * b) / gcd(a, b);
}