import React, { Component } from 'react';
import getTimeZone from '../../functions/getTimeZone.js';
import './daily.css';
import uppperFirst from '../../functions/upperFirst.js';

class Daily extends Component {
  constructor(props) {
    super(props);
    props.weather.splice(5);

    props.weather.forEach((dayW) => {
      const { day, date, hours } = getTimeZone(dayW.dt, dayW.timezone);
      Object.assign(dayW, { day, date, hours });
    });
  }

  render() {
    return (
      <div className="daily-weater">
        {this.props.weather.map((day) => {
          return (
            <div key={day.dt}>
              <p className="date">{`${day.day} ${day.date}, ${day.hours} hrs`}</p>
              <p className="temp">{day.temp.day} °C</p>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              />
              <p>{uppperFirst(day.weather[0].description)}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Daily;
