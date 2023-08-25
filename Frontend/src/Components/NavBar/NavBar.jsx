import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SearchModal from "../SearchModal/SearchModal";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import { useAuthContext } from "../../contexts/useAuthContext";
import UserModal from "../UserModal/UserModal";
import Reset from "../Auth/Reset";
import { Toaster } from "react-hot-toast";

import "./navbar.css";

const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [forPassVis, setForPassVis] = useState(false);

  const { user } = useAuthContext();

  return (
    <div className="nav">
      <Toaster position="top-right" gutter={24} />
      <div className="nav-left">
        <Link to="/" className="logo">
          <img width="126" height="27" src={logo} alt="logo" />
        </Link>
        <div className="search-bar">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            onChange={(e) => setSearchText(e.target.value)}
            onClick={() => setIsSearchVisible(true)}
            type="text"
            placeholder="Search for resturant, cuisine or dish"
          />
        </div>
      </div>
      <div className="nav-left">
        <div className="user-auth">
          {!user ? (
            <>
              <FontAwesomeIcon
                className="mb-user-login"
                icon={faUser}
                onClick={() => setIsLoginVisible(true)}
              />
              <div className="link" onClick={() => setIsLoginVisible(true)}>
                Log in
              </div>
              <div className="link" onClick={() => setIsSignupVisible(true)}>
                sign up
              </div>
            </>
          ) : (
            <div
              className="user-info"
              onClick={() => setUserModalVisible((pr) => !pr)}
            >
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
                <div>{user}</div>
                <FontAwesomeIcon
                  icon={userModalVisible ? faAngleUp : faAngleDown}
                />
              </div>
            </div>
          )}
        </div>
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
      {isSignupVisible && (
        <SignUp
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

      {isSearchVisible && (
        <SearchModal
          isVisible={isSearchVisible}
          setIsVisible={setIsSearchVisible}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      )}
    </div>
  );
};

export default NavBar;
