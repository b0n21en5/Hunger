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
    <div className="home">
      <div className="banner ">
        <img
          height="380px"
          width="100%"
          src={banner}
          alt="banner"
          style={{ objectFit: "cover", border: "none" }}
        />
      </div>
      <div className="home-main-cnt">
        <div className="cards-cnt">
          <Link to="/order" className="link card">
            <img
              height="170"
              width="353"
              src={cd1}
              className="card-img-top"
              alt="card"
            />
            <div className="card-body">
              <div id="card-title">Order Online</div>
              <div id="card-text">Stay home and order to your doorstep.</div>
            </div>
          </Link>
          <Link to="/resturants" className="link card">
            <img
              height="170"
              width="353"
              src={cd2}
              className="card-img-top"
              alt="card"
            />
            <div className="card-body">
              <div id="card-title">Dining</div>
              <div id="card-text">
                View the city&apos;s favourite dining venues
              </div>
            </div>
          </Link>
          <Link to="/nightlife" className="link card">
            <img
              height="170"
              width="353"
              src={cd3}
              className="card-img-top"
              alt="card"
            />
            <div className="card-body">
              <div id="card-title">Nightlife and Clubs</div>
              <div id="card-text">
                Explore the city&apos;s top nightlife outlets
              </div>
            </div>
          </Link>
        </div>
        <div className="col-title">Collections</div>
        <div className="col-text">
          Explore curated lists of top restaurants, cafes, pubs, and bars in,
          based on trends
        </div>
        <div className="collections">
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
