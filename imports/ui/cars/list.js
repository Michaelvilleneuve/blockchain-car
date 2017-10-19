import React, { Component } from 'react';
import API from '/imports/api';

import { CarItem } from './components';
import './list.css';

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
        <div className="container-car">
          {this.state.cars.map(car => <CarItem {...car} />)}
        </div>
        <a href="/new">Ajouter une voiture</a>
      </div>
    );
  }
}
