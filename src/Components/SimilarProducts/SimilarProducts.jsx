import { useEffect, useState } from "react";
import "./similarproducts.css";
import {
  faClockRotateLeft,
  faCompass,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SimilarProducts = ({ foods }) => {
  const [recommendedFoods, setRecommendedFoods] = useState(foods);
  const [suggestFoodTypes, setSuggestFoodTypes] = useState([]);
  const [foodsItemsByType, setFoodsItemsByType] = useState({});
  const [searchText, setSearchText] = useState("");
  const [activeLink, setActiveLink] = useState(suggestFoodTypes[0]?.type);

  // Method to set suggested FoodType
  const countFoodType = (foods) => {
    const foodTypeCount = {};
    foods.forEach((fd) => {
      const { type } = fd;
      if (foodTypeCount[type]) {
        foodTypeCount[type].count++;
      } else {
        foodTypeCount[type] = {
          type,
          count: 1,
          id: fd.id,
        };
      }
    });

    // Convert object to an array of objects
    const foodTypeArray = Object.values(foodTypeCount);

    return foodTypeArray;
  };

  useEffect(() => {
    const updatedFoodTypeArray = countFoodType(recommendedFoods);
    setSuggestFoodTypes(updatedFoodTypeArray);
  }, [recommendedFoods]);

  // sorting food items by their types
  useEffect(() => {
    const foodByType = {};
    recommendedFoods.forEach((fd) => {
      if (!foodByType[fd.type]) foodByType[fd.type] = [];
      foodByType[fd.type].push(fd);
    });

    setFoodsItemsByType(foodByType);
  }, [recommendedFoods]);

  // search within menu

  useEffect(() => {
    if (!searchText) {
      setRecommendedFoods(foods);
    } else {
      const lowerCasedSearchText = searchText.toLowerCase();
      let filteredFoods = foods.filter((fd) => {
        const lowerCasedType = fd.type.toLowerCase();
        const lowerCasedTitle = fd.title.toLowerCase();
        return (
          lowerCasedType.includes(lowerCasedSearchText) ||
          lowerCasedTitle.includes(lowerCasedSearchText)
        );
      });
      setRecommendedFoods(filteredFoods);
    }
  }, [searchText, foods]);

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
  }, [suggestFoodTypes]);

  useEffect(() => {
    const targetSection = document.getElementById(activeLink);
    if (targetSection) targetSection.scrollIntoView({ behavior: "smooth" });
  }, [activeLink]);

  return (
    <div className="d-flex mb-5 similar-products-container">
      <div className="types-list">
        {suggestFoodTypes?.map((food) => (
          <div
            className={`${activeLink === food.type ? "active" : ""}`}
            key={food.id}
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
        <div className="d-flex justify-content-between">
          <div className="">
            <h2>Order Online</h2>
            <div
              style={{
                fontSize: "14px",
                color: "#828282",
                marginBottom: "1.5rem",
                fontWeight: "100",
              }}
            >
              <FontAwesomeIcon icon={faCompass} /> Live track your order |{" "}
              <FontAwesomeIcon icon={faClockRotateLeft} /> 33 min
            </div>
          </div>
          <div className="search-in-menu">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              onChange={(e) => setSearchText(e.target.value)}
              className="ms-2"
              type="text"
              placeholder="Search within menu"
              value={searchText}
            />
            <FontAwesomeIcon icon={faXmark} onClick={() => setSearchText("")} />
          </div>
        </div>
        {suggestFoodTypes?.map((type) => (
          <div key={type.id} id={type.type} className="section">
            <h4 className="mb-3">{type.type}</h4>
            {foodsItemsByType[type.type]?.map((food) => (
              <div className="d-flex mb-4" key={food.id}>
                <img
                  src={food.imgSrc}
                  alt={food.type}
                  style={{ borderRadius: "8px", border: "none" }}
                />
                <div className="d-flex flex-column ms-4 mt-1">
                  <h5 key={food.id}>{food.title}</h5>
                  <p style={{ fontSize: "14px", color: "#4f4f4f" }}>
                    ₹{food.price}
                  </p>
                  <p style={{ fontSize: "14px", color: "#4f4f4f" }}>
                    {food.desc}
                  </p>
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
