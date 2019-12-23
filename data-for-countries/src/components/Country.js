import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Languages from './Languages'

const Country = ({ country }) => {
    const [weathers, setWeathers] = useState(null);
    const hook = () => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=ca7a1bc0c74eb50637cb448f4380acb0&query=${country.capital}`)
            .then(response => {
                setWeathers(response.data);
            })
    }
    useEffect(hook, []);
    
    const showWeather = () => {
        if (weathers) {
            return (
            <div>
                <h2>Weather in {country.capital}</h2>
                <div>
                    <b>Temperature: </b> {weathers.current.temperature} Celcius
                </div>
                <div>
                    <img src={weathers.current.weather_icons} alt={weathers.current.weather_descriptions[0]}></img>
                </div>
                <div>
                    <b>Wind: </b> {weathers.current.wind_speed} kph direction {weathers.current.wind_dir}
                </div>
                

            </div>
            )
        }
        
    }

    return (
        <div>
            <h1>{country.name}</h1>
            capital {country.capital}
            <br></br>
            population {country.population}
            <h3>Languages</h3>
            <Languages languages={country.languages}/>
            <img src={country.flag} width="150" height="150"></img>
            {showWeather()}
        </div>
    )
}

export default Country;