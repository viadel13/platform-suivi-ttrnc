import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

const ModalSetting = ({ show, setShow }) => {
  const [valueTheme, setValueTheme] = useState('Francais')

  const handleClose = () => setShow(false);

  const handleChange = (value) => {
    setValueTheme(value)
  }

  const customModal = {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  }

  return (
    <>
      <Modal centered show={show} onHide={handleClose} style={customModal} >
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title style={{ fontSize: "18px" }}>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <Container>
            <Row>
              <Col xs={6} md={6} lg={6}>
                Langue
              </Col>
              <Col xs={6} md={6} lg={6}>
                <div className="dropdown">
                  <Link className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ textDecoration: 'none', color: "white", fontSize: '15px' }}>
                    {valueTheme}
                  </Link>

                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li><Link className="dropdown-item" to="#" onClick={() => handleChange('Francais')} style={{ textDecoration: 'none', color: "white", fontSize: '15px' }}>Francais</Link></li>
                    <li><Link className="dropdown-item" to="#" onClick={() => handleChange('Anglais')} style={{ textDecoration: 'none', color: "white", fontSize: '15px' }}>Anglais</Link></li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default ModalSetting;
