import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import SimilarProducts from "../../Components/SimilarProducts/SimilarProducts";

import "./productdetails.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProductDetails = ({ pathname = "restaurants" }) => {
  const [selectedFood, setSelectedFood] = useState({});

  const { slug } = useParams();

  // Get Single product from db
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/${pathname}?slug=${slug}`);
      setSelectedFood(data.data[0]);
    } catch (error) {
      toast.error("Error while fetching data");
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
          <SimilarProducts />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
