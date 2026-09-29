import React from 'react'
import { UilSun, UilSunset, UilCompressArrows, UilEye, UilCloud, UilWind } from '@iconscout/react-unicons'
import { formatVisibility, formatWind, toLocalTime, windDirection } from '../utils/format';

const Highlights = ({ current, units }) => {

  const time = (secs) => toLocalTime(secs, current.timezone).toFormat('hh:mm a')
  const { wind } = current

  const cards = [
    { icon: UilSun, label: 'Sunrise', value: time(current.sys.sunrise) },
    { icon: UilSunset, label: 'Sunset', value: time(current.sys.sunset) },
    {
      icon: UilWind,
      label: 'Wind',
      value: `${formatWind(wind.speed, units)} ${windDirection(wind.deg)}`,
      detail: wind.gust ? `Gusts ${formatWind(wind.gust, units)}` : null,
    },
    { icon: UilCompressArrows, label: 'Pressure', value: `${current.main.pressure} hPa` },
    { icon: UilEye, label: 'Visibility', value: formatVisibility(current.visibility, units) },
    { icon: UilCloud, label: 'Cloud cover', value: `${current.clouds.all}%` },
  ]

  return (
    <section className='mt-6'>
      <h2 className='text-xs font-medium uppercase tracking-wider text-white/70'>Today's highlights</h2>
      <div className='mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3'>
        {cards.map(({ icon: Icon, label, value, detail }) => (
          <div key={label} className='rounded-2xl bg-white/10 p-4 backdrop-blur-sm'>
            <p className='flex items-center gap-1.5 text-xs uppercase tracking-wide text-white/70'>
              <Icon size={16} />{label}
            </p>
            <p className='mt-2 text-lg font-medium'>{value}</p>
            {detail && <p className='text-xs text-white/70'>{detail}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Highlights
