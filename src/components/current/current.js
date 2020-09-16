import React, { Component } from 'react';
import './current.css';

class CurrentWeather extends Component {
  render() {
    const { city } = this.props;
    const { temp, weather } = this.props.current;
    console.log(weather);
    const condition = /* weather ? weather[0].description :  */ '';
    return (
      <div className="current-weather">
        <p className="where">Tiempo en {city}</p>
        <h2 className="temp">{temp} °C</h2>
        <p className="condition">{condition}</p>
      </div>
    );
  }
}

export default CurrentWeather;
