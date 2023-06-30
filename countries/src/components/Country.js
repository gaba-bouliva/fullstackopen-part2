import weatherService from '../services/weather'

import { useEffect, useState } from 'react';

const Country = ({country}) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const lat = country.latlng[0]
    const lon = country.latlng[1]
    console.log('country lat and lng: ', lat , lon);
    const request = weatherService.getWeather(lat, lon);
    request.then( response => setWeather(response))
  }, [])

  let countryKeys = Object.keys(country.languages);
  let flagKeys = Object.keys(country.flags)
  let languages = []
  let flags = []
  
    countryKeys.forEach(key => {
    let value = country.languages[key];
      languages.push(value)
      });

    flagKeys.forEach( key => {
      let value = country.flags[key];
      flags.push(value)
    })
   
  return (
    
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital.join(' ')}</div>
      <div>area {country.area}</div>

      <h3>Languages</h3>
        <ul>
          {languages.map((lang, index) => <li key={index}>{lang}</li>)}
        </ul>
      
      <p>
        <img src={flags[1]} alt={flags[1]} style={{'width': '200px'}}/>
      </p>
     
      <h2>Weather in {country.capital[0]}</h2>
      {weather ?  <p>temperature {weather.main.temp}</p>: ''}
      <p>
        { weather ? weather.weather.map( weather => 
          <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
          /> ) : ''
        }
      </p>
      
       { weather ? <p>wind {weather.wind.speed} m/s</p>: ''} 
    </div>
  )
}

export default Country