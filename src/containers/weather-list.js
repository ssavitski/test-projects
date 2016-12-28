import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../components/chart';
import GoogleMap from '../components/google-map';

class WeatherList extends Component {
  renderWeather(cityData, index) {
    const temps = cityData.list.map(weather => weather.main.temp);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);

    const { lat, lon } = cityData.city.coord;

    return (
      <tr key={index}>
        <td className="google-map-container"><GoogleMap key={index} lat={lat} lon={lon} /></td>
        <td className="align-bottom"><Chart data={temps} color="orange" units="K" /></td>
        <td className="align-bottom"><Chart data={pressures} color="green" units="hPa" /></td>
        <td className="align-bottom"><Chart data={humidities} color="black" units="%" /></td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover table-striped weather-list">
        <thead>
          <tr className="warning">
            <th>City</th>
            <th className="align-bottom">Tempreture (K)</th>
            <th className="align-bottom">Pressure (hPa)</th>
            <th className="align-bottom">Humidity (%)</th>
          </tr>
        </thead>

        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);
