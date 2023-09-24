import { useEffect, useState } from "react";
import ProductList from "../../Components/FoodCard/ProductList";
import Layout from "../../Components/Layout/Layout";
import NoData from "../../Components/NoData/NoData";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import CollCard from "../../Components/Collections/CollCard";
import off from "../../assets/off.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  addCheckedFilter,
  setCheckedFilter,
  setDataNotAvailable,
  setEndSearchResults,
  setFilterApplied,
  setSelectedFilter,
  addSelectedFilter,
} from "../../store/filterSlice";
import "./menupage.css";

const MenuPage = () => {
  const [currPage, setCurrPage] = useState({
    fetchedData: [],
    isVisited: true,
    page: 1,
    pageLimit: 10,
  });

  const [cuisines, setCuisines] = useState({
    data: [],
    page: 1,
    pageLimit: 7,
    click: false,
  });

  const [brands, setBrands] = useState({
    data: [],
    page: 1,
    pageLimit: 7,
  });

  const [collectionsData, setCollectionsData] = useState([]);

  const state = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const location = useLocation().pathname.substring(1);

  let path = location === "delivery" ? "foods" : "restaurants";

  // Get all foods data
  const fetchDataDB = async () => {
    let limit = 3;
    if (window.innerWidth > 440) {
      limit = 9;
    }
    try {
      const { data } = await axios.get(
        `/api/${path}?page=${currPage.page}&limit=${limit}`
      );

      if (currPage.page === 1) {
        setCurrPage((p) => ({
          ...p,
          fetchedData: data.data,
          count: data.count,
        }));
        return;
      }
      setCurrPage((prev) => ({
        ...prev,
        fetchedData: [...prev.fetchedData, ...data.data],
        pageLimit: data.count,
      }));
    } catch (error) {
      toast.error("Error in Product API");
    }
  };

  // Get all collections
  const getAllCollections = async () => {
    try {
      const { data } = await axios.get("/api/collections");
      setCollectionsData(data);
    } catch (error) {
      toast.error("Error Fetching Collections!");
    }
  };

  // Set Cuisines data
  const getLimitedCuisines = async () => {
    let limit = 6;
    if (window.innerWidth <= 440) {
      limit = 8;
    }
    try {
      const { data } = await axios.get(
        `/api/cuisines/get-all?rating=4.5&page=${cuisines.page}&limit=${limit}`
      );
      setCuisines((p) => ({
        ...p,
        data: data.cuisines,
        pageLimit: data.count,
      }));
    } catch (error) {
      toast.error("Error Fetching Cuisines!");
    }
  };

  // Set Brands data
  const getLimitedBrands = async () => {
    let limit = 6;
    if (window.innerWidth <= 440) {
      limit = 12;
    }
    try {
      const { data } = await axios.get(
        `/api/brands/get-all?rating=4.5&page=${brands.page}&limit=${limit}`
      );
      setBrands((p) => ({
        ...p,
        data: data.brands,
        pageLimit: data.count,
      }));
    } catch (error) {
      toast.error("Error Fetching Brands!");
    }
  };

  // Method to apply checked filters
  const onApplyCheckedFilter = async (path) => {
    state.checked.forEach((ch) => {
      if (!state.selectedFilter.includes(ch)) dispatch(addSelectedFilter(ch));
    });

    const { data } = await axios.get(
      `/api/${path}?checkedFilter=${state.checked?.join(",")}&sort=${
        state.radio
      }`
    );

    if (data.data.length) {
      setCurrPage((p) => ({
        ...p,
        fetchedData: data.data,
        pageLimit: data.count,
      }));
      dispatch(setDataNotAvailable(false));
      dispatch(setEndSearchResults(true));
    } else {
      setCurrPage((p) => ({ ...p, page: 1 }));
      if (path === "foods") fetchDataDB();
      else setCurrPage((p) => ({ ...p, fetchedData: [] }));
      dispatch(setDataNotAvailable(true));
      dispatch(setEndSearchResults(false));
    }
  };

  // Method to remove selected filter
  const onFilterRemove = (removeFilter) => {
    const filteredArray = state.selectedFilter.filter(
      (sf) => sf !== removeFilter
    );
    dispatch(setSelectedFilter(filteredArray));
    const filterChecked = state.checked.filter((sc) => sc !== removeFilter);
    dispatch(setCheckedFilter(filterChecked));

    // filter foods data based on removed filters
    if (filterChecked.length) {
      onApplyCheckedFilter(path);
      setCuisines((p) => ({ ...p, click: true }));
    } else {
      // Clear all filters and reset data
      fetchDataDB();
      setCurrPage((p) => ({ ...p, page: 1 }));

      dispatch(setDataNotAvailable(false));
      dispatch(setEndSearchResults(false));
    }
  };

  // Handle Scroll for to change current page
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight / 2) {
      setCurrPage((p) => ({ ...p, page: p.page + 1 }));
    }
  };

  useEffect(() => {
    // Fetch Data on initial render
    fetchDataDB();

    if (location !== "delivery") getAllCollections();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setCurrPage((p) => ({ ...p, page: 1 }));
      setCurrPage((p) => ({ ...p, fetchedData: [] }));
      setCurrPage((p) => ({ ...p, isVisited: false }));
    };
  }, [location]);

  // Applying filter on navigating back to the page
  useEffect(() => {
    if (!currPage.isVisited && state.checked.length) {
      onApplyCheckedFilter(path);
      setCurrPage((p) => ({ ...p, isVisited: true }));
    }
  }, [currPage.fetchedData]);

  useEffect(() => {
    if (
      !state.checked.length &&
      currPage.fetchedData.length < currPage.pageLimit
    )
      fetchDataDB();
  }, [currPage.page]);

  useEffect(() => {
    if (cuisines.click && state.checked.length) {
      onApplyCheckedFilter(path);
      setCuisines((p) => ({ ...p, click: false }));
    }
  }, [cuisines.click]);

  useEffect(() => {
    getLimitedCuisines();
  }, [cuisines.page]);

  useEffect(() => {
    getLimitedBrands();
  }, [brands.page]);

  useEffect(() => {
    getLimitedCuisines();
    getLimitedBrands();
    // When navigating away from the component, update the visited flag
    return () => {
      setCurrPage((p) => ({ ...p, isVisited: false }));
    };
  }, []);

  useEffect(() => {
    if (state.checked) {
      dispatch(setFilterApplied(state.checked.length));
      if (!cuisines.click) {
        onApplyCheckedFilter(path);
      }
    }
  }, [state.checked]);

  return (
    <Layout pathname={location} onFilterRemove={onFilterRemove}>
      {location !== "delivery" && (
        <div className="dine-cnt mb-dis">
          <img height="86" width="380" src={off} alt="discount 50%" />
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
      {state.dataNotAvailable && <NoData />}
      {!state.filterApplied &&
        (location === "delivery" ? (
          <>
            <div className="cuisines">
              <h3>Inspiration for your first order</h3>
              <div className="cui-cards">
                {cuisines.page > 1 && (
                  <FontAwesomeIcon
                    onClick={() =>
                      setCuisines((p) => ({ ...p, page: p.page - 1 }))
                    }
                    icon={faAngleLeft}
                    className="more-btn prev-btn"
                  />
                )}
                {cuisines.data.map((cui) => (
                  <div
                    key={cui.id}
                    className="cui-card-body"
                    onClick={() => {
                      dispatch(addCheckedFilter(cui.name));
                      setCuisines((p) => ({ ...p, click: true }));
                    }}
                  >
                    <div className="cui-det">
                      <img
                        width="150"
                        height="150"
                        style={{ borderRadius: "50%" }}
                        src={cui.imgSrc}
                        alt={cui.name}
                        className="mb-1"
                      />
                      <div className="cui-name">{cui.name}</div>
                    </div>
                  </div>
                ))}
                {cuisines.page + 6 <= cuisines.pageLimit && (
                  <FontAwesomeIcon
                    onClick={() =>
                      setCuisines((p) => ({ ...p, page: p.page + 1 }))
                    }
                    icon={faAngleRight}
                    className="more-btn"
                  />
                )}
              </div>
            </div>

            <div className="brands ">
              <h3>Top brands for you</h3>
              <div className="brand-body">
                {brands.page > 1 && (
                  <FontAwesomeIcon
                    onClick={() =>
                      setBrands((p) => ({ ...p, page: p.page - 1 }))
                    }
                    icon={faAngleLeft}
                    className="more-btn prev-brnd"
                  />
                )}
                {brands.data.map((brnd) => (
                  <div key={brnd.id} className="cui-card-body">
                    <Link to={`/restaurants/${brnd.slug}`}>
                      <img
                        width="148"
                        height="150"
                        style={{
                          background: "#f8f8f8 ",
                          borderRadius: "50%",
                          boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 12px 0px",
                        }}
                        src={brnd.imgSrc}
                        alt={brnd.name}
                        className="mb-1"
                      />
                    </Link>
                    <div className="text-center">{brnd.name}</div>
                    <div className="text-center">{brnd.delivery} min</div>
                  </div>
                ))}
                {brands.page + 6 <= brands.pageLimit && (
                  <FontAwesomeIcon
                    onClick={() =>
                      setBrands((p) => ({ ...p, page: p.page + 1 }))
                    }
                    icon={faAngleRight}
                    className="more-btn"
                  />
                )}
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
        <div className="dine-cnt" style={{ background: "white" }}>
          <img
            className="dsk-dis"
            height="250"
            width="100%"
            src={off}
            alt="discount 50%"
          />
        </div>
      )}
      <ProductList
        subHead="Order food online in Jai Singh Road"
        data={currPage.fetchedData}
        path={path}
        onApplyCheckedFilter={onApplyCheckedFilter}
      />
    </Layout>
  );
};

export default MenuPage;
