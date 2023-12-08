import { BiSolidDashboard, BiListUl } from "react-icons/bi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { IoDocumentsOutline } from "react-icons/io5";
import { TbUsersPlus } from "react-icons/tb";
import { BsCardList } from "react-icons/bs";
import { memo } from "react";
import { MdAssignmentAdd, MdAddShoppingCart } from "react-icons/md";
import { BiLayer } from "react-icons/bi";
import { LiaUserSolid, LiaSignOutAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { FaUsers } from "react-icons/fa";
import { RiUserAddFill } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa";
import { FaFileContract } from "react-icons/fa";

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
    <div className={`l-navbar d-none d-lg-block ${isSidebarOpen ? "showDash" : ""}`} id="nav-bar" >
   
        <nav className="navbar navbar-side  p-0">
        <Scrollbars autoHide>
          <div className="navbar-conteneur">
            <div className="TitleAppli" style={{display: !isSidebarOpen &&  "flex" , flexDirection: !isSidebarOpen && "column" , alignItems: !isSidebarOpen && "center"}}>
              <Link
                to="/dashboard"
                className="nav_logo"
                style={{ textDecoration: "none" }}
              >
                <BiLayer className="nav_logo-icon" />
                <span className="nav_logo-name" style={{ display: !isSidebarOpen ? "none" : "" }} >TTNRC</span>
              </Link>
            </div>

            <div className="nav_list" style={{display: !isSidebarOpen &&  "flex" , flexDirection: !isSidebarOpen && "column" , alignItems: !isSidebarOpen && "center"}}>
              <Link to="/dashboard" className="nav_link active ">
                <BiSolidDashboard className=" nav_icon" />
                <span className="nav_name" style={{ display: !isSidebarOpen ? "none" : "" }}>Dashboard</span>
              </Link>

              <div className="navTitle">
                <span className={`nav_name  ${isSidebarOpen ? "" : "spanHover"}`} style={{ display: !isSidebarOpen ? "none" : "" }}>
                  Gestion des Envois
                </span>
              </div>

              <Link to="listeEnvois" className="nav_link">
                <BiListUl className=" nav_icon" />
                <span className="nav_name"  style={{ display: !isSidebarOpen ? "none" : "" }}>Liste des envois</span>
              </Link>
              <Link to="ajouterEnvoi" className="nav_link">
                <MdAssignmentAdd className=" nav_icon" />
                <span className="nav_name"  style={{ display: !isSidebarOpen ? "none" : "" }}>Ajouter un envoi</span>
              </Link>
              <div className="navTitle">
                <span className={`nav_name ${isSidebarOpen ? "" : "spanHover"}`} style={{ display: !isSidebarOpen ? "none" : "" }}>
                  Marchandises
                </span>
              </div>
              <Link to="listMarchandises" className="nav_link">
                <BsCardList className=" nav_icon" />
                <span className="nav_name" style={{ display: !isSidebarOpen ? "none" : "" }}>Liste marchandises</span>
              </Link>
              <Link to="addMarchandise" className="nav_link">
                <MdAddShoppingCart className=" nav_icon" />
                <span className="nav_name"  style={{ display: !isSidebarOpen ? "none" : "" }}>Ajouter marchandise</span>
              </Link>

              <div className="navTitle">
                <span className={`nav_name ${isSidebarOpen ? "" : "spanHover"}`} style={{ display: !isSidebarOpen ? "none" : "" }}>
                  Gestion Clients
                </span>
              </div>

              <Link to="listeClients" className="nav_link">
                <LiaUserSolid className="nav_icon" />
                <span className="nav_name" style={{ display: !isSidebarOpen ? "none" : "" }}>Clients</span>
              </Link>

              <Link to="ajoutClient" className="nav_link">
                <TbUsersPlus className="nav_icon" />
                <span className="nav_name" style={{ display: !isSidebarOpen ? "none" : "" }}>Ajout Client</span>
              </Link>

              <div className="navTitle">
                <span className={`nav_name  ${isSidebarOpen ? "" : "spanHover"}`} style={{ display: !isSidebarOpen ? "none" : "" }}>
                  Gestion Fournisseurs
                </span>
              </div>

              
              <Link to="listeFournisseurs" className="nav_link">
                <FaUsers className="nav_icon" />
                <span className="nav_name" style={{ display: !isSidebarOpen ? "none" : "" }}>Fournisseurs</span>
              </Link>

              <Link to="ajoutFournisseur" className="nav_link">
                <RiUserAddFill className="nav_icon" />
                <span className="nav_name" style={{ display: !isSidebarOpen ? "none" : "" }}>Ajout Fournisseur</span>
              </Link>

              <div className="navTitle">
                <span className={`nav_name ${isSidebarOpen ? "" : "spanHover"}`} style={{ display: !isSidebarOpen ? "none" : "" }}>
                  Gestion Documents
                </span>
              </div>

              
              <Link to="listeDocuments" className="nav_link">
                <IoDocumentsOutline className="nav_icon" />
                <span className="nav_name" style={{ display: !isSidebarOpen ? "none" : "" }}>Documents</span>
              </Link>

              <Link to="ajoutDocument" className="nav_link">
                <AiOutlineFileAdd className="nav_icon" />
                <span className="nav_name" style={{ display: !isSidebarOpen ? "none" : "" }}>Ajout Document</span>
              </Link>

              <div className="navTitle">
                <span className={`nav_name ${isSidebarOpen ? "" : "spanHover"}`} style={{ display: !isSidebarOpen ? "none" : "" }}>
                  Gestion Factures
                </span>
              </div>

              <Link to="listeFactures" className="nav_link">
                <FaFileContract className="nav_icon" />
                <span className="nav_name" style={{ display: !isSidebarOpen ? "none" : "" }}>Factures</span>
              </Link>

              <Link to="ajoutFacture" className="nav_link">
                <FaFileSignature className="nav_icon" />
                <span className="nav_name" style={{ display: !isSidebarOpen ? "none" : "" }}>Ajout Facture</span>
              </Link>

              <a href="#" className="nav_link" onClick={handleSignOut}>
                <LiaSignOutAltSolid color="red" className="nav_icon" />
                <span className="nav_name text-danger" style={{ display: !isSidebarOpen ? "none" : "" }}>SignOut</span>
              </a>
            </div>
          </div>
          </Scrollbars>
        </nav>
      
    </div>
  );
};

export default memo(Sidebar);
