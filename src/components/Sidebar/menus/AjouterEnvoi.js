import { useFormik } from "formik";
import { useEffect } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Breadcrumb from "../../Breadcrumb/Index";
import { toast } from "react-toastify";

const AjouterEnvoi = () => {
  console.log('Ajout envoi monte')
  const uuid = uuidv4().slice(0, 10);
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [loading, setLoading] = useState(true);
  const breadcrumbLinks = ['Gestion des Envois', 'Ajout un envoi'];

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

  const obtenirDateActuelle = () => {
    const date = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateFormatee = date.toLocaleDateString('fr-FR', options);
    return dateFormatee;
  }

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
    await addDoc(collection(db, "DatasEnvoi"), {
      client: values.client,
      nomProduit: values.nomProduit,
      quantite: values.quantite,
      categorie: values.categorie,
      poids: values.poids,
      volume: values.volume,
      prix: values.prix,
      numeroSuivi: `${uuid}`,
      date: obtenirDateActuelle(),
    });
    formik.handleReset();
    toast.success("Envoi ajouter avec success", {
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

    if (!values.client) {
      errors.client = "Veuillez choisir un client svp";
    }
    if (!values.nomProduit) {
      errors.nomProduit = "Ce champ est obligatoire";
    }
    if (!values.quantite) {
      errors.quantite = "Ce champ est obligatoire";
    } else if (isNaN(values.quantite)) {
      errors.quantite = "Veuillez entrer un nombre valide";
    }
    if (!values.categorie) {
      errors.categorie = "Ce champ est obligatoire";
    }
    if (!values.poids) {
      errors.poids = "Ce champ est obligatoire";
    } else if (isNaN(values.poids)) {
      errors.poids = "Veuillez entrer un nombre valide";
    }

    if (isNaN(values.poids)) {
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
    <div className="container-fluid ajoutEnvoi">

      <div>
        <h2 className="fs-4" style={{ fontWeight: '600' }}>Ajouter un envoi</h2>
        <Breadcrumb links={breadcrumbLinks} />
      </div>

      <div className=" card-ajoutEnvoi">

        <form className="form-envoi" onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-4">
                <label htmlFor="client" className="form-label">
                  Client
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  value={formik.values.client}
                  name="client"
                  id="client"
                  style={{ border: formik.touched.client && formik.errors.client ? "1px solid red" : "" }}
                >
                  <option value="">Choisir un client</option>
                  {donneesEnvoi.map((i, index) => {
                    return <option key={index}>{i.nom}</option>;
                  })}
                </select>
                {formik.touched.client && formik.errors.client ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.client}</p></div>
                ) : null}
              </div>
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
                  style={{ border: formik.touched.nomProduit && formik.errors.nomProduit ? "1px solid red" : "" }}
                />
                {formik.touched.nomProduit && formik.errors.nomProduit ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.nomProduit}</p></div>
                ) : null}
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
                  style={{ border: formik.touched.quantite && formik.errors.quantite ? "1px solid red" : "" }}
                />
                {formik.touched.quantite && formik.errors.quantite ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.quantite}</p></div>
                ) : null}
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
                  placeholder="0"
                  step="1"
                  onChange={formik.handleChange}
                  value={formik.values.prix}
                  style={{ border: formik.touched.prix && formik.errors.prix ? "1px solid red" : "" }}
                />
                {formik.touched.prix && formik.errors.prix ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.prix}</p></div>
                ) : null}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-4">
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
                  style={{ border: formik.touched.categorie && formik.errors.categorie ? "1px solid red" : "" }}
                />
                {formik.touched.prix && formik.errors.prix ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.prix}</p></div>
                ) : null}
              </div>
              <>
                <label htmlFor="poids" className="form-label">
                  Poids
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

              <>
                <label htmlFor="volume" className="form-label">
                  Volume
                </label>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0"
                    aria-describedby="m3Addon"
                    id="volume"
                    name="volume"
                    onChange={formik.handleChange}
                    value={formik.values.volume}
                    style={{ border: formik.touched.volume && formik.errors.volume ? "1px solid red" : "" }}
                  />
                  <span className="input-group-text" id="m3Addon">
                    m³
                  </span>
                </div>
                {formik.touched.volume && formik.errors.volume ? (
                  <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.volume}</p></div>
                ) : null}
              </>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-primary">
              Ajouter l'envoi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjouterEnvoi;
