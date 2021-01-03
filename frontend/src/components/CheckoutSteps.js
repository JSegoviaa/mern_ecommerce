import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/ingresar">
            <Nav.Link>Ingresar</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Ingresar</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/envio">
            <Nav.Link>Envío</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Envío</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/pago">
            <Nav.Link>Pago</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Pago</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/finalizar-pedido">
            <Nav.Link>Finalizar pedido</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Finalizar pedido</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
