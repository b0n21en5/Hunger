import { useEffect, useState } from "react";
import { cuisinesOptions } from "../../../data/cuisines";
import "./similarproducts.css";

const SimilarProducts = ({ foods, selectedFoodTypes }) => {
  const [similarFoods, setSimilarFoods] = useState([]);
  // selectedFoodTypes?.map((fd) => console.log(fd));

  useEffect(() => {
    let newArr = [];
    const unId = [];
    selectedFoodTypes?.map((selfdtp) => {
      foods.map((fd) => {
        if (fd.type?.includes(selfdtp) && !unId.includes(fd.id)) {
          newArr.push(fd);
          unId.push(fd.id);
        }
      });
    });

    setSimilarFoods(newArr);
  }, [selectedFoodTypes]);

  return (
    <div className="d-flex">
      <div className="d-flex flex-column br-right" style={{ width: "20%" }}>
        <div className="btn ">Recommended ({similarFoods.length})</div>
        {selectedFoodTypes?.map((selFood, idx) => (
          <div className="btn " key={idx}>
            {selFood}&nbsp;({})
          </div>
        ))}
      </div>
      <div className="products" style={{ width: "80%" }}>
        {similarFoods.map((fd) => (
          <h5 key={fd.id}>{fd.title}</h5>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
