import profilUser from '../../assets/images/user-gear.png'
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { BiExit } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { memo } from 'react';


const Navbar = ({ displayName }) => {
  const auth = getAuth();

  async function handleSignOut() {
    await signOut(auth);
  }

  return (
    <div className='navbar-client bg-dark navbar-dark py-2'>
      <div className='container d-flex justify-content-between align-items-center'>
        <div className='brand d-flex' style={{ position: 'relative', top: '5px' }}>
          <Link to='#' style={{ textDecoration: 'none', fontSize: '25px', color: 'white' }}>TTNRC</Link>
        </div>
        <div className='d-flex align-content-center'>
          <div className="header_img dropdown">
            <Link data-bs-toggle="dropdown">
              <img src={profilUser} alt="profilUtilisateur" />
            </Link>
            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-start mt-3 p-2" style={{ transition: '.3s' }}>

              <li>
                <Link to="#" className="d-flex align-items-center mt-2" style={{ textDecoration: 'none', color: "white" }} onClick={handleSignOut}>
                  <BiExit />
                  <span className="ms-2">Deconnexion</span>
                </Link>
              </li>

            </ul>
          </div>
          <span className='ms-2' style={{ color: "white" }}>{displayName}</span>
        </div>

      </div>

    </div>
  )
}

export default memo(Navbar)
