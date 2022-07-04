import axios from 'axios'

const local_data = 'https://gist.githubusercontent.com/386er/84a78c9dd226a9395818/raw/dbed7a575d899876bff063a3590081f40816309e/airports.json';

const data_flights = 'http://api.aviationstack.com/v1/flights?access_key=8c9289b0f290c08ffd40c8ce693f2d90'
//const data_flights = 'http://api.aviationstack.com/v1/flights?access_key=156cf9f4c5c9aec1645ba673161d1e76'


const dados_voos = axios.create("");

export default dados_voos;

export {dados_voos, local_data, data_flights};
