import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { cuisinesOptions } from "../../../data/cuisines";
import { Checkbox } from "antd";
import "./cuisines.css";

const Cuisines = ({ checked, setChecked }) => {
  const [searchCuisine, setSearchCuisine] = useState("");

  //   handle checked cuisines
  const handleCheckedCuisine = (value, name) => {
    let all = [...checked];
    if (value) {
      all.push(name);
    } else {
      all = all.filter((c) => c !== name);
    }
    setChecked({ type: "SET_CHECK_FILTER", payload: all });

    console.log(checked);
  };

  return (
    <>
      <div className="search-bar">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" />
        <input
          onChange={(e) => setSearchCuisine(e.target.value)}
          type="text"
          placeholder="Search here"
          value={searchCuisine}
        />
        <FontAwesomeIcon
          icon={faXmark}
          className="me-2"
          onClick={() => setSearchCuisine("")}
        />
      </div>
      <div className="checkitems" style={{ overflow: "auto" }}>
        {cuisinesOptions
          .filter((item) => {
            return searchCuisine.toLowerCase() === ""
              ? item
              : item.name.toLowerCase().includes(searchCuisine);
          })
          .map((cuisine) => (
            <Checkbox
              style={{
                fontSize: "1rem",
                width: "50%",
                marginBottom: "1rem",
              }}
              key={cuisine.id}
              onChange={(e) =>
                handleCheckedCuisine(e.target.checked, e.target.name)
              }
              name={cuisine.name}
              checked={checked.includes(cuisine.name)}
            >
              {cuisine.name}
            </Checkbox>
          ))}
      </div>
    </>
  );
};

export default Cuisines;
