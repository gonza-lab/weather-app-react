import React, { Component } from 'react';
import getInfoWeatherApi from '../api/api.js';
import SearchNav from '../components/searchbar/searchnav.js';

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

    this.upCity = this.upCity.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.getInfoWeather(this.state.city);
  }

  getInfoWeather(city) {
    this.setState({
      status: 'searching',
    });
    /* getInfoWeatherApi(city, this.handleWeater); */
    getInfoWeatherApi(city, (status, data) => {
      let { current, daily, hourly } = data;
      this.setState({
        status,
        current,
        daily,
        hourly,
      });
    });
  }

  upCity(city) {
    this.setState({
      city,
    });
  }

  onSearch() {
    this.getInfoWeather(this.state.city);
  }

  render() {
    return (
      <main>
        <SearchNav onChange={this.upCity} onSearch={this.onSearch} />
      </main>
    );
  }
}

export default Home;
