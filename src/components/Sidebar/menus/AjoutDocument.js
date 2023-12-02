import Breadcrumb from "../../Breadcrumb/Index";
import { useFormik } from "formik";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useState, useEffect, useRef } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Fragment } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const AjoutDocument = () => {
  console.log('Ajout Document est monte');
  const breadcrumbLinks = ["Gestion Documents", "Ajout Document"];
  const form1 = useRef(null);
  const form2 = useRef(null);
  const form3 = useRef(null);
  const form4 = useRef(null);
  const form5 = useRef(null);
  const form6 = useRef(null);
  const form7 = useRef(null);
  const form8 = useRef(null);
  const form9 = useRef(null);
  const form10 = useRef(null);
  const form11 = useRef(null);
  const form12 = useRef(null);

  const [loading, setLoading] = useState(true);
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [donneesEnvoiDoc, setDonneesEnvoiDoc] = useState([]);
  const storage = getStorage();
  const [totalProgress, setTotalProgress] = useState(0);
  const [televerseShow, setTeleverseShow] = useState(false);
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

  const queryDoc = query(collection(db, "Documents"));

  useEffect(() => {
    const unsubscribe = onSnapshot(queryDoc, (querySnapchot) => {
      const datas = [];
      querySnapchot.forEach((doc) => {
        datas.push(doc.data());
      });

      if (JSON.stringify(datas) !== JSON.stringify(donneesEnvoiDoc)) {
        setDonneesEnvoiDoc(datas);
      }

      setLoading(false);
      return () => {
        unsubscribe();
      };
    });
  }, [queryDoc, donneesEnvoiDoc]);

  const numerosSuiviDejaAjoutes = donneesEnvoiDoc && donneesEnvoiDoc.map((item) => item.NumeroSuivi);

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



  const initialValues = {
    suivi: "",
    cbl: "",
    fichierCbl: "",
    date: null,
    Nfacture: "",
    Ffacture: "",
    Lcolissage: "",
    Corigine: "",
    CphytoSanitaire: "",
    Numerorcv: "",
    FichierRcv: "",
    Numeropad: "",
    FichierPad: "",
    Numerodeclaration: "",
    Fichierdeclaration: "",
    Numeroquittance: "",
    Fichierquittance: "",
    Auenlevement: "",
    Bsortie: "",
    files: [],
  };

  const onSubmit = (values) => {
    const uploadTasks = [];
    const formattedDate = values.date ? format(new Date(values.date), 'dd/MM/yyyy') : '';
    const fileInputNames = ["fichierCbl", "Ffacture", "Lcolissage", "Corigine", "CphytoSanitaire", "FichierRcv", "FichierPad", "Fichierdeclaration", "Fichierquittance", "Auenlevement", "Bsortie", "files"];
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
            FihierCbl: downloadURLs[0] || '',
            date: formattedDate || '',
            numeroFacture: values.Nfacture || '',
            Ffacture: downloadURLs[1] || '',
            listeColissage: downloadURLs[2] || '',
            certificatOrigine: downloadURLs[3] || '',
            certificatPhytoSanitaire: downloadURLs[4] || '',
            RCV: values.Numerorcv || '',
            fichierRCV: downloadURLs[5] || '',
            PAD: values.Numeropad || '',
            FichierPAD: downloadURLs[6] || '',
            numeroDeclaration: values.Numerodeclaration || '',
            Fichierdeclaration: downloadURLs[7] || '',
            Numeroquittance: values.Numeroquittance || '',
            Fichierquittance: downloadURLs[8] || '',
            autorisationEnlevement: downloadURLs[9] || '',
            bonSortie: downloadURLs[10] || '',
            autres: downloadURLs.length < 12 ? [] : downloadURLs.length > 12 ? downloadURLs.slice(11) : [downloadURLs[11]] || [],
          });
          formik.handleReset();
          if (form12.current) {
            form12.current.value = null;
          }


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

    if (!values.fichierCbl) {
      errors.fichierCbl = "Ce champ est obligatoire";
    }
    else if (form1.current.files[0].type !== "application/pdf") {
      errors.fichierCbl = "Choisissez un fichier PDF"
    }

    if (values.date === null) {
      errors.date = "Ce champ est obligatoire";
    }

    if (!values.Nfacture) {
      errors.Nfacture = "Ce champ est obligatoire";
    } else if (isNaN(values.Nfacture)) {
      errors.Nfacture = "Veuillez entrer un nombre valide";
    }
    if (!values.Ffacture) {
      errors.Ffacture = "Ce champ est obligatoire";
    } else if (form2.current.files[0].type !== "application/pdf") {
      errors.Ffacture = "Choisissez un fichier PDF";
    }

    if (!values.Lcolissage) {
      errors.Lcolissage = "Ce champ est obligatoire";
    } else if (form3.current.files[0].type !== "application/pdf") {
      errors.Lcolissage = "Choisissez un fichier PDF";
    }
    if (!values.Corigine) {
      errors.Corigine = "Ce champ est obligatoire";
    } else if (form4.current.files[0].type !== "application/pdf") {
      errors.Corigine = "Choisissez un fichier PDF";
    }
    if (!values.CphytoSanitaire) {
      errors.CphytoSanitaire = "Ce champ est obligatoire";
    } else if (form5.current.files[0].type !== "application/pdf") {
      errors.CphytoSanitaire = "Choisissez un fichier PDF";
    }
    if (!values.Numerorcv) {
      errors.Numerorcv = "Ce champ est obligatoire";
    } 

    if (!values.FichierRcv) {
      errors.FichierRcv = "Ce champ est obligatoire";
    } else if (form6.current.files[0].type !== "application/pdf") {
      errors.FichierRcv = "Choisissez un fichier PDF";
    }
    if (!values.Numeropad) {
      errors.Numeropad = "Ce champ est obligatoire";
    }
    if (!values.FichierPad) {
      errors.FichierPad = "Ce champ est obligatoire";
    } else if (form7.current.files[0].type !== "application/pdf") {
      errors.FichierPad = "Choisissez un fichier PDF";
    }

    if (!values.Numerodeclaration) {
      errors.Numerodeclaration = "Ce champ est obligatoire";
    } 

    if (!values.Fichierdeclaration) {
      errors.Fichierdeclaration = "Ce champ est obligatoire";
    } else if (form8.current.files[0].type !== "application/pdf") {
      errors.Fichierdeclaration = "Choisissez un fichier PDF";
    }

    if (!values.Numeroquittance) {
      errors.Numeroquittance = "Ce champ est obligatoire";
    } 

    if (!values.Fichierquittance) {
      errors.Fichierquittance = "Ce champ est obligatoire";
    } else if (form9.current.files[0].type !== "application/pdf") {
      errors.Fichierquittance = "Choisissez un fichier PDF";
    }


    if (!values.Auenlevement) {
      errors.Auenlevement = "Ce champ est obligatoire";
    } else if (form10.current.files[0].type !== "application/pdf") {
      errors.Auenlevement = "Choisissez un fichier PDF";
    }
    if (!values.Bsortie) {
      errors.Bsortie = "Ce champ est obligatoire";
    } else if (form11.current.files[0].type !== "application/pdf") {
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
                        return <option key={index} disabled={numerosSuiviDejaAjoutes.includes(`${i.numeroSuivi} - ${i.client}`)}>{i.numeroSuivi} - {i.client}</option>;
                      })}
                    </select>
                    {formik.touched.suivi && formik.errors.suivi ? (
                      <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.suivi}</p></div>
                    ) : null}
                  </div>
                  <div className="row mb-4">
                    <div className="col-4">
                      <label htmlFor="cbl" className="form-label">
                        C BL-LTA
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
                    <div className="col">
                      <label htmlFor="Lcolissage" className="form-label">
                        Fichier
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="fichierCbl"
                        name="fichierCbl"
                        accept=".pdf"
                        onChange={(event) => formik.setFieldValue("fichierCbl", event.target.files[0])}
                        ref={form1}
                        style={{ border: formik.touched.fichierCbl && formik.errors.fichierCbl ? "1px solid red" : "" }}
                      />
                      {formik.touched.fichierCbl && formik.errors.fichierCbl ? (
                        <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.fichierCbl}</p></div>
                      ) : null}

                    </div>
                  </div>

                  <div id="formFacture" className="mb-3">
                    <div className="row mb-4">
                      <div className="col-4">
                        <label style={{ display: 'block' }} htmlFor="Date" className="form-label">
                          Date
                        </label>
                        <DatePicker
                          className={`form-control ${formik.touched.date && formik.errors.date ? "is-invalid" : ""}`}
                          id="date"
                          name="date"
                          selected={formik.values.date}
                          onChange={(date) => formik.setFieldValue('date', date)}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="JJ/MM/AAAA"
                        />
                        {formik.touched.date && formik.errors.date && (
                          <div className="invalid-feedback">{formik.errors.date}</div>
                        )}
                        {formik.touched.date && formik.errors.date ? (
                          <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.date}</p></div>
                        ) : null}

                      </div>
                      <div className="col">
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
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <label htmlFor="Ffacture" className="form-label">
                          Fichier
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="Ffacture"
                          name="Ffacture"
                          accept=".pdf"
                          ref={form2}
                          onChange={(event) => formik.setFieldValue("Ffacture", event.target.files[0])}
                          style={{ border: formik.touched.Ffacture && formik.errors.Ffacture ? "1px solid red" : "" }}
                        />
                        {formik.touched.Ffacture && formik.errors.Ffacture ? (
                          <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.Ffacture}</p></div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="Lcolissage" className="form-label">
                      Liste colisage
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="Lcolissage"
                      name="Lcolissage"
                      accept=".pdf"
                      onChange={(event) => formik.setFieldValue("Lcolissage", event.target.files[0])}
                      ref={form3}
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
                      ref={form4}
                      onChange={(event) => formik.setFieldValue("Corigine", event.target.files[0])}
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
                      ref={form5}
                      onChange={(event) => formik.setFieldValue("CphytoSanitaire", event.target.files[0])}
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
                        type="text"
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
                        ref={form6}
                        onChange={(event) => formik.setFieldValue("FichierRcv", event.target.files[0])}
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
                        type="text"
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
                        ref={form7}
                        onChange={(event) => formik.setFieldValue("FichierPad", event.target.files[0])}
                        style={{ border: formik.touched.FichierPad && formik.errors.FichierPad ? "1px solid red" : "" }}
                      />
                      {formik.touched.FichierPad && formik.errors.FichierPad ? (
                        <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.FichierPad}</p></div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-4">
                      <label htmlFor="Numerodeclaration" className="form-label">
                        Declaration
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="Numerodeclaration"
                        name="Numerodeclaration"
                        onChange={formik.handleChange}
                        value={formik.values.Numerodeclaration}
                        style={{ border: formik.touched.Numerodeclaration && formik.errors.Numerodeclaration ? "1px solid red" : "" }}
                      />
                      {formik.touched.Numerodeclaration && formik.errors.Numerodeclaration ? (
                        <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.Numerodeclaration}</p></div>
                      ) : null}
                    </div>

                    <div className="col">
                      <label htmlFor="Fichierdeclaration" className="form-label">
                        Fichier
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="Fichierdeclaration"
                        name="Fichierdeclaration"
                        accept=".pdf"
                        ref={form8}
                        onChange={(event) => formik.setFieldValue("Fichierdeclaration", event.target.files[0])}
                        style={{ border: formik.touched.Fichierdeclaration && formik.errors.Fichierdeclaration ? "1px solid red" : "" }}
                      />
                      {formik.touched.Fichierdeclaration && formik.errors.Fichierdeclaration ? (
                        <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.Fichierdeclaration}</p></div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-4">
                      <label htmlFor="Numeroquittance" className="form-label">
                        Quittance
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="Numeroquittance"
                        name="Numeroquittance"
                        onChange={formik.handleChange}
                        value={formik.values.Numeroquittance}
                        style={{ border: formik.touched.Numeroquittance && formik.errors.Numeroquittance ? "1px solid red" : "" }}
                      />
                      {formik.touched.Numeroquittance && formik.errors.Numeroquittance ? (
                        <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.Numeroquittance}</p></div>
                      ) : null}
                    </div>

                    <div className="col">
                      <label htmlFor="Fichierquittance" className="form-label">
                        Fichier
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="Fichierquittance"
                        name="Fichierquittance"
                        accept=".pdf"
                        ref={form9}
                        onChange={(event) => formik.setFieldValue("Fichierquittance", event.target.files[0])}
                        style={{ border: formik.touched.Fichierquittance && formik.errors.Fichierquittance ? "1px solid red" : "" }}
                      />
                      {formik.touched.Fichierquittance && formik.errors.Fichierquittance ? (
                        <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.Fichierquittance}</p></div>
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
                      ref={form10}
                      onChange={(event) => formik.setFieldValue("Auenlevement", event.target.files[0])}
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
                      ref={form11}
                      onChange={(event) => formik.setFieldValue("Bsortie", event.target.files[0])}
                      style={{ border: formik.touched.Bsortie && formik.errors.Bsortie ? "1px solid red" : "" }}
                    />
                    {formik.touched.Bsortie && formik.errors.Bsortie ? (
                      <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.Bsortie}</p></div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="autre" className="form-label">
                      Autre (facultatif)
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="autre"
                      name="files"
                      accept=".pdf"
                      ref={form12}
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