import React, { Component } from 'react';
import './searchnav.css';
import search from './buscar.svg';

class SearchNav extends Component {
  constructor(props) {
    super();
    this.state = {
      isWrited: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    this.props.onChange(value);
    this.setState({
      isWrited: !(value === ''),
    });
  }

  render() {
    const { isWrited } = this.state;
    return (
      <nav>
        <div>
          <img src={search} onClick={this.props.onSearch}/>
          <input type="text" onChange={this.onChange} />
          <label className={isWrited ? 'writed' : ''}>Buscar ciudad</label>
        </div>
      </nav>
    );
  }
}

export default SearchNav;
