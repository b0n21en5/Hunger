import { Link } from "react-router-dom";
// import logo from "../../assets/logo.webp";
import banner from "../../assets/banner.avif";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="banner">
        <img height="380px" width="100%" src={banner} alt="banner" />
        <Link to="/" className="logo">
          <img src="" alt="logo" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
