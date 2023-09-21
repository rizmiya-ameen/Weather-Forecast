import React from 'react'
import { DateTime } from "luxon";

function Forecast({ title, foreCast, timezone, format, symbol }) {

  const foreCastData = foreCast.slice(1, 6)


  const formatToLocalTime = (secs) => {
    return DateTime.fromSeconds(secs).setZone(timezone).toFormat(format);
  };

  //console.log(foreCastData)

  return (

    <div>

      <div className='flex items-center justify-start mt-6'>
        <p className='text-white font-medium'>{title}</p>
      </div>

      <hr className='my-2'/>

      
      <div className='flex flex-row items-center justify-between text-white'>

        {foreCastData.map((item) => 

          <div className='flex flex-col items-center justify-center' key={item.dt}>

            <p className='font-light text-sm'>{formatToLocalTime(item.dt)}</p>
            
            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" className='w-12 ml-1'/>

            {item.temp.day ? <p className='font-medium'>{item.temp.day.toFixed()} {symbol}</p> : <p className='font-medium'>{item.temp.toFixed()} {symbol}</p>}
            
          </div>

        )}

      </div>
      
    </div>
  )
}

export default Forecast
