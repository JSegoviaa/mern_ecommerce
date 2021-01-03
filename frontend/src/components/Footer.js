import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark">
      <Container>
        <Row>
          <Col md={4} className="text-center py-4 rounded">
            <ListGroup variant="flush">
              <h6 className="bg-dark">Redes sociales</h6>
              <ListGroup.Item className="bg-dark">
                <i className="fab fa-facebook"> </i> Facebook
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark">
                <i className="fab fa-instagram"></i> Instagram
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4} className="text-center py-4">
            <ListGroup variant="flush">
              <h6 className="bg-dark">Legales</h6>
              <ListGroup.Item className="bg-dark">
                Términos y condiciones
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark">
                Aviso de privacidad
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4} className="text-center py-4">
            <ListGroup variant="flush">
              <h6 className="bg-dark">Compañía</h6>
              <ListGroup.Item className="bg-dark">
                <Link className="link" to="/contacto">
                  Ponte en contacto con nosotros
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark">
                ¿Quiénes somos?
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-2">Copyright &copy; Keycaps</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
