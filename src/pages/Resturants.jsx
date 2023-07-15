import { useState } from "react";
import { resturants } from "../../data/resturants";
import Collections from "../Components/Collections/Collections";
import FoodCard from "../Components/FoodCard/FoodCard";
import Layout from "../Components/Layout/Layout";
import off from "../assets/off.avif";
import { Link } from "react-router-dom";

const Resturants = () => {
  const [resturantsData, setResturantsData] = useState(resturants);

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
        {resturantsData.map((res) => (
          <Link
            className=" text-decoration-none"
            to={`/resturants/${res.slug}`}
            key={res.id}
          >
            <FoodCard
              title={res.title}
              price={res.price}
              rating={res.rating}
              type={res.type}
              imgSrc={res.imgSrc}
              location={res.location}
              dist={res.dist}
            />
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Resturants;
