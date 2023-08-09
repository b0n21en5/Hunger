import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import off from "../assets/off.avif";
import CollCard from "../Components/Collections/CollCard";
import col5 from "../assets/col-5.avif";
import col6 from "../assets/col-6.avif";
import { resturants } from "../../data/resturants";
import { useEffect, useState } from "react";
import { useFilterContext } from "../contexts/useFilterContext";
import DataNotAvailable from "../Components/DataNotAvailable";
import FoodList from "../Components/FoodCard/FoodList";

const Nightlife = () => {
  const [resturantsData, setResturantsData] = useState([]);

  const { state, dispatch, onApplyCheckedFilter } = useFilterContext();
  const { fetchedData, filterApplied, checked, dataNotAvailable } = state;

  // Set Resturantss Data on initial render
  useEffect(() => {
    setResturantsData(resturants);
    dispatch({ type: "SET_FETCHED_DATA", payload: resturants });

    // When navigating away update visited flag
    return () => {
      dispatch({ type: "SET_VISITED", payload: true });
    };
  }, []);

  // Applying filter on navigating back to the page
  useEffect(() => {
    if (checked.length && state.visited) {
      onApplyCheckedFilter(resturantsData);
      dispatch({ type: "SET_VISITED", payload: false });
    }
  }, [fetchedData]);

  return (
    <Layout pathname="nightlife" resetData={resturantsData}>
      <div className="main-cnt">
        {!filterApplied && (
          <div className="mb-5">
            <h2>Collections</h2>
            <span className="mt-4" style={{ fontSize: "1.2rem" }}>
              Explore curated lists of top restaurants, cafes, pubs, and bars
              based on trends
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
        )}
        <img height="250" width="100%" src={off} alt="discount 50%" />
      </div>

      {dataNotAvailable ? (
        <div className="mb-5">
          <DataNotAvailable />
          <Link
            to="/"
            className="d-flex justify-content-center text-decoration-none"
          >
            <button className="btn btn-danger">Back to home</button>
          </Link>
        </div>
      ) : (
        <FoodList subHead="Nightlife Restaurants" resetData={resturantsData} />
      )}
      {/* <h3 className="mt-3"> </h3>
        <div className="d-flex flex-col flex-wrap gap-5 mt-5">
          {resturantsData.map((cb) => (
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
        </div> */}
    </Layout>
  );
};

export default Nightlife;
