import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./foodcard.css";

const FoodCard = ({ product }) => {
  return (
    <Link to={product.slug} className="link card product">
      <img
        src={product.imgSrc}
        width="320"
        height="240"
        className="card-img-top"
        alt={product.title}
      />
      <div className="pd-card">
        <div className="pd-card-details">
          <div className="card-title">{product.title}</div>
          <div className="btn-success">
            {product.rating}&nbsp;
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
        <div className="pd-card-details">
          <div className="card-text">
            {product.type.substr(0, 24) +
              (product.type.length >= 24 ? "..." : "")}
          </div>
          <div className="card-text">₹{product.price}&nbsp;for one</div>
        </div>
        {product.location && product.dist && (
          <div className="pd-card-details">
            <div className="card-text">{product.location}</div>
            <div className="card-text">{product.dist}&nbsp;km</div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default FoodCard;
