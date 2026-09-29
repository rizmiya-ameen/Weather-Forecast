import React from 'react';
import { DateTime } from 'luxon';
import { UilRedo } from '@iconscout/react-unicons';
import { toLocalTime } from '../utils/format';

const TimeAndLocation = ({ current, label, updatedAt, isFetching, onRefresh }) => {

  const localTime = toLocalTime(current.dt, current.timezone).toFormat("cccc, dd LLL yyyy' · Local time 'hh:mm a");
  const updated = DateTime.fromMillis(updatedAt).toFormat('hh:mm a');

  return (
    <header className='text-center'>
      <p className='text-3xl sm:text-4xl font-semibold'>{current.name}, {current.sys.country}</p>
      {label && label !== `${current.name}, ${current.sys.country}` && (
        <p className='mt-1 text-sm text-white/70'>{label}</p>
      )}
      <p className='mt-2 font-light text-white/90'>{localTime}</p>

      <button
        onClick={onRefresh}
        disabled={isFetching}
        className='mt-2 inline-flex items-center gap-1 text-xs text-white/60 hover:text-white transition disabled:cursor-default'
      >
        <UilRedo size={14} className={isFetching ? 'animate-spin' : ''} />
        {isFetching ? 'Updating...' : `Updated ${updated}`}
      </button>
    </header>
  );
};

export default TimeAndLocation;
