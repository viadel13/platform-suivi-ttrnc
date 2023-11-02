import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { datasEnvoi } from "../../../redux/reducers/rootReducer";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const AjouterEnvoi = () => {
  const dispatch = useDispatch();
  const uuid = uuidv4().slice(0, 10);
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const initialValues = {
    client: "",
    nomProduit: "",
    quantite: "",
    categorie: "",
    poids: "",
    volume: "",
    prix: "",
    numeroSuivi: `${uuid}`,
  };

  const onSubmit = async (values) => {
    dispatch(datasEnvoi(values));
    await addDoc(collection(db, "DatasEnvoi"), values);
    formik.handleReset();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div className="container ajoutEnvoi card-ajoutEnvoi px-5 p-3 ">
      <div style={{ backgroundColor: "white" }}>
        <h2>Ajouter un envoi</h2>
      </div>

      <form className="mt-4 py-4" onSubmit={formik.handleSubmit}>
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
              >
                <option value="">Choisir un client</option>
                {donneesEnvoi.map((i, index) => {
                  return <option key={index}>{i.name}</option>;
                })}
              </select>
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
              />
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
          />
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
              />
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
      
                />
                <span className="input-group-text" id="kgAddon">
                  kg
                </span>
              </div>
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
                />
                <span className="input-group-text" id="m3Addon">
                  m³
                </span>
              </div>
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
  );
};

export default AjouterEnvoi;
