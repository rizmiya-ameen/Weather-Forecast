import React from "react";

const cities = ['Colombo', 'London', 'New York', 'Sydney', 'Tokyo'];

const TopButtons = ({ setLocation }) => {

  return (
    <nav className="flex flex-row flex-wrap justify-center gap-2 sm:justify-around">

      {cities.map(city => (
        <button
          key={city}
          onClick={() => setLocation({ q: city })}
          className="rounded-full px-3 py-1 text-sm sm:text-base font-medium hover:bg-white/15 transition"
        >
          {city}
        </button>
      ))}

    </nav>
  )
}

export default TopButtons
