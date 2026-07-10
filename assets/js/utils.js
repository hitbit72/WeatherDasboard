/* ==========================================================
   HitBit Dashboard
   Utilidades
   ========================================================== */

const Utils = {

    /* ======================================================
       TEMPERATURA
       ====================================================== */
    formatTemperature(value) {
        return `${Math.round(value)}°`;
    },

    /* ======================================================
       LLUVIA
       ====================================================== */
    formatRain(value) {
        return `${Number(value).toFixed(1)} mm`;
    },

    /* ======================================================
       HUMEDAD
       ====================================================== */
    formatHumidity(value) {
        return `${Math.round(value)}%`;
    },

    /* ======================================================
       VIENTO
       ====================================================== */
    formatWind(value) {
        return `${Math.round(value)} km/h`;
    },

    /* ======================================================
       DÍA DE LA SEMANA
       ====================================================== */
    weekday(date) {
        return new Date(date)
            .toLocaleDateString(
                CONFIG.locale,
                {
                    weekday: "short"
                }
            )
            .replace(".", "")
            .toUpperCase();
    },

    /* ======================================================
       HORA
       ====================================================== */
    now() {
        return new Date()
            .toLocaleTimeString(
                CONFIG.locale,
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );
    }
};