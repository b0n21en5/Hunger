import { Link } from "react-router-dom";
import { collections } from "../../../data/collections";
import banner from "../../assets/banner.avif";
import CollCard from "../../Components/Collections/CollCard";
import logoTrans from "../../assets/logo-trans.png";
import cd1 from "../../assets/cd-1.avif";
import cd2 from "../../assets/cd-2.avif";
import cd3 from "../../assets/cd-3.avif";
import { useEffect, useState } from "react";
import { useFilterContext } from "../../contexts/useFilterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchResult from "../../Components/SearchResult/SearchResult";

import "./home.css";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { state, dispatch } = useFilterContext();

  useEffect(() => {
    if (searchText) setIsVisible(true);
  }, [searchText]);

  useEffect(() => {
    dispatch({ type: "RESET_STATE" });
  }, [state.filterApplied]);

  return (
    <div className="home">
      <div className="banner">
        <img height="420" width="100%" src={banner} alt="banner" />
        <div className="contents-wrapper">
          <img width="290" height="70" src={logoTrans} alt="logo" />
          <h1 style={{ color: "white" }}>Discover the best foods & drinks</h1>
          <div className="search-bar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" />
            <input
              // ref={inputRef}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search for resturant, cuisine or dish"
            />
            {isVisible && (
              <div
                className="search-result-overlay"
                onClick={() => setIsVisible(false)}
              >
                {" "}
                <SearchResult
                  isVisible={isVisible}
                  setIsVisible={setIsVisible}
                  searchText={searchText}
                />
              </div>
            )}
          </div>
        </div>
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
