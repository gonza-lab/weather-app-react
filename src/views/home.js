import React, { Component } from 'react';
import getInfoWeatherApi from '../api/api.js';
import SearchNav from '../components/searchbar/searchnav.js';
import CurrentWeather from '../components/current/current.js';
import moment from 'moment';

function getTime(unix, offset) {
  let utcHours = moment.unix(unix)._d.getUTCHours();
  let hours = utcHours + offset / 3600;

  while (hours > 24 || hours < 0) {
    if (hours > 24) {
      hours -= 24;
    } else if (hours < 0) {
      hours += 24;
    }
  }

  if (hours >= 5 && hours <= 12) {
    return { state: 'morning', hours };
  } else if (hours > 12 && hours < 19) {
    return { state: 'day', hours };
  } else if (hours >= 19 && hours < 21) {
    return { state: 'afternoon', hours };
  } else if ((hours >= 21 && hours <= 24) || (hours >= 0 && hours < 5)) {
    return { state: 'night', hours };
  }
}

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      city: 'Laferrere',
      status: 0,
      current: {},
      hourly: {},
      daily: {},
      time: 0,
    };

    this.getInfoWeather = this.getInfoWeather.bind(this);
  }

  componentDidMount() {
    this.getInfoWeather(this.state.city);
  }

  getInfoWeather(city) {
    this.setState({ status: 'searching' });
    getInfoWeatherApi(city, (status, data) => {
      let { current, daily, hourly } = data;
      const { state, hours } = getTime(current.dt, data.timezone_offset);
      this.setState({
        city,
        status,
        current,
        daily,
        hourly,
        state,
        hours,
      });
    });
  }

  render() {
    const { city, current, status, state } = this.state;
    let element;

    if (status === 'searching') {
      element = <div>Buscando</div>;
    } else if (status === 200) {
      element = <CurrentWeather city={city} current={current} />;
    } else if (status === 404) {
      element = <div>No encontrado</div>;
    }
    return (
      <div className={state}>
        <SearchNav onSearch={this.getInfoWeather} />
        <main>
          <div className="sep"></div>
          {element}
        </main>
      </div>
    );
  }
}

export default Home;
