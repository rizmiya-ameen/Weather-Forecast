import React, { useEffect, useRef, useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { searchCities } from '../utils'

const cityLabel = (city) => [city.name, city.state, city.country].filter(Boolean).join(', ')

const Inputs = ({ setLocation, units, setUnits }) => {

  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [highlighted, setHighlighted] = useState(-1)
  const [open, setOpen] = useState(false)
  const [locating, setLocating] = useState(false)
  const [geoError, setGeoError] = useState(null)
  const containerRef = useRef(null)

  // Debounced city suggestions from the geocoding API.
  useEffect(() => {
    const query = city.trim()
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const results = await searchCities(query, controller.signal)
        setSuggestions(results)
        setHighlighted(-1)
      } catch (error) {
        if (error.name !== 'AbortError') setSuggestions([])
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [city])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const reset = () => {
    setCity('')
    setSuggestions([])
    setOpen(false)
    setGeoError(null)
  }

  const selectSuggestion = (suggestion) => {
    setLocation({ lat: suggestion.lat, lon: suggestion.lon, label: cityLabel(suggestion) })
    reset()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (highlighted >= 0 && suggestions[highlighted]) {
      selectSuggestion(suggestions[highlighted])
      return
    }
    const query = city.trim()
    if (!query) return
    setLocation({ q: query })
    reset()
  }

  const handleKeyDown = (event) => {
    if (!open || suggestions.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlighted(index => (index + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlighted(index => (index <= 0 ? suggestions.length - 1 : index - 1))
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      setGeoError('Your browser does not support location access.')
      return
    }

    setLocating(true)
    setGeoError(null)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false)
        setLocation({ lat: position.coords.latitude, lon: position.coords.longitude, label: 'Current location' })
      },
      (error) => {
        setLocating(false)
        setGeoError(error.code === error.PERMISSION_DENIED
          ? 'Location access was denied. Allow it in your browser settings to use this feature.'
          : 'Could not determine your location. Please try again.')
      },
      { timeout: 10000, maximumAge: 5 * 60 * 1000 }
    )
  }

  const showSuggestions = open && suggestions.length > 0

  return (
    <div className='my-6'>
      <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>

        <form onSubmit={handleSubmit} className='relative flex-1' ref={containerRef} role='search'>
          <input
            type="text"
            placeholder='Search for a city...'
            aria-label='Search for a city'
            role='combobox'
            aria-autocomplete='list'
            aria-controls='city-suggestions'
            aria-expanded={showSuggestions}
            value={city}
            onChange={event => { setCity(event.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            className='w-full rounded-full bg-white/90 py-2.5 pl-5 pr-12 text-gray-800 shadow-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white'
          />
          <button type='submit' aria-label='Search' className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-600 hover:bg-gray-200 transition'>
            <UilSearch size={20} />
          </button>

          {showSuggestions && (
            <ul id='city-suggestions' className='absolute z-10 mt-2 w-full overflow-hidden rounded-2xl bg-white text-gray-800 shadow-xl' role='listbox'>
              {suggestions.map((suggestion, index) => (
                <li
                  key={`${suggestion.lat},${suggestion.lon}`}
                  role='option'
                  aria-selected={index === highlighted}
                  onMouseDown={(event) => { event.preventDefault(); selectSuggestion(suggestion) }}
                  onMouseEnter={() => setHighlighted(index)}
                  className={`cursor-pointer px-5 py-2.5 text-sm ${index === highlighted ? 'bg-sky-100' : ''}`}
                >
                  <span className='font-medium'>{suggestion.name}</span>
                  <span className='text-gray-500'>{[suggestion.state, suggestion.country].filter(Boolean).map(part => `, ${part}`)}</span>
                </li>
              ))}
            </ul>
          )}
        </form>

        <div className='flex items-center justify-between sm:justify-center gap-3'>
          <button
            onClick={handleLocationClick}
            disabled={locating}
            aria-label='Use my current location'
            title='Use my current location'
            className='rounded-full p-2.5 bg-white/15 hover:bg-white/25 transition disabled:opacity-60'
          >
            <UilLocationPoint size={22} className={locating ? 'animate-pulse' : ''} />
          </button>

          <div className='flex rounded-full bg-white/15 p-1' role='group' aria-label='Temperature units'>
            {[['metric', '°C'], ['imperial', '°F']].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setUnits(value)}
                aria-pressed={units === value}
                className={`rounded-full px-3 py-1 text-sm font-medium transition ${units === value ? 'bg-white text-gray-800' : 'hover:bg-white/20'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {geoError && <p className='mt-2 text-sm text-amber-200' role='alert'>{geoError}</p>}
    </div>
  )
}

export default Inputs
