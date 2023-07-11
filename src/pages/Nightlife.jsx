import { clubs } from "../../data/clubs";
import FoodCard from "../Components/FoodCard/FoodCard";
import Layout from "../Components/Layout/Layout";
import off from "../assets/off.avif";

const Nightlife = () => {
  return (
    <Layout>
      <img height="250" width="100%" src={off} alt="discount 50%" />
      <h3 className="mt-3">Nightlife Restaurants in Delhi NCR</h3>
      <div className="d-flex flex-col flex-wrap gap-5 mt-5">
        {clubs.map((cb) => (
          <FoodCard
            key={cb.id}
            title={cb.title}
            price={cb.price}
            rating={cb.rating}
            imgSrc={cb.imgSrc}
            type={cb.type}
            location={cb.location}
            dist={cb.dist}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Nightlife;
