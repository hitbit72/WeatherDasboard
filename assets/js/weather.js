"use strict";

/* ==========================================================
   HitBit Dashboard
   weather.js

   Gestión de datos meteorológicos
   ========================================================== */

const weather = {
    // ======================================================
    // Datos actuales del dashboard
    // ======================================================
    data: null,

    // ======================================================
    // Identificador del temporizador
    // ======================================================
    timer: null,

    // ======================================================
    // Devuelve la URL completa de Open-Meteo
    // ======================================================
    buildURL() {
        const location = Location.get();

        const params = new URLSearchParams({
            latitude: location.latitude,
            longitude: location.longitude,
            current: [
                "temperature_2m",
                "relative_humidity_2m",
                "precipitation",
                "weather_code",
                "wind_speed_10m",
                "wind_direction_10m",
                "wind_gusts_10m"
            ].join(","),
            daily: [
                "weather_code",
                "temperature_2m_max",
                "temperature_2m_min",
                "precipitation_sum",
                "wind_speed_10m_max",
                "wind_direction_10m_dominant",
                "uv_index_max"
            ].join(","),
            timezone: "auto",
            forecast_days: 8
        });
        console.log("URL: " + CONFIG.apiURL + "?" + params);
        return CONFIG.apiURL + "?" + params;
    },

    // ======================================================
    // Descarga datos desde Open-Meteo
    // ======================================================
    async fetchWeather() {
        const response = await fetch(this.buildURL(), {
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error(
                "Error descargando información meteorológica."
            );
        }
        return await response.json();
    },

    // ======================================================
    // Guarda datos en cache
    // ======================================================
    saveCache(data) {
        try {
            localStorage.setItem("dashboard-weather", JSON.stringify(data));
        }
        catch (e) {
            console.warn("No se pudo guardar la cache.");
        }
    },

    // ======================================================
    // Lee cache
    // ======================================================
    loadCache() {
        try {
            const cache = localStorage.getItem("dashboard-weather");
            if (!cache) {
                return null;
            }
            return JSON.parse(cache);
        }
        catch (e) {
            return null;
        }
    },

    // ======================================================
    // Descarga datos
    // ======================================================
    async load() {
        try {
            const apiData = await this.fetchWeather();
            this.data = this.transformData(apiData);
            this.saveCache(this.data);
            return this.data;
        }
        catch (error) {
            console.error(error);
            const cache = this.loadCache();
            if (cache) {
                this.data = cache;
                return cache;
            }
            throw error;
        }
    },
	
    // ======================================================
    // Convierte el JSON de Open-Meteo al modelo interno
    // ======================================================
    transformData(api) {
        console.log("transformData...");
        console.log("API:", api);
        
        return {
            updated: new Date(),
            current: {
                temperature: api.current.temperature_2m,
                humidity: api.current.relative_humidity_2m,
                rain: api.current.precipitation,
                wind: api.current.wind_speed_10m,
                windDirection: api.current.wind_direction_10m,
                windGusts: api.current.wind_gusts_10m,
                max: api.daily.temperature_2m_max[0],
                min: api.daily.temperature_2m_min[0],
                weather: WEATHER_CODES.get(api.current.weather_code)
            },
            forecast: this.buildForecast(api)
        };
    },

    // ======================================================
    // Construye el pronóstico semanal
    // ======================================================
    buildForecast(api) {
        const forecast = [];
        for (let i = 1; i <= 7; i++) {
            forecast.push({
                weekday: Utils.weekday(api.daily.time[i]),
                date: api.daily.time[i],
                max: api.daily.temperature_2m_max[i],
                min: api.daily.temperature_2m_min[i],
                rain: api.daily.precipitation_sum[i],
                wind: api.daily.wind_speed_10m_max[i],
                windDirection: api.daily.wind_direction_10m_dominant[i],
                uvIndex: api.daily.uv_index_max[i],
                weather: WEATHER_CODES.get(api.daily.weather_code[i]
                )
            });
        }
        return forecast;
    },

    // ======================================================
    // Fuerza una actualización
    // ======================================================
    async refresh() {
        const data = await this.load();
        UI.render(data);
        UI.updateStatus(
            "Actualizado " + Utils.now()
        );
    },

    // ======================================================
    // Programa la siguiente actualización
    // ======================================================
    schedule() {
        this.stop();
        this.timer = setTimeout(
            async () => {
                await this.refresh();
                this.schedule();
            },
            CONFIG.weatherRefresh
        );
    },

    // ======================================================
    // Detiene las actualizaciones
    // ======================================================
    stop() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    },

    // ======================================================
    // Comprueba si existe conexión
    // ======================================================
    isOnline() {
        return navigator.onLine;
    }
};