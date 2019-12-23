import React, { useState, useEffect } from 'react';
import Country from './components/Country'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newCountries, setNewCountries] = useState('');
  const [show, setShow] = useState(null);

  const hook = () => {
    console.log('effect');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled');
        setCountries(response.data);
      })
  }
  useEffect(hook, []);
  console.log('render', countries.length, 'datas')

  const handleCountryChange = (event) => {
    setNewCountries(event.target.value);
    setShow(null);
  }

  const handleShowChange = (country) => {
    return () => { setShow(country) }
  }

  const displayResults = () => {
    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(newCountries.toLowerCase()))

    if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]}/>
    }
    else if (filteredCountries.length > 10) {
      return <div>Too many matches specify another filter</div>
    } 
    else {
      return filteredCountries.map(country => 
        <div key={country.name}> 
          {country.name} <button onClick={handleShowChange(country)}>Show</button>
        </div>)
    }
  }

  const displayShow = () => {
    if (show) {
      return <Country country={show}/>
    }
    return null;
  }

  return (
    <div>
      find countries <input type="text" value={newCountries} onChange={handleCountryChange} />
      {displayResults()}
      {displayShow()}
    </div>
  )
}

export default App;
