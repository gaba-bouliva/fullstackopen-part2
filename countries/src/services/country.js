import axios from "axios";

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = () => {
  console.log('Fetching all countries...');
  return axios.get(`${baseUrl}/all`).then( respond => respond.data )
}

const getCountry = (name) =>  {
  console.log('Fetching country...');
  return axios.get(`${baseUrl}/name/${name}`).then( respond => respond.data)
}

export default { getAll, getCountry}