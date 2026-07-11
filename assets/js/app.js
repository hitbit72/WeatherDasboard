/* ==========================================================
   HitBit Dashboard
   Aplicación principal
   ========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () => {
        try {
            UI.init();
            clock.start();
            const data = await weather.load();
            UI.render(data);
            /* await weather.load(); */
            /* UI.updateCurrent(weather.data.current); */
            /* UI.updateMetrics(weather.data.current, weather.data.daily); */
            /* UI.updateForecast(weather.data.daily); */
            UI.updateStatus("Actualizado " + Utils.now());
            weather.schedule();
            UI.hideLoading();
        }
        catch (error) {
            console.error(error);
            UI.hideLoading();
            UI.updateStatus("Sin conexión");
        }
    }
);

