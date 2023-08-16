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

import "./Resturants/resturants.css";
import axios from "axios";

const Nightlife = () => {
  const [resturantsData, setResturantsData] = useState([]);
  const [isVisited, setIsVisited] = useState(true);

  const { state, dispatch, onApplyCheckedFilter } = useFilterContext();
  const { fetchedData, filterApplied, checked, dataNotAvailable } = state;

  // Fetch All Restaurants from Database
  const getAllRestaurants = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/restaurants/get-all-restaurants"
      );
      setResturantsData(data);
      dispatch({ type: "SET_FETCHED_DATA", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  // Set Resturantss Data on initial render
  useEffect(() => {
    getAllRestaurants();
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

  const path = "nightlife";

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
            <div className="dine-coll-cards" id="ntlf-coll-cards">
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
        <FoodList subHead="Nightlife Restaurants" resetData={resturantsData} />
      )}
    </Layout>
  );
};

export default Nightlife;
