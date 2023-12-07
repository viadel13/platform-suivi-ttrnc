import ModalDetailMarchandise from '../../ModalDetailMarchandise/Index'
import { useCallback, useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import Breadcrumb from "../../Breadcrumb/Index";

const ListeMarchandises = () => {
  
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [loading, setLoading] = useState(true);
  const breadcrumbLinks = ["Marchandises", "Liste marchandises"];
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const[dataIndex, setDataIndex] = useState();

  const q = query(collection(db, "Marchandises"));

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

    
  function modal(datas){
    setModalShow(true);
    setDataIndex(datas)
  }

  const handleMouseEnter = (index) => {
    setHoveredRowIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  const handleCloseModal = useCallback (() => {
    setModalShow(false);
  }, []);


  const datasTable = donneesEnvoi.map((i, index) => {

    const isRowHovered = index === hoveredRowIndex;

    return (
      <tr key={index} 
        id="rowTdMarchandise" 
        className={` ${isRowHovered ? 'table-primary' : ''}`}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
        onClick={() => modal(i)}
      >
        <td>{i.cible}</td>
        <td>{i.nomMarchandise}</td>
        <td>{i.date}</td>
      </tr>
    )

  })

  return (
    <div className="container-fluid ListeMarchandise">
      <div>
        <h2 className="fs-4" style={{ fontWeight: "600" }}>
          Liste des marchandises
        </h2>
        <Breadcrumb links={breadcrumbLinks} />
      </div>
      <div className="card-listeMarchandise px-2 py-3 ">
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
        </div>
        <div className="d-flex justify-content-center">
          <table className="table" id="table-marchandise">
            <thead>
              <tr className="table-secondary" id="rowThMarchandise">
                <th scope="col" style={{width: '40%'}}>Cible</th>
                <th scope="col">Marchandise</th>
                <th scope="col">Date</th>
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
                : donneesEnvoi.length !== 0 ? datasTable : (
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
      <ModalDetailMarchandise show={modalShow} datasIndex={dataIndex} onHide ={handleCloseModal} />
    </div>
  )
}

export default ListeMarchandises;
