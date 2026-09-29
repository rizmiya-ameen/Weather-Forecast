import React from 'react'
import { UilRaindropsAlt } from '@iconscout/react-unicons'
import { formatTemp, isToday, toLocalTime } from '../utils/format';
import { iconUrl } from '../utils';

// Only worth showing when rain is reasonably likely.
const RainChance = ({ pop }) => (
  pop >= 0.2
    ? <span className='flex items-center text-xs text-sky-200'><UilRaindropsAlt size={12} />{Math.round(pop * 100)}%</span>
    : <span className='text-xs invisible'>0%</span>
)

function Forecast({ title, variant, items, timezone }) {

  return (
    <section className='mt-6 rounded-2xl bg-white/10 p-4 backdrop-blur-sm'>

      <h2 className='text-xs font-medium uppercase tracking-wider text-white/70'>{title}</h2>
      <hr className='my-3 border-white/20' />

      {variant === 'hourly' ? (
        <div className='flex gap-4 overflow-x-auto pb-1 sm:justify-between'>
          {items.map((item, index) => (
            <div className='flex min-w-[3.5rem] flex-col items-center' key={item.dt}>
              <p className='text-sm font-light'>{index === 0 ? 'Now' : toLocalTime(item.dt, timezone).toFormat('h a')}</p>
              <img src={iconUrl(item.icon)} alt={item.description} title={item.description} className='w-12 h-12' />
              <p className='font-medium'>{formatTemp(item.temp)}</p>
              <RainChance pop={item.pop} />
            </div>
          ))}
        </div>
      ) : (
        <DailyList items={items} timezone={timezone} />
      )}

    </section>
  )
}

function DailyList({ items, timezone }) {
  // Scale each day's range bar against the whole week's range.
  const weekMin = Math.min(...items.map(day => day.min))
  const weekMax = Math.max(...items.map(day => day.max))
  const span = weekMax - weekMin || 1

  return (
    <ul className='divide-y divide-white/10'>
      {items.map((day) => (
        <li key={day.dt} className='grid grid-cols-[4rem_2.5rem_3rem_1fr] sm:grid-cols-[6rem_3rem_4rem_1fr] items-center gap-2 py-1.5'>
          <p className='font-medium'>{isToday(day.dt, timezone) ? 'Today' : toLocalTime(day.dt, timezone).toFormat('ccc')}</p>
          <img src={iconUrl(day.icon)} alt={day.description} title={day.description} className='w-10 h-10' />
          <RainChance pop={day.pop} />
          <div className='flex items-center gap-2 text-sm'>
            <span className='w-9 text-right text-white/70'>{formatTemp(day.min)}</span>
            <div className='relative h-1.5 flex-1 rounded-full bg-white/20'>
              <div
                className='absolute h-full rounded-full bg-gradient-to-r from-sky-300 to-amber-300'
                style={{
                  left: `${((day.min - weekMin) / span) * 100}%`,
                  right: `${((weekMax - day.max) / span) * 100}%`,
                }}
              />
            </div>
            <span className='w-9 font-medium'>{formatTemp(day.max)}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Forecast
