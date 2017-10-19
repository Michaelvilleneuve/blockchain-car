import { Link } from 'react-router-dom';
import React from 'react';
import './car-item.css';

export const CarItem = (car) => {
  return (
    <div className="box car">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={car.image || 'https://bulma.io/images/placeholders/128x128.png'} alt="" />
          </figure>
        </div>
        <Link to={`/cars/${car.numberplate}`} className="car-detail">
          <div className="media-content">
            <div className="content">
              <strong>{car.brand} {car.model}</strong>
              <br />
              <p>{car.km} km</p>
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
};
