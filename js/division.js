document.addEventListener("DOMContentLoaded", () => {
    beginQuiz(createTaskDiv, 15);
});

function createTaskDiv() {
    const LIST = [];

    for (let b = 2; b <= 10; b++) {
        for (let c = 1; c <= 12; c++) {
            const a = b * c;

            if (a !== b && a <= 100) {
                LIST.push({
                    text: `${a} ÷ ${b}`,
                    solution: c
                });
            }
        }
    }

    return LIST;
}
