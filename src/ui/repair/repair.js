import React, { Component } from 'react';
import API from '../../api';

import { CarItem } from '../cars/components';
import '../cars/list.css';

export class NewRepair extends Component {
  constructor(props) {
    super(props);
    const carID = this.props.location.pathname.split("/")[2];
    console.log(carID);

    this.state = {
      car: `resource:com.epsi.blockchain.Car#${carID}`,
      description: '',
      repairPrice: 0,
      creating: false,
      created: false
    };
  }

  create() {
    API.post('com.epsi.blockchain.AddRepair', this.state)
      .then((res) => {
        if (res.error) {
          this.setState({ creating: false });
          alert('Can\'t add your reparation.');
        } else {
          this.setState({ created: true });
        }
      })
     .catch(() => this.setState({ creating: false }));
  }

  render() {
    return (
      <div className="container car-container">
        <div className="car-form">
          <h3>Nouvelle réparation</h3>
          <input
            onChange={(description) => this.setState({ description: description.target.value })}
            value={this.state.repair}
            type="textarea"
            placeholder="Description"
            name="repair"
          />
          <input
            onChange={(repairPrice) => this.setState({ repairPrice: repairPrice.target.value })}
            type="number"
            value={this.state.repairPrice}
            placeholder="Prix"
            name="price"
          />€
          <button onClick={this.create.bind(this)}>
            {!this.state.creating ? 'Déclarer la réparation' : 'Création en cours'}
          </button>
        </div>
      </div>
    );
  }
}
