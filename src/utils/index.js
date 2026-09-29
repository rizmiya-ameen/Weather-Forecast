import { API_KEY } from "./key";

const BASE_URL = "https://api.openweathermap.org";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, params, signal) {
  const query = new URLSearchParams({ ...params, appid: API_KEY }).toString();
  const response = await fetch(`${BASE_URL}${path}?${query}`, { signal });

  if (!response.ok) {
    let message = "Something went wrong while fetching weather data.";
    if (response.status === 404) message = "We couldn't find that location. Check the spelling and try again.";
    if (response.status === 401) message = "The weather service rejected the API key. Check REACT_APP_WEATHER_API_KEY in .env.local.";
    if (response.status === 429) message = "Too many requests. Please wait a moment and try again.";
    throw new ApiError(message, response.status);
  }

  return response.json();
}

// A location is either { q: "City" } or { lat, lon }.
function locationParams(location) {
  return location.q ? { q: location.q } : { lat: location.lat, lon: location.lon };
}

// Current conditions: https://openweathermap.org/current
export function fetchCurrent(location, units, signal) {
  return request("/data/2.5/weather", { ...locationParams(location), units }, signal);
}

// 5 day / 3 hour forecast (free tier): https://openweathermap.org/forecast5
export function fetchForecast(location, units, signal) {
  return request("/data/2.5/forecast", { ...locationParams(location), units }, signal);
}

export async function fetchWeather(location, units, signal) {
  const [current, forecast] = await Promise.all([
    fetchCurrent(location, units, signal),
    fetchForecast(location, units, signal),
  ]);
  return { current, forecast };
}

// City name suggestions: https://openweathermap.org/api/geocoding-api
export function searchCities(query, signal) {
  return request("/geo/1.0/direct", { q: query, limit: 5 }, signal);
}

export function iconUrl(icon, size = "2x") {
  return `https://openweathermap.org/img/wn/${icon}@${size}.png`;
}
