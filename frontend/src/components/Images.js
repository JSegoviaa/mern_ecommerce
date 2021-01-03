import React from 'react';
import { Carousel } from 'react-bootstrap';

const Images = ({ product }) => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 h-100"
          src={product.image}
          alt={product.name}
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 h-100"
          src={product.image2}
          alt={product.name}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-100"
          src={product.image3}
          alt={product.name}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Images;
