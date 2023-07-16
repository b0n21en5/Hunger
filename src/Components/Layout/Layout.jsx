import { Link } from "react-router-dom";
import delivery from "../../assets/delivery.webp";
import deliveryActive from "../../assets/del-active.avif";
import dining from "../../assets/dining.avif";
import diningActive from "../../assets/dn-active.avif";
import nightlife from "../../assets/nightlife.webp";
import nightlifeActive from "../../assets/nt-active.webp";
import logo from "../../assets/logo.webp";
import "./layout.css";

const Layout = ({ children, pathname }) => {
  return (
    <>
      <div className="nav">
        <Link to="/">
          <img width="126" height="27" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="header">
        <div className="d-flex gap-5 mt-4">
          <Link
            className={`text-decoration-none d-flex align-items-center link ${
              pathname === "delivery" ? "active" : ""
            }`}
            to="/order-food-online"
          >
            <img
              width="60"
              height="60"
              src={pathname === "delivery" ? deliveryActive : delivery}
              alt="delivery"
              className="p-2 mb-2"
              style={{ backgroundColor: "#f8f8f8" }}
            />
            <div className="ms-2">Delivery</div>
          </Link>
          <Link
            className={`text-decoration-none d-flex align-items-center link ${
              pathname === "dining" ? "active" : ""
            }`}
            to="/resturants"
          >
            <img
              width="60"
              height="60"
              src={pathname === "dining" ? diningActive : dining}
              alt="dinning"
              className="p-2 mb-2"
              style={{ backgroundColor: "#f8f8f8" }}
            />
            <div className="ms-2">Dinning Out</div>
          </Link>
          <Link
            className={`text-decoration-none d-flex align-items-center link ${
              pathname === "nightlife" ? "active" : ""
            }`}
            to="/nightlife"
          >
            <img
              width="60"
              height="60"
              src={pathname === "nightlife" ? nightlifeActive : nightlife}
              alt="nightlife"
              className="p-2 mb-2"
              style={{ backgroundColor: "#f8f8f8" }}
            />{" "}
            <div className="ms-2">Nightlife</div>
          </Link>
        </div>
      </div>
      {children}
    </>
  );
};

export default Layout;
