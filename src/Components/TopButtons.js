import React from "react";

const TopButtons = ({setLocation}) => {

  const cities = [
    {
      id: 1,
      title: 'Colombo'
    }, {
      id: 2,
      title: 'London'
    },{
      id: 3,
      title: 'New York'
    },{
      id: 4,
      title: 'Sydney'
    },{
      id: 5,
      title: 'Tokyo'
    },
  ]

  return (
    <div className="flex flex-row justify-around">
      
      {cities.map(item => (
        <button 
          onClick={event => setLocation(event.currentTarget.textContent)} 
          key={item.id}
          className="text-white text-lg font-medium"
        >
            {item.title}
          </button>
      ))}

    </div>
  )
}

export default TopButtons