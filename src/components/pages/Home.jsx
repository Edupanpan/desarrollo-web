import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/album')
  }

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto align-self-center text-center">
        <Col>
          <div className="greetings">
            <span>B</span>
            <span>i</span>
            <span>e</span>
            <span>n</span>
            <span>v</span>
            <span>e</span>
            <span>n</span>
            <span>i</span>
            <span>d</span>
            <span>o</span>
          </div>
          <p className="lead">Bienvenido a tu galeria interactiva</p>
          <Button className='boton' size="lg" onClick={handleButtonClick}>Comenzar</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Home