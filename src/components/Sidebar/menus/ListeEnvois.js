import { Fragment, useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Breadcrumb from "../../Breadcrumb/Index";
import { useSelector } from "react-redux";


const ListeEnvois = () => {

  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [loading, setLoading] = useState(true);
  const breadcrumbLinks = ["Gestion des Envois", "Liste des envois"];
  const toggleSidebar = useSelector((state)=> state.platformeSuivi.toggleSidebar);

  // const [collapseShow, setCollapseShow] = useState(false);

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
    <div className="container-fluid ListeEnvoi">
      <div>
        <div>
          <h2 className="fs-4" style={{ fontWeight: "600" }}>
            Liste des envois
          </h2>
          <Breadcrumb links={breadcrumbLinks} />
        </div>

        <div className="card-listeEnvoi px-4 py-3">
          <div className="row mb-2">
            <div className="col-12 col-md-6 py-2 d-flex align-items-center">
              <span className="me-2" style={{fontSize:'15px'}}>Show</span>
              <select className="form-select px-2" style={{width: '90px', height: '34px', fontSize: '15px'}} aria-label="Default select example">
                <option value="1">5</option>
                <option value="2">10</option>
                <option value="2">20</option>
                <option value="3">100</option>
              </select>
              <span className="ms-2" style={{fontSize:'15px'}}>entries</span>
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-end" >
              <span className="me-2" style={{fontSize:'15px'}}>Search:</span>
              <input className="form-control searchEnvoi" type="search" />
            </div>

          
          </div>
          <table className="table" id="table-hover">
            <thead>
              <tr className="text-center table-secondary" style={{fontSize : toggleSidebar ? '14px' : '', transition: '.3s'}}>
                <th className="d-lg-none "></th>
                <th className="Nsuivi"  style={{width: '10%'}}>Numero suivi</th>
                <th  className="Nsuivi">Client</th>
                <th className="d-none d-md-table-cell" style={{width: '10%'}}>Produit</th>
                <th className="d-none d-md-table-cell">Quantite</th>
                <th className="d-none d-md-table-cell">Categorie</th>
                <th className="d-none d-md-table-cell">Poids</th>
                <th className="d-none d-lg-table-cell">Volume</th>
                <th className="d-none d-lg-table-cell">Prix</th>
                <th className="d-none d-lg-table-cell"  style={{width: '25%'}}>Etat</th>
                <th className="d-none d-lg-table-cell" >Date</th>
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
                        style={{fontSize : toggleSidebar ? '15px' : '', transition: '.3s'}}
                      >
                        <td className="d-lg-none ">
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
                        <td className="d-none d-md-table-cell">{i.poids}Kg</td>
                        <td className="d-none d-lg-table-cell">{i.volume}{i.volume && 'm³'}</td>
                        <td className="d-none d-lg-table-cell">{i.prix}$</td>
                        <td
                          className="d-none d-lg-table-cell"
                          style={{ width: "290px" }}
                        >
                          <select
                            className="form-select text-center"
                            aria-label="Default select example"
                            style={{ border: "none" }}
                          >
                            <option value="1">
                              En attente de dédouanement
                            </option>
                            <option value="2">En transit </option>
                            <option value="3">En livraison</option>
                            <option value="4">PMD </option>
                            <option value="4">PAD </option>
                            <option value="4">BMD </option>
                          </select>
                        </td>
                        <td className="d-none d-lg-table-cell">{i.date}</td>
                      </tr>

                      {/* ligne collapse pour les ecrans moyens  */}

                      <tr className="d-lg-none">
                        <td colSpan="4" className="hiddenRow">
                          <div
                            className="accordion-body collapse"
                            id={`${index}`}
                          >
                            <table
                              className="table"
                              style={{ border: "1px solid transparent" }}
                            >
                              <thead></thead>
                              <tbody className="rowMobile">
                                <tr>
                                  <th>Produit</th>
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
                                  <td>{i.volume} {i.volume && 'm³'}</td>
                                </tr>
                                <tr>
                                  <th>Prix</th>
                                  <td>{i.prix}$</td>
                                </tr>

                                <tr>
                                  <th>Etat</th>
                                  <td
                                    style={{
                                      width: "290px",
                                      position: "relative",
                                      left: "-10px",
                                      top: "-5px",
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
                                <tr>
                                  <th>Date</th>
                                  <td>{i.date}</td>
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
    </div>
  );
};

export default ListeEnvois;
