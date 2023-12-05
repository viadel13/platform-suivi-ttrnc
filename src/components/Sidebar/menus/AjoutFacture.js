import { useFormik } from "formik";
import { useEffect } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { useState } from "react";
import Breadcrumb from "../../Breadcrumb/Index";
import { toast } from "react-toastify";

const AjoutFacture = () => {
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [donneesFactures, setDonneesFactures] = useState([]);
  const [loadingFacture, setLoadingFacture] = useState(true);
  const breadcrumbLinks = ['Gestion Factures', 'Ajout facture'];
  const [selectedNiu, setSelectedNiu] = useState("");

  const q = query(collection(db, "Clients"));

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

  const queryFacture = query(collection(db, "Factures"));

  useEffect(() => {
    const unsubscribe = onSnapshot(queryFacture, (querySnapchot) => {
      const datas = [];
      querySnapchot.forEach((doc) => {
        datas.push(doc.data());
      });

      if (JSON.stringify(datas) !== JSON.stringify(donneesFactures)) {
        setDonneesFactures(datas);
      }

      setLoadingFacture(false);
      return () => {
        unsubscribe();
      };
    });
  }, [queryFacture, donneesFactures]);

  const numerosSuiviDejaAjoutes = donneesFactures && donneesFactures.map((item) => item.niu);

  const obtenirDateActuelle = () => {
    const date = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateFormatee = date.toLocaleDateString('fr-FR', options);
    return dateFormatee;
  }

  const initialValues = {
    niu: "",
    nom: "",
    valeurDeclaree: "",
    droitDouane: "",
    HADCAD: "",
  }

  const onSubmit = async (values) => {
    await addDoc(collection(db, "Factures"), {
      niu: values.niu,
      nom: values.nom,
      valeurDeclaree: values.valeurDeclaree,
      droitDouane: values.droitDouane,
      HADCAD: values.HADCAD,
      date: obtenirDateActuelle(),
    });
    formik.handleReset();
    toast.success("Facture ajouter avec success", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const validate = values => {
    let errors = {};

    if (!values.niu) {
      errors.niu = "Veuillez choisir un client svp";
    }
    if (!values.nom) {
      errors.nom = "Ce champ est obligatoire";
    }
    if (!values.valeurDeclaree) {
      errors.valeurDeclaree = "Ce champ est obligatoire";
    } else if (isNaN(values.valeurDeclaree)) {
      errors.valeurDeclaree = "Veuillez entrer un nombre valide";
    }
    
    if (!values.droitDouane) {
      errors.droitDouane = "Ce champ est obligatoire";
    } else if (isNaN(values.droitDouane)) {
      errors.droitDouane = "Veuillez entrer un nombre valide";
    }
    
    if (!values.HADCAD) {
      errors.HADCAD = "Ce champ est obligatoire";
    } else if (isNaN(values.HADCAD)) {
      errors.HADCAD = "Veuillez entrer un nombre valide";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  })
  const handleNiuChange = (e) => {
    const selectedNiuValue = e.target.value;

    // Mettez à jour le state avec le NIU sélectionné
    setSelectedNiu(selectedNiuValue);

    // Obtenez le nom correspondant au NIU sélectionné
    const selectedNiuData = donneesEnvoi.find((data) => data.niu === selectedNiuValue);

    // Mettez à jour le champ "nom" dans formik avec le nom correspondant
    formik.setFieldValue("nom", selectedNiuData ? selectedNiuData.nom : "");

    // Appelez handleChange de formik pour traiter les validations, etc.
    formik.handleChange(e);
  };

  return (
    <div className="container-fluid ajoutFacture">
      <div>
        <h2 className="fs-4" style={{ fontWeight: '600' }}>Ajouter une facture</h2>
        <Breadcrumb links={breadcrumbLinks} />
      </div>
      <div className="card-ajoutFacture" onSubmit={formik.handleSubmit}>
        <form className="form-envoi">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-4">
                <label htmlFor="niu" className="form-label">
                  NIU
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleNiuChange}
                  value={formik.values.niu}
                  name="niu"
                  id="niu"
                  style={{ border: formik.touched.niu && formik.errors.niu ? "1px solid red" : "" }}
                >
                  <option value="" disabled>Choisir un NIU</option>
                  {donneesEnvoi.map((i, index) => {
                    return <option key={index} disabled={numerosSuiviDejaAjoutes.includes(`${i.niu}`)}>{i.niu}</option>;
                  })}
                </select>
                {formik.touched.niu && formik.errors.niu ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.niu}</p></div>
                ) : null}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">
                  Nom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  name="nom"
                  onChange={formik.handleChange}
                  value={formik.values.nom}
                  readOnly
                  style={{ border: formik.touched.nom && formik.errors.nom ? "1px solid red" : "" }}
                />
                {formik.touched.nom && formik.errors.nom ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.nom}</p></div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="valeurDeclaree" className="form-label">
                  Valeur declaree
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="valeurDeclaree"
                  name="valeurDeclaree"
                  onChange={formik.handleChange}
                  value={formik.values.valeurDeclaree}
                  style={{ border: formik.touched.valeurDeclaree && formik.errors.valeurDeclaree ? "1px solid red" : "" }}
                />
                {formik.touched.valeurDeclaree && formik.errors.valeurDeclaree ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.valeurDeclaree}</p></div>
                ) : null}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="droitDouane" className="form-label">
                  Droit de douane
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="droitDouane"
                  name="droitDouane"
                  onChange={formik.handleChange}
                  value={formik.values.droitDouane}
                  style={{ border: formik.touched.droitDouane && formik.errors.droitDouane ? "1px solid red" : "" }}
                />
                {formik.touched.droitDouane && formik.errors.droitDouane ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.droitDouane}</p></div>
                ) : null}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="HADCAD" className="form-label">
                  HAD - CAD
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="HADCAD"
                  name="HADCAD"
                  onChange={formik.handleChange}
                  value={formik.values.HADCAD}
                  style={{ border: formik.touched.HADCAD && formik.errors.HADCAD ? "1px solid red" : "" }}
                />
                {formik.touched.HADCAD && formik.errors.HADCAD ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.HADCAD}</p></div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-primary">
              Ajouter facture
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AjoutFacture
