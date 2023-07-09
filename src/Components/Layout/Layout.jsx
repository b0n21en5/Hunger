import { Link } from "react-router-dom";
import delivery from "../../assets/delivery.webp";
import dinning from "../../assets/dinning.avif";
import nightlife from "../../assets/nightlife.webp";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="header main">
        <Link to="/">
          <img src="logo" alt="logo" />
        </Link>
        <div className="d-flex gap-5">
          <Link
            className="text-decoration-none d-flex align-items-center"
            to="/order-food-online"
          >
            <img
              width="40"
              height="40"
              src={delivery}
              alt="order food online"
              className="p-2"
              style={{
                background: "#f8f8f8",
                borderRadius: "50%",
              }}
            />
            <div style={{ marginLeft: "10px" }}>Delivery</div>
          </Link>
          <Link
            className="text-decoration-none d-flex align-items-center"
            to="/resturants"
          >
            <img
              width="30"
              height="30"
              src={dinning}
              alt="dinning"
              style={{ background: "#f8f8f8", borderRadius: "50%" }}
            />
            <div style={{ marginLeft: "10px" }}>Dinning Out</div>
          </Link>
          <Link
            className="text-decoration-none d-flex align-items-center"
            to="/nightlife"
          >
            <img
              width="30"
              height="30"
              src={nightlife}
              alt="nightlife"
              style={{ background: "#f8f8f8", borderRadius: "50%" }}
            />{" "}
            <div style={{ marginLeft: "10px" }}>Nightlife</div>
          </Link>
        </div>
      </div>
      <div className="main">{children}</div>
    </div>
  );
};

export default Layout;
