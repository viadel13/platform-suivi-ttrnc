import { useState, useEffect } from "react";
import Breadcrumb from "../../Breadcrumb/Index";
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const AjouterMarchandise = () => {
  const breadcrumbLinks = ['Marchandses', 'Ajouter marchandise'];
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const obtenirDateActuelle = ()=>{
    const date = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateFormatee = date.toLocaleDateString('fr-FR', options);
    return dateFormatee;
  }


  const initialValues = {
    cible: "",
    nomMarchandise: "",
    quantite: "",
    prix: "",
    unite: '',
    packaging: '',
    poids: '',
  };

  const onSubmit = async (values) => {
    await addDoc(collection(db, "Marchandises"), {
      cible: formik.values.cible,
      nomMarchandise: formik.values.nomMarchandise,
      quantite: formik.values.quantite,
      prix: formik.values.prix,
      unite: formik.values.unite,
      packaging: formik.values.packaging,
      poids: formik.values.poids,
      date: obtenirDateActuelle(),
    });
    formik.handleReset();
    toast.success("Marchandise ajouter avec success", {
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

    if (!values.cible) {
      errors.cible = "Veuillez choisir un client svp";
    }
    if (!values.nomMarchandise) {
      errors.nomMarchandise = "Ce champ est obligatoire";
    }

    if (!values.quantite) {
      errors.quantite = "Ce champ est obligatoire";
    } else if (isNaN(values.quantite)) {
      errors.quantite = "Veuillez entrer un nombre valide";
    }

    if (!values.prix) {
      errors.prix = "Ce champ est obligatoire";
    } else if (isNaN(values.prix)) {
      errors.prix = "Veuillez entrer un nombre valide";
    }
    if (!values.unite) {
      errors.unite = "Ce champ est obligatoire";
    }
    if (!values.packaging) {
      errors.packaging = "Ce champ est obligatoire";
    }
    if (!values.poids) {
      errors.poids = "Ce champ est obligatoire";
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
    <div className="container-fluid ajouterMarchandise">
      <div>
        <h2 className="fs-4" style={{ fontWeight: '600' }}>Ajouter marchandise</h2>
        <Breadcrumb links={breadcrumbLinks} />
      </div>
      <div className="card-ajoutMarchandise">
        <form className="form-marchandise" onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="cible" className="form-label">
                  Cible
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  value={formik.values.cible}
                  name="cible"
                  id="cible"
                  style={{ border: formik.touched.cible && formik.errors.cible ? "1px solid red" : "" }}
                >
                  <option value="">Choisir une cible</option>
                  {donneesEnvoi.map((i, index) => {
                    return <option key={index}>({i.numeroSuivi}) {i.nomProduit} - {i.client}</option>;
                  })}
                </select>
                {formik.touched.cible && formik.errors.cible ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.cible}</p></div>
                ) : null}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="nomMarchandise" className="form-label">
                  Nom de la marchandise
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nomMarchandise"
                  name="nomMarchandise"
                  onChange={formik.handleChange}
                  value={formik.values.nomMarchandise}
                  style={{ border: formik.touched.nomMarchandise && formik.errors.nomMarchandise ? "1px solid red" : "" }}
                />
                {formik.touched.nomMarchandise && formik.errors.nomMarchandise ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.nomMarchandise}</p></div>
                ) : null}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="quantite" className="form-label">
                  Quantité
                </label>
                <input
                  type="number"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.quantite}
                  id="quantite"
                  name="quantite"
                  style={{ border: formik.touched.quantite && formik.errors.quantite ? "1px solid red" : "" }}
                />
                {formik.touched.quantite && formik.errors.quantite ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.quantite}</p></div>
                ) : null}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="prix" className="form-label">
                  Prix
                </label>
                <input
                  type="number"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.prix}
                  id="prix"
                  name="prix"
                  step="1"
                  style={{ border: formik.touched.prix && formik.errors.prix ? "1px solid red" : "" }}
                />
                {formik.touched.prix && formik.errors.prix ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.prix}</p></div>
                ) : null}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="unite" className="form-label">
                  Unite
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.unite}
                  id="unite"
                  name="unite"
                  style={{ border: formik.touched.unite && formik.errors.unite ? "1px solid red" : "" }}
                />
                {formik.touched.unite && formik.errors.unite ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.unite}</p></div>
                ) : null}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="packaging" className="form-label">
                  Packaging
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.packaging}
                  id="packaging"
                  name="packaging"
                  style={{ border: formik.touched.packaging && formik.errors.packaging ? "1px solid red" : "" }}
                />
                {formik.touched.packaging && formik.errors.packaging ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.packaging}</p></div>
                ) : null}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <>
                <label htmlFor="poids" className="form-label">
                  Poids brut
                </label>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0"
                    aria-describedby="kgAddon"
                    id="poids"
                    name="poids"
                    onChange={formik.handleChange}
                    value={formik.values.poids}
                    style={{ border: formik.touched.poids && formik.errors.poids ? "1px solid red" : "" }}
                  />

                  <span className="input-group-text" id="kgAddon">
                    kg
                  </span>

                </div>
                {formik.touched.poids && formik.errors.poids ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.poids}</p></div>
                ) : null}
              </>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-primary">
              Ajouter la marchandise
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default AjouterMarchandise;
