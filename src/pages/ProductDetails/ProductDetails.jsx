import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import SimilarProducts from "../../Components/SimilarProducts/SimilarProducts";
import { recommendedFoods } from "../../../data/recommended";

import "./productdetails.css";
import axios from "axios";

const ProductDetails = ({ pathname }) => {
  const [selectedFood, setSelectedFood] = useState({});

  const { slug } = useParams();

  // Get Single product from db
  const getSingleProduct = async () => {
    let url = "http://localhost:4000/api/foods/get-single-food";
    if (pathname === "resturants") {
      url = "http://localhost:4000/api/restaurants/get-single-restaurant";
    }

    try {
      const { data } = await axios.get(`${url}/${slug}`);
      setSelectedFood(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <>
      <NavBar />
      <div className="prod-detail">
        <div className="mt-4">
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

          <div className="prodDetails-body">
            <h1 className="pd-title d-flex justify-content-between">
              {selectedFood.title}
              <div className="btn btn-success">
                {selectedFood.rating}&nbsp;
                <FontAwesomeIcon icon={faStar} />
              </div>
            </h1>
            <div className="fd-type">{selectedFood.type}</div>
            <div className="fd-price">₹{selectedFood.price}&nbsp;for one</div>
          </div>

          {/* similar products */}
          <SimilarProducts foods={recommendedFoods} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
