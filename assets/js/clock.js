/* ==========================================================
   Reloj
   ========================================================== */

const clock = {

    time: document.getElementById("clock-time"),
    weekday: document.getElementById("clock-weekday"),
    date: document.getElementById("clock-date"),

    update() {
        const now = new Date();
        this.time.textContent = now.toLocaleTimeString(
            CONFIG.locale,
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

        this.weekday.textContent = now.toLocaleDateString(
            CONFIG.locale,
            {
                weekday: "long"
            }
        );
        
        this.date.textContent = now.toLocaleDateString(
            CONFIG.locale,
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );
    },
    start() {
        this.update();
        setInterval(() => this.update(), CONFIG.clockRefresh);
    }
};