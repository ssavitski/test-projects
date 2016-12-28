import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchWeather } from '../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    let term = event.target.value;
    console.log(term);

    this.setState({ term });
  }

  onFormSubmit(event) {
    event.preventDefault();

    this.props.fetchWeather(this.state.term);
    this.setState({ term: '' });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <span className="input-group-addon" id="search-icon">
          <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
        </span>

        <input type="text"
               className="form-control"
               placeholder="Get a five-day forecast in your favorite cities"
               aria-describedby="search-icon"
               value={this.state.term}
               onChange={this.onInputChange}
        />

        <div className="input-group-btn">
          <button type="submit" className="btn btn-info">Search</button>
        </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);