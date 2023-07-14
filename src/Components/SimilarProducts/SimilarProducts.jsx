import { cuisinesOptions } from "../../../data/cuisines";
import "./similarproducts.css";

const SimilarProducts = () => {
  return (
    <div>
      <div className="d-flex flex-column br-right" style={{ width: "20%" }}>
        <div className="btn ">Recommended()</div>
        {cuisinesOptions.map((cuisine) => (
          <div className="btn " key={cuisine.id}>
            {cuisine.name}&nbsp;()
          </div>
        ))}
      </div>
      <div className="" style={{ width: "80%" }}></div>
    </div>
  );
};

export default SimilarProducts;
