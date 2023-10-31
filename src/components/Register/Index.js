import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase/firebaseConfig";
import { doc, setDoc  } from "firebase/firestore";
import { toast } from "react-toastify";

const Register = () => {
  const [menuActif, setMenuActif] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    setMenuActif("active");
    return () => {
      setMenuActif("");
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      setLoading(true)
      setName(values.name);
      setEmail(values.email);
      setPassword(values.password);
      formik.handleReset();
    },

    validate: (values) => {
      let errors = {};

      if (!values.name) {
        errors.name = "Required";
      }

      if (!values.email) {
        errors.email = "Required";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Veuillez entrer au moins 8 caractères";
   
      }

      return errors;
    },
  });

  useEffect(() => {
    if (password && email) {
      register();
    }
  }, [password, email, name]);


  async function register() {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (response.user) {
        const userUID = response.user.uid;

      // Créez un document dans la collection "Clients" avec l'UID de l'utilisateur comme ID
      try {
        const userDocRef = doc(db, "Clients", userUID);
        await setDoc(userDocRef, {name,email});
      } catch (error) {
        console.log(error.message);
      }
        setTimeout(() => {
          setLoading(false);
          navigate("/", { replace: true });
          toast.success(
            "compte cree avec success",
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
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
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

  
  const showLogin = loading ? (
    <div className="load-logo">
      <span className="loader"></span>
    </div>
  ) : (
    <>
      <div className="card p-4">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item text-center">
            <Link
              className="nav-link btl"
              id="pills-home-tab"
              data-toggle="pill"
              to="/"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Login
            </Link>
          </li>
          <li className="nav-item text-center">
            <Link
              className={`nav-link btr ${menuActif}`}
              id="pills-profile-tab"
              data-toggle="pill"
              to="/register"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Signup
            </Link>
          </li>
        </ul>
        <div
          className="tab-pane "
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <div className="form px-4">
            <form onSubmit={formik.handleSubmit}>
              
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger mb-4">{formik.errors.name}</div>
              ) : null}

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger mb-4">{formik.errors.email}</div>
              ) : null}

              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={formik.handleChange}
                autoComplete="true"
                value={formik.values.password}
              />

              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger mb-4">{formik.errors.password}</div>
              ) : null}

              <button type="submit" className="btn btn-primary w-100">
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  return <>{showLogin}</>;
};

export default Register;
