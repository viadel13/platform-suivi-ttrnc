import profilUser from '../../assets/images/user-gear.png'
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { BiExit } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import {db} from '../../firebase/firebaseConfig'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const auth = getAuth();
  const [userData, setUserData] = useState(null);
  const userOnline = useSelector((state) => state.platformeSuivi.userOnline);

  const usersCollectionRef = collection(db, "Clients");

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(usersCollectionRef);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (userOnline.email === data.email) {
          setUserData(data);
        }
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };
  useEffect(() => {
    fetchData ();
  }, []);

  console.log(userData)

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
                <Link to="#" className="d-flex align-items-center mt-2" style={{ textDecoration: 'none', color: "white", fontSize: '17px' }}>
                  <FaUser />
                  <span className="ms-2">Profil</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="d-flex align-items-center mt-2" style={{ textDecoration: 'none', color: "white" }} onClick={handleSignOut}>
                  <BiExit />
                  <span className="ms-2">Deconnexion</span>
                </Link>
              </li>

            </ul>
          </div>
          <Link style={{ textDecoration: 'none', fontSize: '16px', color: 'white' }}>
            <span className='ms-2'>{userData && userData.prenom}</span>
          </Link>
        </div>

      </div>

    </div>
  )
}

export default Navbar
