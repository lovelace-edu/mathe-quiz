// Event Listener für Buttons auf Startseite
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".menu button").forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = btn.dataset.target;
        });
    });
});