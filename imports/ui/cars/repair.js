import React, { Component } from 'react';
import API from '/imports/api';


export class CarRepair extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repair: '',
      price: 0,
      car: `resource:com.epsi.blockchain.Person#${this.props.match.params.carId}`,
      numberplate: this.props.match.params.carId,
      creating: false,
      created: false
    };
  }

  create() {
    API.post('com.epsi.blockchain.Car', this.state)
      .then((res) => {
        console.log(this.state);
        if (res.error) {
          this.setState({ creating: false });
          alert('Impossible d\'enregister votre voiture');
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
            onChange={(repair) => this.setState({ repair: repair.target.value })}
            value={this.state.repair}
            type="textarea"
            placeholder="Description"
            name="repair"
          />
          <input
            onChange={(price) => this.setState({ price: price.target.value })}
            type="number"
            value={this.state.price}
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
