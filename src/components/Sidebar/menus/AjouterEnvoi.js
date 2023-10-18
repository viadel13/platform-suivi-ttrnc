import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { datasEnvoi } from "../../../redux/reducers/rootReducer";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

const AjouterEnvoi = () => {

  // const dispatch = useDispatch();
  // const uuid = uuidv4().slice(0, 10);
  
  // const initialValues =  {
  //   nomProduit: '',
  //   description: '',
  //   quantite: '',
  //   categorie: '',
  //   prix: '',
  //   numeroSuivi: `${uuid}`
  // };

  // const onSubmit = async values =>{
  //   dispatch(datasEnvoi(values));
  //   await addDoc(collection(db, "DatasEnvoi"), values);
  //   formik.handleReset();
  // };


  // const formik = useFormik({
  //   initialValues,
  //   onSubmit,

  // });

  return (
   <>
    <div className="container">
      <h2>sdsd</h2>
      <h2>sdsd</h2>
      <h2>sdsd</h2>
      <h2>sdsd</h2>
      <h2>sdsd</h2>
      <h2>sdsd</h2>
      <h2>sdsd</h2>
      <h2>sdsd</h2>
      <h2>sdsd</h2>
      <h2>sdsd</h2>
      <h2>sdsd</h2>
      <h2>sdsd</h2>
      <h2>sdsd</h2>
      <h2>sdsd</h2>
      <h2>sdsd</h2>
      <h2>sdsd</h2>
    </div>
   </>
  );
};

export default AjouterEnvoi;
