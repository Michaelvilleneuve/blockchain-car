import React, { Component } from 'react';
import API from '/imports/api';
import { Redirect } from 'react-router';

export class NewCar extends Component {
  constructor(props) {
    super(props);

    const auth = JSON.parse(localStorage.getItem('auth'));
    const owner = auth.email;

    alert('ALERT')

    this.state = {
      owner: `resource:com.epsi.blockchain.Person#${owner}`,
      numberplate: '',
      brand: '',
      model: '',
      price: 0,
      image: '',
      km: 0,
      creating: false,
      created: false,
    };
  }

  create() {
    API.post('com.epsi.blockchain.Car', this.state)
      .then((res) => {
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
        {this.state.created &&
          <Redirect to={`/car/${this.state.numberplate}`} />
        }
        <div className="car-form">
          <h3>Vendez votre voiture</h3>
          <input
            onChange={(numberplate) => this.setState({ numberplate: numberplate.target.value })}
            value={this.state.numberplate}
            placeholder="Plaque d'imatriculation"
            name="numberplate"
          />

          <input
            onChange={(brand) => this.setState({ brand: brand.target.value })}
            value={this.state.brand}
            placeholder="Marque"
            name="brand"
          />

          <input
            onChange={(model) => this.setState({ model: model.target.value })}
            value={this.state.model}
            placeholder="Modèle"
            name="model"
          />
          <input
            onChange={(price) => this.setState({ price: price.target.value })}
            type="number"
            value={this.state.price}
            placeholder="Prix"
            name="price"
          />€
          <input
            onChange={(km) => this.setState({ km: km.target.value })}
            type="number"
            value={this.state.km}
            placeholder="Km"
            name="km"
          />Km
          <input
            onChange={(image) => this.setState({ image: image.target.value })}
            value={this.state.image}
            placeholder="URl de l'image"
            name="image"
          />

          <button onClick={this.create.bind(this)}>
            {!this.state.creating ? 'Ajouter une voiture' : 'Création en cours'}
          </button>
        </div>
      </div>
    );
  }
}
