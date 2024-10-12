import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios'; // Importar axios

const FormularioLugar = ({ onAgregarLugar }) => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [imagen, setImagen] = useState('');
  const [direccion, setDireccion] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const nuevoLugar = {
      nombre,
      fechavisita: fecha,
      imagen,
      direccion,
    };

    try {
      // Realizar la solicitud POST a MockAPI
      const response = await axios.post('https://66fd61c7699369308954fd8e.mockapi.io/lugares/visita', nuevoLugar);
      // Pasar el nuevo lugar al componente padre
      onAgregarLugar(response.data); // Utiliza response.data para obtener el nuevo lugar con el ID generado
    } catch (error) {
      console.error('Error al agregar el lugar:', error);
    }

    // Limpiar el formulario
    setNombre('');
    setFecha('');
    setImagen('');
    setDireccion('');
  };

  return (
    <Form onSubmit={manejarEnvio}>
      <Form.Group controlId="formNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formFecha">
        <Form.Label>Fecha de Visita</Form.Label>
        <Form.Control
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formImagen">
        <Form.Label>URL de la Imagen</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa la URL de la imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formDireccion">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa la dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Agregar Lugar
      </Button>
    </Form>
  );
};

export default FormularioLugar;
