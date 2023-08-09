import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./productdetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import SimilarProducts from "../../Components/SimilarProducts/SimilarProducts";
import logo from "../../assets/logo.webp";
import { recommendedFoods } from "../../../data/recommended";
import { useFilterContext } from "../../contexts/useFilterContext";
import { resturants } from "../../../data/resturants";

const ProductDetails = ({ pathname }) => {
  const [selectedFood, setSelectedFood] = useState({});

  const { state } = useFilterContext();
  const { fetchedData } = state;
  console.log(fetchedData);

  const { slug } = useParams();

  useEffect(() => {
    if (pathname === "resturants") {
      resturants.forEach((res) => {
        if (res.slug === slug) return setSelectedFood(res);
      });
    } else {
      fetchedData.forEach((fd) => {
        if (fd.slug === slug) return setSelectedFood(fd);
      });
    }
  }, []);

  return (
    <>
      <div className="nav">
        <Link to="/">
          <img width="126" height="27" src={logo} alt="logo" />
        </Link>
      </div>
      <div style={{ padding: "0 82px" }}>
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

          <div className="foodDetails">
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
