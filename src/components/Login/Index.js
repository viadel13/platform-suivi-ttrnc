import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


const Login = () => {
  const [menuActif, setMenuActif] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMenuActif("active");
    return () => {
      setMenuActif("");
    };
  }, []);

  useEffect(()=>{
    handleSignOut();
  
  },[])

  const auth = getAuth();
  
  async function handleSignOut() {
      await signOut(auth);
  }
  const formik = useFormik({
    initialValues: {

      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      setEmail(values.email);
      setPassword(values.password);

      formik.handleReset();
    },

    validate: (values) => {
      let errors = {};

      if (!values.email) {
        errors.email = "Required";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
  });

  useEffect(() => {
    if (formik.values.email || formik.values.password) {
      setError(false);
    }
  }, [formik.values.email, formik.values.password]);

  useEffect(() => {
    if (password && email) {
      Authentification();
    }
  }, [password, email]);

  async function Authentification() {
    try {
      const auth = getAuth();

      // Effectuez votre appel API pour obtenir le jeton personnalisé côté backend
      const response = await axios.post("https://api-platform-suivi.onrender.com/signIn", {
        email: email,
        password: password,
      });

      // Récupérez le jeton personnalisé à partir de la réponse du backend
      const customToken = response.data.customToken;

      // Utilisez le jeton personnalisé pour vous connecter côté client
      await signInWithCustomToken(auth, customToken);

      setLoading(false);
      navigate("/dashboard", { replace: true });

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
        setError(false);
      } else if (
        (error.response && error.response.data.error === "InvalidCredentials") ||
        (error.response && error.response.data.error === "Invalid email or password")
      ) {
        setError(true);
      }
      
      else {
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
        setError(true);
      }
    }
  }

  const showLogin = loading ? (
    <div className="d-flex justify-content-center align-items-center p-2 login flex-column">
      <div className="load-logo">
        <span className="loader"></span>
      </div>
    </div>
  ) : (
    <>
      <div className="d-flex justify-content-center align-items-center p-2 login flex-column">

        <div className="card card-login p-4">
          <div className="d-flex justify-content-center">
            <h1 className="display-4" style={{ fontWeight: "400" }}>
              Login
            </h1>
          </div>
          <div className="form px-4 pt-5">
            <form onSubmit={formik.handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="form-control"
                placeholder="Email"
                style={{ border: error ? "1px solid red" : "" }}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger mb-4">{formik.errors.email}</div>
              ) : null}
              {error && (
                <div className="text-danger mb-4">
                  Incorrect Email or password.
                </div>
              )}
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="form-control"
                placeholder="Password"
                autoComplete="false"
                style={{ border: error ? "1px solid red" : "" }}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
              <div>
                <p className="d-flex justify-content-end">
                  <a href="#">Forget password ?</a>
                </p>
              </div>
              <button type="submit" className="btn btn-primary w-100 ">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  return <>{showLogin}</>;
};

export default Login;
