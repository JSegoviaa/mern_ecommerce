import React, { useState } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { useSelector, useDispatch } from 'react-redux';
import { payOrder } from '../actions/orderActions';

import Loader from '../components/Loader';
import { useHistory } from 'react-router-dom';

const Paypal = () => {
  const match = useHistory();

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const [sdkReady, setSdkReady] = useState(false);

  const orderId = match.params.id;

  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get('/api/config/paypal');
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  return (
    <>
      {!order.isPaid && (
        <ListGroup.Item>
          {loadingPay && <Loader />}
          {!sdkReady ? (
            <Loader />
          ) : (
            <PayPalButton
              amount={order.totalPrice}
              onSuccess={successPaymentHandler}
            />
          )}
        </ListGroup.Item>
      )}
    </>
  );
};

export default Paypal;
