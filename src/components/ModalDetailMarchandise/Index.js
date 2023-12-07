import { memo } from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const ModalDetailMarchandise = ({ show, datasIndex, onHide }) => {

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>{datasIndex?.cible}</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {datasIndex ? (
          <Container>
            <Row className='mt-3'>
              <Col xs={6} md={6} className='fw-bold'>
                Prix
              </Col>
              <Col xs={6} md={6} style={{fontWeight: '500'}}>
              {datasIndex.prix}$
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col xs={6} md={6} className='fw-bold'>
                Quantite
              </Col>
              <Col xs={6} md={6} style={{fontWeight: '500'}}>
              {datasIndex.quantite}
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col xs={6} md={6} className='fw-bold'>
                Unite
              </Col>
              <Col xs={6} md={6} style={{fontWeight: '500'}}>
              {datasIndex.unite}
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col xs={6} md={6} className='fw-bold'>
                Packaging
              </Col>
              <Col xs={6} md={6} style={{fontWeight: '500'}}>
              {datasIndex.packaging}
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col xs={6} md={6} className='fw-bold'>
                Poids brut
              </Col>
              <Col xs={6} md={6} style={{fontWeight: '500'}}>
              {datasIndex.poids}Kg
              </Col>
            </Row>
          </Container>
        ) : <p>Chargement ...</p>}
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}

export default memo(ModalDetailMarchandise)
