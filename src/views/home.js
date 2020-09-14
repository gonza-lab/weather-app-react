import React, { Component } from 'react';
import getInfoWeatherApi from '../api/api.js';

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      state: 'Laferrerse',
      status: 0,
      current: {},
      hourly: {},
      daily: {},
    };

    this.handleWeater = this.handleWeater.bind(this);
  }

  handleWeater(status, data) {
    let { current, daily, hourly } = data;
    this.setState({
      status,
      current,
      daily,
      hourly,
    });
  }

  getInfoWeather(city) {
    getInfoWeatherApi(city, this.handleWeater);
  }

  componentDidMount() {
    this.getInfoWeather(this.state.state);
  }

  render() {
    return <div>Hola mundo desde react!</div>;
  }
}

export default Home;
