import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { modalEtatFournisseur } from '../../redux/reducers/rootReducer';
import { useDispatch } from 'react-redux';
import { memo } from 'react';

const ModalAddFournisseur = ({show, setStatutFournisseur }) => {
  const dispatch = useDispatch();

  const handleClose = (statut) => {
    dispatch(modalEtatFournisseur(false));
    setStatutFournisseur(statut);
  }

  function handleFournisseur(statut) {
    handleClose(statut);
  }

  return (
    <Modal centered show={show} onHide={() => handleClose('close')}>
    <Modal.Header closeButton>
      <Modal.Title>Ajout Fournisseur</Modal.Title>
    </Modal.Header>
    <Modal.Body>veuillez choisir le type de Fournisseur à ajouter</Modal.Body>
    <Modal.Footer className='d-flex justify-content-center'>
      <Button variant="success" onClick={() => handleFournisseur('entreprise')}>
        Fournisseur Entreprise
      </Button>
      <Button variant="primary" onClick={() => handleFournisseur('client')}>
      Fournisseur individuel
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default memo(ModalAddFournisseur);
