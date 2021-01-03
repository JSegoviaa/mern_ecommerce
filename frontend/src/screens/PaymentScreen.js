import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
  useEffect(() => {
    document.title = 'Método de pago';
  }, []);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push('/envio');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/finalizar-pedido');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-center">Método de pago</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Seleccione método de pago</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Tarjeta de crédito/débito"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>

        <Button className="rounded btn-block" type="submit" variant="primary">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
