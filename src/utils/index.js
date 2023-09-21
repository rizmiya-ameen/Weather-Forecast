
import { API_KEY } from "./key";

export async function fetchCity(location, units) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${units}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

//fetch the city
export async function fetchLocation(lat, lon) {
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}



//daily
export async function fetchDaily(lat, lon, units) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=${units}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

//Hourly
export async function fetchHourly(lat, lon, units) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${API_KEY}&units=${units}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


/*
{
  "coord": {
    "lon": 151.2073,
    "lat": -33.8679
  },
  "weather": [
    {
      "id": 802,
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "03n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 303.18,
    "feels_like": 301.45,
    "temp_min": 302.34,
    "temp_max": 303.88,
    "pressure": 1007,
    "humidity": 21
  },
  "visibility": 10000,
  "wind": {
    "speed": 0.89,
    "deg": 244,
    "gust": 3.58
  },
  "clouds": {
    "all": 25
  },
  "dt": 1695198147,
  "sys": {
    "type": 2,
    "id": 2010638,
    "country": "AU",
    "sunrise": 1695152921,
    "sunset": 1695196157
  },
  "timezone": 36000,
  "id": 2147714,
  "name": "Sydney",
  "cod": 200
}
*/


/*
//hourly
{
  "lat": 48.8534,
  "lon": 2.3488,
  "timezone": "Europe/Paris",
  "timezone_offset": 7200,
  "hourly": [
    {
      "dt": 1695200400,
      "temp": 18.78,
      "feels_like": 18.88,
      "pressure": 1009,
      "humidity": 83,
      "dew_point": 15.83,
      "uvi": 1.41,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 5.96,
      "wind_deg": 207,
      "wind_gust": 10.47,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695204000,
      "temp": 19.26,
      "feels_like": 19.25,
      "pressure": 1009,
      "humidity": 77,
      "dew_point": 15.13,
      "uvi": 2.59,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 6.41,
      "wind_deg": 205,
      "wind_gust": 10.52,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695207600,
      "temp": 20.35,
      "feels_like": 20.24,
      "pressure": 1009,
      "humidity": 69,
      "dew_point": 14.48,
      "uvi": 3.32,
      "clouds": 99,
      "visibility": 10000,
      "wind_speed": 6.84,
      "wind_deg": 210,
      "wind_gust": 10.84,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695211200,
      "temp": 21.8,
      "feels_like": 21.63,
      "pressure": 1008,
      "humidity": 61,
      "dew_point": 13.95,
      "uvi": 3.53,
      "clouds": 99,
      "visibility": 10000,
      "wind_speed": 6.88,
      "wind_deg": 214,
      "wind_gust": 11.08,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695214800,
      "temp": 23.52,
      "feels_like": 23.29,
      "pressure": 1007,
      "humidity": 52,
      "dew_point": 13.1,
      "uvi": 3.41,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 6.95,
      "wind_deg": 217,
      "wind_gust": 11.38,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695218400,
      "temp": 25.16,
      "feels_like": 24.88,
      "pressure": 1005,
      "humidity": 44,
      "dew_point": 11.75,
      "uvi": 2.53,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 6.87,
      "wind_deg": 217,
      "wind_gust": 11.78,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695222000,
      "temp": 25.3,
      "feels_like": 25.01,
      "pressure": 1005,
      "humidity": 43,
      "dew_point": 11.76,
      "uvi": 1.51,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 6.4,
      "wind_deg": 213,
      "wind_gust": 11.62,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695225600,
      "temp": 24.95,
      "feels_like": 24.68,
      "pressure": 1004,
      "humidity": 45,
      "dew_point": 12.19,
      "uvi": 0.7,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 5.8,
      "wind_deg": 214,
      "wind_gust": 12.21,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695229200,
      "temp": 24.11,
      "feels_like": 23.83,
      "pressure": 1004,
      "humidity": 48,
      "dew_point": 12.31,
      "uvi": 0.19,
      "clouds": 94,
      "visibility": 10000,
      "wind_speed": 5.57,
      "wind_deg": 211,
      "wind_gust": 12.23,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695232800,
      "temp": 23.07,
      "feels_like": 22.76,
      "pressure": 1004,
      "humidity": 51,
      "dew_point": 12.16,
      "uvi": 0,
      "clouds": 80,
      "visibility": 10000,
      "wind_speed": 5.49,
      "wind_deg": 203,
      "wind_gust": 11.69,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695236400,
      "temp": 22.76,
      "feels_like": 22.42,
      "pressure": 1003,
      "humidity": 51,
      "dew_point": 12.15,
      "uvi": 0,
      "clouds": 35,
      "visibility": 10000,
      "wind_speed": 5.45,
      "wind_deg": 202,
      "wind_gust": 12,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695240000,
      "temp": 22.08,
      "feels_like": 21.78,
      "pressure": 1003,
      "humidity": 55,
      "dew_point": 12.41,
      "uvi": 0,
      "clouds": 26,
      "visibility": 10000,
      "wind_speed": 5.13,
      "wind_deg": 207,
      "wind_gust": 11.87,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695243600,
      "temp": 21.34,
      "feels_like": 21.07,
      "pressure": 1003,
      "humidity": 59,
      "dew_point": 12.78,
      "uvi": 0,
      "clouds": 29,
      "visibility": 10000,
      "wind_speed": 4.7,
      "wind_deg": 201,
      "wind_gust": 12.05,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695247200,
      "temp": 20.64,
      "feels_like": 20.38,
      "pressure": 1002,
      "humidity": 62,
      "dew_point": 12.99,
      "uvi": 0,
      "clouds": 40,
      "visibility": 10000,
      "wind_speed": 4.73,
      "wind_deg": 195,
      "wind_gust": 11.83,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695250800,
      "temp": 20.1,
      "feels_like": 19.84,
      "pressure": 1002,
      "humidity": 64,
      "dew_point": 12.94,
      "uvi": 0,
      "clouds": 51,
      "visibility": 10000,
      "wind_speed": 5.2,
      "wind_deg": 198,
      "wind_gust": 12.76,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695254400,
      "temp": 19.77,
      "feels_like": 19.45,
      "pressure": 1001,
      "humidity": 63,
      "dew_point": 12.39,
      "uvi": 0,
      "clouds": 59,
      "visibility": 10000,
      "wind_speed": 5.71,
      "wind_deg": 199,
      "wind_gust": 13.92,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0.01
    },
    {
      "dt": 1695258000,
      "temp": 19.48,
      "feels_like": 19.13,
      "pressure": 1001,
      "humidity": 63,
      "dew_point": 12.16,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 6.01,
      "wind_deg": 199,
      "wind_gust": 13.79,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
        }
      ],
      "pop": 0.13
    },
    {
      "dt": 1695261600,
      "temp": 19.1,
      "feels_like": 18.82,
      "pressure": 1000,
      "humidity": 67,
      "dew_point": 12.75,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 6.12,
      "wind_deg": 197,
      "wind_gust": 14.48,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
        }
      ],
      "pop": 0.23
    },
    {
      "dt": 1695265200,
      "temp": 18.44,
      "feels_like": 18.3,
      "pressure": 999,
      "humidity": 75,
      "dew_point": 13.66,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 6.07,
      "wind_deg": 199,
      "wind_gust": 15.44,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "pop": 0.6,
      "rain": {
        "1h": 0.32
      }
    },
    {
      "dt": 1695268800,
      "temp": 18.34,
      "feels_like": 18.24,
      "pressure": 999,
      "humidity": 77,
      "dew_point": 14.02,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 5.7,
      "wind_deg": 200,
      "wind_gust": 15.45,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "pop": 0.61,
      "rain": {
        "1h": 0.28
      }
    },
    {
      "dt": 1695272400,
      "temp": 18.3,
      "feels_like": 18.17,
      "pressure": 999,
      "humidity": 76,
      "dew_point": 13.84,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 5.43,
      "wind_deg": 213,
      "wind_gust": 12.02,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "pop": 0.65,
      "rain": {
        "1h": 0.59
      }
    },
    {
      "dt": 1695276000,
      "temp": 17.78,
      "feels_like": 17.7,
      "pressure": 999,
      "humidity": 80,
      "dew_point": 13.97,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.39,
      "wind_deg": 221,
      "wind_gust": 8.98,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "pop": 0.65,
      "rain": {
        "1h": 0.44
      }
    },
    {
      "dt": 1695279600,
      "temp": 17.05,
      "feels_like": 17.03,
      "pressure": 999,
      "humidity": 85,
      "dew_point": 14.21,
      "uvi": 0.01,
      "clouds": 100,
      "visibility": 9503,
      "wind_speed": 2.39,
      "wind_deg": 188,
      "wind_gust": 6.79,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "pop": 0.9,
      "rain": {
        "1h": 0.82
      }
    },
    {
      "dt": 1695283200,
      "temp": 16.78,
      "feels_like": 16.81,
      "pressure": 999,
      "humidity": 88,
      "dew_point": 14.57,
      "uvi": 0.05,
      "clouds": 100,
      "visibility": 6843,
      "wind_speed": 3.92,
      "wind_deg": 171,
      "wind_gust": 12.14,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "pop": 0.92,
      "rain": {
        "1h": 2.08
      }
    },
    {
      "dt": 1695286800,
      "temp": 16.61,
      "feels_like": 16.65,
      "pressure": 998,
      "humidity": 89,
      "dew_point": 14.65,
      "uvi": 0.11,
      "clouds": 100,
      "visibility": 6507,
      "wind_speed": 4.52,
      "wind_deg": 179,
      "wind_gust": 12.1,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "pop": 1,
      "rain": {
        "1h": 2.52
      }
    },
    {
      "dt": 1695290400,
      "temp": 16.63,
      "feels_like": 16.75,
      "pressure": 998,
      "humidity": 92,
      "dew_point": 15.02,
      "uvi": 0.58,
      "clouds": 100,
      "visibility": 4663,
      "wind_speed": 4.39,
      "wind_deg": 215,
      "wind_gust": 9.75,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "pop": 1,
      "rain": {
        "1h": 3.07
      }
    },
    {
      "dt": 1695294000,
      "temp": 16.25,
      "feels_like": 16.23,
      "pressure": 998,
      "humidity": 88,
      "dew_point": 14.08,
      "uvi": 0.74,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 4.51,
      "wind_deg": 264,
      "wind_gust": 9.31,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "pop": 1,
      "rain": {
        "1h": 1.98
      }
    },
    {
      "dt": 1695297600,
      "temp": 15.95,
      "feels_like": 15.79,
      "pressure": 999,
      "humidity": 84,
      "dew_point": 13.07,
      "uvi": 0.79,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 4.55,
      "wind_deg": 242,
      "wind_gust": 8.34,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "pop": 1,
      "rain": {
        "1h": 1.18
      }
    },
    {
      "dt": 1695301200,
      "temp": 15.42,
      "feels_like": 15.16,
      "pressure": 999,
      "humidity": 82,
      "dew_point": 12.08,
      "uvi": 1.76,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.99,
      "wind_deg": 226,
      "wind_gust": 7.31,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "pop": 1,
      "rain": {
        "1h": 0.8
      }
    },
    {
      "dt": 1695304800,
      "temp": 14.83,
      "feels_like": 14.48,
      "pressure": 1000,
      "humidity": 81,
      "dew_point": 11.47,
      "uvi": 1.31,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 4.02,
      "wind_deg": 204,
      "wind_gust": 6.86,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "pop": 1,
      "rain": {
        "1h": 0.43
      }
    },
    {
      "dt": 1695308400,
      "temp": 15.05,
      "feels_like": 14.57,
      "pressure": 999,
      "humidity": 75,
      "dew_point": 10.47,
      "uvi": 0.78,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.75,
      "wind_deg": 228,
      "wind_gust": 6.37,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "pop": 0.78
    },
    {
      "dt": 1695312000,
      "temp": 15.53,
      "feels_like": 15.07,
      "pressure": 999,
      "humidity": 74,
      "dew_point": 10.62,
      "uvi": 0.5,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.77,
      "wind_deg": 221,
      "wind_gust": 7.26,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "pop": 0.85
    },
    {
      "dt": 1695315600,
      "temp": 15.62,
      "feels_like": 15.14,
      "pressure": 1000,
      "humidity": 73,
      "dew_point": 10.59,
      "uvi": 0.14,
      "clouds": 97,
      "visibility": 10000,
      "wind_speed": 3.48,
      "wind_deg": 212,
      "wind_gust": 7.44,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "pop": 0.85
    },
    {
      "dt": 1695319200,
      "temp": 15,
      "feels_like": 14.54,
      "pressure": 1001,
      "humidity": 76,
      "dew_point": 10.54,
      "uvi": 0,
      "clouds": 81,
      "visibility": 10000,
      "wind_speed": 3.5,
      "wind_deg": 200,
      "wind_gust": 8.29,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0.78
    },
    {
      "dt": 1695322800,
      "temp": 14.72,
      "feels_like": 14.34,
      "pressure": 1001,
      "humidity": 80,
      "dew_point": 11.04,
      "uvi": 0,
      "clouds": 6,
      "visibility": 10000,
      "wind_speed": 3.7,
      "wind_deg": 197,
      "wind_gust": 9.21,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "pop": 0.16
    },
    {
      "dt": 1695326400,
      "temp": 14.47,
      "feels_like": 14.11,
      "pressure": 1001,
      "humidity": 82,
      "dew_point": 11.16,
      "uvi": 0,
      "clouds": 25,
      "visibility": 10000,
      "wind_speed": 3.92,
      "wind_deg": 197,
      "wind_gust": 10.34,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
        }
      ],
      "pop": 0.28
    },
    {
      "dt": 1695330000,
      "temp": 14.36,
      "feels_like": 13.99,
      "pressure": 1002,
      "humidity": 82,
      "dew_point": 11.11,
      "uvi": 0,
      "clouds": 45,
      "visibility": 10000,
      "wind_speed": 4.11,
      "wind_deg": 198,
      "wind_gust": 10.42,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
        }
      ],
      "pop": 0.29
    },
    {
      "dt": 1695333600,
      "temp": 14.16,
      "feels_like": 13.8,
      "pressure": 1002,
      "humidity": 83,
      "dew_point": 11.01,
      "uvi": 0,
      "clouds": 58,
      "visibility": 10000,
      "wind_speed": 4.32,
      "wind_deg": 198,
      "wind_gust": 10.55,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0.32
    },
    {
      "dt": 1695337200,
      "temp": 13.8,
      "feels_like": 13.43,
      "pressure": 1002,
      "humidity": 84,
      "dew_point": 10.81,
      "uvi": 0,
      "clouds": 53,
      "visibility": 10000,
      "wind_speed": 4.42,
      "wind_deg": 203,
      "wind_gust": 10.66,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0.32
    },
    {
      "dt": 1695340800,
      "temp": 13.39,
      "feels_like": 13,
      "pressure": 1002,
      "humidity": 85,
      "dew_point": 10.73,
      "uvi": 0,
      "clouds": 47,
      "visibility": 10000,
      "wind_speed": 4.38,
      "wind_deg": 202,
      "wind_gust": 10.57,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
        }
      ],
      "pop": 0.22
    },
    {
      "dt": 1695344400,
      "temp": 13.17,
      "feels_like": 12.79,
      "pressure": 1002,
      "humidity": 86,
      "dew_point": 10.73,
      "uvi": 0,
      "clouds": 80,
      "visibility": 10000,
      "wind_speed": 4.4,
      "wind_deg": 201,
      "wind_gust": 10.46,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0.05
    },
    {
      "dt": 1695348000,
      "temp": 12.98,
      "feels_like": 12.61,
      "pressure": 1001,
      "humidity": 87,
      "dew_point": 10.74,
      "uvi": 0,
      "clouds": 81,
      "visibility": 10000,
      "wind_speed": 4.19,
      "wind_deg": 200,
      "wind_gust": 10.07,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695351600,
      "temp": 12.8,
      "feels_like": 12.43,
      "pressure": 1001,
      "humidity": 88,
      "dew_point": 10.65,
      "uvi": 0,
      "clouds": 63,
      "visibility": 10000,
      "wind_speed": 4.25,
      "wind_deg": 200,
      "wind_gust": 9.89,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695355200,
      "temp": 12.57,
      "feels_like": 12.21,
      "pressure": 1002,
      "humidity": 89,
      "dew_point": 10.62,
      "uvi": 0,
      "clouds": 56,
      "visibility": 10000,
      "wind_speed": 4.37,
      "wind_deg": 201,
      "wind_gust": 9.8,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1695358800,
      "temp": 12.8,
      "feels_like": 12.36,
      "pressure": 1002,
      "humidity": 85,
      "dew_point": 10.18,
      "uvi": 0,
      "clouds": 62,
      "visibility": 10000,
      "wind_speed": 4.65,
      "wind_deg": 203,
      "wind_gust": 9.26,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0.04
    },
    {
      "dt": 1695362400,
      "temp": 12.94,
      "feels_like": 12.54,
      "pressure": 1002,
      "humidity": 86,
      "dew_point": 10.39,
      "uvi": 0,
      "clouds": 68,
      "visibility": 9087,
      "wind_speed": 4.77,
      "wind_deg": 198,
      "wind_gust": 10.37,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "pop": 0.38,
      "rain": {
        "1h": 0.72
      }
    },
    {
      "dt": 1695366000,
      "temp": 13.07,
      "feels_like": 12.73,
      "pressure": 1002,
      "humidity": 88,
      "dew_point": 10.88,
      "uvi": 0.23,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 4.72,
      "wind_deg": 198,
      "wind_gust": 9.72,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "pop": 0.76,
      "rain": {
        "1h": 1.43
      }
    },
    {
      "dt": 1695369600,
      "temp": 13.48,
      "feels_like": 12.97,
      "pressure": 1003,
      "humidity": 80,
      "dew_point": 9.98,
      "uvi": 0.75,
      "clouds": 99,
      "visibility": 10000,
      "wind_speed": 5.54,
      "wind_deg": 216,
      "wind_gust": 9.4,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "pop": 0.75,
      "rain": {
        "1h": 0.3
      }
    }
  ]
}
*/

