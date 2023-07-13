import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { cuisinesOptions } from "../../../data/cuisines";
import { Checkbox } from "antd";
import "./cuisines.css";

const Cuisines = ({ checked, setChecked, setSelectedFilter }) => {
  const [searchCuisine, setSearchCuisine] = useState("");

  //   handle checked cuisines
  const handleCheckedCuisine = (value, name) => {
    let all = [...checked];
    if (value) {
      all.push(name);
      setSelectedFilter((prev) => [...prev, name]);
    }
    setChecked(all);
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
                handleCheckedCuisine(e.target.checked, cuisine.name)
              }
            >
              {cuisine.name}
            </Checkbox>
          ))}
      </div>
    </>
  );
};

export default Cuisines;
