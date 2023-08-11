import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";

import "./navbar.css";

const NavBar = () => {
  return (
    <div className="nav">
      <Link to="/">
        <img width="126" height="27" src={logo} alt="logo" />
      </Link>
    </div>
  );
};

export default NavBar;
