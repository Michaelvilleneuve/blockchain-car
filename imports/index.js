import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login } from './ui/auth';
import { CarList, CarShow } from './ui/cars';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pending: true, auth: false };
  }

  componentWillMount() {
    this.login();
  }

  login() {
    this.setState({ auth: localStorage.getItem('auth') });
  }

  render() {
    if (!this.state.auth) return <Login onLogin={this.login.bind(this)} />;
    return (
        <Router>
          <div>
            <Route exact path="/" component={CarList} />
            <Route path="/cars/:carId" component={CarShow} />
          </div>
        </Router>
    );
  }
}
