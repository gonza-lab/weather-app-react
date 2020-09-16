import React, { Component } from 'react';
import getInfoWeatherApi from '../api/api.js';
import SearchNav from '../components/searchbar/searchnav.js';
import CurrentWeather from '../components/current/current.js';

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      city: 'Laferrere',
      status: 0,
      current: {},
      hourly: {},
      daily: {},
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
      this.setState({
        city,
        status,
        current,
        daily,
        hourly,
      });
    });
  }

  render() {
    const { city, current } = this.state;
    return (
      <div>
        <SearchNav onSearch={this.getInfoWeather} />
        <main>
          <div className="sep"></div>
          {this.state.status !== 404 ? (
            <CurrentWeather city={city} current={current} />
          ) : (
            '404'
          )}
        </main>
      </div>
    );
  }
}

export default Home;
