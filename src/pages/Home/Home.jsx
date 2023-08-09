import { Link } from "react-router-dom";
import { collections } from "../../../data/collections";
import banner from "../../assets/banner.avif";
import CollCard from "../../Components/Collections/CollCard";

import "./home.css";

import cd1 from "../../assets/cd-1.avif";
import cd2 from "../../assets/cd-2.avif";
import cd3 from "../../assets/cd-3.avif";
import { useEffect, useState } from "react";
import { useFilterContext } from "../../contexts/useFilterContext";

const Home = () => {
  const { state, dispatch } = useFilterContext();

  useEffect(() => {
    dispatch({ type: "RESET_STATE" });
  }, [state.filterApplied]);

  return (
    <div>
      <div className="mb-4 position-relative">
        <img
          height="380px"
          width="100%"
          src={banner}
          alt="banner"
          style={{ objectFit: "cover", border: "none" }}
        />
      </div>
      <div className="main-cnt">
        <div className="d-flex justify-content-between mb-5">
          <Link to="/order" className="link cats">
            <div className="card" style={{ width: "353px" }}>
              <img
                height="170"
                width="353"
                src={cd1}
                className="card-img-top"
                alt="card"
              />
              <div className="card-body">
                <p id="card-title">Order Online</p>
                <p id="card-text">Stay home and order to your doorstep.</p>
              </div>
            </div>
          </Link>
          <Link to="/resturants" className="link cats">
            <div className="card" style={{ width: "353px" }}>
              <img
                height="170"
                width="353"
                src={cd2}
                className="card-img-top"
                alt="card"
              />
              <div className="card-body">
                <p id="card-title">Dining</p>
                <p id="card-text">
                  View the city&apos;s favourite dining venues
                </p>
              </div>
            </div>
          </Link>
          <Link to="/nightlife" className="link cats">
            <div className="card" style={{ width: "353px" }}>
              <img
                height="170"
                width="353"
                src={cd3}
                className="card-img-top"
                alt="card"
              />
              <div className="card-body">
                <p id="card-title">Nightlife and Clubs</p>
                <p id="card-text">
                  Explore the city&apos;s top nightlife outlets
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-title">Collections</div>
        <p className="col-text">
          Explore curated lists of top restaurants, cafes, pubs, and bars in,
          based on trends
        </p>
        <div className="d-flex justify-content-between">
          {collections.map(
            (col) =>
              col.id < 5 && (
                <Link key={col.id} to={`/collections/${col.slug}`}>
                  <CollCard
                    imgSrc={col.img}
                    title={col.title}
                    places={col.places}
                  />
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
