import React, { Component } from 'react';
import API from '../../api';
import { Redirect } from 'react-router';

export class NewCar extends Component {
  constructor(props) {
    super(props);

    const auth = JSON.parse(localStorage.getItem('auth'));
    const owner = auth.email;

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
          <Redirect to={`/cars/${this.state.numberplate}`} />
        }
        <div className="car-form">
          <h3 className="title is-h3">Vendez votre voiture</h3>

          <div className="field">
            <input
              onChange={(numberplate) => this.setState({ numberplate: numberplate.target.value })}
              value={this.state.numberplate}
              className="input"
              placeholder="Plaque d'imatriculation"

              name="numberplate"
            />
          </div>
          <div className="field">
            <input
              onChange={(brand) => this.setState({ brand: brand.target.value })}
              value={this.state.brand}
              className="input"
              placeholder="Marque"
              name="brand"
            />
          </div>
          <div className="field">
            <input
              onChange={(model) => this.setState({ model: model.target.value })}
              value={this.state.model}
              className="input"
              placeholder="Modèle"
              name="model"
            />
          </div>
          <div className="field">
            <input
              onChange={(price) => this.setState({ price: price.target.value })}
              type="number"
              value={this.state.price}
              className="input"
              placeholder="Prix"
              name="price"
            />
          </div>
          <div className="field">
            <input
              onChange={(km) => this.setState({ km: km.target.value })}
              type="number"
              value={this.state.km}
              className="input"
              placeholder="Km"
              name="km"
            />
          </div>
          <div className="field">
            <input
              onChange={(image) => this.setState({ image: image.target.value })}
              value={this.state.image}
              className="input"
              placeholder="URl de l'image"
              name="image"
            />
          </div>

          <button className="button is-primary" onClick={this.create.bind(this)}>
            {!this.state.creating ? 'Ajouter une voiture' : 'Création en cours'}
          </button>
        </div>
      </div>
    );
  }
}