/*
//daily
{
  "lat": 48.8534,
  "lon": 2.3488,
  "timezone": "Europe/Paris",
  "timezone_offset": 7200,
  "daily": [
    {
      "dt": 1695034800,
      "sunrise": 1695015049,
      "sunset": 1695059951,
      "moonrise": 1695027720,
      "moonset": 1695064020,
      "moon_phase": 0.1,
      "temp": {
        "day": 22.49,
        "min": 17.86,
        "max": 23.32,
        "night": 17.86,
        "eve": 21.31,
        "morn": 18.23
      },
      "feels_like": {
        "day": 22.62,
        "night": 17.27,
        "eve": 21.01,
        "morn": 18.38
      },
      "pressure": 1007,
      "humidity": 70,
      "dew_point": 16.75,
      "wind_speed": 7.75,
      "wind_deg": 237,
      "wind_gust": 15.51,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "clouds": 75,
      "pop": 0.91,
      "rain": 1.45,
      "uvi": 2.49
    },
    {
      "dt": 1695121200,
      "sunrise": 1695101533,
      "sunset": 1695146222,
      "moonrise": 1695118560,
      "moonset": 1695151560,
      "moon_phase": 0.14,
      "temp": {
        "day": 19.99,
        "min": 14.58,
        "max": 22.33,
        "night": 18.98,
        "eve": 21.17,
        "morn": 14.71
      },
      "feels_like": {
        "day": 19.25,
        "night": 18.5,
        "eve": 20.67,
        "morn": 14.19
      },
      "pressure": 1016,
      "humidity": 46,
      "dew_point": 7.88,
      "wind_speed": 5.93,
      "wind_deg": 244,
      "wind_gust": 10.05,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 96,
      "pop": 0.04,
      "uvi": 3.72
    },
    {
      "dt": 1695207600,
      "sunrise": 1695188018,
      "sunset": 1695232493,
      "moonrise": 1695209520,
      "moonset": 1695239460,
      "moon_phase": 0.17,
      "temp": {
        "day": 23.1,
        "min": 15.83,
        "max": 26.61,
        "night": 22.64,
        "eve": 25.65,
        "morn": 16
      },
      "feels_like": {
        "day": 22.67,
        "night": 22.24,
        "eve": 25.37,
        "morn": 15.85
      },
      "pressure": 1009,
      "humidity": 46,
      "dew_point": 10.6,
      "wind_speed": 6.13,
      "wind_deg": 211,
      "wind_gust": 11.75,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
        }
      ],
      "clouds": 75,
      "pop": 0,
      "uvi": 3.86
    },
    {
      "dt": 1695294000,
      "sunrise": 1695274503,
      "sunset": 1695318764,
      "moonrise": 1695300540,
      "moonset": 1695327960,
      "moon_phase": 0.2,
      "temp": {
        "day": 18.49,
        "min": 15.56,
        "max": 21.92,
        "night": 15.56,
        "eve": 16.6,
        "morn": 16.68
      },
      "feels_like": {
        "day": 18.3,
        "night": 15.18,
        "eve": 16.33,
        "morn": 16.68
      },
      "pressure": 999,
      "humidity": 73,
      "dew_point": 13.28,
      "wind_speed": 6.47,
      "wind_deg": 208,
      "wind_gust": 14.3,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "clouds": 100,
      "pop": 1,
      "rain": 10.08,
      "uvi": 1.98
    },
    {
      "dt": 1695380400,
      "sunrise": 1695360987,
      "sunset": 1695405035,
      "moonrise": 1695391260,
      "moonset": 1695417300,
      "moon_phase": 0.25,
      "temp": {
        "day": 19.2,
        "min": 12.47,
        "max": 19.2,
        "night": 12.47,
        "eve": 13.96,
        "morn": 13.01
      },
      "feels_like": {
        "day": 18.25,
        "night": 11.57,
        "eve": 13.42,
        "morn": 12.59
      },
      "pressure": 1005,
      "humidity": 41,
      "dew_point": 5.49,
      "wind_speed": 5.89,
      "wind_deg": 252,
      "wind_gust": 10.07,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": 47,
      "pop": 1,
      "rain": 2.19,
      "uvi": 2.13
    },
    {
      "dt": 1695466800,
      "sunrise": 1695447472,
      "sunset": 1695491306,
      "moonrise": 1695481320,
      "moonset": 0,
      "moon_phase": 0.27,
      "temp": {
        "day": 18.22,
        "min": 10.92,
        "max": 18.26,
        "night": 15.21,
        "eve": 17.36,
        "morn": 10.92
      },
      "feels_like": {
        "day": 17.17,
        "night": 14.12,
        "eve": 16.3,
        "morn": 10.08
      },
      "pressure": 1019,
      "humidity": 41,
      "dew_point": 4.61,
      "wind_speed": 4.21,
      "wind_deg": 230,
      "wind_gust": 9.89,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
        }
      ],
      "clouds": 54,
      "pop": 0,
      "uvi": 3
    },
    {
      "dt": 1695553200,
      "sunrise": 1695533957,
      "sunset": 1695577578,
      "moonrise": 1695570600,
      "moonset": 1695507540,
      "moon_phase": 0.31,
      "temp": {
        "day": 22.21,
        "min": 13,
        "max": 23.44,
        "night": 19.45,
        "eve": 21.34,
        "morn": 13
      },
      "feels_like": {
        "day": 21.56,
        "night": 19.12,
        "eve": 21.02,
        "morn": 11.97
      },
      "pressure": 1022,
      "humidity": 41,
      "dew_point": 8.38,
      "wind_speed": 5.13,
      "wind_deg": 212,
      "wind_gust": 10.59,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
        }
      ],
      "clouds": 51,
      "pop": 0,
      "uvi": 3
    },
    {
      "dt": 1695639600,
      "sunrise": 1695620443,
      "sunset": 1695663849,
      "moonrise": 1695659100,
      "moonset": 1695598740,
      "moon_phase": 0.35,
      "temp": {
        "day": 23.75,
        "min": 17.28,
        "max": 25.79,
        "night": 20.37,
        "eve": 22.98,
        "morn": 18.25
      },
      "feels_like": {
        "day": 23.77,
        "night": 20.37,
        "eve": 22.93,
        "morn": 18.06
      },
      "pressure": 1026,
      "humidity": 61,
      "dew_point": 15.72,
      "wind_speed": 3.91,
      "wind_deg": 226,
      "wind_gust": 10.38,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": 82,
      "pop": 0.3,
      "rain": 0.16,
      "uvi": 3
    }
  ]
}
*/



