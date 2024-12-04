import React, { useState, useEffect } from 'react';
import { Container, Row, Col, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Album.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TarjetaLugar from '../tarjetalugar';
import ModalLugar from '../modal';

const axiosinstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

const Album = () => {
  const navigate = useNavigate(); // hook para navegar entre rutas

  const [lugares, setLugares] = useState([]); // definición de un estado y una función para actualizarlo

  // Función para obtener los datos de la API
  const obtenerDatos = async () => {
    try {
      const response = await axiosinstance.get('places');
      console.log('Respuesta de la API:', response); // Verifica la estructura de la respuesta
      // Ajusta esto según la estructura de la respuesta de tu API
      setLugares(response.data.data || response.data); // Si la respuesta tiene `data` que contiene los lugares
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  // Función para agregar un lugar
  const agregarLugar = async (nuevoLugar) => {
    console.log('Datos enviados a la API:', nuevoLugar); // Verifica los datos que envías
    try {
      const respuesta = await axiosinstance.post('places', nuevoLugar);
      console.log('Respuesta de la API:', respuesta.data); // Verifica la respuesta de la API
      setLugares((prevLugares) => Array.isArray(prevLugares) ? [...prevLugares, respuesta.data] : [respuesta.data]);
      setMostrarModal(false);
    } catch (error) {
      console.error('Error al agregar el lugar:', error);
      console.log('Detalles del error:', error.response.data); // Verifica los detalles del error
    }
  };

  // Función para actualizar un lugar
  const actualizarLugar = async (lugarActualizado) => {
    try {
      const respuesta = await axiosinstance.put(`places/${lugarActualizado.id}`, lugarActualizado);
      setLugares((prevLugares) => Array.isArray(prevLugares) ? prevLugares.map((lugar) => lugar.id === lugarActualizado.id ? respuesta.data : lugar) : []);
      setMostrarModal(false);
    } catch (error) {
      console.error('Error al actualizar el lugar:', error);
    }
  };

  // Función para eliminar un lugar
  const eliminarLugar = async (id) => {
    try {
      await axiosinstance.delete(`places/${id}`);
      setLugares((prevLugares) => prevLugares.filter((lugar) => lugar.id !== id));
    } catch (error) {
      console.error('Error al eliminar el lugar:', error);
    }
  };

  // Estado para el modal
  const [mostrarModal, setMostrarModal] = useState(false);
  function handleModal() {
    setMostrarModal(!mostrarModal);
  }

  // Estado para el lugar seleccionado y modo de edición
  const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const editarLugar = (lugar) => {
    setLugarSeleccionado(lugar);
    setIsEditing(true);
    setMostrarModal(true);
  };

  return (
    <Container className="d-flex flex-column vh-100 align-items-center">
      <Row className="m-4 w-100 d-flex align-items-center justify-content-center">
        <Col xs={2} className="text-start">
          <DropdownButton variant="dark" id="bg-nested-dropdown" title="Opciones">
            <Dropdown.Item eventKey="1" onClick={() => navigate('/')}>
              Home
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              onClick={() => {
                setIsEditing(false);
                setLugarSeleccionado(null);
                handleModal();
              }}
            >
              Nuevo
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => navigate('/Mapa')}>
              Ver Mapa
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
      <Row className="d-flex justify-content-center w-100">
        <Col>
          <TarjetaLugar lugares={lugares} editarLugar={editarLugar} eliminarLugar={eliminarLugar} />
        </Col>
      </Row>
      <ModalLugar
        mostrarModal={mostrarModal}
        handleModal={handleModal}
        agregarLugar={agregarLugar}
        lugar={lugarSeleccionado}
        isEditing={isEditing}
        actualizarLugar={actualizarLugar}
      />
    </Container>
  );
};

export default Album;