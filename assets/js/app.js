/* ==========================================================
   HitBit Dashboard
   Aplicación principal
   ========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {
        UI.init();

        setupLocationForm();
        setupSettingsButton();
        setupGeolocateButton();

        if (!Location.has()) {
            UI.showLocationForm();
        }
        else {
            startDashboard();
        }
    }
);

// ==========================================================
// Arranca el dashboard (reloj + tiempo) una vez hay ubicación
// ==========================================================
async function startDashboard() {
    try {
        clock.start();
        const data = await weather.load();
        UI.render(data);
        UI.updateCityName(Location.get().city);
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

// ==========================================================
// Gestiona el envío y la cancelación del formulario de ubicación
// ==========================================================
function setupLocationForm() {
    const form = document.getElementById("location-form");
    const cancelBtn = document.getElementById("location-cancel");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const city = document.getElementById("location-city").value.trim();
        const latitude = parseFloat(document.getElementById("location-latitude").value);
        const longitude = parseFloat(document.getElementById("location-longitude").value);

        if (!city || Number.isNaN(latitude) || Number.isNaN(longitude)) {
            UI.showLocationError("Revisa los datos introducidos.");
            return;
        }

        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            UI.showLocationError("Latitud o longitud fuera de rango.");
            return;
        }

        Location.save({ latitude, longitude, city });
        UI.hideLocationForm();
        startDashboard();
    });

    cancelBtn.addEventListener("click", () => {
        UI.hideLocationForm();
        // Si ya había una ubicación guardada, retomamos las
        // actualizaciones periódicas que se pausaron al abrir ajustes.
        if (Location.has()) {
            weather.schedule();
        }
    });
}

// ==========================================================
// Botón de ajustes en el pie: permite cambiar la ubicación
// ==========================================================
function setupSettingsButton() {
    const btn = document.getElementById("settings-btn");

    btn.addEventListener("click", () => {
        weather.stop();
        UI.showLocationForm(Location.get());
    });
}

// ==========================================================
// Botón "usar mi ubicación actual" (GPS del dispositivo)
// ==========================================================
function setupGeolocateButton() {
    const btn = document.getElementById("geolocate-btn");

    btn.addEventListener("click", () => {
        if (!("geolocation" in navigator)) {
            UI.showLocationError("Este navegador no soporta geolocalización.");
            return;
        }

        UI.setGeolocateLoading(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                document.getElementById("location-latitude").value = latitude.toFixed(6);
                document.getElementById("location-longitude").value = longitude.toFixed(6);

                try {
                    const city = await reverseGeocode(latitude, longitude);
                    if (city) {
                        document.getElementById("location-city").value = city;
                    }
                }
                catch (error) {
                    console.error(error);
                    // No se pudo determinar la ciudad automáticamente;
                    // el usuario puede escribirla a mano, lat/long ya están rellenas.
                }
                finally {
                    UI.setGeolocateLoading(false);
                }
            },
            (error) => {
                UI.setGeolocateLoading(false);
                UI.showLocationError(geolocationErrorText(error));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
}

// ==========================================================
// Traduce los códigos de error de la Geolocation API
// ==========================================================
function geolocationErrorText(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            return "Has denegado el permiso de ubicación.";
        case error.POSITION_UNAVAILABLE:
            return "No se pudo determinar tu ubicación.";
        case error.TIMEOUT:
            return "Se agotó el tiempo esperando la ubicación.";
        default:
            return "No se pudo obtener tu ubicación.";
    }
}

// ==========================================================
// Geocodificación inversa (lat/long -> nombre de ciudad)
// Usa el servicio gratuito de OpenStreetMap Nominatim
// ==========================================================
async function reverseGeocode(latitude, longitude) {
    const url =
        "https://nominatim.openstreetmap.org/reverse" +
        `?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;

    console.log("Reverse geocoding:", url);
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("La geocodificación inversa ha fallado");
    }

    const data = await response.json();
    const address = data.address || {};

    const city =
        address.city ||
        address.town ||
        address.village ||
        address.municipality;

    const province = address.province || address.state;

    if (city && province && city !== province) {
        return `${city}, ${province}`;
    }

    return city || province || null;
}
