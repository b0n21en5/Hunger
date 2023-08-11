import { useEffect, useState } from "react";
import { resturants } from "../../../data/resturants";
import Layout from "../../Components/Layout/Layout";
import off from "../../assets/off.avif";
import FoodList from "../../Components/FoodCard/FoodList";
import { useFilterContext } from "../../contexts/useFilterContext";
import DataNotAvailable from "../../Components/DataNotAvailable";
import { Link } from "react-router-dom";
import { collections } from "../../../data/collections";
import CollCard from "../../Components/Collections/CollCard";

import "./resturants.css";

const Resturants = () => {
  const [resturantsData, setResturantsData] = useState([]);
  const [isVisited, setIsVisited] = useState(true);

  const { state, dispatch, onApplyCheckedFilter } = useFilterContext();
  const { fetchedData, filterApplied, checked, dataNotAvailable } = state;

  // Set Resturantss Data on initial render
  useEffect(() => {
    setResturantsData(resturants);
    dispatch({ type: "SET_FETCHED_DATA", payload: resturants });
  }, []);

  // Applying filter on navigating back to the page
  useEffect(() => {
    if (checked.length && !isVisited) {
      onApplyCheckedFilter(resturantsData);
      setIsVisited(true);
    }
  }, [fetchedData]);

  useEffect(() => {
    // When navigating away update visited flag
    return () => {
      setIsVisited(false);
    };
  }, []);

  const path = "dining";

  return (
    <Layout pathname={path} resetData={resturantsData}>
      <div className="dine-cnt">
        <img
          className="mb-dis"
          height="86"
          width="380"
          src={off}
          alt="discount 50%"
        />
        <div className="switch-links">
          <Link
            to="/resturants"
            className={`link ${path === "dining" ? "switch-active" : ""}`}
          >
            Dinning
          </Link>
          <Link
            to="/nightlife"
            className={`link ${path === "nightlife" ? "switch-active" : ""}`}
          >
            Nightlife
          </Link>
        </div>
        {!filterApplied && (
          <div>
            <h2 className="col-title">Collections</h2>
            <div className="col-text mb-4">
              Explore curated lists of top restaurants, cafes, pubs, and bars
              based on trends
            </div>
            <div className="dine-coll-cards">
              {collections.slice(0, 4).map((col) => (
                <Link key={col.id} to={`/collections/${col.slug}`}>
                  <CollCard
                    imgSrc={col.img}
                    title={col.title}
                    places={col.places}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
        <img
          className="dsk-dis"
          height="250"
          width="100%"
          src={off}
          alt="discount 50%"
        />
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
        <FoodList
          subHead="Trending dining restaurants"
          resetData={resturantsData}
        />
      )}
    </Layout>
  );
};

export default Resturants;
