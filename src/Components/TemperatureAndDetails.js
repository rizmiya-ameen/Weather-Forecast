import React from 'react'
import { UilArrowUp, UilArrowDown, UilTemperature, UilTear, UilWind } from '@iconscout/react-unicons'
import { capitalize, formatTemp, formatWind, UNIT_LABELS } from '../utils/format';
import { iconUrl } from '../utils';

const TemperatureAndDetails = ({ current, daily, units }) => {

  const { temp, feels_like, humidity } = current.main
  // Today's range from the forecast is more meaningful than the current observation's min/max.
  const high = Math.max(daily?.max ?? -Infinity, current.main.temp_max)
  const low = Math.min(daily?.min ?? Infinity, current.main.temp_min)

  return (
    <section className='my-6'>

      <p className='text-center text-xl text-cyan-100'>{capitalize(current.weather[0].description)}</p>

      <div className='mt-4 flex flex-col sm:flex-row items-center justify-between gap-4'>

        <img
          src={iconUrl(current.weather[0].icon, '4x')}
          alt={current.weather[0].description}
          className='w-28 h-28 -my-4'
        />

        <div className='text-center'>
          <p className='text-7xl font-extralight'>
            {Math.round(temp)}<span className='align-top text-3xl'>{UNIT_LABELS[units].temp}</span>
          </p>
          <p className='mt-1 flex items-center justify-center gap-3 text-sm'>
            <span className='flex items-center'><UilArrowUp size={16} />H: {formatTemp(high)}</span>
            <span className='flex items-center'><UilArrowDown size={16} />L: {formatTemp(low)}</span>
          </p>
        </div>

        <ul className='flex flex-row sm:flex-col gap-4 sm:gap-2 text-sm font-light'>
          <li className='flex items-center'>
            <UilTemperature size={18} className="mr-1" />
            Feels like <strong className='font-medium ml-1'>{formatTemp(feels_like)}</strong>
          </li>
          <li className='flex items-center'>
            <UilTear size={18} className="mr-1" />
            Humidity <strong className='font-medium ml-1'>{humidity}%</strong>
          </li>
          <li className='flex items-center'>
            <UilWind size={18} className="mr-1" />
            Wind <strong className='font-medium ml-1'>{formatWind(current.wind.speed, units)}</strong>
          </li>
        </ul>
      </div>

    </section>
  )
}

export default TemperatureAndDetails
