import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Breadcrumb from "../../Breadcrumb/Index";

const AjoutClient = () => {
  const [value, setValue] = useState();
  const breadcrumbLinks = ["Gestion Clients", "Ajout un client"];

  return (
    <div className="container-fluid ajoutClient">
      <div>
        <h2 className="fs-4" style={{ fontWeight: "600" }}>
          Ajouter un client
        </h2>
        <Breadcrumb links={breadcrumbLinks} />
      </div>
      <div className="card-ajoutClient container-fluid">
        <form className="form-client">
          <div className="row gx-5">
            <div className="col-12 col-md-4 col-lg-4">
              <div className="mb-3">
                <label htmlFor="NIU" className="form-label">
                  NIU
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="NIU"
                  name="NIU"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div>
                <label className="mb-3">Sexe</label>
                <div className="mb-3 d-flex">
                  <div className="form-check mb-2 me-2">
                    <input
                      className="form-check-input "
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="option1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      Homme
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      value="option2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      Femme
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4">
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">
                  Nom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  name="nom"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telephone" className="form-label">
                  Telephone
                </label>
                <PhoneInput
                  placeholder="Enter phone number"
                  id="telephone"
                  name="telephone"
                  value={value}
                  onChange={setValue}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4">
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">
                  Prenom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  name="prenom"
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
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="siege" className="form-label">
                  Siege
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="siege"
                  name="siege"
                  required
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary mt-4">
              Ajouter Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjoutClient;