/* ==========================================================
   HitBit Dashboard
   weatherCodes.js
   Traducción de códigos meteorológicos Open-Meteo
   ========================================================== */

const WEATHER_CODES = {
    codes: {
        0: {
            text: "Despejado",
            icon: "clear_day.svg"
            },
        1: {
            text: "Mayormente despejado",
            icon: "partly_cloudy.svg"
        },
        2: {
            text: "Parcialmente nublado",
            icon: "partly_cloudy.svg"
        },
        3: {
            text: "Cubierto",
            icon: "cloudy.svg"
        },
        45: {
            text: "Niebla",
            icon: "fog.svg"
        },
        48: {
            text: "Niebla con escarcha",
            icon: "fog.svg"
        },
        51: {
            text: "Llovizna ligera",
            icon: "drizzle.svg"
        },
        53: {
            text: "Llovizna",
            icon: "drizzle.svg"
        },
        55: {
            text: "Llovizna intensa",
            icon: "drizzle.svg"
        },
        56: {
            text: "Llovizna helada",
            icon: "drizzle.svg"
        },
        57: {
            text: "Llovizna helada fuerte",
            icon: "drizzle.svg"
        },
        61: {
            text: "Lluvia ligera",
            icon: "rain.svg"
        },
        63: {
            text: "Lluvia",
            icon: "rain.svg"
        },
        65: {
            text: "Lluvia intensa",
            icon: "rain.svg"
        },
        66: {
            text: "Lluvia helada",
            icon: "rain.svg"
        },
        67: {
            text: "Lluvia helada intensa",
            icon: "rain.svg"
        },
        71: {
            text: "Nevada ligera",
            icon: "snow.svg"
        },
        73: {
            text: "Nevada",
            icon: "snow.svg"
        },
        75: {
            text: "Nevada intensa",
            icon: "snow.svg"
        },
        77: {
            text: "Granizo",
            icon: "hail.svg"
        },
        80: {
            text: "Chubascos ligeros",
            icon: "showers.svg"
        },
        81: {
            text: "Chubascos",
            icon: "showers.svg"
        },
        82: {
            text: "Chubascos intensos",
            icon: "showers.svg"
        },
        85: {
            text: "Nevadas",
            icon: "snow.svg"
        },
        86: {
            text: "Nevadas intensas",
            icon: "snow.svg"
        },
        95: {
            text: "Tormenta",
            icon: "storm.svg"
        },
        96: {
            text: "Tormenta con granizo",
            icon: "storm.svg"
        },
        99: {
            text: "Tormenta severa",
            icon: "storm.svg"
        }
    },
    get(code) {
        return this.codes[code] || {
            text: "Desconocido",
            icon: "unknown.svg"
        };
    }
};