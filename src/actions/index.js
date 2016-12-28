import axios from 'axios';

const API_KEY = 'f42a1c6c8cf5db9dd8f894370a8b9c0c';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

const FETCH_WEATHER = 'FETCH_WEATHER';

function weather(city) {
  const url = `ROOT_URL&q=${city},us`;
  const request = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: request,
  }
}

export weather;
export FETCH_WEATHER;