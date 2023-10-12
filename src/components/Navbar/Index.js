import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";

const Navbar = ({toggleSidebar, isSidebarOpen}) => {
  return (
    <header  className={`header ${isSidebarOpen ? 'header-active' : 'header'}`}  id="header">
      <div className="header_toggle">
      
      {isSidebarOpen ?  <MdOutlineClose id="header-toggle" onClick={toggleSidebar}  /> : <AiOutlineMenu id="header-toggle" onClick={toggleSidebar}  />}

      </div>
      <div className="header_img">
        <img src="https://i.imgur.com/hczKIze.jpg" alt="" />
      </div>
    </header>
  );
};

export default Navbar;
