import { resturants } from "../../data/resturants";
import Collections from "../Components/Collections/Collections";
import FoodCard from "../Components/FoodCard/FoodCard";
import Layout from "../Components/Layout/Layout";
import off from "../assets/off.avif";

const Resturants = () => {
  return (
    <Layout>
      <Collections />
      <img
        className="mt-5"
        height="250"
        width="100%"
        src={off}
        alt="discount 50%"
      />
      <h3 className="mt-3">Trending dining restaurants in Delhi NCR</h3>
      <div className="d-flex flex-col flex-wrap gap-5 mt-5">
        {resturants.map((res) => (
          <FoodCard
            key={res.id}
            title={res.title}
            price={res.price}
            rating={res.rating}
            type={res.type}
            imgSrc={res.imgSrc}
            location={res.location}
            dist={res.dist}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Resturants;
