import React, { Component } from 'react';
import API from '/imports/api';

export class CarList extends Component {
  constructor(props) {
    super(props);
    this.state = { cars: [] };
  }
  componentWillMount() {
    API.get('com.epsi.blockchain.Car')
      .then((res) => {
        console.log(res);
        this.setState({ cars: res });
      });
  }

  render() {
    return (
      <div className="container login-container">
        Les voitures !
        <ul>
          {this.state.cars.map(car => (<li> {car.brand} {car.model} : {car.km} kms</li>))}
        </ul>
      </div>
    );
  }
}
