import { useEffect, useState } from "react";
import FoodList from "../../Components/FoodCard/FoodList";
import Layout from "../../Components/Layout/Layout";
import { brands, inspirations } from "../../../data/food";
import NoData from "../../Components/NoData/NoData";
import { useFilterContext } from "../../contexts/useFilterContext";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import CollCard from "../../Components/Collections/CollCard";

import off from "../../assets/off.avif";

import "./menupage.css";

const MenuPage = () => {
  const [foodsData, setFoodsData] = useState([]);
  const [isVisited, setIsVisited] = useState(true);
  const [insClick, setInsClick] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [collectionsData, setCollectionsData] = useState([]);

  const { state, dispatch } = useFilterContext();
  const { fetchedData, filterApplied, dataNotAvailable } = state;

  const location = useLocation().pathname.substring(1);

  let path = "restaurants";
  if (location === "delivery") {
    path = "foods";
  }

  // Get all foods data
  const fetchDataDB = async () => {
    let limit = 3;
    if (window.innerWidth > 412) {
      limit = 9;
    }
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/${path}?page=${currentPage}&limit=${limit}`
      );

      if (currentPage === 1) {
        setFoodsData(data);
        return;
      }
      setFoodsData((prev) => [...prev, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  // Get all collections
  const getAllCollections = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/collections");
      setCollectionsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Method to apply checked filters
  const onApplyCheckedFilter = async (path) => {
    state.checked.forEach((ch) => {
      if (!state.selectedFilter.includes(ch))
        dispatch({ type: "ADD_SELECTED_FILTER", payload: ch });
    });

    const response = await axios.get(
      `http://localhost:4000/api/${path}?checkedFilter=${state.checked?.join(
        ","
      )}&sort=${state.radio}`
    );
    const filteredFoods = response.data;

    if (filteredFoods.length) {
      setFoodsData(filteredFoods);
      dispatch({ type: "SET_DATA_NOT_AVAILABLE", payload: false });
      dispatch({ type: "SET_END_SEARCH_RESULTS", payload: true });
    } else {
      if (path === "delivery") fetchDataDB();
      if (path === "restaurants") setFoodsData([]);
      dispatch({ type: "SET_DATA_NOT_AVAILABLE", payload: true });
      dispatch({ type: "SET_END_SEARCH_RESULTS", payload: false });
    }
  };

  // Method to remove selected filter
  const onFilterRemove = (removeFilter) => {
    const filteredArray = state.selectedFilter.filter((sf) => {
      return sf !== removeFilter;
    });
    dispatch({ type: "SET_SELECTED_FILTER", payload: filteredArray });
    const filterChecked = state.checked.filter((sc) => {
      return sc !== removeFilter;
    });
    dispatch({ type: "SET_CHECKED_FILTER", payload: filterChecked });

    // filter foods data based on removed filters
    if (filterChecked.length) {
      onApplyCheckedFilter(path);
      setInsClick(true);
    } else {
      // Clear all filters and reset data
      fetchDataDB();

      dispatch({ type: "SET_DATA_NOT_AVAILABLE", payload: false });
      dispatch({ type: "SET_END_SEARCH_RESULTS", payload: false });
    }
  };

  // Handle Scroll for to change current page
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight / 2) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (currentPage > 1) fetchDataDB();
  }, [currentPage]);

  // Set Foods Data on initial render
  useEffect(() => {
    if (state.checked.length) {
      onApplyCheckedFilter(path);
    } else {
      fetchDataDB();
    }

    if (location !== "delivery") getAllCollections();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setCurrentPage(1);
      setFoodsData([]);
    };
  }, [location]);

  // Applying filter on navigating back to the page
  useEffect(() => {
    if (!isVisited && state.checked.length) {
      onApplyCheckedFilter(path);
      setIsVisited(true);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (insClick && state.checked.length) {
      onApplyCheckedFilter(path);
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
    <Layout pathname={location} onFilterRemove={onFilterRemove}>
      {location !== "delivery" && (
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
              to="/restaurants"
              className={`link ${
                location === "restaurants" ? "switch-active" : ""
              }`}
            >
              Dinning
            </Link>
            <Link
              to="/nightlife"
              className={`link ${
                location === "nightlife" ? "switch-active" : ""
              }`}
            >
              Nightlife
            </Link>
          </div>
        </div>
      )}
      {dataNotAvailable && <NoData />}
      {!filterApplied &&
        (location === "delivery" ? (
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
        ) : (
          <div className="dine-cnt">
            <h2 className="col-title">Collections</h2>
            <div className="col-text mb-4">
              Explore curated lists of top restaurants, cafes, pubs, and bars
              based on trends
            </div>
            <div className="dine-coll-cards">
              {location === "restaurants" ? (
                collectionsData.slice(0, 4).map((col) => (
                  <Link key={col.id} to={`/collections/${col.slug}`}>
                    <CollCard
                      imgSrc={col.imgSrc}
                      title={col.title}
                      places={col.places}
                    />
                  </Link>
                ))
              ) : (
                <div className="dine-coll-cards" id="ntlf-coll-cards">
                  <Link to={"/collections/lit-party-place"}>
                    <CollCard
                      imgSrc={collectionsData[4]?.imgSrc}
                      title="Lit Party Place"
                      places="21"
                    />
                  </Link>
                  <Link to={"/collections/finest-microbrewaries"}>
                    <CollCard
                      imgSrc={collectionsData[5]?.imgSrc}
                      title="Finest Microbrewaries"
                      places="18"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      {location !== "delivery" && (
        <div className="dine-cnt">
          <img
            className="dsk-dis"
            height="250"
            width="100%"
            src={off}
            alt="discount 50%"
          />
        </div>
      )}
      <FoodList
        subHead="Order food online in Jai Singh Road"
        data={foodsData}
        path={path}
        onApplyCheckedFilter={onApplyCheckedFilter}
      />
    </Layout>
  );
};

export default MenuPage;
