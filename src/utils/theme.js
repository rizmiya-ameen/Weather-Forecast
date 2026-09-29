// Full class strings so Tailwind can find them at build time.
const DAY = {
  Clear: "from-sky-500 to-blue-700",
  Clouds: "from-slate-500 to-slate-700",
  Rain: "from-slate-600 to-blue-900",
  Drizzle: "from-slate-500 to-sky-800",
  Thunderstorm: "from-gray-700 to-indigo-950",
  Snow: "from-sky-300 to-slate-500",
};

const NIGHT = "from-indigo-900 to-slate-950";
const DEFAULT = "from-cyan-700 to-blue-800";

export function backgroundFor(current) {
  if (!current) return DEFAULT;
  const isNight = current.weather[0].icon.endsWith("n");
  if (isNight) return NIGHT;
  return DAY[current.weather[0].main] ?? "from-slate-500 to-gray-700";
}
