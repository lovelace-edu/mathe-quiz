document.addEventListener("DOMContentLoaded", () => {
    beginQuiz(createTaskDivisors, 10);
});

function createTaskDivisors() {
    const LIST = [];

    while(LIST.length < questionCount) {
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