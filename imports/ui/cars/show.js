import React, { Component } from 'react';
import API from '/imports/api';
import './show.css';

export class CarShow extends Component {
  constructor(props) {
    super(props);
    this.state = { pending: true };
  }

  componentWillMount() {
    API.get(`com.epsi.blockchain.Car/${this.props.match.params.carId}`)
      .then((car) => this.setState({ ...car, pending: false }));
  }

  buy() {
    const user = JSON.parse(localStorage.getItem('auth'));

    API.post('com.epsi.blockchain.SellCar', {
      $class: 'com.epsi.blockchain.SellCar',
      car: `resource:com.epsi.blockchain.Car#numberplate:${this.state.numberplate}`,
      seller: this.state.owner,
      buyer: `resource:com.epsi.blockchain.Person#email:${user.email}`,
      price: this.state.price,
      km: this.state.km,
      password: user.password
    })
    .then((res) => {
      if (res.error) {
        alert('Impossible de procéder à la transaction');
      } else {
        alert('Votre demande d\'achat a été acceptée');
      }
    });
  }

  render() {
    if (this.state.pending) return <div className="center">Chargement</div>;
    return (
      <div className="container car-show">
        <img width="200" alt="" src={this.state.image} />
        <br />
        <h1 className="title is-1">{this.state.brand} {this.state.model}</h1>
        <div className="info">
          <p>Prix</p>
          <p>{this.state.price} €</p>
        </div>
        <div className="info">
          <p>Kilomètres</p>
          <p>{this.state.km} €</p>
        </div>
        <div className="info">
          <p>Réparations</p>
          <p>{(this.state.repair || []).map(repair => {})}</p>
        </div>
        <a className="button is-primary" onClick={this.buy.bind(this)}>Acheter cette voiture</a>
      </div>
    );
  }
}
