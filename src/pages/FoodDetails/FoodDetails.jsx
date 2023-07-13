import { Link, useParams } from "react-router-dom";
import { foods } from "../../../data/food";
import { useEffect, useState } from "react";
import "./foodDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const FoodDetails = () => {
  const { slug } = useParams();
  const [selectedFood, setSelectedFood] = useState({});

  useEffect(() => {
    foods.map((fd) => {
      if (fd.slug === slug) setSelectedFood(fd);
    });
  }, []);

  return (
    <div>
      <Link to="/">
        <img src="" alt="logo" />
      </Link>

      <div className="main mt-4">
        <div className="grid-container">
          <div className="grid-item">
            <img
              src={selectedFood.imgSrc}
              alt="food"
              width="655"
              height="370"
            />
          </div>
          <div className="grid-item">
            <img
              src={selectedFood.imgSrc}
              width="355"
              height="180"
              alt="food"
            />
          </div>
          <div className="grid-item">
            <img
              src={selectedFood.imgSrc}
              width="355"
              height="180"
              alt="food"
            />
          </div>
        </div>

        <div className="mt-2">
          <h1 className="pd-title d-flex justify-content-between">
            {selectedFood.title}
            <div className="btn btn-success">
              {selectedFood.rating}&nbsp;
              <FontAwesomeIcon icon={faStar} />
            </div>
          </h1>
          <div className="">{selectedFood.type}</div>
          <div className="">₹{selectedFood.price}&nbsp;for one</div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
