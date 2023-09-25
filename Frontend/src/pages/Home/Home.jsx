import { Link } from "react-router-dom";
import banner from "../../assets/banner.avif";
import CollCard from "../../Components/Collections/CollCard";
import logoTrans from "../../assets/logo-trans.png";
import cd1 from "../../assets/cd-1.avif";
import cd2 from "../../assets/cd-2.avif";
import cd3 from "../../assets/cd-3.avif";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import SearchModal from "../../Components/SearchModal/SearchModal";
import Login from "../../Components/Auth/Login";
import SignUp from "../../Components/Auth/SignUp";
import axios from "axios";
import UserModal from "../../Components/UserModal/UserModal";
import Reset from "../../Components/Auth/Reset";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../../Components/Layout/Footer";

import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../store/filterSlice";

import "./home.css";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [forPassVis, setForPassVis] = useState(false);
  const [collectionsData, setCollectionsData] = useState([]);

  const { filterApplied } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  // Get all collections
  const getAllCollections = async () => {
    try {
      const { data } = await axios.get("/api/collections");
      setCollectionsData(data);
    } catch (error) {
      toast.error("Error in Collections API");
    }
  };

  useEffect(() => {
    getAllCollections();
  }, []);

  useEffect(() => {
    dispatch(resetState());
  }, [filterApplied]);

  return (
    <div className="home">
      <div className="banner">
        <Toaster position="top-right" />
        <div className="user-auth">
          {!user ? (
            <>
              <FontAwesomeIcon
                className="mb-user-login"
                icon={faUser}
                onClick={() => setIsLoginVisible(true)}
              />
              <Link className="link" onClick={() => setIsLoginVisible(true)}>
                Log in
              </Link>
              <Link className="link" onClick={() => setIsSignupVisible(true)}>
                Sign Up
              </Link>
            </>
          ) : (
            <div
              className="user-info"
              onClick={() => setUserModalVisible((pr) => !pr)}
            >
              <>
                <Link to="/profile">
                  <img
                    className="mb-user-img"
                    width="30"
                    height="30"
                    src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                    alt="user"
                  />
                </Link>
                <div className="user-det">
                  <img
                    width="40"
                    height="40"
                    src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                    alt="user"
                  />
                  <Link>{user}</Link>
                  <FontAwesomeIcon
                    icon={userModalVisible ? faAngleUp : faAngleDown}
                  />
                </div>
              </>
            </div>
          )}
        </div>
        {userModalVisible && (
          <UserModal setUserModalVisible={setUserModalVisible} />
        )}
        {isLoginVisible && (
          <Login
            setForPassVis={setForPassVis}
            setIsLoginVisible={setIsLoginVisible}
            setIsSignupVisible={setIsSignupVisible}
          />
        )}
        {forPassVis && (
          <Reset
            setForPassVis={setForPassVis}
            setIsLoginVisible={setIsLoginVisible}
          />
        )}
        {isSignupVisible && (
          <SignUp
            setIsLoginVisible={setIsLoginVisible}
            setIsSignupVisible={setIsSignupVisible}
          />
        )}
        <img height="420" width="100%" src={banner} alt="banner" />
        <div className="contents-wrapper">
          <img width="290" height="70" src={logoTrans} alt="logo" />
          <h1 style={{ color: "white" }}>Discover the best foods & drinks</h1>
          <div className="search-bar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" />
            <input
              onChange={(e) => setSearchText(e.target.value)}
              onClick={() => setIsVisible(true)}
              type="text"
              placeholder="Search for resturant, cuisine or dish"
            />
            {isVisible && (
              <SearchModal
                searchText={searchText}
                setSearchText={setSearchText}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                path="home"
              />
            )}
          </div>
        </div>
      </div>
      <div className="home-main-cnt">
        <div className="cards-cnt">
          <Link to="/delivery" className="link card">
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
          <Link to="/restaurants" className="link card">
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
          {collectionsData.map(
            (col) =>
              col.id < 5 && (
                <Link key={col.id} to={`/collections/${col.slug}`}>
                  <CollCard
                    imgSrc={col.imgSrc}
                    title={col.title}
                    places={col.places}
                  />
                </Link>
              )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
