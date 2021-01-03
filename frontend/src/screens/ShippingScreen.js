import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
  useEffect(() => {
    document.title = 'Envío';
  }, []);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [estado, setEstado] = useState(shippingAddress.estado);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalCode, country, estado })
    );
    history.push('/pago');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className="text-center">Envío</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            className="rounded"
            placeholder="Escriba su dirección"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Código postal</Form.Label>
          <Form.Control
            type="text"
            className="rounded"
            placeholder="Escriba su código postal"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            className="rounded"
            placeholder="Escriba su ciudad"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="estado">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            className="rounded"
            type="text"
            placeholder="Escriba su dirección completa"
            value={estado}
            required
            onChange={(e) => setEstado(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>País</Form.Label>
          <Form.Control
            className="rounded"
            type="text"
            placeholder="Escriba su país"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="rounded btn-block" type="submit" variant="primary">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
