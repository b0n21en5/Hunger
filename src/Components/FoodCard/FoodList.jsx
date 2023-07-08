import { foods } from "../../../data/food";
import FoodCard from "./FoodCard";

const FoodList = () => {
  return (
    <>
      <h3 className="mt-5">Order food online in Jai Singh Road</h3>
      <div className="flex flex-col mt-5">
        <div className="d-flex flex-col flex-wrap gap-5 mt-5">
          {foods.map((fd) => (
            <FoodCard
              key={fd.id}
              title={fd.title}
              price={fd.price}
              type={fd.type}
              rating={fd.rating}
              imgSrc={fd.imgSrc}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FoodList;
