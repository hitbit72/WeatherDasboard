/* ==========================================================
   HitBit Dashboard 2026
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
       DÍA DE LA SEMANA - CORTO, LARGO
       ====================================================== */
    weekday(date, t="short", uppercase=true) {
        const day = new Date(date)
            .toLocaleDateString(
                CONFIG.locale,
                {
                    weekday: t
                }
            )
            .replace(".", "");
            return uppercase ? day.toUpperCase() : day;
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
    },

    /* ======================================================
       FECHA LARGA
       ====================================================== */
    longDate(date){
        return new Date(date).toLocaleDateString(
            CONFIG.locale,
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );    
    },

    esDeNoche(){
    /* ======================================================
       COMPRUEBA SI ES DE NOCHE
       Determinar si es de día (antes de las 22h) o de noche (22h o más) hasta la 6h
       ====================================================== */
       const horaActual = new Date().getHours();
       return horaActual >= 22 || horaActual < 6;
    }
};