import React, { Component } from 'react';
import API from '../../api';

import { CarItem } from '../cars/components';
import '../cars/list.css';

export class PurchasesList extends Component {
  constructor(props) {
    super(props);
    this.state = { cars: [], pending: false };
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('auth'));
    API.get('com.epsi.blockchain.Car')
      .then((res) => {
        console.log(res);
        this.setState({
          cars: res.filter(car => {
            return car.propositionBuyer && car.propositionBuyer === `<resource:com.epsi.blockchain.Person#${user.email}`;
          })
        })
      });
  }

  render() {
    return (
      <div className="container">
        <div className="container-car">
          {this.state.cars.length && <h3 className="title is-h3">My purchases</h3>}
          {this.state.cars.map(car => <CarItem pending {...car} />)}
          {this.state.pending && 'Loading...'}
          {!this.state.pending && this.state.cars.length === 0 &&
            <h3 className="title is-h3 center">No cars purchased</h3>}
        </div>
      </div>
    );
  }
}
