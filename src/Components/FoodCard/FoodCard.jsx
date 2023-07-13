import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const FoodCard = ({ title, price, rating, type, imgSrc, location, dist }) => {
  return (
    <div className="card border-0" style={{ width: "18rem" }}>
      <img
        src={imgSrc}
        width="288"
        height="192"
        className="card-img-top rounded"
        alt={title}
      />
      <div className=" pt-4">
        <div className="d-flex justify-content-between">
          <div className="card-title">{title}</div>
          <div className="btn btn-success">
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
    </div>
  );
};

export default FoodCard;
