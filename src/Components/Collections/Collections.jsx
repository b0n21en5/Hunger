import { Link } from "react-router-dom";
import { collections } from "../../../data/collections";
import CollCard from "./CollCard";
import "./collcard.css";

const Collections = () => {
  return (
    <div>
      <div className="col-title">Collections</div>
      <p className="col-text">
        Explore curated lists of top restaurants, cafes, pubs, and bars in Delhi
        NCR, based on trends
      </p>
      <div className="d-flex justify-content-between">
        {collections.map(
          (col) =>
            col.id < 5 && (
              <Link key={col.id} to={`/collections/${col.slug}`}>
                <CollCard
                  imgSrc={col.img}
                  title={col.title}
                  places={col.places}
                />
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default Collections;
