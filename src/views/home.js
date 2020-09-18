import React, { Component } from 'react';

import getInfoWeatherApi from '../api/api.js';

import SearchNav from '../components/searchbar/searchnav.js';
import CurrentWeather from '../components/current/current.js';
import DailyWeather from '../components/daily/daily.js';

import getTimeZone from '../functions/getTimeZone.js';

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
      let { current, daily } = data;

      console.log(data);
      let state, hours;
      if (data !== '404') {
        ({ state, hours } = getTimeZone(current.dt, data.timezone));
      }
      this.setState({
        city,
        status,
        current,
        daily,
        state,
        hours,
        offset: data.timezone,
      });
    });
  }

  render() {
    const { city, current, daily, status, state, offset } = this.state;
    let element;

    if (status === 'searching') {
      element = <div className="feed"><p>Buscando...</p></div>;
    } else if (status === 200) {
      element = (
        <div>
          <CurrentWeather city={city} current={current} />
          <DailyWeather weather={daily} offset={offset} />
        </div>
      );
    } else if (status === 404) {
      element = <div className="feed"><p>404! No encontrado</p></div>;
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
