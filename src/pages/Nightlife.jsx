import { Link } from "react-router-dom";
import { clubs } from "../../data/clubs";
import FoodCard from "../Components/FoodCard/FoodCard";
import Layout from "../Components/Layout/Layout";
import off from "../assets/off.avif";
import CollCard from "../Components/Collections/CollCard";
import col5 from "../assets/col-5.avif";
import col6 from "../assets/col-6.avif";

const Nightlife = () => {
  return (
    <Layout pathname="nightlife">
      <div className="main-cnt">
        <div className="mb-5">
          <h2>Collections</h2>
          <span className="mt-4" style={{ fontSize: "1.2rem" }}>
            Explore curated lists of top restaurants, cafes, pubs, and bars in
            Delhi NCR, based on trends
          </span>
          <div className="d-flex gap-4 mt-2">
            <Link to={"/collections/lit-party-place"}>
              <CollCard imgSrc={col5} title="Lit Party Place" places="21" />
            </Link>
            <Link to={"/collections/finest-microbrewaries"}>
              <CollCard
                imgSrc={col6}
                title="Finest Microbrewaries"
                places="18"
              />
            </Link>
          </div>
        </div>
        <img height="250" width="100%" src={off} alt="discount 50%" />
        <h3 className="mt-3">Nightlife Restaurants in Delhi NCR</h3>
        <div className="d-flex flex-col flex-wrap gap-5 mt-5">
          {clubs.map((cb) => (
            <FoodCard
              key={cb.id}
              title={cb.title}
              slug={`/nightlife/${cb.slug}`}
              price={cb.price}
              rating={cb.rating}
              imgSrc={cb.imgSrc}
              type={cb.type}
              location={cb.location}
              dist={cb.dist}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Nightlife;
