import { useEffect, useState } from "react";
import {
  faClockRotateLeft,
  faCompass,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import "./similarproducts.css";
import { toast } from "react-hot-toast";

const SimilarProducts = () => {
  const [suggestFoodTypes, setSuggestFoodTypes] = useState([]);
  const [recommendedFoods, setRecommendedFoods] = useState({});
  const [searchText, setSearchText] = useState("");
  const [activeLink, setActiveLink] = useState(suggestFoodTypes[0]?.type);

  // Get all recommended food type
  const getAllTypes = async () => {
    try {
      const { data } = await axios.get(
        `/api/recommended/types?search=${searchText}`
      );
      setSuggestFoodTypes(data);
    } catch (error) {
      toast.error("Error while searching foods");
    }
  };

  // Get Recommended Foods
  const getRecommendedFoods = async () => {
    try {
      const { data } = await axios.get(
        `/api/recommended/all?search=${searchText}`
      );

      const foodByType = {};
      data.forEach((fd) => {
        if (!foodByType[fd.type]) foodByType[fd.type] = [];
        foodByType[fd.type].push(fd);
      });

      setRecommendedFoods(foodByType);
    } catch (error) {
      toast.error("error in recommended foods");
    }
  };

  useEffect(() => {
    getRecommendedFoods();
    getAllTypes();
  }, []);

  useEffect(() => {
    let timer;
    if (searchText) {
      timer = setTimeout(() => {
        getRecommendedFoods();
        getAllTypes();
      }, 500);
    } else {
      getRecommendedFoods();
      getAllTypes();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  // Callback for Intersection Observer
  const handleIntersection = (allEntries) => {
    allEntries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  };

  //Create Intersection Observer Instance
  useEffect(() => {
    if (window.innerWidth > 412) {
      const Observer = new IntersectionObserver(handleIntersection, {
        root: null,
        threshold: 0.8,
      });

      // Observe all sections with class section
      suggestFoodTypes.forEach((food) => {
        const targetSection = document.getElementById(food.type);
        if (targetSection) {
          Observer.observe(targetSection);
        }
      });
      return () => {
        Observer.disconnect();
      };
    }
  }, [suggestFoodTypes]);

  useEffect(() => {
    const targetSection = document.getElementById(activeLink);
    if (targetSection) targetSection.scrollIntoView({ behavior: "smooth" });
  }, [activeLink]);

  return (
    <div className="similar-products-container">
      <div className="types-list">
        {suggestFoodTypes?.map((food, idx) => (
          <div
            className={`${activeLink === food.type ? "active" : ""}`}
            key={idx}
          >
            <div
              className={`btn p-0 m-2 `}
              onClick={() => setActiveLink(food.type)}
            >
              {food.type}&nbsp;({food.count})
            </div>
          </div>
        ))}
      </div>
      <div className="recommended-foods-list">
        <div className="search-cnt">
          <div className="ms-3">
            <h2>Order Online</h2>
            <div className="search-head">
              <FontAwesomeIcon icon={faCompass} /> Live track your order |{" "}
              <FontAwesomeIcon icon={faClockRotateLeft} /> 33 min
            </div>
          </div>
          <div className="search-in-menu">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              onChange={(e) => setSearchText(e.target.value.toLowerCase())}
              className="ms-2"
              type="text"
              placeholder="Search within menu"
              value={searchText}
            />
            <FontAwesomeIcon icon={faXmark} onClick={() => setSearchText("")} />
          </div>
        </div>
        {suggestFoodTypes?.map((type) => (
          <div key={type.id} id={type.type} className="ms-3">
            <h4 className="mb-3">{type.type}</h4>
            {recommendedFoods[type.type]?.map((food) => (
              <div className="d-flex mb-4" key={food.id}>
                <img
                  width="130"
                  height="130"
                  src={food.imgSrc}
                  alt={food.type}
                  style={{ borderRadius: "8px", border: "none" }}
                />
                <div className="pd-dt">
                  <h5 key={food.id}>{food.title}</h5>
                  <div style={{ fontSize: "14px", color: "#4f4f4f" }}>
                    ₹{food.price}
                  </div>
                  <div style={{ fontSize: "14px", color: "#4f4f4f" }}>
                    {food.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
