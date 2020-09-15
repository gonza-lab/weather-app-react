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

    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.getInfoWeather(this.state.city);
  }

  getInfoWeather() {
    this.setState({
      status: 'searching',
    });

    getInfoWeatherApi(this.state.city, (status, data) => {
      let { current, daily, hourly } = data;
      this.setState({
        status,
        current,
        daily,
        hourly,
      });
    });
  }

  onSearch(city) {
    this.setState({ city });
    this.getInfoWeather(city);
  }

  render() {
    return (
      <main>
        <SearchNav onSearch={this.onSearch} />
        
      </main>
    );
  }
}

export default Home;
