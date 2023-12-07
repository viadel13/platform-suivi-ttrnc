import { useState, useEffect } from "react";
import Breadcrumb from "../../Breadcrumb/Index";
import { IoMdPeople } from 'react-icons/io';
import { FaFileSignature } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { GoContainer } from "react-icons/go";
import { FaUsers } from 'react-icons/fa';
import Chart from "../../Line/Index";
import DoughnutChar from "../../Doughnut/Index";
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";

const Accueil = () => {
  const [donneesClient, setDonneesClient] = useState([]);
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [loadingClient, setLoadingCLient] = useState(true);
  const [donneesFournisseur, setDonneesFournisseur] = useState([]);
  const [loadingFournisseur, setLoadingFournisseur] = useState(true);
  const [donneesFacture, setDonneesFacture] = useState([]);
  const [loadingFacture, setLoadingFacture] = useState(true);
  const [loading, setLoading] = useState(true);
  const breadcrumbLinks = [];


  const queryClient = query(collection(db, "Clients"));
  useEffect(() => {
    const unsubscribe = onSnapshot(queryClient, (querySnapchot) => {
      const datas = [];
      querySnapchot.forEach((doc) => {
        datas.push(doc.data());
      });

      if (JSON.stringify(datas) !== JSON.stringify(donneesClient)) {
        setDonneesClient(datas);
      }

      setLoadingCLient(false);
      return () => {
        unsubscribe();
      };
    });
  }, [queryClient, donneesClient]);

  const queryFournisseur = query(collection(db, "Fournisseurs"));
  useEffect(() => {
    const unsubscribe = onSnapshot(queryFournisseur, (querySnapchot) => {
      const datas = [];
      querySnapchot.forEach((doc) => {
        datas.push(doc.data());
      });

      if (JSON.stringify(datas) !== JSON.stringify(donneesFournisseur)) {
        setDonneesFournisseur(datas);
      }

      setLoadingFournisseur(false);
      return () => {
        unsubscribe();
      };
    });
  }, [queryFournisseur, donneesFournisseur]);

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

  const queryFacture = query(collection(db, "Factures"));
  useEffect(() => {
    const unsubscribe = onSnapshot(queryFacture, (querySnapchot) => {
      const datas = [];
      querySnapchot.forEach((doc) => {
        datas.push(doc.data());
      });

      if (JSON.stringify(datas) !== JSON.stringify(donneesFacture)) {
        setDonneesFacture(datas);
      }

      setLoadingFacture(false);
      return () => {
        unsubscribe();
      };
    });
  }, [queryFacture, donneesFacture]);

  const clientFacture = donneesFacture && donneesFacture.length

  const calculatePercentage = () => {
    const clientFacture = donneesFacture && donneesFacture.length;
    const percentage = donneesClient && (clientFacture / donneesClient.length) * 100;
    // Utilisez Math.floor pour obtenir la partie entière
    const wholeNumber = isNaN(percentage) ? 0 : Math.floor(percentage);

    // Assurez-vous de renvoyer un nombre valide (et non une chaîne)
    return parseFloat(wholeNumber);
  }
  const percent = calculatePercentage()

  return (
    <div className="container-fluid accueil">
      <div>
        <h2 className="fs-4" style={{ fontWeight: "600" }}>
          Tableau de bord
        </h2>
        <Breadcrumb links={breadcrumbLinks} />
      </div>
      <div className="dashboard">
        <div className="row gy-3 mb-4">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-dashboard">
              <div className="card-body">
                <div className="card-content d-flex justify-content-between">
                  <div className="icon icon-warning d-flex align-items-center">
                    <span><IoMdPeople size={50} color="#3498db " /></span>
                  </div>
                  <div>
                    <p><strong style={{ color: '#808080' }}>Clients</strong></p>
                    <h3 className="card-title">{loadingClient ? (
                      <div className="spinner-border" role="status" style={{ color: '#3498db' }}>
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : donneesClient.length !== 0 ? (
                      <strong>{donneesClient.length}</strong>
                    ) : (
                      <strong>0</strong>
                    )

                    }</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-dashboard-2">
              <div className="card-body">
                <div className="card-content d-flex justify-content-between">
                  <div className="icon icon-warning d-flex align-items-center ">
                    <span><FaFileSignature size={50} color="#db345e " /></span>
                  </div>
                  <div>
                    <p><strong style={{ color: '#808080' }}>Clients factures</strong></p>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center " style={{ position: 'relative', top: '5px' }}>
                        <h3>
                          <strong>{percent} <span style={{ color: '#808080', fontSize: '20px' }}>%</span></strong>
                        </h3>
                      </div>

                      <div style={{ width: 40 }}>
                        <CircularProgressbar styles={buildStyles({ pathColor: `rgba(255, 0, 0, ${percent / 100})`, textColor: '#000', trailColor: '#d6d6d6', backgroundColor: '#db345e', textSize: '26px', })} value={percent} text={`${clientFacture}`} />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-dashboard-3">
              <div className="card-body">
                <div className="card-content d-flex justify-content-between">
                  <div className="icon icon-warning d-flex align-items-center">
                    <span><GoContainer size={50} style={{ color: `rgb(241, 206, 10)` }} /></span>
                  </div>
                  <div>
                    <p><strong style={{ color: '#808080' }}>Conteneurs</strong></p>
                    <h3 className="card-title">{loading ? (
                      <div className="spinner-border" role="status" style={{ color: `rgb(241, 206, 10)` }}>
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : donneesEnvoi.length !== 0 ? (
                      <strong>{donneesEnvoi.length}</strong>
                    ) : (
                      <strong>0</strong>
                    )

                    }</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-dashboard-4">
              <div className="card-body">
                <div className="card-content d-flex justify-content-between">
                  <div className="icon icon-warning d-flex align-items-center">
                    <span><FaUsers size={50} style={{ color: `rgb(69, 209, 27)` }} /></span>
                  </div>
                  <div>
                    <p><strong style={{ color: '#808080' }}>Fournisseurs</strong></p>
                    <h3 className="card-title">{loading ? (
                      <div className="spinner-border" role="status" style={{ color: `rgb(69, 209, 27)` }}>
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : donneesFournisseur.length !== 0 ? (
                      <strong>{donneesFournisseur.length}</strong>
                    ) : (
                      <strong>0</strong>
                    )

                    }</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="card-chart">
              <Chart />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="card-chart">
              <DoughnutChar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accueil;