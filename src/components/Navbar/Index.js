import { AiOutlineMenu, AiOutlineFileAdd } from "react-icons/ai";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { BiSolidDashboard, BiListUl } from "react-icons/bi";
import { TbUsersPlus } from "react-icons/tb";
import { BsCardList } from "react-icons/bs";
import { MdAssignmentAdd, MdAddShoppingCart } from "react-icons/md";
import { BiLayer } from "react-icons/bi";
import { LiaUserSolid, LiaSignOutAltSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";



const Navbar = ({toggleSidebar, isSidebarOpen}) => {
  const[clickLien, setClickLien] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (destination) => {
    setClickLien(true);
    navigate(`${destination}`);
    window.location.reload();

  };
  
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
    <>
      <header className={`header ${isSidebarOpen ? 'header-active' : 'header'}`} id="header-lg">
        <div className="header_toggle d-none d-md-none d-lg-block">
          {isSidebarOpen ? (
            <MdOutlineClose className="header-toggle" onClick={toggleSidebar} />
          ) : (
            <AiOutlineMenu className="header-toggle" onClick={toggleSidebar}  />
          )}
        </div>
        
        <div className="header_img">
          <img src="https://i.imgur.com/hczKIze.jpg" alt="image-profil" />
        </div>
      </header>
      
      <header className={`header d-lg-none`} >
        <div className="header_toggle"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" style={{position: 'relative', left: '-51px'}}>
          <AiOutlineMenu  />
        </div>
        <div className="header_img">
          <img src="https://i.imgur.com/hczKIze.jpg" alt="" />
        </div>
      </header> 


      <div className="offcanvas offcanvas-start" style={{backgroundColor: '#05010ff6'}} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header border-bottom pb-4">
          <div className="offcanvas-title " id="offcanvasExampleLabel"> 
            <BiLayer className="nav_logo-icon" />
            <a href="#" style={{textDecoration: 'none'}}> <span className="nav_logo-name" >TTNRC</span> </a>
          </div>
          <button type="button" className={`btn-close btn-close-white ${clickLien && 'disabled'}`} data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
        <nav className="navbar">
        <div className="navbar-conteneur">

          <div className="nav_list">
            <Link to="/dashboard" className="nav_link active" onClick={() => handleLinkClick("/dashboard")}>
              <BiSolidDashboard className=" nav_icon" />
              <span className="nav_name">Dashboard</span>
            </Link>

            <div className="navTitle">
              <span className={`nav_name`}>
                Gestion des Envois
              </span>
            </div>

            <Link to="listeEnvois" className="nav_link" onClick={() => handleLinkClick("listeEnvois")}>
              <BiListUl className=" nav_icon" />
              <span className="nav_name">Liste des envois</span>
            </Link>
            <Link to="ajouterEnvoi" className="nav_link" onClick={() => handleLinkClick("ajouterEnvoi")}>
              <MdAssignmentAdd className=" nav_icon" />
              <span className="nav_name" >Ajouter un envoi</span>
            </Link>

            <div className="navTitle">
              <span className={`nav_name`}>
                Marchandises
              </span>
            </div>

            <Link to="listMarchandises" className="nav_link" onClick={() => handleLinkClick("listMarchandises")}>
              <BsCardList className=" nav_icon" />
              <span className="nav_name">Liste marchandises</span>
            </Link>
            <Link to="addMarchandise" className="nav_link" onClick={() => handleLinkClick("addMarchandise")}>
              <MdAddShoppingCart className=" nav_icon" />
              <span className="nav_name" >Ajouter marchandise</span>
            </Link>

            <div className="navTitle">
              <span className={`nav_name`}>
              Gestion Clients
              </span>
            </div>

            <Link to="#" className="nav_link" onClick={() => handleLinkClick("listeClients")}>
              <LiaUserSolid className="nav_icon" />
              <span className="nav_name">Clients</span>
            </Link>
            <Link to="ajoutClient" className="nav_link"  onClick={() => handleLinkClick("ajoutClient")}>
              <TbUsersPlus className="nav_icon" />
              <span className="nav_name">Ajout client</span>
            </Link>

            <div className="navTitle">
              <span className={`nav_name`}>
                Gestion Documents
              </span>
            </div>

            <Link to="#" className="nav_link" onClick={() => handleLinkClick("listeClients")}>
              <IoDocumentsOutline className="nav_icon" />
              <span className="nav_name">Documents</span>
            </Link>
            <Link to="ajoutDocument" className="nav_link"  onClick={() => handleLinkClick("ajoutDocument")}>
              <AiOutlineFileAdd className="nav_icon" />
              <span className="nav_name">Ajout Document</span>
            </Link>


            <Link href="#" className="nav_link" onClick={handleSignOut}>
              <LiaSignOutAltSolid color="red" className="nav_icon" />
              <span className="nav_name text-danger">SignOut</span>
            </Link>
          </div>
        </div>
      </nav>
        </div>
      </div>

    </>

  );
};

export default Navbar;
