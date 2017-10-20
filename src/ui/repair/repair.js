import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../api';

import { CarItem } from '../cars/components';
import '../cars/list.css';

export class NewRepair extends Component {
  constructor(props) {
    super(props);
    const carID = this.props.match.params.carId;

    this.state = {
      car: `resource:com.epsi.blockchain.Car#${carID}`,
      description: '',
      repairPrice: null,
      creating: false,
      created: false,
      password: JSON.parse(localStorage.getItem('auth')).password
    };
  }

  create() {
    this.setState({ creating: true });
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
          {this.state.created &&
            <Redirect to={`/cars/${this.props.match.params.carId}`} />
          }
          <h3 className="title is-h3">New reparation </h3>
          <div className="field">
            <input
              onChange={(description) => this.setState({ description: description.target.value })}
              value={this.state.repair}
              className="input"
              type="textarea"
              placeholder="Description"
              name="repair"
            />
          </div>
          <div className="field">
            <input
              onChange={(repairPrice) => this.setState({ repairPrice: repairPrice.target.value })}
              type="number"
              className="input"
              value={this.state.repairPrice}
              placeholder="1000 €"
              name="price"
            />
          </div>
          <div className="field">
            <button className="button is-primary" onClick={this.create.bind(this)}>
              {!this.state.creating ? 'Add reparation' : 'creating...'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
