import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { modalEtat } from '../../redux/reducers/rootReducer';
import { useDispatch } from 'react-redux';


const ModalAddClient = ({ show, setStatutClient }) => {

  const dispatch = useDispatch();

  const handleClose = (statut) => {
    dispatch(modalEtat(false));
    setStatutClient(statut);
  }

  function handleClient(statut) {
    handleClose(statut);
  }


  return (
    <>
      <Modal centered show={show} onHide={() => handleClose('close')}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout client</Modal.Title>
        </Modal.Header>
        <Modal.Body>veuillez choisir le type de client à inscrire</Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant="success" onClick={() => handleClient('entreprise')}>
            Client Entreprise
          </Button>
          <Button variant="primary" onClick={() => handleClient('client')}>
            Client individuel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalAddClient;
