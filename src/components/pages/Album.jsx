import React, { useState, useEffect } from 'react';
import { Container, Row, Col, DropdownButton, Dropdown, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Album.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TarjetaLugar from '../tarjetalugar';
import FormularioLugar from '../formulariolugar';

const Album = () => {
  const navigate = useNavigate();

  const [lugares, setLugares] = useState([]);

  // Función para obtener los datos de MockAPI
  const obtenerDatos = async () => {
    try {
      const response = await axios.get('https://66fd61c7699369308954fd8e.mockapi.io/lugares/visita');
      setLugares(response.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  useEffect(() => {
    obtenerDatos();
  }, []);

  const [mostrarModal, setMostrarModal] = useState(false); // Estado para controlar el modal
  function handleModal() {//funcion para controlar el modal, cuando se ejecuta cambia el estado de mostrarModal a uno dsitinto al actual
    setMostrarModal(!mostrarModal);
  }

  const agregarLugar = (nuevoLugar) => {
    setLugares((prevLugares) => [...prevLugares, nuevoLugar]);
    setMostrarModal(!mostrarModal); // cierra el modal cambiando a un estado distinto de al actual
  };

  return (
    <Container className="d-flex flex-column vh-100 align-items-center">
      <Row className="m-4 w-100">
        <Col xs={2} className="text-start">
          <DropdownButton id="bg-nested-dropdown" title="Opciones">
            <Dropdown.Item eventKey="1" onClick={() => navigate('/')}>
              Home
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={handleModal}>
              Nuevo
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col className="text-center">
          <h1 className="display-4">Mis Lugares</h1>
        </Col>
        <Col xs={2} className="text-end">
          <p>Eduardo Silva</p>
        </Col>
      </Row>

      {/* Mostrar lugares automáticamente */}
      <Row className="d-flex justify-content-center w-100">
        <Col>
          <TarjetaLugar lugares={lugares} />
        </Col>
      </Row>

      {/* Modal para agregar nuevo lugar */}
      <Modal show={mostrarModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar nuevo lugar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioLugar onAgregarLugar={agregarLugar} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Album;