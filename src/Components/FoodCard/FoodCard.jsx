import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./foodcard.css";

const FoodCard = ({
  title,
  slug,
  price,
  rating,
  type,
  imgSrc,
  location,
  dist,
}) => {
  return (
    <Link
      to={slug}
      className="link card p-2 border-0"
      style={{ height: "350px", width: "328px" }}
    >
      <img
        src={imgSrc}
        width="320"
        height="240"
        className="card-img-top"
        style={{ borderRadius: "15px" }}
        alt={title}
      />
      <div className="fd-card pt-4">
        <div className="d-flex justify-content-between">
          <div className="card-title">{title}</div>
          <div className="btn-success">
            {rating}&nbsp;
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="card-text">
            {type.substr(0, 24) + (type.length >= 24 ? "..." : "")}
          </div>
          <div className="card-text">₹{price}&nbsp;for one</div>
        </div>
        {location && dist && (
          <div className="d-flex justify-content-between">
            <div className="card-text">{location}</div>
            <div className="card-text">{dist}&nbsp;km</div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default FoodCard;
