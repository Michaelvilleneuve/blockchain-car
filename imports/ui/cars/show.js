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

  render() {
    if (this.state.pending) return <div className="center">Chargement</div>;
    return (
      <div className="container car-show">
        <h1 className="title is-1">{this.state.brand} {this.state.model}</h1>
        <div className="info">
          <p>Prix</p>
          <p>{this.state.price} €</p>
        </div>
        <div className="info">
          <p>Réparations</p>
          <p>{this.state.repair.map(repair => {})}</p>
        </div>
        <a className="button is-primary">Acheter cette voiture</a>
      </div>
    );
  }
}
