import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./cuisines.css";
import { setCheckedFilter } from "../../store/filterSlice";

const Cuisines = ({ checked, dispatch }) => {
  const [cuisinesOptions, setCuisinesOptions] = useState([]);
  const [searchCuisine, setSearchCuisine] = useState("");

  const inputRef = useRef(null);

  // Fetch all cuisines from db
  const getAllCuisines = async () => {
    try {
      const { data } = await axios.get(`/api/cuisines/get-all`);
      setCuisinesOptions(data.cuisines);
    } catch (error) {
      toast.error("Error in Cuisines API");
    }
  };

  //   handle checked cuisines
  const handleCheckedCuisine = (value, name) => {
    let allChecked = [...checked];
    if (value) {
      allChecked.push(name);
    } else {
      allChecked = allChecked.filter((c) => c !== name);
    }
    dispatch(setCheckedFilter(allChecked));
  };

  useEffect(() => {
    getAllCuisines();
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div className="search-bar">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" />
        <input
          ref={inputRef}
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
          ?.filter((item) => {
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
