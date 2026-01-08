document.addEventListener("DOMContentLoaded", () => {
    beginQuiz(createTaskPotenzen, 10);
});

// erlaubte Aufgaben
const POWERS = [
    { base: 2, exp: 2 }, // 4
    { base: 2, exp: 3 }, // 8
    { base: 2, exp: 4 }, // 16
    { base: 2, exp: 5 }, // 32
    { base: 2, exp: 6 }, // 64
    { base: 2, exp: 7 }, // 128
    { base: 2, exp: 8 }, // 256

    { base: 3, exp: 2 }, // 9
    { base: 3, exp: 3 }, // 27

    { base: 4, exp: 2 }, // 16
    { base: 5, exp: 2 }, // 25
    { base: 5, exp: 3 }, // 125
    { base: 6, exp: 2 }, // 36
    { base: 7, exp: 2 }, // 49
    { base: 8, exp: 2 }, // 64
    { base: 9, exp: 2 }, // 81

    { base: 10, exp: 2 }, // 100
    { base: 10, exp: 3 }, // 1000
    { base: 10, exp: 4 }, // 10000

    { base: 11, exp: 2 }, // 121
    { base: 12, exp: 2 }, // 144
    { base: 13, exp: 2 }, // 169
    { base: 14, exp: 2 }, // 196
    { base: 15, exp: 2 }, // 225
    { base: 16, exp: 2 }, // 256
    { base: 17, exp: 2 }, // 289
    { base: 18, exp: 2 }, // 324
    { base: 19, exp: 2 }, // 361
    { base: 20, exp: 2 }, // 400

    // Sonderfälle
    { base: 0, exp: 2 }, // 0
    { base: 1, exp: 2 }, // 1
    { base: 1, exp: 3 }, // 1
    { base: 2, exp: 0 }, // 1
    { base: 4, exp: 0 }, // 1
];

function createTaskPotenzen() {
    return POWERS.map(p => ({
        text: `${p.base}<sup>${p.exp}</sup>`,
        solution: Math.pow(p.base, p.exp)
    }));
}
