import { useEffect, useState } from "react";
import "./similarproducts.css";

const SimilarProducts = ({ recommendedFoods }) => {
  const [suggestFoodTypes, setSuggestFoodTypes] = useState([]);

  // Method to set suggested FoodType
  const getFoodTypeCount = () => {
    // let id = 1;
    recommendedFoods.forEach((fd) => {
      const { type } = fd;
      const foodTypeCount = {};
      if (type === foodTypeCount.type) {
        foodTypeCount.count++;
      } else {
        foodTypeCount[type] = {
          type,
          count: 1,
          id: fd.id,
        };
      }
      setSuggestFoodTypes((prev) => [...prev, foodTypeCount]);
    });
  };

  useEffect(() => {
    getFoodTypeCount();
    console.log(suggestFoodTypes);
  }, []);

  return (
    <div className="d-flex mb-5">
      <div className="d-flex flex-column br-left" style={{ width: "20%" }}>
        <div className="btn ">Recommended ({recommendedFoods.length})</div>
        {suggestFoodTypes?.map((food) => (
          <div className="btn " key={food.id}>
            {food.type}&nbsp;({food.count})
          </div>
        ))}
      </div>
      <div className="products" style={{ width: "80%" }}>
        {recommendedFoods.map((food) => (
          <h5 key={food.id}>{food.title}</h5>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
