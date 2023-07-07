import col1 from "../../assets/col-1.avif";
import col2 from "../../assets/col-2.avif";
import col3 from "../../assets/col-3.avif";
import col4 from "../../assets/col-4.avif";
import CollCard from "./CollCard";
import "./collcard.css";

const Collections = () => {
  return (
    <div className="mt-5">
      <div className="col-title">Collections</div>
      <p className="col-text">
        Explore curated lists of top restaurants, cafes, pubs, and bars in Delhi
        NCR, based on trends
      </p>
      <div className="d-flex justify-content-between">
        <CollCard imgSrc={col1} title="Unique Dinner Experien..." places="10" />
        <CollCard imgSrc={col2} title="Best Insta-worthy Places" places="21" />
        <CollCard imgSrc={col3} title="Celeb-loved Places" places="10" />
        <CollCard imgSrc={col4} title="Best Korean Resturants" places="13" />
      </div>
    </div>
  );
};

export default Collections;
