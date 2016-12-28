import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../components/chart';

class WeatherList extends Component {
  renderWeather(cityData, index) {
    const name = cityData.city.name;

    const temps = cityData.list.map(weather => weather.main.temp);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);

    return (
      <tr key={index}>
        <td>{name}</td>
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
            <th>Tempreture (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
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
