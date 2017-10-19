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
      repair: '',
      price: 0,
      creating: false,
      created: false
    };
  }

  create() {
    API.post('com.epsi.blockchain.Repair', this.state)
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
      <div className="container">
        <div className="container-car">
          TODO Insérer form + faire lien vers create()
        </div>
      </div>
    );
  }
}
