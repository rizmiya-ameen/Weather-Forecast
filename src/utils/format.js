import { DateTime, FixedOffsetZone } from "luxon";

// OpenWeatherMap gives the city's timezone as an offset from UTC in seconds.
export function toLocalTime(unixSeconds, offsetSeconds) {
  return DateTime.fromSeconds(unixSeconds).setZone(FixedOffsetZone.instance(offsetSeconds / 60));
}

export function formatTemp(value) {
  return `${Math.round(value)}°`;
}

export const UNIT_LABELS = {
  metric: { temp: "°C", wind: "km/h" },
  imperial: { temp: "°F", wind: "mph" },
};

// The API returns m/s for metric and mph for imperial.
export function formatWind(speed, units) {
  const value = units === "metric" ? speed * 3.6 : speed;
  return `${Math.round(value)} ${UNIT_LABELS[units].wind}`;
}

export function formatVisibility(meters, units) {
  if (meters == null) return "—";
  if (units === "imperial") return `${(meters / 1609.34).toFixed(1)} mi`;
  return `${(meters / 1000).toFixed(1)} km`;
}

const COMPASS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

export function windDirection(degrees) {
  return COMPASS[Math.round(degrees / 22.5) % 16];
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function isToday(unixSeconds, offsetSeconds) {
  const now = toLocalTime(Date.now() / 1000, offsetSeconds);
  return toLocalTime(unixSeconds, offsetSeconds).hasSame(now, "day");
}
