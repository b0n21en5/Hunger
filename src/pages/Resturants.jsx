import { useEffect, useState } from "react";
import { resturants } from "../../data/resturants";
import Layout from "../Components/Layout/Layout";
import off from "../assets/off.avif";
import FoodList from "../Components/FoodCard/FoodList";
import { useFilterContext } from "../contexts/useFilterContext";
import DataNotAvailable from "../Components/DataNotAvailable";
import { Link } from "react-router-dom";
import { collections } from "../../data/collections";
import CollCard from "../Components/Collections/CollCard";

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

  return (
    <div>
      <Layout pathname="dining" resetData={resturantsData}>
        <div className="main-cnt">
          {!filterApplied && (
            <>
              <div className="col-title">Collections</div>
              <p className="col-text">
                Explore curated lists of top restaurants, cafes, pubs, and bars
                in, based on trends
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
            </>
          )}
          <img
            className="mt-5"
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
    </div>
  );
};

export default Resturants;
