import { Fragment, useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ListeEnvois = () => {
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [collapseShow, setCollapseShow] = useState(false);
  console.log(donneesEnvoi)

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

  return (
    <>
      <div className="container ListeEnvoi">
        <div style={{ backgroundColor: "white" }}>
          <h2>Liste des envois</h2>
        </div>

        <div className="card-listeEnvoi">
          <table className="table">
            <thead>
              <tr className="text-center table-secondary">
                <th className="d-lg-none d-md-none"></th>
                <th>Numero suivi</th>
                <th>Client</th>
                <th className="d-none d-md-table-cell">Produit</th>
                <th className="d-none d-md-table-cell">Quantite</th>
                <th className="d-none d-md-table-cell">Categorie</th>
                <th className="d-none d-md-table-cell">Poids</th>
                <th className="d-none d-md-table-cell">Volume</th>
                <th className="d-none d-md-table-cell">Prix</th>
                <th className="d-none d-md-table-cell">Etat</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center p-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : donneesEnvoi.length !== 0 ? (
                donneesEnvoi.map((i, index) => {
                  return (
                    <Fragment key={index}>
                      <tr
                        data-bs-toggle="collapse"
                        data-bs-target={`#${index}`}
                        className="accordion-toggle text-center"
                      >
                        <td className="d-lg-none d-md-none">
                          <AiOutlinePlusCircle
                            size={25}
                            color="green"
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                        <td>{i.numeroSuivi}</td>
                        <td>{i.client}</td>
                        <td className="d-none d-md-table-cell">
                          {i.nomProduit}
                        </td>
                        <td className="d-none d-md-table-cell">{i.quantite}</td>
                        <td className="d-none d-md-table-cell">
                          {i.categorie}
                        </td>
                        <td className="d-none d-md-table-cell">
                          {i.poids}Kg
                        </td>
                        <td className="d-none d-md-table-cell">
                          {i.volume}m³
                        </td>
                        <td className="d-none d-md-table-cell">
                          {i.prix}
                        </td>
                        <td
                          className="d-none d-md-table-cell"
                          style={{ width: "290px" }}
                        >
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            style={{ border: "none" }}
                          >
                            <option value="1">
                              En attente de dédouanement
                            </option>
                            <option value="2">En transit </option>
                            <option value="3">En livraison</option>
                            <option value="4">Livré </option>
                          </select>
                        </td>
                      </tr>
                      <tr className="d-md-none d-lg-none">
                        <td colSpan="6" className="hiddenRow">
                          <div
                            className="accordion-body collapse"
                            id={`${index}`}
                          >
                            <table className="table">
                              <thead></thead>
                              <tbody>
                                <tr>
                                  <th className="">Produit</th>
                                  <td>{i.nomProduit}</td>
                                </tr>

                                <tr>
                                  <th>Quantite</th>
                                  <td>{i.quantite}</td>
                                </tr>
                                <tr>
                                  <th>Poids</th>
                                  <td>{i.poids}kg</td>
                                </tr>
                                <tr>
                                  <th>Volume</th>
                                  <td>{i.volume}m³</td>
                                </tr>
                                <tr>
                                  <th>Prix</th>
                                  <td>{i.prix}</td>
                                </tr>

                                <tr>
                                  <th>Etat</th>
                                  <td
                                    style={{
                                      width: "290px",
                                      position: "relative",
                                      left: "-10px",
                                    }}
                                  >
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                      style={{ border: "none" }}
                                    >
                                      <option value="1">
                                        En attente de dédouanement
                                      </option>
                                      <option value="2">En transit </option>
                                      <option value="3">En livraison</option>
                                      <option value="4">Livré </option>
                                    </select>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="text-center p-4">
                    Aucune donnée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListeEnvois;
