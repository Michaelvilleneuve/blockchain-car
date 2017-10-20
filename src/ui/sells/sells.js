import React, { Component } from 'react';
import API from '../../api';

import { CarItem } from '../cars/components';
import '../cars/list.css';

export class SellsList extends Component {
  constructor(props) {
    super(props);
    this.state = { cars: [], loading: true };
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('auth'));
    API.get('com.epsi.blockchain.Car')
      .then((res) => {
        this.setState({
          cars: res.filter(car => car.owner === `resource:com.epsi.blockchain.Person#${user.email}`),
          loading: false,
        })
      });
  }

  render() {
    return (
      <div className="container">
        <div className="container-car">
          {this.state.cars.length && <h3 className="title is-h3">My sells</h3>}
          {this.state.cars.map(car => <CarItem {...car} />)}
          {this.state.loading && 'Loading...'}
          {!this.state.loading && this.state.cars.length === 0 &&
            <h3 className="title is-h3 center text-center">You have not sold any cars yet</h3>
          }
        </div>
      </div>
    );
  }
}
