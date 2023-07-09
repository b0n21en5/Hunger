import { resturants } from "../../data/resturants";
import FoodCard from "../Components/FoodCard/FoodCard";
import Layout from "../Components/Layout/Layout";

const Resturants = () => {
  return (
    <Layout>
      <h3>Trending dining restaurants in Delhi NCR</h3>
      <div className="d-flex flex-col flex-wrap gap-5 mt-5">
        {resturants.map((res) => (
          <FoodCard
            key={res.id}
            title={res.title}
            price={res.price}
            rating={res.rating}
            type={res.type}
            imgSrc={res.imgSrc}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Resturants;
