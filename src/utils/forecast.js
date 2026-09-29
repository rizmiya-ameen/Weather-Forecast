import { toLocalTime } from "./format";

// Next `count` 3-hour slots.
export function getHourly(forecast, count = 8) {
  return forecast.list.slice(0, count).map((item) => ({
    dt: item.dt,
    temp: item.main.temp,
    icon: item.weather[0].icon,
    description: item.weather[0].description,
    pop: item.pop ?? 0,
  }));
}

// Collapse the 3-hour slots into one summary per local calendar day.
export function getDaily(forecast, days = 5) {
  const offset = forecast.city.timezone;
  const byDay = new Map();

  for (const item of forecast.list) {
    const local = toLocalTime(item.dt, offset);
    const key = local.toISODate();
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key).push({ item, hour: local.hour });
  }

  return Array.from(byDay.values())
    .slice(0, days)
    .map((entries) => {
      // Use the slot closest to midday as the day's representative icon.
      const midday = entries.reduce((best, entry) =>
        Math.abs(entry.hour - 12) < Math.abs(best.hour - 12) ? entry : best
      ).item;

      return {
        dt: entries[0].item.dt,
        min: Math.min(...entries.map(({ item }) => item.main.temp_min)),
        max: Math.max(...entries.map(({ item }) => item.main.temp_max)),
        pop: Math.max(...entries.map(({ item }) => item.pop ?? 0)),
        icon: midday.weather[0].icon.replace("n", "d"),
        description: midday.weather[0].description,
      };
    });
}
