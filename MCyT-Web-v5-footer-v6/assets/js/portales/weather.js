/* Referencia meteorológica por localidad. Datos de modelos de Open-Meteo. */
(() => {
  'use strict';
  const widget = document.querySelector('[data-weather-city]');
  if (!widget) return;
  const set = (id, text) => {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
  };
  const condition = (code) => {
    if (code === 0) return '☀️ Despejado';
    if (code <= 3) return '☁️ Parcialmente nublado o nublado';
    if (code === 45 || code === 48) return '🌫️ Niebla';
    if (code >= 51 && code <= 57) return '🌦️ Llovizna';
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return '🌧️ Lluvia';
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return '❄️ Nieve';
    if (code >= 95 && code <= 99) return '⛈️ Tormenta';
    return 'Condición no disponible';
  };
  const time = (seconds) => new Intl.DateTimeFormat('es-AR', {
    timeZone:'America/Argentina/Buenos_Aires',hour:'2-digit',minute:'2-digit',hourCycle:'h23',
  }).format(new Date(seconds * 1000));
  const forecast = document.getElementById('forecast');
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);
  const parameters = new URLSearchParams({
    latitude:widget.dataset.weatherLatitude,
    longitude:widget.dataset.weatherLongitude,
    current:'temperature_2m,weather_code,wind_speed_10m',
    hourly:'temperature_2m,weather_code',
    temperature_unit:'celsius',wind_speed_unit:'kmh',
    timeformat:'unixtime',timezone:'America/Argentina/Buenos_Aires',forecast_hours:'16',
  });
  set('cityoutput', 'Referencia: ' + widget.dataset.weatherCity + ', Corrientes');
  widget.setAttribute('aria-busy', 'true');
  fetch('https://api.open-meteo.com/v1/forecast?' + parameters, {signal:controller.signal})
    .then((response) => {
      if (!response.ok) throw new Error('Servicio no disponible');
      return response.json();
    })
    .then((data) => {
      const current = data.current;
      if (!current || !Number.isFinite(current.temperature_2m) || !Number.isFinite(current.wind_speed_10m) || !Number.isFinite(current.time) || !Number.isFinite(current.weather_code)) {
        throw new Error('Respuesta incompleta');
      }
      const temperature = Math.round(current.temperature_2m) + ' °C';
      set('temp', 'Temperatura: ' + temperature);
      set('temptwo', temperature);
      set('description', condition(current.weather_code));
      set('wind', 'Viento: ' + Math.round(current.wind_speed_10m) + ' km/h');
      set('weather-status', 'Estimación del modelo · ' + time(current.time) + ' h, hora argentina.');
      if (forecast) {
        forecast.replaceChildren();
        const hourly = data.hourly;
        if (Array.isArray(hourly?.time)) {
          let added = 0;
          hourly.time.forEach((timestamp, index) => {
            if (added >= 5 || timestamp <= current.time || !Number.isFinite(timestamp) || !Number.isFinite(hourly.temperature_2m?.[index]) || !Number.isFinite(hourly.weather_code?.[index])) return;
            const item = document.createElement('div');
            item.className = 'forecast-item';
            [time(timestamp) + ' h', condition(hourly.weather_code[index]), Math.round(hourly.temperature_2m[index]) + ' °C'].forEach((text) => {
              const line = document.createElement('p');
              line.textContent = text; item.append(line);
            });
            forecast.append(item); added++;
          });
        }
        if (!forecast.children.length) forecast.textContent = 'Pronóstico por hora no disponible.';
      }
    })
    .catch(() => {
      set('temp', 'Temperatura no disponible.');
      set('temptwo', '—');
      set('description', 'El servicio meteorológico no respondió.');
      set('wind', '');
      set('weather-status', 'Podés continuar recorriendo el portal.');
      if (forecast) forecast.textContent = '';
    })
    .finally(() => {
      window.clearTimeout(timeout); widget.removeAttribute('aria-busy');
    });
})();
