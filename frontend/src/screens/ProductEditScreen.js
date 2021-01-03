import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import Swal from 'sweetalert2';

const ProductEditScreen = ({ match, history }) => {
  useEffect(() => {
    document.title = 'Agregar producto';
  }, []);

  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [uploading3, setUploading3] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productos');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setImage2(product.image2);
        setImage3(product.image3);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadFileHandler2 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image2', file);
    setUploading2(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload/2', formData, config);

      setImage2(data);
      setUploading2(false);
    } catch (error) {
      console.error(error);
      setUploading2(false);
    }
  };

  const uploadFileHandler3 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image3', file);
    setUploading3(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload/3', formData, config);

      setImage3(data);
      setUploading3(false);
    } catch (error) {
      console.error(error);
      setUploading3(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        image2,
        image3,
        brand,
        category,
        description,
        countInStock,
      })
    );

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto añadido',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3 rounded">
        Regresar
      </Link>
      <FormContainer>
        <h1 className="text-center">Producto</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                autoComplete="off"
                className="rounded bg-form"
                type="name"
                placeholder="Nombre del producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                className="rounded bg-form"
                placeholder="Precio del producto"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Primera imagen</Form.Label>
              <Form.Control
                type="text"
                className="rounded bg-form"
                placeholder="Seleccione imagen del producto"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Seleccionar archivo"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="image2">
              <Form.Label>Segunda imagen</Form.Label>
              <Form.Control
                type="text"
                className="rounded bg-form"
                placeholder="Seleccione imagen del producto"
                value={image2}
                onChange={(e) => setImage2(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file2"
                label="Seleccionar archivo"
                custom
                onChange={uploadFileHandler2}
              ></Form.File>
              {uploading2 && <Loader />}
            </Form.Group>

            <Form.Group controlId="image3">
              <Form.Label>Tercera imagen</Form.Label>
              <Form.Control
                type="text"
                className="rounded bg-form"
                placeholder="Seleccione imagen del producto"
                value={image3}
                onChange={(e) => setImage3(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file3"
                label="Seleccionar archivo"
                custom
                onChange={uploadFileHandler3}
              ></Form.File>
              {uploading3 && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                autoComplete="off"
                type="text"
                className="rounded bg-form"
                placeholder="Marca del producto"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Existencias</Form.Label>
              <Form.Control
                type="number"
                className="rounded bg-form"
                placeholder="Existencias del producto"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                className="rounded bg-form"
                placeholder="Categoría del producto"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                autoComplete="off"
                className="rounded bg-form"
                placeholder="Descripción del producto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="rounded btn-block"
            >
              Agregar
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
