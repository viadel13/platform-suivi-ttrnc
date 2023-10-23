import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

const Register = () => {
  const [menuActif, setMenuActif] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      console.log("valeur", values);
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
      } else if (values.password.length !== 8) {
        errors.password = "Veuillez entrer exactement 8 caractères";
      }

      return errors;
    },
  });

  useEffect(() => {
    setMenuActif("active");
    return () => {
      setMenuActif("");
    };
  }, []);

  return (
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
  );
};

export default Register;
