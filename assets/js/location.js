"use strict";

/* ==========================================================
   HitBit Dashboard
   location.js
   Gestión de la ubicación del usuario (localStorage)
   ========================================================== */

const Location = {

    STORAGE_KEY: "dashboard-location",

    // ======================================================
    // Comprueba si ya existe una ubicación guardada y válida
    // ======================================================
    has() {
        return this.get() !== null;
    },

    // ======================================================
    // Lee la ubicación guardada
    // ======================================================
    get() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (!raw) {
                return null;
            }

            const data = JSON.parse(raw);

            const valid =
                typeof data.latitude === "number" &&
                typeof data.longitude === "number" &&
                !Number.isNaN(data.latitude) &&
                !Number.isNaN(data.longitude) &&
                typeof data.city === "string" &&
                data.city.trim().length > 0;

            return valid ? data : null;
        }
        catch (e) {
            return null;
        }
    },

    // ======================================================
    // Guarda la ubicación (latitude/longitude/city)
    // ======================================================
    save({ latitude, longitude, city }) {
        const data = {
            latitude: Number(latitude),
            longitude: Number(longitude),
            city: String(city).trim()
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        return data;
    },

    // ======================================================
    // Borra la ubicación guardada
    // (útil para un futuro botón "cambiar ubicación")
    // ======================================================
    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
};
