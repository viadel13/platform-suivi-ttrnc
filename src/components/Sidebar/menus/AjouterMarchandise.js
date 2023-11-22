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

  const initialValues = {
    cible: "",
    nomMarchandise: "",
    quantite: "",
    categorie: "",
    prix: "",
  };

  const onSubmit = async (values) => {
    await addDoc(collection(db, "Marchandises"), values);
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

    if (!values.categorie) {
      errors.categorie = "Ce champ est obligatoire";
    }

    if (!values.prix) {
      errors.prix = "Ce champ est obligatoire";
    } else if (isNaN(values.prix)) {
      errors.prix = "Veuillez entrer un nombre valide";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const uniqueCategories = donneesEnvoi && donneesEnvoi.filter((i, index, self) => {
    const categoryLowerCase = i.categorie.toLowerCase();
    return (
      self.findIndex(
        (a) => a.categorie.toLowerCase() === categoryLowerCase
      ) === index
    );
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
                <label htmlFor="categorie" className="form-label">
                  Catégorie
                </label>
                <select
                  className="form-select"
                  onChange={formik.handleChange}
                  value={formik.values.categorie}
                  id="categorie"
                  name="categorie"
                  style={{ border: formik.touched.categorie && formik.errors.categorie ? "1px solid red" : "" }}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {uniqueCategories.map((i, index) => {
                    return <option key={index} >{i.categorie} </option>;
                  })}
                </select>
                {formik.touched.categorie && formik.errors.categorie ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.categorie}</p></div>
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
