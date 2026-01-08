document.addEventListener("DOMContentLoaded", () => {
    // Buttons für Themengebiete
    document.querySelectorAll(".button-brueche").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.dataset.target) {
                window.location.href = btn.dataset.target;
            }
        });
    });

    // Zurück-Button
    document.querySelectorAll(".button-zurueck").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.dataset.target) {
                window.location.href = btn.dataset.target;
            }
        });
    });
});
