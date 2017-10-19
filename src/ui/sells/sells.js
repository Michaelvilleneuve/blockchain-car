import React, { Component } from 'react';
import API from '../../api';

import { CarItem } from '../cars/components';
import '../cars/list.css';

export class SellsList extends Component {
  constructor(props) {
    super(props);
    this.state = { cars: [] };
  }

  componentWillMount() {
    API.get('com.epsi.blockchain.Car')
      .then((res) => this.setState({ cars: res }));
  }

  render() {
    return (
      <div className="container">
        <div className="container-car">
          {this.state.cars.map(car => <CarItem {...car} />)}
          {!this.state.cars.length && 'Loading...'}
        </div>
      </div>
    );
  }
}
