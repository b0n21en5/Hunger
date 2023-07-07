import { Link } from "react-router-dom";
import cd1 from "../../assets/cd-1.avif";
import cd2 from "../../assets/cd-2.avif";
import cd3 from "../../assets/cd-3.avif";
import CatCard from "./CatCard";
import "./cards.css";

const Cards = () => {
  return (
    <div className="d-flex justify-content-between">
      <Link to="" style={{ textDecoration: "none" }}>
        <CatCard
          imgSrc={cd1}
          title="Order Online"
          text="Stay home and order to your doorstep."
        />
      </Link>
      <Link to="" style={{ textDecoration: "none" }}>
        <CatCard
          imgSrc={cd2}
          title="Dining"
          text="View the city's favourite dining venues"
        />
      </Link>
      <Link to="" style={{ textDecoration: "none" }}>
        <CatCard
          imgSrc={cd3}
          title="Nightlife and Clubs"
          text="Explore the city's top nightlife outlets"
        />
      </Link>
    </div>
  );
};

export default Cards;
