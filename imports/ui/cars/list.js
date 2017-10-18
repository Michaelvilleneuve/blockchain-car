import React, { Component } from 'react';
import API from '/imports/api';

import { CarItem } from './components';

export class CarList extends Component {
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
        {this.state.cars.map(car => <CarItem {...car} />)}
      </div>
    );
  }
}
