/* ==========================================================
   HitBit Dashboard 2026
   Reloj
   ========================================================== */

const clock = {

    time: document.getElementById("clock-time"),
    weekday: document.getElementById("clock-weekday"),
    date: document.getElementById("clock-date"),

    update() {
        const now = new Date();
        this.time.textContent = Utils.now();
        this.weekday.textContent = Utils.weekday(now, "long");
        this.date.textContent = Utils.longDate(now);
    },
    start() {
        this.update();
        setInterval(() => this.update(), CONFIG.clockRefresh);
    }
};