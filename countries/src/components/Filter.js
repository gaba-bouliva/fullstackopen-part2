
const Filter = ({countriesLoaded, filter, handleFilter}) => { 
  if (countriesLoaded) return 'Loading...'
  return  <div>find countries <input value={filter} onChange={handleFilter} /></div>
}

export default Filter