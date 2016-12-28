import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherList extends Component {
  renderWeather(cityData, index) {
    const name = cityData.city.name;

    return (
      <tr key={index}>
        <td>{name}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    )
  }

  render() {
    return (
      <table className="table table-hover table-striped">
        <thead>
          <tr className="warning">
            <th>City</th>
            <th>Tempreture</th>
            <th>Pressure</th>
            <th>Humidity</th>
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
