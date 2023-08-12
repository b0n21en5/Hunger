import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { collections } from "../../../data/collections";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../../Components/NavBar/NavBar";
import { resturants } from "../../../data/resturants";

import "./collectiondetail.css";

const CollectionDetail = () => {
  const [selectedCollection, setSelectedCollection] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    collections.map((col) => {
      if (col.slug === slug) setSelectedCollection(col);
    });
  }, []);

  return (
    <>
      <NavBar />
      <div className="coll-card">
        <div className="jumbotron jumbotron-fluid">
          <img
            src={selectedCollection.img}
            height="320"
            width="99%"
            alt={selectedCollection.title}
          />
          <div className="container">
            <h1 className="display-4">
              {selectedCollection.places + " " + selectedCollection.title}
            </h1>
            <h6 className="lead">{selectedCollection.desc}</h6>
            <p>{selectedCollection.places + " Places"}</p>
          </div>
        </div>
      </div>

      <div className="coll-data">
        {resturants.map((un) => (
          <Link
            key={un.id}
            to={`/coll-details/${un.slug}`}
            className="text-decoration-none mb-2"
          >
            <div className="card">
              <img
                src={un.imgSrc}
                width="288"
                height="192"
                className="card-img-top"
                alt={un.title}
              />
              <div className="coll-card-detail">
                <div
                  className="card-title"
                  style={{
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  {un.title.substr(0, 29) +
                    (un.title.length >= 29 ? " ..." : "")}
                </div>
                <div className="d-flex ">
                  <div className="btn-success">
                    {un.rating}&nbsp;
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                  <span>&nbsp;DINING&nbsp;|&nbsp;</span>
                  <div
                    className="btn-success"
                    style={{ backgroundColor: "#9c9c9c" }}
                  >
                    -<FontAwesomeIcon icon={faStar} />
                  </div>
                  <span>&nbsp;DELIVERY</span>
                </div>
                <div className="d-flex justify-content-between mt-1">
                  <div className="card-text">
                    {un.type.substr(0, 33) +
                      (un.type.length >= 33 ? " ..." : "")}
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="card-text">{un.location}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CollectionDetail;
