import Breadcrumb from "../../Breadcrumb/Index";

const AjoutDocument = () => {
  const breadcrumbLinks = ["Gestion Documents", "Ajout Document"];
  return (
    <div className="ajoutDocument container-fluid">
      <div>
        <h2 className="fs-4" style={{ fontWeight: "600" }}>
          Ajouter un document
        </h2>
        <Breadcrumb links={breadcrumbLinks} />
      </div>
      <div className="container-fluid card-ajoutDocument">
        <form className="form-document">
          <div className="row gx-5">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-4">
                <label htmlFor="cbl" className="form-label">
                  Connaissement-BL-LTA
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cbl"
                  name="cbl"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Nfacture" className="form-label">
                  Numero facture
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="Nfacture"
                  name="Nfacture"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Lcolissage" className="form-label">
                  Liste collisage
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="Lcolissage"
                  name="Lcolissage"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Corigine" className="form-label">
                  Certificat d'origine
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="Corigine"
                  name="Corigine"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="CphytoSanitaire" className="form-label">
                  Certificat phyto-sanitaire
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="CphytoSanitaire"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="row mb-4">
                <div className="col-4">
                  <label htmlFor="Numerorcv" className="form-label">
                    RVC
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    id="Numerorcv"
                    name="Numerorcv"
                  />
                </div>
                <div className="col">
                  <label htmlFor="FichierRcv" className="form-label">
                    Fichier
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="FichierRcv"
                    name="FichierRcv"
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-4">
                  <label htmlFor="Numeropad" className="form-label">
                    PAD
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    id="Numeropad"
                    name="Numeropad"
                  />
                </div>
                <div className="col">
                  <label htmlFor="FichierPad" className="form-label">
                    Fichier
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="FichierPad"
                    name="FichierPad"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="Auenlevement" className="form-label">
                  Autorisation d'enlevement
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="Auenlevement"
                  name="Auenlevement"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Bsortie" className="form-label">
                  Bon de sortie
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="Bsortie"
                  name="Bsortie"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="autre" className="form-label">
                  Autre
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="autre"
                  name="autre"
                  multiple
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary mt-4">
              Ajouter Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjoutDocument;
