import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import CountryList from './components/CountryList'

import countryService from './services/country'



const App = () => {

  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const getAllCountries = () => { 
   const request =  countryService.getAll()
   request.then( response => {
    setCountries(response)
    console.log('Countries Fetched!');
   })
   request.catch(error => {
    console.log(error.message);
   })
  }

  useEffect(getAllCountries, [])


  const handleFilter = (event) => {
   
    const newFilter = event.target.value;
    setCountryFilter(newFilter)
    
    if (!newFilter.trim()){
      console.log(`${newFilter} is an invalid`);
      setCountryFilter('')
      setFilteredCountries([])
      return
    }

    const searchedCountries = countries.filter( country => {
      
      if (country.name.common.toLowerCase().includes(newFilter.toLowerCase())) {
        return country.name.common
      }
     })
  
     setFilteredCountries(searchedCountries)

  }

  const handleShowCountry = (country) => { 
    setFilteredCountries([country])
  }


  return (
    <>
    <Filter countriesLoaded={!countries.length} filter={countryFilter} handleFilter={handleFilter}/>
    <CountryList  countries={filteredCountries} showCountry={handleShowCountry}/>
  
    </>
    
  )
}

export default App;
