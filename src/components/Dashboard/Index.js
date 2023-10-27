import { useEffect, useState } from "react";
import Navbar from "../Navbar/Index";
import Sidebar from "../Sidebar/Index";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase/firebaseConfig';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userSession, setUserSession] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userStatut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSession(user);
      } else {
        navigate("/");
      }
    });
    return () => {
      userStatut();
    };
  }, [navigate]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    const bodypd = document.getElementById("body-pd");
    bodypd.classList.toggle("body-pd");
  };
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
        <div className="container-fluid bg-light" style={{height: '100%', width: '100%'}}>
          <Outlet />
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
