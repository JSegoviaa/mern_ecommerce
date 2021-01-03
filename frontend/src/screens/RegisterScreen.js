import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  useEffect(() => {
    document.title = 'Crear cuenta';
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center">Registrarse</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            className="rounded bg-form"
            type="name"
            placeholder="Escriba su nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            className="rounded bg-form"
            type="email"
            placeholder="Escriba su correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            className="rounded bg-form"
            type="password"
            placeholder="Escriba su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            className="rounded bg-form"
            type="password"
            placeholder="Confirme su contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="rounded btn-block" type="submit" variant="primary">
          Registrarse
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          ¿Ya tienes una cuenta?{' '}
          <Link to={redirect ? `/ingresar?redirect=${redirect}` : '/ingresar'}>
            Inicia sesión
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
