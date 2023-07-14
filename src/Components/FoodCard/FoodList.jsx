import { useEffect, useReducer, useState } from "react";
import { foods } from "../../../data/food";
import FoodCard from "./FoodCard";
import filter from "../../assets/filter.svg";
import FilterBox from "../FilterBox/FilterBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Cuisines from "../Cuisines/Cuisines";
import { NavLink } from "react-router-dom";
import { initialState, reducer } from "../../reducer/useDeliveryReducer";

const FoodList = ({
  onFilterBtnClick,
  onCheckedFilter,
  onFilterRemove,
  state,
  dispatch,
  foodsData,
}) => {
  return (
    <>
      <h3 className="mt-5">Order food online in Jai Singh Road</h3>
      <div className="filters mt-4 gap-3 d-flex flex-wrap">
        <button onClick={onFilterBtnClick} className="btn btn-info text-center">
          {state.filterApplied ? (
            <div className="btn btn-danger p-0 ps-1 pe-1 me-1">
              {state.filterApplied}
            </div>
          ) : (
            <img className="me-1" src={filter} alt="filter" />
          )}
          Filters
        </button>

        <div
          className="btn btn-info text-center"
          onClick={() => {
            dispatch({ type: "LOADCUISINES-YES" });
            dispatch({ type: "LOADFILTER-NO" });
          }}
        >
          Cusines
          <FontAwesomeIcon icon={faChevronDown} />
        </div>

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
      {state.loadCuisines && (
        <div className="cuisines-box mt-3">
          <div className="cuisineTitle">Cuisines</div>
          <Cuisines checked={state.checked} setChecked={dispatch} />
          <div className="bottom d-flex justify-content-end mt-4 gap-3">
            <button
              onClick={() => {
                dispatch({ type: "LOADCUISINES-NO" });
                dispatch({ type: "REP_FILTER_ARR", payload: [] });
              }}
              className="btn btn-light"
            >
              Clear all
            </button>
            <button className="btn btn-danger" onClick={onCheckedFilter}>
              Apply
            </button>
          </div>
        </div>
      )}
      {state.loadFilter && (
        <FilterBox
          setLoadFilter={dispatch}
          foods={foodsData}
          setSelectedFilter={dispatch}
          onCheckedFilter={onCheckedFilter}
          checked={state.checked}
          setChecked={dispatch}
        />
      )}
      <div className="flex flex-col" role="button">
        <div className="d-flex flex-col flex-wrap gap-5 mt-3">
          {foodsData.map((fd) => (
            <NavLink
              to={`/order/${fd.slug}`}
              key={fd.id}
              className=" text-decoration-none"
            >
              <FoodCard
                title={fd.title}
                price={fd.price}
                type={fd.type}
                rating={fd.rating}
                imgSrc={fd.imgSrc}
              />
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default FoodList;
