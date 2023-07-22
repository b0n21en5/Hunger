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

  return (
    <div className="d-flex mb-5">
      <div className="d-flex flex-column br-left" style={{ width: "20%" }}>
        <div className="btn p-0 m-2">
          Recommended ({recommendedFoods?.length})
        </div>
        {suggestFoodTypes?.map((food) => (
          <div className="btn p-0 m-2" key={food.id}>
            {food.type}&nbsp;({food.count})
          </div>
        ))}
      </div>
      <div className="products ms-4 mt-2" style={{ width: "80%" }}>
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
          <div className="d-flex align-items-center search-in-menu">
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
          <div key={type.id}>
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
