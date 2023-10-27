import { Fragment, useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ListeEnvois = () => {
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [collapseShow, setCollapseShow] = useState(false);
  const datasEnteteTab = ['Produit', 'Quantite', 'Prix', 'Etat'];
  
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
    <div className="container mt-5">
          <div style={{ backgroundColor: "white" }}>
        <h2>Liste des envois</h2>
      </div>

          <div>
            <table className="table table-condensed table-striped">
              <thead>
                <tr className="text-center">
                  <th className="d-lg-none d-md-none"></th>
                  <th>Numero suivi</th>
                  <th>Client</th>
                  <th className="d-none d-md-table-cell">Produit</th>
                  <th className="d-none d-md-table-cell">Quantite</th>
                  <th className="d-none d-md-table-cell">Prix</th>
                  <th className="d-none d-md-table-cell">Etat</th>
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
                        <AiOutlinePlusCircle size={25} color="green" style={{cursor: 'pointer'}} />
                      </td>
                      <td>{i.numeroSuivi}</td>
                      <td>Viadel elie</td>
                      <td className="d-none d-md-table-cell">{i.nomProduit}</td>
                      <td className="d-none d-md-table-cell">{i.quantite}</td>
                      <td className="d-none d-md-table-cell">{i.categorie}</td>
                      <td className="d-none d-md-table-cell">en trasit</td>
                    </tr>
                    <tr className="d-md-none d-lg-none">
                      <td colSpan="6" className="hiddenRow">
                        <div className="accordion-body collapse" id={`${index}`}>
                          <table className="table">
                            <thead>
                        
                            </thead>
                            <tbody>
                        
                              <tr style={{ position: 'relative'}}>
                                <th>
                                  Produit
                                </th>
                                <td  style={{ position: 'absolute', left: '150px'}}>{i.nomProduit}</td>
                              </tr>
                          
        
                              <tr style={{ position: 'relative'}}>
                                <th>
                                  Quantite
                                </th>
                                <td  style={{ position: 'absolute', left: '150px'}}>{i.quantite}</td>
                              </tr>
                              <tr style={{ position: 'relative'}}>
                                <th>
                                  Prix
                                </th>
                                <td  style={{ position: 'absolute', left: '150px'}}>{i.prix}</td>
                              </tr>
                          
        
                              <tr style={{ position: 'relative'}}>
                                <th>
                                  Etat
                                </th>
                                <td  style={{ position: 'absolute', left: '150px'}}>En transit</td>
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
