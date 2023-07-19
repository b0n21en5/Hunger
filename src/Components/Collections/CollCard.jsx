import rightTriangle from "../../assets/right-triangle.svg";
import "./collcard.css";

const CollCard = ({ imgSrc, places, title }) => {
  return (
    <div
      className="card bg-dark text-white"
      style={{ width: "260px", border: "none" }}
    >
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
            (title.length > 22 ? title.substr(0, 20).concat("...") : title)}
        </h5>
        <p className="card-text">
          {places}&nbsp;Places&nbsp;
          <img
            width="10"
            height="10"
            src={rightTriangle}
            alt="right-triangle"
          />
        </p>
      </div>
    </div>
  );
};

export default CollCard;
