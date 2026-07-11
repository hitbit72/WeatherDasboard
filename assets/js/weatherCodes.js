/* ==========================================================
   HitBit Dashboard
   weatherCodes.js
   Traducción de códigos meteorológicos Open-Meteo
   ========================================================== */

const WEATHER_CODES = {
    codes: {
        0: {
            text: "Despejado",
            icon: "clear_day.svg",
            nicon: "clear_night.svg"
            },
        1: {
            text: "Mayormente despejado",
            icon: "mostly_clear_day.svg",
            nicon: "mostly_clear_night.svg"
        },
        2: {
            text: "Parcialmente nublado",
            icon: "partly_cloudy_day.svg",
            nicon: "partly_cloudy_night.svg"
        },
        3: {
            text: "Cubierto",
            icon: "cloudy.svg",
            nicon: "cloudy.svg"
        },
        45: {
            text: "Niebla",
            icon: "fog.svg",
            nicon: "fog.svg"
        },
        48: {
            text: "Niebla con escarcha",
            icon: "fog.svg",
            nicon: "fog.svg"
        },
        51: {
            text: "Llovizna ligera",
            icon: "drizzle.svg",
            nicon: "drizzle.svg"
        },
        53: {
            text: "Llovizna",
            icon: "drizzle.svg",
            nicon: "drizzle.svg"
        },
        55: {
            text: "Llovizna intensa",
            icon: "drizzle.svg",
            nicon: "drizzle.svg"
        },
        56: {
            text: "Llovizna helada",
            icon: "flurries.svg",
            nicon: "flurries.svg"
        },
        57: {
            text: "Llovizna helada fuerte",
            icon: "flurries.svg",
            nicon: "flurries.svg"
        },
        61: {
            text: "Lluvia ligera",
            icon: "drizzle.svg",
            nicon: "drizzle.svg"
        },
        63: {
            text: "Lluvia",
            icon: "rain.svg",
            nicon: "rain_night.svg"
        },
        65: {
            text: "Lluvia intensa",
            icon: "heavy_rain.svg",
            nicon: "rain_night.svg"
        },
        66: {
            text: "Lluvia helada",
            icon: "rain_with_snow.svg",
            nicon: "rain_with_snow.svg"
        },
        67: {
            text: "Lluvia helada intensa",
            icon: "rain_with_snow.svg",
            nicon: "rain_with_snow.svg"
        },
        71: {
            text: "Nevada ligera",
            icon: "flurries.svg",
            nicon: "flurries.svg"
        },
        73: {
            text: "Nevada",
            icon: "snow.svg",
            nicon: "snow.svg"
        },
        75: {
            text: "Nevada intensa",
            icon: "heavy_snow.svg",
            nicon: "heavy_snow.svg"
        },
        77: {
            text: "Granizo",
            icon: "icy.svg",
            nicon: "icy.svg"
        },
        80: {
            text: "Chubascos ligeros",
            icon: "drizzle.svg",
            nicon: "drizzle.svg"
        },
        81: {
            text: "Chubascos",
            icon: "isolated_thunderstorms.svg",
            nicon: "isolated_thunderstorms_night.svg"
        },
        82: {
            text: "Chubascos intensos",
            icon: "isolated_thunderstorms.svg",
            nicon: "isolated_thunderstorms_night.svg"
        },
        85: {
            text: "Nevadas",
            icon: "snow.svg",
            nicon: "snow_night.svg"
        },
        86: {
            text: "Nevadas intensas",
            icon: "heavy_snow.svg",
            nicon: "heavy_snow.svg"
        },
        95: {
            text: "Tormenta",
            icon: "thunderstorms.svg",
            nicon: "thunderstorms_night.svg"
        },
        96: {
            text: "Tormenta con granizo",
            icon: "thunderstorms.svg",
            nicon: "thunderstorms_night.svg"
        },
        99: {
            text: "Tormenta severa",
            icon: "thunderstorms.svg",
            nicon: "thunderstorms_night.svg"
        }
    },
    get(code) {
        return this.codes[code] || {
            text: "Desconocido",
            icon: "unknown.svg"
        };
    }
};