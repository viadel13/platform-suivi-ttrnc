import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig"
import { collection, query, onSnapshot } from "firebase/firestore";
import Breadcrumb from "../../Breadcrumb/Index";
import profilMan from "../../../assets/images/profileF.png";
import profilWomen from "../../../assets/images/femelle.png";

const ListeFournisseurs = () => {
  const breadcrumbLinks = ["Gestion Fournisseurs", "Fournisseurs"];
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectOptionSexe, setSelectOptionSexe] = useState("");
  const [search, setSearch] = useState("");

  const q = query(collection(db, "Fournisseurs"));
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

  const showFournisseurs = loading ? (
    <div className="d-flex align-items-center justify-content-center">
      <div
        className="spinner-border text-primary d-flex justify-content-center"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : donneesEnvoi.length !== 0 ? (
    donneesEnvoi
      .filter((i) => {
        if (selectOptionSexe === "1") {
          return true; // Afficher tous les clients pour "Mixte"
        } else if (selectOptionSexe === "2") {
          return i.sexe === "homme"; // Afficher les clients masculins
        } else if (selectOptionSexe === "3") {
          return i.sexe === "femme"; // Afficher les clients féminins
        }
        return true;
      })
      .filter((i) => {
        return i.nom.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      })
      .map((i, index) => {
        return (
          <div key={index} className="col-lg-4 col-md-6 col-sm-12">
            <div className="card card-client">
              <div className="card-body text-center">
                <img
                  src={i.sexe === "femme" ? profilWomen : profilMan}
                  width={70}
                  className="rounded-circle mb-3"
                  alt="sexe utilisateur"
                />
                <h5 style={{ fontWeight: "600", lineHeight: "1.2" }}>
                  {i.nom}
                </h5>
                <small>Statut</small>
                <h6 style={{ fontWeight: "600", lineHeight: "1.2" }}>
                  {i.entreprise === ""
                    ? "Fournisseur individuel"
                    : "Fournisseur entreprise"}
                </h6>
                <div className="mt-3">
                  <button className="btn btn-sm btn-primary me-2 my-2">
                    Voir profil
                  </button>
                  <button className="btn btn-sm btn-success">Contact</button>
                </div>
              </div>
            </div>
          </div>
        );
      })
  ) : (
    <h3 className="text-center">Aucun Fournisseur</h3>
  );

  return (
    <div className="container-fluid ListeClient">
      <div>
        <h2 className="fs-4" style={{ fontWeight: "600" }}>
          Fournisseurs
        </h2>
        <Breadcrumb links={breadcrumbLinks} />
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-6 py-2 d-flex align-items-center">
          <span className="me-2" style={{ fontSize: "15px" }}>
            Filter
          </span>
          <select
            className="form-select px-2 disabled"
            style={{
              width: "98px",
              height: "34px",
              fontSize: "15px",
              pointerEvents: donneesEnvoi.length === 0 ? "none" : "auto",
              backgroundColor:
                donneesEnvoi.length === 0 ? "#e9ecef" : "inherit",
            }}
            aria-label="Default select example"
            onChange={(e) => setSelectOptionSexe(e.target.value)}
          >
            <option value="1">Mixte</option>
            <option value="2">Homme</option>
            <option value="3">Femme</option>
          </select>
        </div>
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-end">
          <span className="me-2" style={{ fontSize: "15px" }}>
            Search:
          </span>
          <input
            className="form-control searchEnvoi"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              pointerEvents: donneesEnvoi.length === 0 ? "none" : "auto",
              backgroundColor:
                donneesEnvoi.length === 0 ? "#e9ecef" : "inherit",
            }}
          />
        </div>
      </div>
      <div className="row g-2">{showFournisseurs}</div>
    </div>
  )
}

export default ListeFournisseurs
