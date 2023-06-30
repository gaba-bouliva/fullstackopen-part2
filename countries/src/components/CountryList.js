import Country from './Country'


const CountryList = ({countries, showCountry}) => { 
  console.log('Country List: ', countries);



  if (!countries.length) return null
  if (countries.length > 10) return 'Too many matches, specify another filter'
  if (countries.length === 1) return <Country country={countries[0]}/>
 return (

  countries.map( (country, index) => <div key={index}>{country.name.common}
  <button onClick={() => { showCountry(country)}}>show</button> </div> )

 )
 
}

export default CountryList