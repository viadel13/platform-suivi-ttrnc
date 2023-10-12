import { useState } from "react";
import Navbar from "../Navbar/Index";
import Sidebar from "../Sidebar/Index";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    const bodypd = document.getElementById("body-pd");
    bodypd.classList.toggle("body-pd");
  };

  return (
    <div className="body">
      <div id="body-pd">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className=" container-fluid height-100 bg-light">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
