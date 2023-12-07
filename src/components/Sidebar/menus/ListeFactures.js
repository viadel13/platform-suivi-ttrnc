import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import Breadcrumb from "../../Breadcrumb/Index";
import { toast } from "react-toastify";
import { useMediaQuery } from 'react-responsive'

const ListeFactures = () => {

  const isMediumScreen = useMediaQuery({
    query: '(max-width: 767px)'
  });
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [loading, setLoading] = useState(true);
  const breadcrumbLinks = ['Gestion Factures', 'Factures'];
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const q = query(collection(db, "Factures"));
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

  const handleMouseEnter = (index) => {
    setHoveredRowIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  const tableDatas = donneesEnvoi && donneesEnvoi.map((i, index) => {

    const isRowHovered = index === hoveredRowIndex;

    return (
      <tr key={index} onClick={() => {
        if (isMediumScreen) {
          toast.info(`NIU : ${i.niu}`, {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
          });
        }
      }}
      style={{cursor: isMediumScreen ? 'pointer': ''}}
      className={`text-center ${isRowHovered && isMediumScreen ? 'table-primary' : ''}`}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
      >
        <td className="d-none d-md-table-cell">{i.niu}</td>
        <td>{i.nom}</td>
        <td>{i.valeurDeclaree}$</td>
        <td>{i.droitDouane}$</td>
        <td>{i.HADCAD}$</td>
      </tr>
    )
  })

  return (



    <div className="container-fluid ListeFacture">
      <div>
        <h2 className="fs-4" style={{ fontWeight: "600" }}>
          Liste des factures
        </h2>
        <Breadcrumb links={breadcrumbLinks} />
      </div>
      <div className="card-ListeFacture px-4 py-3">
        <div className="row mb-2">
          <div className="col-12 col-md-6 py-2 d-flex align-items-center">
            <span className="me-2" style={{ fontSize: '15px' }}>Show</span>
            <select className="form-select px-2" style={{ width: '90px', height: '34px', fontSize: '15px' }} aria-label="Default select example">
              <option value="1">5</option>
              <option value="2">10</option>
              <option value="2">20</option>
              <option value="3">100</option>
            </select>
            <span className="ms-2" style={{ fontSize: '15px' }}>entries</span>
          </div>
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-end" >
            <span className="me-2" style={{ fontSize: '15px' }}>Search:</span>
            <input className="form-control searchEnvoi" type="search" />
          </div>
          <table className="table mt-2">
            <thead>
              <tr className="table-info text-center" style={{ fontSize: '14px' }} >
                <th scope="col" className="d-none d-md-table-cell" >NIU</th>
                <th scope="col">Nom</th>
                <th scope="col">Valeur declaree</th>
                <th scope="col">Droit douane</th>
                <th scope="col">HAP-CAD</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              )
                : donneesEnvoi.length !== 0 ? tableDatas : (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      Aucune donnée
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>

  )
}

export default ListeFactures
