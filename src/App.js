import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './ui/layouts';
import { Login } from './ui/auth';
import { CarList, CarShow, NewCar } from './ui/cars';
import { SellsList } from "./ui/sells";

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
    const hashHistory = ReactRouter.hashHistory;
    return (
      <div>
        <Header />
        <Router history={hashHistory}>
          <Switch>
            <Route exact path="/" component={CarList} />
            <Route path="/cars/new" component={NewCar} />
            <Route path="/cars/:carId" component={CarShow} />
            <Route path="/sells" component={SellsList} />
          </Switch>
        </Router>
      </div>
    );
  }
}
