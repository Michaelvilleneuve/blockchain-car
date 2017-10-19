import React, { Component } from 'react';

export class Header extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <strong>Cars</strong>
          </a>
        </div>
        <div className="navbar-menu">
          <a className="navbar-item" href="/cars/new">
            Sell
          </a>
          <a className="navbar-item" href="/">
            Buy
          </a>
          <a className="navbar-item" href="/sells">
            My sells
          </a>
          <a className="navbar-item" href="/purchases">
            My purchases
          </a>
        </div>
      </nav>
    );
  }
}
