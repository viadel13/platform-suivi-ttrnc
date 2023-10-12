import { Link } from "react-router-dom";



const Login = () => {
  return (

      <div className="card p-4">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item text-center">
            <Link
              className="nav-link active btl"
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
              <input
                type="text"
                name=""
                className="form-control"
                placeholder="Email or Phone"
              />

              <input
                type="text"
                name=""
                className="form-control"
                placeholder="Password"
              />
              <button className="btn btn-primary w-100 btn-block">Login</button>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Login;
