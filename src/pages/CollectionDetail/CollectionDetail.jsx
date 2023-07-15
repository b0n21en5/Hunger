import { useParams } from "react-router";
import "./collectiondetail.css";
import { useEffect, useState } from "react";
import { collections } from "../../../data/collections";
import { Link } from "react-router-dom";

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
      <div className="header">
        <Link to="/">
          <img src="" alt="logo" />
        </Link>
      </div>
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
            <p className="lead">{selectedCollection.desc}</p>
            <p className="mt-4">{selectedCollection.places + " Places"}</p>
          </div>
        </div>
      </div>

      <div className="card">{
        
        <img src="" alt="" className="card-img" />
        <div className="card-img-overlay"></div>
}</div>
    </>
  );
};

export default CollectionDetail;
