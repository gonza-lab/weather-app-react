import React, { Component } from 'react';
import './searchnav.css';
import search from './buscar.svg';

class SearchNav extends Component {
  constructor(props) {
    super();
    this.state = {
      isWrited: false,
      value: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    this.setState({
      isWrited: !(value === ''),
      value,
    });
  }

  onClick() {
    this.props.onSearch(this.state.value);
  }

  render() {
    const { isWrited } = this.state;
    return (
      <nav>
        <div>
          <img onClick={this.onClick} src={search} />
          <input type="text" onChange={this.onChange} />
          <label className={isWrited ? 'writed' : ''}>Buscar ciudad</label>
        </div>
      </nav>
    );
  }
}

export default SearchNav;
