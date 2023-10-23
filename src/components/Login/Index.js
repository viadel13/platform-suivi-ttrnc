import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user) {
        setTimeout(() => {
          setLoading(false);
          navigate("/dashboard", { replace: true });
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
        setError(false);
      } else if (error.code === "auth/invalid-login-credentials") {
        setError(true);
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
        setError(true);
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
              className={`nav-link btl ${menuActif}`}
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
              className="nav-link btr"
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
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
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
                  autoComplete="true"
                  style={{ border: error ? "1px solid red" : "" }}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
                <button type="submit" className="btn btn-primary w-100 ">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return <>{showLogin}</>;
};

export default Login;
