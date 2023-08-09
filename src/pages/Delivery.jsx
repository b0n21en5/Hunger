import { useEffect, useState } from "react";
import FoodList from "../Components/FoodCard/FoodList";
import Layout from "../Components/Layout/Layout";
import { brands, foods, inspirations } from "../../data/food";
import DataNotAvailable from "../Components/DataNotAvailable";
import { useFilterContext } from "../contexts/useFilterContext";
import { Link } from "react-router-dom";

const Delivery = () => {
  const [foodsData, setFoodsData] = useState([]);

  const { state, dispatch, onApplyCheckedFilter } = useFilterContext();
  const { fetchedData, filterApplied, checked, dataNotAvailable } = state;

  // Apply inspiration click
  // const handleInspirationClick = () => {
  //   dispatch({ type: "ADD_CHECKED_FILTER", payload: clickedInspiration });
  //   if (checked.length) onApplyCheckedFilter(foodsData);
  // };

  // Set Foods Data on initial render
  useEffect(() => {
    setFoodsData(foods);
    dispatch({ type: "SET_FETCHED_DATA", payload: foods });

    // When navigating away from the component, update the visited flag
    return () => {
      dispatch({ type: "SET_VISITED", payload: true });
    };
  }, []);

  // Applying filter on navigating back to the page
  useEffect(() => {
    if (state.visited && checked.length) {
      if (checked.length) onApplyCheckedFilter(foodsData);
      dispatch({ type: "SET_VISITED", payload: false });
    }
  }, [fetchedData]);

  return (
    <div>
      <Layout pathname="delivery" resetData={foodsData}>
        {/* <FilterButtons resetData={foodsData} /> */}
        {dataNotAvailable && <DataNotAvailable />}
        {!filterApplied && (
          <>
            <div
              className="flex"
              style={{ backgroundColor: "#f8f8f8", padding: "40px 82px" }}
            >
              <h3>Inspiration for your first order</h3>
              <div className="d-flex flex-col gap-5 mt-4">
                {inspirations.map((ins) => (
                  <div key={ins.id}>
                    <div
                      className="d-flex gap-2 justify-content-center"
                      onClick={() => {
                        dispatch({
                          type: "ADD_CHECKED_FILTER",
                          payload: ins.title,
                        });
                        onApplyCheckedFilter(foodsData);
                      }}
                      style={{ cursor: "pointer" }}
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
                  </div>
                ))}
              </div>
            </div>

            <div className="flex" style={{ padding: "20px 82px" }}>
              <h3>Top brands for you</h3>
              <div className="d-flex flex-col gap-5 mt-4">
                {brands.map((ins) => (
                  <div key={ins.id} className="flex justify-content-center">
                    <Link to={`/resturants/${ins.slug}`}>
                      <img
                        style={{
                          width: "148px",
                          height: "150px",
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
    </div>
  );
};

export default Delivery;
