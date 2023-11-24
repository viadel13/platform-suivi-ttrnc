import { memo } from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ links }) => {
  return (
    <nav  style={{ '--bs-breadcrumb-divider': '/' }} aria-label="breadcrumb">
      <ol className="breadcrumb breadcrumbOl">
        <li className="breadcrumb-item">
          <Link to="#" style={{textDecoration: 'none'}}>Dashboard</Link>
        </li>
        {links.map((i, index)=><li key={index} className="breadcrumb-item active" aria-current="page"> /  {i}</li>)}
      </ol>
    </nav>
  );
};

export default  memo(Breadcrumb);
