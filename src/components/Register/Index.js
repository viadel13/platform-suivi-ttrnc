import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Register = () => {

  const[menuActif, setMenuActif] = useState('');

  useEffect(()=>{
    setMenuActif('active');

    return ()=>{
      setMenuActif('');
    }
  }, [])

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
            <input
              type="text"
              name=""
              className="form-control"
              placeholder="Name"
            />

            <input
              type="text"
              name=""
              className="form-control"
              placeholder="Email"
            />

            <input
              type="text"
              name=""
              className="form-control"
              placeholder="Password"
            />

            <button className="btn btn-primary w-100">Signup</button>
          </div>
        </div>
      </div>

  );
};

export default Register;
