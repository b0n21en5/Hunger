import React from "react";
import logo from "../../assets/logo.webp";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <img src={logo} alt="footer-logo" width="130" height="27" />
      <div className="social-links">
        <Link to="https://www.linkedin.com/in/bikash-nath/">LinkedIn</Link>
        <Link to="https://github.com/b0n21en5">Github</Link>
      </div>
      <div className="copy">Made With &hearts; By Bikash</div>
    </div>
  );
};

export default React.memo(Footer);
