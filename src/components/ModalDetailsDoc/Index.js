import { memo } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

const MoadalDetailsDoc = (props) => {
  console.log('Composant modal detail est monte')
  const datasIndex = props.datasIndex
  // console.log(datasIndex)
  function handleDownload(link){
    window.location.href =  `${link}`
  }

  async function handleDownloadAll(links) {
    try {
      // Créer un tableau de promesses pour chaque téléchargement individuel
      const downloadPromises = links.map((link) => {
        return new Promise((resolve, reject) => {
          // Télécharger le fichier
          const xhr = new XMLHttpRequest();
          xhr.open('GET', link, true);
          xhr.responseType = 'blob';
          xhr.onload = () => {
            const blob = new Blob([xhr.response]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = link.split('/').pop(); // Utiliser le nom du fichier pour le téléchargement
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            resolve();
          };
          xhr.onerror = () => {
            reject(new Error(`Erreur de téléchargement pour ${link}`));
          };
          xhr.send();
        });
      });

      // Attendre que toutes les promesses de téléchargement soient résolues
      await Promise.all(downloadPromises);

      console.log('Tous les fichiers ont été téléchargés avec succès.');
    } catch (error) {
      console.error('Erreur lors du téléchargement des fichiers:', error);
    }
  }


  return (
    <div>
      <Modal centered show={props.show} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4>Infos - Doc <span style={{fontSize: '20px'}}>({datasIndex?.NumeroSuivi})</span></h4>
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          {datasIndex ? (
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
                <Row className='mt-3 py-2' style={{ borderTop: '1px solid #cfd0d1', borderBottom: '1px solid #cfd0d1' }}>
                  <Col xs={6} md={6} className='fw-bold mb-3'>
                    Date
                  </Col>
                  <Col xs={6} md={6} style={{fontWeight: '500'}}>
                    {datasIndex.date}
                  </Col>
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
                    <button className='btn btn-success btn-sm' onClick={()=>handleDownload(datasIndex.listeColissage)}> Telecharger </button>
                  </Col>
                </Row>
                <Row className='mt-3 '>
                  <Col xs={6} md={6} className='fw-bold'>
                    Certificat d'origine
                  </Col>
                  <Col xs={6} md={6}>
                    <button className='btn btn-success btn-sm' onClick={()=>handleDownload(datasIndex.certificatOrigine)}> Telecharger </button>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col xs={6} md={6} className='fw-bold'>
                    Certificat phyto-sanitaire
                  </Col>
                  <Col xs={6} md={6}>
                    <button className='btn btn-success btn-sm' onClick={()=>handleDownload(datasIndex.certificatPhytoSanitaire)}> Telecharger </button>
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
                    <button className='btn btn-success btn-sm' onClick={()=>handleDownload(datasIndex.fichierRCV)}> Telecharger </button>
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
                    <button className='btn btn-success btn-sm' onClick={()=>handleDownload(datasIndex.FichierPAD)}> Telecharger </button>
                  </Col>
                </Row>
                <Row className='mt-3 py-2' style={{ borderTop: '1px solid #cfd0d1', borderBottom: '1px solid #cfd0d1' }}>
                  <Col xs={6} md={6} className='mb-3 fw-bold'>
                    Declaration
                  </Col>
                  <Col xs={6} md={6} className='mb-3'  style={{fontWeight: '500'}}>
                    {datasIndex.numeroDeclaration}
                  </Col>
                  <Col xs={6} md={6} className='fw-bold'>
                    Fichier
                  </Col>
                  <Col xs={6} md={6}>
                    <button className='btn btn-success btn-sm' onClick={()=>handleDownload(datasIndex.Fichierdeclaration)}> Telecharger </button>
                  </Col>
                </Row>
                <Row className='mt-3 py-2' style={{ borderTop: '1px solid #cfd0d1', borderBottom: '1px solid #cfd0d1' }}>
                  <Col xs={6} md={6} className='mb-3 fw-bold'>
                    Quittance
                  </Col>
                  <Col xs={6} md={6} className='mb-3'  style={{fontWeight: '500'}}>
                    {datasIndex.Numeroquittance}
                  </Col>
                  <Col xs={6} md={6} className='fw-bold'>
                    Fichier
                  </Col>
                  <Col xs={6} md={6}>
                    <button className='btn btn-success btn-sm' onClick={()=>handleDownload(datasIndex.Fichierquittance)}> Telecharger </button>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col xs={6} md={6} className='fw-bold'>
                    Autorisation d'enlevement
                  </Col>
                  <Col xs={6} md={6}>
                    <button className='btn btn-success btn-sm' onClick={()=>handleDownload(datasIndex.autorisationEnlevement)}> Telecharger </button>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col xs={6} md={6} className='fw-bold'>
                    Bon de sortie
                  </Col>
                  <Col xs={6} md={6}>
                    <button className='btn btn-success btn-sm' onClick={()=>handleDownload(datasIndex.bonSortie)}> Telecharger </button>
                  </Col>
                </Row>
                {datasIndex.autres.length !== 0 && (
                    <Row className='mt-3'>
                    <Col xs={6} md={6} className='fw-bold '>
                      Autre
                    </Col>
                    <Col xs={6} md={6}>
                      <button className='btn btn-success btn-sm' onClick={()=>handleDownloadAll(datasIndex.autres)}> Telecharger </button>
                    </Col>
                  </Row>
                )}
              

              </div>


            </Container>


        ) : <p>Chargement ...</p>
          }

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default memo(MoadalDetailsDoc);
