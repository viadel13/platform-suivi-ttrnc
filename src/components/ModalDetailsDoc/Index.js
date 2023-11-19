import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
const MoadalDetailsDoc = (props) => {
  const datasIndex = props.datasIndex

  return (
    <>
      <Modal centered show={props.show} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4>Infos - Doc <span style={{fontSize: '20px'}}>({datasIndex?.NumeroSuivi})</span></h4>
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          {datasIndex ? (<Container>
            <Container>
              <div className='scrollable-content'>
                <Row>
                  <Col xs={6} md={6} className='fw-bold'>
                    Connaissement-BL-LTA
                  </Col>
                  <Col xs={6} md={6} style={{fontWeight: '500'}}>
                    {datasIndex.ConnaissementBL}
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col xs={6} md={6} className='fw-bold'>
                    Numero Facture
                  </Col>
                  <Col xs={6} md={6} style={{fontWeight: '500'}}>
                    {datasIndex.numeroFacture}
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col xs={6} md={6} className='fw-bold'>
                    Liste collisage
                  </Col>
                  <Col xs={6} md={6}>
                    <button className='btn btn-success btn-sm'> Telecharger </button>
                  </Col>
                </Row>
                <Row className='mt-3 '>
                  <Col xs={6} md={6} className='fw-bold'>
                    Certificat d'origine
                  </Col>
                  <Col xs={6} md={6}>
                    <button className='btn btn-success btn-sm'> Telecharger </button>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col xs={6} md={6} className='fw-bold'>
                    Certificat phyto-sanitaire
                  </Col>
                  <Col xs={6} md={6}>
                    <button className='btn btn-success btn-sm'> Telecharger </button>
                  </Col>
                </Row>
                <Row className='mt-3 py-2' style={{ borderTop: '1px solid #cfd0d1', borderBottom: '1px solid #cfd0d1' }}>
                  <Col xs={6} md={6} className='mb-3 fw-bold'>
                    RCV
                  </Col>
                  <Col xs={6} md={6} className='mb-3'  style={{fontWeight: '500'}}>
                    {datasIndex.RCV}
                  </Col>
                  <Col xs={6} md={6} className='fw-bold'>
                    Fichier
                  </Col>
                  <Col xs={6} md={6}>
                    <button className='btn btn-success btn-sm'> Telecharger </button>
                  </Col>
                </Row>
                <Row className='mt-3 py-2' style={{ borderTop: '1px solid #cfd0d1', borderBottom: '1px solid #cfd0d1' }}>
                  <Col xs={6} md={6} className='mb-3 fw-bold'>
                    PAD
                  </Col>
                  <Col xs={6} md={6} className='mb-3'  style={{fontWeight: '500'}}>
                    {datasIndex.PAD}
                  </Col>
                  <Col xs={6} md={6} className='fw-bold'>
                    Fichier
                  </Col>
                  <Col xs={6} md={6}>
                    <button className='btn btn-success btn-sm'> Telecharger </button>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col xs={6} md={6} className='fw-bold'>
                    Autorisation d'enlevement
                  </Col>
                  <Col xs={6} md={6}>
                    <button className='btn btn-success btn-sm'> Telecharger </button>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col xs={6} md={6} className='fw-bold'>
                    Bon de sortie
                  </Col>
                  <Col xs={6} md={6}>
                    <button className='btn btn-success btn-sm'> Telecharger </button>
                  </Col>
                </Row>
                {datasIndex.autres.length !== 0 && (
                    <Row className='mt-3'>
                    <Col xs={6} md={6} className='fw-bold '>
                      Autre
                    </Col>
                    <Col xs={6} md={6}>
                      <button className='btn btn-success btn-sm'> Telecharger </button>
                    </Col>
                  </Row>
                )}
              

              </div>


            </Container>


          </Container>) : <p>Chargement ...</p>
          }

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default MoadalDetailsDoc;
