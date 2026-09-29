import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import TopButtons from './Components/TopButtons';
import Inputs from './Components/Inputs';
import TimeAndLocation from './Components/TimeAndLocation';
import TemperatureAndDetails from './Components/TemperatureAndDetails';
import Highlights from './Components/Highlights';
import Forecast from './Components/Forecast';
import StatusMessage from './Components/StatusMessage';
import { fetchWeather } from './utils';
import { getDaily, getHourly } from './utils/forecast';
import { isToday } from './utils/format';
import { backgroundFor } from './utils/theme';
import { loadPrefs, savePrefs } from './utils/storage';

const DEFAULT_LOCATION = { q: 'Sydney' };

function App() {

  const [location, setLocation] = useState(() => loadPrefs().location ?? DEFAULT_LOCATION)
  const [units, setUnits] = useState(() => loadPrefs().units ?? 'metric')

  useEffect(() => {
    savePrefs({ location, units });
  }, [location, units]);

  const { data, error, isLoading, isFetching, isError, isPreviousData, refetch, dataUpdatedAt } = useQuery(
    ['weather', location, units],
    ({ signal }) => fetchWeather(location, units, signal),
    {
      keepPreviousData: true,
      // A missing city or bad key won't fix itself; only retry transient failures.
      retry: (count, err) => ![401, 404].includes(err?.status) && count < 2,
    }
  );

  const current = data?.current;
  const forecast = data?.forecast;
  const daily = forecast ? getDaily(forecast) : [];
  const today = daily.find(day => isToday(day.dt, forecast.city.timezone));

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundFor(current)} transition-colors duration-700`}>
      <main className="mx-auto max-w-screen-md px-4 py-6 sm:px-8 text-white">

        <TopButtons setLocation={setLocation} />

        <Inputs
          setLocation={setLocation}
          units={units}
          setUnits={setUnits}
        />

        {isError && (
          <StatusMessage
            tone="error"
            message={error.message}
            action={error.status === 404 ? null : { label: 'Try again', onClick: () => refetch() }}
          />
        )}

        {isLoading && <StatusMessage tone="loading" message="Loading weather data..." />}

        {current && forecast && (
          <div className={`transition-opacity ${isFetching ? 'opacity-60' : 'opacity-100'}`}>

            <TimeAndLocation
              current={current}
              // Don't pair a new location's label with the previous location's data.
              label={isPreviousData || isError ? undefined : location.label}
              updatedAt={dataUpdatedAt}
              isFetching={isFetching}
              onRefresh={() => refetch()}
            />

            <TemperatureAndDetails current={current} daily={today} units={units} />

            <Forecast
              title="Next 24 hours"
              variant="hourly"
              items={getHourly(forecast)}
              timezone={forecast.city.timezone}
            />

            <Forecast
              title="5-day forecast"
              variant="daily"
              items={daily}
              timezone={forecast.city.timezone}
            />

            <Highlights current={current} units={units} />

          </div>
        )}

        <footer className="mt-10 text-center text-xs text-white/60">
          Weather data by <a href="https://openweathermap.org/" className="underline hover:text-white" target="_blank" rel="noreferrer">OpenWeatherMap</a>
        </footer>

      </main>
    </div>
  );
}

export default App;
