import './App.css';
import TopButtons from './Components/TopButtons';
import Inputs from './Components/Inputs';
import TimeAndLocation from './Components/TimeAndLocation';
import TemperatureAndDetails from './Components/TemperatureAndDetails';
import Forecast from './Components/Forecast';
import { useEffect, useState } from 'react';
import { fetchCity, fetchDaily, fetchHourly } from './utils';


function App() {

  const [weatherData, setWeatherData] = useState(null)
  const [dailyWeather, setDailyWeather] = useState(null)
  const [hourlyWeather, setHourlyWeather] = useState(null)
  const [location, setLocation] = useState('Sydney')

  const [units, setUnits] = useState("metric")
  const [symbol, setSymbol] = useState("°C")


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response1 = await fetchCity(location, units);
        setWeatherData(response1)

        const { lat, lon } = response1.coord;

        const response2 = await fetchDaily(lat, lon, units);
        setDailyWeather(response2)

        const response3 = await fetchHourly(lat, lon, units);
        setHourlyWeather(response3)        
        
      } catch (error) {
        console.log("Error fetching weather data: ", error)
      }
    };
  
    fetchWeather();
  }, [location, units]);

  //console.log(location)
  
  let daily, timezone, hourly;

  if (dailyWeather) {
    daily = dailyWeather.daily;
  }

  if (hourlyWeather) {
    hourly = hourlyWeather.hourly;
    timezone = hourlyWeather.timezone;
  }
  

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-24 bg-gradient-to-br blue from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      
        <TopButtons 
          setLocation={setLocation}
        />  

        <Inputs 
          setLocation={setLocation} 
          setUnits={setUnits} 
          setSymbol={setSymbol}
        />

        {weatherData && dailyWeather && hourlyWeather ? (
          <div>
            
            <TimeAndLocation 
              weatherData={weatherData} 
              dailyWeather={dailyWeather}
            />

            <TemperatureAndDetails 
              weatherData={weatherData} 
              dailyWeather={dailyWeather} 
              symbol={symbol}
            />

            <Forecast 
              title="HOURLY FORECAST" 
              foreCast={hourly} 
              timezone={timezone} 
              format={"hh:mm a"} 
              symbol={symbol}
            />

            <Forecast 
              title="DAILY FORECAST" 
              foreCast={daily} 
              timezone={timezone} 
              format={"ccc"} 
              symbol={symbol}
            />

          </div>
          ) : (
            <p>Loading weather data...</p>
          )}
     
    </div>
    
    
  );
}

export default App;

