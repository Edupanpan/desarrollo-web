import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const FormularioLugar = ({ onAgregarLugar, lugar, isEditing, actualizarLugar }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [url_imagen, setUrlImagen] = useState(''); // Cambiado a url_imagen
  const [fecha, setFecha] = useState(''); // Estado para la fecha

  // Cargar datos del lugar si está editando
  useEffect(() => {
    if (isEditing && lugar) {
      setNombre(lugar.nombre);
      setDireccion(lugar.direccion);
      setUrlImagen(lugar.url_imagen); // Cambiado a url_imagen
      setFecha(lugar.fecha_visita); // Cargar la fecha si está editando
    } else {
      // Resetear campos si no está editando
      setNombre('');
      setDireccion('');
      setUrlImagen(''); // Cambiado a url_imagen
      setFecha(''); // Resetear la fecha si no está editando
    }
  }, [lugar, isEditing]);

  const manejarSubmit = (e) => {
    e.preventDefault();

    const nuevoLugar = {
      nombre,
      direccion,
      url_imagen, // Cambiado a url_imagen
      fecha_visita: fecha
    };

    if (isEditing) {
      actualizarLugar({ ...lugar, ...nuevoLugar }); // Actualiza el lugar existente
    } else {
      onAgregarLugar(nuevoLugar); // Agrega un nuevo lugar
    }
  };

  return (
    <Form onSubmit={manejarSubmit}>
      <Form.Group controlId="formNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre del lugar"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formDireccion">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese la dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formImagen">
        <Form.Label>URL de la Imagen</Form.Label>
        <Form.Control
          type="url"
          placeholder="Ingrese la URL de la imagen"
          value={url_imagen} // Cambiado a url_imagen
          onChange={(e) => setUrlImagen(e.target.value)} // Cambiado a setUrlImagen
          required
        />
      </Form.Group>
      <Form.Group controlId="formFecha">
        <Form.Label>Fecha de Visita</Form.Label>
        <Form.Control
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="dark" type="submit">
        {isEditing ? 'Guardar Cambios' : 'Agregar Lugar'}
      </Button>
    </Form>
  );
};

export default FormularioLugar;