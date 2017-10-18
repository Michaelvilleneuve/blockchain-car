import React, { Component } from 'react';
import './login.css';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }
  login() {
    const { email, password } = this.state;
    localStorage.setItem('auth', JSON.stringify({ email, password }));
    this.props.login();
  }

  render() {
    return (
      <div className="container login-container">
        <div className="login-form">
          <h3>Vendez votre voiture</h3>
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
          <button onClick={this.login.bind(this)}>Créer un compte</button>
        </div>
      </div>
    );
  }
}
