import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const ContactScreen = () => {
  useEffect(() => {
    document.title = 'Contáctanos';
  }, []);

  const history = useHistory();

  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: 'Keycaps - Contacto',
    honeypot: '', // if any value received in this field, form submission will be ignored.
    message: '',
    replyTo: '@', // this will set replyTo of email to email address entered in the form
    accessKey: '0cbf4328-8b1b-4a90-98a8-11bf020b41c1', // get your access key from https://www.staticforms.xyz
  });

  const [response, setResponse] = useState({
    type: '',
    message: '',
  });

  const handleChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await res.json();

      if (json.success) {
        Swal.fire({
          icon: 'success',
          title: 'Su mensaje ha sido enviado',
          text: 'Gracias por ponerse en contacto con nosotros',
        });
      } else {
        setResponse({
          type: 'error',
          message: json.message,
        });
      }
    } catch (e) {
      console.log('An error occurred', e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error, intente de nuevo por favor',
      });
    }
    history.push('/');
  };

  return (
    <>
      <h1 className="text-center  mt-5">¿Tienes alguna pregunta?</h1>

      <h3 className="text-center">Tienes alguna duda, queja o sugerencia</h3>

      <Form
        className="mb-5"
        action="https://api.staticforms.xyz/submit"
        method="post"
        onSubmit={handleSubmit}
      >
        <div
          className={
            response.type === 'success'
              ? 'tile box notification is-primary'
              : 'is-hidden'
          }
        >
          <p>{response.message}</p>
        </div>
        <div
          className={
            response.type === 'error'
              ? 'tile box notification is-danger'
              : 'is-hidden'
          }
        >
          <p>{response.message}</p>
        </div>
        <div
          className={response.message !== '' ? 'is-hidden' : 'columns'}
        ></div>

        <Form.Group>
          <Form.Label>Nombre*</Form.Label>
          <Form.Control
            className="rounded bg-form"
            autoComplete="off"
            placeholder="Escriba su nombre por favor"
            type="text"
            name="name"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Correo electrónico*</Form.Label>
          <Form.Control
            className="rounded bg-form"
            autoComplete="off"
            placeholder="Escriba su correo electrónico por favor"
            type="email"
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Mensaje*</Form.Label>
          <Form.Control
            as="textarea"
            className="rounded bg-form"
            autoComplete="off"
            placeholder="Escriba su mensaje detalladamente por favor"
            type="textarea"
            name="message"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="field" style={{ display: 'none' }}>
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              name="honeypot"
              style={{ display: 'none' }}
              onChange={handleChange}
            />
            <input type="hidden" name="subject" onChange={handleChange} />
          </div>
        </div>
        <p>*Campo obligatorio</p>
        <div className="form-group">
          <Button className="btn-primary btn-block rounded" type="submit">
            Enviar mensaje
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ContactScreen;
