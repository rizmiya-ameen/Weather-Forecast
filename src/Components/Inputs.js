import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'


const Inputs = ({setLocation, setUnits, setSymbol}) => {

  const [city, setCity] = useState('')

  const handleSearchClick = () => {
    setLocation(city);
    setCity('')
  };

  //console.log(city)

  return (
    <div className='flex flex-row justify-center my-6'>

      <div className='flex flex-row items-center justify-center space-x-4 w-3/4'>
        <input 
          type="text" 
          placeholder='search for city...' 
          value={city}
          onChange={event => setCity(event.currentTarget.value)}
          className='text-l font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
        />
        <UilSearch onClick={handleSearchClick} size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" />
        <UilLocationPoint size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" />
      </div>

      <div className='flex flex-row items-center justify-center w-1/4'>
        <button name='metric' className='text-white text-xl font-light' onClick={() => {setSymbol("°C"); setUnits("metric")}}>°C</button>
        <p className='text-white mx-1'>|</p>
        <button name='imperial' className='text-white text-xl font-light' onClick={() => {setSymbol("°F"); setUnits("imperial")}}>°F</button>
      </div>
 
      <div>

      </div>
    </div>
  )
}

export default Inputs

