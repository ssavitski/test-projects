import React, { Component } from 'react';

import SearchBar from '../containers/search-bar';
import WeatherList from '../containers/weather-list';

export default class App extends Component {
  render() {
    return (
      <div>
        <h2>Weather forecasts in your city in US</h2>
        <SearchBar />
        <br />
        <WeatherList />
      </div>
    );
  }
}
