import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { modalEtat } from "../../../redux/reducers/rootReducer";
import { useSelector } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Breadcrumb from "../../Breadcrumb/Index";
import ModalAddClient from "../../ModalAddClient/Index";
import { IoReloadOutline } from "react-icons/io5";

const AjoutClient = () => {

  const breadcrumbLinks = ["Gestion Clients", "Ajout un client"];
  const [showModal, setShowModal] = useState(false);
  const [statutClient, setStatutClient] = useState("");
  const [choixError, selectCHoixError] = useState(false);
  const dispatch = useDispatch();
  const modalShowEtat = useSelector((state) => state.platformeSuivi.modalEtat);

  const auth = getAuth();

  useEffect(() => {
    return () => {
      dispatch(modalEtat(true));
      selectCHoixError(false);
    }
  }, [dispatch]);

  console.log('error  client' , choixError)

  useLayoutEffect(() => {
    if (statutClient === "") {
      setShowModal(true);
    } else if (statutClient === "close") {
      selectCHoixError(true);
    } else {
      setShowModal(false);
      selectCHoixError(false);
    }
  }, [statutClient, setShowModal, selectCHoixError]);

  const obtenirDateActuelle = () => {
    const date = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateFormatee = date.toLocaleDateString('fr-FR', options);
    return dateFormatee;
  }

  const formik = useFormik({
    initialValues: {
      niu: "",
      email: "",
      sexe: "",
      nom: "",
      telephone: "",
      password: "",
      prenom: "",
      entreprise: "",
      siege: "",
    },

    onSubmit: (values) => {
      register();
      formik.handleReset();
    },

    validate: (values) => {
      let errors = {};

      if (!values.niu) {
        errors.niu = "Ce champ est obligatoire";
      }

      if (!values.nom) {
        errors.nom = "Ce champ est obligatoire";
      }

      if (!values.prenom) {
        errors.prenom = "Ce champ est obligatoire";
      }

      if (!values.email) {
        errors.email = "Ce champ est obligatoire";
      }

      if (!values.telephone) {
        errors.telephone = "Ce champ est obligatoire";
      } else if (isNaN(values.telephone)) {
        errors.telephone = "Veuillez entrer un nombre valide";
      }

      if (statutClient === "entreprise") {
        if (!values.entreprise) {
          errors.entreprise = "Ce champ est obligatoire";
        }
      }

      if (!values.sexe) {
        errors.sexe = "Ce champ est obligatoire";
      }

      if (!values.password) {
        errors.password = "Ce champ est obligatoire";
      } else if (values.password.length < 8) {
        errors.password = "Veuillez entrer au moins 8 caractères";
      }


      if (statutClient === "entreprise") {
        if (!values.siege) {
          errors.siege = "Ce champ est obligatoire";
        }
      }
      return errors;
    },
  });

  async function register() {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      );
      if (response.user) {
        const userUID = response.user.uid;

        // Créez un document dans la collection "Clients" avec l'UID de l'utilisateur comme ID
        try {
          const userDocRef = doc(db, "Clients", userUID);
          await setDoc(userDocRef, {
            niu: formik.values.niu,
            email: formik.values.email,
            sexe: formik.values.sexe,
            nom: formik.values.nom,
            telephone: formik.values.telephone,
            password: formik.values.password,
            prenom: formik.values.prenom,
            entreprise: formik.values.entreprise,
            siege: formik.values.siege,
            date: obtenirDateActuelle(),
          });
        } catch (error) {
          console.log(error.message);
        }

        toast.success("Client cree avec success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      if (navigator.onLine === false) {
        // Pas de connexion Internet

        toast.error(
          "Pas de connexion Internet. Veuillez vérifier votre connexion.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      } else if (error.code === "auth/email-already-in-use") {
        formik.handleReset();
        toast.error("Utilisateur existe deja ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Une erreur s' est produite lors de la connexion", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }

  function handleReload() {
    window.location.reload();
  }

  const showComponent = showModal ? (
    <ModalAddClient show={modalShowEtat} setStatutClient={setStatutClient} />
  ) : (
    <div className="container-fluid ajoutClient">
      <div>
        <h2 className="fs-4" style={{ fontWeight: "600" }}>
          Ajouter un client
        </h2>
        <Breadcrumb links={breadcrumbLinks} />
      </div>
      <div className="card-ajoutClient container-fluid">
        <form className="form-client" onSubmit={formik.handleSubmit}>
          <div className="row gx-5">
            <div className="col-12 col-md-4 col-lg-4">
              <div className="mb-3">
                <label htmlFor="niu" className="form-label">
                  NIU
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="niu"
                  name="niu"
                  onChange={formik.handleChange}
                  value={formik.values.niu}
                  style={{
                    border:
                      formik.touched.niu && formik.errors.niu
                        ? "1px solid red"
                        : "",
                  }}
                />
                {formik.touched.niu && formik.errors.niu ? (
                  <div className="text-danger mb-4">
                    <p style={{ fontSize: "15px" }}>{formik.errors.niu}</p>
                  </div>
                ) : null}
              </div>
              {statutClient === "entreprise" && (
                <div className="mb-3">
                  <label htmlFor="entreprise" className="form-label">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="entreprise"
                    name="entreprise"
                    onChange={formik.handleChange}
                    value={formik.values.entreprise}
                    style={{
                      border:
                        formik.touched.entreprise && formik.errors.entreprise
                          ? "1px solid red"
                          : "",
                    }}
                  />
                  {formik.touched.entreprise && formik.errors.entreprise ? (
                    <div className="text-danger mb-4">
                      <p style={{ fontSize: "15px" }}>
                        {formik.errors.entreprise}
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
              {/* ici est le champ nom visible seulemt sur les ecrans de petites  taille */}
              <div className="mb-3 d-lg-none d-md-none">
                <label htmlFor="nomSm" className="form-label">
                  Nom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nomSm"
                  name="nom"
                  onChange={formik.handleChange}
                  value={formik.values.nom}
                  style={{
                    border:
                      formik.touched.nom && formik.errors.nom
                        ? "1px solid red"
                        : "",
                  }}
                />
                {formik.touched.nom && formik.errors.nom ? (
                  <div className="text-danger mb-4">
                    <p style={{ fontSize: "15px" }}>{formik.errors.nom}</p>
                  </div>
                ) : null}
              </div>
              {/* fin*/}

              {/* ici est le champ nom visible seulemt sur les ecrans de petites taille */}
              <div className="mb-3 d-lg-none d-md-none">
                <label htmlFor="prenomSm" className="form-label">
                  Prenom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prenomSm"
                  name="prenom"
                  onChange={formik.handleChange}
                  value={formik.values.prenom}
                  style={{
                    border:
                      formik.touched.prenom && formik.errors.prenom
                        ? "1px solid red"
                        : "",
                  }}
                />
                {formik.touched.prenom && formik.errors.prenom ? (
                  <div className="text-danger mb-4">
                    <p style={{ fontSize: "15px" }}>{formik.errors.prenom}</p>
                  </div>
                ) : null}
              </div>
              {/* fin*/}

              {/* ici est le champ nom visible seulemt sur les ecrans de petites taille */}
              {statutClient === "entreprise" && (
                <div className="mb-3 d-lg-none d-md-none">
                  <label htmlFor="siege" className="form-label">
                    Siege
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="siegeSm"
                    name="siege"
                    onChange={formik.handleChange}
                    value={formik.values.siege}
                    style={{
                      border:
                        formik.touched.siege && formik.errors.siege
                          ? "1px solid red"
                          : "",
                    }}
                  />
                  {formik.touched.siege && formik.errors.siege ? (
                    <div className="text-danger  mb-4">
                      <p style={{ fontSize: "15px" }}>{formik.errors.siege}</p>
                    </div>
                  ) : null}
                </div>
              )}

              {/* fin*/}

              {/* ici est le champ nom visible seulemt sur les ecrans de petites taille */}
              <div className="mb-3 d-lg-none d-md-none">
                <label htmlFor="telephone" className="form-label">
                  Telephone
                </label>
                <PhoneInput
                  placeholder="Enter phone number"
                  id="telephoneSm"
                  name="telephone"
                  value={formik.values.telephone}
                  onChange={(value) => formik.setFieldValue("telephone", value)}
                  style={{
                    border:
                      formik.touched.telephone && formik.errors.telephone
                        ? "1px solid red"
                        : "",
                  }}
                />
                {formik.touched.telephone && formik.errors.telephone ? (
                  <div className="text-danger mb-4">
                    {formik.errors.telephone}
                  </div>
                ) : null}
              </div>
              {/* fin*/}
              <div>
                <label className="mb-3">Sexe</label>
                <div className="mb-3 d-flex">
                  <div className="form-check mb-2 me-2">
                    <input
                      className="form-check-input "
                      type="radio"
                      name="sexe"
                      id="homme"
                      value="homme"
                      checked={formik.values.sexe === "homme"} // Vérifiez si la valeur est "homme"
                      onChange={(e) =>
                        formik.setFieldValue("sexe", e.target.value)
                      }
                      style={{
                        border:
                          formik.touched.sexe && formik.errors.sexe
                            ? "1px solid red"
                            : "",
                      }}
                    />
                    <label className="form-check-label" htmlFor="homme">
                      Homme
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sexe"
                      id="femme"
                      value="femme"
                      checked={formik.values.sexe === "femme"} // Vérifiez si la valeur est "femme"
                      onChange={(e) =>
                        formik.setFieldValue("sexe", e.target.value)
                      }
                      style={{
                        border:
                          formik.touched.sexe && formik.errors.sexe
                            ? "1px solid red"
                            : "",
                      }}
                    />

                    <label className="form-check-label" htmlFor="femme">
                      Femme
                    </label>
                  </div>
                </div>
                {formik.touched.sexe && formik.errors.sexe ? (
                  <div className="text-danger">
                    <p style={{ fontSize: "15px" }}>{formik.errors.sexe}</p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* ici est le champ nom visible seulemt sur les ecrans de grande taille */}
            <div className="col-12 col-md-4 col-lg-4">
              <div className="mb-3  d-none d-lg-block d-md-block">
                <label htmlFor="nom" className="form-label">
                  Nom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  name="nom"
                  onChange={formik.handleChange}
                  value={formik.values.nom}
                  style={{
                    border:
                      formik.touched.nom && formik.errors.nom
                        ? "1px solid red"
                        : "",
                  }}
                />
                {formik.touched.nom && formik.errors.nom ? (
                  <div className="text-danger mb-4">
                    <p style={{ fontSize: "15px" }}>{formik.errors.nom}</p>
                  </div>
                ) : null}
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
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  style={{
                    border:
                      formik.touched.email && formik.errors.email
                        ? "1px solid red"
                        : "",
                  }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger mb-4">
                    <p style={{ fontSize: "15px" }}>{formik.errors.email}</p>
                  </div>
                ) : null}
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
                  autoComplete="false"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  style={{
                    border:
                      formik.touched.password && formik.errors.password
                        ? "1px solid red"
                        : "",
                  }}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger mb-4">
                    <p style={{ fontSize: "15px" }}>{formik.errors.password}</p>
                  </div>
                ) : null}
              </div>
            </div>
            {/* fin*/}

            <div className="col-12 col-md-4 col-lg-4">
              {/* ici est le champ nom visible seulemt sur les ecrans de grande taille */}
              <div className="mb-3 d-none d-lg-block d-md-block">
                <label htmlFor="prenom" className="form-label">
                  Prenom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  name="prenom"
                  onChange={formik.handleChange}
                  value={formik.values.prenom}
                  style={{
                    border:
                      formik.touched.prenom && formik.errors.prenom
                        ? "1px solid red"
                        : "",
                  }}
                />
                {formik.touched.prenom && formik.errors.prenom ? (
                  <div className="text-danger mb-4">
                    <p style={{ fontSize: "15px" }}>{formik.errors.prenom}</p>
                  </div>
                ) : null}
              </div>
              {/* fin*/}

              {/* ici est le champ nom visible seulemt sur les ecrans de grande taille */}
              <div className="mb-3 d-none d-lg-block d-md-block">
                <label htmlFor="telephone" className="form-label">
                  Telephone
                </label>
                <PhoneInput
                  placeholder="Enter phone number"
                  id="telephone"
                  name="telephone"
                  value={formik.values.telephone}
                  onChange={(value) => formik.setFieldValue("telephone", value)}
                  style={{
                    border:
                      formik.touched.telephone && formik.errors.telephone
                        ? "1px solid red"
                        : "",
                  }}
                />
                {formik.touched.telephone && formik.errors.telephone ? (
                  <div className="text-danger mb-4">
                    {formik.errors.telephone}
                  </div>
                ) : null}
              </div>
              {/* fin*/}

              {/* ici est le champ nom visible seulemt sur les ecrans de grande taille */}
              {statutClient === "entreprise" && (
                <div className="mb-3 d-none d-lg-block d-md-block">
                  <label htmlFor="siege" className="form-label">
                    Siege
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="siege"
                    name="siege"
                    onChange={formik.handleChange}
                    value={formik.values.siege}
                    style={{
                      border:
                        formik.touched.siege && formik.errors.siege
                          ? "1px solid red"
                          : "",
                    }}
                  />
                  {formik.touched.siege && formik.errors.siege ? (
                    <div className="text-danger  mb-4">
                      <p style={{ fontSize: "15px" }}>{formik.errors.siege}</p>
                    </div>
                  ) : null}
                </div>
              )}
              {/* fin*/}
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

  return (
    <>
      {!choixError ? (
        showComponent
      ) : (
        <div className="container-fluid choixError  d-flex  flex-column  align-items-center justify-content-center">
          <h2>Erreur</h2>
          <h3 className="text-center mt-2">
            veuillez selectionner une option svp
          </h3>
          <h3 className="text-center mt-2">
            recharger la page <br /> <p className="mt-2">&#128071;</p>
          </h3>
          <IoReloadOutline
            id="reload"
            className="mt-2"
            color="#237FD8"
            style={{ cursor: "pointer" }}
            onClick={handleReload}
          />
        </div>
      )}
    </>
  );
};

export default AjoutClient;
