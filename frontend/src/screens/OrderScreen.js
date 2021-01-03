import React, { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

const OrderScreen = ({ match, history }) => {
  useEffect(() => {
    document.title = 'Pedido';
  }, []);

  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/ingresar');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=MXN`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order, userInfo, history]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Pago realizado con éxito',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <div className="text-center">
        <h4>Pedido</h4>
        <h5>{order._id}</h5>
      </div>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-card">
              <h2 className="rounded">Envío</h2>
              <p>
                <strong>Nombre: </strong> {order.user.name}
              </p>
              <p>
                <strong>Correo electrónico: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Dirección:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country},{order.shippingAddress.estado}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Enviado el {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Sin enviar</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className="bg-card">
              <h2 className="text-center">Método de pago</h2>
              <p>
                <strong>Método: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Pagado el {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Sin pagar</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className="bg-card">
              <h2 className="text-center">Artículos del pedido</h2>
              {order.orderItems.length === 0 ? (
                <Message>El pedido no tiene artículos</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index} className="bg-card">
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="rounded">
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-card">
                <h2 className="text-center">Resumen</h2>
              </ListGroup.Item>
              <ListGroup.Item className="bg-card">
                <Row>
                  <Col>Artículos</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="bg-card">
                <Row>
                  <Col>Envío</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="bg-card">
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item className="bg-card">
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                      currency="MXN"
                    />
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item className="bg-card">
                    <Button
                      type="button"
                      className="btn btn-block rounded"
                      onClick={deliverHandler}
                    >
                      Marcar como enviado
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
