import { Link } from "react-router-dom";
import delivery from "../../assets/delivery.webp";
import deliveryActive from "../../assets/del-active.avif";
import dining from "../../assets/dining.avif";
import diningActive from "../../assets/dn-active.avif";
import nightlife from "../../assets/nightlife.webp";
import nightlifeActive from "../../assets/nt-active.webp";
import FilterButtons from "../FilterButtons/FilterButtons";
import NavBar from "../NavBar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faShoePrints } from "@fortawesome/free-solid-svg-icons";

import "./layout.css";

const Layout = ({ children, resetData, pathname }) => {
  return (
    <div>
      <NavBar />
      <div className="top-links">
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
      <div className="bottom">
        <Link
          className={`bottom-link link ${
            pathname === "delivery" ? "active" : ""
          }`}
          to="/order"
        >
          <FontAwesomeIcon icon={faBagShopping} />
          <div className="ms-2">Delivery</div>
        </Link>
        <Link
          className={`bottom-link link ${
            pathname === "dining" || pathname == "nightlife" ? "active" : ""
          }`}
          to="/resturants"
        >
          <FontAwesomeIcon icon={faShoePrints} />
          <div className="ms-2">Dinning Out</div>
        </Link>
      </div>
    </div>
  );
};

export default Layout;
