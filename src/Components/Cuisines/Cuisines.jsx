import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { cuisinesOptions } from "../../../data/cuisines";
import { Checkbox } from "antd";
import "./cuisines.css";

const Cuisines = ({
  title,
  loadCuisines,
  setLoadCuisines,
  setSelectedFilter,
  foodsData,
  setFoodsData,
}) => {
  const [checked, setChecked] = useState([]);

  useEffect(() => {}, []);

  //   handle checked cuisines
  const handleCheckedCuisine = (value, name) => {
    let all = [...checked];
    if (value) {
      all.push(name);
      setSelectedFilter((prev) => [...prev, name]);
    }
    setChecked(all);
  };

  //   method apply checked filters
  const handleCheckedFilter = () => {
    let checkedArray = [];
    checked.map((ch) => {
      foodsData.map((fd) => {
        if (fd.type.includes(ch)) checkedArray.push(fd);
        // console.log(fd.type + " ;; " + ch);
      });
    });
    setFoodsData(checkedArray);
    console.log(foodsData);
  };

  useEffect(() => {
    console.log(foodsData);
  }, [foodsData]);

  // method to handle apply button
  const handleApply = () => {
    handleCheckedFilter();
    setLoadCuisines(false);
  };

  return (
    <>
      {loadCuisines && (
        <div className="cuisines-box mt-3">
          {title && <div className="cuisineTitle">{title}</div>}
          <div className="content">
            <div className="search-bar">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" />
              <input type="text" placeholder="Search here" />
              <FontAwesomeIcon icon={faXmark} className="me-2" />
            </div>
            <div className="checkitems" style={{ overflow: "auto" }}>
              {cuisinesOptions.map((cuisine) => (
                <Checkbox
                  style={{
                    fontSize: "1rem",
                    width: "50%",
                    marginBottom: "1rem",
                  }}
                  key={cuisine.id}
                  onChange={(e) =>
                    handleCheckedCuisine(e.target.checked, cuisine.name)
                  }
                >
                  {cuisine.name}
                </Checkbox>
              ))}
            </div>
          </div>
          <div className="bottom d-flex justify-content-end mt-4 gap-3">
            <button
              onClick={() => {
                setLoadCuisines(false);
              }}
              className="btn btn-light"
            >
              Clear all
            </button>
            <button onClick={handleApply} className="btn btn-danger">
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cuisines;
