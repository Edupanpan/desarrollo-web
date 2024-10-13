import React from 'react';
import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { FaEllipsisV } from 'react-icons/fa'; // Importar el ícono
import './tarjetalugar.css';

const TarjetaLugar = ({ lugares }) => {
  return (
    <Container>
      <Row>
        {lugares.map((lugar) => {
          const fechaFormateada = lugar.fechavisita.slice(0, 10); // Extrae los primeros 10 caracteres
          return (
            <Col key={lugar.id} xs={12} md={6} lg={3} className="mb-4">
              <div className="bg-white h-100 p-3">
                <Row className="d-flex justify-content-end">
                  <DropdownButton
                    variant="link"
                    id={`dropdown-${lugar.id}`} // ID único para cada dropdown
                    title={<FaEllipsisV />} // Icono como título del dropdown
                    className="p-0"
                  >
                    <Dropdown.Item eventKey="1">Editar</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Eliminar</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Compartir</Dropdown.Item>
                  </DropdownButton>
                </Row>
                <Row>
                  <h2 className="m-0 text-center w-100">{lugar.nombre}</h2>
                </Row>
                <Row className="text-center mt-3">
                  <img src={lugar.imagen} alt={lugar.nombre} className="img-fluid" />
                </Row>
                <Row className="text-center mt-2">
                  <p>{fechaFormateada}</p>
                  <p>{lugar.direccion}</p>
                </Row>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default TarjetaLugar;
