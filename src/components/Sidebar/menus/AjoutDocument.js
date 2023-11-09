import Breadcrumb from "../../Breadcrumb/Index";
import { useFormik } from "formik";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useState, useEffect } from "react";

const AjoutDocument = () => {
  const breadcrumbLinks = ["Gestion Documents", "Ajout Document"];
  const [loading, setLoading] = useState(true);
  const[donneesEnvoi, setDonneesEnvoi]=useState([]);

  const q = query(collection(db, "DatasEnvoi"));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapchot) => {
      const datas = [];
      querySnapchot.forEach((doc) => {
        datas.push(doc.data());
      });

      if (JSON.stringify(datas) !== JSON.stringify(donneesEnvoi)) {
        setDonneesEnvoi(datas);
      }

      setLoading(false);
      return () => {
        unsubscribe();
      };
    });
  }, [q, donneesEnvoi]);


  const initialValues = {
    client: "",
    nomProduit: "",
    quantite: "",
    categorie: "",
    poids: "",
    volume: "",
    prix: "",
  };

  const onSubmit = async (values) => {

    // formik.handleReset();
  };

  const validate = values=>{
    let errors = {};

    if (!values.client) {
      errors.client = "Veuillez choisir un client svp";
    }
    if (!values.nomProduit) {
      errors.nomProduit = "Ce champ est obligatoire";
    }
    if (!values.quantite) {
      errors.quantite = "Ce champ est obligatoire";
    }
    if (!values.categorie) {
      errors.categorie = "Ce champ est obligatoire";
    }
    if (!values.poids) {
      errors.poids = "Ce champ est obligatoire";
    } else if (isNaN(values.poids)) {
      errors.poids = "Veuillez entrer un nombre valide";
    }
    
    if (!values.volume) {
      errors.volume = "Ce champ est obligatoire";
    } else if (isNaN(values.poids)) {
      errors.volume = "Veuillez entrer un nombre valide";
    }
    if (!values.prix) {
      errors.prix = "Ce champ est obligatoire";
    } else if (isNaN(values.poids)) {
      errors.prix = "Veuillez entrer un nombre valide";
    }

    return errors;
  }


  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="ajoutDocument container-fluid">
      <div>
        <h2 className="fs-4" style={{ fontWeight: "600" }}>
          Ajouter un document
        </h2>
        <Breadcrumb links={breadcrumbLinks} />
      </div>
      <div className="container-fluid card-ajoutDocument">
        <form className="form-document">
          <div className="row gx-5">
            <div className="col-12 col-md-6 col-lg-6">
            <div className="mb-4">
                <label htmlFor="client" className="form-label">
                  Numero suivi
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  value={formik.values.client}
                  name="client"
                  id="client"
                >
                  <option value="">Choisir un numero</option>
                  {donneesEnvoi.map((i, index) => {
                    return <option key={index}>{i.numeroSuivi} - {i.client}</option>;
                  })}
                </select>
           
             </div>

              <div className="mb-4">
                <label htmlFor="cbl" className="form-label">
                  Connaissement-BL-LTA
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cbl"
                  name="cbl"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Nfacture" className="form-label">
                  Numero facture
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="Nfacture"
                  name="Nfacture"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Lcolissage" className="form-label">
                  Liste collisage
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="Lcolissage"
                  name="Lcolissage"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Corigine" className="form-label">
                  Certificat d'origine
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="Corigine"
                  name="Corigine"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="CphytoSanitaire" className="form-label">
                  Certificat phyto-sanitaire
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="CphytoSanitaire"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="row mb-4">
                <div className="col-4">
                  <label htmlFor="Numerorcv" className="form-label">
                    RVC
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    id="Numerorcv"
                    name="Numerorcv"
                  />
                </div>
                <div className="col">
                  <label htmlFor="FichierRcv" className="form-label">
                    Fichier
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="FichierRcv"
                    name="FichierRcv"
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-4">
                  <label htmlFor="Numeropad" className="form-label">
                    PAD
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    id="Numeropad"
                    name="Numeropad"
                  />
                </div>
                <div className="col">
                  <label htmlFor="FichierPad" className="form-label">
                    Fichier
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="FichierPad"
                    name="FichierPad"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="Auenlevement" className="form-label">
                  Autorisation d'enlevement
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="Auenlevement"
                  name="Auenlevement"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Bsortie" className="form-label">
                  Bon de sortie
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="Bsortie"
                  name="Bsortie"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="autre" className="form-label">
                  Autre
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="autre"
                  name="autre"
                  multiple
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary mt-4">
              Ajouter Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjoutDocument;
