import React from 'react'
import { UilArrowUp, UilArrowDown, UilTemperature, UilTear, UilWind, UilSun, UilSunset } from '@iconscout/react-unicons'
import { DateTime } from 'luxon';


const TemperatureAndDetails = ({weatherData, dailyWeather, symbol}) => {

  const sunRise = DateTime.fromSeconds(weatherData.sys.sunrise).setZone(dailyWeather.timezone).toFormat("hh:mm a")
  const sunSet = DateTime.fromSeconds(weatherData.sys.sunset).setZone(dailyWeather.timezone).toFormat("hh:mm a")

  //console.log(weatherData)

  return (

    <div>
      
      <div className='flex items-center justify-center text-xl text-cyan-300 py-6'>
        {weatherData.weather[0].description}
      </div>

      <div className='flex flex-row items-center justify-between text-white py-3'> 

        <img 
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
          alt="" 
          className='w-20'
        />

        <p className='text-5xl'>{weatherData.main.temp.toFixed()} {symbol}</p>

        <div className='flex flex-col space-y-2'>
          
          <div className='flex font-light text-sm items-center justify-center'>
            <UilTemperature size={18} className="mr-1"/>
            Real Feel:
            <strong className='font-medium ml-1'>{weatherData.main.feels_like.toFixed()} {symbol}</strong>
          </div>

          <div className='flex font-light text-sm items-center justify-center'>
            <UilTear size={18} className="mr-1"/>
            Humidity:
            <strong className='font-medium ml-1'>{weatherData.main.humidity} %</strong>
          </div>

          <div className='flex font-light text-sm items-center justify-center'>
            <UilWind size={18} className="mr-1"/>
            Wind:
            <strong className='font-medium ml-1'>{weatherData.wind.speed} km/h</strong>
          </div>
        </div>
      </div>

      <div className='flex flex-row items-center justify-center space-x-2 text-white text-xs py-3'>
          <UilSun />
          <p className='font-light'>Rise: <span className='font-medium ml-1'>{sunRise}</span></p>
          <p className='font-light'>|</p>

          <UilSunset />
          <p className='font-light'>Set: <span className='font-medium ml-1'>{sunSet}</span></p>
          <p className='font-light'>|</p>

          <UilArrowUp />
          <p className='font-light'>High: <span className='font-medium ml-1'>{weatherData.main.temp_max.toFixed()} {symbol}</span></p>
          <p className='font-light'>|</p>

          <UilArrowDown />
          <p className='font-light'>Low: <span className='font-medium ml-1'>{weatherData.main.temp_min.toFixed()} {symbol}</span></p>
      </div>
    </div>
  )
}

export default TemperatureAndDetails