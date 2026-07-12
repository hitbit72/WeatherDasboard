/* ==========================================================
   HitBit Dashboard
   UI
   ========================================================== */

const UI = {
    elements: {},
    init() {
        this.cacheElements();
    },
    cacheElements() {
        this.elements = {
            cityName : document.getElementById("city-name"),
            temperature : document.getElementById("weather-temperature"),
            description : document.getElementById("weather-description"),
            icon : document.getElementById("weather-icon"),
            metrics : document.getElementById("metrics"),
            forecast : document.getElementById("forecast"),
            status : document.getElementById("dashboard-status"),
            loading : document.getElementById("loading-screen"),
            locationScreen : document.getElementById("location-screen"),
            locationForm : document.getElementById("location-form"),
            locationError : document.getElementById("location-error"),
            locationCancel : document.getElementById("location-cancel"),
            locationCity : document.getElementById("location-city"),
            locationLatitude : document.getElementById("location-latitude"),
            locationLongitude : document.getElementById("location-longitude"),
            settingsBtn : document.getElementById("settings-btn"),
            geolocateBtn : document.getElementById("geolocate-btn")
        };
    },

    render(data){
        console.log("Render...");
        console.log("Data:", data);

        this.updateCurrent(data.current);
        this.updateMetrics(data.current);
        this.updateForecast(data.forecast);
    },

    updateCurrent(current){
        /*
        console.log("Updating current...");
        console.log("Current:", current);
        */
        const iconoWeather = Utils.esDeNoche() ? current.weather.nicon : current.weather.icon;

        this.elements.temperature.textContent =  Utils.formatTemperature(current.temperature);
        this.elements.description.textContent =  current.weather.text;
        this.elements.icon.src = CONFIG.icon_path + CONFIG.icon_type + "/" + iconoWeather;
    },

    updateMetrics(current){
        /*
        console.log("Updating metrics...");
        console.log("Current:", current);
        */

        const metrics = [
            {
                icon: "temp-max.svg",
                label: "Máx",
                /* value: Utils.formatTemperature(daily.temperature_2m_max[0]) */
                value: Utils.formatTemperature(current.max)
            },
            {
                icon: "temp-min.svg",
                label: "Mín",
                value: Utils.formatTemperature(current.min)
            },
            {
                icon: "humidity.svg",
                label: "Humedad",
                value: Utils.formatHumidity(current.humidity)
            },
            {
                icon: "rain.svg",
                label: "Lluvia",
                value: Utils.formatRain(current.rain)
            },
            {
                icon: "wind.svg",
                label: "Viento",
                value: Utils.formatWind(current.wind)
        }
        ];
        this.elements.metrics.innerHTML="";
        metrics.forEach(metric=>{
            this.elements.metrics.appendChild(
                this.createMetricCard(metric)
            );
        });
    },


    createMetricCard(metric){
        /*
        console.log("createMetricCard...");
        console.log("Metric:", metric);
        */
        const card = document.createElement("article");
        card.className="metric";
        card.innerHTML=`
            <!-- <img class="metric-icon" src="assets/icons/ui/${metric.icon}" alt=""> -->
            <div class="metric-label">${metric.label}</div>
            <div class="metric-value">${metric.value}</div>`;
        return card;
    },

    updateForecast(forecast){
        this.elements.forecast.innerHTML="";
        forecast.forEach(day=>{
            this.elements.forecast.appendChild(
                this.createForecastCard(day)
            );
        });
    },

    createForecastCard(day){
        /*
        console.log("createForecastCard...");
        console.log("Day:", day);
        */
        const card=document.createElement("article");
        card.className="forecast-day";
        card.innerHTML=`
            <div class="forecast-name">${day.weekday}</div>
            <img class="forecast-icon" src="${CONFIG.icon_path}${CONFIG.icon_type}/${day.weather.icon}" alt="">
            <div class="forecast-max">${Utils.formatTemperature(day.max)}</div>
            <div class="forecast-min">${Utils.formatTemperature(day.min)}</div>`;
        return card;
    },

    updateStatus(text){
        this.elements.status.textContent=text;
    },

    hideLoading(){
        this.elements.loading.style.opacity=0;
        setTimeout(()=>{this.elements.loading.remove();},500);
    },

    updateCityName(city){
        this.elements.cityName.textContent = city;
    },

    showLocationForm(data){
        if (this.elements.loading) {
            this.elements.loading.remove();
        }

        this.elements.locationError.classList.add("hidden");

        if (data) {
            this.elements.locationCity.value = data.city;
            this.elements.locationLatitude.value = data.latitude;
            this.elements.locationLongitude.value = data.longitude;
            this.elements.locationCancel.classList.remove("hidden");
        }
        else {
            this.elements.locationForm.reset();
            this.elements.locationCancel.classList.add("hidden");
        }

        this.elements.locationScreen.classList.remove("hidden");
    },

    hideLocationForm(){
        this.elements.locationScreen.classList.add("hidden");
    },

    showLocationError(text){
        this.elements.locationError.textContent = text;
        this.elements.locationError.classList.remove("hidden");
    },

    setGeolocateLoading(isLoading){
        this.elements.geolocateBtn.disabled = isLoading;
        this.elements.geolocateBtn.classList.toggle("loading", isLoading);
    }

};