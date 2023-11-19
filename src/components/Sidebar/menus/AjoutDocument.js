import Breadcrumb from "../../Breadcrumb/Index";
import { useFormik } from "formik";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useState, useEffect, useRef } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Fragment } from "react";
import { toast } from "react-toastify";

const AjoutDocument = () => {
  const breadcrumbLinks = ["Gestion Documents", "Ajout Document"];
  const form1 = useRef(null);
  const form2 = useRef(null);
  const form3 = useRef(null);
  const form4 = useRef(null);
  const form5 = useRef(null);
  const form6 = useRef(null);
  const form7 = useRef(null);
  const form8 = useRef(null);

  const [loading, setLoading] = useState(true);
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const storage = getStorage();
  const [totalProgress, setTotalProgress] = useState(0);
  const [televerseShow, setTeleverseShow] = useState(false);

  const q = query(collection(db, "DatasEnvoi"));

  useEffect(() => {
    if (televerseShow) {
      // Faites défiler la page vers le haut
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [televerseShow]);

  useEffect(() => {
    if (totalProgress >= 100) {
      const timeout = setTimeout(() => {
        setTeleverseShow(false);
        setTotalProgress(0);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [totalProgress, setTeleverseShow]);


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


  const initialValues = {
    suivi: "",
    cbl: "",
    Nfacture: "",
    Lcolissage: "",
    Corigine: "",
    CphytoSanitaire: "",
    Numerorcv: "",
    FichierRcv: "",
    Numeropad: "",
    FichierPad: "",
    Auenlevement: "",
    Bsortie: "",
    files: [],
  };

  const onSubmit = (values) => {
    const uploadTasks = [];
    const fileInputNames = ["Lcolissage", "Corigine", "CphytoSanitaire", "FichierRcv", "FichierPad", "Auenlevement", "Bsortie", "files"];
    setTeleverseShow(true);

    const promises = [];

    fileInputNames.forEach((fieldName) => {
      const file = fieldName === "files" ? values.files : document.getElementById(fieldName).files;
      if (file && file.length > 0) {
        Array.from(file).forEach((currentFile, index) => {
          const metadata = {
            contentType: ' file.type'
          }

          const storageRef = ref(storage, currentFile.name);
          const uploadTask = uploadBytesResumable(storageRef, currentFile, metadata);

          uploadTasks.push(uploadTask);

          const promise = new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {

                let totalBytesTransferred = 0;
                let totalTotalBytes = 0;

                uploadTasks.forEach((task) => {
                  totalBytesTransferred += task.snapshot.bytesTransferred;
                  totalTotalBytes += task.snapshot.totalBytes;
                });

                const progress = (totalBytesTransferred / totalTotalBytes) * 100;
                setTotalProgress(progress.toFixed(0));

                // console.log(`Total Upload Progress: ${progress.toFixed(2)}%`);
              },
              (error) => {
                // Handle errors
                console.error(`Error uploading ${fieldName} (file ${index + 1}):`, error);
                reject(error);
              },
              () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  // console.log(`File for ${fieldName} (file ${index + 1}) available at`, downloadURL);
                  resolve(downloadURL);
                }).catch((error) => {
                  reject(error);
                })
              }

            );
          });

          promises.push(promise);

        });

      }
    });

    Promise.all(promises)
      .then(async (downloadURLs) => {
        // Tous les liens de fichiers téléversés ont été récupérés
        console.log("Liens de téléchargement :", downloadURLs);
        console.log("mon values", values);
        try {
          await addDoc(collection(db, "Documents"), {
            NumeroSuivi: values.suivi || '',
            ConnaissementBL: values.cbl || '',
            numeroFacture: values.Nfacture || '',
            listeColissage: downloadURLs[0] || '',
            certificatOrigine: downloadURLs[1] || '',
            certificatPhytoSanitaire: downloadURLs[2] || '',
            RCV: values.Numerorcv || '',
            fichierRCV: downloadURLs[3] || '',
            PAD: values.Numeropad || '',
            FichierPAD: downloadURLs[4] || '',
            autorisationEnlevement: downloadURLs[5] || '',
            bonSortie: downloadURLs[6] || '',
            autres: downloadURLs.length < 8 ? [] : downloadURLs.length > 8 ? downloadURLs.slice(7) : [downloadURLs[7]] || [],
          });
          formik.handleReset();
          form8.current.value = null;

        } catch (error) {
          console.log(error)
        }

      })
      .catch((error) => {
        // Gérer les erreurs éventuelles
        console.error("Erreur lors de la récupération des liens de téléchargement :", error);
      });

  };


  const validate = values => {
    let errors = {};

    if (!values.suivi) {
      errors.suivi = "Veuillez choisir un numero suivi";
    }
    if (!values.cbl) {
      errors.cbl = "Ce champ est obligatoire";
    }
    if (!values.Nfacture) {
      errors.Nfacture = "Ce champ est obligatoire";
    } else if (isNaN(values.Nfacture)) {
      errors.Nfacture = "Veuillez entrer un nombre valide";
    }
    if (!values.Lcolissage) {
      errors.Lcolissage = "Ce champ est obligatoire";
    } else if (form1.current.files[0].type !== "application/pdf") {
      errors.Lcolissage = "Choisissez un fichier PDF";
    }
    if (!values.Corigine) {
      errors.Corigine = "Ce champ est obligatoire";
    } else if (form2.current.files[0].type !== "application/pdf") {
      errors.Corigine = "Choisissez un fichier PDF";
    }
    if (!values.CphytoSanitaire) {
      errors.CphytoSanitaire = "Ce champ est obligatoire";
    } else if (form3.current.files[0].type !== "application/pdf") {
      errors.CphytoSanitaire = "Choisissez un fichier PDF";
    }
    if (!values.Numerorcv) {
      errors.Numerorcv = "Ce champ est obligatoire";
    } else if (isNaN(values.Numerorcv)) {
      errors.Numerorcv = "Veuillez entrer un nombre valide";
    }
    if (!values.FichierRcv) {
      errors.FichierRcv = "Ce champ est obligatoire";
    } else if (form4.current.files[0].type !== "application/pdf") {
      errors.FichierRcv = "Choisissez un fichier PDF";
    }
    if (!values.Numeropad) {
      errors.Numeropad = "Ce champ est obligatoire";
    } else if (isNaN(values.Numeropad)) {
      errors.Numeropad = "Veuillez entrer un nombre valide";
    }
    if (!values.FichierPad) {
      errors.FichierPad = "Ce champ est obligatoire";
    } else if (form5.current.files[0].type !== "application/pdf") {
      errors.FichierPad = "Choisissez un fichier PDF";
    }
    if (!values.Auenlevement) {
      errors.Auenlevement = "Ce champ est obligatoire";
    } else if (form6.current.files[0].type !== "application/pdf") {
      errors.Auenlevement = "Choisissez un fichier PDF";
    }
    if (!values.Bsortie) {
      errors.Bsortie = "Ce champ est obligatoire";
    } else if (form7.current.files[0].type !== "application/pdf") {
      errors.Bsortie = "Choisissez un fichier PDF";
    }
    if (values.files || values.files.length !== 0) {
      for (let i = 0; i < values.files.length; i++) {
        const file = values.files[i];
        if (file.type !== "application/pdf") {
          errors.files = "Choisissez des fichiers PDF uniquement";
          break; // Arrêter la boucle si un fichier non PDF est trouvé
        }
      }
    }

    return errors;
  }


  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="ajoutDocument container-fluid">
      {televerseShow ? (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center' }}>
          <span className="loader-telverse"></span>
          <Fragment>
            <div className="progress mt-3 mb-2" style={{ width: '300px' }}>
              <div className={`progress-bar progress-bar-striped progress-bar-animated ${totalProgress >= 100 && 'bg-success'}`} role="progressbar" style={{ width: `${totalProgress}%` }} aria-valuenow={totalProgress} aria-valuemin="0" aria-valuemax="100">
                {totalProgress}%
              </div>
            </div>
            <small>{totalProgress >= 100 ? 'Televersement termine avec succès' : 'Televersement en cours, merci de patienter...'}</small>
          </Fragment>
        </div>
      ) : (
        <Fragment>
          <div className="mb-2">
            <h2 className="fs-4" style={{ fontWeight: "600" }}>
              Ajouter un document
            </h2>
            <Breadcrumb links={breadcrumbLinks} />
          </div>
          <div className="container-fluid card-ajoutDocument">
            <form className="form-document" onSubmit={formik.handleSubmit}>
              <div className="row gx-5">
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="mb-4">
                    <label htmlFor="Nsuivi" className="form-label">
                      Numero suivi
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={formik.handleChange}
                      value={formik.values.suivi}
                      name="suivi"
                      id="Nsuivi"
                      style={{ border: formik.touched.suivi && formik.errors.suivi ? "1px solid red" : "" }}
                    >
                      <option value="">Choisir un numero</option>
                      {donneesEnvoi.map((i, index) => {
                        return <option key={index}>{i.numeroSuivi} - {i.client}</option>;
                      })}
                    </select>
                    {formik.touched.suivi && formik.errors.suivi ? (
                      <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.suivi}</p></div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="cbl" className="form-label">
                      Connaissement-BL-LTA
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cbl"
                      name="cbl"
                      onChange={formik.handleChange}
                      value={formik.values.cbl}
                      style={{ border: formik.touched.cbl && formik.errors.cbl ? "1px solid red" : "" }}
                    />
                    {formik.touched.cbl && formik.errors.cbl ? (
                      <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.cbl}</p></div>
                    ) : null}
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
                      onChange={formik.handleChange}
                      value={formik.values.Nfacture}
                      style={{ border: formik.touched.Nfacture && formik.errors.Nfacture ? "1px solid red" : "" }}
                    />
                    {formik.touched.Nfacture && formik.errors.Nfacture ? (
                      <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.Nfacture}</p></div>
                    ) : null}
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
                      accept=".pdf"
                      onChange={formik.handleChange}
                      ref={form1}
                      value={formik.values.Lcolissage}
                      style={{ border: formik.touched.Lcolissage && formik.errors.Lcolissage ? "1px solid red" : "" }}
                    />
                    {formik.touched.Lcolissage && formik.errors.Lcolissage ? (
                      <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.Lcolissage}</p></div>
                    ) : null}
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
                      accept=".pdf"
                      onChange={formik.handleChange}
                      ref={form2}
                      value={formik.values.Corigine}
                      style={{ border: formik.touched.Corigine && formik.errors.Corigine ? "1px solid red" : "" }}
                    />
                    {formik.touched.Corigine && formik.errors.Corigine ? (
                      <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.Corigine}</p></div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="CphytoSanitaire" className="form-label">
                      Certificat phyto-sanitaire
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      name="CphytoSanitaire"
                      id="CphytoSanitaire"
                      accept=".pdf"
                      onChange={formik.handleChange}
                      ref={form3}
                      value={formik.values.CphytoSanitaire}
                      style={{ border: formik.touched.CphytoSanitaire && formik.errors.CphytoSanitaire ? "1px solid red" : "" }}
                    />
                    {formik.touched.CphytoSanitaire && formik.errors.CphytoSanitaire ? (
                      <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.CphytoSanitaire}</p></div>
                    ) : null}
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
                        onChange={formik.handleChange}
                        value={formik.values.Numerorcv}
                        style={{ border: formik.touched.Numerorcv && formik.errors.Numerorcv ? "1px solid red" : "" }}
                      />
                      {formik.touched.Numerorcv && formik.errors.Numerorcv ? (
                        <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.Numerorcv}</p></div>
                      ) : null}
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
                        accept=".pdf"
                        onChange={formik.handleChange}
                        ref={form4}
                        value={formik.values.FichierRcv}
                        style={{ border: formik.touched.FichierRcv && formik.errors.FichierRcv ? "1px solid red" : "" }}
                      />
                      {formik.touched.FichierRcv && formik.errors.FichierRcv ? (
                        <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.FichierRcv}</p></div>
                      ) : null}
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
                        onChange={formik.handleChange}
                        value={formik.values.Numeropad}
                        style={{ border: formik.touched.Numeropad && formik.errors.Numeropad ? "1px solid red" : "" }}
                      />
                      {formik.touched.Numeropad && formik.errors.Numeropad ? (
                        <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.Numeropad}</p></div>
                      ) : null}
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
                        accept=".pdf"
                        onChange={formik.handleChange}
                        ref={form5}
                        value={formik.values.FichierPad}
                        style={{ border: formik.touched.FichierPad && formik.errors.FichierPad ? "1px solid red" : "" }}
                      />
                      {formik.touched.FichierPad && formik.errors.FichierPad ? (
                        <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.FichierPad}</p></div>
                      ) : null}
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
                      accept=".pdf"
                      name="Auenlevement"
                      onChange={formik.handleChange}
                      ref={form6}
                      value={formik.values.Auenlevement}
                      style={{ border: formik.touched.Auenlevement && formik.errors.Auenlevement ? "1px solid red" : "" }}
                    />
                    {formik.touched.Auenlevement && formik.errors.Auenlevement ? (
                      <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.Auenlevement}</p></div>
                    ) : null}
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
                      accept=".pdf"
                      onChange={formik.handleChange}
                      ref={form7}
                      value={formik.values.Bsortie}
                      style={{ border: formik.touched.Bsortie && formik.errors.Bsortie ? "1px solid red" : "" }}
                    />
                    {formik.touched.Bsortie && formik.errors.Bsortie ? (
                      <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.Bsortie}</p></div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="autre" className="form-label">
                      Autre
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="autre"
                      name="files"
                      accept=".pdf"
                      ref={form8}
                      multiple
                      onChange={(event) => {
                        formik.setFieldValue("files", event.currentTarget.files);
                      }}
                      style={{ border: formik.touched.files && formik.errors.files ? "1px solid red" : "" }}
                    />
                    {formik.touched.files && formik.errors.files ? (
                      <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.files}</p></div>
                    ) : null}
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
        </Fragment>
      )
      }




    </div>
  );
};

export default AjoutDocument;
