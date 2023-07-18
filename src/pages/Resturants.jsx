import { useEffect, useReducer, useState } from "react";
import { resturants } from "../../data/resturants";
import Collections from "../Components/Collections/Collections";
import FoodCard from "../Components/FoodCard/FoodCard";
import Layout from "../Components/Layout/Layout";
import off from "../assets/off.avif";
import { initialState, reducer } from "../reducer/useDeliveryReducer";
import filter from "../assets/filter.svg";
import FilterBox from "../Components/FilterBox/FilterBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Resturants = () => {
  const [resturantsData, setResturantsData] = useState(resturants);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.selectedFilter.length) {
      dispatch({
        type: "FILTER_APPLIED",
        payload: state.selectedFilter.length,
      });

      if (state.checked.length) {
        let checkedArray = [];
        state.checked.map((ch) => {
          resturants.map((fd) => {
            if (fd.type.includes(ch)) checkedArray.push(fd);
          });
        });
        setResturantsData(checkedArray);
      }
    } else {
      dispatch({ type: "FILTER_APPLIED", payload: 0 });

      // clear all filters reset data
      setResturantsData(resturants);
    }
  }, [state.selectedFilter?.length]);

  // method to  remove selected filter
  const onFilterRemove = (seleFil) => {
    const filteredArray = state.selectedFilter.filter((sf) => {
      return sf !== seleFil;
    });
    // setSelectedFilter(filteredArray);
    dispatch({ type: "REP_FILTER_ARR", payload: filteredArray });
    const filterChecked = state.checked.filter((sc) => {
      return sc !== seleFil;
    });
    dispatch({ type: "SET_CHECK_FILTER", payload: filterChecked });
  };

  // method to apply checked filters
  const onCheckedFilter = () => {
    dispatch({ type: "LOADCUISINES-NO" });

    let checkedArray = [];

    state.checked.map((ch) => {
      if (!state.selectedFilter.includes(ch))
        dispatch({ type: "ADD_FILTER_ARR", payload: ch });

      resturants.map((fd) => {
        if (fd.type.includes(ch)) checkedArray.push(fd);
      });
    });
    setResturantsData(checkedArray);
  };

  useEffect(() => {
    dispatch({ type: "REP_FILTER_ARR", payload: state.checked });
  }, [state.checked?.length]);

  return (
    <div className={`${state.loadFilter ? "deactivate" : ""}`}>
      <Layout pathname="dining">
        <div className="main-cnt">
          {!state.filterApplied && <Collections />}
          <img
            className="mt-5"
            height="250"
            width="100%"
            src={off}
            alt="discount 50%"
          />

          <div className="d-flex gap-3 mt-3 ">
            {/* filter button */}
            <button
              className="btn btn-info"
              onClick={() => dispatch({ type: "LOADFILTER-YES" })}
            >
              {state.filterApplied ? (
                <div className="btn btn-danger p-0 ps-1 pe-1 me-1">
                  {state.filterApplied}
                </div>
              ) : (
                <img className="me-1" src={filter} alt="filter" />
              )}
              Filter
            </button>

            {/* buuton for added filters */}
            {state.selectedFilter?.map((seleFil, ind) => (
              <button
                key={ind}
                className="btn btn-danger"
                onClick={() => onFilterRemove(seleFil)}
              >
                {seleFil}
                <FontAwesomeIcon className="ms-2" icon={faXmark} />
              </button>
            ))}
          </div>

          {state.loadFilter && (
            <FilterBox
              selectedFilter={state.selectedFilter}
              foods={resturantsData}
              onCheckedFilter={onCheckedFilter}
              checked={state.checked}
              radio={state.radio}
              dispatch={dispatch}
            />
          )}

          <h3 className="mt-3">Trending dining restaurants in Delhi NCR</h3>
          <div className="d-flex flex-col flex-wrap gap-5 mt-5">
            {resturantsData.map((res) => (
              <FoodCard
                key={res.id}
                title={res.title}
                slug={`/resturants/${res.slug}`}
                price={res.price}
                rating={res.rating}
                type={res.type}
                imgSrc={res.imgSrc}
                location={res.location}
                dist={res.dist}
              />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Resturants;
