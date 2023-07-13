import { useEffect, useState } from "react";
import { foods } from "../../../data/food";
import FoodCard from "./FoodCard";
import filter from "../../assets/filter.svg";
import FilterBox from "../FilterBox/FilterBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Cuisines from "../Cuisines/Cuisines";
import { NavLink } from "react-router-dom";

const FoodList = () => {
  const [foodsData, setFoodsData] = useState(foods);
  const [loadFilter, setLoadFilter] = useState(false);
  const [loadCuisines, setLoadCuisines] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filterApplied, setFilterApplied] = useState(0);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    if (selectedFilter.length) setFilterApplied(selectedFilter.length);
    else {
      setFilterApplied(0);

      // clear all filters reset data
      setFoodsData(foods);
    }
  }, [selectedFilter.length]);

  // method to  remove selected filter
  const handleRemoveFilter = (seleFil) => {
    const filteredArray = selectedFilter.filter((sf) => {
      return sf !== seleFil;
    });
    setSelectedFilter(filteredArray);
  };

  // method to handle filter button
  const handleFilterBtn = () => {
    setLoadFilter((prev) => !prev);
    setLoadCuisines(false);
  };

  //   method apply checked filters
  const handleCheckedFilter = () => {
    let checkedArray = [];
    checked.map((ch) => {
      foodsData.map((fd) => {
        if (fd.type.includes(ch)) checkedArray.push(fd);
      });
    });
    setFoodsData(checkedArray);
    setLoadCuisines(false);
  };

  return (
    <>
      <h3 className="mt-5">Order food online in Jai Singh Road</h3>
      <div className="filters mt-4 gap-3 d-flex flex-wrap">
        <button onClick={handleFilterBtn} className="btn btn-info text-center">
          {filterApplied ? (
            <div className="btn btn-danger p-0 ps-1 pe-1 me-1">
              {selectedFilter.length}
            </div>
          ) : (
            <img className="me-1" src={filter} alt="filter" />
          )}
          Filters
        </button>

        <div
          className="btn btn-info text-center"
          onClick={() => setLoadCuisines(true)}
        >
          Cusines
          <FontAwesomeIcon icon={faChevronDown} />
        </div>

        {selectedFilter?.map((seleFil, ind) => (
          <button
            key={ind}
            className="btn btn-danger"
            onClick={() => handleRemoveFilter(seleFil)}
          >
            {seleFil}
            <FontAwesomeIcon className="ms-2" icon={faXmark} />
          </button>
        ))}
      </div>
      {loadCuisines && (
        <div className="cuisines-box mt-3">
          <div className="cuisineTitle">Cuisines</div>
          <Cuisines
            checked={checked}
            setChecked={setChecked}
            setSelectedFilter={setSelectedFilter}
          />
          <div className="bottom d-flex justify-content-end mt-4 gap-3">
            <button
              onClick={() => {
                setLoadCuisines(false);
                setSelectedFilter([]);
              }}
              className="btn btn-light"
            >
              Clear all
            </button>
            <button className="btn btn-danger" onClick={handleCheckedFilter}>
              Apply
            </button>
          </div>
        </div>
      )}
      {loadFilter && (
        <FilterBox
          setLoadFilter={setLoadFilter}
          foods={foodsData}
          setSelectedFilter={setSelectedFilter}
          handleCheckedFilter={handleCheckedFilter}
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
