/* ==========================================================
   HitBit Dashboard 2026
   Reloj
   ========================================================== */

const clock = {

    time: document.getElementById("clock-time"),
    weekday: document.getElementById("clock-weekday"),
    date: document.getElementById("clock-date"),
    timer: null,

    update() {
        const now = new Date();
        this.time.textContent = Utils.now();
        this.weekday.textContent = Utils.weekday(now, "long", false);
        this.date.textContent = Utils.longDate(now);
    },
    start() {
        this.update();
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(() => this.update(), CONFIG.clockRefresh);
    }
};