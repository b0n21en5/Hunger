import { Link } from "react-router-dom";
import delivery from "../../assets/delivery.webp";
import deliveryActive from "../../assets/del-active.avif";
import dining from "../../assets/dining.avif";
import diningActive from "../../assets/dn-active.avif";
import nightlife from "../../assets/nightlife.webp";
import nightlifeActive from "../../assets/nt-active.webp";
import logo from "../../assets/logo.webp";
import "./layout.css";
import FilterButtons from "../FilterButtons";

const Layout = ({ children, resetData, pathname }) => {
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
            className={`d-flex align-items-center link ${
              pathname === "delivery" ? "active" : ""
            }`}
            to="/order"
          >
            <img
              width="60"
              height="60"
              src={pathname === "delivery" ? deliveryActive : delivery}
              alt="delivery"
              className="p-2 mb-2"
              style={{
                backgroundColor: `${
                  pathname === "delivery" ? "#fceec0" : "#f8f8f8"
                }`,
                borderRadius: "25%",
              }}
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
              style={{
                backgroundColor: `${
                  pathname === "dining" ? "#e5f3f3" : "#f8f8f8"
                }`,
                borderRadius: "25%",
              }}
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
              style={{
                backgroundColor: `${
                  pathname === "nightlife" ? "#edf4ff" : "#f8f8f8"
                }`,
                borderRadius: "25%",
              }}
            />{" "}
            <div className="ms-2">Nightlife</div>
          </Link>
        </div>
      </div>
      <FilterButtons resetData={resetData} />
      {children}
    </>
  );
};

export default Layout;
