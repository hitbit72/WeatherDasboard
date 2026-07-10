"use strict";

/* ==========================================================
   HitBit Dashboard
   templates.js
   Plantillas HTML
   ========================================================== */

const Templates = {

    /* ======================================================
       TARJETA MÉTRICA
       ====================================================== */
    metric(metric) {
        return `
            <article class="metric">
                <img
                    class="metric-icon"
                    src="assets/icons/ui/${metric.icon}"
                    alt="${metric.label}">
                <div class="metric-label">
                    ${metric.label}
                </div>
                <div class="metric-value">
                    ${metric.value}
                </div>
            </article>
        `;
    },

    /* ======================================================
       TARJETA PRONÓSTICO
       ====================================================== */
    forecast(day) {
        return `
            <article class="forecast-day">
                <div class="forecast-name">
                    ${day.weekday}
                </div>
                <img
                    class="forecast-icon"
                    src="assets/icons/weather/${day.weather.icon}"
                    alt="${day.weather.text}">
                <div class="forecast-max">
                    ${Utils.formatTemperature(day.max)}
                </div>
                <div class="forecast-min">
                    ${Utils.formatTemperature(day.min)}
                </div>
            </article>
        `;
    }
};