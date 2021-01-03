import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Images from '../components/Images';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview, product._id]);

  const addToCartHandler = () => {
    history.push(`/carrito/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Su comentario se ha añadido',
      footer: 'Recargue la página para ver su comentario',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      {/* <Link className="btn btn-dark rounded" to="/">
        Inicio
      </Link> */}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />

          <Row className="mt-5">
            <Col md={6}>
              <Images product={product} />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-card">
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item className="bg-card">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="bg-card">
                  Precio: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item className="bg-card">
                  Descripción: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item className="bg-card">
                    <Row>
                      <Col>Precio:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className="bg-card">
                    <Row>
                      <Col>Estado:</Col>
                      <Col>
                        {product.countInStock > 0
                          ? 'Producto en existencia'
                          : 'Producto agotado'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item className="bg-card">
                      <Row>
                        <Col>Cantidad</Col>
                        <Col>
                          <Form.Control
                            className="rounded"
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className="bg-card">
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block rounded"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Añadir al carrito{' '}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Comentarios</h2>
              {product.reviews.length === 0 && (
                <Message>Sin valoraciones</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item className="bg-card" key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="bg-card">
                  <h2>Deja un comentario</h2>

                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Puntuación</Form.Label>
                        <Form.Control
                          className="rounded bg-form"
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Seleccionar</option>
                          <option value="1">1 - Muy malo</option>
                          <option value="2">2 - Malo</option>
                          <option value="3">3 - Bueno</option>
                          <option value="4">4 - Muy bueno</option>
                          <option value="5">5 - Excelente</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control
                          className="rounded bg-form"
                          as="textarea"
                          row="3"
                          value={comment}
                          required
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        disabled={loadingProductReview}
                        className="rounded btn-block"
                        type="submit"
                        variant="primary"
                      >
                        Enviar
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Por favor <Link to="/ingresar">Inicie sesión </Link> para
                      dejar comentarios{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
