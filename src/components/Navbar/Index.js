import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";

const Navbar = ({toggleSidebar, isSidebarOpen}) => {
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
        <div className="header_toggle">
          {isSidebarOpen ? (
            <MdOutlineClose  data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" />
          ) : (
            <AiOutlineMenu  color="red" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"  />
          )}
        </div>
        <div className="header_img">
          <img src="https://i.imgur.com/hczKIze.jpg" alt="" />
        </div>
      </header> 


      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <div>
      Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
    </div>
    <div className="dropdown mt-3">
      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
        Dropdown button
      </button>
      <ul className="dropdown-menu">
        <li><a className="dropdown-item" href="#">Action</a></li>
        <li><a className="dropdown-item" href="#">Another action</a></li>
        <li><a className="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>
  </div>
</div>

    </>

  );
};

export default Navbar;
