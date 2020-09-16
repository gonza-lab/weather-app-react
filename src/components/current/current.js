import React, { Component } from 'react';
import './current.css';

function uppperFirst(string) {
  return string[0].toUpperCase() + string.substring(1);
}

function round(num, decimales = 2) {
  var signo = num >= 0 ? 1 : -1;
  num = num * signo;
  if (decimales === 0) {
    //con 0 decimales
    return signo * Math.round(num);
  }
  // round(x * 10 ^ decimales)
  num = num.toString().split('e');
  num = Math.round(
    +(num[0] + 'e' + (num[1] ? +num[1] + decimales : decimales))
  );
  // x * 10 ^ (-decimales)
  num = num.toString().split('e');
  return signo * (num[0] + 'e' + (num[1] ? +num[1] - decimales : -decimales));
}

class CurrentWeather extends Component {
  render() {
    const { city } = this.props;
    const { temp, weather } = this.props.current;
    const { description, icon } = weather[0];
    return (
      <div className="current-weather">
        <div className="info">
          <p className="where">Tiempo en {city}</p>
          <h2 className="temp">{round(temp, 1)} °C</h2>
          <p className="condition">{uppperFirst(description)}</p>
        </div>
        <div className="icon">
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
        </div>
      </div>
    );
  }
}

export default CurrentWeather;
