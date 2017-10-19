import React, { Component } from 'react';
import API from '../../api';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', creating: false };
  }

  login() {
    this.setState({ creating: true });
    API.post('com.epsi.blockchain.Person', this.state)
      .then((res) => {
        if (res.error) {
          this.setState({ creating: false });
          alert('Impossible de vous enregister');
        } else {
          localStorage.setItem('auth', JSON.stringify(res));
          this.props.onLogin();
        }
      })
      .catch(() => this.setState({ creating: false }));
  }

  render() {
    return (
      <div className="container login-container">
        <div className="login-form">
          <h3 className="title is-h3" style={{ marginBottom: 20 }}>Vendez votre voiture</h3>
          <div className="field">
            <input
              onChange={(firstname) => this.setState({ firstname: firstname.target.value })}
              value={this.state.firstname}
              className="input"
              placeholder="Prénom"
              name="firstname"
            />
          </div>
          <div className="field">
            <input
              onChange={(name) => this.setState({ name: name.target.value })}
              value={this.state.name}
              className="input"
              placeholder="Nom"
              name="lastname"
            />
          </div>
          <div className="field">
            <input
              onChange={(email) => this.setState({ email: email.target.value })}
              value={this.state.email}
              className="input"
              autoComplete="new-email"
              placeholder="E-mail"
              type="email"
              name="email"
            />
          </div>
          <div className="field">
            <input
              placeholder="Mot de passe"
              autoComplete="new-password"
              value={this.state.password}
              className="input"
              name="password"
              type="password"
              onChange={(password) => this.setState({ password: password.target.value })}
            />
          </div>
          <button className="button is-primary" onClick={this.login.bind(this)}>
            {!this.state.creating ? 'Créer un compte' : 'Création en cours'}
          </button>
        </div>
      </div>
    );
  }
}
