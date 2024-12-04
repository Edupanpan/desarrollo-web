import React, { useState, useEffect } from 'react';
import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import './tarjetalugar.css';

const TarjetaLugar = ({ lugares = [], editarLugar, eliminarLugar }) => {
  
  const [listaLugares, setListaLugares] = useState([]);

  useEffect(() => {
    if (Array.isArray(lugares)) {
      setListaLugares(lugares);
    }
    console.log('Lugares recibidos:', lugares); 
  }, [lugares]);

  return (
    <Container>
      <Row>
        {listaLugares.map((lugar) => (
          <Col key={lugar.id} xs={12} md={6} lg={4} className="mb-4">
            <div className="bg-white h-100 p-3">
              <Row className="d-flex justify-content-between align-items-center">
                <Col xs={1}>
                  <DropdownButton
                    title="Opciones"
                    variant="link"
                    id={`dropdown-${lugar.id}`}
                    className="p-0"
                  >
                    <Dropdown.Item eventKey="1" onClick={() => editarLugar(lugar)}>
                      Editar
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="2"
                      onClick={() => eliminarLugar(lugar.id)}
                    >
                      Eliminar
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
              <Row className='d-flex justify-content-between align-items-center text-center'>
                <h2>{lugar.nombre}</h2>
              </Row>

              <Row className="text-center mt-3">
                <Col>
                  <img
                    src={lugar.url_imagen}
                    alt={lugar.nombre}
                    className="img-fluid tamaño"
                  />
                </Col>
              </Row>

              <Row className="text-center mt-2">
                <Col>
                  <p>{lugar.fecha_visita}</p>
                  <p>{lugar.direccion}</p>
                </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TarjetaLugar;