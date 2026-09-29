import React from 'react'
import { UilExclamationTriangle } from '@iconscout/react-unicons'

const StatusMessage = ({ tone, message, action }) => {

  if (tone === 'loading') {
    return (
      <div className='flex flex-col items-center justify-center py-20 space-y-4' role='status'>
        <div className='h-10 w-10 rounded-full border-4 border-white/30 border-t-white animate-spin' />
        <p className='font-light text-white/80'>{message}</p>
      </div>
    )
  }

  return (
    <div className='my-6 flex flex-col sm:flex-row items-center gap-3 rounded-2xl bg-red-500/20 border border-red-200/30 px-5 py-4' role='alert'>
      <UilExclamationTriangle size={22} className='shrink-0' />
      <p className='flex-1 text-sm'>{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className='rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium hover:bg-white/30 transition'
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export default StatusMessage
