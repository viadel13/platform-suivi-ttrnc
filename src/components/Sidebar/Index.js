import { BiSolidDashboard, BiListUl } from "react-icons/bi";
import { BsCardList } from "react-icons/bs";
import { MdAssignmentAdd, MdAddShoppingCart } from "react-icons/md";
import { BiLayer } from "react-icons/bi";
import { LiaUserSolid, LiaSignOutAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = ({ isSidebarOpen }) => {
  function handleSignOut() {
    setTimeout(async () => {
      try {
        const auth = getAuth();
        await signOut(auth);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("erreur est", errorMessage);
      }
    }, 1000);
  }

  return (
    <div className={`l-navbar ${isSidebarOpen ? "showDash" : ""}`} id="nav-bar">
      <nav className="navbar">
        <div>
          <div className="TitleAppli">
            <a
              href="#"
              className="nav_logo  border-bottom pb-4"
              style={{ textDecoration: "none" }}
            >
              <BiLayer className="nav_logo-icon" />
              <span className="nav_logo-name">TTNRC</span>
            </a>
          </div>

          <div className="nav_list">
            <Link to="/dashboard" className="nav_link active ">
              <BiSolidDashboard className=" nav_icon" />
              <span className="nav_name">Dashboard</span>
            </Link>

            <div id="navTitle">
              <span className={`nav_name ${isSidebarOpen ? "" : "spanHover"}`}>
                Gestion des Envois
              </span>
            </div>

            <Link to="listeEnvois" className="nav_link">
              <BiListUl className=" nav_icon" />
              <span className="nav_name">Liste des envois</span>
            </Link>
            <Link to="ajouterEnvoi" className="nav_link">
              <MdAssignmentAdd className=" nav_icon" />
              <span className="nav_name">Ajouter un envoi</span>
            </Link>

            <div id="navTitle">
              <span className={`nav_name ${isSidebarOpen ? "" : "spanHover"}`}>
                Marchandises
              </span>
            </div>
            <Link to="listeMarchandises" className="nav_link">
              <BsCardList className=" nav_icon" />
              <span className="nav_name">Liste marchandises</span>
            </Link>
            <Link to="ajouterMarchandise" className="nav_link">
              <MdAddShoppingCart className=" nav_icon" />
              <span className="nav_name">Ajouter marchandises</span>
            </Link>

            <a href="#" className="nav_link">
              <LiaUserSolid className="nav_icon" />
              <span className="nav_name">Users</span>
            </a>

            <a href="#" className="nav_link" onClick={handleSignOut}>
              <LiaSignOutAltSolid className="nav_icon" />
              <span className="nav_name">SignOut</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
