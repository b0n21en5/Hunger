import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import rightTriangle from "../../assets/right-triangle.svg";
import "./collcard.css";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const CollCard = ({ imgSrc, places, title }) => {
  return (
    <div className="card">
      <img
        src={imgSrc}
        height="320"
        width="260"
        className="card-img"
        alt="collection-card-img"
      />
      <div className="card-img-overlay">
        <h5 className="card-title">
          {places +
            " " +
            (title.length > 24 ? title.substr(0, 24).concat("...") : title)}
        </h5>
        <p className="card-text">
          {places}&nbsp;Places&nbsp;
          <FontAwesomeIcon icon={faCaretRight} />
        </p>
      </div>
    </div>
  );
};

export default CollCard;
