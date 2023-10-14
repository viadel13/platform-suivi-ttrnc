import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";

const ListeEnvois = () => {
  // const datasEnvoi = useSelector((state)=> state.platformeSuivi.datasEnvoi);
  // const datasEnvoi = JSON.parse(localStorage.getItem('datasEnvoi'));
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [loading, setLoading] = useState(true);

  const q = query(collection(db, "DatasEnvoi"));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapchot) => {
      const datas = [];
      querySnapchot.forEach((doc) => {
        datas.push(doc.data());
      });

      setDonneesEnvoi(datas);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [q]);

  const tableDatas = donneesEnvoi.map((i, index) => {
    return (
      <tr key={index}>
        <td>{i.numeroSuivi}</td>
        <td>{i.nomProduit}</td>
        <td>{i.quantite}</td>
        <td>{i.categorie}</td>
        <td style={{width: '290px'}}>
          <select className="form-select" aria-label="Default select example" style={{ border: 'none'}}>
            <option value="1">En attente de dédouanement</option>
            <option value="2">En transit </option>
            <option value="3">En livraison</option>
            <option value="4">Livré </option>
          </select>
        </td>
      </tr>
    );
  });

  return (
    <div className="container mt-5">
      <div style={{ backgroundColor: "white" }}>
        <h2>Liste des envois</h2>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-primary">
            <tr>
              <th>Numéro de suivi</th>
              <th>Nom du produit</th>
              <th>Quantité</th>
              <th>Catégorie</th>
              <th>État</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : tableDatas.length !== 0 ? (
              tableDatas
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Aucune donnée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListeEnvois;
