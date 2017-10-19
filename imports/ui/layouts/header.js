import React, { Component } from 'react';

export class Header extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <strong>Cars</strong>
          </a>

          <a className="navbar-item" href="/car/new">
            Sell
          </a>
          <a className="navbar-item" href="/">
            Buy
          </a>
        </div>
      </nav>
    );
  }
}
