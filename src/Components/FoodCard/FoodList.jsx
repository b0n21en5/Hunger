import { useEffect, useState } from "react";
import { foods } from "../../../data/food";
import FoodCard from "./FoodCard";
import filter from "../../assets/filter.svg";
import FilterBox from "../FilterBox/FilterBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FoodList = () => {
  const [foodsData, setFoodsData] = useState(foods);
  const [loadFilter, setLoadFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filterApplied, setFilterApplied] = useState(0);

  useEffect(() => {
    if (selectedFilter.length) setFilterApplied(selectedFilter.length);
    else {
      setFilterApplied(0);

      // clear all filters reset data
      setFoodsData(foods);
      console.log(foods);
    }
  }, [selectedFilter.length]);

  // method to  remove selected filter
  const handleRemoveFilter = (seleFil) => {
    const filteredArray = selectedFilter.filter((sf) => {
      return sf !== seleFil;
    });
    setSelectedFilter(filteredArray);
  };

  return (
    <>
      <h3 className="mt-5">Order food online in Jai Singh Road</h3>
      <div className="filters mt-4 gap-3 d-flex flex-wrap">
        <button
          onClick={() => setLoadFilter((prev) => !prev)}
          className="btn btn-info text-center"
        >
          {filterApplied ? (
            <div className="btn btn-danger p-0 ps-1 pe-1 me-1">
              {selectedFilter.length}
            </div>
          ) : (
            <img className="me-1" src={filter} alt="filter" />
          )}
          Filters
        </button>
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
      {loadFilter && (
        <FilterBox
          setLoadFilter={setLoadFilter}
          foods={foodsData}
          setSelectedFilter={setSelectedFilter}
        />
      )}
      <div className="flex flex-col">
        <div className="d-flex flex-col flex-wrap gap-5 mt-3">
          {foodsData.map((fd) => (
            <FoodCard
              key={fd.id}
              title={fd.title}
              price={fd.price}
              type={fd.type}
              rating={fd.rating}
              imgSrc={fd.imgSrc}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FoodList;
