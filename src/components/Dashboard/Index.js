import { useCallback, useEffect, useState } from "react";
import Navbar from "../Navbar/Index";
import Sidebar from "../Sidebar/Index";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';
import { useDispatch } from "react-redux";
import { Admin, userOnline } from "../../redux/reducers/rootReducer";
import { toggleSide } from "../../redux/reducers/rootReducer";
import Accueil from "../../componentsClient/Accueil/Index";

const Dashboard = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userSession, setUserSession] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const updateSidebarState = () => {
    if (window.innerWidth <= 768 && isAdmin) {
      setIsSidebarOpen(false);
      const bodypd = document.getElementById("body-pd");
      bodypd.classList.remove("body-pd");
    }
  };

  useEffect(() => {
    dispatch(toggleSide(isSidebarOpen))
  }, [isSidebarOpen, dispatch])


  const adminUID = process.env.REACT_APP_ADMIN_UID;

  const getUserType = (user) => {
    // Ajoutez votre logique de détermination du type d'utilisateur ici
    // Par exemple, si l'utilisateur a un champ "isAdmin" dans ses données
    return user?.uid === `${adminUID}` ? 'admin' : 'client';
  };

  useEffect(() => {
    window.addEventListener("resize", updateSidebarState);
    const userStatut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSession(user);
        dispatch(userOnline(user.email));
        const userType = getUserType(user);

        if (userType === 'admin') {
          setIsAdmin(true);
          dispatch(Admin(true));
        } else {
          setIsAdmin(false);
          dispatch(Admin(false));
        }

        setIsLoading(false);

      } else {
        navigate("/");
        setIsLoading(false);
      }

    });
    return () => {
      window.removeEventListener("resize", updateSidebarState);
      userStatut();
    };
  }, [navigate]);


  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
    const bodypd = document.getElementById("body-pd");
    bodypd.classList.toggle("body-pd");
  }, [isSidebarOpen]);


  return isLoading ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", background: "#0d6dfda4" }}
    >
      <span className="loader"></span>
    </div>
  ) : (

    <>
      {isAdmin ? (
        <div className="body">
          <div id="body-pd">
            <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <div className="container-fluid p-0 m-0 " style={{ minHeight: '100vh', width: '100%', border: '1px solid  white', background: '#F9BFD', transition: '.3s' }}>
              <Outlet />
            </div>
          </div>

        </div>

      ) : (
        <>
          <Accueil />
          <Outlet />
        </>
      )}
    </>

  )
};

export default Dashboard;
