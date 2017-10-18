import React, { Component } from 'react';
import API from '/imports/api';
import './login.css';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', creating: false };
  }

  login() {
    const { email, password } = this.state;

    this.setState({ creating: true });
    API.post('com.epsi.blockchain.Person', this.state)
      .then((res) => {
        if (res.error) {
          this.setState({ creating: false });
          alert('Impossible de vous enregister');
        } else {
          localStorage.setItem('auth', JSON.stringify({ email, password }));
          this.props.onLogin();
        }
      })
      .catch(() => this.setState({ creating: false }));
  }

  render() {
    return (
      <div className="container login-container">
        <div className="login-form">
          <h3>Vendez votre voiture</h3>
          <input
            onChange={(firstname) => this.setState({ firstname: firstname.target.value })}
            value={this.state.firstname}
            placeholder="Prénom"
            name="firstname"
          />
          <input
            onChange={(name) => this.setState({ name: name.target.value })}
            value={this.state.name}
            placeholder="Nom"
            name="lastname"
          />
          <input
            onChange={(email) => this.setState({ email: email.target.value })}
            value={this.state.email}
            autoComplete="new-email"
            placeholder="E-mail"
            type="email"
            name="email"
          />
          <input
            placeholder="Mot de passe"
            autoComplete="new-password"
            value={this.state.password}
            name="password"
            type="password"
            onChange={(password) => this.setState({ password: password.target.value })}
          />
          <button onClick={this.login.bind(this)}>
            {!this.state.creating ? 'Créer un compte' : 'Création en cours'}
          </button>
        </div>
      </div>
    );
  }
}
