import { useCallback, useEffect, useState } from "react";
import Navbar from "../Navbar/Index";
import Sidebar from "../Sidebar/Index";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase/firebaseConfig';
import { useDispatch } from "react-redux";
import { toggleSide } from "../../redux/reducers/rootReducer";

const Dashboard = () => {
  console.log('dashboard monte');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userSession, setUserSession] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); 
  
  const updateSidebarState = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
      const bodypd = document.getElementById("body-pd");
      bodypd.classList.remove("body-pd");
    }
  };

  useEffect(()=>{
    dispatch(toggleSide(isSidebarOpen))
  },[isSidebarOpen, dispatch])

  useEffect(() => {
    window.addEventListener("resize", updateSidebarState);
    const userStatut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSession(user);
        
      } else {
        navigate("/");
      }
      
    });
    return () => {
      window.removeEventListener("resize", updateSidebarState);
      userStatut();
    };
  }, [navigate]);

  
  const toggleSidebar = useCallback (() => {
    setIsSidebarOpen(!isSidebarOpen);
    const bodypd = document.getElementById("body-pd");
    bodypd.classList.toggle("body-pd");
  }, [isSidebarOpen]);

  return userSession === "" ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", background: "#0d6dfda4" }}
    >
      <span className="loader"></span>
    </div>
  ) :(
    <div className="body">
      <div id="body-pd">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className="container-fluid p-0 m-0 " style={{minHeight: '100vh', width: '100%', border: '1px solid  white', background: '#F9BFD', transition: '.3s'}}>
          <Outlet />
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
