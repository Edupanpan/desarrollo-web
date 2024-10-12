import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './tarjetalugar.css';

const TarjetaLugar = ({ lugares }) => {
  return (
    <Container>
      <Row>
        {lugares.map((lugar, index) => {
          const fechaFormateada = lugar.fechavisita.slice(0, 10); // Extrae los primeros 10 caracteres
          return (
            <Col key={lugar.id} xs={12} md={6} lg={3} className="mb-4">
              <div className='d-flex justify-content-center bg-white h-100'>
                <li className="lead text-center" >
                  <h2>{lugar.nombre}</h2>
                  <img src={lugar.imagen} alt={lugar.nombre} className="img-fluid d-block mb-2" />
                  <p>{fechaFormateada}</p>
                  <p>{lugar.direccion}</p>
                </li>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default TarjetaLugar;