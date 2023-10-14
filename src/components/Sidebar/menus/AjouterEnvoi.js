import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { datasEnvoi } from "../../../redux/reducers/rootReducer";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

const AjouterEnvoi = () => {

  const dispatch = useDispatch();
  const uuid = uuidv4().slice(0, 10);
  
  const initialValues =  {
    nomProduit: '',
    description: '',
    quantite: '',
    categorie: '',
    prix: '',
    numeroSuivi: `${uuid}`
  };

  const onSubmit = async values =>{
    dispatch(datasEnvoi(values));
    await addDoc(collection(db, "DatasEnvoi"), values);
    formik.handleReset();
  };


  const formik = useFormik({
    initialValues,
    onSubmit,

  });

  return (
    <div className="container mt-5">
      <div style={{ backgroundColor: "white" }}>
        <h2>Ajouter un envoi</h2>
      </div>

      <form className="mt-5 py-4" onSubmit={formik.handleSubmit} >
        <div className="mb-3">
          <label htmlFor="nomProduit" className="form-label">
            Nom du produit
          </label>
          <input
            type="text"
            className="form-control"
            id="nomProduit"
            name="nomProduit"
            onChange={formik.handleChange}
            value={formik.values.nomProduit}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            onChange={formik.handleChange}
            value={formik.values.description}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="quantite" className="form-label">
            Quantité
          </label>
          <input
            type="number"
            className="form-control"
            id="quantite"
            name="quantite"
            onChange={formik.handleChange}
            value={formik.values.quantite}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categorie" className="form-label">
            Catégorie
          </label>
          <input
            type="text"
            className="form-control"
            id="categorie"
            name="categorie"
            onChange={formik.handleChange}
            value={formik.values.categorie}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prix" className="form-label">
            Prix
          </label>
          <input
            type="number"
            className="form-control"
            id="prix"
            name="prix"
            step="1"
            onChange={formik.handleChange}
            value={formik.values.prix}
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Ajouter l'envoi
        </button>
      </form>
    </div>
  );
};

export default AjouterEnvoi;
