import React from 'react';
import { DateTime } from 'luxon';

const TimeAndLocation = ({ weatherData, dailyWeather }) => {

  
  //console.log(dailyWeather);

  const formattedTime =  DateTime.fromSeconds(weatherData.dt).setZone(dailyWeather.timezone).toFormat("cccc, dd LLL yyyy' | Local time: 'hh:mm a");
  

  return (
    <div>
      <div className='flex flex-row justify-center items-center my-6'>
        <p className='text-white text-xl font-extralight'>{formattedTime}</p>
      </div>

      <div className='flex flex-row justify-center items-center my-3'>
        <p className='text-white text-3xl font-medium'>{weatherData.name}, {weatherData.sys.country}</p>
      </div>
    </div>
  );
};

export default TimeAndLocation;


