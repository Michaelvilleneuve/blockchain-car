import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import API from '../../../api';
import './car-item.css';

export class CarItem extends Component {
  constructor(props) {
    super(props);
    this.state = { done: false, sending: false };
  }
  accept(isAccepted) {
    this.setState({ sending: true });
    API.post('com.epsi.blockchain.HandleProposition', {
      car: `${this.props.numberplate}`,
      status: isAccepted ? 'OK' : 'KO',
      password: this.user.password,
    })
    .then((res) => {
      if (!res.error) {
        alert(isAccepted ? 'Your car has been sold' : 'You have declined the proposition');
        this.setState({ done: true, sending: false });
      } else {
        this.setState({ sending: false });
        alert('Error')
      }
    });
  }

  render() {
    this.user = JSON.parse(localStorage.getItem('auth'));
    return (
      <div className="box car">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={this.props.image || 'https://bulma.io/images/placeholders/128x128.png'} alt="" />
            </figure>
          </div>
          <Link to={`/cars/${this.props.numberplate}`} className="car-detail">
            <div className="media-content">
              <div className="content">
                <strong>{this.props.brand} {this.props.model}</strong>
                <br />
                <p>{this.props.km} km</p>
                {this.props.pending &&
                  <p>Your offer is pending acceptation</p>}
                {this.props.propositionBuyer &&
                  <p>This car received an offer !</p>
                }
              </div>
            </div>
          </Link>
          {!this.state.done && !this.state.sending &&
            <div className="actions">
              {this.props.owner && this.props.owner === `resource:com.epsi.blockchain.Person#${this.user.email}` && this.props.status === 'PENDING' &&
                <button onClick={() => this.accept(true)} className="button is-primary accept-offer">
                  <i className="fa fa-check" />
                </button>}
              {this.props.owner && this.props.owner === `resource:com.epsi.blockchain.Person#${this.user.email}` && this.props.status === 'PENDING' &&
                <button onClick={() => this.accept(false)} className="button is-secondary">
                  <i className="fa fa-close" />
                </button>}
            </div>
          }
          {this.state.sending && <div className="actions">Loading...</div>}
        </article>
      </div>
    );
  }
};
