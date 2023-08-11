import { useEffect, useState } from "react";
import FoodList from "../../Components/FoodCard/FoodList";
import Layout from "../../Components/Layout/Layout";
import { brands, foods, inspirations } from "../../../data/food";
import DataNotAvailable from "../../Components/DataNotAvailable";
import { useFilterContext } from "../../contexts/useFilterContext";
import { Link } from "react-router-dom";
import "./delivery.css";

const Delivery = () => {
  const [foodsData, setFoodsData] = useState([]);
  const [isVisited, setIsVisited] = useState(true);
  const [insClick, setInsClick] = useState(false);

  const { state, dispatch, onApplyCheckedFilter } = useFilterContext();
  const { fetchedData, filterApplied, checked, dataNotAvailable } = state;

  // Set Foods Data on initial render
  useEffect(() => {
    setFoodsData(foods);
    dispatch({ type: "SET_FETCHED_DATA", payload: foods });
  }, []);

  // Applying filter on navigating back to the page
  useEffect(() => {
    if (!isVisited && state.checked.length) {
      onApplyCheckedFilter(foodsData);
      setIsVisited(true);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (insClick && checked.length) {
      onApplyCheckedFilter(foodsData);
      setInsClick(false);
    }
  }, [insClick]);

  useEffect(() => {
    // When navigating away from the component, update the visited flag
    return () => {
      setIsVisited(false);
    };
  }, []);

  return (
    <Layout pathname="delivery" resetData={foodsData}>
      {dataNotAvailable && <DataNotAvailable />}
      {!filterApplied && (
        <>
          <div className="inspirations">
            <h3>Inspiration for your first order</h3>
            <div className="ins-cards">
              {inspirations.map((ins) => (
                <div
                  key={ins.id}
                  className="ins-card-body"
                  onClick={() => {
                    dispatch({
                      type: "ADD_CHECKED_FILTER",
                      payload: ins.title,
                    });
                    setInsClick(true);
                  }}
                >
                  <div className="d-flex flex-column">
                    <img
                      width="150"
                      height="150"
                      style={{ borderRadius: "50%" }}
                      src={ins.img}
                      alt={ins.title}
                      className="mb-1"
                    />
                    <div
                      className="text-center"
                      style={{
                        fontSize: "20px",
                        lineHeight: "32px",
                        fontWeight: "500",
                      }}
                    >
                      {ins.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="brands ">
            <h3>Top brands for you</h3>
            <div className="brand-body">
              {brands.map((ins) => (
                <div key={ins.id} className="ins-card-body">
                  <Link to={`/resturants/${ins.slug}`}>
                    <img
                      width="148"
                      height="150"
                      style={{
                        background: "#f8f8f8 ",
                        borderRadius: "50%",
                        boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 12px 0px",
                      }}
                      src={ins.img}
                      alt={ins.title}
                      className="mb-1"
                    />
                  </Link>
                  <div className="text-center font-weight-bold">
                    {ins.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <FoodList
        subHead="Order food online in Jai Singh Road"
        resetData={foodsData}
      />
    </Layout>
  );
};

export default Delivery;
