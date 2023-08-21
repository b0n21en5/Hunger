import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";

import "./searchmodal.css";

const SearchModal = ({
  searchText,
  setSearchText,
  isVisible,
  setIsVisible,
  path,
}) => {
  const [productList, setProductList] = useState([]);

  // Handle Search in Foods and Restaurants
  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/search?searchTerm=${searchText}`
      );
      setProductList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timer;

    setIsVisible(true);

    // Debounced search with timer
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  return ReactDOM.createPortal(
    <div className="search-modal-overlay" onClick={() => setIsVisible(false)}>
      {(isVisible || productList) && (
        <div
          className={`search-modal ${path}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-search-bar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onClick={() => setIsVisible(true)}
              type="text"
              placeholder="Search for resturant, cuisine or dish"
              autoFocus
            />
          </div>
          {productList.map((prod) => (
            <div className="prod" key={prod.title}>
              <img width="72" height="72" src={prod.imgSrc} alt={prod.title} />
              <div className="prod-details">
                <div className="prod-title">{prod.title}</div>
                <div className="prod-rat">
                  <div className="rat-btn">
                    {prod.rating}
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ fontSize: "10px" }}
                    />
                  </div>
                  {prod.category === "foods" ? "DISH" : "DINING"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>,
    document.getElementById("modal-root")
  );
};

export default React.memo(SearchModal);
